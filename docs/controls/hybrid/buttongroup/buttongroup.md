---
title: ButtonGroup
page_title: Using jQuery Mobile button group in Kendo UI
description: Visualize a linear set of grouped buttons in your app by the initialization of Kendo ButtonGroup. Learn how to customize the appearance of the mobile button and set its icons.
position: 4
---

# ButtonGroup

The Kendo mobile ButtonGroup widget presents a linear set of grouped buttons.

## Getting Started

The Kendo mobile Application will automatically initialize a mobile ButtonGroup for every element with `role` data attribute set to `buttongroup`
present in the views/layouts markup. Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**. The ButtonGroup element should be `UL` element.

### Initialize Kendo mobile ButtonGroup based on role data attribute.

    <ul id="buttongroup" data-role="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
    </ul>

### Initialize Kendo mobile ButtonGroup using jQuery plugin syntax

    var buttongroup = $("#buttongroup").kendoMobileButtonGroup();

## Customizing Mobile ButtonGroup Appearance


Every Kendo Mobile ButtonGroup color can be customized by setting the respective `background-color` CSS property inline or with a CSS selector.

### Green Kendo mobile ButtonGroup

    <ul id="buttongroup" data-role="buttongroup">
        <li style="background-color: green">Option1</li>
        <li style="beckground-color: red">Option2</li>
    </ul>

## Button Badges

Every button can have a badge, which is set using the `data-badge` attribute of the Button's `li` element.

### Example - setting badges to ButtonGroup's buttons

    <ul id="buttongroup" data-role="buttongroup">
        <li data-badge="5">Option 1</li>
        <li data-badge="105">Option 2</li>
    </ul>

## Button Icons

A Button icon can be set in two ways:

1. By adding an `img` element inside the Button `li` element
2. By setting a `data-icon` attribute to the Button `li` element

### Example - using font icons with `data-icon` attribute

    <ul id="buttongroup" data-role="buttongroup">
        <li data-icon="mostrecent">Most Recent</li>
        <li data-icon="mostviewed">Most Viewed</li>
    </ul>

Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [Icons](./icons) article.

> **Important:** Check the [Icons](./icons) article for more information and how you can use custom icons in Kendo UI.

## Nova theme features

### Primary ButtonGroup state

To activate the feature set `km-primary` class to the ButtonGroup.

#### Primary ButtonGroup example

    <ul data-role="buttongroup" data-index="0" class="km-primary">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### ButtonGroup sizes

There are three predefined sizes - small, medium (default) and large. To apply different than the default size set `km-small` or `km-large` class.

#### Small ButtonGroup example

    <ul data-role="buttongroup" data-index="0" class="km-small">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

#### Large ButtonGroup example

    <ul data-role="buttongroup" data-index="0" class="km-large">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### Justified ButtonGroup

To activate this feature set `km-justified` class to the ButtonGroup.

#### Justified ButtonGroup example

    <ul data-role="buttongroup" data-index="0" class="km-justified">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

### Icons only ButtonGroup

To achieve this outcome don't set text to the buttons in the ButtonGroup.

#### Icons only ButtonGroup example

    <ul data-role="buttongroup" data-index="1">
        <li data-icon="play"></li>
        <li data-icon="pause"></li>
        <li data-icon="rewind"></li>
        <li data-icon="fastforward"></li>
        <li data-icon="globe"></li>
    </ul>
