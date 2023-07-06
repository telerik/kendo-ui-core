---
title: Summary-Tag Mode
page_title: Summary-Tag Mode
description: "Learn how to display single or multiple tags for the selected items for the Telerik UI MultiSelect component for {{ site.framework }}."
slug: htmlhelpers_multiselect_tagmode_aspnetcore
position: 5
---

# Summary-Tag Mode

The Telerik UI MultiSelect for {{ site.framework }} provides options for displaying the items as individual (multiple) tags and as a single, summary tag. 

To display single or multiple tags for the selected items set the [`TagMode()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#tagmodekendomvcuimultiselecttagmode) configuration option:

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       tag-mode="@MultiSelectTagMode.Single"
                       datatextfield="ProductName"
                       datavaluefield="ProductId"
                       filter="FilterType.Contains">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
               <transport>
                    <read url="@Url.Action("ServerFiltering_GetProducts", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## See Also

* [Set the TagMode for the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/tag-mode)
