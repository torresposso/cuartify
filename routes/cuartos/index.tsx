// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/islands/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import ImageUploader from "../../islands/ImageUploader.tsx";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    const { supabaseClient, session } = ctx.state;
    const userId = session?.user.id;

    console.log("user", session);

    const user = {
      id: session?.user.id,
      avatar_url: session?.user.user_metadata.avatar_url || "",
      name: session?.user.user_metadata.name || "",
    };

    return ctx.render({ user });
  },
};

export default function Me({ data }: PageProps) {
  return (
    <Layout user={data.user}>
      <main class="text-white py-12">
        <div>
          hello {data.user.name}
        </div>
        <ImageUploader />
      </main>
    </Layout>
  );
}
