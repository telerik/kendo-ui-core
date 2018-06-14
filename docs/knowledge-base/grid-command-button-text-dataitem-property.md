---
title: Show DataItem Property as Command Button Text
description: An example demonstrating how to display the value of a DataItem's property in a Grid's custom command button
type: how-to
page_title: Show DataItem Property as Text in Grid's Custom Command | Kendo UI Grid
slug: grid-command-button-text-dataitem-property
tags: grid, command, button, custom, text, value, dataitem, property, data, item
ticketid: 1157637
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
	 <td>Product Version</td>
	 <td>2018.2.516</td>
 </tr>
</table>


## Description

I'm working on an application that uses the Kendo UI Grid and would like to add a column, displaying custom command buttons, where their text corresponds to a property of the row's DataItem.

## Solution

The described functionality can be implemented by adding a custom command column and going through every row during the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event in order to change its custom command text.

```html
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

<div id="example">
    <div id="grid"></div>

    <div id="details"></div>

    <script>
        var wnd,
            detailsTemplate;

        $(document).ready(function() {
            var grid = $("#grid").kendoGrid({
                dataSource: {
                    pageSize: 20,
                    data: createRandomData(50)
                },
                pageable: true,
                height: 550,
                dataBound: onDataBound,
                columns: [{
                        field: "FirstName",
                        title: "First Name",
                        width: "140px"
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: "140px"
                    },
                    {
                        field: "Title"
                    },
                    {
                        command: {
                            text: "",
                            click: showDetails,
                            name: "command"
                        },
                        title: " ",
                        width: "180px"
                    }
                ]
            }).data("kendoGrid");

            wnd = $("#details")
                .kendoWindow({
                    title: "Customer Details",
                    modal: true,
                    visible: false,
                    resizable: false,
                    width: 300
                }).data("kendoWindow");

            detailsTemplate = kendo.template($("#template").html());
        });

        function onDataBound(e) {
            var data = this.dataSource.view();
            for (var i = 0; i < data.length; i++) {
                var uid = data[i].uid;
                var row = this.table.find("tr[data-uid='" + uid + "']");

                if (data[i].LastName) {
                    row.find(".k-command-cell").contents().last()[0].textContent = data[i].LastName;
                } else {
                    row.find(".k-command-cell").contents().hide();
                }
            }
        }

        function showDetails(e) {
            e.preventDefault();

            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            wnd.content(detailsTemplate(dataItem));
            wnd.center().open();
        }
    </script>

    <script type="text/x-kendo-template" id="template">
        <div id="details-container">
            <h2>#= FirstName # #= LastName #</h2>
            <em>#= Title #</em>
            <dl>
                <dt>City: #= City #</dt>
                <dt>Birth Date: #= kendo.toString(BirthDate, "MM/dd/yyyy") #</dt>
            </dl>
        </div>
    </script>

    <style type="text/css">
        #details-container {
            padding: 10px;
        }

        #details-container h2 {
            margin: 0;
        }

        #details-container em {
            color: #8c8c8c;
        }

        #details-container dt {
            margin: 0;
            display: inline;
        }
    </style>
</div>
```



## See Also

* [Custom Command Column Grid Demo.](https://demos.telerik.com/kendo-ui/grid/custom-command)
