# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Instruction

* Open index.html in browser

# Tests

1. Loop through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
2. Loop through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
3. Ensure that the menu is hidden by default
4. Ensure that the menu changes visibility when clicked
5. Ensure when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
6. Ensure that a new feed is loaded by the loadFeed function that the content actually changes.
7. Additional test: ensure that new feed added to menu
8. Additional test: ensure that feed removed from menu