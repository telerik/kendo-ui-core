---
title: Layout
page_title: Layout | Kendo UI Hybrid Components
description: "Use the Kendo UI hybrid layout functionality to easily share headers and footers between multiple views."
previous_url: /controls/hybrid/layout
slug: layout_hybridkendoui
position: 3
---

# Layout

>Starting with the R2 2023 release, Kendo UI will no longer ship Hybrid UI components. This means that the R2 2023 will be the last release to include Kendo Hybrid in the Kendo UI package. See full announcement in [Kendo jQuery blog post](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#end-of-support-announcements). The last stable version that we recommend to use for Kendo Hybrid components is [R3 2022 SP1](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2022-sp1-(version-2022-3-1109)).
>
>[What's New in Kendo UI R2 2023](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#kendo-ui-for-jquery)

The Kendo UI Hybrid Layout feature is used to share headers and footers between multiple Views. The header and footer elements of the Layout are applied to any View that uses it.

## Getting Started

### Define the Layout

To define the layout, set `data-role="layout"` to an element. When a view with the given layout is displayed, the layout attaches its header and footer to it.

> **Important**
>
> When instantiated, the layout detaches its element from the document tree.

A View is associated with a Layout by setting its `data-layout` attribute value to the ID of the layout, specified by the `data-id` attribute.

The example below demonstrates how to define views with layout.



    <div data-role="view" data-layout="foo">Foo view</div>
    <div data-role="view" data-layout="foo">Bar view</div>

    <div data-role="layout" data-id="foo">
      <div data-role="header">Header</div>
      <div data-role="footer">Footer</div>
    </div>

## Platform Configuration

### Defaults

A default application layout can be set through the [`layout` configuration](/api/javascript/mobile/application#layout-string) option of the Application. A mobile View can remove the default application layout by setting `data-layout=""`.

The example below demonstrates a default application layout.



    <div data-role="view">Bar</div>

    <div data-role="layout" data-id="foo">
      <div data-role="header">Header</div>
    </div>

    <script>
       new kendo.mobile.Application($(document.body), { layout: "foo" });
    </script>

### Platform-Specific

Layouts can be platform-specific, allowing for different layout and behavior per platform. A layout platform can be specified using `data-platform=""`.

The example below demonstrates an iOS and Android application layout.



    <div data-role="view">Bar</div>

    <div data-role="layout" data-id="foo" data-platform="ios">
      <div data-role="header">Header</div>
    </div>

    <div data-role="layout" data-id="foo" data-platform="android">
      <div data-role="header">Header</div>
    </div>

## DOM Elements

Each Layout instance exposes the following fields:

* `header`&mdash;This is the header DOM element.
* `footer`&mdash;The footer DOM element.

## See Also

* [Style the Hybrid UI Form Elements]({% slug forms_hybridkendoui %})
* [Apply CSS]({% slug styling_hybridkendoui %})
* [Touch Events]({% slug touchevents_hybridkendoui %})
* [Hybrid UI Font Icons]({% slug hybridiconfonts_hybridkendoui %})
