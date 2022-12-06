---
title: Getting Started
page_title: jQuery Chip Documentation - Getting Started with the Chip
description: "Get started with the jQuery Chip by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_chip_widget
position: 2
---

# Getting Started with the Chip

This guide demonstrates how to get up and running with the Kendo UI for jQuery Chip. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<span id="chip"></span>

	<script>    
	    $("#chip").kendoChip({
            icon: "save",
            label: "Save"
        });
	</script>
```

## 1. Create a Select Element

First, create a `<span>` element on the page where you will initialize the Chip widget.

```html
<span id="chip"></span>
```

## 2. Initialize the Chip

When you initialize the widget, all settings of the Chip will be provided in the script statement. Describe the configuration and event handlers of the widget in JavaScript.

```html
<span id="chip"></span>

<script>
    // Target the span element by using jQuery and then call the kendoChip() method.
    $("#chip").kendoChip();
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the Chip. 

## 3. Add an Icon

You can display an icon in the Chip by configuring the [`icon`](/api/javascript/ui/chip/configuration/icon). For more information about the variety of the icons supported by the Chip, refer to the article on the [Customization of the Chip]({% slug customization_kendoui_chip_widget %}).

```html
	<span id="chip"></span>

	<script>    
	    $("#chip").kendoChip({
            icon: "save",
        });
	</script>
```

## 4. Add a Label to the Chip

Now you can use the [`label`](/api/javascript/ui/chip/configuration/label) option which allows you to display a label on the Chip.

```html
	<span id="chip"></span>

	<script>    
	    $("#chip").kendoChip({
            icon: "save",
            label: "Save"
        });
	</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Chip](https://demos.telerik.com/kendo-ui/chip/index)

## See Also 

* [JavaScript API Reference of the Chip](/api/javascript/ui/chip)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
