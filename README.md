# Exam

Hi there!  
In this exam you will extend and add new features to a simplified ticketing system.
The task's main purpose is to test your ability to learn new topics and deliver high quality digital products. It combines building UI components and a touch of server development as well.

While no previous background is required to complete this task or to apply to this position, we do recommend getting to a basic level on the following subjects:

-   JavaScript
-   HTML & CSS
-   React
-   Node.js

## Getting Started

1. Make sure you have _Node.js_ 10 or higher and _npm_ 6 or higher installed
2. Install the project dependencies by running `npm install` from the project's directory (using a terminal)
3. Run the project by running `npm start`

You should now have the development version running on your computer and accessible via http://localhost:3000

## Tasks

The exam is split into 3 parts. The first part is about adding UI functionality. The second part goes a bit broader into the client-server integration and business logic.
The third part is about creativity and good "big-picture" intuition.

### Part 1 - Ticket item improvements

1a. Our tickets list is only showing the title. Make it show the content as well, as following:  
![content](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/6fec98b0-c9cd-4583-ac9f-eaf8983c4061/6043b7ba-e795-4807-8aca-9f693c0450eb.png)

1b.
Some agents want an option to pin some tickets
Add a pin button or text that will pin to top the tickets from view. Make sure there is an option to restore it as well.
use "pin" and "unpin" as the text for those different states

1c.
Step _a_ wasn't enough - some tickets have long content. Add a show more / show less functionality when the content exceeds 3 lines, as following:  
![show more/less](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/fd41c164-d566-471e-9723-e785b313845a/738cbaa0-93e8-4f02-861d-6fab92c608bd.gif)

### Part 2 - List functionality

2a.
It's pretty common that we need to clone tickets in our system.

1.Add a clone button or text that will replicate an item in the client.
2.Add a clone method in the API and server and add an in memory item to the collection
3.Connect your client side "clone" button to that API call

2b. We're showing only 20 tickets but agents can swear there are more. Solve this problem.  
**Keep in mind the number of tickets is planned to grow exponentially very soon so make sure to think of a proper solution.**

#### 2c

There is a need to find tickets created before/after a certain date, and our designer is on vacation to design proper UI for it. Change the search functionality so that when searching for `after:27/09/2019 api`, only tickets matching the word "api" created _after_ 27/09/2019 will show. Add support for `before:[DATE]` and `from:[EMAIL]` as well.

### Part 3 - Your extra touch

Think of a small addition to this project and make it happen.
It should involve adding something to the UI, or server (or both!).
A good rule of thumb for the effort here is that it should not exceed the time that it took you to perform Part 2.

## General notes

-   Test your work well. Think of edge cases. Think of how users will use it, and make sure your work is of high quality
-   Stick to the best practices of the libraries used as much as possible
-   This task involves both client and server code. Regardless of bonuses and part 3, in the end you should have touched both areas. If you haven't - you probably are not covering all our requirements.
-   If you have any questions regarding the task itself or its environment, feel free to ask.

![good luck](https://media.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif)
