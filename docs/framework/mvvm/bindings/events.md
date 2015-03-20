---
title: Events
---

# Events binding

The `events` binding will attach methods of the View-Model to specified DOM events. The methods will be invoked when the associated DOM event is raised.

## Using the events binding

    <div id="view">
        <span data-bind="events: { mouseover: showDescription, mouseout: hideDescription }">Show description</span>
        <span data-bind="visible: isDescriptionShown, text: description"></span>
    </div>
    <script>
        var viewModel = kendo.observable({
            description: "Description",
            isDescriptionShown: false,
            showDescription: function(e) {
                // show the span by setting isDescriptionShown to true
                this.set("isDescriptionShown", true);
            },
            hideDescription: function(e) {
                // hide the span by setting isDescriptionShown to false
                this.set("isDescriptionShown", false);
            }
        });

        kendo.bind($("#view"), viewModel);
    </script>


## Accessing the DOM event argument

Kendo MVVM supplies the DOM event argument wrapped in a jQuery [Event object](http://api.jquery.com/category/events/event-object/).

## Stopping DOM event bubbling

To stop the event from bubbling up the DOM tree use the [stopPropagation](http://api.jquery.com/event.stopPropagation/) method.

### Stop event bubbling

    <span data-bind="events: { click: click }">Click</span>
    <script>
        var viewModel = kendo.observable({
            click: function(e) {
                e.stopPropagation();
            }
        });

        kendo.bind($("span"), viewModel);
    </script>

## Preventing the default action of the DOM event

Some DOM events have a default action. For example the click event may navigate to another page or submit a form.
To prevent the default action use the [preventDefault](http://api.jquery.com/event.preventDefault/) method.

### Prevent default event action

    <a href="http://example.com" data-bind="events: { click: click }">Click</a>
    <script>
        var viewModel = kendo.observable({
            click: function(e) {
                // stop the browser from navigating to http://example.com
                e.preventDefault();
            }
        });

        kendo.bind($("a"), viewModel);
    </script>
