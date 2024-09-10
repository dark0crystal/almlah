// import Image from "next/image";

// async function fetchImage() {
//     // Fetch all files in the place.id folder
//     const { data: images, error } = await supabase.storage.from("almlahFiles").list();
//         // limit: 2, // Only get the first image
//     console.log(images)

//     if (error || !images.length) {
//         console.error("Error fetching images:", error);
//         return null;
//     }

//     // Generate the public URL for the first image
//     // const { data } = supabase.storage.from('almlahFiles').getPublicUrl(`${placeId}/${images[1].name}`);
//     // const  data  = `https://zrvcachteqbhgzbqknnf.supabase.co/storage/v1/object/public/almlahFiles/cm0e2y2fk0001tm8lc4x9qa50/IMG_1164.jpg`
//     // const imageUrl = data;
    
//     // return imageUrl;
// }

// export default async function S() {
//     // const placeId = 'cm0e2y2fk0001tm8lc4x9qa50'; // Replace with the actual place.id
//      await fetchImage();

//     // if (!imageUrl) {
//     //     return <p>No image found for this place.</p>;
//     // }

//     return (
//         <div>
//             {/* <div>
//                 <Image
//                     src={imageUrl}
//                     alt={`Image for place ${placeId}`}
//                     width={500}
//                     height={300}
//                 />
//             </div> */}
//         </div>
//     );
// }


// // https://zrvcachteqbhgzbqknnf.supabase.co/storage/v1/object/public/almlahFiles/cm0e2y2fk0001tm8lc4x9qa50/IMG_1164.jpg
// 'use client';
// import { useEffect, useState } from 'react';
// import { Virtuoso } from 'react-virtuoso';
// import Image from 'next/image';

// export default function FetchTodos() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('https://jsonplaceholder.typicode.com/photos/');
//       const json = await response.json();
//       console.log(json)
//       setData(json);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Virtuoso
//         className="!h-[200px]"
//         data={data} 
//         overscan={200}
//         style={{ height: '400px', width: '100%' }} // Use 'items' instead of 'data'
//         itemContent={(_, item) => (  // Use 'item' instead of 'data'
//           <div key={item.id} className="h-16 bg-violet-300 p-5 m-4">
//             <h1>{item.title}</h1>
//             <Image src={item.thumbnailUrl} alt="image" />
//           </div>
//         )}
//       />
//     </div>
//   );
// }
'use client'
import { useRef, useState } from 'react';
import { TableVirtuoso, VirtuosoHandle } from 'react-virtuoso';

import UserCard from './UserCard';
import { createUsers } from './user';

export default function App() {
  const [users, setUsers] = useState(() => createUsers(0, 20));
  const [isLoading, setIsLoading] = useState(false);

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  async function fetchNextPage() {
    const newUsers = createUsers(users.length, users.length + 20);

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    setUsers([...users, ...newUsers]);
  }

  return (
    <div>
      <button
        className="mb-4"
        onClick={() => {
          virtuosoRef.current?.scrollToIndex({
            index: Math.random() * users.length,
            align: 'start',
            behavior: 'smooth',
          });
        }}
      >
        Scroll
      </button>
      <TableVirtuoso
        ref={virtuosoRef}
        className="!h-[200px]"
        data={users}
        endReached={fetchNextPage}
        itemContent={(_, user) => <UserCard user={user} />}
        fixedFooterContent={
          isLoading
            ? () => <div className="bg-grayscale-700">Loading...</div>
            : undefined
        }
        fixedHeaderContent={() => (
          <tr>
            <th className="w-[150px] bg-grayscale-700 text-left">Id</th>
            <th className="w-[150px] bg-grayscale-700 text-left">Name</th>
          </tr>
        )}
      />
    </div>
  );
}
