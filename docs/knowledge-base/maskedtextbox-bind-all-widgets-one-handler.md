---
title: Bind Change Event Function to All MaskedTextBox Widgets
description: An example on how to bind change event handler function to all Kendo UI MaskedTextBox widgets.
type: how-to
page_title: Subscribe All Widgets to One Handler | Kendo UI MaskedTextBox
slug: maskedtextbox-bind-all-widgets-one-handler
tags: maskedtextbox, bind, events
ticketid: 1136846
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>MaskedTextBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I bind all Kendo UI MaskedTextBox change events to a single event handler function?

## Solution

To bind all the widgets, utilize any of the following approaches:

* [After the page load](#after-the-page-load)
* [Before the page load](#before-the-page-load)

### After the page load

After all the MaskedTextBoxes are initialized, select them with the data-role attribute jQuery selector. Then, loop through the array and attach the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#events-change) handler to every MaskedTextBox.

```html
<input id="maskedtextbox1" />
<input id="maskedtextbox2" />
<input id="maskedtextbox3" />

<script>
    $("input").kendoMaskedTextBox();

    var mtbs = $("[data-role='maskedtextbox']");

    mtbs.each(function(e) {
        var mtb = $(this).data("kendoMaskedTextBox");

        mtb.bind("change", SomeFunction);
    });

    function SomeFunction(e) {
        alert(this.value());
    }
</script>
```

### Before the page load

Override the default [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#events-change) event handler function before the MaskedTextBoxes initialization.

```html
<script>
    function SomeFunction(e) {
        alert(this.value());
    };

    $.fn.kendoMaskedTextBox.widget.fn._change = SomeFunction
</script>

<input id="maskedtextbox1" />
<input id="maskedtextbox2" />
<input id="maskedtextbox3" />

<script>
    $("input").kendoMaskedTextBox();
</script>
```