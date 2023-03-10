---
title: Using Client Templates
page_title: Using Client Templates
description: "Learn how to use client templates within the Telerik UI for {{ site.framework }} components."
slug: client_templates_overview
position: 2
---

# Using Client Templates

The Telerik UI for {{ site.framework }} components provide templating options that let you customize and control their appearance or integrate other UI components. Many use cases require displaying a specified component element (for example, item, option, button, cell, and more) differently based on a specified condition or overriding its default look and feel. In such scenarios, client templates come in handy.

The templating options use [Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview), which offer a way to create HTML chunks that can be merged automatically with JavaScript code. They are a substitute for traditional HTML string-building in JavaScript.

The available template types are:

* [Inline Client Templates](#inline-client-templates)
* [External Client Templates](#external-client-templates)
* [Content Security Policy Templates](#content-security-policy-csp-templates)


## Inline Client Templates

You can create an inline client template as a `string` or a `JavaScript` function. They are suitable for small templates.

The following example demonstrates how to define the [template for the DropDownList items]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %}) as a `string`. To display the Model properties values as HTML, use the [hash syntax (`#=#`)](https://docs.telerik.com/kendo-ui/framework/templates/essentials#template-syntax).


```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("customers")
        .HtmlAttributes(new { style = "width: 100%" })
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .Template("<span class=\"contact-name\" style=\"color: \\#ffa96a;\"><b>#=ContactName #</b><p>#=CompanyName#</p></span>") // You can display the values of Model properties that are available in the data returned from the Read request.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "DropDownList");
            });
        })
        .Height(400)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dropdownlist name="customers" style="width:100%"
        datatextfield="ContactName"
        datavaluefield="CustomerID"
        template="<span class='contact-name' style='color:\\#ffa96a;'><b>#=ContactName #</b><p>#=CompanyName#</p></span>"
        height="400">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("Template_GetCustomers", "DropDownList")"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>
```
{% endif %}

To set an inline template as a function, pass the name of the function in the template method.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("customers")
        .HtmlAttributes(new { style = "width: 100%" })
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .Template("#=getDropDownItem(data)#")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "DropDownList");
            });
        })
        .Height(400)
    )

    <script>
        function getDropDownItem(data) {
            if (data.Country == "Germany") {
                let templateString = ({ ContactName }) => `<span style="color: orange;"><b> ${kendo.htmlEncode(ContactName)}</b></span>`;
                let template = kendo.template(templateString);
                return template(data);
            } else {
                let templateString = ({ ContactName, CompanyName }) => `<span style="color: blue;"><b> ${kendo.htmlEncode(ContactName)}</b> --> ID: <i>${kendo.htmlEncode(CompanyName)}</i></span>`;
                let template = kendo.template(templateString);
                return template(data);
            }
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dropdownlist name="customers" style="width:100%"
        datatextfield="ContactName"
        datavaluefield="CustomerID"
        template="#=getDropDownItem(data)#"
        height="400">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("Template_GetCustomers", "DropDownList")"/>
            </transport>
        </datasource>
    </kendo-dropdownlist>

    <script>
        function getDropDownItem(data) {
            if (data.Country == "Germany") {
                let templateString = ({ ContactName }) => `<span style="color: orange;"><b> ${kendo.htmlEncode(ContactName)}</b></span>`;
                let template = kendo.template(templateString);
                return template(data);
            } else {
                let templateString = ({ ContactName, CompanyName }) => `<span style="color: blue;"><b> ${kendo.htmlEncode(ContactName)}</b> --> ID: <i>${kendo.htmlEncode(CompanyName)}</i></span>`;
                let template = kendo.template(templateString);
                return template(data);
            }
        }
    </script>
```
{% endif %}


## External Client Templates

The external client templates are preferable for more advanced and complex scenarios. Within an external template, you can add HTML markup and JavaScript logic, as long as the JavaScript is properly formatted with the [Kendo UI Template syntax](https://docs.telerik.com/kendo-ui/framework/templates/essentials#handling-external-templates-and-expressions).

The external template is a Kendo UI Template defined by using HTML script blocks, which is suitable for larger templates. 

For example, you can define an external client template for a [Grid column]({% slug htmlhelper_grid_template_columns %}) by following the steps below:

1. Set up a script block with the `text/x-kendo-template` type.

    ```
        <script type="text/x-kendo-template">
            <!--Template content here-->
        </script>
    ```

1. Add an `id` to the template script and ensure its value is unique on the page.

    ```
        <script type="text/x-kendo-template" id="myTemplate">

        </script>
    ```

1. Specify the desired JavaScript logic in the template. For example, display the relevant information based on the value of the `Discontinued` property.

    ```
        <script type="text/x-kendo-template" id="myTemplate">
            <div class="product-item">
            #if(Discontinued){#
                <div><b>Active order</b></div>
            #}else{#
                <div>#: ProductName # is already shipped</div>
            #}#
            </div>
        </script>
    ```

1. Pass the `id` of the template to the `ClientTemplateId` method of the Grid column.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.Discontinued).ClientTemplateId("myTemplate");
            })
            .Pageable()
            .Scrollable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read("Products_Read", "Grid")
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="Grid">
            <columns>
                <column field="ProductName"/>
                <column field="UnitPrice"/>
                <column field="Discontinued" template="#=getTemplate(data)#"/>
            </columns>
            <pageable enabled="true"/>
            <scrollable enabled="true"/>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
                <schema data="Data" total="Total">
                    <model id="ProductID">
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Action("Products_Read", "Grid")"/>
                </transport>
            </datasource>
        </kendo-grid>

        <script>
            var getTemplate = kendo.template($('#myTemplate').html()); // Compile the external template.
        </script>
    ```
    {% endif %}


Also, you can integrate Telerik UI for {{ site.framework }} components in the external client templates by using the [HTML Helpers](#adding-html-helpers-inside-external-client-templates) {% if site.core %}or [Tag Helpers](adding-tag-helpers-inside-external-client-templates){% endif %}.

### Adding HTML Helpers inside External Client Templates

By default, {% if site.core %}[every Telerik UI HtmlHelper renders a `script` element immediately after its HTML markup]({% slug fundamentals_core%}#deferred-initialization){% else %}[every Telerik UI HtmlHelper renders a `script` element immediately after its HTML markup]({% slug fundamentals_aspnetmvc%}#deferred-initialization){% endif %}. If the helper declaration is placed inside an external Kendo UI template, the nested script elements will be invalid. The `ToClientTemplate` method instructs the helper to escape its own script element so that it can be nested.

    <script id="template" type="text/x-kendo-template">
        @(Html.Kendo().NumericTextBox()
              .Name("age")
              .ToClientTemplate()
        )
    </script>
    <div id="container"></div>
    <script>
        $(function () {
           var template = kendo.template($("#template").html());
           $("#container").append(template);
        })
    </script>

{% if site.core %}

### Adding Tag Helpers inside External Client Templates

.NET framework ignores any Tag Helpers that are within script tags. To compile them correctly, when placing a Tag Helper within a Kendo UI Template, set the type to `text/html` and add the `is-in-client-template="true"` attribute.

The following example demonstrates how to include Chart TagHelpers in the TileLayout TagHelper.

        <!-- container chart templates -->
        <script id="downloads-template" type="text/html">
            <kendo-chart name="downloads" is-in-client-template="true">
                <series>
                    <series-item type="ChartSeriesType.Line" data="new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }">
                    </series-item>
                </series>
            </kendo-chart>
        </script>
        <script id="devices-template" type="text/html">
            <kendo-chart name="devices" is-in-client-template="true">
                <series>
                    <series-item type="ChartSeriesType.Donut" auto-fit="true" data='new dynamic[] {
                        new {category = "Asia",value = 30.8,color = "\\#006634"},
                        new {category = "Europe",value = 69.2,color = "\\#90cc38"}}'>
                    </series-item>
                </series>
            </kendo-chart>
        </script>
        <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true">
            <containers>
                <container body-template-id="downloads-template" col-span="1" row-span="1">
                    <container-header text="Weekly Recap-Downloads" />
                </container>
                <container body-template-id="devices-template" col-span="1" row-span="1">
                    <container-header text="Devices" />
                </container>
            </containers>
        </kendo-tilelayout>

{% endif %}


## Content Security Policy (CSP) Templates

As of the R1 SP1 2023 release, Telerik UI for {{ site.framework }} addresses the [content security policy issues]({% slug troubleshooting_content_security_policy_aspnetmvc %}) related to the `usafe-eval` directive for components except for the Spreadsheet.

To create CSP-compatible templates, Telerik UI for {{ site.framework }} introduces an overload of the components template methods that accept {% if site.core %}`IHtmlContent`{% else %}`MvcHtmlString`{% endif %}. It allows you to define the template content in a partial view. This way, you can prevent the components from being dependent on the `unsafe-eval` and reuse the templates within multiple components in different application pages.

Within the partial view that contains the template, you can access the properties of the Model bound to the respective component.

The example below demonstrates how to load the [item template of a ComboBox]({% slug htmlhelpers_combobox_templates_aspnetcore %}#item-template) through a partial view. You can pass either the relative or absolute path to the partial view in the `TemplateView` method.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .HtmlAttributes(new { style = "width: 100%;" })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
        .TemplateView(await Html.PartialAsync("../MyPartialViews/Item_template.cshtml")) // The "Item_template.cshtml" is added in "~/Views/MyPartialViews/" directory.
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        // The "Item_template.cshtml" is added in "~/Views/MyPartialViews/" directory.
        var itemTemplateView = await Html.PartialAsync("../MyPartialViews/Item_template.cshtml");
    }   

    <kendo-combobox name="customers" style="width: 100%;"
        datatextfield="ContactName" 
        datavaluefield="CustomerID" 
        template-view="@itemTemplateView">
        <datasource>
            <transport>
                <read url="@Url.Action("Template_GetCustomers","ComboBox")"/>
            </transport>
        </datasource>
    </kendo-combobox>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .HtmlAttributes(new { style = "width: 100%;" })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
        .TemplateView(Html.Partial("../MyPartialViews/Item_template.cshtml")) // The "Item_template.cshtml" is added in "~/Views/MyPartialViews/" directory.
    )
```
{% endif %}
```Item_template.cshtml
    @{
        Layout = null;
    }

    #if(Country == "Germany"){#
        <div><b>#: ContactName #</b></div>
    #}else{#
        <div><i>#=ContactTitle#</i> - <b>#= ContactName#</b></div>
    #}#
```

## See Also

* [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc%})
* [Kendo UI Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [Kendo UI Templates Essentials](https://docs.telerik.com/kendo-ui/framework/templates/essentials)
* [Getting Started with the Kendo UI Inline Templates](https://docs.telerik.com/kendo-ui/framework/templates/get-started-inline)
* [Getting Started with Kendo UI External Templates](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external)
* [Getting Started with Kendo UI Content Security Policy (CSP) Templates](https://docs.telerik.com/kendo-ui/framework/templates/get-started-csp-templates)

