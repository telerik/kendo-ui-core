---
title: Troubleshoot When Binding the TreeView to Data
description: An example on how to troubleshoot when you bind the Kendo UI TreeView to data.
type: how-to
page_title: Troubleshoot When Binding to Data | Kendo UI TreeView for jQuery
slug: treeview-bind-to-data-troubleshooting
tags: treeview, troubleshooting
ticketid: 1141952  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeView</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I troubleshoot while I bind the TreeView to data?

## Solution

1. On https://runner.telerik.io/echo, access the `echo` service.
1. To get the result in the corresponding format, send a parameter with the same name as the format in which you want to receive the data back. As a value, provide the actual value that you want to receive.

```dojo
<div id="treeview"></div>
<script>
var data = [{"topicId":8,"topicName":"Child mortality","expanded":true,"indicators":[{"indicatorId":21,"indicatorName":"Postneonatal mortality (PNMR)"},{"indicatorId":26,"indicatorName":"Probability of dying at age 5–14 years"},{"indicatorId":25,"indicatorName":"U5MR annual rate of reduction (ARR)"},{"indicatorId":24,"indicatorName":"Under-five mortality rate (U5MR)"}]},{"topicId":5,"topicName":"Family Planning","expanded":true,"indicators":[{"indicatorId":10,"indicatorName":"Contraceptive prevalence: Any modern method (Number)"},{"indicatorId":2,"indicatorName":"Contraceptive prevalence: Any modern method (Percent)"},{"indicatorId":3,"indicatorName":"Contraceptive prevalence: Any traditional method (Percent)"},{"indicatorId":7,"indicatorName":"Demand for family planning satisfied by any method (Percent)"},{"indicatorId":8,"indicatorName":"Demand for family planning satisfied by any modern method (Percent)"}]},{"topicId":2,"topicName":"Fertility","expanded":true,"indicators":[{"indicatorId":17,"indicatorName":"Fertility rates by age of mother (5-year)"},{"indicatorId":18,"indicatorName":"Mean age of childbearing (5-year)"},{"indicatorId":19,"indicatorName":"Total fertility (5-year)"}]},{"topicId":6,"topicName":"Marital status","expanded":true,"indicators":[{"indicatorId":14,"indicatorName":"Currently married"},{"indicatorId":15,"indicatorName":"Ever married"},{"indicatorId":13,"indicatorName":"Marital status (all categories)"},{"indicatorId":16,"indicatorName":"Singulate mean age at marriage"}]}];    

    var node = kendo.data.Node.define({
        hasChildren: "indicators",
        id: "topicId",
        children: "indicators",

    });
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            //mock server response, see Dojo help for details
            url: "http://runner.telerik.io/echo",
            data: {
              "json" : JSON.stringify(data)
            }
          },
        },
        schema: {
          model: node
        }
    });

    $("#treeview").kendoTreeView({
        dataSource: dataSource,
        checkboxes: {
          checkChildren: true
        },
        loadOnDemand: false,
        expandAll: true,
        dataTextField: [ "topicName", "indicatorName" ]
    });
</script>
```
