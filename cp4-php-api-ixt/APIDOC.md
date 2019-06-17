# Items API Documentation
The Items API provides a list of items and descriptions for each specific item.

## Get a list of all the item names
**Request Format:** items.php?item=all

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a list of the names of all the items with each item 
separated on a new line.

**Example Request:** items.php?item=all

**Example Response:**
```
Bread
Computer
Apple
Tree
Blueberry
Car
Rose
Steak
Chicken
Cake
Orange
```

**Error Handling:**
If the `item` parameter is **not set properly**, it will respond with a 400 error saying: `You did not specify an "item" parameter!`.

If the `item` parameter is **set to an invalid value**, it will respond with a 400 error saying: `Your item parameter was invalid!`.

## Get data for a specific item
**Request Format:** items.php?item={item}

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns data about a specific item.

**Example Request:** items.php?item=Bread

**Example Response:**
```json
{"name":"Bread","description":"A food made from flour and water."}
```

**Error Handling:**
If the `item` parameter is **not set properly**, it will respond with a 400 error saying: `You did not specify an "item" parameter!`.

If the `item` parameter is **set to an invalid value**, it will respond with a 400 error saying: `Your item parameter was invalid!`.
