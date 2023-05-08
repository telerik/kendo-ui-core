---
title: Image Export
page_title: jQuery Signature Documentation - Signature Image Export
description: "Learn how to export the Kendo UI for jQuery Signature control as a PNG file."
slug: image_export_kendoui_signature_widget
position: 4
---

# Signature Image Export

You can export the Kendo UI for jQuery Signature to a PNG file through the Kendo UI [`saveAs`](/api/javascript/kendo/methods/saveas) method.

To achieve this functionality, retrieve the base64 value of the Signature by using the [`value`](/api/javascript/ui/signature/methods/value) method of the widget.

```dojo
    <button id="export">Export as PNG</button>

    <div id="signature"></div>

    <script>
      let signature = $("#signature").kendoSignature({
        width: 500,
        height: 300
      }).getKendoSignature();

      $("#export").kendoButton({
        click: function() {
          kendo.saveAs({
            // Use the base64 value of the signature for the dataURI.
            dataURI: signature.value(),
            fileName: "signature.png"
          });
        }
      });
    </script>
```

## See Also

* [Image Export of the Signature (Demo)](https://demos.telerik.com/kendo-ui/signature/export-image)
* [JavaScript API Reference of the Signature](/api/javascript/ui/signature)