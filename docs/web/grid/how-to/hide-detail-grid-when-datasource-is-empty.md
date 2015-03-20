---
title: Hide the detail grid and indicator when the DataSource returns empty array
page_title: Hide the detail grid and indicator when the DataSource returns empty array
description: Hide the detail grid and indicator when the DataSource returns empty array
---

# Hide the detail grid and indicator when the DataSource returns empty array

The following runnable sample demonstrates how to hide the detail grid and indicator when the parent dataSource returns an empty array.

#### Example:

```html
            <div id="example">
            <div id="grid"></div>

            <script type="text/x-kendo-template" id="template">
                <div class="tabstrip">
                    <ul>
                        <li class="k-state-active">
                           Orders
                        </li>
                        <li>
                            Contact Information
                        </li>
                    </ul>
                    <div>
                        <div class="orders"></div>
                    </div>
                    <div>
                        <div class='employee-details'>
                            <ul>
                                <li><label>Country:</label>#= Country #</li>
                                <li><label>City:</label>#= City #</li>
                                <li><label>Address:</label>#= Address #</li>
                                <li><label>Home Phone:</label>#= HomePhone #</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </script>
            <script>
                $(document).ready(function() {
                    var element = $("#grid").kendoGrid({
                      dataBound: function(e) {
                            if(this.dataSource.data().length === 0) {
                                var masterRow = this.element.closest("tr.k-detail-row").prev();
                                $("#grid").data("kendoGrid").collapseRow(masterRow);
                                masterRow.find("td.k-hierarchy-cell .k-icon").removeClass();
                            }
                        },
                        dataSource: {
                            type: "odata",
                            transport: {
                                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                            },
                            pageSize: 20,
                            serverPaging: true,
                            serverSorting: true
                        },
                        height: 550,
                        sortable: true,
                        pageable: false,
                        detailTemplate: kendo.template($("#template").html()),
                        detailInit: detailInit,
                        dataBound: function() {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        columns: [
                            {
                                field: "FirstName",
                                title: "First Name",
                                width: "120px"
                            },
                            {
                                field: "LastName",
                                title: "Last Name",
                                width: "120px"
                            },
                            {
                                field: "Country",
                                width: "120px"
                            },
                            {
                                field: "City",
                                width: "120px"
                            },
                            {
                                field: "Title"
                            }
                        ]
                    });
                });

                function detailInit(e) {
                    var detailRow = e.detailRow;

                    detailRow.find(".tabstrip").kendoTabStrip({
                        animation: {
                            open: { effects: "fadeIn" }
                        }
                    });

                    detailRow.find(".orders").kendoGrid({
                        dataSource: {
                            type: "odata",
                            transport: {
                                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 7,
                            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                        },
                        scrollable: false,
                        sortable: true,
                        pageable: true,
                        columns: [
                            { field: "OrderID", title:"ID", width: "70px" },
                            { field: "ShipCountry", title:"Ship Country", width: "110px" },
                            { field: "ShipAddress", title:"Ship Address" },
                            { field: "ShipName", title: "Ship Name", width: "300px" }
                        ]
                    });
                }
            </script>
            <style scoped>
                .k-detail-cell .k-tabstrip .k-content {
                    padding: 0.2em;
                }
                .employee-details ul
                {
                    list-style:none;
                    font-style:italic;
                    margin: 15px;
                    padding: 0;
                }
                .employee-details ul li
                {
                    margin: 0;
                    line-height: 1.7em;
                }

                .employee-details label
                {
                    display:inline-block;
                    width:90px;
                    padding-right: 10px;
                    text-align: right;
                    font-style:normal;
                    font-weight:bold;
                }
            </style>
        </div>
```