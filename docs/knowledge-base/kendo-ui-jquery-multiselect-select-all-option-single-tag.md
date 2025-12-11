---
title: Configuring Select All Option and Single Tag Display in Kendo UI for jQuery MultiSelect
description: Learn how to add a Select All option, align it with other items, and display selected values as a single tag in the Kendo UI for jQuery MultiSelect.
type: how-to
page_title: Adding Select All Option and Displaying Single Tag in Kendo UI MultiSelect
meta_title: Adding Select All Option and Displaying Single Tag in Kendo UI MultiSelect
slug: kendo-ui-jquery-multiselect-select-all-option-single-tag
tags: multiselect, kendo-ui-for-jquery, select-all, headertemplate, tagmode, tagtemplate
res_type: kb
components: ["multiselect"]
ticketid: 1700218
---

## Environment 

<table>
<tbody>
<tr>
<td> Product </td>
<td>
MultiSelect for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.3.1002
</td>
</tr>
</tbody>
</table>

## Description 

I want to configure the Kendo UI for jQuery [MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview) to include a "Select All" option in the dropdown header and align it with other items in the list. Additionally, I want to display selected values as a single tag instead of showing individual tags for each selected item. When all items are selected, the tag should display the text "ALL".

This knowledge base article also answers the following questions:
- How to display selected values as a single tag in Kendo UI MultiSelect?
- How to add a "Select All" option and align it properly in Kendo UI MultiSelect?
- How to customize the tag template for "ALL" in Kendo UI MultiSelect?

## Solution 

### Displaying Selected Values as a Single Tag

Use the [`tagMode`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/tagmode) configuration to display selected values as a single tag with the count of selected items.

```html
<input id="multiselect" />
<script>
  $("#multiselect").kendoMultiSelect({
    tagMode: "single" // Displays a single tag with the count of selected items
  });
</script>
```

### Adding a "Select All" Option

Use the [`headerTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/headertemplate) property to add a "Select All" checkbox at the top of the dropdown. Apply custom styling to ensure it aligns with other options.

```html
<input id="multiselect" />
<script>
  $("#multiselect").kendoMultiSelect({
    dataSource: ["Option1", "Option2", "Option3"],
    headerTemplate: 
      '<div style="padding:4px 8px" class="select-all-header">' +
      '<input type="checkbox" id="selectAll"/> Select All</div>'
  });
</script>
```

Adjust the styles as needed for alignment consistency.

### Customizing the Tag Template

Use the [`tagTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/tagtemplate) property to display "ALL" when all items are selected.

```html
<input id="multiselect" />
<script>
  $("#multiselect").kendoMultiSelect({
    ....
    tagMode: "single",
    tagTemplate: function(data) {
              const widget = $("#FeaturesSelect").data("kendoMultiSelect");
              if (widget) {
                const totalItems = widget.dataSource.data().length;
                const selectedValues = widget.value() || [];
                const selectedCount = selectedValues.length;
                
                // If all items are selected, show "ALL"                
                if (totalItems > 0 && selectedCount === totalItems) {
                  return "ALL";
                }
                
                // For multiple selection, show the count
                if (selectedCount > 0 ) {
                  return `${selectedCount} items selected`;
                }
              }
              
              return "";
            },
  });
</script>
```

### Runnable Example

Refer to the following runnable example to see the combined implementation:  
```dojo

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
      }

      .select-all-header.k-selected {
        background-color: #ff6358;
        color: white;
      }

      .select-all-header {
        transition: background-color 0.2s ease;
      }
    </style>
    <div id="example" role="application">
      <div class="demo-section k-header">
        <select
          id="FeaturesSelect"
          multiple="multiple"
          data-placeholder="Select attendees..."
        >
          <option>Steven White</option>
          <option>Nancy King</option>
          <option>Nancy Davolio</option>
          <option>Robert Davolio</option>
          <option>Michael Leverling</option>
          <option>Andrew Callahan</option>
          <option>Michael Suyama</option>
          <option>Anne King</option>
          <option>Laura Peacock</option>
          <option>Robert Fuller</option>
          <option>Janet White</option>
          <option>Nancy Leverling</option>
          <option>Robert Buchanan</option>
          <option>Margaret Buchanan</option>
          <option>Andrew Fuller</option>
          <option>Anne Davolio</option>
          <option>Andrew Suyama</option>
          <option>Nige Buchanan</option>
          <option>Laura Fuller</option>
        </select>
      </div>
    </div>
    <script>
      $(document).ready(function () {
        const multiSelect = $("#FeaturesSelect")
          .kendoMultiSelect({
            headerTemplate:
              '<div style="padding:4px 8px" class="select-all-header"><input type="checkbox" id="selectAll"/>Select All</div>',
            tagMode: "single",
            autoClose: false,
            itemTemplate: (data) =>
              `<input type='checkbox' class='custom-chb'/> ${data.text}`,
            tagTemplate: function (data) {
              const widget = $("#FeaturesSelect").data("kendoMultiSelect");
              if (widget) {
                const totalItems = widget.dataSource.data().length;
                const selectedValues = widget.value() || [];
                const selectedCount = selectedValues.length;

                // If all items are selected, show "ALL"
                if (totalItems > 0 && selectedCount === totalItems) {
                  return "ALL";
                }

                // For multiple selection, show the count
                if (selectedCount > 0) {
                  return `${selectedCount} items selected`;
                }
              }

              return "";
            },
            dataBound: function () {
              const items = this.ul.find("li");
              setTimeout(() => {
                updateCheckboxes();
              });
            },
            change: function (e) {
              updateCheckboxes();
              updateSelectAllCheckbox();
            },
            select: function (e) {
              // When an item is selected, check its checkbox
              setTimeout(() => {
                const checkbox = $(e.item).find(".custom-chb");
                checkbox.prop("checked", true);
              });
            },
            deselect: function (e) {
              // When an item is deselected, uncheck its checkbox
              setTimeout(() => {
                const checkbox = $(e.item).find(".custom-chb");
                checkbox.prop("checked", false);
                // Also uncheck Select All if any item is deselected
                $("#selectAll").prop("checked", false);
              });
            },
          })
          .data("kendoMultiSelect");

        // Handle Select All checkbox
        $(document).on("change", "#selectAll", function () {
          if ($(this).prop("checked")) {
            selectAll();
          } else {
            multiSelect.value([]);
            updateCheckboxes();
          }
        });

        // Handle individual checkbox clicks
        $(document).on("change", ".custom-chb", function (e) {
          e.stopPropagation();
          const listItem = $(this).closest("li");
          const dataItem = multiSelect.dataItem(listItem);
          const currentValues = multiSelect.value() || [];

          if ($(this).prop("checked")) {
            // Add to selection if not already selected
            if (!currentValues.includes(dataItem.value)) {
              currentValues.push(dataItem.value);
              multiSelect.value(currentValues);
            }
          } else {
            // Remove from selection
            const newValues = currentValues.filter(
              (val) => val !== dataItem.value,
            );
            multiSelect.value(newValues);
            // Uncheck Select All when any individual item is unchecked
            $("#selectAll").prop("checked", false);
          }
        });
      });

      function updateCheckboxes() {
        const multiSelect = $("#FeaturesSelect").data("kendoMultiSelect");
        const selectedValues = multiSelect.value() || [];

        // Update individual checkboxes based on selection
        multiSelect.ul.find("li").each(function () {
          const listItem = $(this);
          const dataItem = multiSelect.dataItem(listItem);
          const checkbox = listItem.find(".custom-chb");
          const isSelected = selectedValues.includes(dataItem.value);
          checkbox.prop("checked", isSelected);
        });
      }

      function updateSelectAllCheckbox() {
        const multiSelect = $("#FeaturesSelect").data("kendoMultiSelect");
        const totalItems = multiSelect.dataSource.data().length;
        const selectedCount = (multiSelect.value() || []).length;
        const isAllSelected = totalItems > 0 && selectedCount === totalItems;

        $("#selectAll").prop("checked", isAllSelected);

        // Add or remove k-selected class to the header
        const selectAllHeader = $(".select-all-header");
        if (isAllSelected) {
          selectAllHeader.addClass("k-selected");
        } else {
          selectAllHeader.removeClass("k-selected");
        }

        // The tagTemplate will handle the display automatically
        // No need to manually refresh tags
      }

      function selectAll() {
        const multiSelect = $("#FeaturesSelect").data("kendoMultiSelect");
        const allValues = multiSelect.dataSource
          .data()
          .map((item) => item.value);
        multiSelect.value(allValues);
        updateCheckboxes();

        // Add k-selected class to header when Select All is checked
        $(".select-all-header").addClass("k-selected");
      }
    </script>
```

## See Also 

- [MultiSelect API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/)
- [How to Add Select All in MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/how-to-add-select-all-multiselect)
- [Select All Values with One Selection](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/select-all-values-with-one-selection)
- [Checkbox Item Template in MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/checkbox-item-template)
