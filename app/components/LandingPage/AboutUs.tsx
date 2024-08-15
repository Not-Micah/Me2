import PeopleHuggingIcon from "../Icons/PeopleHuggingIcon";
import ClockIcon from "../Icons/ClockIcon";
import LearnIcon from "../Icons/LearnIcon";

const AboutUs = () => {
  const cards = [
    {
      icon: PeopleHuggingIcon,
      title: "Find your people",
      description:
        "Through algorithm based sorthing, all users can find others with similar interests and identities!",
      iconMarginX: "0",
    },
    {
      icon: ClockIcon,
      title: "Time Efficient",
      description:
        "Each chat is only open for 24 hours; after which it closes and gives users the chance to accept or decline the option to share socials.",
      iconMarginX: "0px",
    },
    {
      icon: LearnIcon,
      title: "Safety Concerns",
      description:
        "Me2 allows you to close chats whenever you want! Additionally it does not allow users to share images preventing - you know...",
      iconMarginX: "0",
    },
  ];

  return (
    <section className="flex flex-col justify-center">
      {/* <img src="/clumsy.svg" alt="Clumsy SVG" className="wabsolute left-[400px] -z-10 -rotate-[20deg]
      dynamic-svg"/>
      <img src="/roller-skating.svg" alt="Clumsy SVG" className="absolute right-[400px] -z-10\
      dynamic-svg"/> */}
      <div className="flex justify-center items-center relative">
        <h3 className="dynamic-subheading font-semibold mt-[200px] mb-[40px]">
          <span 
          className="font-semibold text-[#8DC1FF] text-base uppercase">
            Some Features 
          <br /></span> 
          Why Choose Us?
        </h3>
      </div>
      <div className="flex flex-row justify-center gap-x-[15px] mb-[100px]
      max-lg:flex-col max-lg:items-center max-lg:gap-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center h-[325px] 
            w-[335px] max-xl:w-[300px] max-lg:w-[80vw]
            blue-gradient rounded-md shadow-md"
          >
            <div className="flex items-center justify-center w-full h-[100px] mt-[20px]">
              <card.icon className={`ml-[${card.iconMarginX}]`} />
            </div>
            <p className="text-xl font-semibold h-[35px]
            flex justify-center items-center mt-[15px]">{card.title}</p>
            <p className="text-center text-sm max-w-[200px] h-[125px]
            flex justify-center items-start">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
