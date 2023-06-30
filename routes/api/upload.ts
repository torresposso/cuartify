// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers } from "$fresh/server.ts";
import { State } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    try {
      const form = await req.formData();

      const image = form.get("image") as File;
      const prompt = form.get("prompt");

      const { session, supabaseClient } = ctx.state;

      if (!session) throw new Error("not authenticated");

      const userId = session.user.id;

      const PATH = `${userId}/${crypto.randomUUID()}`;

      const uploadedImage = await supabaseClient
        .storage
        .from("rooms_images")
        .upload(`${PATH}/original`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("image", uploadedImage);

      const { data } = supabaseClient
        .storage
        .from("rooms_images")
        .getPublicUrl(`${PATH}/original`);

      // POST request to Replicate to start the image restoration generation process
      let startResponse = await fetch(
        "https://api.replicate.com/v1/predictions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + Deno.env.get("REPLICATE_API_KEY")!,
          },
          body: JSON.stringify({
            version:
              "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
            input: {
              image: data.publicUrl,
              prompt: form.get("prompt"),
              a_prompt:
                "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
              n_prompt:
                "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
            },
          }),
        },
      );

      let jsonStartResponse = await startResponse.json();

      console.log("start response", jsonStartResponse);

      let endpointUrl = jsonStartResponse.urls.get;

      // GET request to get the status of the image restoration process & return the result when it's ready
      let generationResponse;
      while (!generationResponse) {
        // Loop in 1s intervals until the alt text is ready
        console.log("polling for result...");
        let finalResponse = await fetch(endpointUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + Deno.env.get("REPLICATE_API_KEY")!,
          },
        });
        let jsonFinalResponse = await finalResponse.json();

        if (jsonFinalResponse.status === "succeeded") {
          generationResponse = jsonFinalResponse.output;
        } else if (jsonFinalResponse.status === "failed") {
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      const savedImages = await Promise.all(
        generationResponse.map(async (url, index) => {
          return await supabaseClient
            .storage
            .from("rooms_images")
            .upload(
              `${PATH}/generated_${index}`,
              await (await fetch(url)).blob(),
              {
                cacheControl: "3600",
                upsert: false,
              },
            );
        }),
      );

      console.log("generated", generationResponse);
      console.log("saved images", savedImages);

      const images = [
        `https://lloisttdbzzohehwbofn.supabase.co/storage/v1/object/public/rooms_images/${PATH}/original`,
        ,
        `https://lloisttdbzzohehwbofn.supabase.co/storage/v1/object/public/rooms_images/${PATH}/generated_1`,
        ,
      ];

      console.log("images", images);
      return Response.json(
        images,
      );
    } catch (error) {
      return Response.json(error);
    }
  },
};
