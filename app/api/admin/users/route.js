import clerk from '@/lib/clerk';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await clerk.users.getUserList();
    return NextResponse.json({ count: users.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user count' }, { status: 500 });
  }
}