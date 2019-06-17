-- Ivan Tan
-- CSE 154 AI
-- Creative Project 5
-- May 30, 2019

-- This is the setup.sql file for Creative Project 5.

-- Creates posts table
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  content TEXT,
  post_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_boosted TIMESTAMP NULL,
  PRIMARY KEY(id)
);

-- Inserts posts
INSERT INTO posts (content)
VALUES
  ("This is the very first post on here. Woohoo! Here is my awesome content."),
  ("Here is the second post. Posting on here is so great. You should really try it out some time..."),
  ("I'll post another just for good measure. Take it out for a spin!"),
  ("My fourth post!!! I'm getting to be pretty good at posting here. I'm a veteran poster..."),
  ("Big number five! My fifth post! The post count is getting pretty high up now. You should join in!"),
  ("One more just to show off the pagination... Why don't you try posting to make some more pages? I'm sure you'll love it!");