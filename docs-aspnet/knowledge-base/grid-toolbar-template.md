---
title: Grid Toolbar Template
description: An example on how to create a Toolbar template in the Telerik UI Grid for ASP.NET Core.
type: how-to
page_title: Create a Custom Toolbar in Grid
slug: grid-toolbar-template
tags: grid, toolbar, asp, core, template
ticketid: 1147879
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.3 1026</td>
 </tr>
</table>

## Description

We recently upgraded our ASP.NET MVC 5 to ASP.NET MVC Core 2.0.1 (running on net471), however we're running into some issues. The `.ToolBar( t => t.Template(` does not exist anymore and we had a dropdown list and a button we want to implement.
Is there a workaround for it or if it needs to be replaced by something else what would be the best approch?

## Solution

Indeed the change which ASP.NET Core have made affects the server rendering, however, you can still have the same toolbar template using a client template. Here is how:

1. Add the toolbar configuration like this:
    `.ToolBar(t=>t.ClientTemplateId("toolbar")) // this should be the script tag id`
1. Move the HTML which is between the text tags into a script tag with the respective id:

```cshtml
    <script id="toolbar" type="text/kendo-tmpl">
        <div class="toolbar" style="margin: auto;">
            <div>
                <span class="pull-left">
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
                </span>
                <span class="pull-right">
                    <i class="icon-barcode"></i>
    
                        @(Html.Kendo().TextBox()
                        .Name("barcodeSearchPending")
                        .HtmlAttributes(new { placeholder = "Barcode Search", style = "width:250px" }   ).             ToClientTemplate())
    
                        @(Html.Kendo().Button()
                         .Name("barcodeSearchButtonPending")
                         .Content("Search")
                         .HtmlAttributes(new { type = "button", @class = "k-button" })
                         .Events(ev => ev.Click("onSelectBarcodeSearchPending")).ToClientTemplate())
                </span>
            </div>
        </div>
    </script>
    <script>
        function onStatusSelectPending() { alert("onStatusSelectPending") }
        function onSelectBarcodeSearchPending() { alert("onSelectBarcodeSearchPending") }
    </script>
```
