---
title: Reordering
page_title: Reordering of Columns
description: "Learn how to enable column reordering in the Telerik UI Grid for {{ site.framework }} so users can drag and reorder columns."
components: ["grid"]
slug: reordercols_aspnetcore_grid
position: 8
---

# Reordering of Columns

The Telerik UI Grid for {{ site.framework }} lets users change the order of columns at run time.

Enable column reordering when users need to prioritize different fields while working with data.

To enable the user to reorder the columns of the Grid by dragging, set the `Reorderable.Columns()` method to `true`. For a runnable example, refer to the [demo on implementing column reordering in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/column-reordering).

```HtmlHelper

    .Reorderable(reorderable => reorderable.Columns(true))

```
{% if site.core %}
```TagHelper

    <reorderable columns="true"/>
    
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Column Reordering by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-reordering)
* [Server-Side API](/api/grid)
