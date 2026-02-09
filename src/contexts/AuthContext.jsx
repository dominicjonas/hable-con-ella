import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
          await setDoc(userDocRef, { favourites: [] });
        }
      }
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, displayName = "") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, {
        displayName: displayName.trim(),
      });
    }

    // Save to Firestore (for other custom data)
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        displayName: displayName.trim() || email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: new Date().toISOString(),
        favourites: [],
      },
      { merge: true },
    ); // merge prevents overwriting existing data

    // Refresh the user object to ensure updated profile is available
    await user.reload();

    return userCredential;
  };

  const logout = () => signOut(auth);

  // Google Sign-in
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        favourites: [],
      });
    }

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
