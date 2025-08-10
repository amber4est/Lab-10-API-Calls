const fetchButton = document.getElementById("fetchButton");
const xhrButton = document.getElementById("xhrButton");
const postForm = document.getElementById("postForm");
const createPost = document.getElementById("createPost");
const dataDisplay = document.getElementById("dataDisplay");
const postData = document.getElementById("postDisplay");
const putData = document.getElementById("putDisplay");
const message = document.getElementById("message");
const putForm = document.getElementById("putForm");
const deleteData = document.getElementById("deleteDisplay");
const deleteForm = document.getElementById("deleteForm");

//fetch
fetchButton.addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            dataDisplay.innerText =" "; //clear previous data
            displayPost(post);
        })
        .catch(error => console.error('Error fetching data:', error));
});

//xhr
xhrButton.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const post = JSON.parse(xhr.responseText);
                dataDisplay.innerText =" "; //clear previous data
                displayPost(post);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    xhr.send();
});

//post
postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
 
    const postObject = { 
        title,
        body,
        userId: 1
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postObject)
    })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to create post');
            return response.json();
        })
        .then((post) => {
            postDisplay(post);
            postForm.reset(); //reset post form
        })
        
        .catch(error => postData.innerText = "Failed to send post: " + error.message);
});

//put
putForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const id = document.getElementById("putId").value;
    const title = document.getElementById("putTitle").value;
    const body = document.getElementById("putBody").value;

    const updatedPostObject = {
        title,
        body,
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const post = JSON.parse(xhr.responseText);
                putDisplay(post);
                putForm.reset();
            }
            else {
                putData.innerText = `Error ${xhr.status}: Unable to update post. Please try an ID between 1 and 100.`;
                //putData.innerText = "Error updating post.";
            }
        }
    };

    xhr.send(JSON.stringify(updatedPostObject));
});

//delete
deleteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("deleteId").value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE"
    })
    .then((response) => {
        if (response.ok) {
            deleteData.textContent = `Post ID ${id} has been deleted!`;
        } else {
            throw new Error(`Failed to delete post. Status: ${response.status}`);
        }
    })
    .catch((error) => {
        deleteData.textContent = `Error: ${error.message}`;
    });

    deleteForm.reset();
});

//functions to display the post data
function displayPost(post) {
    dataDisplay.innerText += `Title:\n${post.title}\n\nBody:\n${post.body}\n\n`; //"+" for the fetch all option
}

function postDisplay(post) {
    postData.innerText = `New Post Created!\n\nUser ID:\n${post.userId}\n\nPost ID:\n${post.id}\n\nTitle:\n${post.title}\n\nBody:\n${post.body}`;
}

function putDisplay(post) {
    putData.innerText = `Post has been updated!\n\nUser ID:\n${post.userId}\n\nPost ID:\n${post.id}\n\nTitle:\n${post.title}\n\nBody:\n${post.body}`;
}

document.getElementById('fetchAllButton').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            const dataDisplay = document.getElementById("dataDisplay");
            dataDisplay.innerText =" "; //clear previous data
             posts.slice(0, 3).forEach(post => { //only displaying 3 instead of all 100
                displayPost(post);
            });
        })
        .catch(error => dataDisplay.innerText = "Unable to fetch posts: " + error.message);
});