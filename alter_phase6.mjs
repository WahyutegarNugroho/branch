import pkg from 'pg';
const { Client } = pkg;

const run = async () => {
  const connectionString = "postgresql://postgres.gbrwieaddzkpzfpjcxcz:branchevolution666.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
  const client = new Client({ connectionString });

  try {
    await client.connect();
    
    // Add new columns to profiles
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS glass_blur INTEGER DEFAULT 10;");
    await client.query("ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS glass_opacity INTEGER DEFAULT 20;");
    
    // Create new preset themes
    const themes = [
      {
        name: "Cyberpunk",
        bg_type: "solid",
        bg_color: "#0a0a14",
        button_shape: "cut-corners",
        button_style: "neon",
        font_family: "font-mono-theme",
        is_premium: true,
        bg_image_url: null,
      },
      {
        name: "Minimalist White",
        bg_type: "solid",
        bg_color: "#ffffff",
        button_shape: "rounded-full",
        button_style: "shadow",
        font_family: "font-sans-theme",
        is_premium: false,
        bg_image_url: null,
      },
      {
        name: "Nature",
        bg_type: "gradient",
        bg_color: "linear-gradient(135deg, #2b580c, #639a67)",
        button_shape: "leaf",
        button_style: "soft",
        font_family: "font-serif-theme",
        is_premium: true,
        bg_image_url: null,
      },
      {
        name: "Ocean",
        bg_type: "gradient",
        bg_color: "linear-gradient(to bottom, #001f3f, #00a8cc)",
        button_shape: "rounded-3xl",
        button_style: "glassmorphism",
        font_family: "font-display-theme",
        is_premium: true,
        bg_image_url: null,
      }
    ];

    for (const theme of themes) {
      await client.query(`
        INSERT INTO public.themes (name, bg_type, bg_color, button_shape, button_style, font_family, is_premium, bg_image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING;
      `, [theme.name, theme.bg_type, theme.bg_color, theme.button_shape, theme.button_style, theme.font_family, theme.is_premium, theme.bg_image_url]);
    }

    await client.query("NOTIFY pgrst, 'reload schema';");
    console.log("Phase 6 columns and themes added, schema reloaded.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
};

run();
