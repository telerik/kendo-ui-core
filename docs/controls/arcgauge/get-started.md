---
title: Getting Started
page_title: jQuery ArcGauge Documentation - Getting Started with the ArcGauge
description: "Get started with the jQuery ArcGauge by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_arcgauge_component
position: 2
---

# Getting Started with the ArcGauge 

This guide demonstrates how to get up and running with the Kendo UI for jQuery ArcGauge.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="arc-gauge"></div>
    <script>
      $("#arc-gauge").kendoArcGauge({       
        value: 63,
        colors: [{
          to: 50,
          color: 'yellow'
        }, {
          from: 50,
          color: 'lightgreen'
        }],
        scale: {            
          min: 10,
          max: 80,
          minorUnit: 5,
          labels: {
            visible: true,
            color: 'darkgreen',
            template: "#: value #",
            position: "outside"
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'green'
          },
          majorTicks:{
            visible: true,
            size: 15, 
            color: 'red'
          }
        },
        centerTemplate: '<h2>#: value #%</h2>'
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="arc-gauge"></div>
```

## 2. Initialize the ArcGauge

In this step, you will initialize the ArcGauge from the `<div>` element.

```html
    <div id="arc-gauge"></div>

    <script>
        $("#arc-gauge").kendoArcGauge();
    </script>
```

## 3. Specify the Colors

Here, you will specify the [`colors`](/api/javascript/dataviz/ui/arcgauge/configuration/colors) of the value pointer. The color of the pointer will change based on the current value of the ArcGauge component. 

```dojo
    <div id="arc-gauge"></div>
    <script>
      $("#arc-gauge").kendoArcGauge({
        value: 63,
        colors: [{
          to: 50,
          color: 'yellow'
        }, {
          from: 50,
          color: 'orange'
        }]
      });
    </script>
```

## 4. Customize the Scale

The Kendo UI for jQuery ArcGauge provides multiple configuration options that you can use to customize the appearance of the scales. You can:

* Set the intervals between the units.
* Change the colors of the minor and major ticks.
* Set margins, border colors, etc.

To see the full list of the ArcGauge scale configuration options, see the [ArcGauge API](/api/javascript/dataviz/ui/arcgauge/configuration/scale).

In this step, you will add scale labels and style the major and minor ticks.

```dojo
    <div id="arc-gauge"></div>
    <script>
      $("#arc-gauge").kendoArcGauge({
        value: 63,
        colors: [{
          to: 50,
          color: 'yellow'
        }, {
          from: 50,
          color: 'lightgreen'
        }],
        scale: {            
          min: 10,
          max: 80,
          minorUnit: 5,
          labels: {
            visible: true,
            color: 'darkgreen',
            template: "#: value #",
            position: "outside"
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'green'
          },
          majorTicks:{
            visible: true,
            size: 15, 
            color: 'red'
          }
        }
      });
    </script>
```

## 5. Add Content in the Center

By default, the ArcGauge does not render content in the center. To add content and modify it according to your preferences use the [`centerTemplate`](/api/javascript/dataviz/ui/arcgauge/configuration/centertemplate).

```
    <div id="arc-gauge"></div>
    <script>
      $("#arc-gauge").kendoArcGauge({       
        value: 63,
        colors: [{
          to: 50,
          color: 'yellow'
        }, {
          from: 50,
          color: 'lightgreen'
        }],
        scale: {            
          min: 10,
          max: 80,
          minorUnit: 5,
          labels: {
            visible: true,
            color: 'darkgreen',
            template: "#: value #",
            position: "outside"
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'green'
          },
          majorTicks:{
            visible: true,
            size: 15, 
            color: 'red'
          }
        },
        centerTemplate: '<h2>#: value #%</h2>'
      });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ArcGauge](https://demos.telerik.com/kendo-ui/arcgauge/index)

## See Also 

* [JavaScript API Reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
