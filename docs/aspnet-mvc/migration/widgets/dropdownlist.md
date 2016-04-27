---
title: DropDownList
page_title: DropDownList | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI DropDownList widget."
slug: dropdownlist_migrationextensions_aspnetmv
---

# Calendar Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI DropDownList widget.

## Server-Side API

To bind the DropDownList to any collection, define the `DataTextField`. Note that all the changes described in the [article on migrating the ComboBox]({%slug combobox_migrationextensions_aspnetmvc %}) are applicable to the DropDownList.

## Other Options

### OptionLabel

```tab-Previous

    Html.Telerik().DropDownList().Name(“DropDownList”).Placeholder(“Select…”)
```
```tab-Current

    Html.Kendo().DropDownList().Name(“DropDownList”).OptionLabel(“Select…”)
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
