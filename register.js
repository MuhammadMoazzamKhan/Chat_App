
const emailSign = document.getElementById("emailSign");
const passwordSign = document.getElementById("passwordSign");
const btnSign = document.getElementById("btnSign");
const name = document.getElementById("name");

const emailLog = document.getElementById("emailLog");
const passwordLog = document.getElementById("passwordLog");
const btnLog = document.getElementById("btnLog");
const err = document.getElementById("err");
const file = document.getElementById("file");

import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, db, doc, setDoc, storage, ref, uploadBytesResumable, getDownloadURL } from "./firebase.js"
import { signinContainer, logincontainer } from "./index.js"


const uploadfile = (file) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}


btnSign.addEventListener("click", async () => {

    console.log(name)
    btnSign.innerHTML = `<div class="spinner-border text-light"
    role="status">
    <span class="visually-hidden">Loading...</span>
</div>`
    createUserWithEmailAndPassword(auth, emailSign.value, passwordSign.value)
        .then(async (userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    fullName: name.value,
                    email: emailSign.value,
                    password: passwordSign.value,
                    file: file.files[0].name
                });
                const imagesRef = ref(storage, 'images');
                const spaceRef = ref(storage, `images/${file.files[0]}`);
                console.log("Succes")
                localStorage.setItem("uid", user.uid)
            } catch (err) {
                console.log(err)
            }
            sendEmailVerification(auth.currentUser)
                .then(() => {
                });
                uploadfile(file.files[0])
            err.style.display = "none";
            btnSign.innerHTML = "Sign Up"
            signinContainer.classList.remove("notActive");
            logincontainer.classList.add("notActive");

            emailSign.value = ""
            passwordSign.value = ""
            name.value = ""
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if (errorMessage == "Firebase: Error (auth/invalid-email)."  ) {
                err.innerHTML = "Something have gone wrong! Try Again."
                btnSign.innerHTML = "Sign Up"
                err.style.display = "block"
            } else if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
                err.innerHTML = "You're already registered go to login page."
                err.style.display = "block"
                btnSign.innerHTML = "Sign Up";
            }else if(errorMessage == "Firebase: Error (auth/missing-password)."){
                err.innerHTML = "Enter the password.."
                btnSign.innerHTML = "Sign Up"
                err.style.display = "block"
            }
        });
})

btnLog.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailLog.value, passwordLog.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            if(user.emailVerified){
                signinContainer.classList.add("notActive");
                document.getElementsByTagName("main")[0].classList.remove("notActive")
            }else{
                document.getElementById('verify-message').style.display = "block";
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorMessage-->" + errorMessage)
        });
})
console.log(auth.currentUser)
if(auth.currentUser){
    signinContainer.classList.add("notActive")
    logincontainerContainer.classList.add("notActive")
    document.getElementsByTagName("main")[0].classList.remove("notActive")
}