---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, values, and the popup footer of the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
components: ["multicolumncombobox"]
slug: htmlhelpers_multicolumncombobox_templates_aspnetcore
position: 4
---

# Templates

The MultiColumnComboBox provides full control over the way the items are displayed. In addition, the component supports template options for customizing the header and footer of its pop-up.

For more information on the capabilities and syntax of the templates, refer to the [Kendo UI templates article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on customizing the templates in the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/template).

## Basic Usage

The following example demonstrates how to customize the `.Template()`, `.HeaderTemplate()` and `.FooterTemplate()` options provided by the MultiColumnComboBox.

```HtmlHelper
        @(Html.Kendo().MultiColumnComboBox()
              .Name("customers")
              .DataTextField("ContactName")
              .DataValueField("CustomerID")
              .Columns(columns =>
              {
                  columns.Add()
                      .Field("ContactName")
                      .Title("Name")
                      .Template("<span class=\"k-state-default photo\" style=\"background-image: url(" + Url.Content("~/shared/web/customers/") + "#:data.CustomerID#.jpg" + ");\" ></span>")
                      .HeaderTemplate("<span class=\"dropdown-header\">Photo</span>")
                      .Width("100px");

                  columns.Add()
                      .Field("CustomerID")
                      .Title("ID")
                      .Template("<span class=\"k-state-default\"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>")
                      .HeaderTemplate("<span class=\"dropdown-header\">Contact info</span>");
              })
              .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
              .HtmlAttributes(new { style = "width: 100%;" })
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("Template_GetCustomers", "MultiColumnComboBox");
                  });
              })
              .Filter("startswith")
              .Height(300)
        )
```
{% if site.core %}
```TagHelper
        <kendo-multicolumncombobox datatextfield="ContactName" datavaluefield="CustomerID"
                                   footer-template="Total <strong>#: instance.dataSource.total() #</strong> items found"
                                   height="300"
                                   filter="FilterType.StartsWith" name="customers" style="width: 100%;">
            <multicolumncombobox-columns>
                <column field="ContactName" title="Name"
                    template-handler="mainTemplate"
                    header-template="<span class='dropdown-header'>Photo</span>"
                    width="100px">
                </column>
                <column field="CustomerID" title="ID"
                        template="<span class='k-state-default'><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>"
                        header-template="<span class='dropdown-header'>Contact info</span>">
                </column>
            </multicolumncombobox-columns>
            <datasource>
                <transport>
                    <read url="@Url.Action("Template_GetCustomers", "MultiColumnComboBox")" />
                </transport>
            </datasource>
        </kendo-multicolumncombobox>
```
```JS
<script>
        function mainTemplate(data) {
            var root = '@Url.Content("~")';
            return `<span class="k-state-default photo" style="background-image: url(${root}/shared/web/Customers/${data.CustomerID}.jpg);" ></span>`;
        }
</script>
```
{% endif %}

## See Also

* [Customizing Templates in the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/template)
* [Server-Side API](/api/multicolumncombobox)
