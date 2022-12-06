---
title: Getting Started
page_title: jQuery ChipList Documentation - Getting Started with the ChipList
description: "Get started with the jQuery ChipList by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_chiplist_widget
position: 2
---

# Getting Started with the ChipList

This guide demonstrates how to get up and running with the Kendo UI for jQuery ChipList. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<span id="chiplist"></span>

	<script>    
	    $("#chiplist").kendoChip({
        items: [
				    { icon: 'plus', label: 'Add' },
				    { icon: 'pencil', label: 'Edit' },
				    { icon: 'trash', label: 'Remove' },
				]
        });
	</script>
```

## 1. Create a Select Element

First, create a `<span>` element on the page where you will initialize the ChipList.

```html
<span id="chiplist"></span>
```

## 2. Initialize the ChipList

When you initialize the widget, all settings of the ChipList will be provided in the script statement. Describe the configuration and event handlers of the widget in JavaScript.

```html
<span id="chiplist"></span>

<script>
    // Target the span element by using jQuery and then call the kendoChipList() method.
    $("#chiplist").kendoChipList();
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the ChipList. 

## 3. Add Items with Labels

You can add individual Chip items by passing objects to the [`items`](/api/javascript/ui/chiplist/configuration/items) array. For more information about the configurations of the different chips inside the ChipList, refer to the article on the [Customizing the ChipList]({% slug customization_kendoui_chiplist_widget %}).

```html
	<span id="chiplist"></span>

	<script>    
	    $("#chiplist").kendoChipList({
            items: [
                { label: 'Add' },
                { label: 'Edit' },
                { label: 'Remove' },
            ]
        });
	</script>
```

## 4. Add Icons to the Chips inside the ChipList

Now you can use the [`items.icon`](/api/javascript/ui/chiplist/configuration/items.icon) option which allows you to display a label on the Chips inside the ChipList.

```html
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { icon: 'plus', label: 'Add' },
                { icon: 'pencil', label: 'Edit' },
                { icon: 'trash', label: 'Remove' },
            ]
        });
    </script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the ChipList](https://demos.telerik.com/kendo-ui/chiplist/index)

## See Also 

* [JavaScript API Reference of the ChipList](/api/javascript/ui/chiplist)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
