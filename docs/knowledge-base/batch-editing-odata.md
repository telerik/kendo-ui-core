---
title: Implement Batch Editing with OData
page_title: Apply Batch Editing with OData | Kendo UI Grid for jQuery
description: "An example on how to implement batch editing when binding the Kendo UI Grid for jQuery to an OData service."
previous_url: /controls/data-management/grid/how-to/Editing/batch-editing-odata
slug: howto_batch_editing_odata_grid
tags: grid, batch, editing, odata
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use the batch edit mode of the Kendo UI Grid when binding to oData?

## Solution

Use a third-party library. To submit the actual request, the following example uses [Batch.js library by Pavel Volgarev](https://github.com/volpav/batchjs). For more information, refer to [Batch Processing](http://www.odata.org/documentation/odata-version-3-0/batch-processing/) in the oData 3.0 documentation.

> The scenario uses an experimental `transport.submit` Data Source option. It is not yet included as an officially supported API call.

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        // The methods below create an entry in the requests array for the given operation
        function queueCreated(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers",
              type: "POST",
              data: items[i]
            });

            // Assign temporary IDs as placeholders
            items[i].ContactID = kendo.guid();
          }
        }

        function queueUpdated(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers/" +
              items[i].CustomerID,
              type: "PUT",
              data: items[i]
            });
          }
        }

        function queueDestroyed(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers/" +
              items[i].CustomerID,
              type: "DELETE"
            });
          }
        }

        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            batch: true,
            transport: {
              // Not an official feature, but it's close to being one.
              submit: function(e) {
                var requests = [];

                // Get all batched operations in e.data.
                queueCreated(requests, e.data.created);
                queueUpdated(requests, e.data.updated);
                queueDestroyed(requests, e.data.destroyed);

                // Check out the network tab on "Save Changes".
                $.ajaxBatch({
                  // Note that this service doesn't actually support batching.
                  url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Batch",
                  data: requests
                })
                  .done(function() {
                  e.success(e.data.created, "create");
                  e.success([], "update");
                  e.success([], "destroy");
                })
                  .fail(function() {
                  e.error({});
                });
              },
              read: function(e) {
                var data = kendo.data.transports.odata.parameterMap(e.data, "read");
                $.ajax({
                  url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers",
                  dataType: "jsonp",
                  data: data,
                  jsonp: "$callback"
                })
                  .done(e.success)
                  .fail(e.error);
              }
            },
            schema: {
              model: {
                id: "CustomerID",
                fields: {
                  "ContactName": { type: "string" }
                }
              }
            },
            pageSize: 20
          },
          height: 550,
          editable: "incell",
          toolbar: ["save", "create"],
          groupable: true,
          sortable: true,
          pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
          },
          columns: [{
            field: "ContactName",
            title: "Contact Name",
            width: 240
          }, {
            field: "ContactTitle",
            title: "Contact Title"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }, {
            command: ["destroy"]
          }]
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
