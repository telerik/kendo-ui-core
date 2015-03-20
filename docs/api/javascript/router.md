---
title: Router
---

# kendo.Router

## Configuration

### ignoreCase `Boolean` *(default: true)*

Introduced with Q3 2014. If set to `false`, the router instance will perform case sensitive match of the url against the defined routes.

### pushState `Boolean` *(default: false)*

If set to true, the router will use the [history pushState API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method).

> The history pushState API currently has [limited support accross current browsers](http://caniuse.com/#search=pushstate).


### root `String` *(default: "/")*

Applicable if `pushState` is used and the application is deployed to a path different than `/`. If the application start page is hosted on `http://foo.com/myapp/`, the root option should be set to `/myapp/`.

#### Example
    <script>
        var router = new kendo.Router();
        var router = new kendo.Router({ pushState: true, root: "/myapp/" });

        $(function() {
          router.start();
          router.route("bar", function() {
              console.log("navigated to bar");
          });

          router.start();
        });
    </script>

### hashBang `Boolean` *(default: false)*

Introduced in the 2014 Q1 Service Pack 1 release. If set to `true`, the hash based navigation will parse and prefix the fragment value with `!`,
which [should be SEO friendly](http://googlewebmastercentral.blogspot.com/2009/10/proposal-for-making-ajax-crawlable.html), and allows non-prefixed anchor links to work as expected.

#### Example
    <a href="#!bar">Go to bar</a>

    <a href="#bar">I am a regular bar anchor tag</a>

    <script>
    var router = new kendo.Router({ hashBang: true });

    $(function() {
      router.start();

      router.route("bar", function() {
          console.log("navigated to bar");
      });
    });
    </script>

## Methods

### start

Activates the router binding to the URL changes.

> The `start` method should only be called once the routes have been registered. Otherwise the route for the current page/fragment will not be called.

#### Example

    <script>
    var router = new kendo.Router();

    $(function() {
        router.start();
    });
    </script>

### route

#### Example

    <script>
    var router = new kendo.Router();

    router.route("/items/:category/:id", function(category, id, params) {
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

## Events

### back

Triggered when the user navigates back to the previous URL.

#### Event Data

##### e.url `String`

The current part of the URL

##### e.to `String`

The fragment part of the previous URL

> Calling the `preventDefault` method of the event object will stop the change and restore the previous URL.

### change

Triggered when the fragment part of the URL changes.

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
      console.log(category, "item with", id, " was requested by", params.user);
    });

    router.bind("change", function(e) {
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

#### Example

    <script>
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
