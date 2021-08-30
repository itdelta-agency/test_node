import React, { useState, useEffect } from "react";
import { getProfile } from '../api';
import { useAuth } from "../use-auth";

export default function Profile () {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const auth = useAuth();

  useEffect(() => {
    getProfile(auth?.user?.token)
      .then(
        (result) => {
          setIsLoaded(true);
          setProfile(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Last name: {profile.lastName}</p>
      </div>
    );
  }
}
