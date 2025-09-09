# CBE Career Guide - Supabase Backend Setup

This guide will help you set up the complete Supabase backend for the CBE Career Guide application.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Install Supabase CLI (optional but recommended)

## Step 1: Create a New Supabase Project

1. Go to your Supabase dashboard
2. Click "New Project"
3. Choose your organization
4. Set project name: `cbe-career-guide`
5. Set database password (save this securely)
6. Choose region closest to Kenya (e.g., `ap-southeast-1`)
7. Click "Create new project"

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Get your project URL and anon key from Supabase dashboard:
   - Go to Settings > API
   - Copy the Project URL and anon public key
3. Update your `.env` file:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Set Up Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the schema

## Step 4: Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure the following settings:

### Site URL
- Set to your development URL: `http://localhost:5173`
- For production, set to your deployed URL

### Redirect URLs
Add these URLs:
- `http://localhost:5173/**` (for development)
- Your production URL pattern

### Email Templates (Optional)
Customize the email templates for:
- Confirm signup
- Reset password
- Magic link

## Step 5: Set Up Row Level Security (RLS)

The schema file includes RLS policies, but verify they're enabled:

1. Go to Authentication > Policies
2. Ensure all tables have appropriate policies
3. Test with different user roles

## Step 6: Seed Initial Data

Run this SQL to add some initial data:

```sql
-- Insert sample schools
INSERT INTO schools (name, location, county, type, registration_number) VALUES
('Nairobi High School', 'Nairobi', 'Nairobi', 'secondary', 'NHS001'),
('Mombasa Primary School', 'Mombasa', 'Mombasa', 'primary', 'MPS001'),
('Kisumu Mixed School', 'Kisumu', 'Kisumu', 'mixed', 'KMS001');

-- Insert core subjects
INSERT INTO subjects (name, code, grade_levels, is_core) VALUES
('Mathematics', 'MATH', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('English', 'ENG', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('Kiswahili', 'KIS', ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], true),
('Science', 'SCI', ARRAY[1,2,3,4,5,6,7,8], true),
('Social Studies', 'SS', ARRAY[1,2,3,4,5,6,7,8], true),
('Biology', 'BIO', ARRAY[9,10,11,12], false),
('Chemistry', 'CHEM', ARRAY[9,10,11,12], false),
('Physics', 'PHY', ARRAY[9,10,11,12], false),
('History', 'HIST', ARRAY[9,10,11,12], false),
('Geography', 'GEO', ARRAY[9,10,11,12], false);
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Try registering a new user
3. Check if the profile is created in the database
4. Test sign in functionality
5. Verify role-based routing works

## Step 8: Configure Storage (Optional)

If you want to enable file uploads:

1. Go to Storage in Supabase dashboard
2. Create a bucket named `avatars`
3. Set up policies for avatar uploads
4. Create a bucket named `documents` for file uploads

## Troubleshooting

### Common Issues:

1. **Authentication not working**
   - Check environment variables
   - Verify Site URL and Redirect URLs
   - Check browser console for errors

2. **Database queries failing**
   - Verify RLS policies are correct
   - Check user permissions
   - Look at Supabase logs

3. **Profile not created on signup**
   - Check if the trigger function is created
   - Verify the trigger is attached to auth.users table

### Useful SQL Queries for Debugging:

```sql
-- Check if user profiles are being created
SELECT * FROM profiles;

-- Check auth users
SELECT * FROM auth.users;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

## Production Deployment

1. Update environment variables for production
2. Configure proper CORS settings
3. Set up proper backup strategies
4. Monitor usage and performance
5. Set up proper logging and error tracking

## Security Best Practices

1. Never expose service key in client-side code
2. Always use RLS policies
3. Validate data on both client and server side
4. Use proper authentication flows
5. Regularly audit user permissions
6. Keep Supabase and dependencies updated

## Next Steps

After completing this setup:

1. Test all authentication flows
2. Implement proper error handling
3. Add comprehensive logging
4. Set up monitoring and alerts
5. Create backup and recovery procedures
6. Document API endpoints and usage
7. Set up CI/CD pipelines
8. Implement proper testing strategies

For any issues, refer to the [Supabase documentation](https://supabase.com/docs) or check the project's GitHub issues.
