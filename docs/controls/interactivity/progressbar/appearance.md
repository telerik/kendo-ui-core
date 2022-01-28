---
title: Appearance
page_title: jQuery ProgressBar Documentation | Appearance
description: "Get started with the jQuery ProgressBar by Kendo UI and set its size and auto-resize the widget."
slug: appearance_kendoui_progressbar
position: 2
---

# Appearance

You can apply a 100% width to the ProgressBar and auto-resize it.

By default, the ProgressBar is a `27em` wide `inline-block` element. The easiest cross-browser technique to make it expand and resize automatically is to apply a couple of CSS styles to the originating element.

The following example demonstrates how to make the ProgressBar 100% wide and automatically resizable.

    <style>
	    #progressbar
	    {
	        width: auto;
	        display: block;
	    }
    </style>
    <div id="progressbar"></div>
    <script>
	    $(function(){
	        $("#progressbar").kendoProgressBar();
	    });
    </script>

## See Also

* [Basic Usage of the ProgressBar (Demo)](https://demos.telerik.com/kendo-ui/progressbar/index)
* [Using the API of the ProgressBar (Demo)](https://demos.telerik.com/kendo-ui/progressbar/api)
* [JavaScript API Reference of the ProgressBar](/api/javascript/ui/progressbar)
