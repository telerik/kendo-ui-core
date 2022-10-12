---
title: State Persistence
page_title: jQuery TreeList Documentation - State Persistence
description: "Get started with the jQuery TreeList by Kendo UI and persist the state of the widget."
slug: persiststate_kendoui_treelist_widget
position: 8
---

# State Persistence

The TreeList component enables you to store the custom settings of the user and restore them when the user logs back in at some future moment. This feature is known as state persistence.

To persist the settings that were previously applied to its structure, use the `getOptions` and `setOptions` methods of the TreeList. These methods allow you to serialize the current state of the TreeList if needed and recover that state later. 

The following example demonstrates how to automatically maintain an up-to-date state of the TreeList. Upon a page reload, the stored settings will be provided to the TreeList configuration and will be applied.

```dojo
<ol>
    <li>Change the settings of the TreeList (i.e filter/sort the data or resize/reoder/change the visibility of any columns).</li>
    <li>Reload the page: <button type="button" onclick="reloadPage();">Reload</button></li>
    <li>The widget will be initialized with the settings that were stored.</li>
</ol>
  
<div id="example">
    <div id="treelist"></div>
    <script>
        $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
            var dataSource = new kendo.data.TreeListDataSource({
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                        dataType: "jsonp"
                    }
                },
                batch: true,
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        fields: {
                            EmployeeId: { type: "number", editable: false, nullable: false },
                            ReportsTo: { nullable: true, type: "number" },
                            FirstName: { validation: { required: true } },
                            HireDate: { type: "date" },
                            Phone: { type: "string" },
                            HireDate: { type: "date" },
                            BirthDate: { type: "date" },
                            Extension: { type: "number", validation: { min: 0} },
                            Position: { type: "string" }
                        },
                        expanded: true
                    }
                }
            });

            $("#treelist").kendoTreeList({
                dataSource: dataSource,
                height: 540,
                filterable: true,
                sortable: true,
                reorderable: true,
                resizable: true,
                columnMenu: true,
                columns: [
                    { field: "FirstName", expandable: true, title: "First Name", width: 250 },
                    { field: "LastName", title: "Last Name" },
                    { field: "Position" },
                    { field: "Phone", title: "Phone" },
                    { field: "Extension", title: "Ext", format: "{0:#}", filterable: false }
                ]
            });
                  
            var treeList = $("#treelist").data("kendoTreeList");
        
            var options = localStorage["kendo-treelist-options"];
            if (options) {
                treeList.setOptions(JSON.parse(options)); // Load the stored TreeList options after its initialization
            }
        
            $(window).on( "unload", function(e){
                e.preventDefault();
                localStorage["kendo-treelist-options"] = kendo.stringify(treeList.getOptions()); // Get and store the TreeList settings when navigating away from the page
            });
                 
        });
      
        function reloadPage() {
            location.reload();
        }
    </script>
</div>
```

## See Also

* [State Persistence by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/persist-state)
* [JavaScript API Reference of the TreeList](/api/javascript/ui/treelist)
* [Knowledge Base Section](/knowledge-base)
