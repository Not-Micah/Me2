"use client";

import { useState } from 'react';
import Select from 'react-select'
import { useRouter } from 'next/navigation';

import { curriculums, locations, hobbies } from '../data';
import { addUser } from '../utils/databasefunctions';

// To Do:
// Add verification to check for unique username...

const RegisterUser = () => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userCurriculum, setUserCurriculum] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [userHobbies, setUserHobbies] = useState<string[]>([]);

    const router = useRouter();

    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userName && userAge && userCurriculum && userLocation && userHobbies) {
            addUser(userName, Number(userAge), userCurriculum, userLocation, userHobbies)
            router.refresh();
        }
      };

    return (
        <div className="justify-center align-middle content-center place-self-center place-content-center self-center m-10">
        <form className='flex flex-col gap-y-5 m-14 bg-[#eaeaea] p-10' onSubmit={handleSubmit}>
            <div className="">
                <h2 className='font-semibold text-3xl'>Register here:</h2>
                <p className='text-gray-400 italic font-semibold mt-2'>Me2 ensures your data is kept safe and not used in malpractice.</p>
            </div>
            <div className="flex flex-row gap-x-7">
              <div className="basis-1/2">
                  <p className='text-lg font-bold'>Username</p>
                  <input type="text" placeholder='Enter Here...' onChange={(e) => setUserName(e.target.value)}
                  className='input-field' />
              </div>
              <div className="basis-1/2">
                  <p className='text-lg font-bold'>Age</p>
                  <input type="number" placeholder='Enter Here...' onChange={(e) => setUserAge(e.target.value)}
                  className='input-field'/>
              </div>
            </div>
            <div className="">
                <p className='text-lg font-bold'>Curriculum</p>
                <Select options={curriculums}
                onChange={(curr) => {
                    if (curr) {
                        setUserCurriculum(curr.value);
                    }
                }} />
            </div>
            <div className="">
                <p className='text-lg font-bold'>Location</p>
                <Select options={locations} 
                onChange={(loc) => {
                    if (loc) {
                        setUserLocation(loc.value);
                    }
                }}/>
            </div>
            <div className="">
                <p className='text-lg font-bold'>Hobbies</p>
                <Select options={hobbies} isMulti 
                onChange={(hobbies) => {
                    if (hobbies) {
                        const addedHobbies = hobbies.map(option => option.value);
                        setUserHobbies(addedHobbies);
                    } else {
                        setUserHobbies([]);
                    }
                }}/>
            </div>
            <div className="">
                <button className='w-full text-xl text-white font-semibold bg-black py-2 px-2 rounded-md shadow-sm mt-5' type='submit'>
                    Submit
                </button>
            </div>
        </form>
        </div>
    )
};

export default RegisterUser;