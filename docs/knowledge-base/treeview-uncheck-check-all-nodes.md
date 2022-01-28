---
title: Toggle CheckBox Selection for All TreeView Nodes
description: An example on how to programmatically check and uncheck all Kendo UI TreeView checkbox nodes.
type: how-to
page_title: Check or Uncheck All Node CheckBoxes | Kendo UI TreeView for jQuery
slug: treeview-uncheck-check-all-nodes
tags: treeview, uncheck, check, all, nodes
ticketid: 1083489
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeView for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I check and uncheck all checkboxes for all nodes in a Kendo UI TreeView with an external button?  

## Solution

Use the jQuery library and trigger the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/events/change) event.  

```
//Uncheck All Nodes
$("#treeview .k-checkbox-wrapper input").prop("checked", false).trigger("change");

//Check All Nodes
$("#treeview .k-checkbox-wrapper input").prop("checked", true).trigger("change");
```

The following example demonstrates how to implement a **Toggle** button which, depending on the value of the button, will check or uncheck all checkboxes in the TreeView.

```dojo
    <div>
      <input type="button" value="Uncheck" id="checkButton" onclick="toggleCheckAll()" class="k-button" />
      <h4>Check/Uncheck All Nodes</h4>
      <div id="treeview"></div>
    </div>

    <script>
      $("#treeview").kendoTreeView({
        checkboxes: {
          checkChildren: true
        },

        dataSource: [{
          id: 1, text: "My Documents", expanded: true, spriteCssClass: "rootfolder", checked: true, items: [
            {
              id: 2, text: "Kendo UI Project", expanded: true, spriteCssClass: "folder", items: [
                { id: 3, text: "about.html", spriteCssClass: "html" },
                { id: 4, text: "index.html", spriteCssClass: "html" },
                { id: 5, text: "logo.png", spriteCssClass: "image" }
              ]
            },
            {
              id: 6, text: "New Website", expanded: true, spriteCssClass: "folder", items: [
                { id: 7, text: "mockup.jpg", spriteCssClass: "image" },
                { id: 8, text: "Research.pdf", spriteCssClass: "pdf" },
              ]
            },
            {
              id: 9, text: "Reports", expanded: true, spriteCssClass: "folder", items: [
                { id: 10, text: "February.pdf", spriteCssClass: "pdf" },
                { id: 11, text: "March.pdf", spriteCssClass: "pdf" },
                { id: 12, text: "April.pdf", spriteCssClass: "pdf" }
              ]
            }
          ]
        }]
      });

      function toggleCheckAll(){
        var checkButtonValue = $("#checkButton").val();

        if(checkButtonValue == "Uncheck"){
          $("#treeview .k-checkbox-wrapper input").prop("checked", false).trigger("change");
          $("#checkButton").val("Check");
        } else {
          $("#treeview .k-checkbox-wrapper input").prop("checked", true).trigger("change");
          $("#checkButton").val("Uncheck");
        }
      }
    </script>
```

## See Also

* [Kendo UI TreeView Demo on Basic Usage](https://demos.telerik.com/kendo-ui/treeview/checkboxes)
