---
title:  Razor Pages
page_title: Configure a DataSource for the TreeList for Remote Binding in Razor Pages.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI TreeList HtmlHelper for {{ site.framework }} in a Razor Pages using CRUD Operations."
slug: htmlhelpers_treelist_razorpage_aspnetcore
position: 1
---

# Razor Page

### TreeList CRUD Operations in Razor Pages

This article showcases how to perform CRUD operations with the TreeList component in a Razor Pages scenario.

To set up the TreeList component bindings, you need to configure the `Create`, `Read`, `Update`, `Delete` methods of its `DataSource` instance. The URLs in these methods must refer to the method names in the PageModel. See the implementation details in the example below. For the complete project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.TreeList.TreeListCrudOperationsModel
@{
    ViewData["Title"] = "TreeListCrudOperations";
}

@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@(Html.Kendo().TreeList<EmployeeDirectoryModel>()
    .Name("treelist")
    .Toolbar(toolbar => toolbar.Create())
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
        columns.Add().Field(e => e.LastName).Title("Last Name").Width(200);
        columns.Add().Field(e => e.Position);
        columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
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
        .Read(r => r.Url("/TreeList/TreeListCrudOperations?handler=Read").Data("forgeryToken")) // Specify the url to the OnPostRead method.
        .Update(u => u.Url("/TreeList/TreeListCrudOperations?handler=Update").Data("forgeryToken"))
        .Create(c => c.Url("/TreeList/TreeListCrudOperations?handler=Create").Data("forgeryToken"))
        .Destroy(d => d.Url("/TreeList/TreeListCrudOperations?handler=Destroy").Data("forgeryToken"))
        .Model(m =>
        {
            m.Id(f => f.EmployeeId); // Provide the Id property of the model.
            m.ParentId(f => f.ReportsTo); // Provide the Child Id property of the model.
            m.Expanded(true); // Set to true if you want the TreeList to be expanded by default.
            m.Field(f => f.FirstName);
            m.Field(f => f.LastName);
            m.Field(f => f.ReportsTo);
            m.Field(f => f.HireDate);
            m.Field(f => f.Position);
        })
    )
    .Height(540)
)

<script>
    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }
</script>

<style>
    .k-treelist .k-command-cell .k-button {
        min-width: 0px;
        padding: 10px 10px 10px 10px;
    }
</style>
```

```tab-PageModel(cshtml.cs)
using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Telerik.Examples.RazorPages.Models;

namespace Telerik.Examples.RazorPages.Pages.TreeList
{
    public class TreeListCrudOperationsModel : PageModel
    {
        private static IList<EmployeeDirectoryModel> employees;

        public void OnGet()
        {
            GetDirectory(); // Retrieve the sample data.
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            // Apply any DataSource operations such as Paging/Filtering/Sorting to the List.
            var result = employees.ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );

            return new JsonResult(result);
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            // Assign an Id to the newly created employee and add them to the list.
            employee.EmployeeId = employees.Count + 2;
            employees.Add(employee);

            return new JsonResult(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            var target = employees.FirstOrDefault(x => x.EmployeeId == employee.EmployeeId);

            // Update the data for the employee that was edited.
            if(target != null)
            {
                target.FirstName = employee.FirstName;
                target.LastName = employee.LastName;
                target.HireDate = employee.HireDate;
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

        // Add some sample data to the list.
        private IList<EmployeeDirectoryModel> GetDirectory()
        {
            if (employees == null)
            {
                employees = new List<EmployeeDirectoryModel>();
                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 1,
                    FirstName = "Daryl",
                    LastName = "Sweeney",
                    ReportsTo = null,
                    HireDate = DateTime.Now.AddDays(1),
                    Position = "CEO",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 2,
                    FirstName = "Guy",
                    LastName = "Wooten",
                    ReportsTo = 1,
                    HireDate = DateTime.Now.AddDays(2),
                    Position = "Chief Technical Officer"
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 3,
                    FirstName = "Buffy",
                    LastName = "Weber",
                    ReportsTo = 2,
                    HireDate = DateTime.Now.AddDays(3),
                    Position = "VP, Engineering"
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 4,
                    FirstName = "Hyacinth",
                    LastName = "Hood",
                    ReportsTo = 3,
                    HireDate = DateTime.Now.AddDays(4),
                    Position = "Team Lead"
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 5,
                    FirstName = "Akeem",
                    LastName = "Carr",
                    ReportsTo = 4,
                    HireDate = DateTime.Now.AddDays(5),
                    Position = "Junior Software Developer"
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 6,
                    FirstName = "Rinah",
                    LastName = "Simon",
                    ReportsTo = 4,
                    HireDate = DateTime.Now.AddDays(6),
                    Position = "Software Developer"
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 7,
                    FirstName = "Gage",
                    LastName = "Daniels",
                    ReportsTo = 3,
                    HireDate = DateTime.Now.AddDays(7),
                    Position = "Software Architect",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 8,
                    FirstName = "Constance",
                    LastName = "Vazquez",
                    ReportsTo = 3,
                    HireDate = DateTime.Now.AddDays(8),
                    Position = "Director, Engineering",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 9,
                    FirstName = "Darrel",
                    LastName = "Solis",
                    ReportsTo = 8,
                    HireDate = DateTime.Now.AddDays(9),
                    Position = "Team Lead",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 10,
                    FirstName = "Brian",
                    LastName = "Yang",
                    ReportsTo = 9,
                    HireDate = DateTime.Now.AddDays(10),
                    Position = "Senior Software Developer",
                });

                employees.Add(new EmployeeDirectoryModel
                {
                    EmployeeId = 11,
                    FirstName = "Lillian",
                    LastName = "Bradshaw",
                    ReportsTo = 9,
                    HireDate = DateTime.Now.AddDays(11),
                    Position = "Software Developer",
                });
            }

            return employees;
        }
    }
}
```

```tab-EmployeeDirectoryModel.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace Telerik.Examples.RazorPages.Models
{
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

        private DateTime? hireDate;
        [DataType(DataType.Date)]
        [Display(Name = "Hire Date")]
        public DateTime? HireDate
        {
            get
            {
                return hireDate;
            }
            set
            {
                if (value.HasValue)
                {
                    hireDate = value.Value;
                }
                else
                {
                    hireDate = null;
                }
            }
        }
    }
}
```

* [Server-Side API](/api/treelist)