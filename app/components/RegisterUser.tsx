"use client";

// Library Imports
import { useState } from 'react';
import Select from 'react-select'
import { useRouter } from 'next/navigation';

// Own Function Imports
import { curriculums, locations, hobbies } from '../data';
import { addUser } from '../utils/usersfunctions';
import { getUserAuth } from '../utils/databasefunctions';

// To Do:
// Add verification to check for unique username...

const RegisterUser = () => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userCurriculum, setUserCurriculum] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [userHobbies, setUserHobbies] = useState<string[]>([]);

    const auth = getUserAuth(false);

    const router = useRouter();

    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userName && userAge && userCurriculum && userLocation && userHobbies) {
            addUser(userName, Number(userAge), userCurriculum, userLocation, userHobbies, auth.currentUser?.photoURL)
            router.refresh();
        }
      };

    return (
        <div className="bg-[#D5E6FF] h-[100vh] w-full content-center">
          <div className="flex flex-row justify-center">
            <div className="bg-[#77B5FF] h-[785px] sm:w-[300px] md:w-[350px] lg:w-[470px] content-center">
              <div className="m-7 mt-[-20px]">
                <p className="text-center text-white text-[35px] font-bold">Welcome to Me2!</p>
                <p className="text-center text-white text-[25px] font-semibold mt-4">The app where you shall connect and discover with minds alike</p>
              </div>
            </div>
            <div className="bg-white h-[785px] sm:w-[485px] md:w-[565px] lg:w-[760px]">
              <div className="flex justify-center">
                <form className='flex flex-col gap-y-4 m-14 sm:w-[310px] md:w-[360px] lg:w-[485px]' onSubmit={handleSubmit}>
                  <div className="mt-[60px]">
                      <h2 className='font-semibold text-[40px] text-center'>Register here!</h2>
                      <div className='flex justify-center mt-[5px]'>
                        <p className='flex text-[#4D4D4D] italic text-center text-[20px] mt-[15px] m-10 mb-[-20px] sm:w-[310px] md:w-[360px] lg:w-[485px]'>Me2 ensures your data is kept safe and not used in malpractice</p>
                      </div>
                  </div>
                  <div className="mt-[40px] sm:w-[310px] md:w-[360px] lg:w-[485px] flex place-self-center">
                    <input type='text' placeholder='Username' onChange={(e) => setUserName(e.target.value)} className='input-field rounded-[10px] h-[45px] hover:border-[#888888] hover:border-[1px] ease-in-out duration-500'/>
                  </div>
                  <div className="mt-[10px] flex flex-row sm:w-[310px] md:w-[360px] lg:w-[485px] place-self-center">
                    <input type='number' placeholder='Age' onChange={(e) => setUserAge(e.target.value)} className='input-field rounded-[10px] h-[45px] 
                    sm:w-[150px] md:w-[175px] md:mr-[13px] lg:w-[235px] lg:r-[20px] hover:border-[#888888] hover:border-[1px] ease-in-out duration-500'/>

                    <Select 
                      className='sm:min-w-[150px] md:min-w-[175px] lg:min-w-[235px] min-h-[45px]'
                      options={locations}
                      onChange={(curr) => {
                          if (curr) {
                              setUserLocation(curr.value);
                          }
                      }} 
                      placeholder='Location'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: 'rgba(198, 203, 210, 0.6)',
                          borderWidth: '2px',
                          borderRadius: '10px',
                          height: '48px',
                          marginTop: '-2px',
                          color: 'rgba(198, 203, 210, 0.6)',
                          fontSize: '15.5px',
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                          transitionDuration: '500ms',
                        })
                      }}/>
                  </div>
                  <div className="flex place-self-center mt-[10px]">
                      <Select options={curriculums} 
                      onChange={(loc) => {
                          if (loc) {
                              setUserCurriculum(loc.value);
                          }
                      }}
                      className='sm:w-[310px] md:w-[360px] lg:w-[485px]'
                      placeholder='Curriculum'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: 'rgba(198, 203, 210, 0.6)',
                          borderWidth: '2px',
                          borderRadius: '10px',
                          height: '48px',
                          marginTop: '-2px',
                          color: 'rgba(198, 203, 210, 0.6)',
                          fontSize: '16px',
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                          transitionDuration: '500ms',
                        })
                      }}/>
                  </div>
                  <div className="flex place-self-center mt-[10px]">
                      <Select options={hobbies} isMulti 
                      onChange={(hobbies) => {
                          if (hobbies) {
                              const addedHobbies = hobbies.map(option => option.value);
                              setUserHobbies(addedHobbies);
                          } else {
                              setUserHobbies([]);
                          }
                      }}
                      className='sm:w-[310px] md:w-[360px] lg:w-[485px]'
                      placeholder='Hobbies'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: 'rgba(198, 203, 210, 0.6)',
                          borderWidth: '2px',
                          borderRadius: '10px',
                          height: '48px',
                          marginTop: '-2px',
                          color: 'rgba(198, 203, 210, 0.6)',
                          fontSize: '16px',
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                          transitionDuration: '500ms',
                        })
                      }}/>
                  </div>
                  <div className="flex justify-right place-self-end">
                      <button className='text-xl font-semibold bg-[#FFE0B2] py-3 px-2 rounded-md shadow-sm mt-5 w-[160px] hover:bg-[#FFCD81] ease-in-out duration-500' type='submit'>
                          Submit
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
};

export default RegisterUser;