---
title: Set size on Arc Gauge
description: how to set or change the size of an arc gauge
type: how-to
page_title: Resize Arc Gauge
slug: arc-gauge-set-size
position: 
tags: 
ticketid: 1418725
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® Kendo UI® Gauge for jQuery, ASP.NET MVC, ASP.NET Core</td>
	    </tr>
    </tbody>
</table>


## Description
The arc gauge has a default size (`200px` width), How to set its size or to make it fill its container?

## Solution
To set the size of the gauge, its HTML element must have the dimensions you need. They can be in pixels, or in percent (in this case, make sure the parent element(s) have the proper dimensions).

If you need the gauge to resize after its container changes size or gets shown, you must call its resize() method. This is needed mostly when its size is set in percent.

If static dimensions are sufficient for your case and you prefer to set them in the widget configuration, you can use the `gaugeArea.width` and `gaugeArea.height` properties.

Here is an example that showcases these features:

```dojo
  <style>
    #container {
      width: 300px;
      border: 1px solid red;
    }
    
    /* sample css rules to make the arg gauges resize with their parent container
       after their resize() method has been called. You can also make such CSS rules more generic
       in your app by, for example, using the .k-arcgauge class instead for your selectors*/
    #gauge1 {
      width: 100%;
      height: 300px;
    }
  </style>
  
  <button onclick="resizeContainer();">resize container</button>
  <div id="container">
    <div id="gauge1"></div>
    <!-- the second gauge uses inline rules to showcase the possibility -->
    <div id="gauge2" style="width: 100%; height: 300px;"></div>
    <!-- the third gauge has its size set in the declaration and it is in pixels
          so it will not resize with its parent container, like the other two will
          -->
    <div id="gauge3"></div>
  </div>
  
  <script>
    function resizeContainer() {
      var container =  $("#container");
      container.width("500px");
      kendo.resize(container);//resize the Kendo widgets in the container after it gets resized/shown
    }
    
    $("#gauge1, #gauge2").kendoArcGauge({value: 23});
    $("#gauge3").kendoArcGauge({
      value: 23,
      gaugeArea:{
           width: 100,
           height: 100
         }
     });
  </script>
```

> The HtmlHelpers do not pass inline styles at the time of writing (you can follow this enhancement [here](https://github.com/telerik/kendo-ui-core/issues/5192)), so you need to resize the gauges manually like this

```
<style>
	 [data-role="arcgauge"],
	 [data-role="arcgauge"] [data-role='surface'] {
		/* set the size of gauges to fill their containers. You may want to make the selectors more specific */
		width: 100% !important;
		height: 100% !important;
	}

	.gauge-container {
		width: 600px;
		height: 400px;
	}
</style>

<div class="gauge-container">
	@(Html.Kendo().ArcGauge()
		.Name("gauge4")
		.Value(65)
	)
</div>
```

