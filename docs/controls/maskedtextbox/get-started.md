---
title: Getting Started
page_title: jQuery MaskedTextBox Documentation - Getting Started with the MaskedTextBox
description: "Get started with the jQuery MaskedTextBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_maskedtextbox
position: 1
---

# Getting Started with the MaskedTextBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery MaskedTextBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="maskedtextbox" />

    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
            // Add some basic configurations such as mask
            mask: "(999) 000-0000",
            fillMode:"flat",
            rounded:"full",
            size:"large"
        });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page that will serve to initialize the MaskedTextBox.

```html
<input id="maskedtextbox" />
```

## 2. Initialize the MaskedTextBox

In this step, you will initialize the MaskedTextBox from the `<input>` element. All settings of the MaskedTextBox will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<input id="maskedtextbox" />

<script>
    // Target the input element by using jQuery and then call the kendoMaskedTextBox() method.
    $("#maskedtextbox").kendoMaskedTextBox({
        // Add some basic configurations such as mask
        mask: "(999) 000-0000",
    });
</script>
```

## 3. Change the Appearance of the MaskedTextBox

To change the appearance of the component, use the `fillMode`, `rounded`, and `size`  options. For more information about the variety of supported styling options, see the [Appearance article](https://docs.telerik.com/kendo-ui/controls/maskedtextbox/appearance).

```html
<input id="maskedtextbox" />

<script>
   $("#maskedtextbox").kendoMaskedTextBox({
        // Add some basic configurations such as mask
        mask: "(999) 000-0000",
        fillMode:"flat",
        rounded:"full",
        size:"large"
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/index)

## See Also

* [JavaScript API Reference of the jQuery MaskedTextBox](/api/javascript/ui/maskedtextbox)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
