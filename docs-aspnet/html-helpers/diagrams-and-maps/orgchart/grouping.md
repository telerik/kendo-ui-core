---
title: Grouping
page_title: Grouping
description: "Learn how to group nodes in the Telerik UI OrgChart component for {{ site.framework }} works."
previous_url: /helpers/editors/orgchart/grouping
slug: htmlhelpers_orgchart_grouping_aspnetcore
position: 3
---

# Grouping Overview

The OrgChart enables you to group root nodes, or nodes that have the same parent. To group the nodes, set the `GroupField` configuration of the OrgChart. Pass the name of the data field that datermines the groups.  

The following example demonstrates how to group the OrgChart nodes by the `Group` field.

```HtmlHelper
    @(Html.Kendo().OrgChart<TelerikMvcApp1.Models.OrgChartEmployeeViewModel>()
        .Name("orgchart")
        .GroupField("Group")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Read", "Home"))
            .Model(m =>
            {
                m.Id(f => f.ID);
                m.ParentId(f => f.ParentID);
                m.Name(f => f.Name);
                m.Title(f => f.Title);
                m.Avatar(f => f.Avatar);
                m.Expanded(f => f.Expanded);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-orgchart name="orgchart" group-field="Group">
        <orgchart-datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read","Home")" />
            </transport>
            <schema>
                <orgchart-model id="ID" 
                                parent-id="ParentID" 
                                name="Name" 
                                title="Title"
                                avatar="Avatar" 
                                expanded="true">
                    <fields>
                        <field name="ID" type="number"></field>
                        <field name="ParentID" nullable="true"></field>
                        <field name="Name" type="string"></field>
                        <field name="Title" type="string"></field>
                        <field name="Avatar" type="string"></field>
                    </fields>
                </orgchart-model>
            </schema>
        </orgchart-datasource>
    </kendo-orgchart>
```
{% endif %}

{% if site.mvc %}
```Controller
    public JsonResult Read([DataSourceRequest] DataSourceRequest request)
    {
        List<OrgChartEmployeeViewModel> data = new List<OrgChartEmployeeViewModel>()
        {
            new OrgChartEmployeeViewModel() { ID = 1, Name = "Clevey Thrustfield", Title = "CEO", Group = "CEO", ParentID = null, Expanded = true, Avatar = "../content/web/orgchart/people/1.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 2, Name = "Sean Russel", Title = "Financial Manager", Group = "Chief Officers", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/2.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 3, Name = "Andrew Berry", Title = "Team Lead", ParentID = 1, Group = "Chief Officers", Expanded = true, Avatar = "../content/web/orgchart/people/3.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 4, Name = "Dilyana Newman", Title = "Accountant", Group = "Accountants", ParentID = 2, Expanded = false, Avatar = "../content/web/orgchart/people/4.jpg"  }
        };

        return Json(data, JsonRequestBehavior.AllowGet);
    }
```
{% else %}
```Controller
    public JsonResult Read([DataSourceRequest] DataSourceRequest request)
    {
        List<OrgChartEmployeeViewModel> data = new List<OrgChartEmployeeViewModel>()
        {
            new OrgChartEmployeeViewModel() { ID = 1, Name = "Clevey Thrustfield", Title = "CEO", Group = "CEO", ParentID = null, Expanded = true, Avatar = "../content/web/orgchart/people/1.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 2, Name = "Sean Russel", Title = "Financial Manager", Group = "Chief Officers", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/2.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 3, Name = "Andrew Berry", Title = "Team Lead", ParentID = 1, Group = "Chief Officers", Expanded = true, Avatar = "../content/web/orgchart/people/3.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 4, Name = "Dilyana Newman", Title = "Accountant", Group = "Accountants", ParentID = 2, Expanded = false, Avatar = "../content/web/orgchart/people/4.jpg"  }
        };

        return Json(data);
    }
```
{% endif %}

## See Also

* [Grouping in the OrgChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/grouping)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
