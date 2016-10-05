---
title: Layout
---

# kendo.Layout

The Layout class inherits from the [View](/api/framework/view) and provides the additional functionality of rendering other views/layouts in the element.

## Methods

### showIn

Renders the **View** element in the element specified by the selector

#### Example

    <div id="app"></div>

    <script>
        var view = new kendo.View("<span>Foo</span>");

        var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", view);
    </script>

#### Parameters

##### container `String`

The selector of the container in which the view element will be appended.

##### view `kendo.View`

The view instance that will be rendered.

##### transitionClass `string`

Optional. If provided, the new view will replace the current one with a [replace effect](/framework/fx/replace).

###### Example

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
