---
title: Prevent Grid Filter Menu from Closing on Browser Scroll
description: An example on how to prevent the Kendo UI Grid filter menu from closing when the browser scrolls.
type: how-to
page_title: Prevent Closing the Filter Popup on Browser Scroll | Kendo UI Grid for jQuery
slug: grid-filter-menu-prevent-close-browser-scroll
tags: grid, filtering, menu, popup, prevent, close, scroll
ticketid: 1147708
res_type: kb
component: grid
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I prevent the filter popup from closing when the user scrolls the page of the Grid?

## Solution

1. Handle the [`scroll`](https://api.jquery.com/scroll/) event of the `window`.
1. In the event handler, set a global variable to `true`.
1. In the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event handler of the Grid, bind the [`close`](https://docs.telerik.com/kendo-ui/api/javascript/ui/popup/events/close) event to the Popup widget.
1. Based on the global variable, prevent the default behavior in the `close` event handler.

```dojo
<div class="wrapper">
    <div id="client"></div>
</div>
<style>
    .wrapper {
        height: 1200px;
    }
</style>
<script>
    var scroll = false;
    $(document).ready(function() {
        var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
        $("#client").kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        url: telerikWebServiceBase + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: telerikWebServiceBase + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: telerikWebServiceBase + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: telerikWebServiceBase + "/Products/Create",
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
            },
            filterMenuInit: function(e) {
                if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
                    var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                    filterMultiCheck.container.empty();
                    filterMultiCheck.checkSource.sort({
                        field: e.field,
                        dir: "asc"
                    });

                    filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                    filterMultiCheck.createCheckBoxes();

                    var popup = $(e.container[0]).data("kendoPopup");
                    popup.bind("close", function(e) {
                        if (scroll) {
                            e.preventDefault(); //prevent popup closing                    
                        }
                    });
                }
            },
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [{
                    field: "ProductName",
                    filterable: {
                        multi: true
                    }
                },
                {
                    field: "UnitPrice",
                    title: "Unit Price",
                    format: "{0:c}",
                    width: 120,
                    filterable: {
                        multi: true
                    }
                },
                {
                    field: "UnitsInStock",
                    title: "Units In Stock",
                    width: 120,
                    filterable: {
                        multi: true
                    }
                },
                {
                    field: "Discontinued",
                    width: 120,
                    filterable: {
                        multi: true,
                        dataSource: [{
                            Discontinued: true
                        }, {
                            Discontinued: false
                        }]
                    }
                },
                {
                    command: "destroy",
                    title: "&nbsp;",
                    width: 150
                }
            ],
            editable: true
        });

        $(window).scroll(function() {
            scroll = true;
            setTimeout(function(e) {
                scroll = false;
            });
        });
    });
</script>
```
