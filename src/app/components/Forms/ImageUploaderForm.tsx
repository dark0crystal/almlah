'use client';
import { FormEvent, useState } from "react";
import FormWrapper from "./FormWrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaTrash } from 'react-icons/fa';

type ImageData = {
    placeImages: File[];
};

type ImageProps = ImageData & {
    updateFields: (fields: Partial<ImageData>) => void;
};

export default function ImageUploaderForm({ placeImages, updateFields }: ImageProps) {
    const t = useTranslations('Forms');
    const [preview, setPreview] = useState<Array<string>>([]);
    const [files, setFiles] = useState<Array<File>>(placeImages);

    async function handleOnChange(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & { files: FileList };
        const newFiles = Array.from(target.files || []);

        if (!newFiles.length) return;

        const newPreviews: string[] = [];
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target?.result as string;
                newPreviews.push(result);
                setPreview(prev => [...prev, result]);
            };
            reader.readAsDataURL(file);
        });

        // Update the state with the selected files
        setFiles(prev => [...prev, ...newFiles]);
        updateFields({ placeImages: [...files, ...newFiles] });
    }

    function handleDeleteImage(index: number) {
        const updatedPreviews = preview.filter((_, i) => i !== index);
        const updatedFiles = files.filter((_, i) => i !== index);

        setPreview(updatedPreviews);
        setFiles(updatedFiles);
        updateFields({ placeImages: updatedFiles });
    }

    return (
        <FormWrapper title={t("ImageUploader")}>
            <br />
            <input
                className="rounded-2xl border-dashed border-2 border-yellow-300 p-2 m-2 w-full h-[30px] cursor-pointer"
                type="file"
                accept="image/*"
                multiple
                onChange={handleOnChange}
            />
            <br />
            {preview.length > 0 && (
                <div className="flex flex-wrap">
                    {preview.map((src, index) => (
                        <div key={index} className="relative m-2">
                            <Image
                                src={src}
                                alt={`Preview ${index}`}
                                width={100}
                                height={100}
                                className="rounded-2xl"
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 text-red-500"
                                onClick={() => handleDeleteImage(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </FormWrapper>
    );
}





