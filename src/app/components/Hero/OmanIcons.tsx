import Image from "next/image";

import img1 from '../../../../public/img1.jpeg';
import img2 from '../../../../public/img2.jpeg';
import img3 from '../../../../public/img3.jpeg';
import img4 from '../../../../public/img4.jpeg';

export default function OmanIcons() {
  const images = [img1, img2, img3, img4];

  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-12">
      {images.map((image, index) => (
        <div
          key={index}
          className="image-container relative overflow-hidden h-[70px] w-[70px] grayscale hover:grayscale-0 transition-all duration-300"
        >
          <Image
            src={image}
            alt={`img${index + 1}`}
            loading="lazy"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
