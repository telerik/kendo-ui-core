---
title: Overview
page_title: PanelBar Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI PanelBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/panelbar
slug: htmlhelpers_panelbar_aspnetcore
position: 1
---

# PanelBar HtmlHelper Overview

The Telerik UI PanelBar HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI PanelBar widget.

The PanelBar displays hierarchical data as a multi-level, expandable widget.

* [Demo page for the PanelBar](https://demos.telerik.com/aspnet-core/panelbar/index)

## Initializing the PanelBar

The following example demonstrates how to define the PanelBar by using the PanelBar HtmlHelper.

```Razor
   @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_PanelBarData", "PanelBar"));
        })
    )
```
```Controller
     public class PanelBarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public static IList<HierarchicalViewModel> GetHierarchicalData()
        {
            var result = new List<HierarchicalViewModel>()
            {
                new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item" },
                new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Parent item" },
                new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item" },
                new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item" },
                new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item" }
            };

            return result;
        }

        public IActionResult Read_PanelBarData(int? id)
        {
            var result = GetHierarchicalData()
                .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
                .Select(item => new {
                    id = item.ID,
                    Name = item.Name,
                    expanded = item.Expanded,
                    imageUrl = item.ImageUrl,
                    hasChildren = item.HasChildren
                });

            return Json(result);
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration of the PanelBar HtmlHelper.

```Razor
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .TemplateId("panelbar-template")
        .ExpandMode(PanelBarExpandMode.Single)
        .Events(events => events
            .Select("select")
            .Expand("expand")
            .Collapse("collapse")
            .Activate("activate")
            .ContentLoad("contentLoad")
            .Error("error")
        )
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_PanelBarData", "PanelBar"));
        })
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the PanelBar is used to get its client-side instance.
            var panelbar = $("#panelbar").data("kendoPanelBar");
            console.log(panelbar);
        });
    </script>
```
```Template
    <script id="panelbar-template" type="text/kendo-ui-template">
        #: item.text #
        # if (!item.items) { #
            <a class='delete-link' href='\#'></a>
        # } #
    </script>
```

## Events

For a complete example on basic PanelBar events, refer to the [demo on using the events of the PanelBar](https://demos.telerik.com/aspnet-core/panelbar/events).

## See Also

* [Basic Usage of the PanelBar HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/panelbar)
* [Using the API of the PanelBar HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/panelbar/api)
* [Server-Side API](/api/panelbar)
