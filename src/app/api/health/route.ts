import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/health
 * Health check endpoint - frontend only mode
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    mode: 'frontend-only',
    timestamp: new Date().toISOString(),
    message: 'API is running in frontend-only mode - no database required'
  });
}
