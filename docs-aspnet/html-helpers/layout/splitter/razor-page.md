---
title:  Razor Page
page_title: Configure the Splitter in a Razor Page.
description: "An example on how to configure the Telerik UI Splitter HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_splitter_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes how to configure the Telerik UI Splitter HtmlHelper for {{ site.framework }} in a RazorPages scenario.

See the Splitter configuration in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.Splitter.SplitterIndexModel
@{
	ViewData["Title"] = "SplitterIndex";
}

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>SplitterIndex</h1>

@(Html.Kendo().Splitter()
      .Name("vertical")
      .Orientation(SplitterOrientation.Vertical)
      .Panes(verticalPanes =>
      {
          verticalPanes.Add()
              .HtmlAttributes(new { id = "top-pane" })
              .Scrollable(false)
              .Collapsible(false)
              .Content(
                Html.Kendo().Splitter()
                    .Name("horizontal")
                    .HtmlAttributes(new { style = "height: 100%;" })
                    .Panes(horizontalPanes =>
                    {
                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "left-pane" })
                            .Size("220px")
                            .Collapsible(true)
                            .Content(@<div class="pane-content">
                                        <h3>Inner splitter / left pane</h3>
                                        <p>Resizable and collapsible.</p>
                                      </div>);

                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "center-pane" })
                            .Content(@<div class="pane-content">
                                        <h3>Inner splitter / center pane</h3>
                                        <p>Resizable only.</p>
                                      </div>);

                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "right-pane" })
                            .Collapsible(true)
                            .Size("220px")
                            .Content(@<div class="pane-content">
                                        <h3>Inner splitter / right pane</h3>
                                        <p>Resizable and collapsible.</p>
                                      </div>);
                    }).ToHtmlString()
              );

          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "middle-pane" })
              .Collapsible(false)
              .Content(@<div class="pane-content">
                            <h3>Outer splitter / middle pane</h3>
                            <p>Resizable only.</p>
                        </div>);

          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "bottom-pane" })
              .Resizable(false)
              .Collapsible(false)
              .Content(@<div class="pane-content">
                            <h3>Outer splitter / bottom pane</h3>
                            <p>Non-resizable and non-collapsible.</p>
                        </div>);
      })
)

<style>
	#vertical {
		height: 380px;
	}
	#middle-pane {
		color: #000;
		background-color: #ccc;
	}
	#bottom-pane {
		color: #000;
		background-color: #aaa;
	}
	#left-pane, #center-pane, #right-pane {
		color: #000;
		background-color: #F5F5F5;
	}
	.pane-content {
		padding: 0 10px;
	}
</style>
```
```tab-PageModel(cshtml.cs)
    public class SplitterIndexModel : PageModel
    {
        public void OnGet()
        {

        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Splitter Overview]({% slug htmlhelpers_splitter_aspnetcore %})
