/**
 * Ivan Tan
 * CSE 154 AI
 * Creative Project 5
 * May 30, 2019
 *
 * This is the main.js file for Creative Project 5.
 */
(function() {
  "use strict";

  /**
   * Represents the base URL for the API.
   */
  const API_URL = "posts.php";

  let prev = null;

  let next = null;

  window.addEventListener("load", init);

  /**
   * Initalizes and sets up the page.
   */
  function init() {
    fetchPosts(0);

    let prevButton = document.querySelector("#prev");
    prevButton.addEventListener("click", () => changePage(prev));

    let nextButton = document.querySelector("#next");
    nextButton.addEventListener("click", () => changePage(next));

    let addButton = document.querySelector("#add");
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      submitPost();
    });
  }

  /**
   * Fetches the posts.
   *
   * @param {int} offset - the desired offset
   */
  function fetchPosts(offset) {
    let url = API_URL + "?mode=retrieve&offset=" + offset;

    fetch(url)
    .then(checkStatus)
    .then(JSON.parse)
    .then(populatePosts)
    .catch(handleError);
  }

  /**
   * Changes the page of posts.
   * 
   * @param {int} page the desired page
   */
  function changePage(page) {
    fetchPosts(page)

    let postsContainer = document.querySelector("#posts");
    postsContainer.scrollIntoView();
    postsContainer.scrollTop = 0;
  }

  /**
   * Populates the page with the posts.
   *
   * @param {object} data - the posts data
   */
  function populatePosts(data) {
    let posts = document.querySelector("#posts div");

    // clear posts
    while (posts.childElementCount > 0) {
      posts.removeChild(posts.firstChild);
    }

    prev = handleNavButton("prev", data["prev"]);
    next = handleNavButton("next", data["next"]);

    let postsData = data["posts"];
    for (let i = 0; i < postsData.length; i++) {
      let current = postsData[i];
      posts.appendChild(createPost(current));
    }
  }

  /**
   * Handles the pagination buttons and hides/shows accordingly.
   *
   * @param {string} buttonId - the id of the desired button
   * @param {int} offset - the offset
   *
   * @returns {int} the offset
   */
  function handleNavButton(buttonId, offset) {
    let buttonSelector = "#" + buttonId;
    let button = document.querySelector(buttonSelector);

    if (offset !== null) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }

    return offset;
  }

  /**
   * Creates a post using the desired data.
   *
   * @param {object} postData - the post data
   *
   * @returns {HTMLElement} the generated post article
   */
  function createPost(postData) {
    let result = document.createElement("article");

    let content = document.createElement("p");
    content.innerText = postData["content"];
    result.appendChild(content);

    let postTimestamp = document.createElement("p");
    postTimestamp.innerText = "Posted: " + postData["post_timestamp"];
    result.appendChild(postTimestamp);

    if (postData["last_boosted"]) {
      let lastBoosted = document.createElement("p");
      lastBoosted.innerText = "Last boosted: " + postData["last_boosted"];
      result.appendChild(lastBoosted);
    }

    let button = document.createElement("button");
    button.addEventListener("click", () => boostPost(postData["id"]));

    let icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-rocket");
    button.appendChild(icon);

    let boostText = document.createTextNode(" BOOST!");
    button.appendChild(boostText);

    result.appendChild(button);

    return result;
  }

  /**
   * Submits and creates a new post.
   */
  function submitPost() {
    let content = document.querySelector("#content");
    let contentValue = content.value;
    content.value = ""; // clear user input


    if (contentValue) {
      let url = API_URL + "?mode=create";

      let data = new FormData();
      data.append("content", contentValue);

      fetch(url, {method: "POST", body: data})
      .then(checkStatus)
      .then(() => fetchPosts(0))
      .catch(handleError);
    }
  }

  /**
   * Boosts the post with the desired id.
   *
   * @param {int} id - the desired id
   */
  function boostPost(id) {
    let url = API_URL + "?mode=boost";

    let data = new FormData();
    data.append("id", id);

    fetch(url, {method: "POST", body: data})
    .then(checkStatus)
    .then(() => fetchPosts(0))
    .catch(handleError);
  }

  /**
   * Handles an error by displaying it on the page.
   *
   * @param {string} error - the error
   */
  function handleError(error) {
    let posts = document.querySelector("#posts");
    // clear #posts
    while (posts.childElementCount > 0) {
      posts.removeChild(posts.firstChild);
    }

    let errorHeading = document.createElement("h1");
    errorHeading.innerText = error;
    posts.appendChild(errorHeading);

    let create = document.querySelector("#create");
    create.classList.add("hidden");
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();