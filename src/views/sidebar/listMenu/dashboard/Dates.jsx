import React, { useState, useEffect } from "react";
import { getApiData } from "../../../../function/Api";

// Komponen GreetingComponent
const GreetingComponent = ({
  userName,
  timeGreetings,
  focusGreetings,
  currentDate,
  formattedTime,
}) => {
  // Select a random greeting from the available list
  const randomGreeting = (greetings) =>
    greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-2xl font-semibold dark:text-white">
          {randomGreeting(timeGreetings)} {userName}!
        </h1>
        <p className="text-md">{randomGreeting(focusGreetings)}</p>
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
  const [timeGreetings, setTimeGreetings] = useState([]);
  const [focusGreetings, setFocusGreetings] = useState([]);
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

    // Fetch greetings data
    const fetchGreetingsData = async () => {
      try {
        // Simpan data salam berdasarkan waktu
        const hour = new Date().getHours();
        const newTimeGreetings =
          hour < 12
            ? ["Good morning 🌅,", "Hello 👋,", "Morning vibes ☀️,"]
            : hour < 18
            ? ["Good afternoon 🌞,", "Hello 👋,", "Afternoon vibes 🌻,"]
            : ["Good evening 🌙,", "Hello 👋,", "Evening vibes 🌠,"];
        setTimeGreetings(newTimeGreetings);

        // Simpan data salam berdasarkan tujuan fokus
        const newFocusGreetings = [
          "Let's boost your sales and profits today 💼",
          "Utilize Quick Access to reach your targets 🚀",
          "Quick Access is ready to help manage your business effortlessly 💡",
        ];
        setFocusGreetings(newFocusGreetings);
      } catch (error) {
        console.error("Error fetching greetings data:", error);
      }
    };

    fetchUserProfile();
    fetchGreetingsData();

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
    }, 60000);

    // Clean up interval
    return () => clearInterval(timerId);
  }, []);

  return (
    <GreetingComponent
      userName={userName}
      timeGreetings={timeGreetings}
      focusGreetings={focusGreetings}
      currentDate={currentDate}
      formattedTime={currentTime}
    />
  );
};

export default Dates;
