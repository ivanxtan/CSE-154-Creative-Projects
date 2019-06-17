# Creative Project 1 Project Specification
## Overview
For your first Creative Project, you will use what we're learning about HTML and CSS to
make a simple website with at least two HTML pages linked to one shared CSS file.
As a Creative Project, you have the freedom to have more ownership in your work as compared to a
Homework Assignment, as long as you meet the requirements below.

As a reminder, assignments will alternate between creative projects (CPs) and more formal homework
assessments (HWs). We have designed assignments to support each of the 5 modules of this
course, and for creative projects to prepare you for the following HW in each module. As long as you
meet the external and internal requirements sections below, you have freedom in what kind of
website you create.

That said, we encourage you to explore the new material covered in class, as well as
related (but optional) content we may link to along the way (e.g. CSS3 animations), as
long as you follow the CSE 154 code quality guidelines. This is your chance to:

1. Build websites that you can link to on your resume or code portfolio (CPs can be
   public, most HWs cannot be).
2. Ask instructors and/or TAs about features you want to learn how to implement (we can
   provide more support for CPs than HWs) and ask for feedback/ideas on Piazza.
3. Apply what you're learning in CSE 154 to projects you are personally interested in and
   may use outside of just a CSE 154 assignment.
4. Optionally showcase your CP work on the CSE 154 CP Showcase
5. Get feedback on your code quality while learning new technologies that will be used to implement
   the following HW, which will be worth more points.

In past quarters, some students have built upon their Creative Project each week. You may
choose to do a new website for each CP, or build on a single project, as long as you meet
requirements listed for that particular CP.

## Ideas for CP1
Here are some ideas for Spring 2019 (Your instructors are more than happy to help discuss more
ideas in their office hours!):

* Turn your current resume into a webpage and add that to your site as well and link the two pages together for the start of your own personal Portfolio page that you will share with prospective employers.
* For the second HTML page (the one linked from `about.html`):
  * Write a simple website for an RSO club you're in.
  * Write a website for a friend/family member.
  * Write a website with facts on your favorite animal/hobby/topic.
  * Write a website with a few of your favorite recipes.
  * Write a "tutorial" website on the basics of HTML/CSS given what you're learning
    (teaching is a great way to reinforce what you're learning!).
  * Start a blog website, perhaps documenting what you're learning this quarter in one of
  your classes.
  * Showcase any work about a hobby you may have (art, 3D printing, sports, travel, etc.)
* Check out your TA's [About Pages](https://courses.cs.washington.edu/courses/cse154/19sp/) and 18au's student [CP1
  showcase](https://courses.cs.washington.edu/courses/cse154/18au/creative/showcase.html) for some more inspiration!

## External Requirements
* Your project must include the following three files (though you may have more):
  * A completed `about.html` (do not change this file name).
  * One other `.html` file (you can choose the filename) that is linked from `about.html` with an `<a>` tag that will count towards your 10 tags in
    the requirement listed below.
  * A `style.css` file.
* You must link `style.css` to both `about.html` and your other HTML page to style your website
with a consistent look and feel.
* Your CSS file should import and use at least one [Google font](https://fonts.google.com/) of your choice with an appropriate default font (e.g. `sans-serif`) specified. Remember to import Google fonts at the top of your CSS file, not in the HTML!
* You must use at least 10 different types of HTML tags total (any tag excluding
  `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` will qualify towards this count) **in
  your second HTML page**.
  * Suggestion: Refer to [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) for a comprehensive list of different HTML tags, and post on Piazza if you have any questions about any!
  * You may use ones we haven't talked about in lecture, since there are many more that we could possibly cover in class (ask on Piazza or office hours if you have questions about new tags!).
  * At least two of the 10 tags should be semantic tags listed under "HTML Layout Elements in More Detail" [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#HTML_layout_elements_in_more_detail)
* `style.css` must have at least 4 additional different CSS **selectors** other than the `body` selector in the file given to you. Refer to [this page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Selectors) for a CSS reference of selectors.
* `style.css` must apply at least 5 additional and unique CSS **rules** (other than those provided in the default `style.css`) to content in your HTML files. Recall a rule is a property: value pair, so for two rules to be unique both the property and the value must differ (i.e. `color: blue`; and `color: green`; are **not** considered two unique rules.)

## Internal Requirements
* Links to **your** `.html` and `.css` files should be **relative links**, not absolute.
* Do not express style information in the HTML, such as through inline styles or presentational HTML
tags such as `b` or `font`.
* Do not use any deprecated HTML tags listed on [this page](http://www.tutorialspoint.com/html5/html5_deprecated_tags.htm).
* Your `style.css` should avoid redundancy - do not include duplicate selectors and avoid redundant
  `property : value` where you can factor these out with shared selectors (refer to the Code Quality
  Guide for more examples). 
* All CSS in `style.css` should be used in either of your HTML pages (make sure to double-check that
  you didn't leave any unused styles in before submitting!)
* Your page should include
[school appropriate content](https://courses.cs.washington.edu/courses/cse154/19sp/syllabus/syllabus.html#academic-conduct)
and [copyrights and citations](https://courses.cs.washington.edu/courses/cse154/19sp/syllabus/syllabus.html#copyright). If we find plagiarism in CPs or inappropriate content, **you will be ineligible for any points on the CP**. Ask the instructors if you're unsure if you're work is appropriate.
* Note: You _may_ use a framework such as Bootstrap to help with your styling and helpful responsive layout features, however you must still meet all of the above requirements and demonstrate that you understand the key concepts of how the HTML and CSS work. Any framework code _will not count_ towards HTML/CSS requirements (e.g. if you use the Bootstrap "container" class in your HTML, you cannot count the CSS implementation the bootstrap.css file towards the CSS requirements), however you can add new (not duplicate) CSS for this class to `style.css`. You are not allowed to use any template HTML files for frameworks (this defeats the purpose of writing HTML and CSS from scratch in this first assignment).
  * Don't know what any of that means but want to learn how to use a CSS framework? Ask about them in office hours!

## Style and Documentation
* Your HTML and CSS should demonstrate good code quality as demonstrated in class and detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/).
  * Part of your grade will come from using consistent indentation, proper naming conventions, curly brace locations, etc.
* Place a comment header in **each file** with your name, section, a brief description of the assignment, and the files contents. Examples:

    HTML File:

    ```
    <!--
         Name: Mowgli Hovik
         Date: April 1, 2019
         Section: CSE 154 AB
         This is the index.html page for my portfolio of web development work. It includes links to side
         projects I have done during CSE 154, including an About page, a blog template, and
         a crytogram generator.
    -->
    ```

    CSS File:

    ```
    /*
        Name: Mowgli Hovik
        Date:  April 1, 2019
        Section: CSE 154 AB
        This is the style.css page for my portfolio of web development work.
        It is used by all pages in my portfolio to give the site a consistent look and feel.
    */
    ```

  * HTML and CSS files must be well-formed and pass W3C validation (this will be graded). The links to the [Code Validators](https://courses.cs.washington.edu/courses/cse154/19sp/resources/resources.html#validators) can be found in the resources page of the course website. Warnings are ok, but you can ask if you are unsure!
  * As mentioned in the Code Quality Guide, do not place more than one block element on the same line or begin a block element past the 100th character on a line.

## Grading
Grading for Creative Projects is lighter with the chance to explore and learn without the overhead of
having to match strict external requirements. Our goal is to give you feedback, particularly on the internal
requirements and style and documentation, so you can incorporate this feedback in your homework assignments which
will be worth more towards your final grade. That said, **this is an opportunity for you to explore
what you're learning and get feedback on appropriate use of HTML/CSS for HW1** (and of course "free"
personal portfolio feedback from your TAs :)).

This CP will be out of 8 points and will likely be distributed as:
* External Correctness (4 pts) - The external requirements listed in this document are met.
* Internal Correctness (2 pts) - The internal requirements listed in this document are met.
* Style and Documentation (2 pts) - The style and documentation requirements in this document are met.  

## Late Day Challenge
Often we will include a "Late Day Challenge" for you to learn independently and get a chance to add more features to your personal work. In this Creative Project, you can earn an extra late day if you meet the following requirements:
* Contribute to the CSE 154 "CSS Zen Garden" with your own CSS theme! Download the `zengarden.html` and `cse154logo.png` [here](https://courses.cs.washington.edu/courses/cse154/19sp/code-examples/zengarden/zengarden1.zip), then add at least 8 different CSS rules of your choice with at least 3 different selectors to redesign it. Submit your new CSS as `custom.css` with the (**unchanged**) `zengarden.html` and `cse154logo.png` files with the rest of your CP1 repository files. We will include a variety of (anonymous) submissions in a CSE 154 Zen Garden inspired by the original [CSS Zen Garden](http://www.csszengarden.com)! 
* **Note**: Any other work in this CP should not be recognizably similar to `zengarden.html` or `custom.css`.
* **Note**: The provided `zengarden.html` is adapted by earlier work done by Henry Ko, a former CSE 154 
  student! If you would like to contribute your own creative zengarden HTML template to help grow the CSE 154 Zen Garden
  project (and your name in the course!), you are welcome to submit with your CP1 work (with or without an example 
  CSS file) as `zengarden2.html`. If you use 10 or more different HTML tags within the `body`, you may use yours instead of
  `zengarden.html` for the Late Day Challenge (you will still need to complete the `custom.css`).
