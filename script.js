
        // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDzJQ98-bR582iGyAEzByjGQa1b4Alm42U",
    authDomain: "auth-4cd5a.firebaseapp.com",
    projectId: "auth-4cd5a",
    storageBucket: "auth-4cd5a.appspot.com",
    messagingSenderId: "156478894928",
    appId: "1:156478894928:web:1a3e8dbe4434b9b092b255"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const userEmail= document.querySelector("#userEmail");
        const userPassword= document.querySelector("#userPassword");
        const authForm= document.querySelector("#authForm");
        const secretContent= document.querySelector("#secretContent");
        const signUpButton= document.querySelector("#signUpButton");
        const signInButton= document.querySelector("#signInButton");
        const signOutButton= document.querySelector("#signOutButton");

        secretContent.style.display = 'none';

        const userSignUp = async() => {
            const signUpEmail = userEmail.value;
            const signUpPassword = userPassword.value;
            createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
            .then((userCredential)=> {
                const user = userCredential.user;
                console.log(user);
                alert("Your account has been created!");
            })
            .catch((error)=> {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
            })
        }


        const userSignIn = async() => {
            const signInEmail = userEmail.value;
            const signInPassword = userPassword.value;
            signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            .then((userCredential)=> {
                const user = userCredential.user;
                alert("You have signed in successfully!");
            })
            .catch((error)=> {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
            })
        }

        
        const checkAuthState = async() =>{
            onAuthStateChanged(auth, user =>{
                if(user) {
                   authForm.style.display ='none';
                   secretContent.style.display='block';
                }
                else{
                    authForm.style.display ='block';
                   secretContent.style.display='none';
                }
            })
        }

        const userSignOut = async() =>{
            await signOut(auth);
        }


        checkAuthState();
        signUpButton.addEventListener('click', userSignUp);
        signInButton.addEventListener('click', userSignIn);
        signOutButton.addEventListener('click', userSignOut);