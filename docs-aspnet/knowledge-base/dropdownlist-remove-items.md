---
title: Removing DropDownList Items
page_title: Removing Items from the DropDownList
description: Learn how to remove items from the {{ site.product }} DropDownList by following the steps in the Knowledge Base section of the {{ site.product }} components.
slug: dropdownlist-remove-items
tags: telerik, dropdownlist, remove, items, datasource
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} DropDownList</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I remove items from the {{ site.product }} DropDownList?

## Solution

To achieve the desired scenario: 

1. Create a `button` that will be responsible for removing an item in the DropDownList.
1. To remove an item, handle `click` event of the previously created button and use the [`.remove()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/remove) configuration method of the DropDownList's DataSource.

```Index.cshtml
    <button class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md" id="remove">Remove Items</button>

    @(Html.Kendo().DropDownList()
         .Name("color")
         .DataTextField("Text")
         .DataValueField("Value")
         .BindTo(new List<SelectListItem>() {
             new SelectListItem() {
                 Text = "Black",
                 Value = "1"
             },
             new SelectListItem() {
                 Text = "Orange",
                 Value = "2"
             },
             new SelectListItem() {
                 Text = "Grey",
                 Value = "3"
             }
         })
         .Value("1")
         .HtmlAttributes(new { style = "width: 100%" })
    )
```
```Script.js
    <script>
        $("#remove").click(function() {
           var ddl =  $("#color").data("kendoDropDownList"); // Get the reference of the DropDownList. 

           var oldData = ddl.dataSource.data(); // Get the DataSource's data.

           ddl.dataSource.remove(oldData[0]); // Remove the first item.
           ddl.dataSource.remove(oldData[oldData.length - 1]); // Remove the last item.
        });
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on removing {{ site.product }} DropDownList items](https://netcorerepl.telerik.com/QQOXbxbx53N2swP026).

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

* [Telerik REPL: Removing {{ site.product }} DropDownList Items](https://netcorerepl.telerik.com/QQOXbxbx53N2swP026)
* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
