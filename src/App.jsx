import { useState } from "react";
import Select from "./Select";
import { IoIosSearch } from "react-icons/io";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const searchData = async (selectedOption) => {
    const userRef = ref(db, "users/");
    let usersWithEvent = [];

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
                  // console.log("orderItems: ", orderItems);
                  // Iterate over items
                  orderItems.forEach((item) => {
                    console.log("item: ", item.eventTitle);
                    console.log("selectedOption: ", selectedOption);
                    if (
                      item.hasOwnProperty("eventTitle") &&
                      item.eventTitle == selectedOption.value
                    ) {
                      // If eventTitle matches selectedOption, add user to result
                      usersWithEvent.push(user);
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

    return usersWithEvent;
  };

  const handleSearch = async () => {
    if (selectedOption == null) return;
    const data = await searchData(selectedOption);
    console.log("data: ", data);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <img
        src="https://intranet.cb.amrita.edu/sites/default/files/inline-images/AMRIT-removebg-preview_2.png"
        alt="logo"
        className="h-24 mb-5"
      />
      <div className="max-w-xl w-full flex items-center gap-3">
        <Select setSelectedOption={setSelectedOption} />
        <button
          className="flex items-center gap-2 border border-zinc-300 px-3 py-2 text-sm rounded-md hover:bg-black hover:text-white duration-200 ease-in-out "
          onClick={handleSearch}
        >
          <IoIosSearch />
          Search
        </button>
      </div>
    </main>
  );
}

export default App;
