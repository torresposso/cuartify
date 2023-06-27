// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();

      const image = form.get("image") as Blob;

      console.log("image", image);

      // const response = await (await fetch(
      //   "https://api-inference.huggingface.co/models/facebook/wav2vec2-large-xlsr-53-spanish",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${ensureGetEnv("HF_ACCESS_TOKEN")}`,
      //     },
      //     method: "POST",
      //     body: audioBlob,
      //   },
      // )).json();
      // console.log("speech", response);

      return Response.json("ok");

      // Proxy the streamed SSE response from OpenAI
    } catch (error) {
      console.log(error);
    }
  },
};
