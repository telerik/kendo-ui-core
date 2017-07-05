---
title: How To Show and Hide Detail Rows Based on Master Row Value
description: How to disable the detail row based on the checkbox in the master row. Persist expanded rows after Grid refresh.
type: how-to
page_title: Disable Detail Rows With Checkboxes
slug: disable-detail-rows-with-checkboxes 
position: 0
tags: kendo ui, grid, detail template
teampulseid:
ticketid: 1110784
pitsid:
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>

 
## Description

How to show and hide details rows based on the checkbox in the master row. When I change a value all details rows collapse. 

## Possible Solution

Add or remove the master row UID from a global array on every detail row expand/collapse. In the handler function of the `dataBound` event:

1. Based on the checkbox value, disable the expanding button.
1. Expand all master rows from the global array.

```html
<div id="grid"></div>

<script type="text/x-kendo-template" id="template">
    <div class="tabstrip">
        <label>
        Percentage of Marks:
        <input id="percentage" value="#=percentage#" title="percentage" style="width: 100%;" />
      </label>
    </div>
</script>

<script>
    var expandedRows = [];

    $("#grid").kendoGrid({
        columns: [{
                field: "name",
                title: "Name"
            },
            {
                field: "passed",
                title: "Has a master's degree?",
                template: '<input type="checkbox" #= passed ? checked="checked" : "" # class="chkbx"></input>'
            }
        ],
        dataSource: [{
                name: "Jane Doe",
                passed: false,
                percentage: 0.00
            },
            {
                name: "John Doe",
                passed: true,
                percentage: 0.80
            }
        ],
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        detailExpand: detailExpand,
        detailCollapse: detailCollapse,
        dataBound: dataBound
    });

    function detailInit(e) {
        var detailRow = e.detailRow;

        detailRow.find("#percentage").kendoNumericTextBox({
            format: "p0",
            min: 0,
            max: 1,
            step: 0.01,
            change: markChange
        });
    };

    function detailExpand(e) {
        var grid = e.sender;
        var row = e.masterRow[0];
        var dataItem = grid.dataItem(row);
        var uid = dataItem.uid;
        var index = expandedRows.indexOf(uid);

        if (index === -1) {
            expandedRows.push(uid);
        };
    };

    function detailCollapse(e) {
        var grid = e.sender;
        var row = e.masterRow[0];
        var dataItem = grid.dataItem(row);
        var uid = dataItem.uid;
        var index = expandedRows.indexOf(uid);

        if (index != -1) {
            expandedRows.splice(index, 1);
        };
    };

    function dataBound(e) {
        var gride = e.sender;
        var dataSource = this.dataSource;

        this.element.find('tr.k-master-row').each(function() {
            var row = $(this);
            var data = dataSource.getByUid(row.data('uid'));
            if (!data.passed) {
                row.find('.k-hierarchy-cell a').css({
                    opacity: 0.3,
                    cursor: 'default'
                }).click(function(e) {
                    e.stopImmediatePropagation();
                    return false;
                });
            }
        });

        expandedRows.forEach(function(uid) {
            var grid = $("#grid").data("kendoGrid");

            grid.expandRow("tr[data-uid=" + uid + "]");
        });
    };

    function markChange(e) {
        var grid = $("#grid").data("kendoGrid"),
            masterRow = e.sender.element.closest("tr").prev(".k-master-row"),
            dataItem = grid.dataItem(masterRow);

        dataItem.set("percentage", e.sender.value());
    };

    $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("passed", this.checked);
    });
</script>
```
