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

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
