---
title: Overview
page_title: Overview | Hybrid UI ButtonGroup
description: "Visualize a linear set of grouped buttons in your app by using the hybrid mobile Kendo UI ButtonGroup widget and customize its appearance."
slug: overview_hybridbuttongroup
position: 1
---

# ButtonGroup Overview

The [Hybrid UI ButtonGroup widget](http://demos.telerik.com/kendo-ui/m/index#buttongroup/mobile) presents a linear set of grouped buttons.

## Getting Started

The Kendo UI mobile Application automatically initializes a mobile ButtonGroup for every element with `role` data attribute set to `buttongroup` and present in the views/layouts markup. Alternatively, it can be initialized by using jQuery plugin syntax in the containing mobile View `init` event handler. The ButtonGroup element should be a `ul` element.

### Initialize from Markup

The example below demonstrates how to initialize the Hybrid UI ButtonGroup based on the `data-role` attribute.

###### Example

    <ul id="buttongroup" data-role="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
    </ul>

### Initialize Using jQuery

###### Example

    var buttongroup = $("#buttongroup").kendoMobileButtonGroup();

## Appearance

Every Hybrid UI ButtonGroup color can be customized by setting the respective `background-color` CSS property inline or with a CSS selector.

### Color

The example below demonstrates how to make a Hybrid UI ButtonGroup green.

###### Example

    <ul id="buttongroup" data-role="buttongroup">
        <li style="background-color: green">Option1</li>
        <li style="beckground-color: red">Option2</li>
    </ul>

### Badges

Every button can have a badge, which is set by using the `data-badge` attribute of the Button's `li` element.

The example below demonstrates how to set the badges to the buttons of a ButtonGroup.

###### Example

    <ul id="buttongroup" data-role="buttongroup">
        <li data-badge="5">Option 1</li>
        <li data-badge="105">Option 2</li>
    </ul>

### Icons

A Button icon can be set in two ways:

1. By adding an `img` element inside the Button `li` element.
2. By setting a `data-icon` attribute to the Button `li` element.

The example below demonstrates how to use font icons with the `data-icon` attribute.

###### Example

    <ul id="buttongroup" data-role="buttongroup">
        <li data-icon="mostrecent">Most Recent</li>
        <li data-icon="mostviewed">Most Viewed</li>
    </ul>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [article on icons]({% slug hybridiconfonts_hybridkendoui %}).

> **Important**
>
> Check the [article on icons]({% slug hybridiconfonts_hybridkendoui %}) for more information and how you can use custom icons in Kendo UI.

## Nova Theme Features

### Primary Button State

To activate the feature set `km-primary` class to the button.

###### Example

    <ul data-role="buttongroup" data-index="0" class="km-primary">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### Size

There are three predefined sizes - small, medium (default) and large. To apply different than the default size set `km-small` or `km-large` class.

The example below demonstrates a small ButtonGroup.

###### Example

    <ul data-role="buttongroup" data-index="0" class="km-small">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

The example below demonstrates a large ButtonGroup.

###### Example

    <ul data-role="buttongroup" data-index="0" class="km-large">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### Position

To activate this feature set `km-justified` class to the button.

The example below demonstrates how to justify the position of the ButtonGroup.

###### Example

    <ul data-role="buttongroup" data-index="0" class="km-justified">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### Icon-Only ButtonGroup

To achieve this outcome do not set text to the ButtonGroup.

###### Example

    <ul data-role="buttongroup" data-index="1">
        <li data-icon="play"></li>
        <li data-icon="pause"></li>
        <li data-icon="rewind"></li>
        <li data-icon="fastforward"></li>
        <li data-icon="globe"></li>
    </ul>

## See Also

Other articles and how-to examples on the Hybrid UI components and on the ButtonGroup:

* [Hybrid UI ButtonGroup JavaScript API Reference](/api/javascript/mobile/ui/buttongroup)
* [Hybrid UI Button JavaScript API Reference](/api/javascript/mobile/ui/button)
* [How to Configure Custom Text Binding of the Button]({% slug howto_configuretextbinding_hybridactionsheet %})
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
