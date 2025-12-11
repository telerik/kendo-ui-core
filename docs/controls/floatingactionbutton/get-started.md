---
title: Getting Started
page_title: jQuery FloatingActionButton Documentation - Getting Started with the FloatingActionButton
description: "Get started with the jQuery FloatingActionButton by Kendo UI and learn how to create, initialize, and enable the component."
components: ["floatingactionbutton"]
slug: getting_started_kendoui_floatingactionbutton_widget
position: 2
---

# Getting Started with the FloatingActionButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery FloatingActionButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <button id="fab" type="button">Button</button>

   <script>
      $("#fab").kendoFloatingActionButton({
        icon: 'info-circle',
        items:[
          { label: "Item1", icon: 'check', click: function(ev){alert("Item 1 clicked!");} },
          { label: "Item2", icon: "calendar", enabled:false },
          { label: "Item3", icon: 'print'},
        ]
      }); 
   </script> 
```

## 1. Create a Button Element

Create a `<button>` element on the page and use it as an initialization element for the FloatingActionButton.

```html
   <button id="fab" type="button"></button>
```

## 2. Initialize the FloatingActionButton

In this step, you will initialize the FloatingActionButton from the `<button>` element. All settings of the FloatingActionButton will be provided in the script statement and you have to describe its layout and configuration in JavaScript.

```html
   <button id="fab" type="button">Button</button>

   <script>
       $("#fab").kendoFloatingActionButton(); 
    </script>
```

## 3. Add Items for the FloatingActionButton

Next, you can configure the items in the popup by using the [`items`](/api/javascript/ui/floatingactionbutton/configuration/items) option.

```html
   <button id="fab" type="button">Button</button>

   <script>
       $("#fab").kendoFloatingActionButton({         
         items:[
           { label: "Item1", icon: 'check', click: function(ev){alert("Item 1 clicked!");} },
           { label: "Item2", icon: "calendar", enabled:false },
           { label: "Item3", icon: 'print'},
         ]
      }); 
    </script> 
```

## 4. Add Icon to the FloatingActionButton

You can add an icon to the FloatingActionButton by utilizing the [`icon`](/api/javascript/ui/floatingactionbutton/configuration/icon) option.

```html
   <button id="fab" type="button"></button>

   <script>
       $("#fab").kendoFloatingActionButton({
            icon: 'info-circle',
            items:[
              { label: "Item1", icon: 'check', click: function(ev){alert("Item 1 clicked!");} },
              { label: "Item2", icon: "calendar", enabled:false },
              { label: "Item3", icon: 'print'},
            ]
       }); 
    </script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/index)
* [Appearance of the FloatingActionButton]({% slug appearance_floatingactionbutton_widget %})

## See Also

* [JavaScript API Reference of the jQuery FloatingActionButton](/api/javascript/ui/floatingactionbutton)
* [Knowledge Base Section](/knowledge-base)


