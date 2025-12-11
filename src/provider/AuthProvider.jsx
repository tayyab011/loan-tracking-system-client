import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);

 const [loading, setLoading] = useState(true);
const googleprovider = new GoogleAuthProvider();
  const registerUger = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
   const signinUser = (email, password) => {
     setLoading(true);
     return signInWithEmailAndPassword(auth, email, password);
   };
    const updateUser = (data) => {
      return updateProfile(auth.currentUser,data);
    };
 const googlePopUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleprovider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
   const logout = () => {
     return signOut(auth)
       .then(() => { Swal.fire(
         "Logged Out",
         "You have been logged out successfully",
         "success"
       );}  )
       .catch((err) => {
         alert(err.message);
       });
   };
    const data = {
      registerUger,
      loading,
      googlePopUp,
      logout,
      signinUser,
      updateUser,
      user
    };
    return <AuthContext value={data}>{children}</AuthContext>;
};

export default AuthProvider;