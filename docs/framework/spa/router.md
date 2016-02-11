---
title: Router
page_title: Router | Kendo UI Single-Page Application
description: "Learn how to handle the router class in a Kendo UI Single-Page Application."
slug: router_kendoui_singlepageapplication
position: 2
---

# Router

The `Router` class is responsible for tracking the application state and navigating between the application states. The router integrates into the browser history using the fragment part of the URL (`#page`), making the application states book-markable and linkable. It is also used for programmatic navigation to a given state. A change event is exposed, suitable for authorization hooks.

The example below demonstrates a Router with a root route callback.

###### Example

```html
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
By default, if the URL fragment is empty, or not present, the `"/"` route callback is executed. The `init` event handler is executed regardless of the initial URL.

## Parameters

The router implements most of the [Ruby on Rails](http://guides.rubyonrails.org/routing.html#non-resourceful-routes) routing formats, supporting:

* Bound parameters
* Optional segments
* Route globbing

The parsed parts of the URL are passed as parameters to the route callback.

### Parameter Parsing

The example below demonstrates how the parameter parsing is done.

###### Example

```html
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

### Optional Segments

The example below demonstrates how to handle the optional segments.

###### Example

```html
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

### Route Globbing

The example below demonstrates how to apply the route globbing.

###### Example

```html
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

## Navigation

The `navigate` method can be used to navigate to another application. The respective route (if present) is triggered. The `navigate` method is modifying the URL fragment part. Clicking on anchor links will also trigger the respective route&mdash;a link with `href="#/foo"` also triggers the `/foo` route callback.

### Route Navigation

The example below demonstrates how to handle route navigation.

###### Example

```html
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

### Missing Routes

If no route match is found, the router triggers a `routeMissing` event, passing the URL in the event handler.

The example below demonstrates how to handle missing routes.

###### Example

```html
    <script>
    var router = new kendo.Router({ routeMissing: function(e) { console.log(e.url) } });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>
```

### Navigation Intercepted

Each time the URL fragment changes, the router triggers a `change` event. Calling the `preventDefault` method on the event object reverts the URL to its previous state.

The example below demonstrates how to intercept the navigation.

###### Example

```html
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
```

## Query String Parameters

### General

In addition to the route parameters, the route callback will receive a `key:value` object with the query string parameters (if any) as its last argument, as shown in the example below.

###### Example

```html
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

### Back Action Parameter

If the `Back` key button is pressed, the query string parameter's object includes a `_back: true` field to indicate the back action.

The example below demonstrates how to detect `Back` button press in a route.

###### Example

```html
    <script>
    var router = new kendo.Router();

    router.route("/foo", function(params) {
        console.log(params._back);
    });

    $(function() {
        router.start();
        router.navigate("/foo?q=2");
        history.back();
    });
    </script>
```

## See Also

Other articles on Kendo UI Single-Page Application:

* [Single-Page Application Overview]({% slug overview_kendoui_singlepageapplication %})
* [SPA Layout]({% slug layout_kendoui_singlepageapplication %})
* [SPA View]({% slug viewclass_kendoui_singlepageapplication %})
