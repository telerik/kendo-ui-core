---
title: Layout
page_title: Layout | Kendo UI Single-Page Application
description: "Learn how to handle the Layout class in a Kendo UI Single-Page Application."
slug: layout_kendoui_singlepageapplication
position: 3
---

# Layout

The Layout class inherits from the `View` one and provides the additional functionality of rendering other views and layouts in a given child element.

## Functionalities

### Show Views

The example below demonstrates a layout showing a view.

###### Example

    <div id="app"></div>

    <script>
        var view = new kendo.View("<span>Foo</span>");

        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", view);
    </script>

As the layout itself is a view, a layout instance can also be passed to the `showIn` method, allowing multiple nesting of layouts.

When a view is rendered in a location already used for the rendering of a view, the previous view is hidden (its element is detached from the DOM), and the previous view `hide` event is triggered.

### Switch Views

The example below demonstrates a layout switching views.

###### Example

    <div id="app"></div>

    <script>
        var foo = new kendo.View("<span>Foo</span>", { hide: function() { console.log("Foo is hidden now"); } });
        var bar = new kendo.View("<span>Bar</span>");

        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", foo);
        layout.showIn("#content", bar);
    </script>

### View Transitions

If you call the `showIn` method with an additional third parameter, the new view replaces the current one with a [replace effect]({% slug replaceffect_fxeffects_widget %}).

####### Example

    <style>
        /* the initial position of the next div */
        .k-fx-swap.k-fx-start .k-fx-next {
            -webkit-transform: translatex(100%);
            -moz-transform: translatex(100%);
            transform: translatex(100%);
        }

        /* the final position of the current div */
        .k-fx-swap.k-fx-end .k-fx-current {
            opacity: 0;
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
            transform: scale(0.9);
        }
    </style>

    <div id="app"></div>

    <script>
        var foo = new kendo.View("<span>Foo</span>");
        var bar = new kendo.View("<span>Bar</span>");

        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", foo);
        layout.showIn("#content", bar, "swap");
    </script>

<!--*-->
## See Also

Other articles on Kendo UI Single-Page Application:

* [Single-Page Application Overview]({% slug overview_kendoui_singlepageapplication %})
* [SPA Router]({% slug router_kendoui_singlepageapplication %})
* [SPA View]({% slug viewclass_kendoui_singlepageapplication %})
