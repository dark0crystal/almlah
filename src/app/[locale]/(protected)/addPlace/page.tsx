'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import InfoForm from '../../../components/Forms/InfoForm'
import UseMultiStepForm from '../../../components/Forms/UseMultiStepForm';
import ImageUploaderForm from '../../../components/Forms/ImageUploaderForm';
import PlaceStatusForm from '../../../components/Forms/PlaceStatusForm';
import { addNewPlace } from './AddNewPlace'; // Import the server action
import { supabase } from './../../../../lib/supabase';
import Zagah from "../../../components/Zagah"


import { z } from 'zod';

// Define Zod validation schema
const InfoSchema = z.object({
  name: z.string().min(1, 'Name is required').refine((val) => isNaN(Number(val)), {
    message: "Name must be a string, not a number",
  }),
  location: z.string().min(1, 'Location is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .refine((desc) => desc.replace(/\s+/g, '').length >= 100, {
      message: 'Description must be at least 100 characters excluding spaces',
    }),
  governorate: z.number().nullable(),
  place_type: z.number().nullable(),
  rating: z.string().regex(/^[1-5]$/, 'Rating must be between 1 and 5'),
  note: z.string().optional(),
  isShadyPlace: z.number().nullable(),
  isCamping: z.number().nullable(),
  place_services: z.number().nullable(),
  road: z.number().nullable(),
  placeImages: z.array(z.instanceof(File)).optional(), // Optional field
});

export type InfoData = z.infer<typeof InfoSchema>;

const INITIAL_DATA: InfoData = {
  name: "",
  location: "",
  description: "",
  governorate: null,
  place_type: null,
  rating: "",
  note: "",
  isShadyPlace: null,
  isCamping: null,
  place_services: null,
  road: null,
  placeImages: [], // Default to empty array if no images
};

const AddPlace = () => {
  const [data, setData] = useState<InfoData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof InfoData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Update form fields
  function updateFields(fields: Partial<InfoData>) {
    setData(prev => ({
      ...prev,
      ...fields,
    }));
  }

  // Validate the form data whenever it changes
  useEffect(() => {
    const result = InfoSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof InfoData, string>> = {};

      // Handle Zod error formatting
      const errorFormat = result.error.format();
      Object.keys(errorFormat).forEach((key) => {
        const errors = errorFormat[key as keyof typeof errorFormat];

        if (errors && typeof errors === 'object' && '_errors' in errors) {
          // Ensure errors._errors is an array and join them into a single string
          if (Array.isArray(errors._errors)) {
            formattedErrors[key as keyof InfoData] = errors._errors.join(', ');
          }
        } else if (Array.isArray(errors)) {
          // Handle case where errors is an array of strings and join them into a single string
          formattedErrors[key as keyof InfoData] = errors.join(', ');
        }
      });

      setErrors(formattedErrors);
      setIsValid(false);
    } else {
      setErrors({});
      setIsValid(true);
    }
  }, [data]);

  // Multi-step form
  const { steps, currentStepIndex, isFirstStep, step, back, next, isLastStep } = UseMultiStepForm([
    <InfoForm key="first" errors={errors} {...data} updateFields={updateFields} />,
    <ImageUploaderForm key="second" placeImages={data.placeImages || []} updateFields={updateFields} />,
    <PlaceStatusForm key="third" errors={errors} {...data} updateFields={updateFields} />,
  ]);

  // Submit handler
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();

    try {
      setIsSubmitting(true);
      const { placeId } = await addNewPlace({
        ...data,
        placeImages: undefined, // Exclude placeImages from place data submission
      });

      if (data.placeImages) {

      const uploadPromises = data.placeImages.map(async (file) => {
        const filePath = `${placeId}/${file.name}`;
        const { error, data: uploadedData } = await supabase.storage.from('almlahFiles').upload(filePath, file);
        if (error) {
          console.error(`Failed to upload image: ${error.message}`, { filePath });
          throw new Error(`Failed to upload image: ${error.message}`);
        } else {
          console.log('Uploaded image:', uploadedData);
        }
      });
    
      
      // Upload cover image if it exists
    
        const coverImage = data.placeImages[0];
        const coverImagePath = `${placeId}/cover_image/${coverImage.name}`;
        const { error: coverImageError, data: coverData } = await supabase.storage
          .from('almlahFiles')
          .upload(coverImagePath, coverImage);
        if (coverImageError) {
          console.error(`Failed to upload cover image: ${coverImageError.message}`, { coverImagePath });
          throw new Error(`Failed to upload cover image: ${coverImageError.message}`);
        } else {
          console.log('Uploaded cover image:', coverData);
        }
      }
      
      

      // if (data.placeImages) {
      //   const uploadPromises = data.placeImages.map(async (file) => {
      //     const filePath = `${placeId}/${file.name}`;
      //     const { error } = await supabase.storage.from('almlahFiles').upload(filePath, file);
      //     if (error) throw new Error(`Failed to upload image: ${error.message}`);
      //   });

      //   await Promise.all(uploadPromises);

      //   // Upload cover image if it exists
      //   if (data.placeImages.length > 0) {
      //     const coverImage = data.placeImages[0];
      //     const coverImagePath = `${placeId}/cover_image/${coverImage.name}`;
      //     const { error: coverImageError } = await supabase.storage.from('almlahFiles').upload(coverImagePath, coverImage);
      //     if (coverImageError) throw new Error(`Failed to upload cover image: ${coverImageError.message}`);
      //   }
      // }

      alert('Place added successfully!');
    } catch (error) {
      console.error('Failed to add place:', error);
      alert('Failed to add place.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-7 w-full">
        <div>{currentStepIndex + 1}/{steps.length}</div>
        <div>{step}</div>

        <div>
          <button
            className={`p-2 rounded-2xl ${
              isSubmitting || !isValid
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-300 text-black cursor-pointer'
            }`}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {isLastStep ? (isSubmitting ? "Submitting..." : "Finish") : "Next"}
          </button>

          {!isFirstStep && (
            <button className="bg-black text-white p-2 rounded-2xl" type="button" onClick={back}>
              Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Zagah(AddPlace);












