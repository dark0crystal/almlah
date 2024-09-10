'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';

type CardImagesProps = {
  placeId: string;
};

export default function CardImages({ placeId }: CardImagesProps) {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchPlaceImages() {
      const { data, error } = await supabase.storage.from('almlahFiles').list(`${placeId}/`);
      
      if (error) {
        console.error('Error fetching images:', error.message);
      } else if (data) {
        const filteredImages = data.filter((img) => !img.name.includes('cover_image'));
        const imageUrls = filteredImages.map((img) => 
          supabase.storage.from('almlahFiles').getPublicUrl(`${placeId}/${img.name}`).data.publicUrl
        );
        setImages(imageUrls);
      }
    }

    fetchPlaceImages();
  }, [placeId]);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center card-images">
      <div className="image-container relative overflow-hidden h-[400px] w-full">
        <Image
          src={images[currentImageIndex]}
          alt={`Place Image ${currentImageIndex + 1}`}
          loading='lazy'
          fill
          style={{objectFit: 'cover'}}
          className="rounded-lg  cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
      <div className="image-thumbnails mt-4 flex space-x-2">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            width={300}
            height={300}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail-image w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImageIndex === index ? 'border-2 border-yellow-500' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
