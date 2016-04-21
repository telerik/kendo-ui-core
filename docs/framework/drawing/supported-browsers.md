---
title: Supported Browsers
page_title: Supported Browsers | Kendo UI Drawing API
description: "Learn about the browsers which the Kendo UI Drawing API supports."
slug: supportedbrowsers_drawingapi
position: 5
---

# Supported Browsers

The [Kendo UI Drawing API](http://demos.telerik.com/kendo-ui/drawing/index) adapts to the browser capabilities by using dedicated [`Surface`](/api/dataviz/drawing/surface) implementations. The [`Surface.create`](/api/dataviz/drawing/surface#create) method uses feature detection to determine the default `surface` type.

## Surfaces by Browser

Surfaces are listed in their order of preference. You can request a specific [`type`](/api/dataviz/drawing/surface#configuration-type), such as `canvas`, if desired. The preference will be ignored if no support is provided by the browser.

| Surface | IE   | Chrome| Firefox | Safari | iOS | Android
| ---     | ---  | ---   | ---     | ---    | --- | ---
| SVG     | 9+   | ✓     | ✓       | ✓      | ✓   | 4+
| Canvas  | 10+  | ✓     | ✓       | ✓      | ✓   | ✓
| VML     | 7+   | ✕     | ✕       | ✕      | ✕   | ✕

## PDF Output

Generating PDF files is supported in Internet Explorer 9 and later and in all other major desktop browsers.

## See Also

Other articles on Kendo UI Drawing API:

* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [Drawing of Basic Shapes]({% slug basicshapes_drawingapi %})
* [Export a Drawing in PDF]({% slug pdfderawingexport_drawingapi %})
* [Drawing of HTML Elements]({% slug drawingofhtmlelements_drawingapi %})
