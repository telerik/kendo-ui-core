---
title: Handling Keyboard Navigation for Bidirectional Kendo UI for jQuery ListBox
description: Learn how to handle keyboard navigation for bidirectional Kendo UI for jQuery ListBox when transferring items between connected ListBoxes.
type: how-to
page_title: Keyboard Navigation for Bidirectional Kendo UI ListBox
meta_title: Keyboard Navigation for Bidirectional Kendo UI ListBox
slug: keyboard-navigation-bidirectional-kendo-listbox
tags: listbox, kendo ui for jquery, keyboard navigation, connectwith
res_type: kb
ticketid: 1713788
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery ListBox</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.415</td>
</tr>
</tbody>
</table>

## Description

When using a [Kendo UI for jQuery ListBox](https://www.telerik.com/kendo-jquery-ui/documentation/controls/listbox/overview) with the `connectWith` property to create a bidirectional connection between two ListBoxes, the default behavior of transfer actions and keyboard shortcuts becomes non-deterministic. For example, the `Ctrl + Left` key combination does not move items back to the first ListBox from the second ListBox. This occurs because the transfer commands are directional relative to the active widget, not the visual layout. Custom handling is needed to implement the desired functionality.

This knowledge base article also answers the following questions:
- How to handle keyboard navigation in connected Kendo UI ListBoxes?
- Why does Ctrl + Left not work as expected in a bidirectional Kendo UI ListBox?
- How to move items back to the first list using keyboard navigation in Kendo UI ListBox?

## Solution

To enable `Ctrl + Left` functionality for moving items back to the first ListBox from the second ListBox, add a custom keydown event listener. Follow these steps:

1. Retrieve the instance of the second ListBox using `kendoListBox`.
2. Attach a `keydown` event listener to the second ListBox's `ul.k-list-ul` element.
3. Detect the `Ctrl + Left` key combination and trigger the `transferTo` command.
4. Optionally, ensure the focus remains on the next available item in the second ListBox.

### Example Code

Here is the implementation for the above solution:

```javascript
var listBoxBWidget = $("#listBoxB").data("kendoListBox");

listBoxBWidget.wrapper.find("ul.k-list-ul")[0].addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === 'ArrowLeft') {
        // Trigger transferTo action
        listBoxBWidget.wrapper.find('[data-command="transferTo"]').trigger("click");

        // Optionally focus the next available item
        var ul = listBoxBWidget.wrapper.find("ul.k-list-ul");
        var nextItem = listBoxBWidget.select().closest("li").next("li.k-list-item");
        
        if (nextItem.length) {
            listBoxBWidget.select(nextItem);
            ul.focus();
        } else {
            // Focus the first item if none are available after the current one
            var firstItem = ul.find("li.k-list-item").first();
            if (firstItem.length) {
                listBoxBWidget.select(firstItem);
                ul.focus();
            }
        }
    }
}, true);
```

### Working Example

You can explore the complete implementation in this example:

```dojo
<select id="listBoxA">
      <option>ItemA1</option>
      <option>ItemA2</option>
    </select>
    <select id="listBoxB">
      <option>ItemB1</option>
      <option>ItemB2</option>
    </select>

    <script>
      $("#listBoxA").kendoListBox({
        connectWith: "listBoxB",
        toolbar: {
          tools: [
            "transferTo",
            "transferFrom",
            "transferAllTo",
            "transferAllFrom",
          ],
        },
        navigatable: true,
      });

      $("#listBoxB").kendoListBox({
        connectWith: "listBoxA",
        toolbar: {
          tools: [
            "transferTo",
            "transferFrom",
            "transferAllTo",
            "transferAllFrom",
          ],
        },
        navigatable: true,
      });

      var listBoxBWidget = $("#listBoxB").data("kendoListBox");
      listBoxBWidget.wrapper.find("ul.k-list-ul")[0].addEventListener(
        "keydown",
        function (e) {
          if (e.ctrlKey && e.key === 'ArrowLeft') {
            e.stopImmediatePropagation();
            e.preventDefault();
            var ul = listBoxBWidget.wrapper.find("ul.k-list-ul");
            var nextItem = listBoxBWidget
              .select()
              .closest("li")
              .next("li.k-list-item");
            listBoxBWidget.wrapper
              .find('[data-command="transferTo"]')
              .trigger("click");
            if (nextItem.length) {
              listBoxBWidget.select(nextItem);
              ul.focus();
            } else {
              var firstItem = ul.find("li.k-list-item").first();
              if (firstItem.length) {
                listBoxBWidget.select(firstItem);
                ul.focus();
              }
            }
          }
        },
        true,
      );
    </script>
```

## See Also

- [Kendo UI for jQuery ListBox Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/listbox/overview)
- [ListBox connectWith API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/configuration/connectwith)
