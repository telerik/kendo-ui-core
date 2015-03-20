---
title: Router
position: 2
---

# Router Overview

The **Router** class is responsible for tracking the application state and navigating between the application states.
The router integrates into the browser history using the fragment part of the url (`#page`), making the application states bookmarkable and linkable.
It is also used for programmatic navigation to a given state. A change event is exposed, suitable for authorization hooks.


## Router with a root route callback

    <script>
        var router = new kendo.Router();

        router.route("/", function() {
            console.log("/ url was loaded");
        });

        $(function() {
            router.start();
        });
    </script>

By default, if the URL fragment is empty (or not present), the "/" route callback will be executed. The `init` event handler will be executed regardless of the initial URL.

## Parameters

The router implements most of the [Ruby on Rails](http://guides.rubyonrails.org/routing.html#non-resourceful-routes) routing formats, supporting **bound parameters**, **optional segments**, and **route globbing**.
The parsed parts of the URL are passed as parameters to the route callback.

### Parameter Parsing

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

### Optional Segments

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


### Route Globbing

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


## Navigation

The `navigate` method can be used to navigate to another application. The respective route (if present) is triggered. The navigate method is modifying the url fragment part.
Clicking on anchor links will also trigger the respective route - a link with `href="#/foo"` will also trigger the '/foo' route callback.

### Route Navigation

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

## Missing Routes, Intercepting Navigation

If no route match is found, the router will trigger a `routeMissing` event, passing the url in the event handler.

### Missing Route Handling

    <script>
    var router = new kendo.Router({ routeMissing: function(e) { console.log(e.url) } });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>

Each time the url fragment changes, the router triggers a `change` event. calling the `preventDefault` method on the event object will revert the url to the previous state.

### Intercepting Navigation

    <script>
    var router = new kendo.Router({
        change: function(e) {
            console.log(url);
            e.preventDefault();
        }
    });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>
