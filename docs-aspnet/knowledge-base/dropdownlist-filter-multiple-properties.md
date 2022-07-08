---
title: Filter DropDownList by Multiple Properties
description: An example on how to filter the {{ site.product }} DropDownList by multiple properties.
type: how-to
page_title: Filter DropDownList by Multiple Properties
slug: dropdownlist-filter-multiple-properties
tags: dropdownlist, filter, multiple, properties
ticketid: 1569491
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} DropDownList</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I filter the DropDownList data by multiple properties on the client-side?

## Solution

1. Subscribe to the [`Filtering`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DropDownListEventBuilder#filteringsystemstring) event.
1. Prevent the default behavior of the `Filtering` event.
1. Use the dataSource [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method to apply the custom filtering.

```Index.cshtml
    @(Html.Kendo().DropDownList()
          .Name("dropDownList")
          .DataTextField("Text")
          .DataValueField("Value")
          .Filter(FilterType.Contains)
          .Events(e => e.Filtering("onFilter"))
          .BindTo(new List<SelectListItem>() {
              new SelectListItem() {
                  Text = "Maria Anders",
                  Value = "H120"
              },
              new SelectListItem() {
                  Text = "Ana Trujilo",
                  Value = "H220"
              },
              new SelectListItem() {
                  Text = "Antonio Moreno",
                  Value = "H320"
              }
          })
          .Template("#: data.Text # (#: data.Value #)")
          .HtmlAttributes(new { style = "width: 100%" })
    )
```
```Script.js
    <script>
        function onFilter(e){
            e.preventDefault();
            var filterValue = e.filter != undefined ? e.filter.value : ""; //get the filter value

            this.dataSource.filter({ //apply the required filter logic
              logic: "or",
              filters: [
                {
                  field: "Text",
                  operator: "contains",
                  value: filterValue
                },
                {
                  field: "Value",
                  operator: "contains",
                  value: filterValue
                }
              ]
            });
        }
    </script>  
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/ccOqQLvn39tnt1Zy03) example.
