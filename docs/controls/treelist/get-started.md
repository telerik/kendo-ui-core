---
title: Getting Started
page_title: jQuery TreeList Documentation - Getting Started with the TreeList
description: "Get started with the jQuery TreeList by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_treelist_component
position: 1
---

# Getting Started with the TreeList

This guide demonstrates how to get up and running with the Kendo UI for jQuery TreeList.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="treelist"></div>

    <script>
      let myDataArray = [
        {ID: 1, Name: "Tom", Date: "10/15/2022", parentId: null},
        {ID: 2, Name: "John", Date: "11/25/2022", parentId: 1},
        {ID: 3, Name: "Annie", Date: "05/09/2022", parentId: 1},
        {ID: 4, Name: "Rachel", Date: "08/06/2022", parentId: 2},
        {ID: 5, Name: "Klemens", Date: "10/07/2022", parentId: 4},
        {ID: 6, Name: "Micah", Date: "05/19/2022", parentId: 3},
        {ID: 7, Name: "Junie", Date: "04/04/2022", parentId: 3},
        {ID: 8, Name: "Krishnah", Date: "07/19/2022", parentId: 7},
        {ID: 9, Name: "Enrichetta", Date: "01/11/2022", parentId: 8},
        {ID: 10, Name: "Marten", Date: "02/13/2022", parentId: 9},
        {ID: 11, Name: "Rosmunda", Date: "08/15/2022", parentId: 9},
        {ID: 12, Name: "Regan", Date: "08/15/2022", parentId: 2},
        {ID: 13, Name: "Drew", Date: "08/15/2022", parentId: 2},
        {ID: 14, Name: "Bevis", Date: "08/15/2022", parentId: 4},
        {ID: 15, Name: "Olga", Date: "08/15/2022", parentId: 4},
        {ID: 16, Name: "Robert", Date: "08/15/2022", parentId: 6},
        {ID: 17, Name: "Priscilla", Date: "08/15/2022", parentId: 6},
        {ID: 18, Name: "Oren", Date: "08/15/2022", parentId: 6},
        {ID: 19, Name: "Thomas", Date: "08/15/2022", parentId: 6},
        {ID: 20, Name: "Keiko", Date: "08/15/2022", parentId: 5},
      ];

      $("#treelist").kendoTreeList({
        dataSource: {
          data: myDataArray,
          schema: {
            model: {
              id: "ID",
              parentId: "parentId",
              expanded: true,
              fields: {
                Date: { type: "date" }
              }
            }
          }
        },
        toolbar: ["create"],
        // Enable filtering.
        filterable: true,
        // Enable editing.
        editable: "inline",
        height: 400,
        columns: [
          { field: "Name" },
          { field: "Date", format: "{0:dd-MM-yyyy}" },
          { title: "Edit", command: [ "edit" ]}
        ]
      });
    </script>
```

## 1. Create an Empty div Element

First, create an empty `<div>` element on the page that will serve as the main container of the TreeList component.

```html
<div id="treelist"></div>
```

## 2. Initialize the TreeList

In this step, you will initialize the Grid from the empty `<div>` element.

```html
<div id="treelist"></div>

<script>
    // Target the div element by using jQuery and then call the kendoTreeList() method.
    $("#treelist").kendoTreeList({
        // Add some basic configurations such as height.
        height: 400
    });
</script>
```

## 3. Bind the TreeList to Data

Once the basic initialization is completed, you can start adding additional configurations to the TreeList. The first and most important configuration is the [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource).

The TreeList renders its hierarchy based on the `parentId`-`id` relationship. The data objects contain both an `id` and a `parentId` field which describe the hierarchy of the items. You can change these field names by using the [`schema.model` definition](/api/javascript/data/datasource/configuration/schema#schema.model).

> The TreeList distinguishes the root items based on the `parentId`:
> * If the `schema.model.fields.[parentIdField]` is nullable, root items will be the items whose `parentId` field values are `null`.
> * If the `schema.model.fields.[parentIdField]` is not nullable, root items will be the items which have a default value for their data type.
>
> When you use the `schema.model.fields` configuration, list all fields. Set the field which represents the `id` through the `schema.model.id`. If these are not set, they will work for displaying data but will post incomplete objects to the server when editing items.

```javascript
      let myDataArray = [
        {ID: 1, Name: "Tom", Date: "10/15/2022", parentId: null},
        {ID: 2, Name: "John", Date: "11/25/2022", parentId: 1},
        {ID: 3, Name: "Annie", Date: "05/09/2022", parentId: 1},
        {ID: 4, Name: "Rachel", Date: "08/06/2022", parentId: 2},
        {ID: 5, Name: "Klemens", Date: "10/07/2022", parentId: 4},
        {ID: 6, Name: "Micah", Date: "05/19/2022", parentId: 3},
        {ID: 7, Name: "Junie", Date: "04/04/2022", parentId: 3},
        {ID: 8, Name: "Krishnah", Date: "07/19/2022", parentId: 7},
        {ID: 9, Name: "Enrichetta", Date: "01/11/2022", parentId: 8},
        {ID: 10, Name: "Marten", Date: "02/13/2022", parentId: 9},
        {ID: 11, Name: "Rosmunda", Date: "08/15/2022", parentId: 9},
        {ID: 12, Name: "Regan", Date: "08/15/2022", parentId: 2},
        {ID: 13, Name: "Drew", Date: "08/15/2022", parentId: 2},
        {ID: 14, Name: "Bevis", Date: "08/15/2022", parentId: 4},
        {ID: 15, Name: "Olga", Date: "08/15/2022", parentId: 4},
        {ID: 16, Name: "Robert", Date: "08/15/2022", parentId: 6},
        {ID: 17, Name: "Priscilla", Date: "08/15/2022", parentId: 6},
        {ID: 18, Name: "Oren", Date: "08/15/2022", parentId: 6},
        {ID: 19, Name: "Thomas", Date: "08/15/2022", parentId: 6},
        {ID: 20, Name: "Keiko", Date: "08/15/2022", parentId: 5},
      ];

    $("#treelist").kendoTreeList({
        dataSource: {
          data: myDataArray,
          schema: {
            model: {
              id: "ID",
              parentId: "parentId",
              expanded: true,
              fields: {
                Date: { type: "date" }
              }
            }
          }
        }
      });
```

## 4. Configure the TreeList Columns

The TreeList enables you to configure each individual column and apply a set of [column properties](/api/javascript/ui/treelist/configuration/columns#related-properties).

```javascript
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Date", format: "{0:dd-MM-yyyy}" },
          { title: "Edit", command: [ "edit" ]}
        ]
      });
```

## 5. Add Editing and Filtering

Among other functionalities, the TreeList supports editing and filtering. The [editing]({% slug editing_kendoui_treelist_widget %}) feature enables users to edit individual TreeList cells. The [filtering]({% slug filtering_kendoui_treelist_widget %}) feature allows users to filter the data inside the TreeList.

```javascript
      $("#treelist").kendoTreeList({
        toolbar: ["create"],
        // Enable filtering.
        filterable: true,
        // Enable editing.
        editable: "inline",
      });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery TreeList](https://demos.telerik.com/kendo-ui/treelist/index)

## See Also

* [JavaScript API Reference of the TreeList](/api/javascript/ui/treelist)
* [Knowledge Base Section](/knowledge-base)


