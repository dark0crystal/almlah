'use client';
import { FormEvent, useState } from "react";
import FormWrapper from "./FormWrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaTrash } from 'react-icons/fa';

// Assuming imageData is defined somewhere
type imageData = {
    placeImages: Array<File>;
};

type ImageProps = imageData & {
    updateFields: (fields: Partial<imageData>) => void;
};

export default function ImageUploaderForm({ placeImages, updateFields }: ImageProps) {
    const t = useTranslations('Forms');
    const [preview, setPreview] = useState<Array<string>>([]);
    const [files, setFiles] = useState<Array<File>>([]);

    async function handleOnChange(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & { files: FileList };
        const newFiles = Array.from(target.files);

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
                className="rounded-2xl border-dashed border-2 border-yellow-300 p-2 m-2 w-full h-[30vh]"
                type="file"
                name="placeImages"
                onChange={handleOnChange}
                multiple
            />

            <div className="grid grid-cols-3 gap-4">
                {preview.map((imgSrc, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]  md:h-[200px] md:w-[200px] rounded-2xl overflow-hidden">
                        <Image
                            src={imgSrc}
                            alt={`preview ${index}`}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                        <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
}






