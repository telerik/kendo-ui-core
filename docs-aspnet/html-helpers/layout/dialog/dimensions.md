---
title: Dimensions
page_title: Dimensions
description: "Learn about the Dimensions configuration of the Telerik UI Dialog HtmlHelper for {{ site.framework }}."
slug: dimensions_dialoghelper_aspnetcore
position: 4
---

# Dimensions

By default, the Dialog does not have any preset height and width and its size depends on its content.

If the Dialog contains horizontally expandable block-level elements&mdash;including Kendo UI for jQuery widgets such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Dialog is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Dialog and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

## See Also

* [Server-Side API](/api/dialog)
