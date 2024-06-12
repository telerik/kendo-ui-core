---
title: Getting Started
page_title: jQuery RadialGauge Documentation - Getting Started with the RadialGauge
description: "Get started with the jQuery RadialGauge by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_radialgauge_component
position: 2
---

# Getting Started with the RadialGauge 

This guide demonstrates how to get up and running with the Kendo UI for jQuery RadialGauge.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="radial-gauge"></div>
    <script>
      $("#radial-gauge").kendoRadialGauge({       
        pointer: [
          {
            value: -38,
            color: "blue"
          },
          {
            value: 22,
            color: "#F6466C"
          }
        ],      
        scale: {   
          ranges: [{
            to:-40,
            color: '#6FC2D5'
          }, {
            from: -40,
            to: 0,
            color: '#97E5EE'
          },{
            from: 0,
            to: 40,
            color: '#FAB0C0'
          },{
            from: 40,
            color: '#F71848'
          }],
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkblue',
            position: "outside",
            template: '#: value #'
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'blue'
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

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="radial-gauge"></div>
```

## 2. Initialize the RadialGauge

In this step, you will initialize the RadialGauge from the `<div>` element.

```html
    <div id="radial-gauge"></div>

    <script>
        $("#radial-gauge").kendoRadialGauge();
    </script>
```

## 3. Add the Pointers

The RadialGauge allows you to add multiple [`pointers`](/api/javascript/dataviz/ui/radialgauge/configuration/pointer). In this step, you will:

* Add two pointers.
* Configure the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/pointer#pointervalue) and [`color`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/pointer#pointercolor) of the pointers.


```dojo
    <div id="radial-gauge"></div>
    <script>
      $("#radial-gauge").kendoRadialGauge({
        pointer: [
          {
            value: -38,
            color: "blue"
          },
          {
            value: 22,
            color: "#F6466C"
          }
        ]
      });
    </script>
```

## 4. Customize the Scale

The Kendo UI for jQuery RadialGauge provide multiple configuration option that can be used to customize the appearance of the scales. You can set the intervals between the units, change the colors of the minor and major ticks, set margins, border colors, etc. To see the full list of the RadialGauge scale configuration option open the [RadialGauge API](/api/javascript/dataviz/ui/radialgauge/configuration/scale).
The Kendo UI for jQuery RadialGauge provides multiple configuration options that you can use to customize the appearance of the scales. You can:

 * Set the intervals between the units.
 * Change the colors of the minor and major ticks.
 * Set margins, border colors, etc. 
 
 To see the full list of the RadialGauge scale configuration options, see the [RadialGauge API](/api/javascript/dataviz/ui/radialgauge/configuration/scale).

In this step, you will add scale labels and style the major and minor ticks.

```dojo
    <div id="radial-gauge"></div>
    <script>
      $("#radial-gauge").kendoRadialGauge({       
        pointer: [
          {
            value: -38,
            color: "blue"
          },
          {
            value: 22,
            color: "#F6466C"
          }
        ],      
        scale: {            
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkblue',
            position: "outside",
            template: '#: value #'
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'blue'
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

## 5. Customize the Scale Colors

Here, you will specify the [`colors of the scale ranges`](/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges). 

```dojo
    <div id="radial-gauge"></div>
    <script>
      $("#radial-gauge").kendoRadialGauge({       
        pointer: [
          {
            value: -38,
            color: "blue"
          },
          {
            value: 22,
            color: "#F6466C"
          }
        ],      
        scale: {   
          ranges: [{
            to:-40,
            color: '#6FC2D5'
          }, {
            from: -40,
            to: 0,
            color: '#97E5EE'
          },{
            from: 0,
            to: 40,
            color: '#FAB0C0'
          },{
            from: 40,
            color: '#F71848'
          }],
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkblue',
            position: "outside",
            template: '#: value #'
          },
          minorTicks:{
            visible: true,
            size: 8, 
            color: 'blue'
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

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the RadialGauge](https://demos.telerik.com/kendo-ui/radialgauge/index)

## See Also 

* [JavaScript API Reference of the RadialGauge](/api/javascript/dataviz/ui/radialgauge)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
