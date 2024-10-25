---
title: Getting Started
page_title: jQuery ColorGradient Documentation - Getting Started with the ColorGradient
description: "Get started with the jQuery ColorGradient by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_colorgradient_widget
position: 2
---


# Getting Started with the ColorGradient 

This guide demonstrates how to get up and running with the Kendo UI for jQuery ColorGradient.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="colorgradient"></div>

    <script>
        $(document).ready(function(){
            $("#colorgradient").kendoColorGradient({
              opacity: true,
              input: true,
              format: "rgb",
              formats:["rgb","hex"]
            });
        });
    </script>
```

## 1. Create a div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be the content of the ColorGradient.

```html
    <div id="colorgradient"></div>
```

## 2. Initialize the ColorGradient

In this step, you will initialize the ColorGradient from the `<div>` element.

```dojo
    <div id="colorgradient"></div>

    <script>
        $(document).ready(function(){
            $("#colorgradient").kendoColorGradient();
        });
    </script>
```

## 3. Apply Configuration Settings to the ColorGradient

Here, you will apply some settings as [`opacity`](/api/javascript/ui/colorgradient/configuration/opacity), [`input`](/api/javascript/ui/colorgradient/configuration/input), [`format`](/api/javascript/ui/colorgradient/configuration/format), and [`formats`](/api/javascript/ui/colorgradient/configuration/formats).

```dojo
    <div id="colorgradient"></div>

    <script>
        $(document).ready(function(){
            $("#colorgradient").kendoColorGradient({
              opacity: true, // Display the opacity slider to allow selection of transparency.
              input: true, // Render the input.
              format: "rgb", // Sets the default input format in the gradient input editor.
              formats:["rgb","hex"] // Sets the available input formats in the gradient input editor.
            });
        });
    </script>
```

>note As of `Kendo UI R3 2022`, you can initialize the ColorGradient from an input element and use it for value submission. The component is also supported as an editor in the [Kendo UI for jQuery Form]({% slug overview_kendoui_form_widget %}).

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
            editor:"ColorGradient"
          }
        ]
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ColorGradient](https://demos.telerik.com/kendo-ui/colorgradient/index)

## See Also 

* [JavaScript API Reference of the ColorGradient](/api/javascript/ui/colorgradient)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
