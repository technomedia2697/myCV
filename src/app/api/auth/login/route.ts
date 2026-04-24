import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * Simple password-based authentication
 * In production, use proper JWT and secure password handling
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      // In production, generate a real JWT token
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token: token,
        message: 'Login successful'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
