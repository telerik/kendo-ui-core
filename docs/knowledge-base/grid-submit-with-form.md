---
title: Edit Grid as Part of a Form and Send Data to Server on Form Submit
description: An example on how to create a Kendo UI Grid that is edited entirely on the client as part of a form and submit it on a form submit.
type: how-to
page_title: Edit on the Client as Part of a Form | Kendo UI Grid
slug: grid-edit-inside-form
tags: grid, editing, form
ticketid: 1137684
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

How can I:
* Display an invoice-like form with master data on top and a list in which you can add and edit items on the client?
* Submit all form changes on a single button click?

## Solution

1. Bind the Grid to a static array and implement local CRUD operations with the `"incell"` editing mode.
1. When a change in the data occurs, populate a hidden input inside the form with a string representation of the data. As a result, when the form submits, the hidden input data is also automatically submitted to the server.

```dojo
    <form class="invoice" action="url" method = "POST">
      Customer name: <input type = "text" name = "customer_name" class="k-textbox" />
      <br>
      Company name: <input type = "text" name = "company_name" class="k-textbox" />
      <input type="hidden" id="gridData" name="list_items" />

      <div id="grid"></div>
      <input type = "submit" name = "submit" value = "Submit" class="k-button" />
    </form>
    <script>
      var sampleData = [
        {ProductID: 1, ProductName: "Bread", UnitPrice: 1, OrderedUnits: 100},
        {ProductID: 2, ProductName: "Butter", UnitPrice: 3, OrderedUnits: 20},
        {ProductID: 3, ProductName: "Jam", UnitPrice: 3.5, OrderedUnits: 30}
      ];
      $("#gridData").val(JSON.stringify(sampleData));
      // custom logic start

      var sampleDataNextID = sampleData.length + 1;

      function getIndexById(id) {
        var idx,
            l = sampleData.length;

        for (var j=0; j < l; j++) {
          if (sampleData[j].ProductID == id) {
            return j;
          }
        }
        return null;
      }

      // custom logic end

      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          autoSync: true,
          transport: {
            read: function (e) {
              // on success
              e.success(sampleData);
              // on failure
              //e.error("XHR response", "status code", "error message");
            },
            create: function (e) {

              for(var i = 0; i < e.data.models.length; i++){
                // assign an ID to the new item
                e.data.models[i].ProductID = sampleDataNextID++;
                // save data item to the original datasource
                sampleData.push(e.data.models[i]);
              }
				// populate hidden input with new data
              $("#gridData").val(JSON.stringify(sampleData));
              // on success
              e.success(e.data.models);
              // on failure
              //e.error("XHR response", "status code", "error message");
            },
            update: function (e) {
              for(var i = 0; i < e.data.models.length; i++){
                // locate item in original datasource and update it
                sampleData[getIndexById(e.data.models[i].ProductID)] = e.data.models[i];
              }
				// populate hidden input with new data
              $("#gridData").val(JSON.stringify(sampleData));
              // on success
              e.success();
              // on failure
              //e.error("XHR response", "status code", "error message");
            },
            destroy: function (e) {

              for(var i = 0; i < e.data.models.length; i++){
                // locate item in original datasource and remove it
                sampleData.splice(getIndexById(e.data.models[i].ProductID), 1);
              }
				// populate hidden input with new data
              $("#gridData").val(JSON.stringify(sampleData));
              // on success
              e.success();
              // on failure
              //e.error("XHR response", "status code", "error message");
            }
          },
          error: function (e) {
            // handle data operation error
            alert("Status: " + e.status + "; Error message: " + e.errorThrown);
          },
          pageSize: 10,
          batch: true,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                OrderedUnits: { type: "number", validation: { min: 1, required: true } }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          toolbar: ["create"],
          columns: [
            { field: "ProductName", title: "Mobile Phone" },
            { field: "UnitPrice", title: "Price", format: "{0:c}", width: "120px" },
            { field: "OrderedUnits", title:"Ordered Units", width: "120px" },
            { command: ["destroy"], title: "&nbsp;", width: "200px" }
          ],
          editable: "incell"
        });

        $("form.invoice").submit(function(e){
          // Prevent default submit of dummy form. Remove this in actual project.
          e.preventDefault();
        	var form = $(e.target);
          var formData = form.serializeArray();

          console.log(formData);
        });
      });
    </script>
```
