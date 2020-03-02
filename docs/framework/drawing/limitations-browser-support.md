---
title: Limitations and Browser Support
page_title: Limitations and Browser Support | Kendo UI Drawing Library
description: "Learn about the browsers which the Kendo UI Drawing API supports."
previous_url: /framework/drawing/drawing-dom#known-limitations
slug: supportedbrowsers_drawingapi
position: 7
---

# Limitations and Browser Support

Due to the specifics of their implementation, both the Drawing library and the [PDF Export implementations]({% slug introduction_pdfexport_kendoui %}) share certain limitations.

* [General behavior](#general-behavior)
* [Elements and styles](#elements-and-styles)
* [Images](#images)
* [Cross-origin resources](#cross-origin-resources)
* [Page breaking in elements](#page-breaking-in-elements)
* [Limitations and Browser Support](#supported-browsers)

### General

- The drawing of HTML elements provides no right-to-left (RTL) support.
- Exporting might not work when loading the page from a local file (`file://` protocol) due to CORS restrictions.
- The PDF export of vertically aligned elements is not fully compatible with automatic page-breaking and might lead to undesired side effects.
- Browser zoom levels that are lower than 100% are not supported.
- The PDF v.1.5 specification limits the maximum document size to 5080mm x 5080mm (200 x 200 inches). As a result, larger files might not open in some viewers.
- The PDF export of the Shadow DOM is not supported.
- Complex letters (ligatures) are not supported and some of them are not rendered.
- The maximum file size of the exported PDF document has a system- and browser-specific limit&mdash;use a server-side solution for large documents.

## Elements and Styles

- The content of the `<iframe>` and `<svg>` elements is not processed. It will not be exported by the Drawing API.
- The rendering of `<select>` elements is not precise and might lead to layout issues such as wrong padding or a missing drop-down arrow&mdash;instead of a plain `<select>` element, use the Kendo UI DropDownList component.
- Of the border styles, the PDF export of `solid` is only supported.
- The PDF export of `border-collapse:collapse` table style is not supported. To prevent double borders in the PDF output, avoid using adjacent borders for separate table cells.
- While the `box-shadow`, `text-shadow`, and `radial` CSS gradients are not exported in PDF, `linear` is supported.
- Elements with `position: fixed` are not displayed in the output and are skipped over by the algorithm.
- Vertical texts which use the `vertical-rl` or `vertical-lr` values of the [`writing-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) property are not exported.
- Overflowing text is clipped and `text-overflow: ellipsis` is not supported.
- A `<canvas>` will be rendered as an image, but only if it is non-tainted, meaning if it does not display images from another domain.
- SVG referenced with the `<img>` tag will not render in Internet Explorer, because [IE taints the canvas](http://stackoverflow.com/questions/31484379/ie-canvas-datauri-security-error).

## Images

- Only the export of images with correct extensions is supported. For example, a PNG image with a JPG extension that is displayed on a page might not show up in the exported PDF file or might cause exceptions in the PDF reader.
- Images without permissive [Cross-Origin HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) will not be rendered.
- Internet Explorer 9 is not be able to load images or fonts from another domain, and could raise an uncatchable security exception. If you need to support Internet Explorer 9, make sure to host images and fonts on the same domain as the application.
- Images will not be exported in IE if their source is an SVG document. These are considered to be tainted.

## Cross-Origin Resources

- Fonts and images hosted on different domains are exported/embedded only if the server provides permissive [Cross-Origin HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
- Internet Explorer 9 is not able to load images or fonts from another domain and might raise a security exception. If your application supports Internet Explorer 9, make sure that you host images and fonts on the same domain as the application.
- A `<canvas>` is rendered as an image only if it is not tainted&mdash;that is, only if it does not display images from another domain.

## Page Breaking in Elements

Page breaking happens only inside text nodes. Therefore, if an element has no text content, it cannot be split across pages. For example, an `<img>` or a `<div>`, which has perhaps a border or background image, but otherwise no content, is not split. If such elements fall on a page boundary, they are moved to the next page along with all the following DOM nodes. If they do not fit on a single page, they are truncated.

The following nodes do not support automatic page breaking:

    * `<img>`
    * `<tr>`
    * `<iframe>`
    * `<svg>`
    * `<object>`
    * `<canvas>`
    * `<input>`
    * `<textarea>`
    * `<select>`
    * `<video>`

 Positioned elements (`position: absolute`) do not support automatic page breaking. Elements with the `position: fixed` configuration are not supported at all. They will not show up in the output and are skipped over by the algorithm. For example, the input on an A4 page, which is demonstrated in the following example, will only display the **Foo** and the **Baz** paragraphs in the output file and the positioned `<div>` element will appear on the first page at height 1000. Because this dimension is beyond the page boundary, the content will be clipped.

```
    <p>Foo</p>
        <div style="position: absolute; top: 1000px">Bar</div>
    <p>Baz</p>
```

If the algorithm moves a node to the next page and even if the space to position it on the current page might be sufficient, all DOM nodes which follow it will be moved as well.

The following example demonstrates floating elements that acquire this behavior.

```
    <p>
      some text before
      <img style="float: left" ... />
      some text after
    </p>
```

This element might end up in a position where the whole text fits on the current page but the image is higher and would fall on the boundary. In this case, the image and a part of the following text will move to the next page.

## Browser Support

* Internet Explorer 9 and later
* Latest Chrome, Firefox, Safari, and Blink-based Opera versions

Because of browser limitations and CORS-related security restrictions, PDF export is not supported for mobile&mdash;for example, locally stored font files cannot be loaded in hybrid applications. While in specific scenarios PDF export might still work on mobile devices, it is not supported by mobile browsers and hybrid applications.

The [Kendo UI Drawing API](https://demos.telerik.com/kendo-ui/drawing/index) adapts to the browser capabilities by using dedicated [`Surface`](/api/dataviz/drawing/surface) implementations.

The [`Surface.create`](/api/dataviz/drawing/surface#create) method uses feature detection to determine the default `surface` type. Surfaces are listed in their order of preference. You can request a specific [`type`](/api/dataviz/drawing/surface#configuration-type), such as `canvas`, if desired. The preference will be ignored if no support is provided by the browser.

| Surface | IE   | Chrome| Firefox | Safari | iOS | Android
| ---     | ---  | ---   | ---     | ---    | --- | ---
| SVG     | 9+   | ✓     | ✓       | ✓      | ✓   | 4+
| Canvas  | 10+  | ✓     | ✓       | ✓      | ✓   | ✓

For more information on the provided [browser support]({% slug wbe_browserand_operating_system_support %}), refer to the section on [PDF export]({% slug wbe_browserand_operating_system_support %}#pdf-export).

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Exporting Drawings to Images]({% slug exportpng_kendoui_drawingapi %})
* [Exporting Drawings to SVG]({% slug exportingtosvg_drawing %})
