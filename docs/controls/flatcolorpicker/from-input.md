---
title: From Input
page_title: FlatColorPicker Documentation - From Input Documentation
description: "Learn about the alternative options of the jQuery ColorPicker by Kendo UI."
slug: getting_started_kendoui_frominput_component
position: 7
---

# Initialize from Input 

As of Kendo UI R3 2022, you can initialize the FlatColorPicker from an `input` element and use it for value submission. The component is also supported as an editor in the [`Kendo UI Form`](/controls/form/overview).

```dojo
    <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
          ID: 1,
          Name: "John Doe",
          Address: 3,
          Color: "red"
        },
        items: [
          {
            field: "Name",
            validation: { required: true }
          },
          {
            field: "Address",
            editor:"DropDownList",
            editorOptions:{
              dataTextField:"text",
              dataValueField:"id",
              dataSource: {
                data: [
                  {text:"Sofia", id:1},
                  {text:"London", id:2},
                  {text:"New York", id:3}
                ]
              }
            }
          },
          {
            field: "Color",
            editor:"FlatColorPicker"
          }
        ]
      });
    </script>
```

## See Also 

* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
* [Knowledge Base Section](/knowledge-base)

