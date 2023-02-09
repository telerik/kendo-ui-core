---
title: Skip noneditable Grid columns when using keyboard navigation
description: An example demonstrating how to skip over noneditable grid cells when the Tab key is used to navigate them.
type: how-to
page_title: Skip noneditable columns when using keyboard navigation - Kendo UI Grid for jQuery
slug: grid-tabkey-navigation-exclude-noneditable-columns
tags: grid, keyboard, navigation, editable, cell, skip, tab, tabkey
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.616</td>
 </tr>
</table>

## Description

How can I skip noneditable Grid columns when I use the `Tab` key to navigate the cells?

## Solution

Utilize the Grid's [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/navigate) event and programmatically skip the noneditable columns.

1. Apply a custom class to the noneditable columns through the [columns.attributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.attributes) configuration.
1. In the `navigate` event, check if the current cell is editable and if the `Tab` key has been pressed.
1. Check if the `Shift` key has been pressed. This tells you if the user is navigating backwards or not.
1. Loop through the next/previous cells until you reach an editable column.
1. Select the editable cell and trigger the navigate event again.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    data: createRandomData(50),
                    pageSize: 10,
                    schema: {
                        model: {
                            id: "Id",
                            fields: {
                                FirstName: { type: "string" },
                                LastName: { type: "string" },
                                City: { type: "string" },
                                Age: { type: "number" },
                                BirthDate: { type: "date" }
                            }
                        }
                    }
                },
                selectable: "multiple row",
                navigatable: true,
              	editable: true,
                filterable: true,
                sortable: true,
                pageable: true,
                reorderable: true,
                groupable: true,
              	navigate: onNavigate,
                columns: [ {
                        field: "FirstName",
                        width: 120,
                        title: "First Name",
                  editable: () => {return false;},
                      	attributes: {
                          class: "non-editable-column"
                        }
                    } , {
                        field: "LastName",
                        width: 120,
                        title: "Last Name"
                    } , {
                        width: 120,
                        field: "City",
                      	editable: () => {return false;},
                      	attributes: {
                          class: "non-editable-column"
                        }
                    } , {
                        field: "BirthDate",
                        title: "Birth Date",
                        template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
                    } , {
                        width: 80,
                        field: "Age",
                      editable: () => {return false;},
                      	attributes: {
                          class: "non-editable-column"
                        }
                    }
                ]
            });

            $(document.body).keydown(function(e) {
                if (e.altKey && e.keyCode == 87) {
                    $("#grid").data("kendoGrid").table.focus();
                }
            });
          
          	function onNavigate(e) {
              let grid = e.sender;
              let isNotEditable = e.element.hasClass("non-editable-column");
              let cell = e.element;
              let row = e.element.closest("tr");
              
              let tabKeyPressed = event.which === 9 ? true : false;
              
              if(isNotEditable && tabKeyPressed) {
                // Check if the user navigates backwards with shift+tab.
                if(event.shiftKey) {
                  // Keep looping until the code finds an editable cell.
                  while(cell.hasClass("non-editable-column")) {
                    // Repeat if the previous cell is not editable.
              			cell = cell.prev();
                    
                    // When the code reaches the beginning of the row, move to the previous row.
                    if(!cell.length) {
                      row = row.prev();
                      cell = row.find("td:last")
                    }
                  }
                } else {
                  // Keep looping until the code finds an editable cell.
                 	while(cell.hasClass("non-editable-column")) {
                    // Repeat if the next cell is not editable.
                    cell = cell.next();
                    
                    // When the code reaches the end of the row, move to the next row.
                    if(!cell.length) {
                      row = row.next();
                      cell = row.find("td:first")
                    }
                  }
                }
                
                // Set the currently focused item to the next/previous editable cell.
                grid.current(cell);
                // Trigger the navigate event.
                grid.trigger("navigate", {
                   element: cell
                });
              }
            }
        });
    </script>
```