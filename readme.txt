--Readme document for *Bala Kausik Vazrala*, *bvazrala@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page


2. How long, in hours, did it take you to complete this assignment?

2.5 hours

3. What online resources did you consult when completing this assignment? (list specific URLs)

I used w3schools as reference (https://www.w3schools.com/angular/).

Other references the code relies on:
- Angular control flow (@if / @for): https://angular.dev/guide/templates/control-flow
- Angular property and event binding: https://angular.dev/guide/templates/binding
- Angular two-way binding with ngModel: https://angular.dev/guide/forms/template-driven-forms
- Angular component inputs: https://angular.dev/guide/components/inputs
- Angular dependency injection: https://angular.dev/guide/di
- Bootstrap carousel: https://getbootstrap.com/docs/5.3/components/carousel/
- Bootstrap progress bar: https://getbootstrap.com/docs/5.3/components/progress/
- Spotify Web API reference: https://developer.spotify.com/documentation/web-api
- MDN encodeURIComponent: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

None.

5. Did you add a bonus feature to your submission? If so, what is it and how should we see it?

No bonus feature (the listed options need Spotify Premium and the non-dummy webserver).

6. Is there anything special we need to know in order to run your code?

Nothing special: run the dummy webserver (npm install, npm start) and the client (npm install, ng serve).

A few small extras beyond the requirements:
- Pressing Enter in the search box searches, and changing the dropdown re-runs the search.
- Old search results are cleared before each new search, and the results remember which category they
  belong to, so switching between artist/album/track after a search does not break the page.
- The thermometer is hidden when a resource has no popularity value.
