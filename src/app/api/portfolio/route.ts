import { NextRequest, NextResponse } from 'next/server';

/**
 * FRONTEND-ONLY MODE
 * Returns mock portfolio data
 */

const mockPortfolioData = {
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
};

// GET /api/portfolio - Get portfolio data (mock)
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockPortfolioData,
      message: 'Mock data - frontend only mode'
    });
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    console.error('[GET] Error fetching portfolio:', errorMessage);
    return NextResponse.json(
      { success: false, error: `Failed to fetch portfolio: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio - Update portfolio data (mock)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock update - return the submitted data as if it was saved
    const mockUpdatedPortfolio = {
      ...mockPortfolioData,
      ...body,
    };

    return NextResponse.json({
      success: true,
      data: mockUpdatedPortfolio,
      message: 'Mock portfolio updated (frontend-only mode)'
    });
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    
    console.error('[PUT] Error updating portfolio:', errorMessage);

    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
