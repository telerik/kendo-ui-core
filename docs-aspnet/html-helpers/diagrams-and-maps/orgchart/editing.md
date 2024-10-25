---
title: Editing
page_title: Editing
description: "Learn about the Editing capabilities of the Telerik UI OrgChart component for {{ site.framework }}."
slug: htmlhelpers_orgchart_editing_aspnetcore
position: 2
---

# Editing

The OrgChart provides a built-in editing functionality, which is enabled by default. 

Editing allows you to:

* Modify node data.
* Upload a new image that will be used as node avatar. The size of the uploaded image cannot exceed 1MB.
* Modify the OrgChart hierarchy by selecting a different parent for the edited node.

## Editing Configuration

To send the new data to the server, configure CRUD operations in the OrgChart DataSource. If this configuration is missing, the OrgChart will work with the updated data on the client. 

The following example demonstrates how to configure the OrgChart to use editing.

```HtmlHelper
    @(Html.Kendo().OrgChart<Kendo.Mvc.Examples.Models.OrgChartEmployeeViewModel>()
        .Name("orgchart")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Read", "OrgChart"))
            .Create(read => read.Action("Create", "OrgChart"))
            .Destroy(read => read.Action("Destroy", "OrgChart"))
            .Update(read => read.Action("Update", "OrgChart"))
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
{% if site.core %}
```TagHelper
    <kendo-orgchart name="orgchart">
        <orgchart-datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read","OrgChart")" />
                <create url="@Url.Action("Create","OrgChart")" />
                <destroy url="@Url.Action("Destroy","OrgChart")" />
                <update url="@Url.Action("Update","OrgChart")" />
            </transport>
            <schema>
                <orgchart-model id="ID" 
                                parent-id="ParentID" 
                                name="Name" 
                                title="Title"
                                avatar="Avatar" 
                                expanded="true">
                    <fields>
                        <field name="ParentID" nullable="true"></field>
                        <field name="ID" type="number"></field>
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
```Controller
    public JsonResult Read([DataSourceRequest] DataSourceRequest request)
    {
        return Json(new
        {
            Data = OrgChartData
        });
    }

    public JsonResult Create(OrgChartEmployeeViewModel model)
    {
        List<OrgChartEmployeeViewModel> result = OrgChartData;
        int lastID = result.Select(m => m.ID).Max();
        if (model.ID == 0)
        {
            model.ID = lastID + 1;
        }
        result.Add(model);

        OrgChartData = result;

        return Json(model);
    }

    public JsonResult Destroy(OrgChartEmployeeViewModel model)
    {
        List<OrgChartEmployeeViewModel> result = OrgChartData;
        var index = result.FindIndex(m => m.ID == model.ID);
        var target = result[index];

        result.Remove(target);

        OrgChartData = result;

        return Json(target);
    }

    public JsonResult Update(OrgChartEmployeeViewModel model)
    {
        List<OrgChartEmployeeViewModel> result = OrgChartData;
        var index = result.FindIndex(m => m.ID == model.ID);
        var target = result[index];

        target.Title = model.Title;
        target.Name = model.Name;
        target.ParentID = model.ParentID;
        target.Avatar = model.Avatar;

        result[index] = target;
        OrgChartData = result;

        return Json(target);
    }

    private List<OrgChartEmployeeViewModel> OrgChartData
    {
        get
        {
            List<OrgChartEmployeeViewModel> source = HttpContext.Session.GetObjectFromJson<List<OrgChartEmployeeViewModel>>("OrgChartEmployees");

            if (source == null)
            {
                source = new List<OrgChartEmployeeViewModel>
                        {
                        new OrgChartEmployeeViewModel() { ID = 1, Name = "Gevin Bell", Title = "CEO", Expanded = true, Avatar = "../shared/web/treelist/people/1.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 2, Name = "Clevey Thrustfield", Title = "COO", Expanded = true, ParentID = 1, Avatar = "../shared/web/treelist/people/2.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 3, Name = "Carol Baker", Title = "CFO", Expanded = false, ParentID = 1, Avatar = "../shared/web/treelist/people/3.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 4, Name = "Kendra Howell", Title = "CMO", Expanded = false, ParentID = 1, Avatar = "../shared/web/treelist/people/4.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 5, Name = "Sean Rusell", Title = "Financial Manager", Expanded = true, ParentID = 3, Avatar = "../shared/web/treelist/people/5.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 6, Name = "Steven North", Title = "Senior Manager", Expanded = false, ParentID = 3, Avatar = "../shared/web/treelist/people/6.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 7, Name = "Michelle Hudson", Title = "Operations Manager", Expanded = true, ParentID = 2, Avatar = "../shared/web/treelist/people/7.jpg" },
                        new OrgChartEmployeeViewModel() { ID = 8, Name = "Andrew Berry", Title = "Team Lead", ParentID = 5, Avatar = "../shared/web/treelist/people/8.jpg" }
                    };
                HttpContext.Session.SetObjectAsJson("OrgChartEmployees", source);
            }
            return source;
        }
        set
        {
            HttpContext.Session.SetObjectAsJson("OrgChartEmployees", value);
        }
    }
```

## Disable the Editing

For disabling the Edit functionality set the `Editable` configuration to `false`:

```
.Editable(false)
```


## See Also

* [Editing in the OrgChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/editing)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
* [A REPL example of disabled editing of an OrgChart](https://netcorerepl.telerik.com/wHvlPRbz45LXGqZX00)
