---
title: Getting Started
page_title: jQuery ToggleButton Documentation - Getting Started with the ToggleButton
description: "Get started with the jQuery ToggleButton by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_togglebutton
position: 2
---

# Getting Started with the ToggleButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery ToggleButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<button id="btn">My ToggleButton</button>

    <script>    
        $("#btn").kendoToggleButton({
            icon: "pencil",
            badge: {
                text: "!Note",            
                themeColor: "success"
            }
        });
    </script>
```

## 1. Create a Button Element

First, create a `<button>` element on the page where you want to initialize the ToggleButton component.

```html
<button id="btn">My ToggleButton</button>
```

## 2. Initialize the ToggleButton

In this step, initialize the ToggleButton from the `<button>` element. When you initialize the component, all settings of the ToggleButton will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
<button id="btn">My ToggleButton</button>

<script>
    // Target the button element by using jQuery and then call the kendoToggleButton() method.
    $("#btn").kendoToggleButton();
</script>
```

After the basic initialization is completed, you can start adding additional configurations to the ToggleButton.

## 3. Add an Icon

You can display an icon in the ToggleButton by configuring the [`icon`](/api/javascript/ui/button/configuration/icon). For more information about the variety of the icons supported by the ToggleButton, refer to the article on the [Icon ToggleButton]({% slug icons_button %}).

```html
<button id="btn">My ToggleButton</button>

<script>    
    $("#btn").kendoToggleButton({
		icon: "pencil"
	});
</script>
```

## 4. Add a Badge to the ToggleButton

Now you can use the [`badge`](/api/javascript/ui/button/configuration/badge) option which allows you to display a Badge element over the ToggleButton.

```html
<button id="btn">My ToggleButton</button>

<script>    
    $("#btn").kendoToggleButton({
		icon: "pencil",
		badge: {
            text: "!Note",            
            themeColor: "success"
        }
	});
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ToggleButton](https://demos.telerik.com/kendo-ui/togglebutton/index)

## See Also

* [JavaScript API Reference of the ToggleButton](/api/javascript/ui/togglebutton)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
