---
title: Filtering a DropDownList by Multiple Properties
description: Learn how to filter the {{ site.product }} DropDownList by multiple properties by following the steps in the Knowledge Base section of the {{ site.product }} components.
type: how-to
page_title: Filtering a DropDownList by Multiple Properties
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

How can I filter the DropDownList data by multiple properties on the client-side when working with the {{ site.product }} components?

## Solution

1. Subscribe to the [`Filtering`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/dropdownlisteventbuilder#filteringsystemstring) event.
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

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Filtering a DropDownList by Multiple Properties](https://netcorerepl.telerik.com/ccOqQLvn39tnt1Zy03)
* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
