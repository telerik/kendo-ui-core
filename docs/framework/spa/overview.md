---
title: Overview
page_title: Single-Page Application Overview | Kendo UI Single-Page Application
description: "Learn how to create a Kendo UI Single-Page Application."
slug: overview_kendoui_singlepageapplication
position: 1
---

{% if site.has_cta_panels == true %}
{% include cta-panel-small.html %}
{% endif %}

# Single-Page Application Overview

The [Kendo UI Single-Page Application (SPA)](https://demos.telerik.com/kendo-ui/spa/index) is a set of classes which aim at simplifying the building of rich client-side based web applications.

For more information about the SPA pattern, refer to the [Wikipedia article](https://en.wikipedia.org/wiki/Single-page_application).

## Basic Concepts

* The `Router` class is responsible for tracking the application state and navigating between the application states. The router integrates into the browser history using the fragment version of the URL (`#page`), making the application states book-markable and linkable. The router instance is also used for programmatic navigation to a given state. For more information on Kendo UI `Router` class, refer to [its overview article]({% slug router_kendoui_singlepageapplication %}).
* The `View` and `Layout` classes are used for the UI rendering. UI event handling and data binding can be performed either through MVVM or through declarative data attribute initialization.

## Creating the SPA

The following example demonstrates how to create a Kendo UI SPA.

```dojo
    <div id="app"></div>

    <script id="index" type="text/x-kendo-template">
        Hello <span data-bind="text: foo"></span>
        <button data-bind="click: buttonClick">Click me to call view model code</button>
        <a href="#" data-bind="click: goToView2">Go to view 2</a>
    </script>

    <script>
        // Models.
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


        // Views, layouts.
        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer>Footer</footer>");

        var index = new kendo.View("index", { model: viewModel, init: viewModel.init.bind(viewModel), show: viewModel.show.bind(viewModel) });

        var detail = new kendo.View("<span>Detail - press your browser back button to navigate back.</span>");


        // Routing.
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

## See Also

* [Single-Page Application Router]({% slug router_kendoui_singlepageapplication %})
* [SPA Layout]({% slug layout_kendoui_singlepageapplication %})
* [SPA View]({% slug viewclass_kendoui_singlepageapplication %})
