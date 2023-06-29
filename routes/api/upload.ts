// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers } from "$fresh/server.ts";
import { State } from "@/routes/_middleware.ts";
export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    try {
      const form = await req.formData();

      const image = form.get("image") as File;

      const imageExtension = image.name.split(".").pop();

      const { session, supabaseClient } = ctx.state;

      if (!session) throw new Error("not authenticated");

      const userId = session.user.id;

      const PATH = `${userId}/${crypto.randomUUID()}`;
      const ORIGINAL_FILENAME = `original.${imageExtension}`;
      const uploadedImage = await supabaseClient
        .storage
        .from("rooms_images")
        .upload(`${PATH}/${ORIGINAL_FILENAME}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      const imageList = await supabaseClient.storage.from("rooms_images")
        .list(PATH);

      console.log("imageList", imageList);

      return Response.json(uploadedImage.data!);

      // Proxy the streamed SSE response from OpenAI
    } catch (error) {
      return Response.json(error);
    }
  },
};
