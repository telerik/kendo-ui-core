---
title: Virtualize ComboBox with MVVM
description: An example on how to implement virtualization for the Kendo UI ComboBox in MVVM projects.
type: how-to
page_title: Implement Virtualization for MVVM ComboBox | Kendo UI ComboBox
previous_url: /knowledge-base/how-to-virtualize-mvvm-combobox
slug: virtualize-mvvm-combobox
tags: kendoui, kendo, kendo, kendoui, combobox, mvvm, virtualization
ticketid: 1121707
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MVVM</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I implement virtualization for the ComboBox in an MVVM-binding scenario?

## Solution

Specify the `itemHeight` and the `valueMapper` in the `data-virtual` attribute of the ComboBox.

``` html

<div id="example">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
                data-role="combobox"
                data-bind="value: order, source: source"
                data-text-field="ShipName"
                data-value-field="OrderID"
                data-filter="contains"
                data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
                data-height="520"/>
</div>
<script>
$(document).ready(function() {
        var model = kendo.observable({
        source: new kendo.data.DataSource({
                type: "odata",
                transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                        model: {
                        fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                                }
                        }
                },
                pageSize: 80,
                serverPaging: true,
                serverFiltering: true
                })
        });

        kendo.bind($(document.body), model);
});

function orderValueMapper(options) {
        $.ajax({
                url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                type: "GET",
                dataType: "jsonp",
                data: convertValues(options.value),
                success: function (data) {
                options.success(data);
                }
        })
}

function convertValues(value) {
        var data = {};

        value = $.isArray(value) ? value : [value];

        for (var idx = 0; idx < value.length; idx++) {
        data["values[" + idx + "]"] = value[idx];
        }

        return data;
}
</script>
```

## See Also

* [Virtualization of the ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/virtualization#data-and-ui-virtualization)
