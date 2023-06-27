import axios from "https://esm.sh/axios@1.4.0?target=es2022";
import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { Signal } from "@preact/signals";
import { useSignal } from "@preact/signals";

interface UploaderProps {
  progress: Signal<number>;
}

// Don’t forget to keep the Uppy instance outside of your component.

function ImageUploader() {
  const progress = useSignal(0);
  const selectedImage = useSignal(new File([], ""));
  const isLoading = useSignal(false);
  const res = useSignal({});

  const handleImageChange = (e: JSX.TargetedEvent) => {
    const file = (e.target as HTMLInputElement)?.files![0];
    selectedImage.value = file;
  };

  const handleSubmit = async (e: JSX.TargetedEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image file.");
      return;
    }
    isLoading.value = true;

    try {
      const formData = new FormData();
      formData.append("image", selectedImage.value);

      //   const uploadResponse = await fetch("/api/upload", {
      //     method: "POST",
      //     body: formData,
      //   });

      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          progress.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          console.log("progress", progress.value);
        },
      });
      console.log("response", uploadResponse);

      res.value = uploadResponse;

      isLoading.value = false;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} class="flex">
        <div>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <button type="submmit">Upload</button>
      </form>
      <div>
        <pre>{progress.value}</pre>
      </div>
    </>
  );
}

export default ImageUploader;
