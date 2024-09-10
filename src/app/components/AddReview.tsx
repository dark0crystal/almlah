
// import { authOptions } from 'src/lib/auth';
// import { getServerSession } from 'next-auth';
// import prisma from '../../lib/prismaClient';

// export  async function AddReview({placeId}) {


//   const session =await getServerSession(authOptions);
//   const addNewReview = async( formData:FormData)=>{
//     "use server"
//   const userIdDb = await prisma.user.findUnique({
//     where:{
//       // id : session?.user?.id,
//       email : session?.user?.email
//     }
//   })
//   const rating = formData.get("rating")as string
//   const visitingTime = formData.get("visitingTime") as string;
//   await prisma.review.create({
//     data:{
//         user_id: userIdDb?.id ,
//         place_id : placeId ,
//         title : formData.get('title') as string,
//         description:formData.get('description') as string,
//         rating: parseInt(rating)  ,
//         visiting_time: visitingTime ? new Date(visitingTime).toISOString() : null,
//         note :formData.get('note') as string,

//     }
//   })

//   }

//   return ( 
//     <div >
//     <div>{session?.user?.email}</div>
//     <form action={addNewReview}  className='flex flex-col justify-center items-center gap-7 w-full '>
//         <input
//           type="text"
//           name="title"
//           placeholder="Name"
          
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Location"
          
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
          
          
//         />
        
//          <input type="date"  name="visitingTime"
//          placeholder="visiting Time"
//          />
       
//         <input
//           type="text"
//           name="note"
//           placeholder="write note"
         
//         />
//          <input
//           type="number"
//           name="rating"
//           placeholder="Rating"
//           min="1"
//           max="5"
          
//         />
        
//         <button type="submit">Submit</button>
//       </form>
//       </div>
//    );
// }
 
// export default AddReview;