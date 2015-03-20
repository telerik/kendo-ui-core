---
title: NavBar
page_title: User Guide for Kendo UI Mobile NavBar widget
description: Step-by-step instructions how to use Mobile NavBar widget, align the widgets inside the NavBar and customize Mobile NavBar appearance.
---

# NavBar

The Kendo mobile NavBar widget is used inside a mobile View or Layout Header element to display an application navigation bar.
The mobile NavBar may display the current view title in the center, and optionally some additional left and right aligned widgets (a back button, settings button, etc.).

## Getting Started

The Kendo mobile Application will automatically initialize the mobile NavBar for every element with `role` data attribute set to `navbar` present in the views/layouts markup.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.

### Initialize Kendo mobile NavBar based on role data attribute

    <div data-role="navbar">My View Title</div>

### Initialize Kendo mobile NavBar using jQuery plugin syntax

    var navbar = $("#navbar").kendoMobileNavBar();

## Aligning Widgets Inside the NavBar

After initialization, the mobile NavBar positions its child elements based on the specified `align` data attribute (either `left` or `right`).
By default, elements without any align are centered.

### Use the `align` data attribute to specify the elements position inside the NavBar

    <div data-role="navbar">
        <a data-role="backbutton" data-align="left">Back</a>
        My View Title
        <a data-role="button" data-align="right">About</a>
    </div>

## Automatically Update NavBar Title Based on Current View's Title

If an element with `role` data attribute set to `view-title` is present inside the mobile NavBar,
the Kendo mobile Application instance will update its text to the current View's title when changing views.
The View title is specified by setting the `title` data attribute of the View element.

This feature is particularly useful if the mobile NavBar is inside a layout.

### Use the `view-title` data attribute to auto-update the mobile NavBar title

    <div data-role="layout" data-id="foo">
        <div data-role="header">
            <div data-role="navbar">
               <span data-role="view-title">My View Title</span>
            </div>
        </div>
    </div>

    <div data-role="view" data-layout="foo" data-title="bar"> ... </div>
    <div data-role="view" data-layout="foo" data-title="baz"> ... </div>

## Customizing Mobile NavBar Appearance

The mobile NavBar background color can be customized by setting its background-color CSS property either inline or using a CSS selector with specificity of 20+.
Different platforms can be styled separately with their respective root classes.

### Green Kendo mobile NavBar

    <div data-role="navbar" style="background-color: green">My View Title</div>

### Green Kendo mobile NavBar in iOS and a red one in Android

    <style>
        .km-ios .checkout { background-color: green; }
        .km-android .checkout { background-color: red; }
    </style>

    <div data-role="navbar" class="checkout">My View Title</div>

## Showing Hidden View Title

By default the NavBar View Title is visible only in iOS and hidden in the rest of the platforms. In order to be visible on a specific platform, a single CSS rule is needed:

### Show NavBar View Title on Android platform

    .km-android .km-navbar .km-view-title /* Before Q2 2012 SP1 */
    {
        display: inline-block;
    }

    .km-android .km-navbar .km-view-title /* After Q2 2012 SP1 */
    {
        visibility: visible;
    }
