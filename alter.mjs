import pkg from 'pg';
const { Client } = pkg;

const run = async () => {
  const connectionString = "postgresql://postgres.gbrwieaddzkpzfpjcxcz:branchevolution666.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    await client.query("ALTER TABLE public.links ADD COLUMN IF NOT EXISTS is_sticky_cta BOOLEAN DEFAULT false;");
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS layout_type VARCHAR(20) DEFAULT 'list';");
    await client.query("NOTIFY pgrst, 'reload schema';");
    console.log("Columns added and schema reloaded.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
};

run();
