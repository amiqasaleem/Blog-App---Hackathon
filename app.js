import {
    app, 
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    provider,
    signInWithPopup
} from "./firebase.js";

const myModal = document.querySelectorAll(".modal");

//User State :

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user exist", user);
    } else {
        console.log("user not found");
    }
});

//User Sign up: 

let signUp = async () => {
    let signUpEmail = document.querySelector("#signUpEmail");
    let signUpPassword = document.querySelector("#signUpPassword");
    try {
        let result = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value);
        console.log("User is Registered");
        M.toast({html: 'Successfully Signed In', classes: "green"})
        console.log(result);
        setTimeout(()=>{
          window.location.href = "./home.html"
        },2000)
    } catch (error) {
        console.error("Error registering user:", error);
        // M.toast({html: error.message, classes: "red"})
    }
    signUpEmail.value = "";
    signUpPassword.value = "";
    // M.Modal.getInstance(myModal[0]).close();
}
let signUpBtn = document.querySelector("#signUpBtn");
signUpBtn.addEventListener("click", signUp);

//User Login :

let logIn = async () => {
    let loginEmail = document.querySelector("#loginEmail");
    let loginPassword = document.querySelector("#loginPassword");
    try {
        let result = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        console.log("User is Logged in");
        console.log(result);
        setTimeout(()=>{
          window.location.href = "./home.html"
        },2000)
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
let loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", logIn);


let logOutBtn = document.getElementById("logOutBtn");

document.addEventListener("DOMContentLoaded", () => {
  let logOutBtn = document.getElementById("logOutBtn");

  // Log out function
  let logout = () => {
      signOut(auth)
          .then(() => {
              console.log("User logged out successfully");

              setTimeout(() => {
                  window.location.href = "./index.html"; // Redirect after logout
              }, 2000);
          })
          .catch((error) => {
              console.log("Error logging out:", error);
          });
  };

  // Add event listener to log out button
  if (logOutBtn) {
      logOutBtn.addEventListener("click", logout);
  } else {
      console.log("Log Out button not found!");
  }
});


//Sign In with Google *************************************

let googleBtn = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   
    const user = result.user;
  
  }).catch((error) => {
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
let signInWithGoogle = document.querySelector("#signInWithGoogle");

signInWithGoogle.addEventListener("click", googleBtn);

