---
title: Appearance
page_title: jQuery Signature Documentation | Signature Appearance
description: "Learn how to modify the appearance of the Kendo UI for jQuery Signature widget."
slug: appearance_kendoui_signature_widget
position: 2
---

# Signature Appearance

The Kendo UI for jQuery Signature enables you to change various appearance aspects about the widget.

The following example demonstrates a Signature widget with custom appearance settings.

```dojo
    <div id="signature"></div>
    <script>
      $(document).ready(function () {
        $("#signature").kendoSignature({
          backgroundColor: "#fad980",
          color: "#212121",
          width: 500,
          height: 200,
          strokeWidth: 4
        });
      });
    </script>
```

## Background Color

To modify the background color of the Signature container, use its [`backgroundColor`](/api/javascript/ui/signature/configuration/backgroundcolor) property.

```html
$("#signature").kendoSignature({
    backgroundColor: "#fad980"
});
```

## Stroke Color

You can also change the stroke color of the Signature by using its [`color`](/api/javascript/ui/signature/configuration/color) property.

```html
$("#signature").kendoSignature({
    color: "#212121"
});
```

## Stroke Width

To update the stroke width of the Signature, utilize its [`strokeWidth`](/api/javascript/ui/signature/configuration/strokewidth) property.

```html
$("#signature").kendoSignature({
    strokeWidth: 4
});
```

## See Also

* [Demo Page for the Signature](https://demos.telerik.com/kendo-ui/signature/index)
* [JavaScript API Reference of the Signature](/api/javascript/ui/signature)
* [Knowledge Base Section](/knowledge-base)