---
title: Summary-Tag Mode
page_title: Summary-Tag Mode
description: "Learn how to display single or multiple tags for the selected items for the Telerik UI MultiSelect HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_multiselect_tagmode_aspnetcore
position: 5
---

# Summary-Tag Mode

The Telerik UI MultiSelect HtmlHelper for {{ site.framework }} provides options for displaying the items as individual (multiple) tags and as a single, summary tag. 

To display single or multiple tags for the selected items set the [`TagMode()`](/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder#tagmodekendomvcuimultiselecttagmode) configuration option:

```Razor
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .TagMode(MultiSelectTagMode.Single)
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .Filter(FilterType.Contains)
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("ServerFiltering_GetProducts", "MultiSelect");
              })
              .ServerFiltering(true);
          })
    )
```

## See Also

* [Set the TagMode for the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/tag-mode)
