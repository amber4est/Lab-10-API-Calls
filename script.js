const fetchButton = document.getElementById("fetchButton");
const xhrButton = document.getElementById("xhrButton");
const postForm = document.getElementById("postForm");
const createPost = document.getElementById("createPost");
const dataDisplay = document.getElementById("dataDisplay");
const message = document.getElementById("message");

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
                displayPost(post);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    xhr.send();
});

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
 
  postObject = { 
    title,
    body,
    userId: 1
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObject)
  })
    .then((response) => response.json())
    .then((post) => {
        displayPost(post);
      postForm.reset();
    })
    //.catch(() => "Failed to send post", "error");
});

//function to display the post data
function displayPost(post) {
    dataDisplay.innerText = `Title:\n${post.title}\n\nBody:\n${post.body}\n\nUser ID:\n${post.userId}\n\nPost ID:\n${post.id}`;
}