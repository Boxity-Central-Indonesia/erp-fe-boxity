import React, { useState, useEffect } from "react";
import { getApiData } from "../../../../function/Api";

// Komponen GreetingComponent
const GreetingComponent = ({
  userName,
  greeting,
  currentDate,
  formattedTime,
}) => {
  // Determine greetings based on time
  const timeGreetings = greeting;

  // Determine greetings based on focus goals
  const focusGreetings = [
    "Let's boost your sales and profits today!",
    "Utilize Quick Access to reach your targets!",
    "Quick Access is ready to help manage your business effortlessly.",
  ];

  // Determine personal greetings
  const personalGreetings = [
    "How are you doing today?",
    "Hope you have a pleasant and blessed day!",
    "Don't forget to have coffee and breakfast before starting your activities!",
  ];

  // Select a random greeting from the available list
  const randomGreeting = (greetings) =>
    greetings[Math.floor(Math.random() * greetings.length)];

  // Determine whether to use focus or personal greeting randomly
  const getRandomGreetingType = () => {
    return Math.random() < 0.5 ? focusGreetings : personalGreetings;
  };

  const chosenGreetingType = getRandomGreetingType();

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-4md font-semibold dark:text-white">
          {randomGreeting(timeGreetings)} {userName}!
        </h3>
        <p className="text-md">{randomGreeting(chosenGreetingType)}</p>
      </div>
      <div>
        <p className="text-md">
          {currentDate} {formattedTime}
        </p>
      </div>
    </div>
  );
};

// Komponen Dates
export const Dates = () => {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await getApiData("profile");
        if (response.status === 200 && response.data.length > 0) {
          setUserName(response.data[0].user.name);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    // Determine greeting based on time
    const hour = new Date().getHours();
    const newGreeting =
      hour < 12
        ? ["Good morning,", "Hello,", "Morning vibes,"]
        : hour < 18
        ? ["Good afternoon,", "Hello,", "Afternoon vibes,"]
        : ["Good evening,", "Hello,", "Evening vibes,"];
    setGreeting(newGreeting);

    // Update live time
    const timerId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }, 1000);

    // Clean up interval
    return () => clearInterval(timerId);
  }, []);

  return (
    <GreetingComponent
      userName={userName}
      greeting={greeting}
      currentDate={currentDate}
      formattedTime={currentTime}
    />
  );
};

export default Dates;
