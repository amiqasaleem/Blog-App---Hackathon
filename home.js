import {
    signOut,
    db,
    getFirestore,
    collection, 
    addDoc,
    getDocs,
    Timestamp,
    query,
    orderBy,
    limit,
    doc, deleteDoc
} from "./firebase.js";

let displayBlogs = document.querySelector("#displayBlogs");
let arr = [];

let getData = async () => {
    try {
        const q = query(collection(db, "posts"), orderBy("datenow", "desc"));
        const querySnapshot = await getDocs(q);
        arr = [];
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), docId: doc.id });
        });

        displayBlogs.innerHTML = '';
        arr.forEach((item) => {
            displayBlogs.innerHTML += `
                <div class="card my-3" style="width: 25rem;">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><small class="text-muted">${item.datenow.toDate()}</small></p>
                        <button class="btn btn-danger dltBtn" data-id="${item.docId}">Delete</button>
                    </div>
                </div>`;
        });
        attachEventListeners();

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

const attachEventListeners = () => {
    let dltBtns = document.querySelectorAll(".dltBtn");
    dltBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const docId = event.target.getAttribute("data-id");
            try {
                await deleteDoc(doc(db, "posts", docId));
                getData(); 
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        });
    });
};

let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let title = document.querySelector("#blogTitle").value;
    let description = document.querySelector("#blogDescription").value;

    if (title && description) {
        try {
            await addDoc(collection(db, "posts"), {
                title: title,
                description: description,
                datenow: Timestamp.fromDate(new Date())
            });

            document.querySelector("#blogTitle").value = "";
            document.querySelector("#blogDescription").value = "";

            getData(); 

        } catch (error) {
            console.error("Error adding document:", error);
        }
    } else {
        alert("Please fill in both fields.");
    }
});

getData();
