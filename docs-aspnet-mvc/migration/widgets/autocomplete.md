---
title: AutoComplete
page_title: AutoComplete | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI AutoComplete widget."
slug: autocomplete_migrationextensions_aspnetmvc
position: 0
---

# AutoComplete Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI AutoComplete widget.

## Server-Side API

To bind the AutoComplete to any collection, define the `DataTextField`. Note that all the changes described in the [article on migrating the ComboBox]({% slug combobox_migrationextensions_aspnetmvc %}) are applicable to the AutoComplete.

### Separator

```tab-Previous

    Html.Telerik().AutoComplete().Name(“AutoComplete”).Multiple(m => m.Separator(“, “))
```
```tab-Current

    Html.Kendo().AutoComplete().Name(“AutoComplete”).Separator(“, “)
```

## See Also

* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the **Widgets** folder. 
