---
title: Getting Started
page_title: jQuery DropDownButton Documentation - Getting Started with the DropDownButton
description: "Get started with the jQuery DropDownButton by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_dropdownbutton_widget
position: 1
---

# Getting Started with the DropDownButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery DropDownButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <button id="dropdownbutton" type="button">Button</button>

   <script>
       $("#dropdownbutton").kendoDropDownButton({
            items:[
               { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
               { id: "item2", text: "Item2", icon: "gear", attributes: { "data-context": "some arbitrary data" }, enabled:false },
               { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" },
            ]
       }); 
    </script> 
```

## 1. Create a Button Element

Create a `<button>` element on the page and use it as an initialization element for the DropDownButton.

```html
   <button id="dropdownbutton" type="button">Button</button>
```

## 2. Initialize the DropDownButton

In this step, you will initialize the DropDownButton from the `<button>` element. All settings of the DropDownButton will be provided in the script statement and you have to describe its layout and configuration in JavaScript.

```html
   <button id="dropdownbutton" type="button">Button</button>

   <script>
       $("#dropdownbutton").kendoDropDownButton(); 
    </script>
```

## 3. Add Items for the DropDownButton

Next, you can configure the items in the popup by using the [`items`](/api/javascript/ui/dropdownbutton/configuration/items) option.

```html
   <button id="dropdownbutton" type="button">Button</button>

   <script>
       $("#dropdownbutton").kendoDropDownButton({
            items:[
               { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
               { id: "item2", text: "Item2", icon: "gear", attributes: { "data-context": "some arbitrary data" }, enabled:false },
               { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" },
            ]
       }); 
    </script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/index)
* [Appearance of the DropDownButton]({% slug appearance_kendoui_dropdownbutton_widget %})

## See Also

* [JavaScript API Reference of the jQuery DropDownButton](/api/javascript/ui/dropdownbutton)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
