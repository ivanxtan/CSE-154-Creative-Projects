/*
  Ivan Tan
  CSE 154 AI
  April 20, 2019
  Creative Project 2

  This is the main.js that controls the behavior of the pages (index.html) for
  Creative Project 2. Allows for a user to create and delete events. It also keeps
  track of the number of events. Additionally, it allows for the user to toggle
  between colors for the editor and agenda.
*/

(function() {
  "use strict";

  window.addEventListener("load", init);

  /**
   * Initializes and sets up the page.
   */
  function init() {
    let addEventButton = document.querySelector("#add-event-button");
    addEventButton.addEventListener("click", addEvent);

    let toggleButton = document.querySelector("#toggle-button");
    toggleButton.addEventListener("click", toggleColor);
  }

  /**
   * Adds an event using the input that the user provided.
   * @param {event} e - the event attached
   */
  function addEvent(e) {
    // prevent the page from refreshing
    e.preventDefault();

    // get user input
    let eventTitle = document.querySelector("#event-title");
    let eventDescription = document.querySelector("#event-description");

    if (eventTitle.value !== "" && eventDescription.value !== "") { // valid
      // create new event
      let newEvent = createEventElement(eventTitle, eventDescription);

      // add event
      let eventList = document.querySelector("#agenda ul");
      eventList.appendChild(newEvent);

      // update count
      updateCount();
    }

    // clear user input
    eventTitle.value = "";
    eventDescription.value = "";
  }

  /**
   * Creates a DOM element that represents an event using the desired data.
   * @param {object} eventTitle - the DOM element with the event title
   * @param {object} eventDescription - the DOM element with the event description
   * @returns {object} a DOM element representing an event with the desired data
   */
  function createEventElement(eventTitle, eventDescription) {
      // create event elements
      let newEvent = document.createElement("li");

      let newEventTitle = document.createElement("h2");
      newEventTitle.innerText = eventTitle.value;

      let newEventDescription = document.createElement("p");
      newEventDescription.innerText = eventDescription.value;

      let newEventDelete = document.createElement("button");
      newEventDelete.innerText = "Delete";
      newEventDelete.addEventListener("click", deleteEvent);

      let newEventCheckbox = document.createElement("input");
      newEventCheckbox.type = "checkbox";

      // create event
      newEvent.appendChild(newEventTitle);
      newEvent.appendChild(newEventCheckbox);
      newEvent.appendChild(newEventDescription);
      newEvent.appendChild(newEventDelete);

      return newEvent;
  }

  /**
   * Deletes the desired event.
   */
  function deleteEvent() {
    let thisEvent = this.parentElement;
    thisEvent.parentElement.removeChild(thisEvent);
    updateCount();
  }

  /**
   * Updates the count with the number of events.
   */
  function updateCount() {
    let eventList = document.querySelector("#agenda ul");
    let count = document.querySelector("#count");
    count.innerText = eventList.childElementCount;
  }

  /**
   * Toggles the colors between the editor and agenda.
   */
  function toggleColor() {
    let editor = document.querySelector("#editor");
    let agenda = document.querySelector("#agenda");

    editor.classList.toggle("toggled-color");
    agenda.classList.toggle("toggled-color");
  }
})();