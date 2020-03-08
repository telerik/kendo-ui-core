---
title: Format Server Response with ServerGrouping in Grid
description: An example on how to format a server response with serverGrouping in the Kendo UI Grid.
type: how-to
page_title: Format the Response with ServerGrouping | Kendo UI Grid for jQuery
slug: grid-format-of-the-response-with-server-grouping
tags: grid, server, grouping
ticketid: 1138311
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>62.0.3202.75</td>
 </tr> <tr>
  <td>Made with Version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I format the server response when `serverGrouping` in the Grid is set to `true`?

## Solution

Parse the server response and group the Grid.

To view the expected format, refer to [this demo](https://docs.telerik.com/kendo-ui/framework/datasource/basic-usage#server-grouping).

````dojo
   <div id="grid"></div>
    <script>
      $(document).ready(function() {

        $("#grid").kendoGrid({
          dataSource: {
            transport: {
              read: function(options) {
                var response = {};
                response.group = [{
                  field: "companyName",
                  value: "the name of company",
                  items: [{
                    id: "1",
                    contractName: "name of contract",
                    companyName: "the name of company"
                  },{
                    id: "2",
                    contractName: "name of contract number 2",
                    companyName: "the name of company"
                  },{
                    id: "3",
                    contractName: "name of contract number 3",
                    companyName: "the name of company"
                  }],
                  hasSubgroups: false,
                  aggregates: []
                }];

                response.data = [{
                  id: "1",
                  contractName: "name of contract",
                  companyName: "the name of company"
                },{
                  id: "2",
                  contractName: "name of contract number 2",
                  companyName: "the name of company"
                },
                                 {
                                   id: "3",
                                   contractName: "name of contract number 3",
                                   companyName: "the name of company"
                                 }
                                ]
                response.total = 3
                options.success(response);
              }
            },
            pageSize: 100,
            serverPaging: true,
            serverSorting: true,
            serverGrouping: true,
            serverAggregates: true,
            group: {
              field: "companyName"
            },
            schema: {
              data: function(e) {
                return e.data;
              },
              groups: function(e) {
                return e.group;
              },
              total: function(e) {
                return e.total;
              },
              parse: function(response) {
                //Data group

                var groups = response.group;
                var contractGroup = [];
                for(var i = 0; i < groups.length; i++) {
                  var group = groups[i];
                  var items = group.items;
                  var contracts = [];
                  for(var j = 0; j < items.length; j++) {
                    var item = items[j];
                    var contract = {
                      id: item.id,
                      contractName: item.contractName,
                      companyName: item.companyName
                    }
                    contracts.push(contract);
                  }
                  group.items = contracts;
                  contractGroup.push(group);
                }
                response.group = contractGroup;
                //Data group end

                //Data default
                var datas = response.data;
                var contracts = [];
                for(var i = 0; i < datas.length; i++) {
                  var data = datas[i];
                  var contract = {
                    id: data.id,
                    contractName: data.contractName,
                    companyName: data.companyName
                  }
                  contracts.push(contract);
                }
                response.data = contracts;
                //Data default end
                return response;
              },
              model: {
                id: "id",
                fields: {
                  costCodeName: { type: "string" },
                  contractName: { type: "string" },
                  companyName: { type: "string" },
                }
              }
            },
          },       
          height: 780,
          scrollable: true,
          sortable: false,
          pageable: true,
        });
      })
    </script>
````
