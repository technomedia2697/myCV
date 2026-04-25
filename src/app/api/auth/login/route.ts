import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * Mock authentication - frontend only mode
 * Any password works in frontend-only mode
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

    // In frontend-only mode, accept any password
    const token = Buffer.from(`mock-admin:${Date.now()}`).toString('base64');
    
    return NextResponse.json({
      success: true,
      token: token,
      message: 'Login successful (mock - frontend only mode)'
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
