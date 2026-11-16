---
title: Summary-Tag Mode
page_title: Summary-Tag Mode
description: "Learn how to display single or multiple tags for the selected items for the Telerik UI MultiSelect component for {{ site.framework }}."
components: ["multiselect"]
slug: htmlhelpers_multiselect_tagmode_aspnetcore
position: 5
---

# Summary-Tag Mode

The Telerik UI MultiSelect for {{ site.framework }} provides options for displaying the items as individual (multiple) tags and as a single, summary tag. 

{% if site.core %}
To display single or multiple tags for the selected items, set the [`TagMode()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#tagmodekendomvcuimultiselecttagmode) configuration option to a value of the [`MultiSelectTagMode`](/api/kendo.mvc.ui/multiselecttagmode) enum. Use `MultiSelectTagMode.Multiple` to render a tag for every selected value or `MultiSelectTagMode.Single` to render only one tag that shows the number of selected values:
{% else %}
To display single or multiple tags for the selected items, set the [`TagMode()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#tagmodekendomvcuitagmode) configuration option to a value of the [`TagMode`](/api/kendo.mvc.ui/tagmode) enum. Use `TagMode.Multiple` to render a tag for every selected value or `TagMode.Single` to render only one tag that shows the number of selected values:
{% endif %}

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
When using the TagHelper, set the `tag-mode` attribute to the corresponding `MultiSelectTagMode` enum value.

```TagHelper
    <kendo-multiselect name="products"
                       tag-mode="MultiSelectTagMode.Single"
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
* [Server-Side API of the MultiSelect HtmlHelper](/api/multiselect)
{% if site.core %}
* [Server-Side API of the MultiSelect TagHelper](/api/taghelpers/multiselect)
{% endif %}
