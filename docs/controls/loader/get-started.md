---
title: Getting Started
page_title: jQuery Loader Documentation - Getting Started with the Loader
description: "Get started with the jQuery Loader by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_loader_widget
position: 1
---

# Getting Started with the Loader

This guide demonstrates how to get up and running with the Kendo UI for jQuery Loader.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <span id="loader"></span> 

   <script>
        $('#loader').kendoLoader({
            size: "large",
            type: 'infinite-spinner'
        });
   </script>
```

## 1. Create a Span Element

Create an empty `<span>` element on the page and use it as an initialization element for the Loader.

```html
   <span id="loader"></span> 
```

## 2. Initialize the Loader

In this step, you will initialize the Loader from the `<span>` element. All settings of the Loader will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
   <span id="loader"></span> 

   <script>
       $("#loader").kendoLoader(); 
    </script>
```

## 3. Set the Size

The Loader provides a [`size`](/api/javascript/ui/loader/configuration/size) option that allows you to change its dimensions:

```html
   <span id="loader"></span> 

   <script>
       $("#loader").kendoLoader({
         size: "large"
       }); 
    </script>
```

## 4. Set the Loader Type

The component has a [`type`](/api/javascript/ui/loader/configuration/type) option which allows you to change the Loader icon:

```html
   <span id="loader"></span> 

   <script>
        $('#loader').kendoLoader({
            size: "large",
            type: 'infinite-spinner'
        });
   </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Appearance of the Kendo UI for jQuery Loader]({% slug appearance_kendoui_loader %})

## See Also

* [JavaScript API Reference of the jQuery Loader](/api/javascript/ui/loader)
* [Knowledge Base Section](/knowledge-base)


