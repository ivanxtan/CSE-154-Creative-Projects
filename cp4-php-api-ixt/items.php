<?php 
/**
  * Ivan Tan
  * CSE 154 AI
  * Creative Project 4
  * May 17, 2019
  * 
  * This is the items.php file for Creative Project 4.
  *
  * Required GET parameters:
  *  - item
  *   - item={item name} outputs the desired item data in JSON
  *   - item=all outputs the names of all the items in plain text 
  * Invalid parameters will be given a text response with an error message.
  */

  /**
   * Represents the path to the items file.
   */
  define("ITEMS_FILE", "items.json");

  process_get_params();

  /**
   * Processes the get parameters and responds accordingly.
   */
  function process_get_params() {
    if (isset($_GET["item"])) { // item param is set
      $items = decode_JSON(ITEMS_FILE)["items"];
      $item_name = $_GET["item"]; // sanitize

      $response = process_get_request($items, $item_name);
      echo($response);
    } else { // param not set
      throw_error("You did not specify an \"item\" parameter!");
    }
  }

  /**
   * Processes the get request and returns the response accordingly.
   * 
   * @param array $items the desired list of items
   * @param string $item_name the name of the desired item (case-sensitive)
   *    "all" will return the names of all the items
   * 
   * @return string the desired response
   */
  function process_get_request($items, $item_name) {
    $response = null;
    if ($item_name === "all") { // get all items
      header("Content-type: text/plain");
      $response = get_all_item_names($items);
    } else { // get specific item
      $item = get_item($items, $item_name);
      if ($item === null) { // invalid item
        throw_error("Your \"item\" parameter was invalid!");
      } else { // valid
        header("Content-type: application/json");
        $response = json_encode($item); // encode
      }
    }

    return $response;
  }

  /**
   * Decodes a JSON file.
   * 
   * @param string $file_name the desired file name
   * 
   * @return array the decoded JSON
   */
  function decode_JSON($file_name) {
    $file_contents = file_get_contents($file_name);
    $decoded_data = json_decode($file_contents, true);

    return $decoded_data;
  }

  /**
   * Gets a string representation for the names of all the items with each item 
   * on a new line.
   * 
   * @param array $items the desired list of items
   * 
   * @return string the string representation for the names of all the items
   */
  function get_all_item_names($items) {
    $result = "";

    if (count($items) > 0) {
      $first = $items[0]["name"];
      $result .= $first;
    }
    for ($i = 1; $i < count($items); $i++) {
      $name = $items[$i]["name"];
      $result .= "\n{$name}";
    }

    return $result;
  }

  /**
   * Gets the item data of a desired item from its name.
   * 
   * @param array $items the desired list of items
   * @param string $item_name the name of the desired item (case-sensitive)
   * 
   * @return array the item data
   *    returns null if the item name is invalid
   */
  function get_item($items, $item_name) {
    foreach ($items as $current) {
      $current_name = $current["name"];
      if ($current_name === $item_name) { // name matches
        return $current;
      }
    }

    return null; // not in items
  }

  /**
   * Throws an invalid request error to the user and responds with the desired 
   * message.
   * 
   * @param string $message the desired message
   */
  function throw_error($message) {
    header("Content-type: text/plain");
    header("HTTP/1.1 400 Invalid Request");
    echo($message);
  }
?>