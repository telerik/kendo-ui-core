---
title: Getting Started
page_title: jQuery Badge Documentation | Getting Started with the Badge
description: "Get started with the jQuery Badge by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_badge_widget
position: 1
---

# Getting Started with the Badge

This guide demonstrates how to get up and running with the Kendo UI for jQuery Badge. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <span id="badge">Badge</span>

	<script>    
		$("#badge").kendoBadge({
			icon: "edit",
			themeColor: 'success'
		});
	</script>
```

## 1. Create a select Element

First, create a `<span>` element on the page from which the Badge component will be initialized.

```html
	<span id="badge">Badge</span>
```

## 2. Initialize the Badge 

In this step, you will initialize the Badge from the `<span>` element. When you initialize the component, all settings of the Badge will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.


```html
<span id="badge">Badge</span>

<script>
    // Target the span element by using jQuery and then call the kendoBadge() method.
    $("#badge").kendoBadge();
</script>
```


Once the basic initialization is completed, you can start adding additional configurations to the Badge. 

## 3. Add an Icon

You can display an icon in the Badge by configuring the [icon](/api/javascript/ui/badge/configuration/icon). 

```html
<span id="badge">Badge</span>

<script>    
    $("#badge").kendoBadge({
		icon: "edit"
	});
</script>
```

## 4. Set the theme color of the Badge.

You can configure the Badge [themeColor](/api/javascript/ui/badge/configuration/themecolor).

```html
<span id="badge">Badge</span>

<script>    
    $("#badge").kendoBadge({
		themeColor: 'success'		
	});
</script>
```


## Reference Existing Badge Instance

To refer to an existing Badge instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [Badge API](/api/javascript/ui/badge) to control its behavior.

        var badge = $("#badge").data("kendoBadge");


## See Also 

* [Demo Page for the Badge](https://demos.telerik.com/kendo-ui/badge/index)
* [JavaScript API Reference of the Badge](/api/javascript/ui/badge)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
