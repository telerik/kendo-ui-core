---
title: Applying k-selected Class to Checked Items in Kendo UI for jQuery DropDownTree
description: Learn how to ensure consistent UI behavior by applying the k-selected class to items when checkboxes are checked in Kendo UI for jQuery DropDownTree.
type: how-to
page_title: Ensuring UI Consistency with k-selected Class in Kendo UI for jQuery DropDownTree
slug: applying-k-selected-class-checkbox-dropdown-tree
tags: kendo ui for jquery, dropdown tree, checkbox, ui consistency, k-selected class
res_type: kb
components: ["dropdowntree"]
ticketid: 1689706
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
<td>2025.2.250</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for jQuery DropDownTree](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdowntree/overview), enabling checkboxes may cause visual inconsistencies. Specifically, when a checkbox is checked, the `aria-checked` attribute updates correctly, but the `.k-selected` class does not apply to the corresponding item. Consequently, the item does not visually appear as selected, even though its checkbox is checked.

This knowledge base article also answers the following questions:
- How to make items visually selected when checkboxes are checked in Kendo UI for jQuery DropDownTree?

## Solution

To ensure that the `.k-selected` class is applied to items when their checkboxes are checked, you can manually add or remove the class based on the checkbox state.

### Steps:

1. Attach a [`change`](/api/javascript/ui/dropdowntree/events/change) event listener to the checkboxes within the DropDownTree.
2. Use the event to determine the state of the checkbox (`checked` or `unchecked`).
3. Apply or remove the `.k-selected` class to the corresponding item based on the checkbox's state.

### JavaScript Example

```javascript
$(".k-treeview").on("change", ".k-checkbox", function () {
    var item = $(this)
        .closest(".k-treeview-item")
        .find(".k-treeview-leaf");
    if ($(this).is(":checked")) {
        item.addClass("k-selected"); // Add the class for visual selection
    } else {
        item.removeClass("k-selected"); // Remove the class when unchecked
    }
});
```

This script ensures that when a checkbox is checked, the corresponding item visually appears as selected by applying the `.k-selected` class.

### Example

```dojo
 <label for="dropdowntree">Select one or more items</label>
    <input id="dropdowntree" />
    
    <script>
      $(document).ready(function () {       

        $("#dropdowntree").kendoDropDownTree({
          placeholder: "Select ...",
          checkboxes: true,
          checkAll: true,
          autoClose: false,
          dataSource: [
            {
              text: "Furniture",
              expanded: true,
              items: [
                { text: "Tables & Chairs" },
                { text: "Sofas" },
                { text: "Occasional Furniture" },
              ],
            },
            {
              text: "Decor",
              items: [
                { text: "Bed Linen" },
                { text: "Curtains & Blinds" },
                { text: "Carpets" },
              ],
            },
          ],
        });
        
        
        $(".k-treeview").on("change", ".k-checkbox", function () {
          var item = $(this)
            .closest(".k-treeview-item")
            .find(".k-treeview-leaf");
          if ($(this).is(":checked")) {
            item.addClass("k-selected");
          } else {
            item.removeClass("k-selected");
          }
        });
      });
    </script>

```

## See Also

- [Kendo UI for jQuery DropDownTree Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdowntree/overview)
- [Kendo UI for jQuery DropDownTree API](/api/javascript/ui/dropdowntree)
