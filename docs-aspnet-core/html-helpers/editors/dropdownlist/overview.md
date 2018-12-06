---
title: Overview
page_title: DropDownList | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/dropdownlist
slug: htmlhelpers_dropdownlist_aspnetcore
position: 0
---

# DropDownList HtmlHelper Overview

The DropDownList HtmlHelper extension is a server-side wrapper for the [Kendo UI DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) widget.

It allows you to configure the Kendo UI DropDownList widget from server-side code. The [DropDownList](http://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview) displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

For more information on the HtmlHelper, refer to the article on the [DropDownList HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview).

## Basic Usage

The following example demonstrates how to define the DropDownList by using the DropDownList HtmlHelper.

###### Example

```Razor
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "DropDownList");
            });
        })
    )
```
```Controller

    public class DropDownListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return Json(result);
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the DropDownList HtmlHelper and how to get the DropDownList instance.

```
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%" })
        .Filter("contains")
        .MinLength(3)
        .Height(290)
        .HeaderTemplate(
            "<div class=\"dropdown-header k-widget k-header\">" +
                "<span>Products</span>" +
            "</div>")
        .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read2", "DropDownList");
            })
            .ServerFiltering(false);
        })
        .Events(e => e
            .Change("onChange")
            .Select("onSelect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the DropDownList is used to get its client-side instance.
            var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            console.log(dropdownlist);
        });
    </script>
```

## Event Handling

You can subscribe to all DropDownList [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

        @(Html.Kendo().DropDownList()
          .Name("dropdownlist")
          .BindTo(new string[] { "Item1", "Item2", "Item3" })
          .Events(e => e
                .Select("dropdownlist_select")
                .Change("dropdownlist_change")
          )
        )
        <script>
        function dropdownlist_select() {
            //Handle the select event.
        }

        function dropdownlist_change() {
            //Handle the change event.
        }
        </script>


### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example



        @(Html.Kendo().DropDownList()
          .Name("dropdownlist")
          .BindTo(new string[] { "Item1", "Item2", "Item3" })
          .Events(e => e
              .Select(@<text>
                function() {
                    //Handle the select event inline.
                }
              </text>)
              .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
                </text>)
          )
        )


## Reference

### Existing Instances

To reference an existing Kendo UI DropDownList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownList API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI DropDownList for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DropDownList is used to get its client-side instance.
        var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
        });
        </script>



## See Also

* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
