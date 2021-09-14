---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI OrgChart TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_orgchart_aspnetcore
previous_url: /helpers/tag-helpers/orgchart
position: 1
---

# OrgChart TagHelper Overview

The Telerik UI OrgChart TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI OrgChart widget.

The OrgChart is a flexible organizational chart component designed to represent a structure of an organization. The OrgChart can illustrate the hierarchy in a company, department, team, or other hierarchical structures. 

* [Demo page for the OrgChart](https://demos.telerik.com/aspnet-core/orgchart/tag-helper)

## Initializing the OrgChart

The following example demonstrates how to define the OrgChart by using the OrgChart TagHelper.

    <kendo-orgchart name="orgchart"></kendo-orgchart>

## Basic Configuration

The OrgChart TagHelper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-orgchart name="orgchart">
        <orgchart-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/EmployeesOrgChart" />
            </transport>
            <schema>
                <orgchart-model id="Id" parent-id="ParentId" expanded="true"
                                name="FullName" title="Position" avatar="Avatar">
                    <fields>
                        <field name="ParentId" nullable="true"></field>
                        <field name="Id" type="number"></field>
                        <field name="FullName" type="string"></field>
                        <field name="Position" type="string"></field>
                        <field name="Avatar" type="string"></field>
                    </fields>
                </orgchart-model>
            </schema>
        </orgchart-datasource>
    </kendo-orgchart>
```
```cshtml
    @(Html.Kendo().OrgChart<Kendo.Mvc.Examples.Models.OrgChartEmployeeViewModel>()
        .Name("orgchart")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("RemoteDataBindingData", "OrgChart"))
            .Model(m => {
                m.Id(f => f.ID);
                m.ParentId(f => f.ParentID);
                m.Name(f => f.Name);
                m.Title(f => f.Title);
                m.Avatar(f => f.Avatar);
                m.Expanded(f=>f.Expanded);
            })
        )
    )
```

## See Also

* [Basic Usage of the OrgChart TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/orgchart/tag-helper)
* [Server-Side API](/api/orgchart)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
