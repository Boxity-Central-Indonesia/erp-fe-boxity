import React, { useState, useEffect } from "react";
import { getApiData } from "../../../../function/Api";

// Komponen GreetingComponent
const GreetingComponent = ({ userName, currentDate, currentTime }) => {
  // Determine greetings based on time
  const getGreetingBasedOnTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      // Morning
      return ["Bright morning,", "Good morning,", "Morning vibes,"];
    } else if (hour >= 12 && hour < 18) {
      // Afternoon
      return ["Good afternoon,", "Hello,", "Afternoon vibes,"];
    } else {
      // Evening
      return ["Good evening,", "Hello,", "Evening vibes,"];
    }
  };

  // Select a random greeting from the available list
  const randomGreeting = (greetings) =>
    greetings[Math.floor(Math.random() * greetings.length)];

  // Get greetings based on time
  const timeGreetings = getGreetingBasedOnTime();

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

  return (
    <>
      <h3 className="text-4md font-semibold dark:text-white">
        {randomGreeting(timeGreetings)} {userName}!
      </h3>
      <p className="text-md">
        {currentDate} {currentTime}
      </p>
      <p className="text-md">{randomGreeting(focusGreetings)}</p>
      <p className="text-md">{randomGreeting(personalGreetings)}</p>
    </>
  );
};

// Komponen Dates
export const Dates = () => {
  const [userName, setUserName] = useState("");
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

    // Update live time
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
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
      currentDate={currentDate}
      currentTime={currentTime}
    />
  );
};

export default Dates;
