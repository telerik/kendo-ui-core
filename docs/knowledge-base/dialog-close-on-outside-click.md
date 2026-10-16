---
title: Close the Dialog When Clicking Outside It
description: Learn how to close the Kendo UI for jQuery Dialog when the user clicks outside its boundaries, both for modal and non-modal Dialogs.
type: how-to
page_title: Close the Dialog on Outside Click - Kendo UI for jQuery Dialog
slug: dialog-close-on-outside-click
tags: dialog, close, outside, click, overlay, modal, dismiss
res_type: kb
components: ["dialog"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Dialog for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

You want the Dialog to close automatically when the user clicks outside its boundaries, regardless of whether it is modal or non-modal.

This KB also answers the following questions:

* How can I detect outside clicks on a modal Dialog's overlay?
* Why can the click that opens a non-modal Dialog immediately close it?
* How can I keep the Dialog open when a user clicks a popup rendered outside it?

## Solution

The approach depends on the [`modal`](/api/ui/dialog/configuration/modal) option of the Dialog:

- [Closing a Modal Dialog](#closing-a-modal-dialog)&mdash;By default, the Dialog is modal and renders a `.k-overlay` element that covers the page.
- [Closing a Non-Modal Dialog](#closing-a-non-modal-dialog)&mdash;When `modal` is set to `false`, the Dialog renders no overlay and the page remains interactive.

### Closing a Modal Dialog

The modal Dialog renders the `.k-overlay` element as a sibling of its [`wrapper`](/intro/widget-basics/wrapper-element) element. Clicks outside the Dialog land on the overlay, so you can handle them there.

1. Get the overlay through the `wrapper` of the Dialog.
1. Handle the `click` event of the overlay and call the [`close`](/api/ui/dialog/methods/close) method.

Clicks inside the Dialog do not reach the overlay. The click that opens the Dialog does not close it either, because the overlay is not the target of that click.

```dojo
<button id="openButton">Open Dialog</button>
<div id="dialog"></div>

<script>
    var dialog = $("#dialog").kendoDialog({
        title: "Modal Dialog",
        content: "<p>Click outside the Dialog to close it.</p>",
        width: 400,
        visible: false,
        actions: [
            { text: "Cancel" },
            { text: "OK", primary: true }
        ]
    }).data("kendoDialog");

    dialog.wrapper.siblings(".k-overlay").on("click", function () {
        dialog.close();
    });

    $("#openButton").kendoButton({
        click: function () {
            dialog.open();
        }
    });
</script>
```

### Closing a Non-Modal Dialog

A non-modal Dialog has no overlay, so handle the `click` event of the document instead.

1. Check whether the click target is inside the `wrapper` of the Dialog.
1. Exclude the element that opens the Dialog. Otherwise, the click that opens the Dialog bubbles to the document and closes the Dialog immediately.
1. Call the `close` method for all other targets. The method has no effect when the Dialog is already closed.

```dojo
<button id="openButton">Open Dialog</button>
<div id="dialog"></div>

<script>
    var dialog = $("#dialog").kendoDialog({
        title: "Non-Modal Dialog",
        content: "<p>Click outside the Dialog to close it.</p>",
        width: 400,
        modal: false,
        visible: false,
        actions: [
            { text: "Cancel" },
            { text: "OK", primary: true }
        ]
    }).data("kendoDialog");

    $("#openButton").kendoButton({
        click: function () {
            dialog.open();
        }
    });

    $(document).on("click", function (e) {
        var target = $(e.target);

        if (target.closest(dialog.wrapper).length || target.closest("#openButton").length) {
            return;
        }

        dialog.close();
    });
</script>
```

If the Dialog contains components with popups, such as a DropDownList or a DatePicker, their popups render outside the Dialog. To keep the Dialog open when the user clicks inside such a popup, also exclude targets inside `.k-animation-container` in the document `click` handler.

## See Also

* [JavaScript API Reference of the Dialog](/api/ui/dialog)
* [Overview of the Dialog]({% slug overview_kendoui_dialog_widget %})
* [Basic Operations of the Dialog]({% slug basicoperations_kendoui_dialog %})
* [Close the Dialog on Pressing Enter]({% slug dialog-close-on-pressing-enter %})
