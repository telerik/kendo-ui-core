---
title: Dimensions
page_title: jQuery Window Documentation | Dimensions
description: "Get started with the jQuery Window by Kendo UI and learn how to set its dimensions and resize it depending on the content it displays."
slug: dimensionsresize_window
position: 4
---

# Dimensions

By default, the Window does not provide preset dimensions and its size depends on the content it displays.

If the Window contains horizontally expandable block-level elements including Kendo UI widgets such as the Grid, Editor, and others, the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the Window sticks to the right viewport edge and cannot be separated from it. This behavior occurs because the Window is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Window and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

[If the Window uses an `iframe` element]({% slug content_window %}#handling-content-in-iframes), the Window will not resize automatically based on the `iframe` content because no relationship between the content and the size of the `iframe` exists. However, iOS devices do not support `iframe` scrolling and expand `iframe`s depending on their content which might increase the Window height too much. That is why, it is not recommended to use the Window in an `iframe` mode on Apple touch devices.

## See Also

* [JavaScript API Reference of the Window](/api/javascript/ui/window)
* [Handling Window Content in iframes]({% slug content_window %}#handling-content-in-iframes)
