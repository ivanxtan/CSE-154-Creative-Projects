/**
 * Ivan Tan
 * CSE 154 AI
 * Creative Project 4
 * May 17, 2019
 *
 * This is the main.js file for Creative Project 4.
 */

(function() {
  "use strict";

  /**
   * Represents the URL for the API.
   */
  const API_URL = "items.php";

  window.addEventListener("load", init);

  /**
   * Initializes and sets up the page.
   */
  function init() {
    fetchItems();

    let detailsButton = document.querySelector("#details button");
    detailsButton.addEventListener("click", function() {
      this.parentNode.classList.add("hidden");
    });
  }

  /**
   * Fetches the items and populates the item section with an item list.
   */
  function fetchItems() {
    let url = API_URL + "?item=all";

    let itemsHeading = document.querySelector("#items h1");
    itemsHeading.innerText = "Items Loading...";

    fetch(url)
    .then(checkStatus)
    .then(populateItems)
    .catch(handleError);
  }

  /**
   * Populates the items section with an item list.
   *
   * @param {string} data - the desired item data
   */
  function populateItems(data) {
    let items = data.split("\n");

    let list = createItemList(items);

    let itemsSection = document.querySelector("#items");
    itemsSection.appendChild(list);

    let itemsHeading = document.querySelector("#items h1");
    itemsHeading.innerText = "Items";
  }

  /**
   * Creates a list with the desired items.
   *
   * @param {array} items - the desired items
   *
   * @returns {HTMLUListElement} the generated list
   */
  function createItemList(items) {
    let list = document.createElement("ul");
    for (let i = 0; i < items.length; i++) {
      let current = items[i];

      let item = document.createElement("li");

      let itemName = document.createElement("h2");
      itemName.innerText = current;

      let itemButton = document.createElement("button");
      itemButton.innerText = "Details";
      itemButton.addEventListener("click", function() {
        fetchItem(current);
      });

      item.appendChild(itemName);
      item.appendChild(itemButton);

      list.appendChild(item);
    }

    return list;
  }

  /**
   * Fetches data about a specific item and populates the details section with
   * its information.
   *
   * @param {string} itemName - the desired item name
   */
  function fetchItem(itemName) {
    let url = API_URL + "?item=" + itemName;

    let details = document.querySelector("#details");
    details.classList.remove("hidden");

    let detailsHeading = document.querySelector("#details h2");
    detailsHeading.innerText = "Loading...";
    let detailsParagraph = document.querySelector("#details p");
    detailsParagraph.innerText = "";

    fetch(url)
    .then(checkStatus)
    .then(JSON.parse)
    .then(populateDetails)
    .catch(handleError);
  }

  /**
   * Populates the details section with the desired item's information.
   *
   * @param {object} data - the desired item data
   */
  function populateDetails(data) {
    let itemName = data["name"];
    let itemDescription = data["description"];

    let detailsHeading = document.querySelector("#details h2");
    detailsHeading.innerText = itemName;

    let detailsParagraph = document.querySelector("#details p");
    detailsParagraph.innerText = itemDescription;
  }

  /**
   * Displays an error message to the user.
   * @param {object} error - the error
   */
  function handleError(error) {
    let details = document.querySelector("#details");
    details.classList.add("hidden");

    let items = document.querySelector("#items");
    items.innerHTML = "";

    let errorHeading = document.createElement("h1");
    errorHeading.innerText = "An error occured!";

    let errorItem = document.createElement("h2");
    errorItem.innerText = error;

    items.appendChild(errorHeading);
    items.appendChild(errorItem);
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