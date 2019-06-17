<?php
/**
 * Ivan Tan
 * CSE 154 AI
 * Creative Project 5
 * May 30, 2019
 *
 * This is the common.php file for Creative Project 5. It contains the common code
 * used throughout the other php file(s).
 */

  /**
   * Returns a PDO object connected to the database. If a PDOException is thrown when
   * attempting to connect to the database, responds with a 503 Service Unavailable
   * error.
   * @return {PDO} connected to the database upon a succesful connection.
   */
  function get_PDO() {
    # Variables for connections to the database.
    $host = "localhost";     # fill in with server name (e.g. localhost)
    $port = "8889";      # fill in with a port if necessary (will be different mac/pc)
    $user = "root";     # fill in with user name
    $password = "root"; # fill in with password (will be different mac/pc)
    $dbname = "boost";   # fill in with db name containing your SQL tables

    # Make a data source string that will be used in creating the PDO object
    $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

    try {
      $db = new PDO($ds, $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    } catch (PDOException $ex) {
      $message = "There was an error connecting to the database.";
      throw_service_error($message);
    }
  }

  /**
   * Throws an invalid request error to the user and responds with the desired
   * message.
   *
   * @param string $message the desired message
   */
  function throw_request_error($message) {
    header("Content-type: text/plain");
    header("HTTP/1.1 400 Invalid Request");
    echo($message);
  }

  /**
   * Throws a service unavailable error to the user and responds with the desired
   * message.
   *
   * @param string $message the desired message
   */
  function throw_service_error($message) {
    header("Content-type: text/plain");
    header("HTTP/1.1 503 Service Unavailable");
    echo($message);
  }
?>