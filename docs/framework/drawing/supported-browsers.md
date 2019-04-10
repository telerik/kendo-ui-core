---
title: Supported Browsers
page_title: Supported Browsers | Kendo UI Drawing Library
description: "Learn about the browsers which the Kendo UI Drawing API supports."
slug: supportedbrowsers_drawingapi
position: 6
---

# Supported Browsers

The [Kendo UI Drawing API](http://demos.telerik.com/kendo-ui/drawing/index) adapts to the browser capabilities by using dedicated [`Surface`](/api/dataviz/drawing/surface) implementations.

The [`Surface.create`](/api/dataviz/drawing/surface#create) method uses feature detection to determine the default `surface` type. Surfaces are listed in their order of preference. You can request a specific [`type`](/api/dataviz/drawing/surface#configuration-type), such as `canvas`, if desired. The preference will be ignored if no support is provided by the browser.

| Surface | IE   | Chrome| Firefox | Safari | iOS | Android
| ---     | ---  | ---   | ---     | ---    | --- | ---
| SVG     | 9+   | ✓     | ✓       | ✓      | ✓   | 4+
| Canvas  | 10+  | ✓     | ✓       | ✓      | ✓   | ✓

For more information on the provided [browser support]({% slug wbe_browserand_operating_system_support %}), refer to the section on [PDF export]({% slug wbe_browserand_operating_system_support %}#pdf-export).

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
