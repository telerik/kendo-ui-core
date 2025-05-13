---
title:  Panes
page_title: Panes.
description: "Get started witht the Telerik UI Splitter component for {{ site.framework }} and learn how to configure the panes behavior."
slug: htmlhelpers_splitter_panes_aspnetcore
position: 2
---

# Panes

You can configure the Panes of the Splitter component via the [`.Panes()`](/api/kendo.mvc.ui.fluent/splitterbuilder#panessystemaction) configuration method.

The Splitter Panes can be configured as:

- [`.Collapsible()`](/api/kendo.mvc.ui.fluent/splitterpanebuilder#collapsiblesystemboolean) - Sets whether the pane can be collapsed by the user.
- [`.Resizable()`](/api/kendo.mvc.ui.fluent/splitterpanebuilder#resizablesystemboolean) - Sets whether the pane can be resized by the user.
- [`.Scrollable()`](/api/kendo.mvc.ui.fluent/splitterpanebuilder#scrollablesystemboolean) - Sets whether the pane shows a scrollbar when its content overflows.

## Resize Panes Using Click-Move-Click

As of {{ site.product }} R2 SP1 2023, users can resize the Splitter's panes by using the click-move-click functionality provided by the [`ClickMoveClick()`](/api/kendo.mvc.ui.fluent/splitterbuilder#clickmoveclicksystemboolean) option. To start resizing the pane, users can click the resize handle, move it to the desired pane size and then click again to fix the pane size.

## See Also

- [Overview of the Splitter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitter)
- [Server-Side API of the Splitter](/api/splitter)
- [Client-Side API Reference of the Splitter](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitter)