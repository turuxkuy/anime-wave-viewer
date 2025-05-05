
# DonghuaWave - Donghua Streaming Platform

This is a HTML/CSS/JavaScript implementation of a Chinese animation (donghua) streaming platform.

## Structure

The project follows this structure:

/donghua-app/
├── index.html            # Main homepage with donghua grid
├── login.html            # User login page
├── login-admin.html      # Admin login page
├── user.html             # User dashboard
├── admin.html            # Admin dashboard
├── donghua.html          # Donghua detail page
├── episode.html          # Episode player page
├── style.css             # All styles
└── README.txt            # This file

## Features

- Responsive design for mobile and desktop
- User login system (connects to Supabase Auth - needs configuration)
- Admin dashboard for content management
- Video player simulation
- Bookmark and watch history tracking

## Page Details

### index.html
- Main landing page with featured donghua
- Grid layout of all available donghua
- Search functionality

### login.html
- Regular user login page
- Authenticates users via Supabase (when configured)
- Links to register and admin login

### login-admin.html
- Admin-specific login page
- Checks for admin role in database

### user.html
- User dashboard with account information
- Shows bookmarked donghua
- Displays watch history

### admin.html
- Admin dashboard with statistics
- Content management (add/edit/delete donghua and episodes)
- User management

### donghua.html
- Detailed view of a specific donghua
- Shows episodes in a grid layout
- Similar donghua recommendations

### episode.html
- Video player for watching episodes
- Episode navigation
- Related episode list

## Setup

1. Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_ANON_KEY' with your Supabase project credentials
2. Configure authentication in Supabase
3. Set up the following tables:
   - users (for regular users)
   - admins (for admin users)
   - vip_users (for premium users)
   - donghua (for content)
   - episodes (linked to donghua)
   - bookmarks (user saved content)
   - history (user watch history)

## Notes

This is a frontend implementation. The backend functionality requires proper Supabase configuration.
