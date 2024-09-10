"use client";
import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import FileInput from "@uppy/file-input";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import Tus from "@uppy/tus";

function FileUpload() {
  const [error, setError] = useState("");
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy().use(FileInput).use(Tus, {
      endpoint: `/api/upload`,
      headers: {},
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
      retryDelays: null,
    })
  );

  useEffect(() => {
    uppy.on("file-added", (file) => {
      file.meta = {
        ...file.meta,
        bucketName: "almlahFiles",
        objectName: "testFolder" ? `${"testFolder"}/${file.name}` : file.name,
        contentType: file.type,
      };

      console.log("file added");
    });

    uppy.on("complete", (result) => {
      console.log(
        "Upload complete! We’ve uploaded these files:",
        result.successful
      );
    });

    return () => {
      // uppy.off("file-added", () => {});
    };
  }, [uppy]);

  return (
    <div>
      <Dashboard uppy={uppy} plugins={["FileInput"]} />
    </div>
  );
}

export default FileUpload;