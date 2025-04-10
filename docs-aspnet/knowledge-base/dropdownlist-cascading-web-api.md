---
title: Cascade ComboBoxes Using Web API Service
page_title: Cascade ComboBoxes Using Web API Service
description: "Cascade the {{ site.product }} ComboBoxes by using the Web API service."
type: how-to
previous_url: /helpers/editors/dropdownlist/how-to/cascading-web-api, /html-helpers/editors/dropdownlist/how-to/cascading-web-api
slug: howto_cascadeddlusingwebapiservice_ddlaspnetmvc
tags: dropdownlist, cascade, webapi, service, combobox
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>ComboBox for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I implement cascading {{ site.framework }} ComboBoxes that bind to Web API service?

## Solution

The example below relies on the following key steps:

1. Create the Web API service:
```C#
    public class SpecialtyController : ApiController
    {
        // GET api/Specialty
        public IEnumerable<Specialty> Get(int typeId, string filterValue)
        {
            List<Specialty> specialty = new List<Specialty>();

            specialty.Add(new Specialty { Name = "Test" + new Random().Next(1000).ToString(), Value = 1, TypeId = typeId });
            specialty.Add(new Specialty { Name = "Test" + new Random().Next(1000).ToString(), Value = 2, TypeId = typeId });
            specialty.Add(new Specialty { Name = "Test" + new Random().Next(1000).ToString(), Value = 3, TypeId = typeId });
            specialty.Add(new Specialty { Name = "Test" + new Random().Next(1000).ToString(), Value = 4, TypeId = typeId });

            if (!string.IsNullOrWhiteSpace(filterValue))
            {
                specialty = specialty.Where(s => s.Name.StartsWith(filterValue)).ToList();
            }

            return specialty.AsEnumerable();
        }
    }
```

2. Bind the ComboBoxes to the Web API:
```HtmlHelper
                @(Html.Kendo().ComboBox()
                  .Name("specialty")
                  .DataTextField("Name")
                  .DataValueField("Id")
                  .DataSource(source => source
                        .Custom()
                        .Type("json")
                        .Transport(transport => transport
                            .Read(read=>read.Url("../../api/Specialty/get")
                         )
                    )
                )
```
```TagHelper
                <kendo-combobox datatextfield="Name" datavaluefield="Id" name="specialty">
                    <datasource type="DataSourceTagHelperType.Custom">
                      <transport >
                          <read url="../../api/Specialty/get" dataType="json"/>
                      </transport>
                  </datasource>
                </kendo-combobox>
```

You can refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/DropDownListWebApi) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master) to review the complete example. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} ComboBox Resources

* [{{ site.framework }} ComboBox Documentation]({%slug htmlhelpers_combobox_aspnetcore%})

* [{{ site.framework }} ComboBox Demos](https://demos.telerik.com/{{ site.platform }}/combobox)

{% if site.core %}
* [{{ site.framework }} ComboBox Product Page](https://www.telerik.com/aspnet-core-ui/combobox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ComboBox Product Page](https://www.telerik.com/aspnet-mvc/combobox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ComboBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [Server-Side API Reference of the ComboBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/combobox)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
