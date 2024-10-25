---
title: Getting Started
page_title: jQuery Slider Documentation - Getting Started with the Slider
description: "Get started with the jQuery Slider by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_slider_widget
position: 1
---

# Getting Started with the Slider

This guide demonstrates how to get up and running with the Kendo UI for jQuery Slider.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <input id="slider">

   <script>
       $("#slider").kendoSlider({
            min: -10,
            max: 10,
            smallStep: 1,
            largeStep: 5
       }); 
    </script> 
```

## 1. Create an Input Element

Create an `<input>` element on the page, and use it as an initialization element for the Slider.

```html
   <input id="slider">
```

## 2. Initialize the Slider

In this step, you will initialize the Slider from the `<input>` element. All settings of the RadioButton will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
   <input id="slider">

   <script>
       $("#slider").kendoSlider(); 
    </script>
```

## 3. Add Min and Max Values

Next, you can define the [minimal](/api/javascript/ui/slider/configuration/min) and [maximum](/api/javascript/ui/slider/configuration/max) values that will be rendered in the Slider.

```html
   <input id="slider">

   <script>
       $("#slider").kendoSlider({
            min: -10,
            max: 10,
       }); 
    </script> 
```

## 4. Add the Steps Options

Next, you can configure the [`smallStep`](/api/javascript/ui/slider/configuration/smallstep) and [`largeStep`](/api/javascript/ui/slider/configuration/largestep) options. The `smallStep` determines the small ticks in the Slider and how the value will be changed when using the keyboard. The `largeStep` determines the large ticks for each large step and how the value changes when you interact with the `PageUp` and `PageDown` keys. 

```html
   <input id="slider">

   <script>
       $("#slider").kendoSlider({
            min: -10,
            max: 10,
            smallStep: 1,
            largeStep: 5
       }); 
    </script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Slider](https://demos.telerik.com/kendo-ui/slider/index)

## See Also

* [JavaScript API Reference of the jQuery Slider](/api/javascript/ui/slider)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
