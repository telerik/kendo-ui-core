---
title: Overview
page_title: Overview | Hybrid UI PopOver
description: "Open and configure the Hybrid UI Pane widget to change mobile views within the main view application in the Kendo UI framework."
slug: overview_hybridpopover
position: 1
---

# PopOver Overview

The [Hybrid UI PopOver widget](http://demos.telerik.com/kendo-ui/m/index#popover/index) represents a transient view which is displayed when the user taps on a navigational widget or area on the screen. It can contain one or more mobile views which can be navigated to, if needed.

## Getting Started

The Kendo UI mobile Application automatically instantiates a mobile PopOver for each `div` element with a `role` data-attribute set to `popover`. Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler.

### Instantiate the PopOver

The Mobile PopOver widget can be opened when any mobile navigational widget, such as a ListView link item, Button, and TabStrip among others, is tapped. To do so, add the `data-rel="popover"` attribute and a `href` attribute equal to the PopOver `id` to the navigational widget DOM element, prefixed with `#`, like an anchor.

###### Example

    <div data-role="view">
     <a data-role="button" href="#foo" data-rel="popover">Say Hello</a>

     <div id="foo" data-role="popover">
         <div data-role="view">
             Hello world!
         </div>
     </div>
    </div>

The Mobile PopOver widget implicitly instantiates a Pane widget for its contents, which allows the containing views to navigate to each other. The Pane widget behavior, including default transition, layout, and other features, may be configured from the `pane` configuration option.

### Configure the PopOver

The dimensions and direction of the Popover can be configured from the `popup` configuration option.

## See Also

Other articles and how-to examples on the Hybrid UI components and on the PopOver:

* [Hybrid UI PopOver JavaScript API Reference](/api/javascript/mobile/ui/popover)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
