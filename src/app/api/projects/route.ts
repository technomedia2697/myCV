import { NextRequest, NextResponse } from 'next/server';
import projectsData from '@/data/projects.json';

/**
 * FRONTEND-ONLY MODE
 * All API routes return mock data from /src/data/projects.json
 */

// GET /api/projects - Get all projects (mock data)
export async function GET(request: NextRequest) {
  try {
    const projects = projectsData.projects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.descriptionEn || p.description,
      tech: p.tech,
      image: p.image,
      demo: p.demo,
      github: p.github,
      drive: p.drive,
    }));

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
      message: 'Mock data - frontend only mode'
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Mock create (no-op in frontend-only mode)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, description, tech, image } = body;
    
    if (!name || !description || !Array.isArray(tech) || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Return mock success response
    const mockProject = {
      id: `mock-${Date.now()}`,
      name,
      description,
      tech,
      image,
      demo: null,
      github: null,
      drive: null,
    };

    return NextResponse.json(
      {
        success: true,
        data: mockProject,
        message: 'Mock project created (frontend-only mode)'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}
