---
title: TabStrip
page_title: General documentation for Kendo UI Mobile Tabstrip widget
description: How to initialize Kendo Mobile TabStrip widget and create custom icons.
---

# TabStrip

The mobile TabStrip widget is used inside a mobile view or layout footer element to display an application-wide group of navigation buttons.
The look of the mobile TabStrip changes depending on the user mobile device and operating system.

## Getting Started

The Kendo mobile Application will automatically initialize the mobile TabStrip for every element with `role` data attribute set to `tabstrip` present in the views/layouts markup.
Alternatively, it can be initialized using jQuery plugin syntax in the mobile View/Layout init event handler. The tabstrip element should contain one or more `a` elements.

## Kendo Mobile Application Integration

The tabs of the TabStrip navigate to the mobile application's views. When the mobile application navigates to another view, it updates the TabStrip's currently selected tab, based on the current view's URL.

### Initialize Kendo mobile TabStrip based on role data attribute.

    <div data-role="tabstrip">
        <a href="#index">Home</a>
        <a href="#featured">Featured</a>
    </div>

## Tab Badges

Every tab can have a badge, which is set using the `badge` data attribute of the Tab's `a` element.

### Example - setting badges to tabs

    <div data-role="tabstrip">
        <a data-badge="5" href="#index">Home</a>
        <a data-badge="105" href="#featured">Featured</a>
    </div>

## Tab icons

A tab icon can be set in two ways:

1. By adding an `img` element inside the `a` element
2. By setting a `data-icon` attribute to the `a` element.

### Example - using font icons with `data-icon` attribute

    <div data-role="tabstrip">
        <a data-icon="home" href="#index">Home</a>
        <a data-icon="featured" href="#featured">Featured</a>
    </div>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [Icons](../icons) article.

Additional icons may be added by defining the respective CSS tab class.

> **Important:** Check the [Icons](../icons) article for more information and how you can use custom icons in Kendo UI Mobile.
