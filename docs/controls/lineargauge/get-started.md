---
title: Getting Started
page_title: jQuery LinearGauge Documentation - Getting Started with the LinearGauge
description: "Get started with the jQuery LinearGauge by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_lineargauge_component
position: 2
---

# Getting Started with the LinearGauge 

This guide demonstrates how to get up and running with the Kendo UI for jQuery LinearGauge.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="linear-gauge"></div>
    <script>
      $("#linear-gauge").kendoLinearGauge({       
        pointer: [{
          value: 30,
          color: "#c20000",
          shape: "arrow"
        }],      
        scale: {   
          ranges: [{
            to:-15,
            color: 'darkblue'
          }, {
            from: -15,
            to: 0,
            color: 'lightblue'
          },{
            from: 0,
            to: 20,
            color: 'yellow'
          },{
            from: 20,
            color: 'orange'
          }],
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkgreen',
            position: "outside",
            template: '#: value #'
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

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="linear-gauge"></div>
```

## 2. Initialize the LinearGauge

In this step, you will initialize the LinearGauge from the `<div>` element.

```html
    <div id="linear-gauge"></div>

    <script>
        $("#linear-gauge").kendoLinearGauge();
    </script>
```

## 3. Customize the Scale 

The Kendo UI for jQuery LinearGauge provides multiple configuration options that you can use to customize the appearance of the scales. You can:

* Set the intervals between the units.
* Change the colors of the minor and major ticks.
* Set margins, border colors, etc. 

To see the full list of the LinearGauge scale configuration options, see the [LinearGauge API](/api/javascript/dataviz/ui/lineargauge/configuration/scale).

In this step, you will add scale labels and style the major and minor ticks.

```dojo
    <div id="linear-gauge"></div>
    <script>
      $("#linear-gauge").kendoLinearGauge({
        scale: {             
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkgreen',
            position: "outside",
            template: '#: value #'
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

## 4. Customize the Scale Colors

Here, you will specify the [`colors of the scale ranges`](/api/javascript/dataviz/ui/lineargauge/configuration/scale.ranges#scale.ranges.color). 

```dojo
    <div id="linear-gauge"></div>
    <script>
      $("#linear-gauge").kendoLinearGauge({
        scale: {             
          ranges: [{
            to:-15,
            color: 'darkblue'
          }, {
            from: -15,
            to: 0,
            color: 'lightblue'
          },{
            from: 0,
            to: 20,
            color: 'yellow'
          },{
            from: 20,
            color: 'orange'
          }],
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkgreen',
            position: "outside",
            template: '#: value #'
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

## 5. Add the Pointer

The LinearGauge allows you to add multiple [`pointers`](/api/javascript/dataviz/ui/lineargauge/configuration/pointer). In this step, you will add a single pointer and will configure its [`shape`](/api/javascript/dataviz/ui/lineargauge/configuration/pointer.shape) and [`color`](/api/javascript/dataviz/ui/lineargauge/configuration/pointer.color). 

```
    <div id="linear-gauge"></div>
    <script>
      $("#linear-gauge").kendoLinearGauge({       
        pointer: [{
          value: 30,
          color: "#c20000",
          shape: "arrow"
        }],      
        scale: {   
          ranges: [{
            to:-15,
            color: 'darkblue'
          }, {
            from: -15,
            to: 0,
            color: 'lightblue'
          },{
            from: 0,
            to: 20,
            color: 'yellow'
          },{
            from: 20,
            color: 'orange'
          }],
          min: -50,
          max: 50,
          minorUnit: 5,
          majorUnit: 10,
          labels: {
            visible: true,
            color: 'darkgreen',
            position: "outside",
            template: '#: value #'
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


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the LinearGauge](https://demos.telerik.com/kendo-ui/lineargauge/index)

## See Also 

* [JavaScript API Reference of the LinearGauge](/api/javascript/dataviz/ui/lineargauge)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
