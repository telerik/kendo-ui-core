---
title: Overview
page_title: PanelBar | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI PanelBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/panelbar
slug: htmlhelpers_panelbar_aspnetcore
position: 1
---

# PanelBar HtmlHelper Overview

The PanelBar HtmlHelper extension is a server-side wrapper for the [Kendo UI PanelBar](http://demos.telerik.com/kendo-ui/panelbar/index) widget.

It allows you to configure the Kendo UI PanelBar widget from server-side code. The [PanelBar](http://docs.telerik.com/kendo-ui/controls/navigation/panelbar/overview) displays hierarchical data as a multi-level, expandable widget.

For more information on the HtmlHelper, refer to the article on the [PanelBar HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/panelbar/overview).

## Basic Usage

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

## Configuration

The following example demonstrates the basic configuration of the PanelBar HtmlHelper and how to get the PanelBar instance.

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
            //Notice that the Name() of the PanelBar is used to get its client-side instance.
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

## See Also

* [JavaScript API Reference of the PanelBar](http://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [PanelBar HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/panelbar/overview)
* [PanelBar Official Demos](http://demos.telerik.com/aspnet-core/panelbar/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
