import { useState } from "react";
import Select from "./Select";
import { IoIosSearch } from "react-icons/io";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import ReactCSV from "./ReactCSV";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([]); // Replace with useState([
  const [loading, setLoading] = useState(false);

  const searchData = async (selectedOption) => {
    const userRef = ref(db, "users/");
    let usersWithEvent = [];

    if (selectedOption.value === "All") {
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();

          // Iterate over each user
          Object.keys(userData).forEach((userId) => {
            const user = userData[userId];

            // Check if user has orders
            if (user.hasOwnProperty("orders")) {
              const userOrders = user.orders;
              // Iterate over orders
              Object.keys(userOrders).forEach((orderId) => {
                const order = userOrders[orderId];

                Object.keys(order).forEach((key) => {
                  // Check if order has items
                  const orderI = order[key];
                  if (orderI.hasOwnProperty("items")) {
                    const orderItems = orderI.items;
                    // Iterate over items
                    orderItems.forEach((item) => {
                      if (item.hasOwnProperty("eventTitle")) {
                        // Add user to result for any event
                        usersWithEvent.push(user.Details?.userDetails);
                      }
                    });
                  }
                });
              });
            }
          });
        } else {
          console.log("No users found");
        }
      });
    } else {
      // Search for a specific event
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();

          // Iterate over each user
          Object.keys(userData).forEach((userId) => {
            const user = userData[userId];

            // Check if user has orders
            if (user.hasOwnProperty("orders")) {
              const userOrders = user.orders;
              // Iterate over orders
              Object.keys(userOrders).forEach((orderId) => {
                const order = userOrders[orderId];

                Object.keys(order).forEach((key) => {
                  // Check if order has items
                  const orderI = order[key];
                  if (orderI.hasOwnProperty("items")) {
                    const orderItems = orderI.items;
                    // Iterate over items
                    orderItems.forEach((item) => {
                      if (
                        item.hasOwnProperty("eventTitle") &&
                        item.eventTitle === selectedOption.value
                      ) {
                        // If eventTitle matches selectedOption, add user to result
                        usersWithEvent.push(user.Details?.userDetails);
                      }
                    });
                  }
                });
              });
            }
          });
        } else {
          console.log("No users found");
        }
      });
    }

    return usersWithEvent;
  };

  const handleSearch = async () => {
    if (selectedOption == null) return;
    const data = await searchData(selectedOption);
    setData(data);
  };

  return (
    <main className="h-screen flex flex-col p-5 md:p-0 items-center justify-center">
      <img
        src="https://intranet.cb.amrita.edu/sites/default/files/inline-images/AMRIT-removebg-preview_2.png"
        alt="logo"
        className="h-24 mb-5"
      />
      <div
        className="max-w-xl w-full flex items-center gap-3"
        onClick={handleSearch}
      >
        <Select setSelectedOption={setSelectedOption} />
        <button className="flex items-center gap-2 border border-zinc-300 px-3 py-2 text-sm rounded-md hover:bg-black hover:text-white duration-200 ease-in-out ">
          <IoIosSearch />
          Search
        </button>
      </div>
      {/* {data.length > 0 && <ExcelExport data={data} fileName={selectedOption} />} */}
      {data?.length > 0 && (
        <ReactCSV data={data} selectedOption={selectedOption.value} />
      )}
    </main>
  );
}

export default App;
