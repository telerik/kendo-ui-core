---
title: Use Window and MVVM for data editing
page_title: Use Window and MVVM for data editing
description: Use Window and MVVM for data editing
---

# Use Window and MVVM for data editing

The example below demonstrates how to edit data in a Kendo UI Window using MVVM binding

#### Example:

```html

    <ul id="data-container"></ul>

    <!-- template used to render the dataSource's data -->
    <script id="tmp" type="text/x-kendo-template">
        <li data-uid="#: uid #"> ID: #: ProductID # Product Name: #: ProductName # <input type="button" value="edit" class="edit-button" /></li>
    </script>

    <!-- kendoWindow -->
    <div id="editForm">
      <h2>Edit Form</h2>
      <ul>
        <li>
          <label for="ProductName">ProductName</label>
          <!-- bind the ProductName field of the selected product -->
          <input type="text" class="k-textbox" name="ProductName" data-bind="value: selected.ProductName" required />
        </li>
        <li>
          <label for="UnitPrice">UnitPrice</label>
          <!-- bind the UnitPrice field of the selected product -->
          <input data-role="numerictextbox" name="UnitPrice" data-bind="value: selected.UnitPrice" required min="1" />
          <span class="k-invalid-msg" data-for="UnitPrice"></span>
        </li>
        <li>
          <label for="UnitsInStock">UnitsInStock</label> 
          <!-- bind the UnitsInStock field of the selected product -->
          <input data-role="numerictextbox" name="UnitsInStock" data-bind="value: selected.UnitsInStock" required min="0" />
          <span class="k-invalid-msg" data-for="UnitsInStock"></span>
        </li>
        <li>
          <label for="Discontinued"></label>
          <!-- bind the Discontinued field of the selected product -->
          <input type="checkbox" name="Discontinued" data-bind="checked: selected.Discontinued" />
          <span>Items is discontinued</span>
        </li>
        <li class="buttons">
          <!-- attach the click event handlers -->
          <button class="k-button btnSave" data-bind="events: { click: sync }">Save</button>
          <button class="k-button btnCancel" data-bind="events: { click: cancel }">Cancel</button>
        </li>
      </ul>
    </div>
    <script>
      var crudServiceBaseUrl = "http://demos.kendoui.com/service";
      var validator;
      var viewModel = kendo.observable({
        //create a dataSource
        dataSource: new kendo.data.DataSource({
          transport: {
            read:  {
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
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          pageSize: 20,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
              }
            }
          },
          change: function () {
            var template = kendo.template($("#tmp").html()); //create a template
            $("#data-container").html(kendo.render(template, this.view())); //render the template with current data
          }
        }),
        selected: {}, //this field will contain the edited dataItem
        sync: function () {
          if(validator.validate()) { //validate the user input
            this.dataSource.sync(); //sync the changes through the transport
            $("#editForm").data("kendoWindow").close();
          }
        },
        cancel: function () {
          this.dataSource.cancelChanges(); //calcel all the change
          validator.hideMessages(); //hide the warning messages
          $("#editForm").data("kendoWindow").close();
        }
      });

      viewModel.dataSource.read(); //invoke the read transport of the DataSource

      kendo.bind($("#editForm"), viewModel);
      validator = $("#editForm").kendoValidator().data("kendoValidator"); //create a validator instance

      $("#editForm").kendoWindow({ //create a window
        visible: false
      });

      $("#data-container").on("click", ".edit-button", function(e) {
        var model = viewModel.dataSource.getByUid($(e.target).closest("li").data("uid")); //get reference to the model
        validator.hideMessages(); //hide the validation messages (if any)
        viewModel.set("selected", model); //update the viewModel
        $("#editForm").data("kendoWindow").open().center();
      });

    </script>

    <style scoped>
      #grid {
        width: 700px;
        float: left;
      }
      #editForm {
        width: 600px;
        margin: 20px;
        padding: 20px;
        float: left;
        border: 1px solid #c5c5c5;
        border-radius: 10px;
        font-size: 80%;
      }
      #editForm h2 {
        border-bottom: 1px solid #ccc;
        font-size: 1.4em;
        font-weight: normal;
        padding: 0;
        margin: 0;
      }
      #editForm ul {
        list-style-type: none;
      }
      #editForm ul li {
        margin: 10px;
      }
      #editForm ul label {
        font-weight: bold;
        display: inline-block;
        width: 90px;
        text-align: right;
      }
      #editForm label {
        display: block;
        margin-bottom: 10px;
      }
      #editForm .buttons {
        margin-top: 25px;
      }
      #editForm .k-button {
        width: 100px;
      }
    </style>
```