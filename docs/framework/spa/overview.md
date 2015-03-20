---
title: Overview
position: 1
---
# Kendo Single Page Application Overview

Kendo Single-Page Application (sometimes abbreviated as SPA) is a set of classes which aim at simplifying the building rich client-side based web applications.
More information about the Single-page Application pattern can be found in the [Single-page Application Wikipedia article](http://en.wikipedia.org/wiki/Single-page_application).

The **Router** class is responsible for tracking the application state and navigating between the application states. The router integrates into the browser history using the fragment version of the url (`#page`), making the application states bookmarkable and linkable.
The router instance is also used for programmatic navigation to a given state.

The **View** and **Layout** classes are used for the UI rendering. UI Event handling and data binding can be performed either through **MVVM** or **declarative data attribute initialization**.

## Hello World Single Page Application

    <div id="app"></div>

    <script id="index" type="text/x-kendo-template">
        Hello <span data-bind="text: foo"></span>
    </script>

    <script>
        var index = new kendo.View(
            "index", // the id of the script element that contains the view markup
            { model: kendo.observable({ foo: "World!" }) }
        );

        var router = new kendo.Router();

        router.route("/", function() {
            index.render("#app");
        });

        $(function() {
            router.start();
        });
    </script>
