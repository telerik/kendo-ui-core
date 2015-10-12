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

```html
    <div id="app"></div>

    <script id="index" type="text/x-kendo-template">
        Hello <span data-bind="text: foo"></span>
        <button data-bind="click: buttonClick">Click me to call view model code</button>
        <a href="#" data-bind="click: goToView2">Go to view 2</a>
    </script>

    <script>
        // models
      	var viewModel = kendo.observable({
          foo: "World!",

          init: function() {
            console.log("view init", this.foo);
          },

          show: function() {
            console.log("view show", this.foo);
          },

          buttonClick: function() {
            alert("button clicked");
          },

          goToView2: function(e) {
            router.navigate("/detail");
            e.preventDefault();
          }
        });


        // views, layouts
        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer>Footer</footer>");

        var index = new kendo.View("index", { model: viewModel, init: viewModel.init.bind(viewModel), show: viewModel.show.bind(viewModel) });

        var detail = new kendo.View("<span>Detail - press your browser back button to navigate back.</span>");


        // routing
        var router = new kendo.Router();

      	router.bind("init", function() {
            layout.render($("#app"));
        });

        router.route("/", function() {
          	layout.showIn("#content", index);
        });

        router.route("/detail", function() {
          	layout.showIn("#content", detail);
        });

        $(function() {
            router.start();
        });

    </script>

```
