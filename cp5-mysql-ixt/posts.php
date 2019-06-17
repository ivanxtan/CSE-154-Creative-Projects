<?php
/**
 * Ivan Tan
 * CSE 154 AI
 * Creative Project 5
 * May 30, 2019
 *
 * This is the posts.php file for Creative Project 5.
 *
 * Requests:
 *   mode=
 *     retrieve (GET): optional offset parameter
 *       retrieves a list of posts (limited to 5)
 *       offset parameter offsets the list to get the next group of posts
 *     create (POST)
 *       creates a post with the desired content
 *     boost (POST)
 *       boosts a post with the desired id
 */

  include("common.php");

  /**
   * Represents the maximum number of posts to return in a retrieve request.
   */
  define("POST_QTY_LIMIT", 5);

  process_request();

  /**
   * Processes a request.
   */
  function process_request() {
    if (isset($_GET["mode"])) {
      $mode = $_GET["mode"];
      process_mode($mode);
    } else {
      $message = "Please provide a mode parameter.";
      throw_request_error($message);
    }
  }

  /**
   * Processes a specific mode.
   *
   * @param string $mode the desired mode
   */
  function process_mode($mode) {
    if ($mode === "retrieve") {
      process_retrieve();
    } else if ($mode === "create") {
      process_create();
    } else if ($mode === "boost") {
      process_boost();
    } else {
      $message = "Please provide a mode of either \"retrieve\", \"create\", or \"boost\".";
      throw_request_error($message);
    }
  }

  /**
   * Processes a request to retrieve posts.
   */
  function process_retrieve() {
    if (isset($_GET["offset"])) {
      $offset = (int)$_GET["offset"]; // parse as int to sanitize
      if ($offset >= 0) {
        retrieve_posts($offset);
      } else {
        $message = "Please provide a postitive integer for the offset.";
        throw_request_error($message);
      }
    } else {
      retrieve_posts(0);
    }
  }

  /**
   * Retrieves posts with an offset.
   *
   * @param int $offset the desired offset
   */
  function retrieve_posts($offset) {
    try {
      $db = get_PDO();

      $posts = get_posts($db, $offset);
      $total_count = get_total_count($db);

      $result = array(
        "prev" => get_previous_offset($offset, $total_count),
        "next" => get_next_offset($offset, $total_count),
        "posts" => $posts
      );

      header("Content-type: application/json");
      echo json_encode($result);
    } catch (PDOException $ex) {
      $message = "There was an error connecting to the database.";
      throw_service_error($message);
    }
  }

  /**
   * Gets posts with an offset from a database.
   *
   * @param {PDO} $db the desired database
   * @param int $offset the desired offset
   *
   * @return {object} the posts
   */
  function get_posts($db, $offset) {
    $skip = $offset * POST_QTY_LIMIT;

    $post_query = "SELECT id, content, post_timestamp, last_boosted"
        . " FROM posts"
        . " ORDER BY"
        /*
          get most recent of either post_timestamp or last_boosted
          last_boosted could be NULL, so COALESCE makes the last_boosted
          value 0 so that it takes post_timestamp over the NULL value
        */
        . " GREATEST(post_timestamp, COALESCE(last_boosted, 0)) DESC"
        . ", post_timestamp DESC, id DESC"
        . " LIMIT " . POST_QTY_LIMIT
        . " OFFSET " . $skip;
    $posts = $db->query($post_query)->fetchAll(PDO::FETCH_ASSOC);

    return $posts;
  }

  /**
   * Gets the total number of posts.
   *
   * @param {PDO} $db the desired database
   *
   * @return {int} the total number of posts
   */
  function get_total_count($db) {
    $total_count_query = "SELECT COUNT(*) FROM posts";
    $total_count = $db->query($total_count_query)->fetch()[0]; // get num of posts

    return $total_count;
  }

  /**
   * Gets the previous offset.
   *
   * @param int $offset the desired offset
   * @param int $total_count the total number of posts
   *
   * @return int the previous offset
   */
  function get_previous_offset($offset, $total_count) {
    $current_count = $offset * POST_QTY_LIMIT;
    // +0 so that the last offset group has a previous
    if ($current_count >= $total_count || $offset === 0) { // no previous
      return null;
    } else { // has previous
      return $offset - 1;
    }
  }

  /**
   * Gets the next offset.
   *
   * @param int $offset the desired offset
   * @param int $total_count the total number of posts
   *
   * @return int the next offset
   */
  function get_next_offset($offset, $total_count) {
    $current_count = ($offset + 1) * POST_QTY_LIMIT;
    // +1 because that is the max post it can get on this offset
    if ($current_count >= $total_count) { // no more posts
      return null;
    } else { // more posts
      return $offset + 1;
    }
  }

  /**
   * Processes a create request.
   */
  function process_create() {
    if (isset($_POST["content"]) && $_POST["content"] !== "") { // set and nonempty
      $content = $_POST["content"];
      create_post($content);
    } else {
      $message = "Please provide the content of the post.";
      throw_request_error($message);
    }
  }

  /**
   * Creates a post with the desired content.
   *
   * @param string $content the desired content
   */
  function create_post($content) {
    try {
      $db = get_PDO();

      $insert = "INSERT INTO posts (content) VALUES (:content);";
      $statement = $db->prepare($insert);

      $params = array(
        "content" => $content
      );

      $statement->execute($params);

      header("Content-type: text/plain");
      header("HTTP/1.1 201 Created");
      echo("The post was created.");
    } catch (PDOException $ex) {
      $message = "There was an error when trying to create the post.";
      throw_service_error($message);
    }
  }

  /**
   * Processes a boost request.
   */
  function process_boost() {
    if (isset($_POST["id"]) && $_POST["id"] !== "") {
      $id = $_POST["id"];
      boost_post($id);
    } else {
      $message = "Please provide the id of the post.";
      throw_request_error($message);
    }
  }

  /**
   * Boosts the desired post.
   *
   * @param int $id the desired id
   */
  function boost_post($id) {
    try {
      $db = get_PDO();

      $update = "UPDATE posts SET last_boosted = CURRENT_TIMESTAMP"
          . " WHERE id = :id;";
      $statement = $db->prepare($update);

      $params = array(
        "id" => $id
      );

      $statement->execute($params);

      header("Content-type: text/plain");
      echo("The post was boosted.");
    } catch (PDOException $ex) {
      $message = "There was an error when trying to boost the post.";
      throw_service_error($message);
    }
  }
?>