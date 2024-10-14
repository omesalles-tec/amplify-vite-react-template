import React, { useState, useEffect } from 'react';
import {fetchUserAttributes} from 'aws-amplify/auth';

const Root: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUserAttributes().then(setUser);
    }, []);

  return <div>{JSON.stringify(user)}</div>;
};

export default Root;
