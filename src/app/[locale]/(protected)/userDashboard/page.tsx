import { authOptions } from '../../../../lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../lib/prisma';
import Image from 'next/image';

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined ,
    },
  });

  if (!user) {
    return <div>User not found not found</div>;
  }

  const data = await prisma.place.findMany({
    where: {
      user_id: user?.id,
      is_checked: true,
    },
  });

  return (
    <div>
      {user.image ? (
        <Image src={user.image} alt="user profile" width={100} height={100} />
      ) : (
        <h1>No Image</h1>
      )}
      <div>Welcome {user.name}</div>
      {data && data.length > 0 ? (
        data.map((place) => (
          <div key={place.id}>
            <h1>{place.name_ar}</h1>
            <p>{place.description_ar}</p>
            {/* Render more fields if necessary */}
          </div>
        ))
      ) : (
        <h1>You have not added any places or your places have been not accepted yet.</h1>
      )}
    </div>
  );
}
