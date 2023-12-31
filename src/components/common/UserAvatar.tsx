'use client'
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const UserAvatar = ({ name, image }: { name: string, image?: string }) => {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    // Switch to the fallback image API on error
    setError(true);
  };

  return (
    <Avatar>
      <AvatarImage
        src={`https://api.multiavatar.com/${name}.png`}
        onError={handleImageError}
      />
      {error && (
        <AvatarImage
          src={`https://ui-avatars.com/api/?name=${name}&rounded=true&format=svg`}
          onError={() => setError(false)} // Reset error state if fallback also fails
        />
      )}
      {!error && <AvatarFallback>{name}</AvatarFallback>}
    </Avatar>
  );
};

export default UserAvatar;
