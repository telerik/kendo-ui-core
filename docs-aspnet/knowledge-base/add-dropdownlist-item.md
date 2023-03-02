---
title: Adding an Item in a DropDownList
description: An example on how to add a new item for the {{ site.product }} DropDownList.
type: how-to
page_title: Adding an Item in a DropDownList
slug: add-dropdownlist-item
tags: dropdownlist, add, item, filter, datasource, custom
ticketid: 1549484
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
  <td>Created with the 2022.2.510 version</td>
 </tr>
</table>

## Description

How can I add a new item if it doesn't exist when working with the {{ site.product }} DropDownList?

## Solution

1. Create a seperate `Custom` DataSource and specify the action method for the [`.Create()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/CustomDataSourceTransportBuilder#createsystemactionkendomvcuifluentcustomcrudoperationbuilder) method.
1. Set the filter type for the DropDownList through the [`.Filter()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder#nodatatemplateidsystemstring).
1. Specify a [`NoDataTemplate`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder#nodatatemplatesystemstring) which will display an add confirmation dialog. 
1. Inside the template, create a button and attach a handler that passes both the widget `id` and input `value`.
1. [`Sync`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/sync) the data to update the records.

```Index.cshtml
    @using Telerik.Examples.Mvc.Models

    @(Html.Kendo().DataSource<Location>()
        .Name("customDataSource")
        .Custom(c=>c
        .Transport(transport=>transport
            .Read(read => read.Action("GetLocations", "AddItem"))
            .Create(create => create.Action("CreateLocation", "AddItem"))
         )
        .Schema(s=>s
            .Model(m=>
            {
                m.Id("Id");
                m.Field(f=>f.Id);
                m.Field(f=>f.Name);
            })
         )
        )
    )

    @(Html.Kendo().DropDownList()
        .Name("dropDownList")
        .DataTextField("Name")
        .DataValueField("Id")
        .NoDataTemplateId("noDataTemplate")
        .Filter(FilterType.StartsWith)
        .DataSource("customDataSource")
        .HtmlAttributes(new { style = "width: 100%" })
    )
```
```Controller.cs
    public class AddItemController : Controller
    {
        public IActionResult AddItem()
        {
            return View("~/Views/DropDownList/AddItem.cshtml");
        }
        public IActionResult GetLocations()
        {
            IEnumerable<Location> locations = LocationsData();

            return Json(locations);
        }
        public IActionResult CreateLocation(Location location)
        {
            return Json(new[] { location });
        }
        private List<Location> LocationsData()
        {
            return new List<Location>()
            {
                new Location() { Id = 1, Name = "London" },
                new Location() { Id = 2, Name = "Paris" },
                new Location() { Id = 3, Name = "Sofia" }
            };
        }
    }
```
```Script.js
    <script id="noDataTemplate" type="text/x-kendo-tmpl">
        <button class="k-button k-button-solid k-button-md k-rounded-md k-button-solid-base" onclick="addNew('#: instance.element[0].   id #', '#: instance.filterInput.val() #')">Add new item</button>
    </script>

    <script>
        function addNew(widgetId, value) {
            var widget = $("#" + widgetId).getKendoDropDownList(); //get the reference of the dropdownlist
            var dataSource = widget.dataSource;
            if (confirm("Are you sure?")) {
                dataSource.add({ //add a new item to the datasource
                    Id: 0,
                    Name: value
                });
                dataSource.one("sync", function () {
                    widget.select(dataSource.view().length - 1);
                });
                dataSource.filter({});
                dataSource.sync(); //sync the data
            }
        };
    </script> 
```

For the complete implementation of the suggested approach, refer to [this GitHub Project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/DropDownList/AddItem.cshtml).

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist/index)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
