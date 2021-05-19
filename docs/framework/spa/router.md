---
title: Router
page_title: Router | Kendo UI Single-Page Application
description: "Learn how to handle the router class in a Kendo UI Single-Page Application."
slug: router_kendoui_singlepageapplication
position: 2
---

# Router

The `Router` class is responsible for tracking the application state and navigating between the application states.

## Getting Started 

The router integrates into the browser history using the fragment part of the URL (`#page`), making the application states book-markable and linkable. It is also used for programmatic navigation to a given state. A change event is exposed, suitable for authorization hooks.

The following example demonstrates a Router with a root route callback. By default, if the URL fragment is empty, or not present, the `"/"` route callback is executed. The `init` event handler is executed regardless of the initial URL.

```dojo
    <script>
        var router = new kendo.Router();

        router.route("/", function() {
            console.log("/ url was loaded");
        });

        $(function() {
            router.start();
        });
    </script>
```

## Parameters

The router implements most of the [Ruby on Rails](http://guides.rubyonrails.org/routing.html#non-resourceful-routes) routing formats. The parsed parts of the URL are passed as parameters to the route callback.

The `Router` supports the following parameters:

* Bound parameters
* Optional segments
* Route globbing

The following example demonstrates how the parameter parsing is done.

```dojo
    <script>
        var router = new kendo.Router();

        router.route("/items/:category/:id", function(category, id) {
            console.log(category, "item with", id, " was requested");
        });

        $(function() {
            router.start();

            // ...

            router.navigate("/items/books/59");
        });
    </script>
```

The following example demonstrates how to handle the optional segments.

```dojo
    <script>
        var router = new kendo.Router();

        router.route("/items(/:category)(/:id)", function(category, id) {
            console.log(category, "item with", id, " was requested");
        });

        $(function() {
            router.start();

            // ...
            router.navigate("/items/books/59");

            // ...
            router.navigate("/items");

            // ...
            router.navigate("/items/books");
        });
    </script>
```

The following example demonstrates how to apply the route globbing.

```dojo
    <script>
        var router = new kendo.Router();

        router.route("/items/*suffix", function(suffix) {
            console.log(suffix);
        });

        $(function() {
            router.start();

            // ...
            router.navigate("/items/books/59");

            // ...
            router.navigate("/items/accessories");

            // ...
            router.navigate("/items/books");
        });
    </script>
```

## Setting the Route Navigation

The `navigate` method can be used to navigate to another application. The respective route (if present) is triggered. The `navigate` method is modifying the URL fragment part. Clicking on anchor links will also trigger the respective route&mdash;a link with `href="#/foo"` also triggers the `/foo` route callback.

The following example demonstrates how to handle the `Route` navigation.

```dojo
    <a href="#/foo">Foo</a>

    <script>
        var router = new kendo.Router();

        router.route("/foo", function() {
            console.log("welcome to foo");
        });

        $(function() {
            router.start();
            router.navigate("/foo");
        });
    </script>
```

## Handling Missing Routes

If no route match is found, the router triggers a `routeMissing` event and passes the URL in the event handler.

The following example demonstrates how to handle missing routes.

```dojo
    <script>
    var router = new kendo.Router({ routeMissing: function(e) { console.log(e.url) } });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>
```

## Intercepting Navigation

Each time the URL fragment changes, the router triggers a `change` event. Calling the `preventDefault` method on the event object reverts the URL to its previous state.

The following example demonstrates how to intercept the navigation.

```dojo
    <script>
    var router = new kendo.Router({
        change: function(e) {
            console.log(e.url);
            e.preventDefault();
        }
    });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>
```

## Query String Parameters

In addition to the route parameters, the route callback will receive a `key:value` object with the query string parameters (if any) as its last argument.

```dojo
    <script>
    var router = new kendo.Router();

    router.route("/foo", function(params) {
        console.log(params.q);
    });

    $(function() {
        router.start();
        router.navigate("/foo?q=2");
    });
    </script>
```

If the `Back` key button is pressed, the object of the query string parameter includes a `_back: true` field to indicate the back action.

> To globally detect back navigation in the `Router`, use its [`back` event](/api/javascript/router/events/back).

The following example demonstrates how to detect `Back` button press in a route.

```dojo
    <script>
      var router = new kendo.Router();

      router.route("/foo", function(params) {
        if(params._back){
          console.log("Navigating back to '/foo'");
        }
        else {
          console.log("Forward navigation to '/foo'");
        }
      });
      router.route("/bar", function(params) {
        console.log("Forward navigation to '/bar'");
      });
      $(function() {
        router.start();
        router.navigate("/foo");
        router.navigate("/bar");
        history.back();
      });
    </script>
```

## See Also

* [Single-Page Application Overview]({% slug overview_kendoui_singlepageapplication %})
* [SPA Layout]({% slug layout_kendoui_singlepageapplication %})
* [SPA View]({% slug viewclass_kendoui_singlepageapplication %})
