# Task: Add User Idea Submission with Payment

## Plan
- [x] Step 1: Update database schema (Completed)
  - [x] Create user_ideas table
  - [x] Create subscriptions table
  - [x] Add RLS policies
- [x] Step 2: Update types and API (Completed)
  - [x] Add Subscription and UserIdea types
  - [x] Create API functions for subscriptions and ideas
- [x] Step 3: Create UI components (Completed)
  - [x] Submit Idea page with form
  - [x] Payment modal with one-time and subscription options
  - [x] My Ideas page (view submitted ideas with status)
  - [x] Update Admin page with idea management tab
- [x] Step 4: Update navigation and routes (Completed)
  - [x] Add routes for Submit Idea and My Ideas
  - [x] Update Header with Submit Idea button
- [x] Step 5: Run lint (Completed)

## Notes
- Payment: ₹50 per idea OR ₹150/month subscription (unlimited ideas)
- Only logged-in users can submit ideas
- Ideas need admin approval before publishing
- Payment options: one-time or subscription
- Simulated payment processing (2 second delay)
- Admin can approve or reject ideas with reasons
- Users can see rejection reasons
- Subscription status shown in Submit Idea and My Ideas pages
- All features implemented successfully
- Lint passed with no errors
