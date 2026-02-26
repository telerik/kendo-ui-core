---
title: Handling UnmaskOnPost(true) Behavior in MaskedTextBox Inside AJAX Grid Editing
description: Learn how to ensure the MaskedTextBox component inside a Grid with AJAX editing sends unmasked values to the server.
type: how-to
page_title: Unmasking MaskedTextBox Values in Grid with AJAX Editing
meta_title: Unmasking MaskedTextBox Values in Grid with AJAX Editing
slug: maskedtextbox-unmaskonpost-ajax-grid-editing
tags: maskedtextbox, asp.net mvc, grid, ajax, unmaskonpost, save-event
res_type: kb
ticketid: 1709790
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MaskedTextBox for UI for ASP.NET MVC, <br/>Grid for UI for ASP.NET MVC</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

When using the [MaskedTextBox](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MaskedTextBoxBuilder) component inside a Grid with AJAX editing in Kendo UI for ASP.NET MVC, the `.UnmaskOnPost(true)` configuration does not automatically remove the mask characters before submitting the value to the server. This behavior occurs because the unmasking functionality applies only when the MaskedTextBox is inside a standard HTML form.

For AJAX scenarios, such as Grid inline or popup editing, the masked value is sent to the server unless manual intervention is implemented.

This knowledge base article also answers the following questions:
- How to send unmasked values with MaskedTextBox inside a Kendo Grid?
- Why does `.UnmaskOnPost(true)` not work in AJAX editing scenarios?
- How to ensure the server receives raw values from MaskedTextBox?

## Solution

To ensure the server receives the unmasked value, handle the Grid's `Save` event and manually assign the raw value of the MaskedTextBox to the model.

1. Define a JavaScript function to handle the Grid's `Save` event.

```javascript
function onSave(e) {
    var maskedtextbox = $("#celular").data("kendoMaskedTextBox");
    if (maskedtextbox) {
        e.model.celular = maskedtextbox.rawValue();
    }
}
```

2. Attach the `Save` event handler to your Grid configuration.

```csharp
@(Html.Kendo().Grid<Model>()
    .Name("Grid")
    .Editable(editable => editable.Mode(GridEditMode.InLine))
    .Events(events => events.Save("onSave"))
    // ... other grid configuration ...
)
```

This approach ensures the raw, unmasked value from the MaskedTextBox is assigned to the model before it is sent to the server.

## See Also

- [MaskedTextBox API Documentation](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MaskedTextBoxBuilder)
- [Kendo UI Grid Overview](https://www.telerik.com/aspnet-mvc/documentation/html-helpers/data-management/grid/overview)
- [Handling Events in Kendo UI Grid](https://www.telerik.com/aspnet-mvc/documentation/html-helpers/data-management/grid/events)
