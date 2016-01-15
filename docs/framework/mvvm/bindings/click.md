---
title: Click
page_title: Click | Kendo UI MVVM
description: "Learn how to automatically trigger the attached methods once the user clicks the target DOM element by using the click binding in Kendo UI MVVM."
slug: clickbinding_mvvm_kendoui
---

# Click Binding

The Kendo UI Click (`click`) binding attaches a method of the View-Model to the `click` DOM event of the target element. The methods is invoked when the user clicks the target DOM element.

## Getting Started

### Setup

The example below demonstrates how to use the `click` binding.

###### Example

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

### Events Binding

The `click` binding is a shorthand for the [`events`](events) binding. The code snippets from the example below are equivalent.

###### Example

    <span data-bind="click: clickHandler"></span>

    <span data-bind="events: { click: clickHandler }"></span>

## DOM Events and Actions   

### Access DOM Event Argument

Kendo UI MVVM supplies the DOM event argument wrapped in a jQuery [`Event` object](http://api.jquery.com/category/events/event-object/).

### Stop DOM Event Bubbling

To stop the event from bubbling up the DOM tree, use the [`stopPropagation`](http://api.jquery.com/event.stopPropagation/) method.

The example below demonstrates how to stop DOM event bubbling.

###### Example

    <span data-bind="click: click">Click</span>
    <script>
    var viewModel = kendo.observable({
        click: function(e) {
            e.stopPropagation();
        }
    });

    kendo.bind($("span"), viewModel);
    </script>

### Prevent Default Actions of DOM Events

For some DOM elements the `click` event has a default action - for example navigate to another page or submit a form. To prevent the default action use the
[preventDefault](http://api.jquery.com/event.preventDefault/) method.

The example below demonstrates how to prevent the default actions of DOM events.

###### Example

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

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
