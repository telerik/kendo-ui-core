---
title: Image Export
page_title: Telerik UI Signature for {{ site.framework }} Documentation - Signature Image Export
description: "Learn how to export the Telerik UI Signature for {{ site.framework }} component as a PNG file."
slug: image_export_telerikui_signature_component
position: 4
---

# Signature Image Export

You can export the Telerik UI Signature for {{ site.framework }} to a PNG file through the Kendo UI [`saveAs`](/api/javascript/kendo/methods/saveas) method.

To achieve this functionality, retrieve the base64 value of the Signature by using the [`value`](/api/javascript/ui/signature/methods/value) method of the component.

```HtmlHelper
    <button id="export">Export as PNG</button>
    
    @(Html.Kendo().Signature()
            .Name("signature")
            .Width(500)
            .Height(300)
    )

    <script>
      let signature = $("#signature").getKendoSignature();
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
{% if site.core %}
```TagHelper
    <button id="export">Export as PNG</button>

    <kendo-signature name="signature"
                     width="500"
                     height="300">
    </kendo-signature>

    <script>
      let signature = $("#signature").getKendoSignature();
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
{% endif %}

## See Also

* [Image Export of the Signature (Demo)](https://demos.telerik.com/{{ site.platform }}/signature/export-image)
* [API Reference of the Signature](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder)