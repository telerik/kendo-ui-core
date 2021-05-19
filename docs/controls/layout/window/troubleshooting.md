---
title: Troubleshooting
page_title: jQuery Window Documentation | Troubleshooting
description: "Get started with the jQuery Window by Kendo UI and learn how to handle possible issues while working with the widget."
slug: troubleshoot_window
position: 60
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Kendo UI Window widget.

## The scrollbar of other elements on the page overlaps the popup of the Window in OS X

A scrollbar of an element below the popup of the Window may be incorrectly displayed over the popup in the Safari and Chrome browsers which run on OS X.

**Solution** Use the CSS style to the scrollbar container below the Window.

    -webkit-transform: translate3d(0, 0, 0);

## Initializing the Window from an element inside a form causes side effects

> This scenario excludes the cases when the content of the Window is in an `iframe` element.  

By default, after the Window is initialized, it is moved in the DOM, placed as a child of the `body` element, and positioned on top of all other page content. However, this behavior causes undesired side effects when the Window is created from an element inside a form because the moved form fields will not be submitted.

**Solution** To work around this issue, use either of the following approaches:

1. Place the whole form, including its opening and closing tags, inside the element from which the Window is created.
2. If some parts of the Window need to remain outside, use the [`appendTo`](/api/javascript/ui/window/configuration/appendto) property so that the widget remains inside the form.

If the Window contains a form which is submitted through a standard POST request, the widget will close and the page will be reloaded. To handle this behavior, submit the form with AJAX. The approach is strongly recommended when the submitted data is validated on the server because in such cases the Window is expected to remain visible and to display the validation messages that might be returned.

## See Also

* [Basic Usage of the Window (Demo)](https://demos.telerik.com/kendo-ui/window/index)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
