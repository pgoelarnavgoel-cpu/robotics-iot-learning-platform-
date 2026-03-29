# Payment Tracking & Admin Dashboard Guide

## Overview
This guide explains how to use the payment tracking and admin dashboard features for monitoring idea submission payments, subscriptions, and revenue.

## Features Added

### 1. Admin Dashboard - Payments Tab
The admin panel now includes a dedicated "Payments" tab that provides comprehensive payment tracking and analytics.

#### Access
- Navigate to `/admin` (requires admin role)
- Click on the "Payments" tab

### 2. Payment Statistics Dashboard

The dashboard displays three key metrics:

#### Total Revenue
- Shows combined revenue from all payment sources
- Includes both one-time payments and subscription revenue
- Real-time calculation based on completed transactions

#### One-Time Payments
- Total revenue from one-time idea submissions (₹50 each)
- Number of completed one-time transactions
- Tracks all successful ₹50 payments

#### Active Subscriptions
- Total monthly recurring revenue from active subscriptions (₹150/month each)
- Number of currently active subscribers
- Only counts subscriptions that haven't expired

### 3. Recent Transactions View

Displays all payment transactions with the following information:
- **Idea Title**: The submitted idea name
- **User Information**: Username and email of the submitter
- **Payment Status**: 
  - ✅ Completed (green badge)
  - ⏳ Pending (yellow badge)
  - ❌ Failed (red badge)
- **Payment Type**: One-Time or Subscription
- **Amount**: Payment amount in rupees (₹)
- **Timestamp**: Date and time of transaction

### 4. Active Subscriptions Management

Shows detailed information about all active subscriptions:
- **User Details**: Username and email
- **Subscription Status**: Active badge with expiration date
- **Start Date**: When the subscription began
- **Expiration Date**: When the subscription will expire
- **Monthly Amount**: ₹150/month

## Payment Flow

### For Users:
1. User submits an idea through the "Submit Your Idea" page
2. Chooses payment option:
   - **One-Time Payment**: ₹50 (single idea submission)
   - **Monthly Subscription**: ₹150/month (unlimited submissions)
3. Payment is processed (currently simulated)
4. Idea enters pending approval status

### For Admins:
1. View all transactions in the Payments tab
2. Monitor payment statistics in real-time
3. Track active subscriptions and their expiration dates
4. Review payment history for each user

## Database Schema

### user_ideas Table
- `payment_type`: 'one_time' or 'subscription'
- `payment_amount`: Amount paid (50 or 150)
- `payment_status`: 'pending', 'completed', or 'failed'
- `payment_verified`: Boolean flag for verification
- `payment_id`: External payment gateway ID (if applicable)

### subscriptions Table
- `user_id`: Reference to the user
- `status`: 'active', 'expired', or 'cancelled'
- `amount`: Monthly subscription amount (150)
- `start_date`: Subscription start date
- `end_date`: Subscription expiration date

## API Functions

### Admin Functions
- `getAllSubscriptions()`: Fetches all subscriptions with user details
- `getPaymentStatistics()`: Calculates revenue and transaction statistics
- `getAllPaymentTransactions()`: Retrieves all payment transactions

### Statistics Calculation
- **One-Time Revenue**: Sum of all completed one-time payments
- **Subscription Revenue**: Sum of all active subscription amounts
- **Total Revenue**: One-time + Subscription revenue
- **Active Subscriptions**: Count of subscriptions with status='active' and end_date >= today

## Support & Contact Information

### For Payment Issues:
If you encounter any payment-related issues, you can:

1. **Contact Admin Support**
   - Check the admin dashboard for transaction status
   - Review payment history in the Payments tab

2. **Check Payment Gateway**
   - If using third-party processors (Stripe/PayPal):
     - Log into your payment gateway account
     - Check Balance / Transactions / Payouts
     - Verify payment status and settlement dates

3. **View Receipts**
   - All completed transactions are logged in the system
   - Transaction details include:
     - Payment ID
     - Amount paid
     - Date and time
     - User information

### For Users:
- View your submission status in "My Ideas" dashboard
- Check payment status for each submitted idea
- Monitor subscription expiration dates

## Revenue Tracking

### How to Track Your Earnings:

1. **Admin Dashboard**
   - Total Revenue card shows combined earnings
   - One-Time Payments card shows ₹50 payments
   - Active Subscriptions card shows monthly recurring revenue

2. **Transaction History**
   - Scroll through Recent Transactions section
   - Filter by payment status
   - Export data for accounting (future feature)

3. **Subscription Management**
   - View all active subscribers
   - Track subscription start and end dates
   - Monitor monthly recurring revenue

## Future Enhancements

Planned features for payment tracking:
- Export transactions to CSV/Excel
- Payment gateway integration (Stripe/PayPal)
- Automated email receipts
- Revenue charts and analytics
- Refund management
- Invoice generation
- Payment reminders for expiring subscriptions

## Technical Details

### Payment Status Flow:
```
pending → completed (successful payment)
pending → failed (payment error)
```

### Subscription Status Flow:
```
active → expired (end_date passed)
active → cancelled (user cancellation)
```

### Security:
- All payment data is stored securely in Supabase
- Admin-only access to payment information
- Row Level Security (RLS) policies protect user data
- Payment gateway integration uses secure tokens

## Troubleshooting

### No Transactions Showing:
- Verify users have submitted ideas with payment
- Check that payment_status is set correctly
- Ensure payment_type is not null

### Incorrect Revenue Calculations:
- Verify payment_amount values are correct (50 or 150)
- Check that payment_status = 'completed' for counted transactions
- Ensure subscription end_dates are in the future for active subscriptions

### Subscription Not Showing as Active:
- Verify status = 'active'
- Check that end_date >= current date
- Ensure amount field is populated

## Contact

For technical support or questions about the payment tracking system, contact the development team or refer to the main application documentation.
