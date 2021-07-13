---
title: Predefined Types
page_title: jQuery Dialog Documentation | Predefined Types
description: "Get started with the jQuery Dialog by Kendo UI and use the predefined Dialog types."
slug: types_kendoui_dialog
position: 3
---

# Predefined Types

The Dialog provides options for rendering predefined dialogs by setting its [`kendo`](/api/javascript/kendo) object.

For more information, refer the API documentation of:
* [Alert dialogs](/api/javascript/ui/alert)
* [Confirm dialogs](/api/javascript/ui/confirm)
* [Prompt dialogs](/api/javascript/ui/prompt)

The following example demonstrates how to call the alert, confirm, and prompt Dialogs.

    kendo.alert("String to alert");
    kendo.confirm("Continue?");
    kendo.prompt("enter value", "123"); // 123 is the default value.

To interrupt the current thread for the confirm and prompt Dialogs in a similar way the browser does, use promises.

    kendo.confirm("Continue?")
        .done(function() { console.log("Ok") })
        .fail(function() { console.log("Cancel") });
    kendo.prompt("enter value")
        .done(function(value) { console.log(value); })
        .fail(function() { console.log("Cancel") });

## See Also

* [Predefined Dialog Types (Demo)](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
