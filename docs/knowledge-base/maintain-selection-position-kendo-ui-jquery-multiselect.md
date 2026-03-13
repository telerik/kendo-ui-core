---
title: Keeping Selection Position in Kendo UI for jQuery MultiSelect
description: Learn how to keep the selection position in the Kendo UI for jQuery MultiSelect when selecting items in a long list.
type: how-to
page_title: Maintain Selection Position in Kendo UI for jQuery MultiSelect
meta_title: Maintain Selection Position in Kendo UI for jQuery MultiSelect
slug: maintain-selection-position-kendo-ui-jquery-multiselect
tags: multiselect, kendo ui for jquery, change event, scroll position, customization
res_type: kb
ticketid: 1709803
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery MultiSelect</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for jQuery MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview), the dropdown scrolls to the most recently selected item by default. However, if custom logic is implemented in the [`change`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/events/change) event to clear the filter text, it disrupts this behavior and causes the list to scroll to the top. This article explains how to clear the filter text while maintaining the selection position.

This knowledge base article also answers the following questions:

- How to keep the scroll position in Kendo UI for jQuery MultiSelect?
- How to clear filter text and maintain dropdown position in Kendo UI MultiSelect?
- How to prevent the dropdown list from resetting its scroll position in Kendo UI MultiSelect?

## Solution

To achieve the desired behavior, implement a customized logic in the [`change`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/events/change) event handler combined with a helper function to scroll to the last selected item. Follow these steps:

1. Add the `change` event handler to clear the filter text and manage the scroll position.

```javascript
change: function (e) {
    var multiselect = this;
    var selectedValues = multiselect.dataItems();
    var latestValue = selectedValues[selectedValues.length - 1].sportName; // Adjust field name

    // Clear filter
    multiselect.input.val("");
    multiselect.search("");

    // Wait for list to refresh
    setTimeout(function () {
        scrollToValue(multiselect, latestValue);
    });
}
```

2. Define the `scrollToValue` function to locate and scroll to the last selected item.

```javascript
function scrollToValue(multiselect, value) {
    var list = multiselect.ul;
    var item = list.children("li").filter(function () {
        return $(this).find(".k-list-item-text").text() == value;
    });

    if (item.length) {
        var container = list.closest(".k-list-content, .k-list-scroller, .k-virtual-content");
        var li = list.children().eq(item.index());

        container.scrollTop(li.position().top + container.scrollTop());
    }
}
```

3. Apply the above logic to your MultiSelect initialization.

```javascript
$('#assettype_filter').kendoMultiSelect({
    dataTextField: 'text',
    dataValueField: 'id',
    placeholder: 'Asset Type',
    autoClose: false,
    width: '100%',
    filter: "contains",
    noDataTemplate: $("#noDataTemplate").html(),
    change: function (e) {
        var multiselect = this;
        var selectedValues = multiselect.dataItems();
        var latestValue = selectedValues[selectedValues.length - 1].text; // Adjust field name

        multiselect.input.val("");
        multiselect.search("");

        setTimeout(function () {
            scrollToValue(multiselect, latestValue);
        });
    }
});

function scrollToValue(multiselect, value) {
    var list = multiselect.ul;
    var item = list.children("li").filter(function () {
        return $(this).find(".k-list-item-text").text() == value;
    });

    if (item.length) {
        var container = list.closest(".k-list-content, .k-list-scroller, .k-virtual-content");
        var li = list.children().eq(item.index());

        container.scrollTop(li.position().top + container.scrollTop());
    }
}
```

Below is a runnable example with the above implemented.
```dojo
   <script id="noDataTemplate" type="text/x-kendo-tmpl">
      <div class="kd-nodata-wrapper">
      	# var value = instance.input.val(); #
      	# var id = instance.element[0].id; #
      	<div>
      	    No data found. Do you want to add new item - '#: value #' ?
      	</div>
      	<br />
      	<button class="k-button" onclick="addNew('#: id #', '#: value #')" ontouchend="addNew('#: id #', '#: value #')">Add new item</button>
         <div>
    </script>

    <select id="multiselect"></select>

    <script>
      function addNew(widgetId, value) {
        var widget = $("#" + widgetId).getKendoMultiSelect();
        var dataSource = widget.dataSource;
        console.log(dataSource.length);

        if (confirm("Are you sure?")) {
          dataSource.add({
            Id: dataSource.data().length + 1,
            sportName: value,
          });

          var currentValue = widget.value();
          currentValue.push(dataSource.data().length);
          widget.value(currentValue);
          widget.trigger("change");
        }
      }

      $(document).ready(function () {
        // create MultiSelect from input HTML element
        var dataSource = new kendo.data.DataSource({
          data: [
            { Id: 1, sportName: "Basketball" },
            { Id: 2, sportName: "Golf" },
            { Id: 3, sportName: "Baseball" },
            { Id: 4, sportName: "Table Tennis" },
            { Id: 5, sportName: "Volleyball" },
            { Id: 6, sportName: "Football" },
            { Id: 7, sportName: "Boxing" },
            { Id: 8, sportName: "Badminton" },
            { Id: 9, sportName: "Cycling" },
            { Id: 10, sportName: "Gymnastics" },
            { Id: 11, sportName: "Swimming" },
            { Id: 12, sportName: "Wrestling" },
            { Id: 13, sportName: "Snooker" },
            { Id: 14, sportName: "Skiing" },
            { Id: 15, sportName: "Handball" },
          ],
          sort: { field: "sportName", dir: "asc" },
        });

        $("#multiselect").kendoMultiSelect({
          dataTextField: "sportName",
          dataValueField: "Id",
          dataSource: dataSource,
          placeholder: "Asset Type",
          autoClose: false,
          width: "100%",
          filter: "contains",
          placeholder: "Please select Asset Type",
          downArrow: true,
          noDataTemplate: $("#noDataTemplate").html(),
          change: function (e) {
            var multiselect = this;
            var selectedValues = multiselect.dataItems();
            var latestValue =
              selectedValues[selectedValues.length - 1].sportName;

            // Clear filter
            multiselect.input.val("");
            multiselect.search("");

            // Wait for list to refresh
            setTimeout(function () {
              scrollToValue(multiselect, latestValue);
            });
          },
        });
      });

      function scrollToValue(multiselect, value) {
        // Get the <ul> element that renders the items inside the popup
        var list = multiselect.ul;

        // Find the <li> whose inner .k-list-item-text matches the provided value
        var item = list.children("li").filter(function () {
          return $(this).find(".k-list-item-text").text() == value;
        });

        // Get the index of the found item within all <li> elements
        var index = item.index();

        if (item.length) {
          var ul = list;

          // Identify the scrollable container (depends on Kendo theme/version)
          // Could be: .k-list-content, .k-list-scroller, or .k-virtual-content
          var container = ul.closest(
            ".k-list-content, .k-list-scroller, .k-virtual-content",
          );

          // Get the <li> at the found index (same as `item`, but ensures correctness)
          var li = ul.children().eq(index);

          // Adjust the container scroll so the item becomes visible:
          // scrollTop = currentScrollTop + item's relative vertical position
          container.scrollTop(li.position().top + container.scrollTop());
        }
      }
    </script>
```

## See Also

- [Kendo UI for jQuery MultiSelect Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview)
- [MultiSelect Configuration API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect#configuration)
- [Handling Events in Kendo UI for jQuery MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect#events)
