---
title:  Content
page_title: Set the content for the Splitter.
description: "An example on how to set the content for  the Telerik UI Splitter HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_splitter_content_aspnetcore
position: 7
---

# Content Operations

The Splitter provides several options for setting the content of the panes.
* [Static Content](#static-content)
* [Asynchronously loading content](#asynchronously-loading-content)

## Static Content

You can set the HTML for each Splitter pane via the [`Content()`](/api/Kendo.Mvc.UI.Fluent/SplitterPaneBuilder#contentsystemaction) configuration option.

The following example demonstrates how to configure the HTML Content for the Splitter:

```
@(Html.Kendo().Splitter()
      .Name("splitter")
      .Orientation(SplitterOrientation.Vertical)
      .Panes(verticalPanes =>
      {
          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "top-pane" })
              .Content(@<div class="pane-content">
                            <h3>Top pane</h3>
                        </div>);
          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "middle-pane" })
              .Content(@<div class="pane-content">
                            <h3>Outer splitter / middle pane</h3>
                        </div>);
          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "bottom-pane" })
              .Content(@<div class="pane-content">
                        </div>);
      })
)
```

## Asynchronously loading content

The Splitter provides built-in support for asynchronously loading content from URLs via the [`LoadContentFrom()`](/api/Kendo.Mvc.UI.Fluent/SplitterPaneBuilder#loadcontentfromsystemstring) coniguration option. These URLs should return HTML fragments that will be loaded in the pane of a Splitter. To load a whole page in an `iframe`, specify the complete URL, for example, https://www.telerik.com/.

The following example demonstrates how to load the Splitter content asynchronously.

```Razor
@(Html.Kendo().Splitter()
      .Name("splitter")
      .Panes(panes =>
      {
          panes.Add().LoadContentFrom(Url.Action("PaneContent", "Splitter"));
          panes.Add().LoadContentFrom("https://www.telerik.com/");
      }))
```
```Controller
public IActionResult PaneContent()
{
    return PartialView();
}
```

## See Also

* [Loading Content with AJAX in the Splitter (Demo)](https://demos.telerik.com/{{ site.platform }}/splitter/ajax)
* [Server-Side API](/api/splitter)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
