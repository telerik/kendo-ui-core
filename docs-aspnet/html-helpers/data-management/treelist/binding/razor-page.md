---
title:  Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI TreeList component for {{ site.framework }} configured for remote data in a Razor Pages application."
slug: htmlhelpers_treelist_razorpage_aspnetcore
components: ["treelist"]
position: 2
---

# TreeList in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI TreeList for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug databinding_treelist_aspnetcore %}) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To bind the TreeList to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Configure the `Create`, `Read`, `Update`, and `Delete` methods of the `DataSource` instance. The URL in each option must refer to the method name in the `PageModel`. Also, set the `Id` field in the `Model()` configuration of the `DataSource`. It is mandatory for the `Create`, `Update`, `Delete` operations.

    ```HtmlHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        @(Html.Kendo().TreeList<EmployeeDirectoryModel>()
            .Name("treelist")
            .Toolbar(toolbar => toolbar.Create())
            .Columns(columns =>
            {
                columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
                columns.Add().Field(e => e.LastName).Title("Last Name").Width(200);
                columns.Add().Field(e => e.Position);
                columns.Add().Width(350).Command(c =>
                {
                    c.CreateChild().Text("Add child");
                    c.Edit();
                    c.Destroy();
                })
                .HtmlAttributes(new
                {
                    style = "text-align: center;"
                });
            })
            .Editable()
            .DataSource(dataSource => dataSource
                .Read(r => r.Url(Url.Page("Index", "Read")).Data("forgeryToken"))
                .Update(u => u.Url(Url.Page("Index", "Update")).Data("forgeryToken"))
                .Create(c => c.Url(Url.Page("Index", "Create")).Data("forgeryToken"))
                .Destroy(d => d.Url(Url.Page("Index", "Destroy")).Data("forgeryToken"))
                .Model(m =>
                {
                    m.Id(f => f.EmployeeId); // Provide the Id property of the model.
                    m.ParentId(f => f.ReportsTo); // Provide the Child Id property of the model.
                    m.Expanded(true); // Set to "true" if you want the TreeList to be expanded by default.
                    m.Field(f => f.FirstName);
                    m.Field(f => f.LastName);
                    m.Field(f => f.ReportsTo);
                    m.Field(f => f.Position);
                })
            )
            .Height(540)
        )
    ```
    ```TagHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <kendo-treelist name="treelist" height="540">
            <toolbar>
                <treelist-toolbar-button name="create" />
            </toolbar>
            <columns>
                <treelist-column field="FirstName" width="220px" title="First Name"></treelist-column>
                <treelist-column field="LastName" title="Last Name" width="200px"></treelist-column>
                <treelist-column field="Position"></treelist-column>
                <treelist-column width="350px">
                    <commands>
                        <treelist-column-command name="createChild" text="Add child" />
                        <treelist-column-command name="edit" />
                        <treelist-column-command name="destroy" />
                    </commands>
                </treelist-column>
            </columns>
            <editable enabled="true"/>
            <treelist-datasource>
                <transport>
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
                    <update url="@Url.Page("Index", "Update")" data="forgeryToken"/>
                    <create url="@Url.Page("Index", "Create")" data="forgeryToken"/>
                    <destroy url="@Url.Page("Index", "Destroy")" data="forgeryToken"/>
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                        <fields>
                            <field name="EmployeeId" type="number"></field>
                            <field name="ReportsTo" nullable="true"></field>
                            <field name="FirstName" type="string"></field>
                            <field name="LastName" type="string"></field>
                            <field name="Position" type="string"></field>
                        </fields>
                    </treelist-model>
                </schema>
            </treelist-datasource>
        </kendo-treelist>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the CRUD requests.

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

1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        private static IList<EmployeeDirectoryModel> employees;

        public void OnGet()
        {
            GetDirectory();
        }

        private IList<EmployeeDirectoryModel> GetDirectory()
        {
            if (employees == null)
            {
                // Populate the "employees" collection with data.
                employees = new List<EmployeeDirectoryModel>();
                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 1,
                    FirstName = "Daryl",
                    LastName = "Sweeney",
                    ReportsTo = null,
                    Position = "CEO",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 2,
                    FirstName = "Guy",
                    LastName = "Wooten",
                    ReportsTo = 1,
                    Position = "Chief Technical Officer"
                });
                ... // Add more records.
            }

            return employees;
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            var result = employees.ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );
            return new JsonResult(result);
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            employee.EmployeeId = employees.Count + 2;
            employees.Add(employee);

            return new JsonResult(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            var target = employees.FirstOrDefault(x => x.EmployeeId == employee.EmployeeId);

            if(target != null)
            {
                target.FirstName = employee.FirstName;
                target.LastName = employee.LastName;
                target.Position = employee.Position;
                target.ReportsTo = employee.ReportsTo;
            }

            return new JsonResult(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            employees.Remove(employees.FirstOrDefault(x => x.EmployeeId == employee.EmployeeId));

            return new JsonResult(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }
    }
    ```
    ```Model
        public class EmployeeDirectoryModel
        {
            [ScaffoldColumn(false)]
            public int EmployeeId { get; set; }

            [Required]
            [Display(Name = "First name")]
            public string FirstName { get; set; }

            [Display(Name = "Last name")]
            public string LastName { get; set; }

            [ScaffoldColumn(false)]
            public int? ReportsTo { get; set; }

            public string Position { get; set; }

            [ScaffoldColumn(false)]
            public bool hasChildren { get; set; }
        }
    ```
For the complete project, refer to the [TreeList in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TreeList/TreeListCrudOperations.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [Server-Side HtmlHelper API of the TreeList](/api/treelist)
* [Server-Side TagHelper API of the TreeList](/api/taghelpers/treelist)
* [Knowledge Base Section](/knowledge-base)