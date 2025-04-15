---
title: Icons
page_title: jQuery Menu Documentation - Icons
description: "Learn how you can show icons in the Menu from a field in the dataSource."
slug: icons_kendoui_menu
position: 6
---

# Icons

Starting with Kendo UI for jQuery R2 2025, the Menu exposes two new icon-related fields&mdash;the [`dataIconField`](/api/javascript/ui/menu/configuration/dataiconfield) and the [`dataIconClassField`](/api/javascript/ui/menu/configuration/dataiconclassfield) options. Depending on your project's needs, you can enhance the content of the Menu by displaying either an SVG or a Font Icon. To display an icon in the items of the Menu, select one from the <a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/" target="_blank">list of icons supported by Kendo UI for jQuery</a>, and set the `icon` field to the necessary icon name. 

## SVG Icon

The following example demonstrates how to configure an SVG icon in the Menu's `dataSource`, and how to set a custom class for the first Menu item.

```dojo
    <ul id="menu"></ul>

    <script>
       var menu = $("#menu").kendoMenu({
            dataTextField:"text",
            dataIconField:"iconName",
            dataIconClassField:"iconClass",
            dataSource:[
                {text: "Home", iconName: "home", iconClass: "custom-icon-class"}, 
                {text: "About Us", iconName: "info-circle"},
                {text: "Contact", iconName: "envelope"}
            ]
        }).data("kendoMenu");      
    </script>
```

## Font Icon

The following example demonstrates how to configure a font icon in the Menu's `dataSource`.

```dojo
   <ul id="menu"></ul>
   <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
    <script>
        kendo.setDefaults("iconType", "font")
        $("#menu").kendoMenu({
            dataSource:[
                {text: "Home", icon: "home"}, 
                {text: "About Us", icon: "info-circle"},
                {text: "Contact", icon: "envelope"}
            ]
        })     
    </script>
```

## Icon Position

Staring with the Kendo UI for jQuery R2 2025 release, you can choose to display the icons before (default) or after the text. The following example shows how to display the icons after the item text.

```dojo
   <ul id="menu"></ul> 
    <script> 
        $("#menu").kendoMenu({
            iconPosition: "after",
            dataSource:[
                {text: "Home", icon: "home"}, 
                {text: "About Us", icon: "info-circle"},
                {text: "Contact", icon: "envelope"}
            ]
        })     
    </script>
```

## See Also

* [Basic Usage of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/index)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/api)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
