import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
const useaxios=useAxios()
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
 /*  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      useaxios.get(`/user-suspend/${currentUser.email}`).then(res=>{
        if (res.data?.status === "suspended") {
        signOut(auth);
            setUser(null);
             Swal.fire({
                    icon: "error",
                    title: "Account Suspended",
                    html: `
                        <p><b>Reason:</b> Multiple Fake Loan Applications </p>
                        <p><b>Details:</b> Your account has been suspended because we detected repeated submission of invalid or fraudulent loan applications. Please contact support if this was a mistake.</p>
                      `,
                  });
                  return
        }
      })
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []); */ 
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