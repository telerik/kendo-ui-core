---
title: Get Data Index in the ListBox on Add
description: An example on how to get the index of the newly added item in the ListBox.
type: how-to
page_title: Get the Index of an Item on Add | Kendo UI ListBox for jQuery
slug: listbox-get-index-of-item-on-add
tags: listbox, datasource
ticketid: 1140370
res_type: how-to
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Chrome</td>
 </tr>
 <tr>
 <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>

 
## Description

How can I easily retrieve the index of each data item when addiing to the ListBox? 

## Suggested Workarounds

The ListBox does not provide a built-in solution for achieving this behavior but there is a logged [enhancement issue](https://github.com/telerik/kendo-ui-core/issues/3777). 

The [`add`](/api/javascript/ui/listbox/events/add) event does not provide the index of the added item but we can get to it using the Kendo UI ListBox API. The item which is about to be added is already present in the receiving widget's `items()` collection. To identify it, we can look for the item with class "k-ghost":

```dojo
    <link rel="stylesheet" href="https://demos.telerik.com/kendo-ui/content/shared/styles/examples-offline.css">
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/console.min.js"></script>
    <div id="example" role="application">
        <div class="demo-section k-content wide">
            <div>
                <select id="optional"></select>
                <select id="selected"></select>
            </div>
        </div>
        <div class="demo-section k-content wide">
            <h4>Console log</h4>
            <div class="console"></div>
        </div>
        <script>
            $(document).ready(function () {

              function onAdd(e) {
                console.log(e)
                var items = e.sender.items();
    			var index= 0;
                if(items.length){
                  items.each(function(idx,item){
                    if($(item).hasClass("k-ghost")){
                      index = idx;
                      return;
                    } 
                  });
                }
                kendoConsole.log("add : " + getWidgetName(e) + " : " + e.dataItems.length + " item(s) at index " + index);
              }


                function getWidgetName(e) {
                    var listBoxId = e.sender.element.attr("id");
                    var widgetName = listBoxId === "optional" ? "left widget" : "right widget";
                    return widgetName;
                }

                $("#optional").kendoListBox({
                    connectWith: "selected",
                    draggable: true,
                    dropSources: ["selected"],
                    selectable: "multiple",
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                        }
                    },
                    dataTextField: "ContactName",
                    dataValueField: "CustomerID"
                });

                $("#selected").kendoListBox({
                    connectWith: "optional",
                    draggable: {
                        placeholder: function (element) {
                            return element.clone().css({
                                "opacity": 0.3,
                                "border": "1px dashed #000000"
                            });
                        }
                    },
                    dropSources: ["optional"],
                    selectable: "multiple",
                    dataTextField: "ContactName",
                    dataValueField: "CustomerID",
                    toolbar: {
                        position: "right",
                        tools: ["moveUp", "moveDown", "remove"]
                    },
                   add: onAdd
                });
            });
        </script>
    </div>

    <style>
        #example .demo-section {
            max-width: none;
            width: 580px;
        }

        #example .k-listbox {
            width: 285px;
            height: 310px;
        }

            #example .k-listbox:first-of-type {
                margin-right: 1px;
            }
    </style>

```

## See also

[Get Data Index in the ListBox after Reordering]({% slug get-index-of-item-in-listbox-after-reorder %})
