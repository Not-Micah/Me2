"use client";

// Library Imports
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

// Own Function Imports
import { curriculums, locations, hobbies } from "../data";
import { addUser } from "../utils/usersfunctions";
import { getUserAuth, signOut } from "../utils/databasefunctions";

// Component Imports
import Button from "./Button";

// To Do:
// Add verification to check for unique username...

const RegisterUser = () => {
  const [clicked, setClicked] = useState(false);

  /////////////
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  /////////////
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  const auth = getUserAuth(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userName &&
      userAge &&
      userCurriculum &&
      userLocation &&
      userHobbies &&
      (instagram || discord || snap)
    ) {
      addUser(
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        auth.currentUser?.photoURL,
        instagram,
        discord,
        snap
      );
      setClicked(true);
      router.refresh();
    }
  };

  return (
    <div
      className="bg-[#D5E6FF] w-[100vw] h-[100vh]
    flex justify-center items-center"
    >
      <div
        className="w-[calc(100vw-8rem)] h-[calc(100vh-4rem)]
      flex flex-row shadow-md
      max-md:w-full max-md:h-full
      max-md:flex-col"
      >
        <div
          className="w-[500px] h-full bg-[#54ACFD]
        flex flex-col justify-center items-start gap-y-2 px-16
        max-md:max-w-[100vw] max-md:w-full
        max-md:py-14
        max-xl:w-[400px] max-lg:w-[300px]
        "
        >
          <Button onClick={signOut} className="mb-6 shadow-none text-sm">
            Return
          </Button>
          <h3 className="dynamic-subheading text-white font-semibold">
            Welcome to Me2!
          </h3>
          <p className="text-white/70">
            The platform where you will connect with like-minded individuals.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-grow h-full bg-white px-52 pt-40 pb-20  
        flex flex-col justify-center items-center gap-y-3 overflow-y-scroll
        max-md:overflow-y-visible max-md:items-start
        max-xl:px-28 max-lg:px-12"
        >
          <h3
            className="dynamic-subheading font-semibold text-center
          max-md:text-left"
          >
            Register
          </h3>
          <p
            className="dynamic-text text-gray-700 italic text-center
          max-md:text-left"
          >
            Me2 ensures your data is kept safe and not used in malpractice.
          </p>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
          <div className="w-full grid grid-cols-2 gap-x-3">
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setUserAge(e.target.value)}
              className="input-field"
            />
            <Select
              placeholder="Location"
              options={locations}
              onChange={(loc) => {
                if (loc) {
                  setUserLocation(loc.value);
                }
              }}
              styles={{
                control: (baseStyles: any, state: any) => ({
                  ...baseStyles,
                  borderColor: "rgba(198, 203, 210, 0.6)",
                  borderWidth: "2px",
                  borderRadius: "10px",
                  height: "45px",
                  marginTop: "-1px",
                  color: "rgba(198, 203, 210, 0.6)",
                  fontSize: "15.5px",
                }),
              }}
            />
          </div>
          <Select
            placeholder="Curriculum"
            className="w-full"
            options={curriculums}
            onChange={(curr) => {
              if (curr) {
                setUserCurriculum(curr.value);
              }
            }}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                borderColor: "rgba(198, 203, 210, 0.6)",
                borderWidth: "2px",
                borderRadius: "10px",
                height: "45px",
                marginTop: "-1px",
                color: "rgba(198, 203, 210, 0.6)",
                fontSize: "15.5px",
              }),
            }}
          />
          <Select
            placeholder="Hobbies"
            options={hobbies}
            className="w-full"
            isMulti
            onChange={(hobbies) => {
              if (hobbies) {
                const addedHobbies = hobbies.map((option) => option.value);
                setUserHobbies(addedHobbies);
              } else {
                setUserHobbies([]);
              }
            }}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                borderColor: "rgba(198, 203, 210, 0.6)",
                borderWidth: "2px",
                borderRadius: "10px",
                height: "45px",
                marginTop: "-1px",
                color: "rgba(198, 203, 210, 0.6)",
                fontSize: "15.5px",
              }),
            }}
          />
          <p
            className="dynamic-text text-gray-700 italic text-center
          max-md:text-left"
          >
            *Fill out at least one of these forms below.
          </p>
          <input
            type="text"
            placeholder="Instagram"
            onChange={(e) => setInstagram(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Discord"
            onChange={(e) => setDiscord(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Snap Chat"
            onChange={(e) => setSnap(e.target.value)}
            className="input-field"
          />
          <div
            className="w-full flex justify-end
          max-md:justify-start"
          >
            <button
              className="dynamic-text font-semibold 
              bg-[#FFD99F] py-2 px-6 rounded-md mt-5"
              type="submit"
              disabled={clicked}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;