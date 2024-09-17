// src/app/[locale]/(protected)/adminDashboard/places/page.tsx

import { prisma } from '../../../../../lib/prisma';
import PlacesList from './PlacesList';

const Page = async () => {
  const places = await prisma.place.findMany({
    where: { is_checked: false },
    select: {
      id: true,
      name_ar: true,
      name_en: true,
    },
  });

  return <PlacesList places={places} />;
};

export default Page;

