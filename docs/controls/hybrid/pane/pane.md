---
title: Overview
page_title: Overview | Hybrid UI Pane
description: "Initialize and use the Hybrid UI Pane widget to change mobile views within the main view application in the Kendo UI framework."
slug: overview_hybridpane
position: 1
---

# Pane Overview

The Hybrid UI Pane widget groups one or more mobile views within the main view application. The mobile SplitView widget allows a side by-side display of several panes. The mobile PopOver automatically instantiates a mobile Pane widget for its contents.

The Hybrid UI Pane widget acts like an embedded mobile application, with most of the application features available&mdash;support for local and remote views, default layout and transition, lading, etc., with one exception being the browser history support. Navigating within the pane does not update the history state, so deep linking to a pane state is not supported.

## Navigation

## Between Panes

By default, navigational widgets change views in the containing pane. To target another pane, use the `target` data attribute set to the `id` of the pane. To change views in the mobile application, use `data-target="_top"`.

The example below demonstrates how to implement navigation between Hybrid UI Panes.

###### Example  

    <div data-role="splitview" id="main">
       <div data-role="pane" id="side-pane">
         <div data-role="view">
            <a data-role="button" href="#bar" data-target="main-pane">Bar (main pane)</a>
            <a data-role="button" href="#baz" data-target="_top">Baz (application)</a>
         </div>
       </div>

       <div data-role="pane" id="main-pane">
         <div data-role="view" id="foo">
            Foo
         </div>
         <div data-role="view" id="bar">
            Bar
         </div>
       </div>
     </div>

     <div data-role="view" id="baz">
        <a data-role="button" href="#main">Go back to splitview</a>
     </div>

<!--_-->
## See Also

Other articles and how-to examples on the Hybrid UI components and on the Pane:

* [Hybrid UI Pane JavaScript API Reference](/api/javascript/mobile/ui/pane)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
