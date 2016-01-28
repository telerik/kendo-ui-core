---
title: Overview
page_title: Overview | Hybrid UI ActionSheet
description: "Initiate the Hybrid UI ActionSheet to display a set of choices in Kendo UI."
slug: overview_hybridactionsheet
position: 1
---

# ActionSheet Overview

The [Hybrid UI ActionSheet widget](http://demos.telerik.com/kendo-ui/m/index#actionsheet/index) displays a set of choices related to a task the user initiates.

## Getting Started

The hybrid mobile Application automatically initializes a hybrid mobile ActionSheet widget for every `ul` element with `role` data attribute set to `actionsheet` present in the markup of the views/layouts. Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler.

### Define the ActionSheet

The ActionSheet element should contain one or more `li` elements, each with an `a` element inside. A `Cancel` action is automatically added to the bottom of the actions.

The example below demonstrates how to define an ActionSheet with two buttons.

###### Example

    <ul data-role="actionsheet">
      <li><a data-action="foo">Foo</a></li>
      <li><a data-action="bar">Bar</a></li>
    </ul>

In iOS, the ActionSheet slides in from the bottom of the screen. In iOS6, it also acts like a modal dialog&mdash;tapping the background does not close it. In Android and Blackberry, the available actions are centered in the middle of the screen, and tapping the background closes it.

### ActionSheet Detection of Tablets

If a tablet is detected, the ActionSheet widget is displayed in a PopOver. The sizing and the direction of the popover may be customized through the `popup` configuration option.

### Open the ActionSheet

The widget can be opened when any mobile navigational widget, such as ListView link item, button, and tabstrip among others, is tapped. To do so, set `data-rel="actionsheet"` attribute and a `href` attribute equal to the ActionSheet's element `id`, prefixed with `#`, like an anchor.

The example below demonstrates how to open the ActionSheet using the mobile Button.

###### Example

    <a data-role="button" data-rel="actionsheet" href="#replyActionSheet">Reply</a>
    <ul data-role="actionsheet" id="replyActionSheet">
        <li><a data-action="foo">Reply</a></li>
        <li><a data-action="foo">Reply to All</a></li>
        <li><a data-action="bar">Forward</a></li>
    </ul>

## Execution of Actions

Each link in the ActionSheet should have a `data-action` attribute set, specifying the callback method to be executed when the user taps it. The callback can be either a function, or a method of a JavaScript object in the global scope.

The callback receives a object with two fields&mdash;`target` and (optional) `context` as a parameter. The `target` holds a reference to the DOM element which has opened the ActionSheet. The `context` contains to the optional `actionsheet-context` data attribute of the opening DOM element. After the callback has been executed, the ActionSheet closes automatically.

The example below demonstrates ActionSheet actions and context.

###### Example

    <a id="myButton"
       data-role="button"
       data-actionsheet-context="1"
       data-rel="actionsheet" href="#myActionSheet">Foo...</a>

    <ul data-role="actionsheet" id="myActionSheet">
        <li><a data-action="foo">Foo</a></li>
        <li><a data-action="bar.baz">Bar</a></li>
    </ul>

    <script>
        function foo(e) {
            e.context; // 1
            e.target; // $("#myButton")
        }

        var bar = {
            baz: function(e) {
                e.context; // 1
                e.target; // $("#myButton")
            }
        }
    </script>


## See Also

Other articles and how-to examples on the Hybrid UI components and on the ActionSheet:

* [Hybrid UI ActionSheet JavaScript API Reference](/api/javascript/mobile/ui/actionsheet)
* [How to Change Options Dynamically in the ActionSheet]({% slug howto_changeoptiojnsdynamically_hybridactionsheet %})
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
