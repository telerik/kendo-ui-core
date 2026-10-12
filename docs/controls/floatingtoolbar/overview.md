---
title: Overview
page_title: jQuery FloatingToolBar Documentation
description: "Learn how to configure the jQuery FloatingToolBar by Kendo UI, position it, and manage overflow, events, and keyboard movement."
components: ["floatingtoolbar"]
slug: overview_kendoui_floatingtoolbar_widget
position: 1
---

# Overview

The Kendo UI for jQuery FloatingToolBar hosts a [ToolBar](/api/ui/toolbar) in a floating container. Use it for contextual commands that should stay near a region of the page, such as formatting controls for selected content or actions for a card, document, or call window.

The widget supports two positioning modes:

- **Free-position mode** aligns the toolbar inside its closest positioned ancestor by using `containerAlign` and `margin`.
- **Anchored mode** positions it beside a target element by using `anchor` and `position`. Popup collision handling can flip or fit the toolbar when space is limited.

The hosted ToolBar provides the commands and overflow behavior. Use `items` to define buttons, toggle buttons, button groups, split buttons, separators, spacers, and supported templates. Set `visible` to show the toolbar at initialization, or use the client-side API to control visibility later. Set `draggable` to provide a pointer drag handle and keyboard Move mode.

## Functionality and Features

* [Getting Started]({% slug getting_started_kendoui_floatingtoolbar_widget %})&mdash;Initialize a FloatingToolBar and configure its first commands.
* [Positioning]({% slug positioning_kendoui_floatingtoolbar_widget %})&mdash;Align the toolbar in a container or anchor it to a page element.
* [Appearance]({% slug appearance_kendoui_floatingtoolbar_widget %})&mdash;Set the size, fill mode, and accessible name.
* [Overflow]({% slug overflow_kendoui_floatingtoolbar_widget %})&mdash;Choose how the hosted ToolBar handles commands that do not fit.
* [Events]({% slug events_kendoui_floatingtoolbar_widget %})&mdash;Respond to visibility changes and movement.
* [Keyboard Navigation]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})&mdash;Navigate toolbar commands and move the draggable toolbar from the keyboard.
* [Accessibility]({% slug accessibility_kendoui_floatingtoolbar_widget %})&mdash;Configure the toolbar's accessible name and draggable handle messages.

## Next Steps

* [Getting Started with the FloatingToolBar]({% slug getting_started_kendoui_floatingtoolbar_widget %})
* [Positioning of the FloatingToolBar]({% slug positioning_kendoui_floatingtoolbar_widget %})
* [Appearance of the FloatingToolBar]({% slug appearance_kendoui_floatingtoolbar_widget %})
* [Overflow in the FloatingToolBar]({% slug overflow_kendoui_floatingtoolbar_widget %})
* [Events of the FloatingToolBar]({% slug events_kendoui_floatingtoolbar_widget %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [JavaScript API Reference](/api/ui/floatingtoolbar)
* [ToolBar Getting Started]({% slug getting_started_kendoui_toolbar %})