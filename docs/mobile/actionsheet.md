---
title: ActionSheet
page_title: Intuitive choices with mobile ActionSheet widget | Kendo UI Documentation
description: The user of HTML5 mobile app initiates a task and the mobile ActionSheet widget displays a set of choices.
position: 2
---

# ActionSheet

The mobile ActionSheet widget displays a set of choices related to a task the user initiates.

## Getting Started

The mobile Application will automatically initialize a mobile ActionSheet widget for every `ul` element with `role`
data attribute set to `actionsheet` present in the views/layouts' markup.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.
The actionsheet element should contain one or more `li` elements, each with an `a` element inside. A 'Cancel' action is automatically added to the bottom of the actions.

### Define an ActionSheet with two buttons

    <ul data-role="actionsheet">
      <li><a data-action="foo">Foo</a></li>
      <li><a data-action="bar">Bar</a></li>
    </ul>

In iOS, the ActionSheet slides in from the bottom of the screen; In *iOS6*,  It also acts like a modal dialog - tapping the background does not close it.

In Android and Blackberry, the available actions are centered in the middle of the screen, and tapping the background closes it.

## ActionSheet in Tablets

If a tablet is detected, the ActionSheet widget will be displayed in a PopOver. The sizing and the direction of the popover may be customized
through the `popup` configuration option.

## Opening an ActionSheet

The widget can be open when any mobile navigational widget (listview link item, button, tabstrip, etc.) is tapped.
To do so, set `data-rel="actionsheet"` attribute and a `href` attribute equal to the ActionSheet's element `id` (prefixed with `#`, like an anchor).

### Mobile Button opening ActionSheet

    <a data-role="button" data-rel="actionsheet" href="#replyActionSheet">Reply</a>
    <ul data-role="actionsheet" id="replyActionSheet">
        <li><a data-action="foo">Reply</a></li>
        <li><a data-action="foo">Reply to All</a></li>
        <li><a data-action="bar">Forward</a></li>
    </ul>

## Executing Actions

Each link in the ActionSheet should have a `data-action` attribute set, specifying the callback method to be executed when the user taps it.
The callback can be either a function, or a method of a JavaScript object in the global scope.

The callback receives a object with two fields: `target` and (optional) `context` as a
parameter. The `target` holds a reference to the DOM element which has opened the ActionSheet. The `context` contains
to the optional `actionsheet-context` data attribute of the opening DOM element.

After the callback has been executed, the ActionSheet closes automatically.

### Mobile ActionSheet actions and context

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

