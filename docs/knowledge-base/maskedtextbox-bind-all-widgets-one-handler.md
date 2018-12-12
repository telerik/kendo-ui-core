---
title: Bind Change Event Function to All MaskedTextBox Widgets
description: An example on how to bind the change event handler function to all Kendo UI MaskedTextBox widgets.
type: how-to
page_title: Subscribe All Widgets to One Handler | Kendo UI MaskedTextBox
slug: maskedtextbox-bind-all-widgets-one-handler
tags: maskedtextbox, bind, events
ticketid: 1136846
res_type: kb
component: maskedtextbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MaskedTextBox</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I bind the `change` events of all MaskedTextBoxes to a single event handler function?

## Solution

To bind all the widgets, utilize any of the following approaches:

* [After the page loads](#after-the-page-loads)
* [Before the page loads](#before-the-page-loads)

### After the Page Loads

1. After all the MaskedTextBoxes initialize, select them with the jQuery data-role attribute selector.
1. Loop through the array and attach the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox/events/change) handler to every MaskedTextBox.

```dojo
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

### Before the Page Loads

Override the default [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox/events/change) event handler function before the MaskedTextBoxes initializes.

```dojo
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
