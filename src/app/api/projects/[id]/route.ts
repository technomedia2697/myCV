import { NextRequest, NextResponse } from 'next/server';
import projectsData from '@/data/projects.json';

/**
 * FRONTEND-ONLY MODE
 * All API routes return mock data from /src/data/projects.json
 */

// GET /api/projects/[id]
// Get specific project by ID (mock data)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const project = projectsData.projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: project.id,
        name: project.name,
        description: project.descriptionEn || project.description,
        tech: project.tech,
        image: project.image,
        demo: project.demo,
        github: project.github,
        drive: project.drive,
      }
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]
// Update project by ID (mock - no-op in frontend-only mode)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, tech, image, demo, github, drive } = body;

    // Mock update - return the submitted data as if it was updated
    const mockUpdatedProject = {
      id,
      name: name || 'Project',
      description: description || '',
      tech: tech || [],
      image: image || '',
      demo: demo || null,
      github: github || null,
      drive: drive || null,
    };

    return NextResponse.json({
      success: true,
      data: mockUpdatedProject,
      message: 'Mock project updated (frontend-only mode)'
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
// Delete project by ID (mock - no-op in frontend-only mode)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = projectsData.projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id, name: project.name },
      message: 'Mock project deleted (frontend-only mode)'
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}
