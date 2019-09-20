---
title: DropDownList
page_title: Migrating the DropDownList Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the DropDownList Extension."
previous_url: /migration/widgets/dropdownlist
slug: dropdownlist_migrationextensions_aspnetmv
---

# Migrating the DropDownList Extension

To migrate the Telerik UI DropDownList Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

To bind the DropDownList to any collection, define the `DataTextField`. The changes that are described in the [article on migrating the ComboBox Extension]({% slug combobox_migrationextensions_aspnetmvc %}) are applicable to the migration of the DropDownList Extension.

The following example demonstrates the change when using the `OptionLabel` configuration.

```Previous

    Html.Telerik().DropDownList().Name(“DropDownList”).Placeholder(“Select…”)
```
```Current

    Html.Kendo().DropDownList().Name(“DropDownList”).OptionLabel(“Select…”)
```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
