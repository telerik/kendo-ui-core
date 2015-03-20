---
title: Editing
page_title: Documentation for enabling editing in Grid UI widget
description: Which steps to follow in order to enable the editing support of Kendo UI jQuery grid widget.
position: 3
---

# Grid Editing

To enable the editing support of KendoUI Grid widget the following steps should be performed:

## Configure the DataSource for remote CRUD  (Create, Read, Update, Destroy) data operations:
    var dataSource = new kendo.data.DataSource({
       transport: {
         read:   "/Products",
         update: {
            url: "/Products/Update",
            type: "POST"
         },
         destroy: {
             url: "/Products/Destroy",
             type: "POST"
          },
          create: {
              url: "/Products/Create",
              type: "POST"
           }
         },
         // determines if changes will be send to the server individually or as batch
         batch: true
         //...
    });

## Declare fields definition through the DataSource schema:

    var dataSource = new kendo.data.DataSource({
        //..
        schema: {
          model: {
             id: "ProductID",
             fields: {
                 ProductID: {
                    //this field will not be editable (default value is true)
                    editable: false,
                    // a defaultValue will not be assigned (default value is false)
                    nullable: true
                 },
                 ProductName: {
                    validation: { //set validation rules
                        required: true
                    }
                 },
                 UnitPrice: {
                     //data type of the field {Number|String|Boolean} default is String
                     type: "number",
                     // used when new model is created
                     defaultValue: 42,
                     validation: {
                        required: true,
                        min: 1
                     }
                }
            }
        }
      }
    });

## Set the KendoUI Grid editable configuration option:

    $("#grid").kendoGrid({
          dataSource: dataSource,
          editable: true
    });

or

## Set the KendoUI Grid editable configuration option:

    $("#grid").kendoGrid({
          dataSource: dataSource,
          editable: { //disables the deletion functionality
             update: true,
             destroy: false
          }
    });

## If you want to enable new records insertion the toolbar should be configured:

    $("#grid").kendoGrid({
         dataSource: dataSource,
         toolbar: ["create", "save", "cancel"],
         editable: true
    });

## Additionally in order to delete records a delete command column should be defined:
     $("#grid").kendoGrid({
         dataSource: dataSource,
         columns: [
            "ProductName",
            "UnitPrice",
            "UnitsInStock",
            {
                command: "destroy"
            }],
         editable: true
     });
