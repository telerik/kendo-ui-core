---
title: Appearance and styling
---

# Appearance and Styling

The **Kendo UI** DataViz widgets use a mix of browser technologies to attain the required precision and responsiveness.

Visualizations are rendered as vector graphics with computed layout.
In contrast, interactive features are built using traditional HTML elements.

As a result, appearance settings are split between declarative options and traditional CSS.

## Themes and StyleSheets

Kendo UI DataViz widgets arrive with a number of predefined themes:

![Kendo UI DataViz Themes](/dataviz/dataviz-themes.png)

Setting a Kendo UI DataViz theme is a two-step process:

* Set the widget theme option:

    $("#chart").kendoChart({
        theme: "[theme]"
        ...
    });

* Include stylesheets:

1. **kendo.common.css**
1. **kendo.[theme].css**
1. **kendo.dataviz.css**
1. **kendo.dataviz.[theme].css**

Some Kendo UI Web widgets are used internally to implement features such as tooltips, buttons, etc.

The common (base) stylesheets apply styles related to positioning and size, but which are not related to the color scheme and are always required for the widget to
look correct and function properly. The theme stylesheets apply theme-specific styles like colors and backgrounds.

> Be sure to include the CSS files in the specified order. In some cases, the theme CSS file may override base styles as it uses selectors with the same specificity.

## Customizing Appearance

Refer to the API Reference section of each widget for detailed list of appearance settings.
