---
title: Printing
page_title: jQuery Dialog Documentation | Printing
description: "Get started with the jQuery Dialog by Kendo UI and print only the visible part of the widget."
slug: printing_kendoui_dialog
position: 5
---

# Printing

To select only the Dialog content that is visible during printing and hide the rest of the page content, use CSS.

The following example assumes that only one Dialog instance exists on the page. If multiple Dialog instances exist on the page and only one needs to be printed, replace the `.k-dialog` class by a custom CSS class that is manually applied to the wrapper element of the Dialog.

    @media print
    {
        body > *
        {
            display: none !important;
        }

        body > .k-dialog
        {
            display: block !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: auto !important;
            height: auto !important;
            border-width: 0;
            box-shadow: none !important;
        }

        .k-window .k-window-titlebar
        {
            display: none;
        }
    }

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
