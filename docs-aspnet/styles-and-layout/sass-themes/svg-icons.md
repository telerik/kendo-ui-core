---
title: SVG Icons
page_title: SVG Icons - Sass Themes
description: "Learn more about what icon fonts are and how to define, implement, and render the available Telerik UI SVG Icons out of the supported list."
slug: svgicons_core_mvc
position: 6
---

# SVG Icons

As of the R1 SP1 2023 release, the Telerik UI toolset supports rendering of SVG icons instead of the traditional [Font icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %}).

> To ensure that all icons are displayed correctly, use one of the supported SASS themes. For installing a SASS theme, go to the article on [adding SASS themes to your Telerik UI project]({% slug sassbasedthemes_installation %}).

## What Are SVG Icons

A Scalable Vector Graphics (SVG) icon is а web-friendly vector file format. Such files can be significantly resized without losing any of their quality, which makes them ideal for logos and complex online graphics. Apart from that, SVGs are written in XML code, meaning they store any text information as literal text rather than shapes. This storing approach allows search engines, like Google, to scan SVG graphics for keywords thus helping websites to move up in search rankings.

## SVG vs. Font Icons

SVG icons provide the following benefits over Font icons:

* High scalability&mdash;In case of low icon resolution, your webpage will not suffer quality losses.
* Customization options&mdash;Unlike the single-color font icons, SVG icons not only allow you to add more colors, but also enable you to animate individual strokes.
* Fewer server requests&mdash;Specifying a font icon in CSS may require you to use the `@font-face` rule and, as a result, the browser will have to request the font file. With SVGs, you do not need to send a server request.
* SEO enhancement&mdash;As SVG icons can be used in the `
<img>` format, you can enhance your search engine optimization practices by using a descriptive filename and proper `alt` text thus enabling search engines to boost website rankings.

## Setting Icons Configuration from Server

To configure the default rendered Icons type directly from the server files of the web app, you can use the approach below:

{% if site.core %}
```C#
            services.AddKendo(x =>
            {
                x.IconType = IconType.Svg/Font;
            });
```
{% else %}
```C#
            KendoMvc.Setup(x=>
            {
                x.IconType = IconType.Svg/Font;
            });
```
{% endif %}

This global configuration will be used by all components that render any elements on the server. To make sure that both client and server use the same global configuration, use the following HTML helper:
```C#
@(Html.Kendo().DefaultSettings())
```

## Setting SVG Icons from Client

With the R1 SP1 2023 release, {{ site.product }} introduced a new `kendo.ui.icon` method. Depending on the global configuration, `kendo.ui.icon` allows you to render either an SVG icon or a Font icon. Through the method, you can also specify the icon over the `iconType` field.

The following example shows how to create an SVG icon by extending an existing HTML element.

```dojo
<span id="icon"></span>

<script>
    kendo.ui.icon($("#icon"), { icon: 'camera' });
</script>
```

The following example shows how to create an SVG icon without an element.

```dojo
<script>
    var icon = kendo.ui.icon('camera');
    $('body').append(icon);
</script>
```

The following example shows how to create a specific SVG icon.

```dojo
<script>
    var icon = kendo.ui.icon({ icon: 'camera', type: 'svg' });
    $('body').append(icon);
</script>
```

The following example shows how to set a custom SVG icon.

 ```dojo
<script>
    var icon = kendo.ui.icon({
        type: 'svg', // if default is svg you can omit this option
        icon: {
            viewBox: '0 0 512 512',
            content: '<path d="M448 128h-64l-64-64H192l-64 64H64c-17.6 0-32 14.4-32 32v288c0 17.6 14.4 32 32 32h384c17.6 0 32-14.4 32-32V160c0-17.6-14.4-32-32-32zM256 416c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112zm64-112c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64z" />'
        }
    });
    $('body').append(icon);
</script>
 ```

The following example shows how to set a custom SVG icon renderer.

 ```dojo
<script>
    var icon = kendo.ui.icon({
        type: (element, options) => `<span class="my-custom-icon"><span class="k-icon k-i-${options.icon}"></span></span>`
        icon: 'camera'
    });
    $('body').append(icon);
</script>
 ```

## Setting Font Icons from Client

Depending on your preference, you can still use Font Icons either through the `iconType` option or through the `kendo.setDefaults` method.

The following example shows how to configure a specific Font icon.

```dojo
<script>
    var icon = kendo.ui.icon({ icon: 'camera', type: 'font' });
    $('body').append(icon);
</script>
```

The following example shows how to globally configure Font icons.

```dojo
<script>
    kendo.setDefaults('iconType', 'font');
    var icon = kendo.ui.icon({ icon: 'camera' });
    $('body').append(icon);
</script>
```
