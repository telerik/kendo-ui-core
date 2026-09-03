---
title: How to load styles, fonts, and icons in UI for ASP.NET MVC
description: "Learn how to configure compatible styles, fonts, and icons for your {{ site.product }} MVC applications."
type: how-to
page_title: Load Styles, Fonts, and Icons in UI for ASP.NET MVC
slug: loading-styles-fonts-icons-mvc
tags: asp.net mvc, styles, icons, sass themes, configuration
ticketid: 1717807
ticketed: true
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>{{ site.mvcCoreVersion }}</td>
 </tr>
</table>

## Description

When styles, fonts, or icons do not render correctly, the application may reference incompatible or incomplete client-side resources.

This issue commonly occurs after a theme upgrade, migration from LESS to SASS themes, or migration from font icons to SVG icons.

This article explains how to load the required resources in a {{ site.product }} application and how to troubleshoot missing icons.

## Cause

A {{ site.product }} application requires both the server-side assemblies and the client-side JavaScript and CSS resources.

The SASS theme CSS file contains the component styles. Font icon styles are separate from the theme and must be registered separately when the application uses font icons.

Starting with the R2 2023 release, SVG is the default icon type. Legacy font icon markup, such as `k-icon k-i-folder`, requires the font icon stylesheet and the `k-font-icon` class.

## Solution

### Load the Client-Side Resources

Use one compatible version of the {{ site.product }} scripts and one compatible SASS theme. Load the resources in the following order:

1. Load one SASS theme stylesheet.
1. Load the font icon stylesheet if the application uses font icons.
1. Load jQuery.
1. Load optional dependencies, such as JSZip, before the Kendo UI scripts when the application uses export features.
1. Load `kendo.all.min.js`.
1. Load `kendo.aspnetmvc.min.js` after `kendo.all.min.js`.

The following example uses the current MVC documentation versions:

```HTML
<link rel="stylesheet"
      href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
<link rel="stylesheet"
      href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.aspnetmvc.min.js"></script>
```

JSZip is optional. Include it only when the application uses a feature that requires it, such as Excel or PDF export.

The CDN and package versions must match the `Kendo.Mvc.UI` version used by the application. The theme version must also be compatible with the UI version.

Do not register multiple Telerik theme files at the same time. Replace the theme file when upgrading the UI version.

### Use Local Resources

When using local resources, copy the `js` and `styles` folders from the UI archive into the application.

For a traditional MVC application, place the files in folders such as:

- `Scripts/kendo` for JavaScript files.
- `Content/kendo` for theme CSS files.

Register the Kendo UI scripts after the jQuery bundle:

```C#
bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
    "~/Scripts/kendo/kendo.all.min.js",
    "~/Scripts/kendo/kendo.aspnetmvc.min.js"));
```

Reference one SASS theme file from the application layout:

```HTML
<link rel="stylesheet" href="~/Content/kendo/default-main.css" />
```

Render the jQuery and Kendo UI bundles in this order:

```Razor
@Scripts.Render("~/bundles/jquery")
@Scripts.Render("~/bundles/kendo")
```

If the application uses font icons, also reference the `index.css` file from the `kendo-font-icons` package or the downloaded font icon resources.

### Render Font Icons

To use the legacy font icon classes, register the font icon stylesheet and add the `k-font-icon` class:

```HTML
<link rel="stylesheet"
      href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />

<a href="#">
    <span class="k-icon k-font-icon k-i-folder" aria-hidden="true"></span>
    Documents
</a>
```

The `k-icon k-i-folder` class combination without the font icon stylesheet or `k-font-icon` class may not render the expected glyph.

For the complete list of available font icons, see [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %}).

### Render SVG Icons

SVG is the default icon type in current Telerik and Kendo UI themes. To render an SVG icon, use the `kendo.ui.icon` utility:

```HTML
<span id="folderIcon"></span>

<script>
    kendo.ui.icon($("#folderIcon"), { icon: "folder" });
</script>
```

You can also explicitly configure the default icon type on the server in `Global.asax.cs`:

```C#
KendoMvc.Setup(x =>
{
    x.IconType = IconType.Svg;
});
```

Use the font icon configuration only when the application depends on legacy font icon markup or custom font icon CSS.

### Migrate from LESS to SASS Themes

If the application references multiple LESS theme files, such as `kendo.common.min.css` and `kendo.default.min.css`, migrate to one compatible SASS theme file.

For example, replace the LESS references with:

```HTML
<link rel="stylesheet"
      href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
```

After migrating, review custom CSS selectors. Some CSS classes from the old component rendering may no longer exist in the new rendering.

For more information, see [LESS to SASS Theme Migration]({% slug less_themes_migration %}).

### Verify the Configuration

Check the following items when styles or icons are missing:

1. Confirm that the theme CSS file is accessible and that the application loads only one Telerik theme.
1. Confirm that the theme version is compatible with the {{ site.product }} version.
1. Confirm that jQuery loads before `kendo.all.min.js`.
1. Confirm that `kendo.aspnetmvc.min.js` loads after `kendo.all.min.js`.
1. Confirm that the font icon stylesheet loads when the application uses font icon classes.
1. Confirm that the icon markup uses either the documented font icon classes or the SVG icon utility.
1. Check the browser developer tools for failed requests and JavaScript errors.

## See Also

- [Providing Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
- [Using Local Files]({% slug using_local_client_side_resources %})
- [SASS-Based Themes]({% slug sassbasedthemes_overview %})
- [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %})
- [Migrating Font Icons to SVG]({% slug font_icons_migration %})
- [Components Rendering Overview]({% slug components_rendering_overview %})