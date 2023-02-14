---
title: Cascade ListBoxes
description: How to create cascading ListBoxes
type: how-to
page_title: Cascading Listboxes
slug: listbox-cascading
tags: listbox, cascade, core, aspnet, mvc, add, remove, change, datasource, refresh, select
ticketid: 1409405
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>ListBox for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
</table>


## Description

I have a few Telerik MVC ListBoxes with selection buttons (to move listitems) between one and the other linked listboxes.

I would like to force a refresh of the third Listbox when an item is removed or added from the first. It should cascade to only show the list items that are applicable to the items that are left in the first box.

## Solution

I would suggest to pass the selected dataItems from listbox 1 in the `Read().Data()` method of listbox 3 when `add` or `remove` events occur and call the `read()` method of the third ListBox:


```
    @(Html.Kendo().ListBox()
        .Name("selectedGeoRegion")
        .Add("changeGeoRegion")
        .Remove("changeGeoRegion"))

    @(Html.Kendo().ListBox()
        .Name("selectedSwarmer")
        .DataSource(source => source
        .Read(read => read.Action("GetSwarmersForRegions", "Swarm")
        .Type(HttpVerbs.Post).Data("getselectedGeoRegions")
    ))

    <script>
        function changeGeoRegion() {
          setTimeout(function () {
               var selectedSwarmerListBox = $("#selectedSwarmer").data("kendoListBox");
               selectedSwarmerListBox.dataSource.read();
          });
        }

        function getselectedGeoRegions() {
            var theGeoRegionListBoxItems = $("#selectedGeoRegion").data("kendoListBox").dataItems();           
            return { RegionsSelected: theGeoRegionListBoxItems.length ? theGeoRegionListBoxItems.toJSON() : []  };
        }
    </script>
```
