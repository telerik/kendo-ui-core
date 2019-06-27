---
title: Expand Splitter to Content
page_title: Splitter | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to expand the Kendo UI Splitter to fit the content inside it using the Kendo UI Splitter HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_expand_splitter_to_content_aspnetcore
position: 4
---

# Expand to Content

The example below demonstrates how to make the Kendo UI Splitter expand its height based on the content inside a pane.

To achieve this, take the following notable steps:

1. Set up the Kendo UI Splitter to expand to the height of its parent according to the article on how to [expand to 100% height and auto-resize]({% slug htmlhelpers_expand_splitter_to_100_height_aspnetcore %}).
2. Make sure that the parent content is resized when the content of the pane is rendered.
3. Call the `resize` method to finalize the process.

```Razor
@(Html.Kendo().Splitter()
                .Name("vertical")
                .Orientation(SplitterOrientation.Horizontal)
                .Panes(verticalPane =>
                {
                    verticalPane.Add().Collapsible(true).Content("<div id='grid'></div>");
                    verticalPane.Add().Collapsible(true);
                })
)

@(Html.Kendo().Grid<CoreDocumentationSplitter.Models.Products>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(p => p.ProductName);
                })
                .DataSource(dataSource => dataSource
                    .Custom()
                    .Batch(true)
                    .Schema(schema => schema.Model(m => m.Id(p => p.ProductID)))
                    .Transport(transport =>
                    {
                        transport.Read(read =>
                           read.Url("https://demos.telerik.com/kendo-ui/service/products")
                               .DataType("jsonp")
                        );
                    })
                )
                .Events(e => { e.DataBound("onDataBound"); })
)


<script>
    function onDataBound(e) {
        var gridHeight = e.sender.wrapper.outerHeight() + e.sender.wrapper.outerHeight() - e.sender.wrapper.height();
        $(document).find("body").height(gridHeight);
        var splitter = $("#vertical").data("kendoSplitter");
        splitter.resize(true);
    }
</script>

<style>
    html,
    body,
    main,
    #vertical,
    .container 
    {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
```
```Controller
    public class SplitterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```
```Model
    public class Products
    {
        public string ProductID { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
    }
```
