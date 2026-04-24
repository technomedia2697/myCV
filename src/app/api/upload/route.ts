import { NextRequest, NextResponse } from 'next/server';

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

/**
 * POST /api/upload
 * Convert image to Base64 and return as data URL
 * Image is stored directly in MongoDB (in project document)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB for MongoDB storage)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Max 2MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 400 }
      );
    }

    // Convert file to Base64
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    let base64 = '';
    for (let i = 0; i < uint8Array.length; i++) {
      base64 += String.fromCharCode(uint8Array[i]);
    }
    const encodedBase64 = Buffer.from(base64, 'binary').toString('base64');
    const dataUrl = `data:${file.type};base64,${encodedBase64}`;

    return NextResponse.json({
      success: true,
      data: {
        url: dataUrl,
        type: file.type,
        size: file.size,
        name: file.name
      }
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Upload] ERROR:', msg, error);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
