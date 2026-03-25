---
title: Synchronizing ComboBox and ListBox Filtering and Selection in Kendo UI for jQuery
description: Learn how to use a ComboBox as a quick-search input while keeping a ListBox in sync with filtering and selection.
type: how-to
page_title: How to Sync ComboBox and ListBox Filter and Selection in Kendo UI for jQuery
slug: how-to-sync-combobox-listbox-filter-selection
tags: kendo-ui, jquery, combobox, listbox, datasource, filter, selection, sync
res_type: kb
components: ["combobox", "listbox"]
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® ComboBox for jQuery</td>
</tr>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® ListBox for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

I want to use a [`ComboBox`](/controls/combobox/overview) as a quick-search input to filter data and display the filtered results in a [`ListBox`](/documentation/controls/listbox/overview). Both components should remain synchronized when filtering and selecting items.

This knowledge base article also answers the following questions:
- How can I keep a ComboBox and ListBox synchronized in Kendo UI for jQuery?
- How to share a [`DataSource`](/documentation/framework/datasource/overview) between ComboBox and ListBox?
- How to manually filter a ListBox based on ComboBox input?
- How to sync selection between ComboBox and ListBox?

## Solution

There are two approaches to synchronize a ComboBox with a ListBox: sharing the same DataSource or using separate DataSources with manual filtering.

### Option A: Shared DataSource (Recommended for Simplicity)

When both the ComboBox and ListBox use the same DataSource instance, typing in the ComboBox automatically filters the shared data. This is the simplest approach because the filtering is handled automatically.

```dojo
<div class="k-d-flex k-gap-6">
  <div class="k-w-300">
    <select id="cities"></select>
  </div>

  <div class="k-w-300" style="margin-right: 20px;">
    <select id="citiesList" multiple="multiple"></select>
  </div>
</div>

<script>
  $(document).ready(function () {
    var dataSource = new kendo.data.DataSource({
      data: [
        { CityID: 1, CityName: "Lisboa" },
        { CityID: 2, CityName: "Moscow" },
        { CityID: 3, CityName: "Napoli" },
        { CityID: 4, CityName: "Tokyo" },
        { CityID: 5, CityName: "Oslo" },
        { CityID: 6, CityName: "Paris" },
        { CityID: 7, CityName: "Porto" },
        { CityID: 8, CityName: "Rome" },
        { CityID: 9, CityName: "Berlin" },
        { CityID: 10, CityName: "Nice" },
        { CityID: 11, CityName: "New York" },
        { CityID: 12, CityName: "Sao Paulo" },
        { CityID: 13, CityName: "Rio De Janeiro" },
        { CityID: 14, CityName: "Venice" },
        { CityID: 15, CityName: "Los Angeles" },
        { CityID: 16, CityName: "Madrid" },
        { CityID: 17, CityName: "Barcelona" },
        { CityID: 18, CityName: "Prague" },
        { CityID: 19, CityName: "Mexico City" },
        { CityID: 20, CityName: "Buenos Aires" }
      ],
      sort: { field: "CityName", dir: "asc" }
    });

    var combo = $("#cities").kendoComboBox({
      prefixOptions: { template: () => kendo.ui.icon("map-marker-target") },
      suffixOptions: { template: () => '<button id="suffix-copy-button"></button>' },
      filter: "contains",
      placeholder: "Please select city...",
      dataTextField: "CityName",
      dataValueField: "CityID",
      dataSource: dataSource,
      change: function () {
        var val = this.value();
        listBox.clearSelection();
        if (val) {
          var items = listBox.items();
          items.each(function (idx, el) {
            var dataItem = listBox.dataItem(el);
            if (String(dataItem.CityID) === String(val)) {
              listBox.select(el);
              return false;
            }
          });
        }
      }
    }).data("kendoComboBox");

    var listBox = $("#citiesList").kendoListBox({
      dataSource: dataSource,
      dataTextField: "CityName",
      dataValueField: "CityID",
      selectable: "single",
      change: function () {
        var item = this.dataItem(this.select());
        combo.value(item ? item.CityID : null);
      }
    }).data("kendoListBox");

    $("#suffix-copy-button").kendoButton({
      fillMode: "flat",
      icon: "copy",
      click: function () {
        alert("Copy button clicked");
      }
    });
  });
</script>
```

In this approach:
- Both components share the same DataSource instance
- The ComboBox filter configuration automatically filters the shared DataSource
- The `change` event handlers keep selection synchronized between both components
- No manual filtering logic is required

### Option B: Separate DataSources with Manual Filtering

If you need independent DataSources or want more control over the filtering behavior, you can use separate DataSource instances and manually synchronize the filtering.

```dojo
<div class="k-d-flex k-gap-6">
  <div class="k-w-300">
    <select id="cities"></select>
  </div>

  <div class="k-w-300" style="margin-right: 20px;">
    <select id="citiesList" multiple="multiple"></select>
  </div>
</div>

<script>
  $(document).ready(function () {
    var baseData = [
      { CityID: 1, CityName: "Lisboa" },
      { CityID: 2, CityName: "Moscow" },
      { CityID: 3, CityName: "Napoli" },
      { CityID: 4, CityName: "Tokyo" },
      { CityID: 5, CityName: "Oslo" },
      { CityID: 6, CityName: "Paris" },
      { CityID: 7, CityName: "Porto" },
      { CityID: 8, CityName: "Rome" },
      { CityID: 9, CityName: "Berlin" },
      { CityID: 10, CityName: "Nice" },
      { CityID: 11, CityName: "New York" },
      { CityID: 12, CityName: "Sao Paulo" },
      { CityID: 13, CityName: "Rio De Janeiro" },
      { CityID: 14, CityName: "Venice" },
      { CityID: 15, CityName: "Los Angeles" },
      { CityID: 16, CityName: "Madrid" },
      { CityID: 17, CityName: "Barcelona" },
      { CityID: 18, CityName: "Prague" },
      { CityID: 19, CityName: "Mexico City" },
      { CityID: 20, CityName: "Buenos Aires" }
    ];

    var comboDs = new kendo.data.DataSource({ 
      data: baseData, 
      sort: { field: "CityName", dir: "asc" } 
    });
    
    var listDs = new kendo.data.DataSource({ 
      data: baseData, 
      sort: { field: "CityName", dir: "asc" } 
    });

    var combo = $("#cities").kendoComboBox({
      prefixOptions: { template: () => kendo.ui.icon("map-marker-target") },
      suffixOptions: { template: () => '<button id="suffix-copy-button"></button>' },
      filter: "contains",
      placeholder: "Please select city...",
      dataTextField: "CityName",
      dataValueField: "CityID",
      dataSource: comboDs,
      filtering: function (e) {
        var term = (e.filter && e.filter.value) ? e.filter.value : "";
        if (term) {
          listDs.filter({ field: "CityName", operator: "contains", value: term });
        } else {
          listDs.filter([]);
        }
      },
      change: function () {
        var val = this.value();
        listBox.clearSelection();
        if (val) {
          var items = listBox.items();
          items.each(function (idx, el) {
            var dataItem = listBox.dataItem(el);
            if (String(dataItem.CityID) === String(val)) {
              listBox.select(el);
              return false;
            }
          });
        }
      }
    }).data("kendoComboBox");

    var listBox = $("#citiesList").kendoListBox({
      dataSource: listDs,
      dataTextField: "CityName",
      dataValueField: "CityID",
      selectable: "single",
      change: function () {
        var item = this.dataItem(this.select());
        combo.value(item ? item.CityID : null);
      }
    }).data("kendoListBox");

    $("#suffix-copy-button").kendoButton({
      fillMode: "flat",
      icon: "copy",
      click: function () {
        alert("Copy button clicked");
      }
    });
  });
</script>
```

In this approach:
- Each component has its own DataSource instance
- The ComboBox `filtering` event manually applies the filter to the ListBox DataSource
- Selection synchronization works the same way as Option A
- Provides more control over filtering behavior and data independence

## See Also

- [Kendo UI for jQuery ComboBox Overview](/controls/combobox/overview)
- [Kendo UI for jQuery ListBox Overview](/controls/listbox/overview)
- [ComboBox Filtering Configuration](/api/javascript/ui/combobox/configuration/filter)
- [DataSource Filter Method](/api/javascript/data/datasource/methods/filter)
