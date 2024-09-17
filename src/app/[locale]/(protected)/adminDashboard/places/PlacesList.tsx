// src/app/[locale]/(protected)/adminDashboard/places/PlacesList.tsx
'use client';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Link } from '../../../../../../navigation';

type Place = {
  id: string;
  name_ar: string | null;
  name_en: string | null;
};

type PlacesListProps = {
  places: Place[];
};

const PlacesList = ({ places }: PlacesListProps) => {
  if (!places || places.length === 0) {
    return <h1>No places available</h1>;
  }

  return (
    <Virtuoso
      style={{ height: '80vh' }} // Adjust the height as needed
      data={places}
      itemContent={(index, place) => (
        <Link
          href={`/adminDashboard/places/${place.id}`}
          key={place.id}
          className='bg-white w-full h-[20vh] max-w-4xl m-6 p-6 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-col justify-center items-start border border-gray-200'
        >
          {place.name_ar ? (
            <h1 className='text-lg font-semibold text-gray-800'>{place.name_ar}</h1>
          ) : (
            <p className='text-sm text-gray-500'>Arabic name not available</p>
          )}
          {place.name_en ? (
            <h1 className='text-lg font-semibold text-gray-700 mt-2'>{place.name_en}</h1>
          ) : (
            <p className='text-sm text-gray-500 mt-2'>English name not available</p>
          )}
        </Link>
      )}
    />
  );
};

export default PlacesList;
