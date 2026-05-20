# Himalayan Fresh Eggs Cash On Delivery Funnel

This is a production-ready Next.js App Router funnel for Cash On Delivery product orders.

## Pages

- `/` - Product landing page
- `/checkout` - Checkout page
- `/thank-you` - Order confirmation page
- `/api/order` - Server-side order submission endpoint

## Order Flow

1. Customer selects quantity on the landing page.
2. Product name, quantity, price per piece, and total price are passed to `/checkout`.
3. Customer enters name, phone, email, and exact location.
4. `/api/order` validates the order.
5. The order is saved to Google Sheets.
6. A business order notification email is sent to Gmail.
7. A customer order received email is sent.
8. The customer is redirected to `/thank-you`.

The API returns success only after Google Sheets and both emails complete successfully.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your real values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=mushroom4377@gmail.com
EMAIL_FROM=mushroom4377@gmail.com
BRAND_NAME=Himalayan Fresh Eggs

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=eggs order
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

For Gmail SMTP, use a Gmail App Password, not your normal Gmail password.

## Google Spreadsheet Setup

1. Create a Google Spreadsheet.
2. Rename the sheet tab to `eggs order` or set `GOOGLE_SHEET_TAB_NAME` to your exact tab name.
3. Add these column headers in row 1:

```text
Order ID
Date & Time
Customer Name
Phone Number
Email Address
Exact Location
Product Name
Quantity
Price Per Piece
Total Price
Payment Method
Order Status
Notes
```

4. Select row 1 and enable filters from `Data > Create a filter`.
5. Add a dropdown to the `Order Status` column:
   - Select the cells under `Order Status`.
   - Go to `Data > Data validation`.
   - Add these options: `New Order`, `Order Confirmed`, `Order Ongoing`, `Delivered`, `Cancelled`.
6. Copy the Sheet ID from the URL. It is the long value between `/d/` and `/edit`.
7. Create a Google Cloud service account with Google Sheets API access.
8. Copy the service account email into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
9. Copy the private key into `GOOGLE_PRIVATE_KEY`. In Vercel, keep newline characters as `\n` if pasted on one line.
10. Share the Google Sheet with the service account email and give it Editor access.

## Gmail SMTP Setup

1. Turn on 2-Step Verification for the Gmail account.
2. Create an App Password from Google Account security settings.
3. Use these values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=your-gmail@gmail.com
BUSINESS_EMAIL=mushroom4377@gmail.com
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing Order Submission

1. Start the app locally.
2. Click any `Purchase Now`, `Order Now`, or `Buy Now` button.
3. Fill the checkout form.
4. Submit the order.
5. Confirm:
   - A new row appears in Google Sheets.
   - The business Gmail receives the order notification.
   - The customer email receives the order confirmation.
   - The customer redirects to the thank-you page.

If credentials are missing or wrong, the checkout page will show the API error and will not redirect.

## Deploying on Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables from `.env.example` in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your deployed Vercel URL.
5. Redeploy the project.
6. Place one test order after deployment.

## Editing Product Content

Most product content is in:

```text
lib/product.ts
```

Product images are in:

```text
public/images
```
