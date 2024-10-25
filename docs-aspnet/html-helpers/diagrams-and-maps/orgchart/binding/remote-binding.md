---
title: Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI OrgChart component for {{ site.framework }}."
previous_url: /helpers/editors/orgchart/binding/ajax-binding
slug: htmlhelpers_orgchart_ajaxbinding_aspnetcore
position: 3
---

# Ajax Binding

You can configure the Telerik UI OrgChart for Ajax (remote) binding. The OrgChart enables you to load nodes on demand. Whether the OrgChart will use this feature, depends on how the end point is implemented. If the end point initially returns all the data, the nodes will not be loaded on demand. If the end point initially returns only the parent nodes data, on expanding a parent node a request for its child nodes data will be sent to the end point.  

The following example demonstrates how to bind the OrgChart to remote data.

1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

        {% if site.core %}
        public JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            List<OrgChartEmployeeViewModel> data = new List<OrgChartEmployeeViewModel>()
            {
                new OrgChartEmployeeViewModel() { ID = 1, Name = "Clevey Thrustfield", Title = "CEO", ParentID = null, Expanded = true, Avatar = "../content/web/orgchart/people/1.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 2, Name = "Sean Russel", Title = "Financial Manager", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/2.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 3, Name = "Andrew Berry", Title = "Team Lead", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/3.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 4, Name = "Dilyana Newman", Title = "Accountant", ParentID = 2, Expanded = false, Avatar = "../content/web/orgchart/people/4.jpg"  }
            };

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        {% else %}
         public JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            List<OrgChartEmployeeViewModel> data = new List<OrgChartEmployeeViewModel>()
            {
                new OrgChartEmployeeViewModel() { ID = 1, Name = "Clevey Thrustfield", Title = "CEO", ParentID = null, Expanded = true, Avatar = "../content/web/orgchart/people/1.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 2, Name = "Sean Russel", Title = "Financial Manager", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/2.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 3, Name = "Andrew Berry", Title = "Team Lead", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/3.jpg"  },
                new OrgChartEmployeeViewModel() { ID = 4, Name = "Dilyana Newman", Title = "Accountant", ParentID = 2, Expanded = false, Avatar = "../content/web/orgchart/people/4.jpg"  }
            };

            return Json(data, JsonRequestBehavior);
        }
        {% endif %}

1. Add an Ajax-bound OrgChart to the `Index` view.

   ```HtmlHelper
        @(Html.Kendo().OrgChart<TelerikMvcApp1.Models.OrgChartEmployeeViewModel>()
                .Name("orgchart")
                .DataSource(dataSource => dataSource
                        .Read(read => read.Action("Read", "Home"))
                        .Model(m =>
                        {
                                m.Id(f => f.ID);
                                m.ParentId(f => f.ParentId);
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
        <kendo-orgchart name="orgchart">
            <orgchart-datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("Read","Home")" />
                </transport>
                <schema>
                    <orgchart-model id="ID" 
                                    parent-id="ParentID" 
                                    expanded="true"
                                    name="Name" 
                                    title="Title" 
                                    avatar="Avatar">
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
    

## See Also

* [Server-Side API](/api/orgchart)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
