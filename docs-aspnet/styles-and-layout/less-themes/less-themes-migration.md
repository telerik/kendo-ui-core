---
title: Less to Sass Theme Migration
page_title: LESS to SASS Theme Migration
description: "Learn how to migrate from a LESS to a SASS theme."
previous_url: /styles-and-layout/less-themes-migration
slug: less_themes_migration
position: 3
---

# LESS to SASS Theme Migration

In this article you will learn how to migrate your project from a LESS theme to a SASS theme. If you are not sure whether you are using a LESS theme, check the following section of the [Components Rendering Overview]({% slug components_rendering_overview %}#how-do-i-know-if-i-am-using-a-less-theme) article.

For additional information about the SASS themes, visit the [`SASS-Based Themes`](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) article.

## Why Do I Need to Migrate to a SASS Theme?

> The LESS-based themes support only the default values of the new [Components Styling Options]({% slug components_rendering_overview %}#styling-options).

The LESS-based themes will receive the new [styling options]({% slug components_rendering_overview %}#styling-options) just like the SASS themes, however after 2022 the LESS themes will be officially deprecated. Customers who continue to use LESS themes after their deprecation will not be able to take advantage of the newest visual updates, features and bug fixes. This also means that Telerik UI for {{ site.framework }} versions starting from 2023 will be incompatible with the LESS themes and you won't be able to use the new versions with the LESS themes.

The SASS-based themes provide unique swatches that are based on the main theme and can be updated at once. This allows us to change the design and color scheme of our components in a more timely manner which in turn leaves more time for new themes and swatches to be developed.

With the LESS-based themes, each individual theme has its own code base. When a new component is introduced, or an existing one is updated, we must recreate each LESS theme to ensure that the new addition is rendered without problems. As a result, keeping the LESS-based themes updated takes a tremendous amount of time and resources.

Ultimately, the goal behind these changes is to allow us to free resources which will be used to update existing SASS themes and also create new themes that have been requested by our clients.

## How Do I Migrate to a SASS Theme?

The migration to a SASS theme is straightforward:

1. Remove the old LESS theme references, for example:

   ```html
        <!-- The following styles are required for the LESS Default theme. -->
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.default.min.css" />
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.default.mobile.min.css" />
   ```

1. Add a reference to the SASS theme that you want to use, for example:

   ```html
        <!-- The following styles are required for the SASS Default theme. -->
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.default-main.min.css" />
   ```

With the new rendering of the components, some of CSS classes used in the old rendering will be removed. If you use any of those classes to customize a component, you will have to update the selectors of your custom CSS rules. Otherwise the customizations will no longer work. For more details, see the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) section of the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

## How Do I Know Which SASS Theme Corresponds to My Current LESS Theme?

The LESS themes have SASS swatches which are under the `Classic` theme.

![Classic Swatches](images/theme-builder-classic-swatches.png)

The following table contains the name of the LESS theme and its SASS counterpart:

| LESS Theme   | SASS Theme | Status | SASS Theme CDN
|:---         |:---        |:---        |:---
| `Default` | `Classic Theme - Main` | Available | https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.classic-main.min.css |
| `Blue Opal` | `Classic Theme - Opal` | Available | https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.classic-opal.min.css |
| `Silver` | `Classic Theme - Silver` | Available | https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.classic-silver.min.css |
| `Fiori` | `Classic Theme - Fiori` | In Progress | N/A |
| `Flat` | `Classic Theme - Flat` | In Progress | N/A |
| `High Contrast` | `Classic Theme - High Contrast` | In Progress | N/A |
| `Metro` | `Classic Theme - Metro` | In Progress | N/A |
| `Metro Black` | `Classic Theme - Metro Black` | In Progress | N/A |
| `Moonlight` | `Classic Theme - Moonlight` | In Progress | N/A |
| `Nova` | `Classic Theme - Nova` | In Progress | N/A |
| `Office 365` | `Classic Theme - Office 365` | In Progress | N/A |
| `Uniform` | `Classic Theme - Uniform` | In Progress | N/A |

> The Bootstrap and Material LESS themes will not have their own SASS swatches. The dedicated Bootstrap and Material SASS themes should be used instead.

The following example shows how to add the Clasic SASS theme to your project:

```html
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/2021.3.1207/styles/kendo.classic-main.min.css" /> 
```

The reference above must be added to the `head` element of the Layout.

## Which Styling Options Are Available For the LESS Themes?

The LESS-based themes support only the default values of the new [Components Styling Options]({% slug components_rendering_overview %}#styling-options). If you wish to utilize the full potential of the new rendering of the components, you must use a SASS-based theme or swatch.

## See More

* [Telerik and Kendo UI LESS Themes future plans blog post](https://www.telerik.com/blogs/future-plans-telerik-kendo-ui-less-themes)
* [Styling Overview Article]({% slug components_rendering_overview %})
