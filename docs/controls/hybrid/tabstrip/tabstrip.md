---
title: Overview
page_title: Overview | Hybrid UI TabStrip
description: "Initialize the hybrid mobile Kendo UI TabStrip widget and create custom icons."
slug: overview_hybridtabstrip
position: 1
---

# TabStrip Overview

The [Hybrid UI TabStrip widget](http://demos.telerik.com/kendo-ui/m/index#mobile-tabstrip/index) is used inside a mobile view or layout footer element to display an application-wide group of navigation buttons. The look of the Hybrid UI TabStrip changes depending on the user mobile device and operating system.

## Getting Started

The Kendo UI mobile Application automatically initializes the Hybrid UI TabStrip for every element with `role` data-attribute set to `tabstrip` and present in the views/layouts markup. Alternatively, the TabStrip can be initialized using jQuery plugin syntax in the mobile View/Layout `init` event handler. The TabStrip element should contain one or more `a` elements.

### Integration

The tabs of the TabStrip navigate to the mobile application's views. When the mobile application navigates to another view, it updates the currently selected tab of the TabStrip based on the URL of the current view.

### Markup Initialization

The example below demonstrates how to initialize the Hybrid UI TabStrip based on the `data-role` attribute.

###### Example

    <div data-role="tabstrip">
        <a href="#index">Home</a>
        <a href="#featured">Featured</a>
    </div>

## Appearance

### Tab Badges

Every tab can have a badge, which is set using the `badge` data-attribute of the Tab's `a` element.

The example below demonstrates how to set badges to tabs.

###### Example

    <div data-role="tabstrip">
        <a data-badge="5" href="#index">Home</a>
        <a data-badge="105" href="#featured">Featured</a>
    </div>

### Tab Icons

A tab icon can be set in two ways:

1. By adding an `img` element inside the `a` element.
2. By setting a `data-icon` attribute to the `a` element.

The example below demonstrates how to use font icons with the `data-icon` attribute.

###### Example

    <div data-role="tabstrip">
        <a data-icon="home" href="#index">Home</a>
        <a data-icon="featured" href="#featured">Featured</a>
    </div>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [article on Hybrid UI font icons]({% slug hybridiconfonts_hybridkendoui %}). It is possible for you to add more icons by defining the respective CSS tab class.

> **Important**
>
> For detailed information on how you can use custom icons, refer to the [article on Hybrid UI font icons]({% slug hybridiconfonts_hybridkendoui %}).

## See Also

Other articles on the Hybrid UI TabStrip:

* [Hybrid UI TabStrip JavaScript API Reference](/api/javascript/mobile/ui/tabstrip)
* [How to Show Tab Text in Android Skin]({% slug howto_showtabtextandroidskin_hybridtabstrip %})

Articles and how-to examples on the Hybrid UI components:

* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
