import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const [userId] = await db('users').insert({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}