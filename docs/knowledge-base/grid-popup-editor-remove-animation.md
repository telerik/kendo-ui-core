---
title: Disable Popup Editor Animations
description: An example on how to remove the animation of the popup editor in the Kendo UI Grid.
type: how-to
page_title: Remove Popup Window Animation | Kendo UI Grid
slug: grid-popup-editor-remove-animation
tags: grid, popup, editor, animation
ticketid: 1135955
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I remove the opening and closing animations of the popup editor window in the Grid?

## Solution

Override the default animation configuration of the Window.

```
$.fn.kendoWindow.widget.prototype.options.animation = false;
```

```dojo
<script>
    $.fn.kendoWindow.widget.prototype.options.animation = false;
</script>
<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
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
                                return {
                                    models: kendo.stringify(options.models)
                                };
                            }
                        }
                    },
                    batch: true,
                    pageSize: 20,
                    schema: {
                        model: {
                            id: "ProductID",
                            fields: {
                                ProductID: {
                                    editable: false,
                                    nullable: true
                                },
                                ProductName: {
                                    validation: {
                                        required: true
                                    }
                                },
                                UnitPrice: {
                                    type: "number",
                                    validation: {
                                        required: true,
                                        min: 1
                                    }
                                },
                                Discontinued: {
                                    type: "boolean"
                                },
                                UnitsInStock: {
                                    type: "number",
                                    validation: {
                                        min: 0,
                                        required: true
                                    }
                                }
                            }
                        }
                    }
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                toolbar: ["create"],
                columns: [{
                        field: "ProductName",
                        title: "Product Name"
                    },
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}",
                        width: "120px"
                    },
                    {
                        field: "UnitsInStock",
                        title: "Units In Stock",
                        width: "120px"
                    },
                    {
                        field: "Discontinued",
                        width: "120px",
                        editor: customBoolEditor
                    },
                    {
                        command: ["edit", "destroy"],
                        title: "&nbsp;",
                        width: "250px"
                    }
                ],
                editable: "popup"
            });
        });

        function customBoolEditor(container, options) {
            var guid = kendo.guid();
            $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
            $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
        }
    </script>
</div>
```
