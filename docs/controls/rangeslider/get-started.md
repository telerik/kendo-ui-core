---
title: Getting Started
page_title: jQuery RangeSlider Documentation - Getting Started with the RangeSlider
description: "Get started with the jQuery RangeSlider by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_rangeslider
position: 1
---

# Getting Started with the RangeSlider

This guide demonstrates how to get up and running with the Kendo UI for jQuery RangeSlider.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<label name='rangeslider'>Choose a price range:</label>
    <br/>
    <br/>
    <div id="rangeSlider" style="width:600px">
      <input />
      <input />
    </div>
    <script>
      $("#rangeSlider").kendoRangeSlider({
        min: 0,
        max: 1500, 
        smallStep: 100,
        largeStep: 300,
        tooltip:{
        	format: "${0}"
        }
      });
    </script>  
```

## 1. Create the HTML Markup

First, create a `<div>` element that has two `<input />` elements which capture both ends of the value range.

```html
    <div id="rangeSlider" style="width:600px">
      <input />
      <input />
    </div>
```

## 2. Initialize the RangeSlider

In this step, initialize the RangeSlider from the `<div>` element. When you initialize the component, all settings of the RangeSlider will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
 <div id="rangeSlider" style="width:600px">
      <input />
      <input />
 </div>

<script>
    // Target the div element by using jQuery and then call the kendoRangeSlider() method.
    $("#rangeSlider").kendoRangeSlider();
</script>
```

After the basic initialization is completed, you can start adding additional configurations to the RangeSlider.

## 3. Set Min and Max Values

Next, you can define the [min](/api/javascript/ui/rangeslider/configuration/min) and [max](/api/javascript/ui/rangeslider/configuration/max) values that will be rendered in the Slider.

```html
<div id="rangeSlider" style="width:600px">
      <input />
      <input />
</div>

<script>
    
    $("#rangeSlider").kendoRangeSlider({
        min: 0,
        max: 1500,       
    });
</script>  
```

## 4. Set Small and Large Steps

You can configure how the RangeSlider's range will be rendered in steps through the [smallStep](/api/javascript/ui/rangeslider/configuration/smallstep) and [largeStep](/api/javascript/ui/rangeslider/configuration/largestep) options. For more information, you can check the [Steps article]({% slug steps_rangeslider_widget %}).

```html
<div id="rangeSlider" style="width:600px">
      <input />
      <input />
    </div>
    <script>
      $("#rangeSlider").kendoRangeSlider({
        min: 0,
        max: 1500, 
        smallStep: 100,
        largeStep: 300
      });
    </script>  
```

## 5. Format the Tooltip

You can also choose how the tooltip for the currently selected range will be formatted through the [tooltip.format](/api/javascript/ui/rangeslider/configuration/tooltip#tooltip.format) option.

```html
    <div id="rangeSlider" style="width:600px">
      <input />
      <input />
    </div>
    <script>
      $("#rangeSlider").kendoRangeSlider({
        min: 0,
        max: 1500, 
        smallStep: 100,
        largeStep: 300,
        tooltip:{
        	format: "${0}"
        }
      });
    </script>  
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Ticks in the Kendo UI RangeSlider for jQuery]({% slug ticks_rangeslider_widget %})

## See Also

* [JavaScript API Reference of the RangeSlider](/api/javascript/ui/rangeslider)
* [Knowledge Base Section](/knowledge-base)

