/**
 * Migration Script: Import projects from JSON to MongoDB
 * 
 * Usage:
 *   npx ts-node scripts/migrate-projects.ts
 * 
 * This script reads the projects.json file and imports all projects
 * into your MongoDB database. It will:
 * 1. Connect to MongoDB using MONGODB_URI from .env.local
 * 2. Clear existing projects (optional)
 * 3. Import projects from src/data/projects.json
 * 4. Display a summary of the migration
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Import the Project model
import Project from '../src/lib/models/Project';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function migrateProjects() {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 5,
      minPoolSize: 1,
    });
    console.log('✅ Connected to MongoDB');

    // Read projects from JSON file
    const projectsPath = path.join(__dirname, '../src/data/projects.json');
    console.log(`\n📂 Reading projects from: ${projectsPath}`);
    
    if (!fs.existsSync(projectsPath)) {
      console.error(`❌ File not found: ${projectsPath}`);
      process.exit(1);
    }

    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
    const projects = projectsData.projects || [];

    if (projects.length === 0) {
      console.log('⚠️  No projects found in JSON file');
      process.exit(0);
    }

    console.log(`📋 Found ${projects.length} projects to migrate`);

    // Option to clear existing projects
    const existingCount = await Project.countDocuments();
    if (existingCount > 0) {
      console.log(`\n⚠️  Database currently has ${existingCount} projects`);
      console.log('💡 Tip: Existing projects will be kept. Duplicates may occur.');
    }

    // Insert projects
    console.log('\n📤 Migrating projects...');
    const migratedProjects = await Project.insertMany(
      projects.map(p => ({
        name: p.name,
        description: p.description,
        tech: Array.isArray(p.tech) ? p.tech : [p.tech],
        image: p.image,
        demo: p.demo || null,
        github: p.github || null,
        drive: p.drive || null,
      }))
    );

    console.log(`✅ Successfully migrated ${migratedProjects.length} projects`);
    
    // Display summary
    console.log('\n📊 Migration Summary:');
    console.log(`   • Total migrated: ${migratedProjects.length}`);
    migratedProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.name}`);
    });

    console.log('\n✨ Migration completed successfully!');
    console.log('📌 Next steps:');
    console.log('   1. Verify projects in MongoDB');
    console.log('   2. Update your app to use the new API endpoints');
    console.log('   3. Test the project creation, update, and delete endpoints');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run migration
migrateProjects();
