---
title: Overview
page_title: Overview | Hybrid UI Button
description: "Initialize the Hybrid UI Button, customize its appearance, and set a button icon in Kendo UI."
slug: overview_hybridbutton
position: 1
---

# Hybrid UI Button Overview

The [Hybrid UI Button widget](http://demos.telerik.com/kendo-ui/m/index#mobile-button/index) navigates to a mobile View or executes a custom callback when tapped.

## Getting Started

The Hybrid UI Application automatically initializes a the Hybrid UI Button widget for every element with the `data-role` attribute set to `button` and present in the markup of the views/layouts. Alternatively, it can be initialized by using jQuery plugin syntax in the containing mobile View `init` event handler. The button element may be either `A` or `BUTTON`.

### Initialize from Markup

The example below demonstrates how to initialize the Hybrid UI Button based on the `data-role` attribute.

###### Example

    <a href="#foo" data-role="button">Foo</a>

### Initialize Using jQuery

###### Example

    var button = $("#button").kendoMobileButton();

## Appearance

### Color

The Hybrid UI Button color can be customized by setting its `background-color` CSS property inline or by using a CSS selector with specificity of 20+. You can target platforms separately using their respective root CSS classes.

The example below demonstrates how to make a Hybrid UI Button green.

###### Example

    <a href="#foo" data-role="button" style="background-color: green">Foo</a>

The example below demonstrates how to make the green Button in iOS and a red one in Android.

###### Example

    <style>
        .km-ios .checkout { background-color: green; }
        .km-android .checkout { background-color: red; }
    </style>

    <a href="#foo" data-role="button" class="checkout">Foo</a>

### Icons

A Button icon can be set in two ways:

1. By adding an `img` element inside the Button `li` element.
2. By setting a `data-icon` attribute to the Button `li` element.

The example below demonstrates how to use font icons with the `data-icon` attribute.

###### Example

    <a href="#search" data-role="button" data-icon="search">Search</a>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [article on icons]({% slug hybridiconfonts_hybridkendoui %}). Additional icons can be added by defining the respective CSS class. If the `data-icon` attribute is set to `custom`, the button receives the `km-custom` CSS class.

> **Important**
>
> Check the [article on icons]({% slug hybridiconfonts_hybridkendoui %}) for more information and how you can use custom icons in Kendo UI.

## Nova Theme Features

### Primary Button State

To activate the feature set `km-primary` class to the button.

###### Example

    <a data-role="button" class="km-primary">Primary Button</a>

### Size

There are three predefined sizes&mdash;small, medium (default) and large. To apply different than the default size set `km-small` or `km-large` class.

The example below demonstrates a small Button.

###### Example

    <a data-role="button" class="km-small">Small Button</a>

The example below demonstrates a large Button.

###### Example

    <a data-role="button" class="km-large">Large Button</a>

### Position

To activate this feature set `km-justified` class to the button.

The example below demonstrates how to justify the position of the Button.

###### Example

    <a data-role="button" class="km-justified">Justified Button</a>

### Link Button

To activate this feature set `km-link-button` class.

###### Example

    <a data-role="button" class="km-link-button">Link Button</a>

### Icon-Only Button

To achieve this outcome do not set text to the button.

###### Example

    <a data-role="button" data-icon="home"></a>

## See Also

Other articles and how-to examples on the Hybrid UI components and on the Button:

* [Hybrid UI Button JavaScript API Reference](/api/javascript/mobile/ui/button)
* [Hybrid UI ButtonGroup JavaScript API Reference](/api/javascript/mobile/ui/buttongroup)
* [How to Configure Custom Text Binding of the Button]({% slug howto_configuretextbinding_hybridactionsheet %})
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
