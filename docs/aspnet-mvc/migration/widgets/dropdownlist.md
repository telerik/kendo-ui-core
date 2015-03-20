---
title: DropDownList
page_title: Server-side API documentation for Kendo UI jQuery ComboBox widget
description: Notes about server-side API for Kendo UI ComboBox component.
---

# Server-Side API

All changes described in the [ComboBox](combobox) are applicable to the AutoComplete. AutoComplete can be bound to any collection, just define the DataTextField.

## Other Options

### OptionLabel

#### Old
    
    Html.Telerik().DropDownList().Name(“DropDownList”).Placeholder(“Select…”)
 
#### New

    Html.Kendo().DropDownList().Name(“DropDownList”).OptionLabel(“Select…”)
