---
title: Click
page_title: Click binding in Kendo UI MVVM | Kendo UI Documentation
description: Once the user clicks the target DOM element, methods, attached by using the click binding in Kendo UI MVVM, are automatically triggered.
---

# Click binding

The `click` binding will attach a method of the View-Model to the `click` DOM event of the target element. The methods will be invoked when the user clicks the target DOM element.

## Using the click binding

    <div id="view">
    <span data-bind="click: showDescription">Show description</span>
    <span data-bind="visible: isDescriptionShown, text: description"></span>

    <script>
    var viewModel = kendo.observable({
        description: "Description",
        isDescriptionShown: false,
        showDescription: function(e) {
            // show the span by setting isDescriptionShown to true
            this.set("isDescriptionShown", true);
        }
    });

    kendo.bind($("#view"), viewModel);
    </script>
     </div>

The `click` binding is a shorthand for the [events](events) binding. The following code snippets are equivalent:


    <span data-bind="click: clickHandler"></span>

    <span data-bind="events: { click: clickHandler }"></span>


## Accessing the DOM event argument

Kendo MVVM supplies the DOM event argument wrapped in a jQuery [Event object](http://api.jquery.com/category/events/event-object/).

## Stopping DOM event bubbling

To stop the event from bubbling up the DOM tree use the [stopPropagation](http://api.jquery.com/event.stopPropagation/) method.

### Stop event bubbling

    <span data-bind="click: click">Click</span>
    <script>
    var viewModel = kendo.observable({
        click: function(e) {
            e.stopPropagation();
        }
    });

    kendo.bind($("span"), viewModel);
    </script>


## Preventing the default action of the DOM event

For some DOM elements the `click` event has a default action - for example navigate to another page or submit a form. To prevent the default action use the
[preventDefault](http://api.jquery.com/event.preventDefault/) method.

### Prevent default event action

    <a href="http://example.com" data-bind="click: click">Click</span>
    <script>
    var viewModel = kendo.observable({
        click: function(e) {
            // stop the browser from navigating to http://example.com
            e.preventDefault();
        }
    });

    kendo.bind($("a"), viewModel);
    </script>

