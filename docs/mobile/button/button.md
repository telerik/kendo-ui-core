---
title: Button
page_title: Documentation Guide for Mobile Button Widget
description: How to initialize Kendo UI Mobile Button widget, customize its appearance and set a button icon.
position: 3
---

# Button

The mobile Button widget navigates to mobile View or executes a custom callback when tapped.

## Getting Started

The Kendo mobile Application will automatically initialize a mobile Button widget for every element with `data-role` attribute set to `button` present in the views/layouts' markup.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.
The button element may be either `A` or `BUTTON`.

### Initialize Kendo mobile Button based on `data-role` attribute

    <a href="#foo" data-role="button">Foo</a>

### Initialize Kendo mobile Button using jQuery

    var button = $("#button").kendoMobileButton();

## Customizing Mobile Button Appearance

The Kendo mobile Button color can be customized by setting its `background-color` CSS property inline or by using a CSS selector with specificity of 20+.
You can target platforms separately using their respective root CSS classes.

### Green Button

    <a href="#foo" data-role="button" style="background-color: green">Foo</a>

### Green Kendo mobile Button in iOS and a red one in Android

    <style>
        .km-ios .checkout { background-color: green; }
        .km-android .checkout { background-color: red; }
    </style>

    <a href="#foo" data-role="button" class="checkout">Foo</a>

## Button icons

A Button icon can be set in two ways:

1. By adding an `img` element inside the Button element
2. By setting a `data-icon` attribute to the Button element

### Example - using font icons with `data-icon` attribute

    <a href="#search" data-role="button" data-icon="search">Search</a>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [Icons](../icons) article.


Additional icons may be added by defining the respective CSS class.
If the `data-icon` attribute is set to `custom`, the button will receive `km-custom` CSS class.

> **Important:** Check the [Icons](../icons) article for more information and how you can use custom icons in Kendo UI.
