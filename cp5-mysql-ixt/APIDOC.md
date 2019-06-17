# BOOST! Posts API Documentation
Manages the posts used in BOOST!

## Retrieve list of posts
**Request Format:** posts.php?mode=retrieve&offset={offset}

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Retrieves a list of posts with the desired offset. The offset parameter offsets the list so that it get the next group of posts. An offset of "0" gets a list of the first posts, and an offset of "1" gets a list of the posts after those initial posts. The "prev" key represents the previous offset value. The "next" key represents the next offset value.

**Example Request:** posts.php?mode=retrieve&offset=0

**Example Response:**
```json
{
    "prev": null,
    "next": 1,
    "posts": [
        {
            "id": "5",
            "content": "And the fifth.",
            "post_timestamp": "2019-07-28 16:14:13",
            "last_boosted": null
        },
        {
            "id": "3",
            "content": "Here is the third...",
            "post_timestamp": "2019-05-28 16:17:35",
            "last_boosted": "2019-07-28 16:14:13"
        },
        {
            "id": "2",
            "content": "Here is my second post.",
            "post_timestamp": "2019-05-28 16:17:35",
            "last_boosted": "2019-05-28 17:53:41"
        },
        {
            "id": "7",
            "content": "my new content",
            "post_timestamp": "2019-05-28 17:53:10",
            "last_boosted": null
        },
        {
            "id": "6",
            "content": "asdf",
            "post_timestamp": "2019-05-28 16:45:15",
            "last_boosted": null
        }
    ]
}
```

**Error Handling:**
If the mode is not set, it will 400 error with the message: "Please provide a mode parameter."

If the mode is incorrectly set, it will 400 error with the message: "Please provide a mode of either "retrieve", "create", or "boost"."

If the offset is not set, it will return a response of the first set of posts.

If there is an error with the database, it will 503 error with the message: "There was an error connecting to the database."

## Create new post
**Request Format:** posts.php?mode=create with POST parameters of `content`

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** Creates a post with the desired content.

**Example Request:** posts.php?mode=create with POST parameters of `content=myContent`

**Example Response:**
```
The post was created.
```

**Error Handling:**
If the mode is not set, it will 400 error with the message: "Please provide a mode parameter."

If the mode is incorrectly set, it will 400 error with the message: "Please provide a mode of either "retrieve", "create", or "boost"."

If the content is not set or is empty, it will 400 error with the message: "Please provide the content of the post."

If there is an error with the database, it will 503 error with the message: "There was an error connecting to the database." or "There was an error when trying to create the post."

## Boost a post
**Request Format:** posts.php?mode=boost with POST parameters of `id`

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** Boosts the post with the desired id.

**Example Request:** posts.php?mode=boost with POST parameters of `id=1`

**Example Response:**
```
The post was boosted.
```

**Error Handling:**
If the mode is not set, it will 400 error with the message: "Please provide a mode parameter."

If the mode is incorrectly set, it will 400 error with the message: "Please provide a mode of either "retrieve", "create", or "boost"."

If the id is not set or is empty, it will 400 error with the message: "Please provide the id of the post."

If there is an error with the database, it will 503 error with the message: "There was an error connecting to the database." or "There was an error when trying to boost the post."