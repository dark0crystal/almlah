'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlacesData } from './data';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface PlacesMapLayoutProps {
  children: React.ReactNode;
}

const PlacesMapLayout = ({ children }: PlacesMapLayoutProps) => {

  const locale = useLocale();
  const t = useTranslations('mapPage');
  const [toggle, setToggle] = useState(false);
  const [placesMarkers, setPlacesMarkers] = useState<{ geocode: [number, number]; place_type: number; id: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMarkers() {
      const markers = await getPlacesData();
      const filteredMarkers = markers.map((marker: any) => ({
        geocode: marker.geocode,
        place_type: marker.place_type,
        id: marker.id,
      }));
      setPlacesMarkers(filteredMarkers);
    }
    fetchMarkers();
  }, []);

  const getEmojiForPlaceType = (place_type: number) => {
    switch (place_type) {
      case 1:
        return '🏖️';
      case 2:
        return '⛰️';
      case 3:
        return '🛍️';
      case 4:
        return '🎡';
      case 5:
        return '🏛️';
      case 6:
        return '🏰';
      case 7:
        return '🏯';
      case 8:
        return '🌊';
      case 9:
        return '🧗';
      case 10:
        return '🦁';
      case 11:
        return '🏭';
      case 12:
        return '🪨';
      case 13:
        return '🎪';
      case 14:
        return '♨️';
      case 15:
        return '🛤️';
      case 16:
        return '💧';
      case 17:
        return '🌫️';
      case 18:
        return '🕌';
      case 19:
        return '🌲';
      default:
        return '🏞️';
    }
  };

  const createCustomIcon = (emoji: string) => {
    return L.divIcon({
      html: `<div style="font-size: 35px;">${emoji}</div>`,
      className: '',
    });
  };

  return (
    <div className='flex flex-col md:flex-row relative'>
      <MapContainer
        center={[23.614328, 58.545284]}
        zoom={8}
        className='h-[85vh] md:h-[100vh] md:w-[calc(100%-500px)] fixed top-0 left-0 w-screen'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
        />
        {placesMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode}
            icon={createCustomIcon(getEmojiForPlaceType(marker.place_type))}
            riseOnHover={true}
            eventHandlers={{
              click: () => {
                router.push(`/${locale}/placesMap/${marker.id}`);
              },
            }}
          >
            {/* <Popup>{getEmojiForPlaceType(marker.place_type)}</Popup> */}
          </Marker>
        ))}
      </MapContainer>

      <div className={`bg-yellow-200 ${toggle ? 'h-[75vh]' : 'h-[20vh]'} md:h-[100vh] fixed bottom-0 md:bottom-auto md:right-0 w-screen md:w-[500px] duration-500`}>
        <div className='bg-yellow-200 h-[8vh] w-full flex justify-around items-center border-b-[1px] border-black p-2'>
          <a href={`/${locale}`}>{t('brand')}</a>
          <button className='md:hidden bg-yellow-100  w-8 p-2 rounded-full' onClick={() => setToggle(!toggle)}>
            {toggle ? <span>↓</span>: <span>↑</span>}
          </button>
          <button onClick={() => router.back()}>←</button>
        </div>
        <div className={`bg-yellow-200 ${toggle ? 'h-[62vh]' : 'h-[7vh]'} md:h-[92vh] flex flex-col overflow-auto p-4`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlacesMapLayout;












// {toggle ? '↓': '↑' }