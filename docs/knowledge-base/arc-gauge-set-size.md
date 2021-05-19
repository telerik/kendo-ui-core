---
title: Set the ArcGauge Size
description: An example on how to set or change the size of a Kendo UI ArcGauge for jQuery.
type: how-to
page_title: Resize the ArcGauge | Kendo UI for jQuery
slug: arc-gauge-set-size
tags: archgauge, set, size
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

The ArcGauge has a default size of `200px` width. How can I set its size or make the ArcGauge fill its container?

## Solution

You have to set the desired dimensions in the HTML element of the ArcGauge. The dimensions can be set in pixels or in percentage. If you use percentage, make sure that the parent elements also have the proper dimensions.

To resize an ArcGauge after its container changes its size or the ArcGauge is displayed, call its `resize()` method. This approach is mostly needed when the size of the ArcGauge is set in percentage.

If static dimensions are sufficient for your case and you prefer to set them in the widget configuration, you can use the `gaugeArea.width` and `gaugeArea.height` properties.

```dojo
  <style>
    #container {
      width: 300px;
      border: 1px solid red;
    }

    /* Sample CSS rules to make the ArcGauges resize with their parent container
       after their resize() method has been called. You can also make such CSS rules more generic
       in your application by, for example, using the .k-arcgauge class instead for your selectors. */
    #gauge1 {
      width: 100%;
      height: 300px;
    }
  </style>

  <button onclick="resizeContainer();">resize container</button>
  <div id="container">
    <div id="gauge1"></div>
    <!-- The second Gauge uses inline rules to showcase the possibility. -->
    <div id="gauge2" style="width: 100%; height: 300px;"></div>
    <!-- The third Gauge has its size set in the declaration and is in pixels
    so that it will not resize with its parent container like the other two will. -->
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

> Currently, the HTML Helpers do not pass inline styles. You need to resize the Gauges manually as demonstrated [this enhancement issue](https://github.com/telerik/kendo-ui-core/issues/5192).

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
