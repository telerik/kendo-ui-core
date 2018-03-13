---
title: Use a Kendo DropDownList widget in the column template of a MVVM Grid
description: An example on how to use a Kendo DropDownList widget in the column template of a MVVM Grid.
type: how-to
page_title: Use a Kendo DropDownList widget in the column template of a MVVM Grid | Kendo UI Grid
slug: grid-mvvm-dropdown-template
tags: grid, mvvm, dropdown, list, drop, down, template, client, column
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2018.1.221</td>
 </tr>
</table>

## Description

How can I create a Kendo DropDownList widget in the column template of a MVVM Grid?

## Solution

Within the model add a property which returns the template and in the configuration of the grid specify that the template of the column is a property of the model.
 
```html
    <div id="example">
      <div class="demo-section k-content wide">
        <div>
          <h4>Add or update a record</h4>
          <div data-role="grid"            

               data-editable="true"
               data-toolbar="['create', 'save']"
               data-columns="[{ 'field': 'Action', 'width': 270, 'template':viewModel.columnTemplateFunction, editable: viewModel.notEditable },{ 'field': 'Price' },]"
               data-bind="source: products"
               style="height: 200px"></div>
        </div>

        <script>
          var viewModel = kendo.observable({          
            columnTemplateFunction:  function (dataItem) {
              var input = 
                  `<input class="dropDown"
data-role="dropdownlist"
data-bind=" source: ActionsCollection, value: Action" 
style="width: 100%;"
/>`;

              return input;
            },
            products: new kendo.data.DataSource({
              schema: {
                model: {
                  id: "Id",
                  fields: {
                    Action: { type: "string" },
                    Price: { type: "number" }
                  }
                }
              },
              data:[
                {
                  Id:1,
                  Action: 'First record',
                  Price: 10,
                  ActionsCollection:[
                    'First record','First record1','First record2','First record3','First record4'
                  ]
                },
                {
                  Id:2,
                  Action: 'Second record',
                  Price: 20,
                  ActionsCollection:[
                    'Second record','Second record1','Second record2','Second record3','Second record4'
                  ]
                },
                {
                  Id:3,
                  Action: 'Third record',
                  Price: 30,
                  ActionsCollection:[
                    'Third record','Third record1','Third record2','Third record3','Third record4'
                  ]
                }
              ]
            }),
            notEditable:function(){
              return false;
            },
            getById: function(Id){
              return viewModel.products.get(Id);
            }
          });
          kendo.bind($("#example"), viewModel);
        </script>
      </div>

```
