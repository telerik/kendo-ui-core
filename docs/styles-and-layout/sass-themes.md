---
title: SASS-Based Themes
page_title: SASS-Based Themes | Kendo UI Styles and Appearance
description: "Learn how to define CSS classes in the Kendo UI desktop widgets to change their appearance and further customize their style."
slug: sassbasedthemes_kendoui
position: 2
---

# SASS-Based Themes

As of the R1 2017 release, the Kendo UI distribution has included SASS-based themes. 

## Overview

Apart from being written in a different language, the SASS-based themes demonstrate subtle differences from the LESS-based ones. This article outlines those differences and shows how you can use the SASS-based themes.

Currently, Kendo UI delivers a single SASS theme that is available. This is the Kendo UI Default v2 theme which is a modern update of the Kendo UI Default theme. 

The work on revamping the Kendo UI Bootstrap theme has also started and the new theme is soon expected to be available. 

## Differences 

In Kendo UI, the SASS-based themes demonstrate the following differences from the LESS-based ones:

- Each SASS-based theme is represented by a single CSS file that combines the layout and the themes of the components. As a result, you do not need to match a theme with its common file.
- Based on the widget you work with, the SASS-based themes can build a part of the widget theme in a similar way the Download Builder trims unused scripts.
- The SASS-based themes are available on NPM. Each theme is available as an NPM package and can be easily upgraded.
- Each SASS-based theme is compatible with the [Kendo UI for Angular 2](http://www.telerik.com/kendo-angular-ui/) components. This enables you to port parts of your application to Angular 2 while maintaining their styling.

## Getting the Themes

To get the SASS-based Kendo UI themes, you can:

* Use the pre-build CSS files.
* Use the NPM packages. 

### Using Pre-Built CSS

To get a complete theme by using its pre-built CSS files, apply either of the following approaches:

- Use the CSS files that are shipped with the Kendo UI distribution.
- Use the NPM package which contains a pre-built `dist/all.css` CSS file.

### Using NPM Packages

The SASS-based themes are available on the Progress NPM registry. 

Currently, Kendo UI delivers the Kendo UI Default v2 package available as @progress/kendo-theme-default.

## Customizing the Themes

To customize a SASS-based theme, create a `.scss` file and consume the theme package in the following way:

1. Obtain the theme source through the NPM package.

        npm install @progress/kendo-theme-default

2. Create a `.scss` file that will consume the theme. For the purposes of the this example, this is `styles.scss`.

3. To build the theme files, import them into the file.

        @import "node_modules/@progress/kendo-theme-default/scss/all";

   To include the styles of specific widgets, use their names in the path.

        @import "node_modules/@progress/kendo-theme-default/scss/grid";
        @import "node_modules/@progress/kendo-theme-default/scss/treeview";

4. To customize the variables that are used in the theme, change the theme before you import the theme files.

        $accent: #E82C0C; // brand color

        @import "node_modules/@progress/kendo-theme-default/scss/all";

5. Build the `styles.scss` file through a SASS compiler. For example, use `node-sass`.

        node-sass styles.scss styles.css

## Contribution

To contribute to the development of the Kendo UI Default v2 theme, checkout the [telerik/kendo-theme-default](https://github.com/telerik/kendo-theme-default) GitHub repositiory it is stored in. 

## See Also 

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
