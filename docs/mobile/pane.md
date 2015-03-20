---
title: Pane
page_title: Mobile navigational panes | Kendo UI Mobile Pane widget documentation
description: How to navigate across panes and use Kendo UI Mobile Pane widget to change mobile views within the main view application.
---

# Pane

The mobile Pane widget groups one or more **mobile views** within the main view application. The mobile
SplitView widget allows a side by-side display of several panes. The mobile PopOver automatically instantiates a mobile Pane widget for its
contents.

The mobile Pane widget acts like an embedded mobile application, with most of the application
features available: support for local/remote views, default layout and transition, lading, etc. with one
exception being the browser history support. Navigating within the pane will not update the history state, so
deep linking to a pane state is not supported.

# Navigating across panes

By default, navigational widgets will change views in the containing pane. To target another pane, use
`target` data attribute set to the **id** of the pane. To change views in the mobile
application, use `data-target="_top"`.

## Navigating across panes

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

