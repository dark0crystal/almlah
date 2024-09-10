'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import InfoForm from 'src/app/components/Forms/InfoForm';
import UseMultiStepForm from '../../../components/Forms/UseMultiStepForm';
import ImageUploaderForm from 'src/app/components/Forms/ImageUploaderForm';
import PlaceStatusForm from '../../../components/Forms/PlaceStatusForm';
import { addNewPlace } from './AddNewPlace'; // Import the server action
import { supabase } from 'src/lib/supabase';
import withAuth from 'src/app/components/withAuth';
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
  placeImages: z.array(z.instanceof(File)).optional(),
});

export type FromData = z.infer<typeof InfoSchema>;

const INITIAL_DATA: FromData = {
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
  placeImages: [],
};

const AddPlace = () => {
  const [data, setData] = useState<FromData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FromData, string[]>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Update form fields
  function updateFields(fields: Partial<FromData>) {
    setData(prev => ({
      ...prev,
      ...fields,
    }));
  }

  // Validate the form data whenever it changes
  useEffect(() => {
    const result = InfoSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof FromData, string[]>> = {};

      // Handle Zod error formatting
      const errorFormat = result.error.format();
      Object.keys(errorFormat).forEach((key) => {
        const errors = errorFormat[key as keyof typeof errorFormat];

        // Check if errors is an array of strings
        if (Array.isArray(errors)) {
          formattedErrors[key as keyof FromData] = errors;
        } 
        // Check if errors is an object with _errors property
        else if ('_errors' in errors && Array.isArray(errors._errors)) {
          formattedErrors[key as keyof FromData] = errors._errors;
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
    <ImageUploaderForm placeImages={data.placeImages} updateFields={updateFields} key="second" />,
    <PlaceStatusForm errors={errors} key="third" {...data} updateFields={updateFields} />,
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
          const { error } = await supabase.storage.from('almlahFiles').upload(filePath, file);
          if (error) throw new Error(`Failed to upload image: ${error.message}`);
        });

        await Promise.all(uploadPromises);

        // Upload cover image if it exists
        if (data.placeImages.length > 0) {
          const coverImage = data.placeImages[0];
          const coverImagePath = `${placeId}/cover_image/${coverImage.name}`;
          const { error: coverImageError } = await supabase.storage.from('almlahFiles').upload(coverImagePath, coverImage);
          if (coverImageError) throw new Error(`Failed to upload cover image: ${coverImageError.message}`);
        }
      }

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

export default withAuth(AddPlace);










