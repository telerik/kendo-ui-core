---
title: Getting Started
page_title: jQuery Signature Documentation - Getting Started with the Signature
description: "Get started with the jQuery Signature by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_signature_widget
position: 1
---

# Getting Started with the Signature

This guide demonstrates how to get up and running with the Kendo UI for jQuery Signature. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="signature"></div>
    <script>
    $(document).ready(function () {
        $("#signature").kendoSignature({
          backgroundColor: "#fad980",
          width: 500,
          height: 200,
          maximizable: false
        });
    });
    </script>
```

## 1. Create an Empty div Element

First, create an empty `<div>` element on the page that will serve as the main container for the Signature widget.

```html
<div id="signature"></div>
```

## 2. Initialize the Signature

Initialize the Signature widget by calling the `.kendoSignature()` method.

```html
<div id="signature"></div>

<script>
$(document).ready(function () {
    $("#signature").kendoSignature({
      width: 500,
      height: 200,
      maximizable: false
    });
});
</script>
```

## 3. Change the Default Appearance

The Kendo UI for jQuery Signature provides styling properties that allow you to [modify its appearance]({% slug appearance_kendoui_signature_widget %}).

```html
<div id="signature"></div>

<script>
$(document).ready(function () {
    $("#signature").kendoSignature({
        width: 500,
        height: 200,
        maximizable: false,
        backgroundColor: "#fad980"
    });
});
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Signature](https://demos.telerik.com/kendo-ui/signature/index)

## See Also 

* [JavaScript API Reference of the Signature](/api/javascript/ui/signature)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>