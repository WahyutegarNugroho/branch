import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

const run = async () => {
  const connectionString = "postgresql://postgres.gbrwieaddzkpzfpjcxcz:branchevolution666.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    const result = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';");
    console.log("Tables:", result.rows.map(r => r.table_name));
    
    // Now I will run the exact lines for missing tables instead of the full schema
    const schema = fs.readFileSync('schema.sql', 'utf8');
    const statements = schema.split(';');
    
    // Let's filter statements that don't create an existing table
    const existingTables = result.rows.map(r => r.table_name);
    
    let safeScript = '';
    for (let stmt of statements) {
        if (!stmt.trim()) continue;
        
        let shouldInclude = true;
        
        // If it's a CREATE TABLE, check if it already exists
        const createTableMatch = stmt.match(/CREATE TABLE public\.([a-zA-Z0-9_]+)/i);
        if (createTableMatch) {
            const tableName = createTableMatch[1];
            if (existingTables.includes(tableName)) {
                console.log(`Skipping creation of ${tableName} as it exists.`);
                // We should also skip it if it's already created. But let's apply IF NOT EXISTS
                stmt = stmt.replace(/CREATE TABLE public\./i, 'CREATE TABLE IF NOT EXISTS public.');
            }
        }
        
        // Let's just execute each block if it's not a view or something that throws error
        try {
           await client.query(stmt);
           console.log("Executed a block successfully.");
        } catch(e) {
           console.log("Failed to execute block. It might already exist. Error:", e.message);
        }
    }
    
    await client.query("NOTIFY pgrst, 'reload schema';");
    console.log("Schema cache reloaded.");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
};

run();
