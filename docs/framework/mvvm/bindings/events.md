---
title: Events
page_title: Events Binding | Kendo UI MVVM
description: "Learn how to enable the target DOM element by having the View-Model value return true values in Kendo UI MVVM."
slug: eventsbinding_mvvm_kendoui
---

# Events Binding

The [Kendo UI Events (`events`) binding](http://demos.telerik.com/kendo-ui/mvvm/event) attaches methods of the View-Model to specified DOM events.

The methods will be invoked when the associated DOM event is raised.

## Getting Started

The following example demonstrates how to use the `events` binding.

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

## Accessing DOM Event Arguments

Kendo UI MVVM supplies the DOM event argument wrapped in a jQuery [`Event` object](http://api.jquery.com/category/events/event-object/).

## Preventing DOM Event Bubbling

To prevent the event from bubbling up the DOM tree, use the [`stopPropagation`](http://api.jquery.com/event.stopPropagation/) method.

    <span data-bind="events: { click: click }">Click</span>
    <script>
        var viewModel = kendo.observable({
            click: function(e) {
                e.stopPropagation();
            }
        });

        kendo.bind($("span"), viewModel);
    </script>

## Preventing Default Actions of DOM Events

Some DOM events have a default action. For example, the `click` event may navigate to another page or submit a form. To prevent the default action, use the [`preventDefault`](http://api.jquery.com/event.preventDefault/) method.

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

## See Also

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
