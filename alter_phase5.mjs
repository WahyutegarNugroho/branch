import pkg from 'pg';
const { Client } = pkg;

const run = async () => {
  const connectionString = "postgresql://postgres.gbrwieaddzkpzfpjcxcz:branchevolution666.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bg_animation VARCHAR(50) DEFAULT 'none';");
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_frame VARCHAR(50) DEFAULT 'none';");
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_placement VARCHAR(20) DEFAULT 'top';");
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme_lock BOOLEAN DEFAULT false;");
    await client.query("NOTIFY pgrst, 'reload schema';");
    console.log("Phase 5 columns added and schema reloaded.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
};

run();
