---
title: PopOver
page_title: Kendo UI Mobile PopOver Widget for mobile websites and apps
description: How to open the mobile PopOver widget by tapping jQuery-based mobile navigational widget, and then configure popover dimensions and direction.
---

# PopOver

The mobile PopOver widget represents a transient view which is displayed when the user taps on a navigational widget
or area on the screen. It can contain one or more mobile views which can be navigated to, if needed.
The Mobile Application automatically instantiates a mobile PopOver for each div element with a `role`
data attribute set to **popover**.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.


The Mobile PopOver widget can be open when any mobile navigational widget (listview link item, button, tabstrip, etc.) is tapped.
To do so, add `data-rel="popover"` attribute and a `href` attribute equal to the PopOver `id` to the navigational widget DOM element (prefixed with `#`, like an anchor).

## A Mobile PopOver displaying "Hello World"

    <div data-role="view">
     <a data-role="button" href="#foo" data-rel="popover">Say Hello</a>

     <div id="foo" data-role="popover">
         <div data-role="view">
             Hello world!
         </div>
     </div>
    </div>

The Mobile PopOver widget implicitly instantiates a pane widget for its contents, which allows the containing views to navigate to each
other. The pane widget behavior (including default transition, layout, etc.) may be configured from the `pane` configuration option.

The popover dimensions and direction can be configured from the `popup` configuration option.
