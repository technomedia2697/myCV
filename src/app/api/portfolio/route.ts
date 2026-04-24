import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import Portfolio, { IPortfolio } from '@/lib/models/Portfolio';

async function verifyAuth(request: NextRequest) {
  const headersList = await headers();
  const authHeader = headersList.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  if (process.env.NODE_ENV === 'production' && !token) {
    return null;
  }

  return token;
}

// GET /api/portfolio - Get portfolio data
export async function GET(request: NextRequest) {
  console.log('[GET /api/portfolio] Request started');
  
  try {
    console.log('[GET] Connecting to database...');
    await connectToDatabase();
    console.log('[GET] Database connected');

    console.log('[GET] Finding portfolio...');
    let portfolio = await Portfolio.findOne({}).lean();
    console.log('[GET] Portfolio found:', !!portfolio);

    if (!portfolio) {
      console.log('[GET] No portfolio found, creating default...');
      // Create default portfolio if none exists
      const defaultPortfolio = new Portfolio({
        hero: {
          name: 'Your Name',
          specialty: 'Your Specialty',
          bio: 'Your Bio',
        },
        about: {
          title: 'About Me',
          bio: 'Tell your story',
          imageUrl: '',
          ventures: [],
        },
        techStack: [],
        contact: {
          email: '',
          whatsapp: '',
          linkedin: '',
          github: '',
        },
      });

      portfolio = await defaultPortfolio.save();
      console.log('[GET] Default portfolio created');
    }

    console.log('[GET] Returning portfolio');
    return NextResponse.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    console.error('[GET] Error fetching portfolio:', {
      message: errorMessage,
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: `Failed to fetch portfolio: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio - Update portfolio data (requires auth)
export async function PUT(request: NextRequest) {
  console.log('[PUT /api/portfolio] Request started');
  
  try {
    // Verify auth
    console.log('[PUT] Verifying auth...');
    const auth = await verifyAuth(request);
    if (!auth) {
      console.log('[PUT] Auth failed');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.log('[PUT] Auth verified');

    // Connect to database
    console.log('[PUT] Connecting to database...');
    await connectToDatabase();
    console.log('[PUT] Database connected');

    // Parse request body
    console.log('[PUT] Parsing request body...');
    let body;
    try {
      body = await request.json();
      console.log('[PUT] Body parsed successfully:', { heroName: body.hero?.name, techCount: body.techStack?.length });
    } catch (parseError: any) {
      console.error('[PUT] JSON Parse Error:', parseError?.message);
      return NextResponse.json(
        { success: false, error: `Invalid JSON: ${parseError?.message}` },
        { status: 400 }
      );
    }

    // Validate required fields
    console.log('[PUT] Validating required fields...');
    if (!body.hero || !body.about || !body.contact) {
      const missing = [];
      if (!body.hero) missing.push('hero');
      if (!body.about) missing.push('about');
      if (!body.contact) missing.push('contact');
      console.error('[PUT] Missing fields:', missing);
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }
    console.log('[PUT] All required fields present');

    // Validate tech stack categories
    console.log('[PUT] Validating tech stack...');
    if (body.techStack && Array.isArray(body.techStack)) {
      for (const tech of body.techStack) {
        if (!['Web', 'Mobile', 'Backend', 'Cloud'].includes(tech.category)) {
          console.error('[PUT] Invalid tech category:', tech.category);
          return NextResponse.json(
            { success: false, error: `Invalid tech category: ${tech.category}. Must be one of: Web, Mobile, Backend, Cloud` },
            { status: 400 }
          );
        }
      }
    }
    console.log('[PUT] Tech stack valid');

    // Find or create portfolio
    console.log('[PUT] Finding existing portfolio...');
    let portfolio = await Portfolio.findOne({});
    console.log('[PUT] Portfolio found:', !!portfolio);

    if (!portfolio) {
      console.log('[PUT] Creating new portfolio...');
      portfolio = new Portfolio(body);
    } else {
      console.log('[PUT] Updating existing portfolio...');
      // Update only the fields provided
      if (body.hero) portfolio.hero = body.hero;
      if (body.about) portfolio.about = body.about;
      if (body.techStack) portfolio.techStack = body.techStack;
      if (body.contact) portfolio.contact = body.contact;
    }

    // Validate before saving
    console.log('[PUT] Validating portfolio schema...');
    const validationError = portfolio.validateSync();
    if (validationError) {
      const errors = Object.entries(validationError.errors)
        .map(([key, err]: [string, any]) => `${key}: ${err.message}`)
        .join('; ');
      console.error('[PUT] Validation failed:', errors);
      return NextResponse.json(
        { success: false, error: `Validation failed: ${errors}` },
        { status: 400 }
      );
    }
    console.log('[PUT] Portfolio validated');

    // Save to database
    console.log('[PUT] Saving portfolio to database...');
    const savedPortfolio = await portfolio.save();
    console.log('[PUT] Portfolio saved successfully');

    return NextResponse.json({
      success: true,
      data: savedPortfolio,
    });
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.code || 'NO_CODE';
    const errorName = error?.name || 'NO_NAME';
    
    console.error('[PUT] ERROR CAUGHT:', {
      message: errorMessage,
      code: errorCode,
      name: errorName,
      stack: error?.stack,
      fullError: JSON.stringify(error, null, 2),
    });

    // Ensure we always return a valid response
    try {
      return NextResponse.json(
        { 
          success: false, 
          error: `Server error: ${errorMessage}`,
          debug: {
            code: errorCode,
            name: errorName,
          }
        },
        { status: 500 }
      );
    } catch (responseError) {
      console.error('[PUT] Failed to send error response:', responseError);
      // Fallback response
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Internal server error',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
}
