const PAGE_SIZE = 20;
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const SUPABASE_PRODUCTS_TABLE = process.env.REACT_APP_SUPABASE_PRODUCTS_TABLE || 'products';
const DEFAULT_PRODUCT_IMAGE = '/product-images/EXL-001.png';

function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function getSupabaseHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'count=exact',
  };
}

function normalizeAvailability(value) {
  if (!value) return 'Out of Stock';

  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'instock' || normalized === 'in stock') return 'In Stock';
  if (
    normalized === 'outofstock' ||
    normalized === 'out of stock' ||
    normalized === 'out of the stock'
  ) {
    return 'Out of Stock';
  }
  return value;
}

function isPresentValue(value) {
  if (value === null || value === undefined) return false;
  const normalized = String(value).trim();
  return normalized !== '' && normalized !== '-';
}

function normalizeText(value) {
  return isPresentValue(value) ? String(value).trim() : '';
}

function normalizeSynonyms(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(', ');
  }

  return value || '';
}

function hasVisibleProductData(product) {
  return [
    product.mpurty,
    product.impurity_name,
    product.impurity_na,
    product.api_name,
    product.cat_no,
    product.cas_no,
    product.iupac,
    product.mf,
    product.mw,
    product.storage,
    product.synonyms,
    product.structure,
  ].some(isPresentValue);
}

function getBrowseLetterKey(value) {
  if (!isPresentValue(value)) return 'Others';
  const firstCharacter = String(value).trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(firstCharacter) ? firstCharacter : 'Others';
}

function normalizeProduct(product) {
  const productName = normalizeText(product.mpurty || product.impurity_name || product.impurity_na);
  const synonyms = normalizeSynonyms(product.synonyms);
  const apiName = normalizeText(product.api_name);
  const catNo = normalizeText(product.cat_no);
  const browseLabel = apiName || productName || catNo || '';
  const browseLetter = isPresentValue(apiName) ? getBrowseLetterKey(apiName) : 'Others';

  return {
    id: product.id ?? catNo,
    sl_no: product.sl_no ?? '',
    impurity: browseLabel,
    api_name: apiName,
    browse_label: browseLabel,
    browse_letter: browseLetter,
    name: productName,
    name_en: productName,
    cas_no: normalizeText(product.cas_no),
    cas_number: normalizeText(product.cas_no),
    cat_no: catNo,
    code: catNo,
    iupac_name: normalizeText(product.iupac),
    molecular_formula: normalizeText(product.mf),
    molecular_weight: normalizeText(product.mw),
    storage: normalizeText(product.storage),
    synonyms,
    synonims: synonyms,
    availability: normalizeAvailability(product.inv_status),
    image_url: product.structure || DEFAULT_PRODUCT_IMAGE,
  };
}

function dedupeBrowseProducts(products) {
  const seen = new Set();

  return products.filter((product) => {
    const key = `${product.api_name}::${product.cat_no || product.id || ''}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildSupabaseUrl(path, params = {}) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

async function supabaseFetch(path, params = {}) {
  const response = await fetch(buildSupabaseUrl(path, params), {
    headers: getSupabaseHeaders(),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}`);
  }

  return response;
}

async function fetchProducts({ search = '', availability = '', page = 1 } = {}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const from = Math.max(0, (page - 1) * PAGE_SIZE);
  const filters = [];

  if (search.trim()) {
    const term = search.trim().replace(/,/g, ' ');
    filters.push(`impurity_name.ilike.*${term}*`);
    filters.push(`api_name.ilike.*${term}*`);
    filters.push(`cas_no.ilike.*${term}*`);
    filters.push(`cat_no.ilike.*${term}*`);
    filters.push(`iupac.ilike.*${term}*`);
    filters.push(`mf.ilike.*${term}*`);
    filters.push(`synonyms_text.ilike.*${term}*`);
  }

  const params = {
    select: '*',
    order: 'impurity_name.asc',
    offset: String(from),
    limit: String(PAGE_SIZE),
  };

  if (availability) {
    params.inv_status = `eq.${availability}`;
  }

  if (filters.length) {
    params.or = `(${filters.join(',')})`;
  }

  const response = await supabaseFetch(SUPABASE_PRODUCTS_TABLE, params);
  const rows = await response.json();
  const products = rows.filter(hasVisibleProductData).map(normalizeProduct);

  return {
    products,
    total: products.length,
    hasMore: false,
  };
}

async function fetchProductByCatNo(catNo) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const response = await supabaseFetch(SUPABASE_PRODUCTS_TABLE, {
    select: '*',
    cat_no: `eq.${catNo}`,
    limit: '1',
  });

  const rows = await response.json();
  const row = rows.find(hasVisibleProductData);
  return row ? normalizeProduct(row) : null;
}

async function fetchSearchProducts(limit = 500) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const response = await supabaseFetch(SUPABASE_PRODUCTS_TABLE, {
    select: 'id,sl_no,api_name,impurity_name,cas_no,cat_no,inv_status,synonyms',
    order: 'impurity_name.asc',
    limit: String(limit),
  });

  const rows = await response.json();
  return rows.filter(hasVisibleProductData).map(normalizeProduct);
}

async function fetchFeaturedProductsByCatNo(catNos = []) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const validCatNos = catNos
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (validCatNos.length === 0) {
    return [];
  }

  const response = await supabaseFetch(SUPABASE_PRODUCTS_TABLE, {
    select: '*',
    cat_no: `in.(${validCatNos.join(',')})`,
  });

  const rows = await response.json();
  const orderLookup = new Map(validCatNos.map((value, index) => [value, index]));
  const seenCatNos = new Set();

  return rows
    .filter(hasVisibleProductData)
    .map(normalizeProduct)
    .filter((product) => {
      if (seenCatNos.has(product.cat_no)) {
        return false;
      }
      seenCatNos.add(product.cat_no);
      return true;
    })
    .sort((left, right) => {
      const leftIndex = orderLookup.get(left.cat_no) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = orderLookup.get(right.cat_no) ?? Number.MAX_SAFE_INTEGER;
      return leftIndex - rightIndex;
    });
}

function getProductName(product) {
  return product.name || product.name_en || '';
}

async function fetchBrowseProducts(limit = 5000) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  const response = await supabaseFetch(SUPABASE_PRODUCTS_TABLE, {
    select: '*',
    order: 'api_name.asc',
    limit: String(limit),
  });

  const rows = await response.json();

  return dedupeBrowseProducts(
    rows
    .filter(hasVisibleProductData)
    .map(normalizeProduct)
    .sort((left, right) => {
      const impurityComparison = left.browse_label.localeCompare(right.browse_label, undefined, { sensitivity: 'base' });
      if (impurityComparison !== 0) return impurityComparison;

      const apiComparison = left.api_name.localeCompare(right.api_name, undefined, { sensitivity: 'base' });
      if (apiComparison !== 0) return apiComparison;

      return left.cat_no.localeCompare(right.cat_no, undefined, { sensitivity: 'base' });
    })
  );
}

export {
  DEFAULT_PRODUCT_IMAGE,
  PAGE_SIZE,
  fetchBrowseProducts,
  fetchFeaturedProductsByCatNo,
  fetchProductByCatNo,
  fetchProducts,
  fetchSearchProducts,
  getBrowseLetterKey,
  getProductName,
  isSupabaseConfigured,
};
