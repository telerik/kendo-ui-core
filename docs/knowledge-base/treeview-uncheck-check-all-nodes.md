---
title: Toggle CheckBox Selection for All TreeView Nodes 
description: An example demonstrating how to check/uncheck all Kendo UI TreeView checkbox nodes programmatically
type: how-to
page_title: Check/Uncheck all Node CheckBoxes | Kendo UI TreeView
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

Selecting and deselecting all checkboxes can be accomplished using jQuery followed by triggering the [Change event](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/events/change):  
```
//Uncheck All Nodes
$("#treeview .k-checkbox-wrapper input").prop("checked", false).trigger("change");

//Check All Nodes
$("#treeview .k-checkbox-wrapper input").prop("checked", true).trigger("change");
```

The following demonstrates a Kendo UI TreeView with a Toggle Button which will check or uncheck all checkboxes depending on the value of the button.

```html
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
              id: 6, text: "New Web Site", expanded: true, spriteCssClass: "folder", items: [
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

* [Kendo TreeView - Basic Usage Demo](https://demos.telerik.com/kendo-ui/treeview/checkboxes)
