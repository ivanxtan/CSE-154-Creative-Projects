/**
 * Ivan Tan
 * CSE 154 AI
 * Creative Project 3
 * May 1st, 2019
 *
 * This is the main.js file for Creative Project 3. It allows a user to learn more about a random
 * country by using the Country Data API: https://restcountries.eu/
 *
 * Portions taken or adapted from the CSE 154 AJAX Template:
 * https://courses.cs.washington.edu/courses/cse154/19sp/resources/assets/templates/js/ajax-template.js
 */
(function() {
  "use strict";

  const BASE_URL = "https://restcountries.eu/rest/v2/";

  let COUNTRY_DATA;

  window.addEventListener("load", init);

  /**
   * Initializes and sets up the page.
   */
  function init() {
    fetchCountryData();

    let getStartedButton = document.querySelector("#get-started");
    getStartedButton.addEventListener("click", function() {
      getRandomCountry();
      switchView();
    });

    let getAnotherButton = document.querySelector("#get-another");
    getAnotherButton.addEventListener("click", function() {
      getRandomCountry();
    });
  }

  /**
   * Fetches all the country data from the Country Data API.
   */
  function fetchCountryData() {
    fetch(BASE_URL + "all")
    .then(checkStatus)
    .then(JSON.parse)
    .then(processCountryData)
    .catch(handleError);
  }

  /**
   * Processes the data and filters for the needed information.
   *
   * @param {object} data - the desired country data
   */
  function processCountryData(data) {
    COUNTRY_DATA = [];

    for (let i = 0; i < data.length; i++) {
      let current = data[i];
      let country = {
        // filter for desired data
        name: current.name,
        region: current.region,
        subregion: current.subregion,
        capital: current.capital,
        population: current.population,
        area: current.area,
        primaryLanguage: current.languages[0].name,
        primaryCurrency: current.currencies[0].name,
      };

      COUNTRY_DATA.push(country);
    }
  }

  /**
   * Gets a random country's information and displays it to the user.
   */
  function getRandomCountry() {
    let randomIndex = Math.floor(Math.random() * COUNTRY_DATA.length);
    let country = COUNTRY_DATA[randomIndex];

    let countryInfoText = createCountryInfo(country);

    let countryInfo = document.querySelector("#country-info");
    countryInfo.appendChild(countryInfoText);
  }

  /**
   * Creates a paragraph about the desired country.
   *
   * @param {object} country - the desired country
   * @returns {HTMLParagraphElement} the paragraph containing information about
   *    the desired country
   */
  function createCountryInfo(country) {
    let countryInfoText = document.createElement("p");

    countryInfoText.appendChild(createSpan(country.name));
    countryInfoText.appendChild(document.createTextNode(" is a country in "));
    countryInfoText.appendChild(createSpan(country.region));
    countryInfoText.appendChild(document.createTextNode(" ("));
    countryInfoText.appendChild(createSpan(country.subregion));
    countryInfoText.appendChild(document.createTextNode(") with "));
    countryInfoText.appendChild(createSpan(country.capital));
    countryInfoText.appendChild(
        document.createTextNode(" as its capital. The population consists of "));
    countryInfoText.appendChild(createSpan(country.population));
    countryInfoText.appendChild(
        document.createTextNode(" people who live in an area of "));
    countryInfoText.appendChild(createSpan(country.area));
    countryInfoText.appendChild(
        document.createTextNode(" kilometers squared. The people there primarily speak "));
    countryInfoText.appendChild(createSpan(country.primaryLanguage));
    countryInfoText.appendChild(document.createTextNode(" and usually use "));
    countryInfoText.appendChild(createSpan(country.primaryCurrency));
    countryInfoText.appendChild(document.createTextNode(" as currency."));

    return countryInfoText;
  }

  /**
   * Creates a span with the desired text.
   *
   * @param {string} text - the desired text
   * @returns {HTMLSpanElement} the span containing the desired text
   */
  function createSpan(text) {
    let span = document.createElement("span");
    span.innerText = text;

    return span;
  }

  /**
   * Displays an error message to the user.
   *
   * @param {object} error - the error
   */
  function handleError(error) {
    let getStartedButton = document.querySelector("#get-started");
    getStartedButton.remove();

    let getAnotherButton = document.querySelector("#get-another");
    getAnotherButton.remove();

    let errorText = document.createElement("p");
    errorText.innerText = "An error occurred! Please try again later...";

    let detailedErrorText = document.createElement("p");
    detailedErrorText.innerText = "(" + error + ")";

    let countryInfo = document.querySelector("#country-info");
    countryInfo.innerHTML = "";
    countryInfo.appendChild(errorText);
    countryInfo.appendChild(detailedErrorText);

    switchView();
  }

  /**
   * Switches the view from the introduction to the response.
   */
  function switchView() {
    let introduction = document.querySelector("#introduction");
    introduction.classList.remove("active");

    let options = document.querySelector("#response");
    options.classList.add("active");
  }

   /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   *
   * (Taken directly from the CSE 154 AJAX Template)
   *
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();