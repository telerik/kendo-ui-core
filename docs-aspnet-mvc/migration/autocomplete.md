---
title: AutoComplete
page_title: Migrating the AutoComplete Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the AutoComplete Extension."
previous_url: /migration/widgets/autocomplete
slug: autocomplete_migrationextensions_aspnetmvc
---

# Migrating the AutoComplete Extension

To migrate the Telerik UI AutoComplete Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

To bind the AutoComplete to any collection, define the `DataTextField`. The changes that are described in the [article on migrating the ComboBox Extension]({% slug combobox_migrationextensions_aspnetmvc %}) are applicable to the migration of the AutoComplete Extension.

The following example demonstrates the change when using the `Separator`.

```Previous

    Html.Telerik().AutoComplete().Name(“AutoComplete”).Multiple(m => m.Separator(“, “))
```
```Current

    Html.Kendo().AutoComplete().Name(“AutoComplete”).Separator(“, “)
```

## See Also

* [Migrating the Calendar Extension]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
