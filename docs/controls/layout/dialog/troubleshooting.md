---
title: Troubleshooting
page_title: jQuery Dialog Documentation | Troubleshooting
description: "Get started with the jQuery Dialog by Kendo UI and learn how to deal with issues you may encounter while using the widget."
slug: troubleshooting_kendoui_dialog
position: 60
---

# Troubleshooting

This article provides solutions for issues you might encounter while working with the Kendo UI Dialog widget.

## The scrollbar overlaps on OS X

A scrollbar of an element below the Dialog popup might be displayed incorrectly over the Dialog popup in the Safari and Chrome browsers which run on OS X.

**Solution** Apply the CSS style to the scrollbar container below the Dialog as demonstrated in the example below.

    -webkit-transform: translate3d(0, 0, 0);

## Cannot create multiple Dialogs with the same ID

To create a Kendo UI Dialog instance multiple times with the same ID, make sure that the existing instance with this ID is [destroyed](#configuration-Destroy) first. Widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at one and the same time.

Alternatively, do not destroy the existing Dialog instance&mdash;[open](/api/javascript/ui/dialog/methods/open) it and [set new static content](/api/javascript/ui/dialog/methods/content) if needed.

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
