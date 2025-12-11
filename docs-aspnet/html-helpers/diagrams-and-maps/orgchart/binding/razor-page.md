---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI OrgChart component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_orgchart_razorpage_aspnetcore
position: 4
---

# OrgChart in Razor Pages 

This article describes how to seamlessly integrate and configure the Telerik UI OrgChart for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_orgchart_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To connect the OrgChart to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().OrgChart<OrgChartEmployeeViewModel>()
           .Name("orgchart")
           .DataSource(dataSource => dataSource
               .Read(r => r.Url(Url.Page("Index", "Read")).Data("forgeryToken"))
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
    ```TagHelper
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        <kendo-orgchart name="orgchart">
            <orgchart-datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken" />
                </transport>
                <schema>
                    <orgchart-model id="ID" parent-id="ParentID" name="Name" title="Title" avatar="Avatar" expanded="true">
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

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
    
1. Within the `cshtml.cs` file, add a handler method for the Read data operation.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public static IList<OrgChartEmployeeViewModel> employees;

        public void OnGet(string culture)
        {
            if (!String.IsNullOrEmpty(culture))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(culture);
            }

            if (employees == null)
            {
                employees = GetData();
            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request, int? id)
        {
            return new JsonResult(employees.ToDataSourceResult(request));
        }

        private List<OrgChartEmployeeViewModel> GetData()
        {
            var source = new List<OrgChartEmployeeViewModel>();
            var path = "https://demos.telerik.com/aspnet-core/shared/web/treelist/people/";

            source.Add(new OrgChartEmployeeViewModel() { ID = 1, Name = "Gevin Bell", Title = "CEO", Expanded = true, Avatar = path +"1.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 2, Name = "Clevey Thrustfield", Title = "COO", Expanded = true, ParentID = 1, Avatar = path +"2.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 3, Name = "Carol Baker", Title = "CFO", Expanded = false, ParentID = 1, Avatar = path +"3.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 4, Name = "Kendra Howell", Title = "CMO", Expanded = false, ParentID = 1, Avatar = path +"4.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 5, Name = "Sean Rusell", Title = "Financial Manager", Expanded = true, ParentID = 3, Avatar = path +"5.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 6, Name = "Steven North", Title = "Senior Manager", Expanded = false, ParentID = 3, Avatar = path +"6.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 7, Name = "Michelle Hudson", Title = "Operations Manager", Expanded = true, ParentID = 2, Avatar = path +"7.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 8, Name = "Andrew Berry", Title = "Team Lead", ParentID = 5, Avatar = path +"8.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 9, Name = "Jake Miller", Title = "Junior Accountant", ParentID = 5, Avatar = path +"9.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 10, Name = "Austin Piper", Title = "Accountant", ParentID = 5, Avatar = path +"10.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 11, Name = "Dilyana Newman", Title = "Accountant", ParentID = 5, Avatar = path +"11.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 12, Name = "Eva Andrews", Title = "Team Lead", ParentID = 6, Avatar = path +"12.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 13, Name = "Kaya Nilsen", Title = "Financial Specialist", ParentID = 6, Avatar = path +"13.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 14, Name = "Elena Austin", Title = "Team Lead", ParentID = 4, Avatar = path +"14.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 15, Name = "Lora Samuels", Title = "Lawyer", ParentID = 4, Avatar = path +"15.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 16, Name = "Lillian Carr", Title = "Operator", ParentID = 7, Avatar = path +"17.jpg" });
            source.Add(new OrgChartEmployeeViewModel() { ID = 17, Name = "David Henderson", Title = "Team Lead", ParentID = 7, Avatar = path +"16.jpg" });

            return source;
        }
    }
    ```
    ```Model
    public class OrgChartEmployeeViewModel
    {
        public int ID
        {
            get; set;
        }
        public int? ParentID
        {
            get; set;
        }
        public string Name
        {
            get; set;
        }
        public string Title
        {
            get; set;
        }
        public string Group
        {
            get; set;
        }
        public bool? Expanded
        {
            get; set;
        }
        public bool hasChildren
        {
            get; set;
        }
        public string Avatar
        {
            get; set;
        }
    }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
* [Server-Side HtmlHelper API of the OrgChart](/api/orgchart)
* [Server-Side TagHelper API of the OrgChart](/api/taghelpers/orgchart)
* [Knowledge Base Section](/knowledge-base)