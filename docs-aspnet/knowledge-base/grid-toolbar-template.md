---
title: Creating Custom Grid Toolbar Template
description: Learn how to create a custom Toolbar template in the {{ site.product }} Grid. Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: Create a Custom Toolbar in Grid
slug: grid-toolbar-template
tags: grid, toolbar, asp, core, template
ticketid: 1147879
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.3 1026</td>
 </tr>
</table>

## Description

We recently upgraded our ASP.NET MVC 5 to ASP.NET MVC Core 2.0.1 (running on net471), however we're running into some issues. The `.ToolBar( t => t.Template(` does not exist anymore and we had a drop-down list and a button we want to implement.
Is there a workaround for it or if it needs to be replaced by something else what would be the best approach?

## Solution

Indeed the changes in ASP.NET Core affect the server rendering, however, you can still have the same toolbar template using a client template. Here is how:

1. Add the toolbar configuration like this:
    `.ToolBar(t=>t.ClientTemplateId("toolbar")) // this should be the script tag id`
1. Move the HTML which is between the text tags into a script tag with the respective id:

```cshtml
    <script id="toolbar" type="text/kendo-tmpl">
        <div class="pull-left">
            @(Html.Kendo().DropDownList()
                .Name("SomeName")
                .DataTextField("Text")
                .DataValueField("Value")
                    .BindTo(new List<SelectListItem>() {
                new SelectListItem() {
                    Text = "All",
                    Value = "0"
                },
                new SelectListItem() {
                    Text = "Processing",
                    Value = "1"
                },
                new SelectListItem() {
                    Text = "Ready",
                    Value = "3"
                }
            }).ToClientTemplate())

            @(Html.Kendo().Button()
                .Name("statusSelectButton")
                .Content("Go!")
                .HtmlAttributes(new { type = "button", @class = "k-button" })
                .Events(ev => ev.Click("onStatusSelectPending")).ToClientTemplate())
        </div>
        <div class="pull-right">
            <i class="icon-barcode"></i>

                @(Html.Kendo().TextBox()
                .Name("barcodeSearchPending")
                .HtmlAttributes(new { placeholder = "Barcode Search", style = "width:250px" })
                .ToClientTemplate())

                @(Html.Kendo().Button()
                    .Name("barcodeSearchButtonPending")
                    .Content("Search")
                    .HtmlAttributes(new { type = "button", @class = "k-button" })
                    .Events(ev => ev.Click("onSelectBarcodeSearchPending")).ToClientTemplate())
        </div>
    </script>

    <script>
        function onStatusSelectPending() { alert("onStatusSelectPending") }
        function onSelectBarcodeSearchPending() { alert("onSelectBarcodeSearchPending") }
    </script>

    <style>
    .k-grid .pull-right {
            margin-left: auto;
            margin-right: 0;
        }    
    </style>
```

Here is a [REPL example demonstrating the above with version 2021.3.914](https://netcorerepl.telerik.com/wFFlaIlQ04WzH8VM43)

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Creating Custom Grid Toolbar Template](https://netcorerepl.telerik.com/wFFlaIlQ04WzH8VM43)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
