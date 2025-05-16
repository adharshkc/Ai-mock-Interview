import { NextResponse } from 'next/server';
// In a real app, you would use a proper authentication mechanism
// like NextAuth.js or a similar solution
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // IMPORTANT: This is just a simple example for demonstration purposes
    // In a real application, you should NEVER hardcode credentials like this
    // You would verify against a database and use proper password hashing
    if (email === 'admin@example.com' && password === 'adminpassword') {
      // Set a cookie for authentication
      const cookieStore = cookies();
      cookieStore.set('admin-auth', 'true', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict'
      });
      
      return NextResponse.json({
        success: true,
        message: 'Authentication successful'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during authentication'
    }, { status: 500 });
  }
}