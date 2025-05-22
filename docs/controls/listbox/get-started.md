---
title: Getting Started
page_title: jQuery ListBox Documentation - Getting Started with the ListBox
description: "Get started with the jQuery ListBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_listbox_widget
position: 1
---

# Getting Started with the ListBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery ListBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="my-grid"></div>

    <script>
      let myDataArray = [
        {ID: 1, Name: "Tom", Date: "10/15/2022"},
        {ID: 2, Name: "John", Date: "11/25/2022"},
        {ID: 3, Name: "Annie", Date: "05/09/2022"},
        {ID: 4, Name: "Rachel", Date: "08/06/2022"},
        {ID: 5, Name: "Klemens", Date: "10/07/2022"},
        {ID: 6, Name: "Micah", Date: "05/19/2022"},
        {ID: 7, Name: "Junie", Date: "04/04/2022"},
        {ID: 8, Name: "Krishnah", Date: "07/19/2022"},
        {ID: 9, Name: "Enrichetta", Date: "01/11/2022"},
        {ID: 10, Name: "Marten", Date: "02/13/2022"},
        {ID: 11, Name: "Rosmunda", Date: "08/15/2022"},
      ];

      // Target the div element by using jQuery and then call the kendoGrid() method.
      $("#my-grid").kendoGrid({
        height: "400px",
        columns: [
          // The field matches the ID property in the data array.
          { field: "ID", title: "Personal Id", width: "70px" },
          { field: "Name", title: "First Name", width: "150px" },
          { field: "Date", title: "Hire Date", width: "200px", format: "{0:dd-MM-yyyy}" }
        ],
        toolbar: ["create", "save"],
        // Enable the filtering functionality.
        filterable: true,
        // Enable the editing functionality (incell by default).
        editable: true,
        dataSource: {
          data: myDataArray,
          schema: {
            model: {
              id: "ID", // The ID field is a unique identifier that allows the dataSource to distinguish different elements.
              fields: {
                ID: { type: "number", editable: false }, // The ID field in this case is a number. Additionally, do not allow users to edit this field.
                Name: { type: "string" },
                Date: { type: "date" }
              }
            }
          }
        }
      });
    </script>
```

## 1. Create a Select Element

First, create a `select` element on the page from which the ListBox will be initialized.

```html
<select id="listBox"></select>
```

## 2. Initialize the ListBox

In this step, you will initialize the ListBox from the `<select>` element. All settings of the ListBox will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<select id="listBox"></select>

<script>
    // Target the select element by using jQuery and then call the kendoListBox() method.
    $("#listBox").kendoListBox();
</script>
```

## 3. Bind the ListBox to Data

Once the basic initialization is completed, you can start adding additional configurations to the ListBox. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
<select id="listBox"></select>

<script>
      $("#listBox").kendoListBox({
        dataTextField:"text",
        dataValueField:"value",
        dataSource: [ 
          { text: "Item 1", value: 1 },
          { text: "Item 2", value: 2 },
          { text: "Item 3", value: 3 },
          { text: "Item 4", value: 4 },
        ]
      });
    </script>
```

## 4. Configure the ListBox Toolbar

By default, the ListBox toolbar isn't rendered. To display the toolbar with arrow buttons that allow the user to change the position of the items, configure the `tools` option.

```html
<select id="listBox"></select>

<script>
      $("#listBox").kendoListBox({
        dataTextField:"text",
        dataValueField:"value",
        dataSource: [ 
          { text: "Item 1", value: 1 },
          { text: "Item 2", value: 2 },
          { text: "Item 3", value: 3 },
          { text: "Item 4", value: 4 },
        ],
        toolbar:{
            tools: ["moveUp", "moveDown"]
        }
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery ListBox](https://demos.telerik.com/kendo-ui/listbox/index)

## See Also

* [JavaScript API Reference of the jQuery ListBox](/api/javascript/ui/listbox)
* [Knowledge Base Section](/knowledge-base)


