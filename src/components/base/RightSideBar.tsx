import React from 'react';
import UserListCard from '../common/UserListCard';
import { getUsers } from '@/lib/ServerMethods';

const RightSideBar = async () => {
    const users: Array<UserType> | [] = await getUsers();

    return (
        <div className="h-screen border-l-2 border-border lg:1/4 lg:ot-5 lg:px-2 xl:p-5 hidden lg:block">
            <h1 className="text-2xl font-bold mb-5 text-center"> Suggestion for you</h1>
            {users && users.length > 0 ? (
                users.map((user) => <UserListCard user={user} key={user.id} />)
            ) : (
                <p className='text-center'>No suggestions found.</p>
            )}
        </div>
    );
};

export default RightSideBar;
