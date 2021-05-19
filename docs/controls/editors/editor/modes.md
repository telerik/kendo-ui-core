---
title: Modes of Operation
page_title: jQuery Editor Documentation | Modes of Operation
description: "Get started with the jQuery Editor by Kendo UI and use its modes of operation."
slug: modes_kendoui_editor_widget
position: 3
---

# Modes of Operation

Depending on the element from which the Editor is initiated, it provides two types of operation modes&mdash;the [classic](#classic-mode) and the [inline](#inline-mode) mode.   

## Classic Mode

If you use the default `<textarea>` element for initializing the Editor, the Editor assumes its classic mode. The `textarea` is not visible and is used to hold the value of the widget. You can type in the `contenteditable iframe` that is created.

The classic Editor posts its value automatically because it is based on a `form` element. The tools of the Editor are always visible. Its content does not reside on the main web page and the styling of the page does not influence the editable content. To apply custom styles to the editable content, [inject them through the configuration of the Editor](/api/javascript/ui/editor/configuration/stylesheets). For a runnable example, refer to the [demo on the classic Editor mode](https://demos.telerik.com/kendo-ui/web/editor/index.html).

## Inline Mode

If you initialize the Editor from a `"div"` element, the widget assumes its inline mode. The `<div>` element is content-editable and is used by the widget to return its value. For a runnable example, refer to the [demo on the inline Editor mode](https://demos.telerik.com/kendo-ui/web/editor/inline-editing.html).

> While it is possible to initialize an inline Editor from a non-`div` element, such as `p` or `h1`, it is strongly recommended that you use the `<div>` one. Do not use `<table>` elements for creating inline Editors because of Internet Explorer browser limitations.

By default, inline Editors do not post their value and you have to [post their value manually]({% slug troubleshooting_editor_widget %}). The tools of the Editor are only visible when the widget is focused. Its content resides on the main web page and the styling of the page influences the editable content.

> Because of the limited `iframe` support by the iOS Safari browser, it is recommended to use the inline Editor mode on iOS devices.

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
