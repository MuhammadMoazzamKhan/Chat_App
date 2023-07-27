
const emailSign = document.getElementById("emailSign");
const passwordSign = document.getElementById("passwordSign");
const btnSign = document.getElementById("btnSign");
const name = document.getElementById("name");

const userList = document.getElementById("user-list");
const howMuchUser = document.getElementById("howMuchUser");

const main = document.getElementsByTagName("main")[0];
const messageInput = document.getElementById('message-input');
const logOutBtn = document.getElementById("logout-btn");
const profilePic = document.getElementById("profile-pic");
const profileName = document.getElementById("profile-name");
const messageSendbtn = document.getElementById("message-send-btn");
console.log(messageSendbtn)

const emailLog = document.getElementById("emailLog");
const passwordLog = document.getElementById("passwordLog");
const btnLog = document.getElementById("btnLog");
const err = document.getElementById("err");
const file = document.getElementById("file");
const messageInlog = document.getElementById("verify-message");

import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, db, doc, setDoc, getDoc, addDoc, serverTimestamp, onSnapshot, orderBy, increment, storage, ref, updateDoc, uploadBytesResumable, collection, query, where, getDocs, getDownloadURL, user } from "./firebase.js"
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
    btnSign.innerHTML = `<div class="spinner-border text-light"
    role="status">
    <span class="visually-hidden">Loading...</span>
</div>`
    createUserWithEmailAndPassword(auth, emailSign.value, passwordSign.value)
        .then(async (userCredential) => {
            try {
                console.log(emailSign.value)
                console.log(passwordSign.value)
                console.log(name.value)
                const user = userCredential.user;
                main.classList.add("notActive");
                await setDoc(doc(db, "users", user.uid), {
                    fullName: name.value,
                    email: emailSign.value,
                    password: passwordSign.value,
                    file: file.files[0].name,
                    uid: user.uid
                });
                console.log("Succes")
                localStorage.setItem("uid", user.uid)
            } catch (err) {
                console.log(err)
            }
            uploadfile(file.files[0])
            err.style.display = "none";
            btnSign.innerHTML = "Sign Up"
            logincontainer.classList.add("notActive");
            signinContainer.classList.remove("notActive");

            emailSign.value = ""
            passwordSign.value = ""
            name.value = ""
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/invalid-email).") {
                err.innerHTML = "Something have gone wrong! Try Again."
                btnSign.innerHTML = "Sign Up"
                err.style.display = "block"
            } else if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
                err.innerHTML = "You're already registered go to login page."
                err.style.display = "block"
                btnSign.innerHTML = "Sign Up";
            } else if (errorMessage == "Firebase: Error (auth/missing-password).") {
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
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    signinContainer.classList.add("notActive")
                    logincontainer.classList.add("notActive")
                    main.classList.remove("notActive")
                } else {
                    main.classList.add("notActive")
                    signinContainer.classList.add("notActive");
                    logincontainer.classList.remove("notActive")
                }
            });
            signinContainer.classList.add("notActive");
            main.classList.remove("notActive")
            // if (user.emailVerified) {
            // } else {
            //     messageInlog.style.display = "block";
            // }
            emailLog.value = "";
            passwordLog.value = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/wrong-password).") {
                messageInlog.style.display = "block";
                messageInlog.classList.add("text-danger")
                messageInlog.innerHTML = "Your password is incorrect.";
            }
        });
})

logOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        main.classList.add("notActive")
        signinContainer.classList.add("notActive");
        logincontainer.classList.remove("notActive")
    }).catch((error) => {
        console.log(error)
    });
})

let currentUserName;
const getData = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let { fullName, file } = docSnap.data();
            currentUserName = fullName;
            profileName.innerHTML = fullName;
            if (file) {
                profilePic.src = file
            } else {
                profilePic.src = "profilepic.png"
            }
        } else {
            console.log("No such document!");
        }
    } catch (err) {
        console.log("err " + err)
    }
}




onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        localStorage.setItem("uid", uid)
        getData(uid)
        signinContainer.classList.add("notActive")
        logincontainer.classList.add("notActive")
        main.classList.remove("notActive")
        getAllUsers()

        showNoti(uid)
    } else {
        main.classList.add("notActive")
        signinContainer.classList.add("notActive");
        logincontainer.classList.remove("notActive")
    }
});
const getAllUsers = async () => {
    try {
        let currentUserId = localStorage.getItem("uid");
        const q = query(collection(db, "users"), where("uid", "!=", currentUserId), orderBy('uid', "isActive", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            userList.innerHTML = "";
            console.log(users)
            howMuchUser.innerHTML = users.length;
            for (let i = 0; i < users.length; i++) {
                const { fullName, isActive, uid, file, email, notifications } = users[i];
                userList.innerHTML += `<p class="cursor" onclick="userCatch('${fullName}', '${email}' , '${file}','${uid}')"><img  src="${file ? file : "profilepic.png"}" alt="" width="40px">${fullName}</p>
                <div>
                <div class="online-dot ${isActive ? "green-dot" : "red-dot"}"></div>
                ${notifications ? `<span class="notification-badge position-absolute translate-middle badge rounded-pill bg-primary">${notifications}
                <span class="visually-hidden">unread messages</span>
                </span>
                </div>` : ""}
                `
                console.log(true)
                onlineShow()
            }
        })
    } catch (err) {
        console.log("error", err)
    }
}
let UserName;
let selectUserId;
const userCatch = (name, email, file, selectedId) => {
    UserName = name;
    selectUserId = selectedId
    let currentUserId = localStorage.getItem("uid");
    let chatId;
    if (currentUserId < selectUserId) {
        chatId = currentUserId + selectUserId;
    } else {
        chatId = selectUserId + currentUserId;
    }
    const userJoin = document.getElementById('user-join');
    userJoin.innerHTML = `<p><img src="${file ? file : "profilepic.png"}" width="40px" alt=""><b>${name}</b> joined the chat</p>`
    fetchAllMessages(chatId);
}
window.userCatch = userCatch;


const showNoti = async (uid) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        notifications: increment(1),
    });
    console.log(userRef, "userRef")
}

const messageProcess = async () => {
    try {
        if (messageInput.value) {
            const chatBox = document.getElementById("chat-box");
            let currentUserId = localStorage.getItem("uid")
            let chatId;
            console.log(selectUserId)
            console.log(currentUserId)
            if (currentUserId < selectUserId) {
                chatId = currentUserId + selectUserId;
            } else {
                chatId = selectUserId + currentUserId;
            }
            let message = messageInput.value;
            messageInput.value = "";
            const docRef = await addDoc(collection(db, "messages"), {
                message: message,
                chatId: chatId,
                timeStemp: serverTimestamp(),
                sender: currentUserId,
                receiver: selectUserId
            });
        }
    } catch (err) {
        console.log("err", err)
    }
}

messageSendbtn.addEventListener("click", () => {
    messageProcess()
})

messageInput.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        messageProcess()
    }
})


const fetchAllMessages = (chatId) => {
    const chatBox = document.getElementById("chat-box");
    let currentUserId = localStorage.getItem("uid")
    const q = query(collection(db, "messages"), where("chatId", "==", chatId), orderBy("timeStemp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        chatBox.innerHTML = ""
        for (var i = 0; i < messages.length; i++) {
            let time = messages[i].timeStemp ? moment(messages[i].timeStemp.toDate()).fromNow() : moment().fromNow();
            if (currentUserId == messages[i].sender) {
                chatBox.innerHTML += ` <div class="message outgoing">
                                <h5>${currentUserName}</h5>
                                <p class="message-set">${messages[i].message}<span class="ms-3" >${time}</span></p>
                             </div>
                            `
            } else {
                chatBox.innerHTML += `
                            <div class="message incoming">
                               <h5>${UserName}</h5>
                               <p>${messages[i].message}<span class="mx-3" style=" color: black; font-size: 12px;" >${time}</span></p>
                             </div>
                            `
            }

        }
    });
}

const onlineShow = async (status) => {
    let currentUserRes = localStorage.getItem("uid")
    const userRef = doc(db, "users", currentUserRes);
    await updateDoc(userRef, {
        isActive: status,
    });
}


window.addEventListener("focus", () => {
    onlineShow(true)
})
window.addEventListener("beforeunload", () => {
    onlineShow(false)
    localStorage.removeItem("uid")
})