/**
 * FRONTEND-ONLY MODE
 * Database connectivity is disabled.
 * All data is served from mock endpoints or frontend-only storage.
 */

export async function connectToDatabase() {
  // No-op: Frontend-only mode - no database connection
  console.log('[FRONTEND-ONLY] Database connection skipped');
  return null;
}

export async function disconnectFromDatabase(): Promise<void> {
  // No-op: Frontend-only mode
}
