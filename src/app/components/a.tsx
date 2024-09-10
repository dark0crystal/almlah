
// import {auth} from 'auth'
// import prisma from '../../lib/prismaClient';
// export  async function AddPlace() {


//   const session =await auth();

//   const addNewPlace = async( formData:FormData)=>{
//     "use server"
//   const userIdDb = await prisma.user.findUnique({
//     where:{
//       id : session?.user?.id,
//       email : session?.user?.email
//     }
//   })
//    const rating = formData.get("rating")as string
   
     
//    await prisma.place.create({
//       data: {
//         name: formData.get('name') as string,
//         location: formData.get("location") as string,
//         description: formData.get("description")  as string,
//         governorate: formData.get("governorate" ) as string,
//         place_type:formData.get("place_type")  as string,
//         rating: parseInt(rating)  ,
//         note: formData.get("note") as string,
//         favorited_by_id : userIdDb?.id,
//         user_id: userIdDb?.id ,
        
//       },
//     });
//   }

//   return ( 
//     <div >
//     <div>{session?.user?.email}</div>
//     <form action={addNewPlace}  className='flex flex-col justify-center items-center gap-7 w-full '>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
          
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
          
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
          
          
//         />
//         <select
//           name="governorate"
//         >
//           <option value="" disabled>Select Governorate</option>
//           <option value="Muscat">Muscat</option>
//           <option value="Dhofar">Dhofar</option>
//           <option value="Al Buraimi">Al Buraimi</option>
//           <option value="Al Dakhiliyah">Al Dakhiliyah</option>
//           <option value="Al Batinah North">Al Batinah North</option>
//           <option value="Al Batinah South">Al Batinah South</option>
//           <option value="Al Sharqiyah North">Al Sharqiyah North</option>
//           <option value="Al Sharqiyah South">Al Sharqiyah South</option>
//           <option value="Al Wusta">Al Wusta</option>
//           <option value="Musandam">Musandam</option>
//           <option value="Al Dhahirah">Al Dhahirah</option>
//         </select>
//         <input
//           type="text"
//           name="place_type"
//           placeholder="Place Type"
         
//         />
//          <input
//           type="number"
//           name="rating"
//           placeholder="Rating"
//           min="1"
//           max="5"
          
//         />
//         <input
//           type="text"
//           name="note"
//           placeholder="Note"
         
//         />
//         <button type="submit">Submit</button>
//       </form>
//       </div>
//    );
// }
 
// export default AddPlace;
