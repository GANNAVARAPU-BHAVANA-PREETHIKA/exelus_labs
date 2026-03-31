# Exelus Labs Frontend

The products page now reads product data from Supabase instead of the local JSON file.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in `supabase/products.sql`.
3. Add your product rows with these columns:
   - `sl_no`
   - `api_name`
   - `impurity_name`
   - `cas_no`
   - `cat_no`
   - `iupac`
   - `mf`
   - `mw`
   - `storage`
   - `synonyms` (`text[]`, example: `{"Name 1","Name 2"}`)
   - `inv_status` (`In Stock` or `Out of Stock`)
   - `structure` (Cloudinary URL)

CSV mapping for your file:
- `Sl No` -> `sl_no`
- `API Name` -> `api_name`
- `Impurity Name` -> `impurity_name`
- `CAT NO` -> `cat_no`
- `CAS No` -> `cas_no`
- `IUPAC` -> `iupac`
- `MF` -> `mf`
- `MW` -> `mw`
- `Storage` -> `storage`
- `Inv Status` -> `inv_status`
- `Synonyms` -> `synonyms`
  If your source has multiple synonyms, import them as a Postgres array instead of a plain string.
- `Structure` -> `structure`
4. Copy `.env.example` to `.env`.
5. Fill in:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_SUPABASE_PRODUCTS_TABLE`

## Run

```bash
npm start
```

## Build

```bash
npm run build
```
