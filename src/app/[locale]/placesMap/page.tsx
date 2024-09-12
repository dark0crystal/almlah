'use client';
import React, { useEffect, useState } from 'react';
import { Link } from '../../../../navigation';
import { getPlacesData, getPlacesImages } from './data';
import Image from 'next/image';
import { Virtuoso } from 'react-virtuoso';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { MdOutlineAddLocationAlt } from "react-icons/md";

type Place = {
  id: string;  // Updated to match the fetched data type
  name: string;
  location: string;
  place_type: number;  // Ensure that the place_type is included in your type definition
};

export default function PlacesMap() {
  const t = useTranslations('mapPage')
  const locale = useLocale().substring(0, 2);
  const [places, setPlaces] = useState<Place[]>([]);
  const [placeImages, setPlaceImages] = useState<{ [key: string]: string }>({});  // Use string for the key type

  useEffect(() => {
    async function fetchData() {
      const fetchedPlaces = await getPlacesData();
      const fetchedPlaceImages = await getPlacesImages();

      // Filter out any places with null names
      const validPlaces = fetchedPlaces.filter((place) => place.name !== null) as Place[];

      setPlaces(validPlaces);
      setPlaceImages(fetchedPlaceImages);
    }
    fetchData();
  }, []);

  // Group places in pairs for rendering
  const groupedPlaces = [];
  for (let i = 0; i < places.length; i += 2) {
    groupedPlaces.push(places.slice(i, i + 2));
  }

  return (
    <div>
      <div className='flex flex-row justify-around bg-yellow-100 rounded-2xl mb-3 p-2'>
      <h1 >{t('places')}</h1>
      <Link href="/addPlace"  locale={locale} className="hover:text-gray-400 text-xl"><MdOutlineAddLocationAlt /></Link>
      
      </div>
      <Virtuoso
        className="!h-[85vh]"
        data={groupedPlaces}
        itemContent={(index, pair) => (
          <div key={index} className="grid grid-cols-2 gap-4 h-[35vh]">
            {pair.map((place) => (
              <div key={place.id} className="flex flex-col">
                <div className="bg-slate-300 relative h-[230px] w-full">
                  <Link locale={locale} href={`/placesMap/${place.id}`}>
                    {placeImages[place.id] ? (
                      <Image
                        src={placeImages[place.id]}
                        loading="lazy"
                        fill
                        style={{ objectFit: 'cover' }}
                        alt={`Image of ${place.name}`}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </Link>
                </div>
                <div>
                  <p>{place.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
}

