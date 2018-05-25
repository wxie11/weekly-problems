/*

This first Weekly Problem drops you right into HTML & JavaScript.

The `index.html` file, which you do not need to edit, contains an unordered list of usernames
linked to GitHub profiles for everyone in the class. It also uses a tag you might not have seen
before: `<template>`, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

You'll use native JavaScript to listen for a click event on any one of those links, prevent the
default link-following behavior, and hit the GitHub API to return JSON data for the profile whose
link a user clicked. You'll then display the data as set forth in the `<template>` tag at the bottom
of the HTML file, and append it to the `<blockquote>` element.

For example, Stolley's main GitHub profile is a JSON object at this API endpoint:
https://api.github.com/users/karlstolley

I've sketched out some starter portions of the code below. Be sure to work on this yourself, and
discuss your work--and the places that you get stuck--on Basecamp as you're working on the
problem. Note: to keep this as backward-compatibile as possible, I'm using `var` and no fancy
ES6 stuff.

Finally, be sure to run `http-server` so you're serving this at `localhost:8080`--if you choose
File > Open, you will not be able to run requests with Fetch. Be sure also that you have your
JavaScript console open so you can benefit from calls to `console.log()` and other diagnostics.

*/

// Grab the members element
var members = document.getElementById('members');
// Diagnostic variable to hold the event target in the global scope, oustide the event-handler
// function:
var target;

// Listen for a click event on #members, rather than adding a click handler to each and every
// <a> element. This is called event bubbling:
members.addEventListener('click', function(e) {
  // Placeholder variables assigned in the `if` block below; life would be better with `let`
  var username, request_url;
  // Grab the content template from the HTML;
  // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
  var template = document.getElementById('member');
  // Also grab a reference to the `<blockquote>` element where the data will go:
  var profile = document.getElementById('profile');

  // Diagnostic: this will let you play with the event.target object in the console and see what
  // properties and methods it responds to.
  target = e.target;

  // We're only interested in clicks on `<a>` elements:
  if (e.target.nodeName.toLowerCase() == 'a') {
    // Don't let the web browser follow the link
    e.preventDefault();
    // Diagnostic: log the clicked `<a>` element's `href` value
    console.log(e.target.href, 'clicked');

    // TODO: Somehow isolate the last chunk of the GitHub profile URL, which contains the username
    // https://github.com/<username>. The full URL is a string at `e.target.href`:
    username = e.target.href.substr(e.target.href.lastIndexOf('/') + 1);

    // Diagnostic: log the username value
    console.log('Username value:', username);

    // Append that chunk onto the GitHub API URL, `https://api.github.com/users/<username>`:
    request_url = 'https://api.github.com/users/' + username;

    // Diagnostic: log the request URL value
    console.log('Request URL value:', request_url);

    // TODO: Use the Fetch() API to retrieve the data from the GitHub API
    // Docs:
    //   - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    //   - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // This block commented with stars so you can get things above working first:

    fetch(request_url)
      .then(function(data) {
        // Parse the returned data as JSON:
        return data.json();
      })
      .then(function(profile_json) {
        // Diagnostic; output the login value
        console.log('Login', profile_json.login);

        // TODO: Insert the parts of the JSON data we want in the `template` HTML and
        // append it to the profile `<blockquote id="profile">`
        var node = document.importNode(template.content, true);
        var name = node.querySelector('#name');
        var avatar = node.querySelector('#avatar_url');
        var repo = node.querySelector('#public_repos');

        name.textContent = profile_json.name;
        avatar.setAttribute("src", profile_json.avatar_url);
        repo.textContent = profile_json.public_repos;

        profile.appendChild(node);

        // TODO: Display the username (`login`) in case a team member has not set a profile name
        if(profile_json.name === null)
        {
          name.textContent = profile_json.login;
        }
      });
  }
});
