# Medical Products Data for MongoDB

This directory contains 30 medical equipment products with 3 images each, ready to be added to your MongoDB database.

## Files Included

1. `medical-products-insert.js` - Contains individual MongoDB insert commands for each product
2. `medical-products.json` - Contains all products in JSON format for bulk import
3. `generate-medical-products.js` - Node.js script to regenerate the product data if needed

## How to Add to MongoDB

### Method 1: Using MongoDB Shell (Individual Inserts)

1. Open your MongoDB shell:
   ```
   mongosh "your-connection-string"
   ```

2. Switch to your database:
   ```javascript
   use your-database-name
   ```

3. Load and execute the insert commands:
   ```javascript
   load("medical-products-insert.js")
   ```

### Method 2: Using mongoimport (Bulk Import)

From your terminal/command prompt:

```bash
mongoimport --uri="your-connection-string" --collection=products --file=medical-products.json --jsonArray
```

## Product Details

- All products belong to the "medical" category
- Each product contains:
  - English and Arabic names
  - English and Arabic descriptions
  - Price and original price
  - Stock quantity
  - 3 images per product
  - Features in both English and Arabic
  - Rating information
- Some products are marked with flags like "isNew", "isFeatured", or "isPopular"

## Notes

- Make sure you have a "products" collection in your database before importing
- Consider backing up existing data before adding new products
- You may need to adjust field names if they differ in your existing database schema