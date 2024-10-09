import React, { useState } from "react";
import { auth, db } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection } from 'firebase/firestore'; // Import correct Firestore methods

function ChatFirebaseLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLoginOrRegister = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegistering) {
        // Register new user
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Get a reference to the 'users' collection and the user's document
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, userCredential.user.uid);
        
        // Set user document in Firestore
        await setDoc(userDocRef, {
          displayName: email.split("@")[0],
          email: email,
          role: role,
        });
      } else {
        // Login existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/chatwindow"); // Navigate to chat page after successful login/register
    } catch (error) {
      console.error("Authentication Error: ", error);
      alert(`Authentication failed! ${error.message} (${error.code})`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isRegistering ? "Register" : "Login"} to Chat</h2>
      <form onSubmit={handleLoginOrRegister} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: "10px", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: "10px", padding: "10px" }}
        />

        {isRegistering && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          >
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none" }}>
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
}

export default ChatFirebaseLogin;