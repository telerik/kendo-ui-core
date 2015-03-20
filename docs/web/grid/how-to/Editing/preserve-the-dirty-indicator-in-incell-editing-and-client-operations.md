---
title: Preserve the dirty indicator in incell editing and client operations
page_title: Preserve the dirty indicator in incell editing and client operations
---

# Preserve the dirty indicator in incell editing and client operations

This example demonstrates how to preserve the dirty indicator in incell editing and client operations.

#### Example:

```html
    <div id="grid"></div>
    <script>
        var crudServiceBaseUrl = "http://demos.kendoui.com/service",
        dataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                },
                create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            change: function(e){
                if(e.action == "itemchange"){
                    e.items[0].dirtyFields = e.items[0].dirtyFields || {};
                    e.items[0].dirtyFields[e.field] = true;
                }
            },
            batch: true,
            pageSize: 30,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1, max: 10} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            pageable: true,
            navigatable: true,
            height: 400,
            toolbar: ["create", "save", "cancel"],
            columns: [
                {field: "ProductName", template: "#=dirtyField(data,'ProductName')# #:ProductName#"},
                { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "150px",
                template: "#=dirtyField(data,'UnitPrice')# #:kendo.toString(UnitPrice,'c')#"},
                { field: "UnitsInStock", title: "Units In Stock", width: 150, template: "#=dirtyField(data,'UnitsInStock')# #:UnitsInStock#" },
                { field: "Discontinued", width: 100, template: "#=dirtyField(data,'Discontinued')# #:Discontinued#" },
                { command: "destroy", title: "&nbsp;", width: 110 }],
            editable: true
        });

        function dirtyField(data, fieldName){
            if(data.dirty && data.dirtyFields[fieldName]){
                return "<span class='k-dirty'></span>"
            }
            else{
                return "";
            }
        }
    </script>

```
