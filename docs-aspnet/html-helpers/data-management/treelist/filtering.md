---
title: Filtering
page_title: Filtering
description: "Learn how to enable the filtering functionality of the Telerik UI TreeList for {{ site.framework }}."
slug: htmlhelpers_treelist_aspnetcore_filtering
position: 4
---

# Filtering

The TreeList component comes with built-in filtering that enables you to display only the rows that match specific search criteria.

## Getting Started

To enable filtering in TreeList, use the `Filterable` property.

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("treelist")
        .Filterable() // Enable the Menu filter mode.
        ...
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <filterable enabled="true"/> <!-- Enable the Menu filter mode.-->
        ...
    </kendo-treelist>
```
{% endif %}

## Filter Modes

TreeList supports the _Filter row_ filter mode. To set the row filter mode, use the `Filterable->Mode` property:

```HtmlHelper
    .Filterable(ftb => ftb.Mode("row"))
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <filterable enabled="true" mode="row"/>
        ...
    </kendo-treelist>
```
{% endif %}

In this filter mode, the Kendo UI TreeList will analyze the underlying columns' data, and then it will render the following filters in the column headers:

* Kendo UI TextBoxes for string values 
* Kendo UI NumericTextBoxes numeric values
* Kendo UI DatePickers for dates

To see the filter row in action, visit the [demo page](https://demos.telerik.com/{{ site.platform }}/treelist/filter-row).

## See Also

* [Filter Rows by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/filter-row)
* [Server-Side API](/api/treelist)
