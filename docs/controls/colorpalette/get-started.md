---
title: Getting Started
page_title: jQuery ColorPalette Documentation - Getting Started with the ColorPalette
description: "Get started with the jQuery ColorPalette by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_colorpalette_widget
position: 2
---


# Getting Started with the ColorPalette 

This guide demonstrates how to get up and running with the Kendo UI for jQuery ColorPalette.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="colorpalette"></div>

    <script>
        $(document).ready(function(){
            $("#colorpalette").kendoColorPalette({
                tileSize: 32,
                columns: 8
            });
        });
    </script>
```

## 1. Create a div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be the content of the ColorPalette.

```html
    <div id="colorpalette"></div>
```

## 2. Initialize the ColorPalette

In this step, you will initialize the ColorPalette from the `<div>` element.

```dojo
    <div id="colorpalette"></div>

    <script>
        $(document).ready(function(){
            $("#colorpalette").kendoColorPalette();
        });
    </script>
```

## 3. Apply Configuration Settings to the ColorPalette

Here, you will apply some settings as [tileSize](/api/javascript/ui/colorpalette/configuration/tilesize) and [columns](/api/javascript/ui/colorpalette/configuration/columns).

```dojo
    <div id="colorpalette"></div>

    <script>
        $(document).ready(function(){
            $("#colorpalette").kendoColorPalette({
                tileSize: 32, // The size of a color cell.
                columns: 8 // The number of columns to display.
            });
        });
    </script>
```

>note As of `Kendo UI R3 2022`, you can initialize the ColorPalette from an input element and use it for value submission. The component is also supported as an editor in the [Kendo UI for jQuery Form]({% slug overview_kendoui_form_widget %}).

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
            editor:"ColorPalette"
          }
        ]
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ColorPalette](https://demos.telerik.com/kendo-ui/colorpalette/index)

## See Also 

* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
