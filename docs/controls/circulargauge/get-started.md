---
title: Getting Started
page_title: jQuery CircularGauge Documentation - Getting Started with the CircularGauge
description: "Get started with the jQuery CircularGauge by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_circulargauge_component
position: 2
---

# Getting Started with the CircularGauge 

This guide demonstrates how to get up and running with the Kendo UI for jQuery CircularGauge.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="circular-gauge"></div>
    <script>
      $("#circular-gauge").kendoCircularGauge({       
        value: 223,
        colors: [{
          to: 180,
          color: 'pink'
        }, {
          from: 180,
          color: 'yellow'
        }],
        scale: {            
          min: 0,
          max: 360,
          minorUnit: 5,
          majorUnit: 45,
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
        centerTemplate: '<h2><i>#: value #</i></h2>'
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="circular-gauge"></div>
```

## 2. Initialize the CircularGauge

In this step, you will initialize the CircularGauge from the `<div>` element.

```html
    <div id="circular-gauge"></div>

    <script>
        $("#circular-gauge").kendoCircularGauge();
    </script>
```

## 3. Specify the Colors

Here, you will specify the [`colors`](/api/javascript/dataviz/ui/circulargauge/configuration/colors) of the value pointer. The color of the pointer will change based on the current value of the CircularGauge component. 

```dojo
    <div id="circular-gauge"></div>
    <script>
      $("#circular-gauge").kendoCircularGauge({
        value: 223,
        colors: [{
          to: 180,
          color: 'pink'
        }, {
          from: 50,
          color: 'yellow'
        }]
      });
    </script>
```

## 4. Customize the Scale

The Kendo UI for jQuery CircularGauge provides multiple configuration options that you can use to customize the appearance of the scales. You can:

* Set the intervals between the units.
* Change the colors of the minor and major ticks.
* Set margins, border colors, etc. 

To see the full list of the CircularGauge scale configuration options, see the [CircularGauge API](/api/javascript/dataviz/ui/circulargauge/configuration/scale).


In this step, you will add scale labels and style the major and minor ticks.

```dojo
    <div id="circular-gauge"></div>
    <script>
      $("#circular-gauge").kendoCircularGauge({
        value: 223,
        colors: [{
          to: 180,
          color: 'pink'
        }, {
          from: 50,
          color: 'yellow'
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

By default, the CircularGauge does not render content in the center. To add content and modify it according to your preferences, use the [`centerTemplate`](/api/javascript/dataviz/ui/circulargauge/configuration/centertemplate).

```
    <div id="circular-gauge"></div>
    <script>
      $("#circular-gauge").kendoCircularGauge({       
        value: 223,
        colors: [{
          to: 180,
          color: 'pink'
        }, {
          from: 180,
          color: 'yellow'
        }],
        scale: {            
          min: 0,
          max: 360,
          minorUnit: 5,
          majorUnit: 45,
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
        centerTemplate: '<h2><i>#: value #</i></h2>'
      });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the CircularGauge](https://demos.telerik.com/kendo-ui/circulargauge/index)

## See Also 

* [JavaScript API Reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
