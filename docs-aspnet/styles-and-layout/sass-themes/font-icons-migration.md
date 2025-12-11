---
title: Migrating Font Icons to SVG
page_title: Migrating Font Icons to SVG Icons
description: "Learn how to migrate from font icons to SVG icons when using the {{ site.product }} UI components."
components: ["general"]
slug: font_icons_migration
position: 8
---

# Migrating from Font Icons to SVG Icons

Starting with version R2 2023, the default icon type in the Telerik and Kendo UI themes has changed from `font` to `svg`. This release marks the next milestone in a series of improvements related to Content Security Policy (CSP) in {{ site.product }}.

In this article, you will learn how to start using SVG icons. To continue using font icons, you can change the type of the icons to `font`.

For more information on using SVG and font icons, visit their dedicated articles:

* [SVG Icons]({% slug svgicons_core_mvc %})
* [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %})

## Switching to SVG Icons 
 
When migrating from font icons to SVG icons, you will face two possible scenarios: 

1. The font icons that you use currently are not customized. 

    The following example shows a font icon without customizations used in {{ site.product }} versions prior to R2 2023: 

    ```HTML
    <span class="k-icon k-i-camera"></span> 
    ```

    To set an SVG icon in R2 2023 and later versions, use the `kendo.ui.icon` utility: 

    ```HTML
    <span id="icon"></span> 

    <script> 
    kendo.ui.icon($("#icon"), { icon: 'camera' }); 
    </script> 
    ```

1. The font icons that you use currently are customized.  

    The following example shows a font icon with a CSS rule that customizes the color of the font icon in {{ site.product }} versions prior to R2 2023:

    ```HTML
    <style> 
        .k-icon { 
        color: red !important; 
        } 
    </style> 

    <span class="k-icon k-i-camera"></span> 
    ```

    To set an SVG icon in R2 2023 and later versions, replace the font icon with an SVG icon by using `kendo.ui.icon` or add `.k-svg-icon` to the selector. 

    ```HTML
    <script> 
        kendo.setDefaults('iconType', 'svg');
    </script> 
    
    <style> 
    .k-icon,
    .k-svg-icon { 
        color: red !important; 
    } 
    </style> 

    <span id="icon"></span>

    <script>
        kendo.ui.icon($("#icon"), { icon: 'camera' }); 
    </script>
    ```
 
## Continuing with Font Icons

To continue using font icons as the default icon type, call the `kendo.setDefaults` method:

```JS
<script>
    kendo.setDefaults('iconType', 'font');
</script>
```

{% if site.core %}
Alternatively, you can set the default icon type in the minimal hosting model of the application.

```C#
    services.AddKendo(x =>
    {
        x.IconType = IconType.Font;
    });
```
{% else %}
Alternatively, you can set the default icon type on the server. Namely, within the `Global.asax.cs` file.

```C#
    KendoMvc.Setup(x =>
    {
        x.IconType = IconType.Font;
    });
```
{% endif %}

## See Also

* [Themes Overview]({% slug sassbasedthemes_overview %})
* [SVG Icons]({% slug svgicons_core_mvc %})
* [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %})
