"use client";
import React, { useState, useEffect } from "react";
import { Dashboard } from "@uppy/react";
import Webcam from "@uppy/webcam";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import FormWrapper from "./FormWrapper";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { UPPY_BUCKET, UPPY_TUS_ENDPOINT } from "src/lib/constant";

type ImageFormProps = {
  placeId: string | null; // Accept the placeId as a prop
};
export function getProps({placeId}:ImageFormProps){
	console.log("the place id is  : " , placeId)
	return{placeId}
}

export default function ImageForm() {
  const [uppy] = useState(() =>
    new Uppy()
      .use(Tus, {
        endpoint: UPPY_TUS_ENDPOINT,
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
      })
      .use(Webcam)
	 
  );


    uppy.on("file-added", (file) => {
      file.meta = {
        ...file.meta,
        bucketName: UPPY_BUCKET,
        objectName:"jhvhjvvjvhvhv" +"/"+file.name ,
        contentType: file.type,
      };
	  
    });
 	


  return (
    <FormWrapper title="Image upload">
      <div className="flex justify-center items-center h-screen">
		
        <Dashboard uppy={uppy} 	 id="testing" plugins={["Webcam"]} />
      </div>
    </FormWrapper>
  );
}
