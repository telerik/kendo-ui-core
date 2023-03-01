---
title: Getting Started
page_title: jQuery Button Documentation - Getting Started with the Button
description: "Get started with the jQuery Button by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_button_widget
position: 2
---

# Getting Started with the Button

This guide demonstrates how to get up and running with the Kendo UI for jQuery Button. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<button id="btn">My Button</button>

	<script>    
	    $("#btn").kendoButton({
			icon: "pencil",
			badge: {
	            text: "!Note",            
	            themeColor: "warning",
	            shape: "circle"
	        }
		});
	</script>
```

## 1. Create a select Element

First, create a `<button>` element on the page from which the Button widget will be initialized.

```html
<button id="btn">My Button</button>
```

## 2. Initialize the Button 

While you can initialize the Button from any element and with any content, it is intuitive to use the `button` or the `a` element. When you use a `button` element inside a `form`, the default `type` HTML attribute for buttons is `submit` and clicking the button will submit the form and reload the page. To change this behavior, use an explicit `type="button"` HTML attribute.

In this step, you will initialize the Button from the `<button>` element. When you initialize the widget, all settings of the Button will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
<button id="btn">My Button</button>

<script>
    // Target the button element by using jQuery and then call the kendoButton() method.
    $("#btn").kendoButton();
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the Button. 

## 3. Add an Icon

You can display an icon in the Button by configuring the [`icon`](/api/javascript/ui/button/configuration/icon). For more information about the variety of the icons supported by the Button, refer to the article on the [Icon Button]({% slug icons_button %}).

```html
<button id="btn">My Button</button>

<script>    
    $("#btn").kendoButton({
		icon: "pencil"
	});
</script>
```

## 4. Add a Badge to the Button

Now you can use the [`badge`](/api/javascript/ui/button/configuration/badge) option which allows you to display a Badge element over the Button.

```html
<button id="btn">My Button</button>

<script>    
    $("#btn").kendoButton({
		icon: "pencil",
		badge: {
            text: "!Note",            
            themeColor: "warning",
            shape: "circle"
        }
	});
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Button](https://demos.telerik.com/kendo-ui/button/index)

## See Also 

* [JavaScript API Reference of the Button](/api/javascript/ui/button)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>