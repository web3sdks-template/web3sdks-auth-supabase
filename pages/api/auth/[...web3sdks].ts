import { Web3sdksAuth } from "@web3sdks/auth/next";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE || ""
);

export const { Web3sdksAuthHandler, getUser } = Web3sdksAuth({
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "example.com",
  callbacks: {
    login: async (address: string) => {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("address", address.toLowerCase())
        .single();

      if (!user) {
        const res = await supabase
          .from("users")
          .insert({ address: address.toLowerCase() })
          .single();

        if (res.error) {
          throw new Error("Failed to create user!");
        }
      }
    },
    user: async (address: string) => {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("address", address.toLowerCase())
        .single();

      return user;
    },
  },
});

export default Web3sdksAuthHandler();
