---
title: Router
res_type: api
---

# kendo.Router

Router class is responsible for tracking the application state and navigating between the application states.

## Configuration

### ignoreCase `Boolean` *(default: true)*

Introduced with Q3 2014. If set to `false`, the router instance will perform case sensitive match of the url against the defined routes.


<div class="meta-api-description">
How to make Kendo UI Router case insensitive? Configure route matching sensitivity to URL letter casing by enabling or disabling case-insensitive comparisons for routing paths, controlling whether URLs with different capitalization patterns are treated as equivalent or distinct, managing case sensitivity in URL matching logic, adjusting route resolution to be strict or flexible based on uppercase or lowercase characters, supporting scenarios where routes need exact case matches versus those allowing case variations for navigation, toggling URL matching behavior for case-sensitive or case-insensitive routing to affect how incoming requests map to route definitions.
</div>

#### Example

    <script>
    var router = new kendo.Router({ ignoreCase: false });

    router.route("/Items/:id", function(id) {
        console.log("Case sensitive route matched for item:", id);
    });

    router.route("/items/:id", function(id) {
        console.log("Lowercase route matched for item:", id);
    });

    $(function() {
        router.start();
        
        // This will match the lowercase route only
        router.navigate("/items/123");
        
        // This will match the case sensitive route only
        router.navigate("/Items/456");
    });
    </script>

### pushState `Boolean` *(default: false)*

If set to true, the router will use the [history pushState API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method).

> The history `pushState` API currently has [limited support across current browsers](https://caniuse.com/#search=pushstate).


<div class="meta-api-description">
How to enable pushState for SPA routing in Kendo UI? Control updating the browser address bar or URL dynamically without triggering a full page reload by enabling history manipulation through pushState or similar browser history APIs; configure navigation to seamlessly modify the URL while preserving the current page state, allowing single-page application style routing, deep linking, or stateful URLs without refreshing the entire document. This setting is useful for developers needing to manage forward and backward navigation, URL changes on client side routing, or customizing browser history entries while avoiding page reloads, improving user experience with instant state updates and seamless transitions.
</div>

#### Example

    <script>
    var router = new kendo.Router({ pushState: true });

    router.route("/products/:category", function(category) {
        console.log("Navigated to category:", category);
    });

    $(function() {
        router.start();
        
        // Navigate using pushState (no hash fragment)
        router.navigate("/products/electronics");
    });
    </script>


### root `String` *(default: "/")*

Applicable if `pushState` is used and the application is deployed to a path different than `/`. If the application start page is hosted on `http://foo.com/myapp/`, the root option should be set to `/myapp/`.


<div class="meta-api-description">
How do I configure the root URL for client-side routing in Kendo UI SPA using history pushState? Configure the base URL or root path for client-side routing when using HTML5 history pushState to ensure correct URL generation and navigation within applications deployed under subdirectories or custom base paths, enabling control over route prefixes, setting the starting route segment, adjusting router base paths for SPA deployments not hosted at the domain root, and managing how the application resolves relative URLs when the site is served from a nested folder or path other than root.
</div>

#### Example
    <script>
        var router = new kendo.Router();
        var router = new kendo.Router({ pushState: true, root: "/myapp/" });

        $(function() {
          router.start();
          router.route("bar", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
              console.log("navigated to bar");
          });

          router.start();
        });
    </script>

### hashBang `Boolean` *(default: false)*

Introduced in the 2014 Q1 Service Pack 1 release. If set to `true`, the hash based navigation will parse and prefix the fragment value with `!`,
which [should be SEO friendly](http://googlewebmastercentral.blogspot.com/2009/10/proposal-for-making-ajax-crawlable.html), and allows non-prefixed anchor links to work as expected.


<div class="meta-api-description">
How to enable hash-bang style routing in Kendo UI for jQuery? Configure hash-based URL navigation with optional exclamation mark prefixes to enhance SEO crawlability for single-page applications, enabling search engines to index fragment identifiers properly, support hash-bang style routing, control URL fragments for SEO-friendly navigation, parse and handle URL hashes with or without "!" prefix, and ensure anchor links function seamlessly within client-side routing while improving discoverability and compatibility with link crawling and web crawlers.
</div>

#### Example
    <a href="#!bar">Go to bar</a>

    <a href="#bar">I am a regular bar anchor tag</a>

    <script>
    var router = new kendo.Router({ hashBang: true });

    $(function() {
      router.start();

      router.route("bar", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("navigated to bar");
      });
    });
    </script>

## Methods

### start

Activates the router binding to the URL changes.

> The `start` method should only be called once the routes have been registered. Otherwise the route for the current page/fragment will not be called.


<div class="meta-api-description">
How do I enable client-side routing in Kendo UI for jQuery with the Router.start method? Activate and enable client-side routing to listen for browser URL changes, hash fragments, or history events, allowing route handlers to respond dynamically to navigation updates. Configure, set, or trigger the routing system to monitor URL modifications and initiate associated callbacks, ensuring all registered routes react appropriately to pushState, popState, or fragment identifier changes after routes are defined. Initialize client-side navigation control to bind route callbacks to URL alterations and manage single-page application state transitions efficiently.
</div>

#### Example

    <script>
    var router = new kendo.Router();

    $(function() {
        router.start();
    });
    </script>

### route

Adds a new route definition to the router.


<div class="meta-api-description">
How do I add custom routes to a Kendo UI for jQuery SPA? configure URL routing by adding new route definitions that map specific URL patterns or paths to handlers such as callbacks or controllers, set route names for identification, control navigation behavior and URL matching options, register routes dynamically within the routing system, manage endpoint associations with paths, customize route handling logic, and enable flexible path-to-handler bindings for web request processing and navigation control.
</div>

#### Example

    <script>
    var router = new kendo.Router();

    router.route("/items/:category/:id", function(category, id, params) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(category, "item with id", id, "was requested by", params.user);
    });

    $(function() {
        router.start();
        // ...
        router.navigate("/items/books/59?user=John");
    });
    </script>

#### Parameters

##### route `String`

The route definition.

##### callback `Function`

The callback to be executed when the route is matched.

### navigate

Navigates to the given route.


<div class="meta-api-description">
How do I programmatically change the current path in a Kendo UI SPA application? Control and direct application routing by programmatically changing the current path, triggering route updates, handling navigation events, jumping to specific URLs, updating browser history, and managing SPA route transitions using methods to move between defined routes, enable dynamic navigation changes, and manipulate the router state to reflect user or code-driven path changes within a single-page application environment.
</div>

#### Parameters

##### route `String`

The route to navigate to.

##### silent `Boolean` **(default: false)**

If set to true, the router callbacks will not be called.

#### Example
    <a id="link" href="#">Click me</a>

    <script>
    var router = new kendo.Router();

    router.route("/items/:category/:id", function(category, id) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(category, "item with", id, " was requested");
    });

    $(function() {
      router.start();
      $("#link").click(function() {
        router.navigate("/items/books/59");
        return false;
      });
    });
    </script>

### replace

Navigates to the given route, replacing the current view in the history stack (like `window.history.replaceState` or `location.replace` work).


<div class="meta-api-description">
How to navigate to a different route in Kendo UI for jQuery without adding to browser history? Navigate to a different route or URL without creating a new browser history entry by replacing the current route or view, enabling control over navigation behavior without adding to the back-button stack, updating the address bar and active content seamlessly while preventing users from returning to the previous page using back navigation; useful for situations where route transitions need to overwrite the current history state, such as redirecting after form submissions, authentication flows, or updating the URL dynamically without cluttering the navigation history, effectively mimicking behaviors like location.replace or history.replaceState to manage session history programmatically.
</div>

#### Parameters

##### route `String`

The route to navigate to.

##### silent `Boolean` **(default: false)**

If set to `true`, the router callbacks will not be called.

#### Example
    <a id="link1" href="#bar">Click me first</a>
    <a id="link2" href="#">Click me second</a>
    <a id="link3" href="#">Click me third</a>

    <script>
    var router = new kendo.Router();

    $(function() {
      router.start();

      $("#link2").click(function() {
        router.replace("baz");
        return false;
      });

      $("#link3").click(function() {
        history.back();
        alert(location.href); // we will be back to the initial url at this point
        return false;
      });
    });
    </script>

### destroy

Unbinds the router instance listeners from the URL fragment part changes.


<div class="meta-api-description">
What is the purpose of calling destroy on the Kendo UI Router instance? Stop listening to URL hash or fragment changes by disabling or removing event handlers that track fragment updates, unbinding routing listeners to halt navigation responses, clean up resources and prevent memory leaks by detaching router callbacks related to URL fragments or hashes, control and disable routing event listeners, and deactivate routing behavior linked to URL fragment changes when no longer needed or before disposing of routing instances.
</div>

#### Example

    <script>
    var router = new kendo.Router();

    router.route("/users/:id", function(id) {
        console.log("User route activated for id:", id);
    });

    $(function() {
        router.start();
        
        // Navigate to trigger the route
        router.navigate("/users/123");
        
        // Later, clean up the router when no longer needed
        router.destroy();
        
        console.log("Router destroyed - no longer listening to URL changes");
    });
    </script>

## Events

### back

Triggered when the user navigates back to the previous URL.


<div class="meta-api-description">
How do I handle back navigation events in Kendo UI for jQuery? Detect when users navigate backward through browser history or application routes by listening to back navigation events triggered by actions like clicking the browser back button or invoking history.back. Capture and handle these backward navigation signals to update state, refresh or reload data for the prior view, perform cleanup tasks, synchronize UI with previous route context, track user navigation patterns, or control history-aware behaviors within single-page applications and web routers. Functionality includes monitoring navigation backward, managing application changes on historical route visits, and enabling reactive handling of user history movements or route backtracking.
</div>

#### Event Data

##### e.url `String`

The current part of the URL

##### e.to `String`

The fragment part of the previous URL

> Calling the `preventDefault` method of the event object will stop the change and restore the previous URL.

#### Example

    <script>
    var router = new kendo.Router();

    router.bind("back", function(e) {
        console.log("Navigating back from:", e.to, "to:", e.url);
        
        // Optionally prevent the back navigation
        // e.preventDefault();
    });

    router.route("/page1", function() {
        console.log("Page 1 loaded");
    });

    router.route("/page2", function() {
        console.log("Page 2 loaded");
    });

    $(function() {
        router.start();
        
        // Navigate forward
        router.navigate("/page1");
        router.navigate("/page2");
        
        // Navigate back (will trigger the back event)
    });
    </script>

### change

Triggered when the fragment part of the URL changes.


<div class="meta-api-description">
How can I handle URL fragment changes with Kendo UI Router? Detect and respond to changes in the URL fragment or hash by listening for navigation events triggered when the part of the URL after the hash symbol updates; enable handling of route or view updates, synchronize application state with URL changes, set up event listeners for hashchange or fragment navigation, manage single-page application routing, control navigation flow, update components on URL hash modifications, and bind custom handlers for history synchronization or navigation events related to changing URL fragments.
</div>

#### Event Data

##### e.url `String`

The fragment part of the URL

##### e.params `Object`

The parsed query string parameters of the URL

> Calling the `preventDefault` method of the event object will stop the change and restore the previous URL.


#### Example
    <a id="link" href="#">Click me</a>
    <script>
    var router = new kendo.Router();

    router.route("/items/:category/:id", function(category, id, params) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(category, "item with", id, " was requested by", params.user);
    });

    router.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("change event", e);
    });

    $(function() {
      router.start();
      $("#link").click(function() {
        router.navigate("/items/books/59?user=John");
        return false;
      });

    });
    </script>

### routeMissing

Triggered when the URL does not match any of the provided routes.


<div class="meta-api-description">
How to handle navigation attempts to undefined routes in Kendo UI spa? Detect and manage navigation attempts to URLs that don't correspond to any defined routes by capturing unmatched paths, enabling custom handling such as displaying 404 error pages, redirecting users programmatically to alternate routes, implementing fallback or default views when no route matches, intercepting unknown navigation requests for logging or analytics purposes, and controlling application behavior on missing or invalid URLs to improve user experience and error management in routing systems.
</div>

#### Example

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var router = new kendo.Router({ routeMissing: function(e) { console.log(e.url, e.params) } });

    $(function() {
        router.start();
        router.navigate("/foo?bar=baz");
    });
    </script>


#### Event Data

##### e.url `String`

The fragment part of the URL

##### e.params `Object`

The parsed query string parameters of the URL

> Calling the `preventDefault` method of the event object will stop the change and restore the previous URL.
