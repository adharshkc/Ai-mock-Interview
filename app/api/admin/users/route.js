import clerk from '@/lib/clerk';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await clerk.users.getUserList({
      limit: 100, // Adjust as needed
      orderBy: '-created_at' // Sort by most recently created first
    });
    
    return NextResponse.json({ 
      users: users,
      count: users.length 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}