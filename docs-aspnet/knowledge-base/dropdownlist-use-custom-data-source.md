---
title: Use DropDownList and Custom DataSource to Bind to ToDataSourceResult Output
page_title: Use Custom DataSource to Bind to ToDataSourceResult Output
type: how-to
description: "Learn how to use the {{ site.product }} DropDownList with a custom DataSource setup to bind the editor to a ToDataSourceResult output."
previous_url: /helpers/editors/dropdownlist/how-to/use-custom-data-source, /html-helpers/editors/dropdownlist/how-to/use-custom-data-source
slug: howto_usecustomdatasource_bindtodatasourceoutput_ddlaspnetmvc
tags: dropdownlist, custom, datasource, bind
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I use a [custom DataSource]({% slug htmlhelper_datasourcetypes_aspnetcore %}) to bind the {{ site.framework }} DropDownList component to the [`ToDataSourceResult`](/api/kendo.mvc.ui/datasourceresult) output?

## Solution

You can implement this scenario using the following DropDownList definition:

```HtmlHelper
@(Html.Kendo().DropDownList()
    .Name("productDropDownList")
    // The "DataTextField" and "DataValueField" options are not set, because the component is bound to an array of strings.
    .DataSource(source =>
    {
        source.Custom()
              .Type("aspnetmvc-ajax")
              .Transport(transport =>
              {
                  transport.Read("_GetData", "Home");
              })
              .Schema(schema =>
              {
                  schema.Data("Data")
                        .Total("Total");
              });
    })
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

        // The "datatextfield" and "datavaluefield" attributes are not set, because the component is bound to an array of strings.
        <kendo-dropdownlist name="productDropDownList" >
            <datasource type="DataSourceTagHelperType.Custom">
                <schema data="Data" total="Total"></schema>
                <transport>
                    <read url="@Url.Action("_GetData", "Home")"/>
                </transport>
            </datasource>
        </kendo-dropdownlist>
```
 {% endif %}

To see the complete implementation, refer to the ASP.NET MVC application on how to [use a custom DataSource to bind the DropDownList to a `ToDataSourceResult` output](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/DropDownListCustomDataSource). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Server-Side API Reference of the DropDownList for {{ site.framework }}](/api/dropdownlist)
* [Server-Side API Reference of the DataSource for {{ site.framework }}](/api/datasource)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DropDownList for {{ site.framework }}](/api/taghelpers/dropdownlist)
* [Server-Side TagHelper API Reference of the DataSource for {{ site.framework }}](/api/taghelpers/datasource)
{% endif %}
