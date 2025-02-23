"use client";
import { CldUploadWidget } from "next-cloudinary";

export default function UploadButton() {
  return (
    <CldUploadWidget uploadPreset="EditEase">
      {({ open }) => <button onClick={() => open()}>Upload an Image</button>}
    </CldUploadWidget>
  );
}
