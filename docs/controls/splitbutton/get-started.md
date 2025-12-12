---
title: Getting Started
page_title: jQuery SplitButton Documentation - Getting Started with the SplitButton
description: "Get started with the jQuery SplitButton by Kendo UI and learn how to create, initialize, and enable the component."
components: ["splitbutton"]
slug: getting_started_kendoui_splitbutton_widget
position: 2
---

# Getting Started with the SplitButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery SplitButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <button id="splitbutton" type="button">Button</button>

   <script>
       $("#splitbutton").kendoSplitButton({
            icon: "gear",
            items:[
               { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
               { id: "item2", text: "Item2", icon: "check", attributes: { "data-context": "some arbitrary data" }, enabled:false },
               { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" },
            ]
       }); 
    </script> 
```

## 1. Create a Button Element

Create a `<button>` element on the page and use it as an initialization element for the SplitButton.

```html
   <button id="splitbutton" type="button">Button</button>
```

## 2. Initialize the SplitButton

In this step, you will initialize the SplitButton from the `<button>` element. All settings of the SplitButton will be provided in the script statement and you have to describe its layout and configuration in JavaScript.

```html
   <button id="splitbutton" type="button">Button</button>

   <script>
       $("#splitbutton").kendoSplitButton(); 
    </script>
```

## 3. Add Items for the SplitButton

Next, you can configure the items in the popup by using the [`items`](/api/javascript/ui/splitbutton/configuration/items) option.

```html
   <button id="splitbutton" type="button">Button</button>

   <script>
       $("#splitbutton").kendoSplitButton({
            items:[
               { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
               { id: "item2", text: "Item2", icon: "check", attributes: { "data-context": "some arbitrary data" }, enabled:false },
               { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" },
            ]
       }); 
    </script> 
```

## 4. Add Icon to the SplitButton

You can add an icon to the SplitButton by utilizing the [`icon`](/api/javascript/ui/splitbutton/configuration/icon) option.

```html
   <button id="splitbutton" type="button">Button</button>

   <script>
       $("#splitbutton").kendoSplitButton({
            icon: "gear",
            items:[
               { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
               { id: "item2", text: "Item2", icon: "check", attributes: { "data-context": "some arbitrary data" }, enabled:false },
               { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" },
            ]
       }); 
    </script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/index)
* [Appearance of the SplitButton]({% slug appearance_kendoui_splitbutton_widget %})

## See Also

* [JavaScript API Reference of the jQuery SplitButton](/api/javascript/ui/splitbutton)
* [Knowledge Base Section](/knowledge-base)


