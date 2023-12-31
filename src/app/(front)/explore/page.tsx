import DynamicNavbar from '@/components/common/DynamicNavbar';
import UserListCard from '@/components/common/UserListCard';
import ExploreSearchBar from '@/components/explore/ExploreSearchBar';
import { getExploreUsers } from '@/lib/ServerMethods';
import React from 'react';

const Explore: React.FC<{ searchParams: { [key: string]: string | undefined } }> = async ({ searchParams }) => {
  const query = searchParams.query ?? '';
  const users: Array<UserType> | [] = await getExploreUsers(query);

  return (
    <div className='p-3'>
      <DynamicNavbar title='Explore' />
      <ExploreSearchBar />
      <div className="mt-5">
        {users && users.length > 0 && users.map((item) => <UserListCard user={item} key={item.id} />)}

        {users && users.length === 0 && query.length > 1 && (
          <h1 className='text-center font-bold text-gray-500 mt-10'>No user found :(</h1>
        )}
      </div>
    </div>
  );
};

export default Explore;
