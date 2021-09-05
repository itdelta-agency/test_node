import React, { useState, useEffect } from "react";
import { getProfile } from '../api';
import { useAuth } from "../use-auth";
import Loading from "../components/Loading";

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
    return (<Loading />);
  } else {
    return (
      <div class="max-w-screen-xl mx-auto">

        <div class="max-h-full bg-white grid">
          <div class="container mx-auto mt-8 md:mt-0 md:space-x-10 md:grid grid-cols-3 justify-center md:py-40">
            <div class="grid justify-center items-center order-1 col-span-1">
              <img class="lg:h-80 md:h-64 h-40 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="" />
            </div>
            <div class="mt-8 md:mt-0 lg:justify-end col-span-2">
              <h1 class="text-4xl text-gray-800 text-center md:text-left font-bold mb-6">Hi, I am {profile.name} {profile.lastName}, Creative Technologist</h1>
              <p class="text-xl text-gray-800 text-center md:text-left">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              <button class="block mt-8 mx-auto md:mx-0 text-2xl py-3 px-6 text-red-50 font-semibold rounded bg-red-400">Download Resume</button>
            </div>
          </div>
        </div>


        <div class="md:gap-4 p-6 bg-blue-50 md:grid">
          <div class="grid grid-cols-2 justify-between lg:px-40 md:mb-4">
            <h1 class="justify-start md:text-left text-2xl">Recent posts</h1>
            <p class="hidden md:block text-right text-2xl">View all</p>
          </div>
          <div class="md:grid grid-cols-2 gap-6 lg:px-40">
            <div>
              <div class="bg-white p-4">
                <div>
                  <div class="mb-4">
                    <h1 class="text-2xl font-bold text-gray-700">Making a design system from scratch</h1>
                  </div>

                  <div class="">
                    <span class="block mb-4 text-xl">12 Feb 20 20 | Design, Pattern</span>
                    <p class="text-lg text-gray-700">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white p-4 md:mt-0 mt-6">
              <div>
                <div class="mb-4">
                  <h1 class="text-2xl font-bold text-gray-700">Creating pixel perfect icons in Figma</h1>
                  <p class="hidden">View all</p>
                </div>

                <div class="">
                  <span class="block mb-4 text-xl">12 Feb 20 20 | Design, Pattern</span>
                  <p class="text-lg text-gray-700">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-white px-6">
            <div class="border-b pb-6">
              <h1 class="mt-2 mb-6 text-center text-xl">Featured works</h1>
              <div class="md:grid grid-cols-2 gap-6">
                <div>
                  <img class="md:h-full object-cover" src="https://images.unsplash.com/photo-1602992708529-c9fdb12905c9" alt="" />
                </div>
                <div>
                  <h1 class="my-6 text-2xl font-bold text-gray-700">Designing Dashboards</h1>
                  <span class="text-lg mr-4 py-1 px-4 rounded-full bg-gray-800 text-white">2020</span>
                  <span class="text-lg">Dashboard</span>
                  <p class="mt-6 text-lg text-gray-700">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}
