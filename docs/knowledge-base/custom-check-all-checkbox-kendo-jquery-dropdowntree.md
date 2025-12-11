---
title: Keeping "Check All" Checkbox Active and Check Only the Visible Nodes in Kendo UI for jQuery DropDownTree 
description: Learn how to keep the "Check All" checkbox visible and functional in the Kendo UI for jQuery DropDownTree when a filter is active, enabling selection of filtered leaf nodes.
type: how-to
page_title: How to Add Custom "Check All" Functionality in Kendo UI for jQuery DropDownTree with Filter
meta_title: Adding Custom "Check All" Checkbox in Kendo UI for jQuery DropDownTree
slug: custom-check-all-checkbox-kendo-jquery-dropdowntree
tags: dropdowntree, kendo ui for jquery, check all, filtering, open, filtering event
res_type: kb
components: ["dropdowntree"]
ticketid: 1701162
---

## Environment

<table>
  <tbody>
    <tr>
      <td>Product</td>
      <td>Kendo UI for jQuery DropDownTree</td>
    </tr>
    <tr>
      <td>Version</td>
      <td>2025.3.1002</td>
    </tr>
  </tbody>
</table>

## Description

I want to keep the "Check All" checkbox visible and functional in the [Kendo UI for jQuery DropDownTree](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdowntree/checkboxes) component even when filtering is applied. The goal is to select all visible leaf nodes based on the filter while excluding non-visible items.

This knowledge base article also answers the following questions:
- How to implement custom "Check All" functionality for filtered items in Kendo UI for jQuery DropDownTree?
- How to make the "Check All" checkbox persist in DropDownTree with filters?
- How to select the filtered leaf nodes in DropDownTree?
- How to check only the visible nodes?

## Solution

To achieve this, create a custom "Check All" checkbox and add it to the DropDownTree popup. Implement logic to check/uncheck visible items filtered in the pop-up.

### Steps

1. **Add Custom Checkbox in the Popup**  
   Use the [`open`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/events/open) event of the DropDownTree to create and add the custom checkbox.

   ```javascript
   open: function (e) {
       setTimeout(() => createCustomCheckbox(e.sender), 50);
   }

   function createCustomCheckbox(ddtree) {
       const customCheckboxHtml = `
           <div class="k-check-all custom-check-all" style="padding: 8px; border-bottom: 1px solid #ddd;">
               <span class="k-checkbox-wrap">
                   <input type="checkbox" id="checkAllCustom" class="k-checkbox-lg k-rounded-md k-checkbox">
                   <label for="checkAllCustom" class="k-checkbox-label" style="margin-left: 4px;">Check All Custom</label>
               </span>
           </div>
       `;

       $(".custom-check-all").remove(); // Remove existing custom checkbox

       const filterElement = ddtree.popup.element.find(".k-list-filter");
       if (filterElement.length > 0) {
           $(customCheckboxHtml).insertAfter(filterElement);
       } else {
           ddtree.popup.element.prepend(customCheckboxHtml);
       }

       $("#checkAllCustom").off("change").on("change", function () {
           handleCustomCheckAll(ddtree, $(this).is(":checked"));
       });
   }
   ```

2. **Handle "Check All" Logic**  
   Implement the logic to select or deselect filtered leaf nodes.

   ```javascript
   function handleCustomCheckAll(ddtree, isChecked) {
       const checkedItems = new Set(); // Track checked items

       ddtree.dataSource.view().forEach(item => {
           if (item.hasChildren) {
               item.items.forEach(child => {
                   if (child.visible) {
                       isChecked? checkedItems.add(child.text) : checkedItems.delete(child.text);
                   }
               });
           } else if (item.visible) {
               isChecked ? checkedItems.add(item.text) : checkedItems.delete(item.text);
           }
       });

       // Update the selection in the DropDownTree
       ddtree.value([...checkedItems]);
   }
   ```

3. **Ensure Checkbox Visibility During Filtering**  
   Use the [`filtering`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/events/filtering) event to re-create the custom checkbox when filtering is applied.

   ```javascript
   filtering: function (e) {
       createCustomCheckbox(e.sender);
   }
   ```

4. **Example**  
  
```dojo

    <input id="dropdowntree" />

    <script>
      // Store checked states to preserve them during filtering
      let checkedStates = new Set();

      // Helper function to find a checkbox in a node
      function findCheckbox(node) {
        let checkbox = node.find("input[type='checkbox']").first();
        if (checkbox.length === 0) {
          checkbox = node.find(".k-checkbox").first();
        }
        return checkbox;
      }

      // Helper function to determine if a node should be included
      function shouldIncludeNode(ddtree, node, dataItem) {
        const filterValue = ddtree.filterInput ? ddtree.filterInput.val() : "";

        // If no filter, only include visible nodes (original behavior)
        if (!filterValue) {
          return node.is(":visible");
        }

        // With filter: include if node matches filter OR if it's a parent node
        const matchesFilter = dataItem.text
          .toLowerCase()
          .includes(filterValue.toLowerCase());
        const isParent = dataItem.items && dataItem.items.length > 0;

        return matchesFilter || isParent;
      }

      // Function to save current checked states
      function saveCheckedStates(ddtree) {
        checkedStates.clear();
        const treeview = ddtree.treeview;
        const checkedNodes = treeview.element.find(
          "input[type='checkbox']:checked",
        );

        checkedNodes.each(function () {
          const node = $(this).closest("li");
          const dataItem = treeview.dataItem(node);
          if (dataItem) {
            checkedStates.add(dataItem.text);
          }
        });
      }

      // Function to handle custom check all functionality
      function handleCustomCheckAll(ddtree, isChecked) {
        const treeview = ddtree.treeview;
        const allNodes = treeview.element.find("li");

        allNodes.each(function () {
          const node = $(this);
          const dataItem = treeview.dataItem(node);

          if (!dataItem || !shouldIncludeNode(ddtree, node, dataItem)) return;

          let checkbox = findCheckbox(node);

          if (checkbox.length > 0 && !dataItem.get("disabled")) {
            checkbox.prop("checked", isChecked);
            node.attr("aria-checked", isChecked);

            // Update stored states
            if (isChecked) {
              checkedStates.add(dataItem.text);
            } else {
              checkedStates.delete(dataItem.text);
            }

            checkbox.trigger("change");
          }
        });

        setTimeout(() => ddtree.trigger("change"), 50);
      }

      // Function to create and insert a custom checkbox
      function createCustomCheckbox(ddtree) {
        const customCheckboxHtml = `
        <div class="k-check-all custom-check-all" style="padding: 8px; border-bottom: 1px solid #ddd;">
          <span class="k-checkbox-wrap">
            <input type="checkbox" id="checkAllCustom" class="k-checkbox-lg k-rounded-md k-checkbox">
            <label for="checkAllCustom" class="k-checkbox-label" style="margin-left: 4px;">Check All Custom</label>
          </span>
        </div>
      `;

        $(".custom-check-all").remove();

        const filterElement = ddtree.popup.element.find(".k-list-filter");
        if (filterElement.length > 0) {
          $(customCheckboxHtml).insertAfter(filterElement);
        } else {
          ddtree.popup.element.prepend(customCheckboxHtml);
        }

        $("#checkAllCustom")
          .off("change")
          .on("change", function () {
            handleCustomCheckAll(ddtree, $(this).is(":checked"));
          });
      }

      $("#dropdowntree").kendoDropDownTree({
        autoClose: false,
        open: function (e) {
          setTimeout(() => createCustomCheckbox(e.sender), 50);
        },

        filtering: function (e) {
          const ddtree = e.sender;
          saveCheckedStates(ddtree);
          setTimeout(() => {
            createCustomCheckbox(ddtree);
          }, 50);
        },

        dataBound: function (e) {
          const ddtree = e.sender;
          setTimeout(() => {
            if ($("#checkAllCustom").length > 0) {
            }
          }, 50);
        },

        check: function (e) {
          const ddtree = e.sender;
          const node = $(e.node);
          const dataItem = ddtree.treeview.dataItem(node);
          const checkbox = findCheckbox(node);
          const isChecked = checkbox.is(":checked");

          if (dataItem) {
            if (isChecked) {
              checkedStates.add(dataItem.text);
            } else {
              checkedStates.delete(dataItem.text);
            }
          }
        },

        dataSource: [
          {
            text: "Bedroom",
            value: "bedroom",
            items: [
              { text: "Queen-size bed", value: "queen-size-bed" },
              { text: "Single bed", value: "single-bed" },
            ],
          },
          {
            text: "Furniture",
            value: "furniture",
            expanded: true,
            items: [
              { text: "Tables & Chairs", value: "tables-chairs" },
              { text: "Sofas", value: "sofas" },
              { text: "Occasional Furniture", value: "occasional-furniture" },
            ],
          },
          {
            text: "Decor",
            value: "decor",
            items: [
              { text: "Bed Linen", value: "bed-linen" },
              { text: "Curtains & Blinds", value: "curtains-blinds" },
              { text: "Carpets", value: "carpets" },
            ],
          },
        ],
        checkboxes: true,
        checkAll: false,
        filter: "contains",
      });
    </script>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
      }

      .custom-check-all {
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .custom-check-all .k-checkbox-wrap {
        display: flex;
        align-items: center;
      }

      .custom-check-all .k-checkbox-label {
        font-weight: 600;
        color: #495057;
        cursor: pointer;
      }

      .custom-check-all:hover {
        background-color: #e9ecef;
      }

      .custom-check-all .k-checkbox {
        margin-right: 8px;
      }
    </style>
```

The provided code demonstrates adding a custom "Check All Custom" checkbox to the DropDownTree that selects visible nodes based on filters. This implementation includes state persistence for selections even after filters are applied or cleared.

## See Also

- [Kendo UI for jQuery DropDownTree Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdowntree/overview)
- [Kendo UI for jQuery DropDownTree Checkboxes](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdowntree/checkboxes)
- [JavaScript API Reference of the DropDownTree](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree)
