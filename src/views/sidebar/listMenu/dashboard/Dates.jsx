import { useState, useEffect } from "react";
import { getApiData } from "../../../../function/Api";


export const Dates = () => {
    const [userName, setUserName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [currentTime, setCurrentTime] = useState(
      new Date().toLocaleTimeString()
    );
    const [salesData, setSalesData] = useState([]);
    const [purchaseData, setPurchaseData] = useState([]);
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
  
      // Update greeting
      const hour = new Date().getHours();
      const newGreeting =
        hour < 12
          ? "Good Morning"
          : hour < 18
          ? "Good Afternoon"
          : "Good Evening";
      setGreeting(newGreeting);
  
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
  
      // Generate dummy data for sales and purchases
      const generateDummyData = () => {
        const dummySales = [];
        const dummyPurchases = [];
        for (let i = 0; i < 6; i++) {
          dummySales.push({
            month: `Month ${i + 1}`,
            sales: Math.floor(Math.random() * 1000) + 100,
          });
          dummyPurchases.push({
            month: `Month ${i + 1}`,
            purchases: Math.floor(Math.random() * 1000) + 100,
          });
        }
        setSalesData(dummySales);
        setPurchaseData(dummyPurchases);
      };
  
      generateDummyData();
  
      // Clean up interval
      return () => clearInterval(timerId);
    }, []);


    return (
        <>
            <h3 className="text-4md font-semibold dark:text-white">
            {greeting}, {userName}!
            </h3>
            <p className="text-md">
            {currentDate} {currentTime}
            </p>
        </>
    )
}