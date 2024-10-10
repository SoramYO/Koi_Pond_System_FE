import React, { useState, useEffect } from "react";
import { db } from "./FirebaseConfig"; // Import Firestore instance
import { collection, onSnapshot } from "firebase/firestore"; // Import necessary Firestore methods

function UserSearch({ onSelectUser, currentUserRole }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users"); // Reference to users collection
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Filter users based on role: if current user is a customer, show only staff members
      const filteredUsers = usersData.filter((user) => {
        if (currentUserRole === "customer") {
          return user.role === "staff"; // Customer can only see staff
        }
        return user.role !== "admin"; // Staff can see other staff and customers
      });
      setUsers(filteredUsers);
    });
    return () => unsubscribe();
  }, [currentUserRole]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search for users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
      />
      {/* Only display users when the search input is not empty */}
      {search.trim() !== "" && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users
            .filter((user) => user.displayName.toLowerCase().includes(search.toLowerCase()))
            .map((user) => (
              <li key={user.id} style={{ padding: "10px", cursor: "pointer" }} onClick={() => onSelectUser(user)}>
                {user.displayName} ({user.role}) {/* Show user role */}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default UserSearch;