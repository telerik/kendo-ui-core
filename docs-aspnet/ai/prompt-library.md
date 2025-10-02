---
title: Prompt Library
page_title: Telerik {{ site.framework }} Prompt Library
description: Explore the extensive collection of prompts that you can use with the Telerik {{ site.framework }} AI Coding Assistant.
slug: ai_prompt_library
position: 4
---

# Telerik {{ site.framework }} Prompt Library

Welcome to the Telerik {{ site.framework }} Prompt Library.

The prompts provided here are intended and optimized for use with the Telerik {{ site.framework }} AI Coding Assistant [MCP Server](slug:ai_mcp_server). They can help you kick start your app development and speed up the component configuration process.

This collection of prompts is not exhaustive and the Telerik {{ site.framework }} team is constantly working on adding more prompts to the library.

>tip [Go straight to the prompts ⬇️](#component-specific-prompts)

## How to Use the Prompts

All prompts in this library target the [MCP Server](slug:ai_mcp_server) through the {% if site.mvc %}`#telerik-aspnetmvc-assistant`{% endif %}{% if site.core %}`#telerik-aspnetcorehtml-assistant` or `#telerik-aspnetcoretag-assistant`{% endif %} handle. Make sure that you have installed and enabled {% if site.core %}either{% endif %} the Telerik {{ site.framework }} HtmlHelpers {% if site.core %}or Telerik {{ site.framework }} TagHelpers{% endif %} MCP Server before attempting to run the prompts.

1. Browse the prompt library to find a prompt that suits your needs.
2. Copy the prompt text (including the {% if site.mvc %}`#telerik-aspnetmvc-assistant`{% endif %}{% if site.core %}`#telerik-aspnetcorehtml-assistant` or `#telerik-aspnetcoretag-assistant`{% endif %} handle, based on the used HtmlHelper {% if site.core %}or TagHelper{% endif %} synax).
3. (Optional) Customize the prompt as needed for your specific use case but keep the {% if site.mvc %}`#telerik-aspnetmvc-assistant`{% endif %}{% if site.core %}`#telerik_aspnetcore{syntax type}_assistant`{% endif %} handle.<br/>When modifying the prompts, make sure the changes comply with the [intended use](slug:overview_ai#intended-use) and the [recommendations](slug:overview_ai#recommendations) for the AI Coding Assistant.
4. Run the prompt against the [MCP Server](slug:ai_mcp_server).

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

{% if site.core %}
>caption Use with the Copilot Extension
To run the provided prompts in the [Telerik {{ site.framework }} GitHub Copilot Extension](slug:ai_copilot_extension) (without the MCP Server installed), modify the prompts to use the `@telerikaspnetcorehtml` or `@telerikaspnetcoretag` handle instead.
{% endif %}

## Component-Specific Prompts

This section provides prompt ideas for the most popular and complex {{ site.product }} components.

{% if site.core %}
### Grid

The [{{ site.product }} Grid](slug:htmlhelpers_grid_aspnetcore_overview) lets you create responsive, accessible, and customizable {{ site.framework }} applications that require the displaying and management of large datasets.

#### HtmlHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Grid
#telerik-aspnetcorehtml-assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality. 
```
```C# Output
// View
@(Html.Kendo().Grid<ProjectName.Models.Employee>()
    .Name("employeeGrid")
    .Columns(columns =>
    {
        columns.Bound(c => c.ID).Title("Employee ID").Width(120);
        columns.Bound(c => c.Name).Title("Full Name").Width(200);
        columns.Bound(c => c.Position).Title("Position").Width(180);
        columns.Bound(c => c.Salary).Title("Salary").Format("{0:C}").Width(150);
    })
    .Sortable()
    .Pageable(pageable => pageable
        .Refresh(true)
        .PageSizes(true)
        .ButtonCount(5))
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(10)
        .ServerOperation(false)
        .Read(read => read.Action("GetEmployees", "Home")))
    .Height(500)
)

// Controller
using ProjectName.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

public class HomeController : Controller
{
    // ...existing code...
    
    public ActionResult GetEmployees([DataSourceRequest] DataSourceRequest request)
    {
        var employees = GetEmployeeData();
        return Json(employees.ToDataSourceResult(request));
    }
    
    private List<Employee> GetEmployeeData()
    {
        return new List<Employee>
        {
            new Employee { ID = 1, Name = "John Doe", Position = "Software Developer", Salary = 75000 },
            new Employee { ID = 2, Name = "Jane Smith", Position = "Project Manager", Salary = 85000 },
            new Employee { ID = 3, Name = "Mike Johnson", Position = "Senior Developer", Salary = 95000 },
            new Employee { ID = 4, Name = "Sarah Wilson", Position = "UX Designer", Salary = 70000 },
            new Employee { ID = 5, Name = "David Brown", Position = "DevOps Engineer", Salary = 80000 },
            new Employee { ID = 6, Name = "Lisa Garcia", Position = "QA Engineer", Salary = 65000 },
            new Employee { ID = 7, Name = "Tom Anderson", Position = "Technical Lead", Salary = 100000 },
            new Employee { ID = 8, Name = "Emily Davis", Position = "Business Analyst", Salary = 72000 },
            new Employee { ID = 9, Name = "Chris Martinez", Position = "Full Stack Developer", Salary = 82000 },
            new Employee { ID = 10, Name = "Amanda Taylor", Position = "Scrum Master", Salary = 78000 },
            new Employee { ID = 11, Name = "Robert Lee", Position = "Database Administrator", Salary = 77000 },
            new Employee { ID = 12, Name = "Jennifer White", Position = "UI Developer", Salary = 68000 }
        };
    }
    
    // ...existing code...
}

//Model
  public class Employee
  {
      public int ID { get; set; }
      public string Name { get; set; }
      public string Position { get; set; }
      public decimal Salary { get; set; }
  }
```



```prompt Filtering
#telerik-aspnetcorehtml-assistant Implement a Grid with filter row functionality. Show how to set up default filter operators for text, numeric, and date columns.
```
```C# Output
// View
@(Html.Kendo().Grid<ProjectName.Models.Employee>()
    .Name("employeeGrid")
    .Columns(columns =>
    {
        // Text column with "contains" operator
        columns.Bound(p => p.FirstName)
            .Title("First Name")
            .Filterable(f => f.Cell(cell => cell
                .Operator("contains")
            ));

        // Text column with "startswith" operator
        columns.Bound(p => p.LastName)
            .Title("Last Name")
            .Filterable(f => f.Cell(cell => cell
                .Operator("startswith")
                .ShowOperators(true)
            ));

        // Numeric column with "eq" (equals) operator
        columns.Bound(p => p.Age)
            .Title("Age")
            .Filterable(f => f.Cell(cell => cell
                .Operator("eq")
                .ShowOperators(true)
            ));

        // Numeric column with "gte" (greater than or equal) operator
        columns.Bound(p => p.Salary)
            .Title("Salary")
            .Format("{0:C}")
            .Filterable(f => f.Cell(cell => cell
                .Operator("gte")
                .ShowOperators(true)
            ));

        // Date column with "eq" operator
        columns.Bound(p => p.HireDate)
            .Title("Hire Date")
            .Format("{0:MM/dd/yyyy}")
            .Filterable(f => f.Cell(cell => cell
                .Operator("eq")
                .ShowOperators(true)
            ));

        // Date column with "gte" operator for filtering from a specific date
        columns.Bound(p => p.BirthDate)
            .Title("Birth Date")
            .Format("{0:MM/dd/yyyy}")
            .Filterable(f => f.Cell(cell => cell
                .Operator("gte")
                .ShowOperators(true)
            ));

        // Boolean column (if you have one)
        columns.Bound(p => p.IsActive)
            .Title("Active")
            .Filterable(f => f.Cell(cell => cell
                .Operator("eq")
                .ShowOperators(false)
            ));
    })
    .Filterable(filterable => filterable
        .Mode(GridFilterMode.Row)
        .Extra(false)
    )
    .Pageable()
    .Sortable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("GetEmployees", "Home"))
    )
    .Height(550)
)

//Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using ProjectName.Models;

public class HomeController : Controller
{
  public ActionResult GetEmployees([DataSourceRequest] DataSourceRequest request)
  {
      var employees = GetSampleEmployees();
      return Json(employees.ToDataSourceResult(request));
  }

  private IEnumerable<Employee> GetSampleEmployees()
  {
      return new List<Employee>
      {
          new Employee { Id = 1, FirstName = "John", LastName = "Doe", Age = 30, Salary = 50000, HireDate = new DateTime(2020, 1, 15), BirthDate = new DateTime(1993, 5, 10), IsActive = true },
          new Employee { Id = 2, FirstName = "Jane", LastName = "Smith", Age = 28, Salary = 55000, HireDate = new DateTime(2021, 3, 20), BirthDate = new DateTime(1995, 8, 22), IsActive = true },
          new Employee { Id = 3, FirstName = "Bob", LastName = "Johnson", Age = 35, Salary = 60000, HireDate = new DateTime(2019, 7, 10), BirthDate = new DateTime(1988, 12, 5), IsActive = false },
          new Employee { Id = 4, FirstName = "Alice", LastName = "Brown", Age = 32, Salary = 58000, HireDate = new DateTime(2020, 11, 5), BirthDate = new DateTime(1991, 3, 18), IsActive = true },
          new Employee { Id = 5, FirstName = "Charlie", LastName = "Wilson", Age = 29, Salary = 52000, HireDate = new DateTime(2022, 2, 28), BirthDate = new DateTime(1994, 7, 30), IsActive = true }
      };
  }
}

//Model
using System.ComponentModel.DataAnnotations;

namespace ProjectName.Models
{
    public class Employee
    {
        public int Id { get; set; }
        
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        
        public int Age { get; set; }
        
        public decimal Salary { get; set; }
        
        [Display(Name = "Hire Date")]
        public DateTime HireDate { get; set; }
        
        [Display(Name = "Birth Date")]
        public DateTime BirthDate { get; set; }
        
        [Display(Name = "Is Active")]
        public bool IsActive { get; set; }
    }
}
```



```prompt Export
#telerik-aspnetcorehtml-assistant Add Excel and PDF export functionality to a Grid.
```
```C# Output
//View
@(Html.Kendo().Grid<ProjectName.Models.Employee>()
    .Name("employeeGrid")
    .ToolBar(toolbar => 
    {
        toolbar.Excel();
        toolbar.Pdf();
    })
    .Excel(excel => excel
        .FileName("EmployeeDirectory.xlsx")
        .Filterable(true)
        .ProxyURL(Url.Action("Excel_Export_Save", "Home"))
    )
    .Pdf(pdf => pdf
        .FileName("EmployeeDirectory.pdf")
        .ProxyURL(Url.Action("Pdf_Export_Save", "Home"))
        .Scale(0.8)
        .Margin("1cm", "1cm", "1cm", "1cm")
        .PaperSize("A4")
        .Landscape(true)
    )
    .Columns(columns =>
    {
        columns.Bound(c => c.Id).Title("Employee ID").Width(120);
        columns.Bound(c => c.FirstName);
        columns.Bound(c => c.Age);
        columns.Bound(c => c.Salary).Title("Salary").Format("{0:C}").Width(150);
    })
    .Sortable()
    .Pageable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(10)
        .Read(read => read.Action("GetEmployees", "Home")))
    .Height(500)
)

//Controller
[HttpPost]
public ActionResult Excel_Export_Save(string contentType, string base64, string fileName)
{
    var fileContents = Convert.FromBase64String(base64);
    return File(fileContents, contentType, fileName);
}

[HttpPost]
public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
{
    var fileContents = Convert.FromBase64String(base64);
    return File(fileContents, contentType, fileName);
}

//Required Dependencies
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>
```



```prompt Virtualization
#telerik-aspnetcorehtml-assistant Set up a Grid with virtual scrolling to handle large datasets efficiently.
```
```C# Output
@(Html.Kendo().Grid<ProjectName.Models.Employee>()
    .Name("virtualGrid")
    .Columns(columns =>
    {
        columns.Bound("Id").Width(100);
        columns.Bound("Name").Width(200);
        columns.Bound("Email").Width(250);
        columns.Bound("Department").Width(150);
        columns.Bound("Salary").Width(120).Format("{0:c}");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(100) // Important: Set appropriate page size for virtual scrolling
        .Read(read => read.Action("GetData", "Home"))
        .ServerOperation(true) // Enable server-side operations for better performance
    )
    .Scrollable(scrollable => scrollable
        .Virtual(Kendo.Mvc.UI.GridVirtualizationMode.Rows) // Enable row virtualization
        .Height(400) // Set fixed height for virtual scrolling
    )
    .Sortable()
    .Filterable()
)
```



```prompt Column Templates
#telerik-aspnetcorehtml-assistant Create a Grid that bind to a Model and has 3 columns: Name, Age, Status, and StartDate. The Name column must use a client template with the Name and Age values. The StartDate column must be displayed in foramt "dd/MM/yyyy". The Status column must display "Active" if its value is "true" and "Inactive" if its value is "false".
```
```C# Output
//View
@(Html.Kendo().Grid<ProjectName.Models.Employee>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(c => c.Name)
            .Title("Name")
            .ClientTemplate("#= Name # (Age: #= Age #)");
        
        columns.Bound(c => c.StartDate)
            .Title("Start Date")
            .Format("{0:dd/MM/yyyy}");
        
        columns.Bound(c => c.Status)
            .Title("Status")
            .ClientTemplate("#= Status ? 'Active' : 'Inactive' #");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("GetEmployees", "Home"))
    )
)

//Controller
public ActionResult GetEmployees([DataSourceRequest] DataSourceRequest request)
{
  var employees = new List<Employee>
  {
      new Employee { Name = "John Doe", Age = 30, Status = true, StartDate = new DateTime(2020, 1, 15) },
      new Employee { Name = "Jane Smith", Age = 25, Status = false, StartDate = new DateTime(2021, 3, 10) },
      new Employee { Name = "Bob Johnson", Age = 35, Status = true, StartDate = new DateTime(2019, 7, 22) }
  };

  return Json(employees.ToDataSourceResult(request));
}

//Model
public class Employee
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool Status { get; set; }
    public DateTime StartDate { get; set; }
}
```

</div>

#### TagHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Grid
#telerik-aspnetcoretag-assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality. 
```
```C# Output
// View
@addTagHelper "*, Kendo.Mvc"

<kendo-grid name="employeeGrid">
  <datasource type="DataSourceTagHelperType.Ajax" 
    page-size="10"
    server-paging="true" 
    server-sorting="true">
    <transport>
        <read url="@Url.Action("GetEmployees", "Home")" />
    </transport>
    <schema>
        <model id="Id">
            <fields>
                <field name="Id" type="number"></field>
                <field name="Name" type="string"></field>
                <field name="Position" type="string"></field>
                <field name="Salary" type="number"></field>
            </fields>
        </model>
    </schema>
  </datasource>
  <columns>
      <column field="Id" title="Employee ID" width="120" />
      <column field="Name" title="Full Name" width="200" />
      <column field="Position" title="Position" width="180" />
      <column field="Salary" title="Salary" width="150" format="{0:C}" />
  </columns>
  <sortable enabled="true" allow-unsort="true" mode="single" />
  <pageable enabled="true" 
    button-count="5" 
    refresh="true" 
    page-sizes="new int[] { 5, 10, 20, 50 }" 
    page-sizes-enabled="true" 
    input="true" 
    numeric="true" 
    info="true" 
    previous-next="true" />
</kendo-grid>

// Controller
using ProjectName.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

public class HomeController : Controller
{
    public ActionResult GetEmployees([DataSourceRequest] DataSourceRequest request)
    {
        var employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John Doe", Position = "Software Engineer", Salary = 75000 },
            new Employee { Id = 2, Name = "Jane Smith", Position = "Project Manager", Salary = 85000 },
            new Employee { Id = 3, Name = "Mike Johnson", Position = "Designer", Salary = 65000 },
            new Employee { Id = 4, Name = "Sarah Wilson", Position = "QA Engineer", Salary = 70000 },
            new Employee { Id = 5, Name = "David Brown", Position = "DevOps Engineer", Salary = 80000 },
            new Employee { Id = 6, Name = "Lisa Davis", Position = "Business Analyst", Salary = 72000 },
            new Employee { Id = 7, Name = "Tom Miller", Position = "Senior Developer", Salary = 90000 },
            new Employee { Id = 8, Name = "Anna Garcia", Position = "UI/UX Designer", Salary = 68000 },
            new Employee { Id = 9, Name = "Chris Lee", Position = "Team Lead", Salary = 95000 },
            new Employee { Id = 10, Name = "Emma Taylor", Position = "Data Analyst", Salary = 73000 }
        };

        return Json(employees.ToDataSourceResult(request));
    }
}

//Model
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public decimal Salary { get; set; }
}
```



```prompt Filtering
#telerik-aspnetcoretag-assistant Implement a basic Grid with enabled default filter row functionality. Set up default filter operators for some of the columns.
```
```C# Output
//View
@addTagHelper "*, Kendo.Mvc"

<kendo-grid name="employeeGrid" height="500">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="10" server-operation="true">
        <transport>
            <read url="@Url.Action("GetEmployees", "Home")" />
        </transport>
        <schema data="Data" total="Total" errors="Errors">
            <model id="Id">
                <fields>
                    <field name="Id" type="number"></field>
                    <field name="Name" type="string"></field>
                    <field name="Position" type="string"></field>
                    <field name="Department" type="string"></field>
                    <field name="Salary" type="number"></field>
                    <field name="HireDate" type="date"></field>
                    <field name="Age" type="number"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    
    <!-- Enable filter row functionality -->
    <filterable mode="row" enabled="true">
        <operators>
            <!-- String operators -->
            <string eq="Equals" 
                    neq="Not Equal" 
                    contains="Contains" 
                    doesnotcontain="Does Not Contain"
                    startswith="Starts With"
                    endswith="Ends With"></string>
            
            <!-- Number operators -->
            <number eq="Equal" 
                    neq="Not Equal" 
                    gt="Greater Than" 
                    gte="Greater or Equal" 
                    lt="Less Than" 
                    lte="Less or Equal"></number>
            
            <!-- Date operators -->
            <date eq="Equal" 
                  neq="Not Equal" 
                  gt="After" 
                  gte="On or After" 
                  lt="Before" 
                  lte="On or Before"></date>
        </operators>
    </filterable>
    
    <sortable enabled="true" />
    <pageable enabled="true" refresh="true" page-sizes="new int[] { 5, 10, 20, 50 }" />
    
    <columns>
        <!-- Numeric column with default "equals" operator -->
        <column field="Id" title="ID" width="80">
            <filterable>
                <cell operator="eq" show-operators="true"></cell>
            </filterable>
        </column>
        
        <!-- Text column with "contains" operator (good for searching names) -->
        <column field="Name" title="Employee Name" width="200">
            <filterable>
                <cell operator="contains" show-operators="true" delay="500"></cell>
            </filterable>
        </column>
        
        <!-- Text column with "startswith" operator (good for positions) -->
        <column field="Position" title="Position" width="180">
            <filterable>
                <cell operator="startswith" show-operators="true" delay="500"></cell>
            </filterable>
        </column>
        
        <!-- Text column with "eq" operator for exact department matches -->
        <column field="Department" title="Department" width="150">
            <filterable>
                <cell operator="eq" show-operators="true"></cell>
            </filterable>
        </column>
        
        <!-- Numeric column with "gte" operator (good for salary filtering) -->
        <column field="Salary" title="Salary" width="130" format="{0:C}">
            <filterable>
                <cell operator="gte" show-operators="true" delay="300"></cell>
            </filterable>
        </column>
        
        <!-- Date column with "gte" operator (hired on or after date) -->
        <column field="HireDate" title="Hire Date" width="120" format="{0:MM/dd/yyyy}">
            <filterable>
                <cell operator="gte" show-operators="true"></cell>
            </filterable>
        </column>
        
        <!-- Numeric column with "eq" operator for age -->
        <column field="Age" title="Age" width="80">
            <filterable>
                <cell operator="eq" show-operators="true"></cell>
            </filterable>
        </column>
    </columns>
</kendo-grid>

//Controller
using Microsoft.AspNetCore.Mvc;
using ProjctName.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace ProjctName.Controllers
{
    public class HomeController : Controller
    {
        public JsonResult GetEmployees([DataSourceRequest] DataSourceRequest request)
        {
            var employees = GetEmployeeData();
            
            // Apply server-side filtering, sorting, and paging
            var result = employees.ToDataSourceResult(request);
            
            return Json(result);
        }
        
        private List<Employee> GetEmployeeData()
        {
            return new List<Employee>
            {
                new Employee { Id = 1, Name = "John Doe", Position = "Software Developer", Department = "Engineering", Salary = 75000, HireDate = new DateTime(2020, 3, 15), Age = 32 },
                new Employee { Id = 2, Name = "Jane Smith", Position = "Project Manager", Department = "Engineering", Salary = 85000, HireDate = new DateTime(2019, 7, 22), Age = 28 },
                new Employee { Id = 3, Name = "Mike Johnson", Position = "Senior Developer", Department = "Engineering", Salary = 95000, HireDate = new DateTime(2018, 1, 10), Age = 35 },
                new Employee { Id = 4, Name = "Sarah Wilson", Position = "UX Designer", Department = "Design", Salary = 70000, HireDate = new DateTime(2021, 5, 8), Age = 26 },
                new Employee { Id = 5, Name = "David Brown", Position = "DevOps Engineer", Department = "Operations", Salary = 80000, HireDate = new DateTime(2020, 11, 3), Age = 41 },
                new Employee { Id = 6, Name = "Lisa Garcia", Position = "QA Engineer", Department = "Engineering", Salary = 65000, HireDate = new DateTime(2019, 9, 14), Age = 29 },
                new Employee { Id = 7, Name = "Tom Anderson", Position = "Technical Lead", Department = "Engineering", Salary = 100000, HireDate = new DateTime(2017, 12, 1), Age = 38 },
                new Employee { Id = 8, Name = "Emily Davis", Position = "Business Analyst", Department = "Business", Salary = 72000, HireDate = new DateTime(2020, 6, 18), Age = 24 },
                new Employee { Id = 9, Name = "Chris Martinez", Position = "Full Stack Developer", Department = "Engineering", Salary = 82000, HireDate = new DateTime(2019, 2, 25), Age = 33 },
                new Employee { Id = 10, Name = "Amanda Taylor", Position = "Scrum Master", Department = "Engineering", Salary = 78000, HireDate = new DateTime(2021, 8, 12), Age = 27 },
                new Employee { Id = 11, Name = "Robert Lee", Position = "Database Administrator", Department = "Operations", Salary = 77000, HireDate = new DateTime(2018, 4, 5), Age = 42 },
                new Employee { Id = 12, Name = "Jennifer White", Position = "UI Developer", Department = "Design", Salary = 68000, HireDate = new DateTime(2020, 9, 20), Age = 30 }
            };
        }
    }
}

//Model
namespace ProjectName.Models
{
  public class Employee
  {
      public int Id { get; set; }
      public string Name { get; set; }
      public string Position { get; set; }
      public string Department { get; set; }
      public decimal Salary { get; set; }
      public DateTime HireDate { get; set; }
      public int Age { get; set; }
  }
}
```



```prompt Export
#telerik-aspnetcoretag-assistant Add Excel and PDF export functionality to a Grid.
```
```C# Output
//View
@addTagHelper "*, Kendo.Mvc"

<kendo-grid name="grid" height="550">
    <datasource type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Grid_Read", "Home")" />
        </transport>
    </datasource>
    <columns>
        <column field="EmployeeID" title="ID" width="100" />
        <column field="FirstName" title="First Name" width="200" />
        <column field="LastName" title="Last Name" width="200" />
        <column field="Title" title="Title" width="200" />
    </columns>
    <toolbar>
        <toolbar-button name="excel" />
        <toolbar-button name="pdf" />
    </toolbar>
    <excel file-name="Employees.xlsx" all-pages="true" proxy-url="@Url.Action("Excel_Export_Save", "Home")" />
    <pdf file-name="Employees.pdf" all-pages="true" proxy-url="@Url.Action("Pdf_Export_Save", "Home")" />
    <pageable enabled="true" page-size="10" />
    <sortable enabled="true" />
    <filterable enabled="true" />
</kendo-grid>

//Controller
public IActionResult Excel_Export_Save(string contentType, string base64, string fileName)
{
    var fileContents = Convert.FromBase64String(base64);
    return File(fileContents, contentType, fileName);
}

public IActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
{
    var fileContents = Convert.FromBase64String(base64);
    return File(fileContents, contentType, fileName);
}

//Required Dependencies
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>
```



```prompt Virtualization
#telerik-aspnetcoretag-assistant Set up a TagHelper Grid with enabled virtual scrolling to handle large datasets efficiently.
```
```C# Output
//View
@addTagHelper "*, Kendo.Mvc"

<kendo-grid name="virtualGrid" 
  height="400"
  auto-bind="true">
  <scrollable virtual="GridVirtualizationMode.Rows" />
  <datasource type="DataSourceTagHelperType.Ajax" 
              page-size="100"
              server-operation="true">
      <transport>
          <read url="@Url.Action("GetVirtualData", "Home")" />
      </transport>
      <schema>
          <model id="Id">
              <fields>
                  <field name="Id" type="number"></field>
                  <field name="Name" type="string"></field>
                  <field name="Email" type="string"></field>
                  <field name="Department" type="string"></field>
                  <field name="Salary" type="number"></field>
                  <field name="HireDate" type="date"></field>
              </fields>
          </model>
      </schema>
  </datasource>
  <columns>
      <column field="Id" title="ID" width="80px" />
      <column field="Name" title="Employee Name" width="200px" />
      <column field="Email" title="Email" width="250px" />
      <column field="Department" title="Department" width="150px" />
      <column field="Salary" title="Salary" width="120px" format="{0:c}" />
      <column field="HireDate" title="Hire Date" width="150px" format="{0:MM/dd/yyyy}" />
  </columns>
  <sortable enabled="true" />
  <filterable enabled="true" />
  <selectable mode="row" />
</kendo-grid>

//Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult GetVirtualData([DataSourceRequest] DataSourceRequest request)
    {
        // Generate sample data for demonstration
        var data = GenerateLargeDataset(50000); // 50k records for demo
        
        // Apply DataSourceRequest (paging, sorting, filtering)
        var result = data.ToDataSourceResult(request);
        
        return Json(result);
    }

    private List<Employee> GenerateLargeDataset(int count)
    {
        var departments = new[] { "IT", "HR", "Sales", "Marketing", "Finance" };
        var random = new Random();
        
        return Enumerable.Range(1, count).Select(i => new Employee
        {
            Id = i,
            Name = $"Employee {i}",
            Email = $"employee{i}@company.com",
            Department = departments[random.Next(departments.Length)],
            Salary = random.Next(30000, 120000),
            HireDate = DateTime.Now.AddDays(-random.Next(1, 3650))
        }).ToList();
    }
}

//Model
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
    public DateTime HireDate { get; set; }
}
```



```prompt Column Templates
#telerik-aspnetcoretag-assistant Create a Grid that has 3 columns: Name, Age, Status, and StartDate. The Name column must use a client template with the Name and Age values. The StartDate column must be displayed in foramt "dd/MM/yyyy". The Status column must display "Active" if its value is "true" and "Inactive" if its value is "false".
```
```C# Output
//View
@addTagHelper "*, Kendo.Mvc"

<kendo-grid name="grid">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <transport>
            <read url="/Home/GetGridData" />
        </transport>
        <schema>
            <model>
                <fields>
                    <field name="Name" type="string"></field>
                    <field name="Age" type="number"></field>
                    <field name="Status" type="boolean"></field>
                    <field name="StartDate" type="date"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <columns>
        <column field="Name" 
                title="Employee Details" 
                template="<strong>#= Name #</strong> (Age: #= Age #)">
        </column>
        <column field="Age" title="Age"></column>
        <column field="Status" 
                title="Status" 
                template="# if (Status) { # Active # } else { # Inactive # } #">
        </column>
        <column field="StartDate" 
                title="Start Date" 
                template="#= kendo.toString(StartDate, 'dd/MM/yyyy') #">
        </column>
    </columns>
    <pageable enabled="true"></pageable>
    <sortable enabled="true"></sortable>
    <filterable enabled="true"></filterable>
</kendo-grid>
```

</div>

### Charts

The [{{ site.product }} Charts](slug:htmlhelpers_charts_aspnetcore) provide a comprehensive charting solution for data visualization with multiple chart types and customization options.

#### HtmlHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Line Chart
#telerik-aspnetcorehtml-assistant Return a self-contained Razor snippet for a Line Chart showing sales for the 12 months, using inline numeric data and explicit month categories; .Name("chartLineBasic"), .Title, shared tooltip, and height 400px.
```
```C# Output
@(Html.Kendo().Chart()
    .Name("chartLineBasic")
    .Title("Sales Performance - 12 Months")
    .ChartArea(chartArea => chartArea.Height(400))
    .Series(series =>
    {
        series.Line(new object[] { 15.7, 16.7, 20, 23.5, 26.6, 24.8, 24.1, 20.1, 14.1, 12.5, 12.1, 16.2 })
              .Name("Sales (K)");
    })
    .CategoryAxis(axis => axis
        .Categories(new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" })
    )
    .Tooltip(tooltip => tooltip
        .Shared(true)
        .Format("{0}: {1}K")
    )
)
```



```prompt Area Chart
#telerik-aspnetcorehtml-assistant Self-contained Area Chart (normal stacking) for Product A/B/C with month categories; .Name("chartAreaStacked"); legend visible; shared tooltip; height ~420px.
```
```C# Output
@(Html.Kendo().Chart<object>()
    .Name("chartAreaStacked")
    .Title("Product Sales by Month")
    .ChartArea(chartArea => chartArea.Height(420))
    .Legend(true)
    .Series(series =>
    {
        series.Area(new object[] { 20, 25, 32, 35, 42, 38, 41, 44, 39, 28, 22, 27 })
              .Name("Product A")
              .Stack(true);
        series.Area(new object[] { 15, 18, 22, 28, 31, 29, 33, 36, 31, 24, 18, 21 })
              .Name("Product B")
              .Stack(true);
        series.Area(new object[] { 10, 12, 15, 18, 21, 19, 22, 25, 23, 16, 13, 17 })
              .Name("Product C")
              .Stack(true);
    })
    .CategoryAxis(axis => axis
        .Categories(new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" })
    )
    .Tooltip(tooltip => tooltip
        .Shared(true)
        .Format("{0}: {1}K")
    )
)
```



```prompt Column Chart
#telerik-aspnetcorehtml-assistant Self-contained Column Chart comparing three products over Jan–Jun with inline numbers; .Name("chartColumnProducts"); shared tooltip; value axis format "{0} units".
```
```C# Output
@(Html.Kendo().Chart<object>()
    .Name("chartColumnProducts")
    .Title("Product Comparison - Jan to Jun")
    .Series(series =>
    {
        series.Column(new object[] { 120, 135, 148, 165, 172, 158 })
              .Name("Product A");
        series.Column(new object[] { 98, 112, 125, 139, 144, 132 })
              .Name("Product B");
        series.Column(new object[] { 85, 92, 108, 115, 128, 121 })
              .Name("Product C");
    })
    .CategoryAxis(axis => axis
        .Categories(new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" })
    )
    .ValueAxis(axis => axis
        .Title(title => title.Text("Units Sold"))
        .Labels(labels => labels.Format("{0} units"))
    )
    .Tooltip(tooltip => tooltip
        .Shared(true)
        .Format("{0}: {1} units")
    )
    .Legend(true)
)
```



```prompt Donut Chart
#telerik-aspnetcorehtml-assistant Implement a donut chart with custom center text displaying total values and hover effects for individual segments.
```
```C# Output
<div style="position: relative;">
    @(Html.Kendo().Chart<object>()
        .Name("chartDonut")
        .Title("Sales Distribution")
        .ChartArea(chartArea => chartArea.Height(400))
        .Series(series =>
        {
            series.Donut(new object[] {
                new { category = "Product A", value = 250, color = "#3498db" },
                new { category = "Product B", value = 180, color = "#e74c3c" },
                new { category = "Product C", value = 320, color = "#2ecc71" },
                new { category = "Product D", value = 150, color = "#f39c12" }
            })
            .Field("value")
            .CategoryField("category")
            .ColorField("color")
            .HoleSize(60);
        })
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}: {1} units ({2:P})")
        )
        .Events(events => events
            .SeriesHover("onSeriesHover")
            .SeriesLeave("onSeriesLeave")
        )
    )
    
    <div id="centerText" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none;">
        <div style="font-size: 24px; font-weight: bold; color: #333;">900</div>
        <div style="font-size: 14px; color: #666;">Total Units</div>
    </div>
</div>

<script>
    function onSeriesHover(e) {
        var centerText = document.getElementById("centerText");
        var percentage = ((e.value / 900) * 100).toFixed(1);
        centerText.innerHTML = 
            '<div style="font-size: 20px; font-weight: bold; color: ' + e.series.color + ';">' + e.value + '</div>' +
            '<div style="font-size: 12px; color: #666;">' + e.category + '</div>' +
            '<div style="font-size: 12px; color: #666;">(' + percentage + '%)</div>';
    }
    
    function onSeriesLeave(e) {
        var centerText = document.getElementById("centerText");
        centerText.innerHTML = 
            '<div style="font-size: 24px; font-weight: bold; color: #333;">900</div>' +
            '<div style="font-size: 14px; color: #666;">Total Units</div>';
    }
</script>
```



```prompt Pie Chart
#telerik-aspnetcorehtml-assistant Create a pie chart for market share data with custom colors, data labels showing percentages, and legend positioning.
```
```C# Output
@(Html.Kendo().Chart<object>()
    .Name("chartMarketShare")
    .Title("Market Share Distribution")
    .ChartArea(chartArea => chartArea.Height(400))
    .Series(series =>
    {
        series.Pie(new object[] {
            new { company = "Company A", share = 35.5, color = "#3498db" },
            new { company = "Company B", share = 28.2, color = "#e74c3c" },
            new { company = "Company C", share = 18.7, color = "#2ecc71" },
            new { company = "Company D", share = 12.1, color = "#f39c12" },
            new { company = "Others", share = 5.5, color = "#9b59b6" }
        })
        .Field("share")
        .CategoryField("company")
        .ColorField("color")
        .Labels(labels => labels
            .Visible(true)
            .Format("{1:P1}")
            .Position(ChartPieLabelsPosition.OutsideEnd)
            .Background("transparent")
            .Color("#333")
        );
    })
    .Legend(legend => legend
        .Position(ChartLegendPosition.Right)
        .Labels(labels => labels.Template("#= text #: #= value #%"))
    )
    .Tooltip(tooltip => tooltip
        .Visible(true)
        .Format("{0}: {1}% market share")
    )
)
```

</div>

#### TagHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Line Chart
#telerik-aspnetcoretag-assistant Return a self-contained snippet for a Line Chart showing sales for the 12 months, using inline numeric data and explicit month categories; name="chartLineBasic", title, a shared tooltip, and height 400px.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<kendo-chart name="chartLineBasic" height="400">
    <chart-title text="Monthly Sales"></chart-title>
    
    <category-axis>
        <category-axis-item categories='@new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" }'>
        </category-axis-item>
    </category-axis>
    
    <series>
        <series-item type="ChartSeriesType.Line" 
                     name="Sales" 
                     data='@new double[] { 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 30000, 27000, 23000, 20000 }'>
        </series-item>
    </series>
    
    <tooltip shared="true" visible="true"></tooltip>
</kendo-chart>
```



```prompt Area Chart
#telerik-aspnetcoretag-assistant Self-contained Area Chart (normal stacking) for Product A/B/C with month categories; name="chartAreaStacked"; visible legend and a shared tooltip.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<kendo-chart name="chartAreaStacked" height="400">
    <chart-title text="Product Sales by Month"></chart-title>
    
    <category-axis>
        <category-axis-item categories='@new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" }'>
        </category-axis-item>
    </category-axis>
    
    <series>
        <series-item type="ChartSeriesType.Area" 
                     name="Product A" 
                     stack="normal"
                     data='@new double[] { 5000, 6000, 7500, 8000, 9000, 10000, 11000, 12000, 10500, 9500, 8500, 7000 }'>
        </series-item>
        <series-item type="ChartSeriesType.Area" 
                     name="Product B" 
                     stack="normal"
                     data='@new double[] { 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 6000, 5500, 5000, 4500 }'>
        </series-item>
        <series-item type="ChartSeriesType.Area" 
                     name="Product C" 
                     stack="normal"
                     data='@new double[] { 2000, 2200, 2500, 2800, 3200, 3500, 3800, 4000, 3700, 3400, 3100, 2800 }'>
        </series-item>
    </series>
    
    <chart-legend visible="true"></chart-legend>
    
    <tooltip shared="true" visible="true"></tooltip>
</kendo-chart>
```



```prompt Column Chart
#telerik-aspnetcoretag-assistant Self-contained Column Chart comparing three products over Jan–Jun with inline numbers; name="chartColumnProducts"; a shared tooltip; value axis format "{0} units".
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<kendo-chart name="chartColumnProducts" height="400">
    <chart-title text="Product Comparison (Jan-Jun)"></chart-title>
    
    <category-axis>
        <category-axis-item categories='@new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" }'>
        </category-axis-item>
    </category-axis>
    
    <value-axis>
        <value-axis-item>
            <chart-value-axis-item-title text="Sales Units"></chart-value-axis-item-title>
            <labels format="{0} units"></labels>
        </value-axis-item>
    </value-axis>
    
    <series>
        <series-item type="ChartSeriesType.Column" 
                     name="Product A" 
                     data='@new double[] { 1200, 1350, 1500, 1650, 1800, 1950 }'>
        </series-item>
        <series-item type="ChartSeriesType.Column" 
                     name="Product B" 
                     data='@new double[] { 800, 900, 1100, 1250, 1400, 1550 }'>
        </series-item>
        <series-item type="ChartSeriesType.Column" 
                     name="Product C" 
                     data='@new double[] { 600, 750, 850, 900, 1000, 1100 }'>
        </series-item>
    </series>
    
    <chart-legend visible="true"></chart-legend>
    
    <tooltip shared="true" visible="true"></tooltip>
</kendo-chart>

```



```prompt Donut Chart
#telerik-aspnetcoretag-assistant Implement a donut chart with custom center text displaying total values and hover effects for individual segments.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<style>
    .donut-center-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;
        z-index: 10;
    }

    .donut-center-title {
        font-size: 14px;
        color: #666;
        margin: 0;
    }

    .donut-center-value {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin: 5px 0 0 0;
    }

    .chart-container {
        position: relative;
        display: inline-block;
    }
</style>

<div class="chart-container">
    <kendo-chart name="chartDonut" height="400">
        <chart-title text="Sales Distribution by Product"></chart-title>

        <series>
            <series-item type="ChartSeriesType.Donut"
                         name="Products"
                         data='@new object[] {
                              new { category = "Product A", value = 45000, color = "#ff6384" },
                              new { category = "Product B", value = 35000, color = "#36a2eb" },
                              new { category = "Product C", value = 25000, color = "#ffcd56" },
                              new { category = "Product D", value = 15000, color = "#4bc0c0" },
                              new { category = "Product E", value = 10000, color = "#9966ff" }
                          }'
                         category-field="category"
                         field="value"
                         color-field="color">
                <labels visible="true"
                        position="ChartSeriesLabelsPosition.OutsideEnd"
                        template="#= category #: #= kendo.format('{0:p}', percentage) #"></labels>
            </series-item>
        </series>

        <chart-legend visible="true" position="ChartLegendPosition.Bottom"></chart-legend>

        <tooltip visible="true"
                 template="#= category #: #= kendo.format('{0:n0}', value) # (#= kendo.format('{0:p}', percentage) #)"></tooltip>

        <chart-area background="transparent"></chart-area>
    </kendo-chart>

    <div class="donut-center-text">
        <p class="donut-center-title">Total Sales</p>
        <p class="donut-center-value" id="totalValue">$130,000</p>
    </div>
</div>

<script>
    $(document).ready(function() {
        var chart = $("#chartDonut").getKendoChart();
        var totalValue = 130000; // Sum of all values

        // Update center text on series hover
        chart.bind("seriesHover", function(e) {
            if (e.value) {
                $("#totalValue").text("$" + e.value.toLocaleString());
                $(".donut-center-title").text(e.category);
            }
        });

        // Reset center text when not hovering
        chart.bind("seriesLeave", function(e) {
            $("#totalValue").text("$" + totalValue.toLocaleString());
            $(".donut-center-title").text("Total Sales");
        });

        // Handle plot area interactions to reset
        chart.bind("plotAreaLeave", function(e) {
            $("#totalValue").text("$" + totalValue.toLocaleString());
            $(".donut-center-title").text("Total Sales");
        });
    });
</script>
```



```prompt Pie Chart
#telerik-aspnetcoretag-assistant Create a pie chart for market share data with custom colors, data labels showing percentages, and legend positioning.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<kendo-chart name="chartMarketShare" height="400">
    <chart-title text="Market Share Distribution"></chart-title>
    
    <series>
        <series-item type="ChartSeriesType.Pie" 
                     name="Market Share" 
                     data='@new object[] { 
                         new { category = "Company A", value = 35.5, color = "#ff6384" },
                         new { category = "Company B", value = 28.2, color = "#36a2eb" },
                         new { category = "Company C", value = 18.7, color = "#ffcd56" },
                         new { category = "Company D", value = 12.1, color = "#4bc0c0" },
                         new { category = "Others", value = 5.5, color = "#9966ff" }
                     }'
                     category-field="category"
                     field="value"
                     color-field="color">
            <labels visible="true" 
                    position="ChartSeriesLabelsPosition.OutsideEnd"
                    template="#= category #<br/>#= kendo.format('{0:n1}%', value) #"
                    background="white"
                    color="#333">
            </labels>
            <highlight visible="true" opacity="0.8">
                <border width="2" color="#fff"></border>
            </highlight>
        </series-item>
    </series>
    
    <chart-legend visible="true" 
                  position="ChartLegendPosition.Right"
                  align="ChartLegendAlign.Start">
        <labels template="#= text #: #= value #%"></labels>
    </chart-legend>
    
    <tooltip visible="true" 
             template="#= category #: #= kendo.format('{0:n1}%', value) # of market share"></tooltip>
             
    <chart-area background="#f9f9f9">
        <border width="0"></border>
    </chart-area>
</kendo-chart>
```

</div>

### DatePicker

The [{{ site.product }} DatePicker](slug:htmlhelpers_datepicker_aspnetcore) component allows users to select dates from a calendar pop-up or by typing in a date input field. It supports features such as date formatting, validation, min/max date restrictions, and integration with forms.

#### HtmlHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Validation
#telerik-aspnetcorehtml-assistant Create a DatePicker for birthdate selection with min date to today's date in 2018 year and max date to today's date in 2028 year. The date format must be dd/MM/yyyy.
```
```C# Output
@(Html.Kendo().DatePicker()
    .Name("birthdate")
    .Format("dd/MM/yyyy")
    .Min(new DateTime(2018, 8, 24))
    .Max(new DateTime(2028, 8, 24))
    .HtmlAttributes(new { placeholder = "Select your birthdate" })
)
```



```prompt Disabled Dates
#telerik-aspnetcorehtml-assistant Build a DatePicker for appointment booking that disables specific dates (holidays array).
```
```C# Output
<div class="container">
    <h2>Appointment Booking</h2>
    <div class="form-group">
        <label for="appointmentDate">Select Appointment Date:</label>
        @(Html.Kendo().DatePicker()
            .Name("appointmentDate")
            .Value(DateTime.Today)
            .Min(DateTime.Today)
            .Format("dd/MM/yyyy")
            .DisableDates("disableHolidays")
            .HtmlAttributes(new { @class = "form-control", style = "width: 300px;" })
        )
    </div>
</div>

<script>
    // Define your holidays array
    var holidays = [
        new Date(2025, 0, 1),   // New Year's Day
        new Date(2025, 3, 18),  // Good Friday
        new Date(2025, 3, 21),  // Easter Monday
        new Date(2025, 4, 1),   // May Day
        new Date(2025, 11, 25), // Christmas Day
        new Date(2025, 11, 26), // Boxing Day
        // Add more holidays as needed
    ];

    function disableHolidays(date) {
        if (!date) return false;
        
        // Check if the date is in the holidays array
        for (var i = 0; i < holidays.length; i++) {
            var holiday = holidays[i];
            if (date.getFullYear() === holiday.getFullYear() &&
                date.getMonth() === holiday.getMonth() &&
                date.getDate() === holiday.getDate()) {
                return true; // Disable this date
            }
        }
        
        // Optionally disable weekends as well
        var dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Disable Sunday (0) and Saturday (6)
    }
</script>

<style>
    .container {
        margin-top: 20px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
</style>
```



```prompt Range Selection
#telerik-aspnetcorehtml-assistant Implement two DatePickers for "From" and "To" date selection where the "To" picker's min date updates based on "From" selection.
```
```C# Output
<div class="container">
    <h2>Date Range Selection</h2>
    
    <div class="row">
        <div class="col-md-6">
            <label for="fromDate">From Date:</label>
            @(Html.Kendo().DatePicker()
                .Name("fromDate")
                .Value(DateTime.Today)
                .Events(e => e.Change("onFromDateChange"))
                .HtmlAttributes(new { style = "width: 100%;" })
            )
        </div>
        
        <div class="col-md-6">
            <label for="toDate">To Date:</label>
            @(Html.Kendo().DatePicker()
                .Name("toDate")
                .Min(DateTime.Today.ToString("yyyy-MM-dd"))
                .Value(DateTime.Today.AddDays(1))
                .HtmlAttributes(new { style = "width: 100%;" })
            )
        </div>
    </div>
</div>

<script>
    function onFromDateChange() {
        var fromDatePicker = $("#fromDate").data("kendoDatePicker");
        var toDatePicker = $("#toDate").data("kendoDatePicker");
        
        var fromDate = fromDatePicker.value();
        
        if (fromDate) {
            // Set the minimum date of the "To" DatePicker to the selected "From" date
            toDatePicker.min(fromDate);
            
            // If the current "To" date is before the new minimum, update it
            var toDate = toDatePicker.value();
            if (toDate && toDate < fromDate) {
                toDatePicker.value(fromDate);
            }
        }
    }
</script>
```



```prompt Adaptive Mode
#telerik-aspnetcorehtml-assistant Create an adaptive DatePicker using the adaptive mode for a mobile friendly user interface.
```
```C# Output
<div class="container">
    <h2>Adaptive DatePicker Demo</h2>
    
    @(Html.Kendo().DatePicker()
        .Name("adaptiveDatePicker")
        .AdaptiveMode(Kendo.Mvc.UI.AdaptiveMode.Auto)
        .AdaptiveTitle("Select Date")
        .AdaptiveSubtitle("Choose your preferred date")
        .DateInput(true)
        .Format("MM/dd/yyyy")
        .Value(DateTime.Today)
        .HtmlAttributes(new { style = "width: 100%; max-width: 300px;" })
    )
</div>

<style>
    .container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }
    
    /* Additional responsive styling */
    @@media (max-width: 500px) {
        .container {
            padding: 10px;
        }
    }
</style>
```



```prompt Form Integration
#telerik-aspnetcorehtml-assistant Add the DatePicker as an editor into the Telerik UI for ASP.NET Core Form with 2 fields: Name and StartDate.
```
```C# Output
@using Kendo.Mvc.UI

@(Html.Kendo().Form<MyFormModel>()
    .Name("myForm")
    .HtmlAttributes(new { style = "width: 100%; max-width: 600px;" })
    .Items(items =>
    {
        items.Add()
            .Field(f => f.Name)
            .Label(l => l.Text("Name:"))
            .Editor(e => e.TextBox());

        items.Add()
            .Field(f => f.StartDate)
            .Label(l => l.Text("Start Date:"))
            .Editor(e => e.DatePicker()
                .Start(CalendarView.Month)
                .Format("dd/MM/yyyy")
                .Value(DateTime.Today));
    })
    .Validatable(v =>
    {
        v.ValidateOnBlur(true);
        v.ValidationSummary(true);
    })
)
```

</div>

#### TagHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Validation
#telerik-aspnetcoretag-assistant Create a DatePicker for birthdate selection with min date to today's date in 2018 year and max date to today's date in 2028 year. The date format must be dd/MM/yyyy.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<div>
    <label for="birthdate">Select your birthdate:</label>
    <kendo-datepicker name="birthdate" 
      format="dd/MM/yyyy"
      min="@DateTime.Today.AddYears(-7)"
      max="@DateTime.Today.AddYears(3)">
    </kendo-datepicker>
</div>
```



```prompt Disabled Dates
#telerik-aspnetcoretag-assistant Build a DatePicker for appointment booking that disables specific dates (holidays array).
```
```C# Output
@addTagHelper "*, Kendo.Mvc"
@{
    // Define holidays array
    var holidays = new DateTime[]
    {
        new DateTime(2025, 1, 1),   // New Year's Day
        new DateTime(2025, 7, 4),   // Independence Day
        new DateTime(2025, 12, 25), // Christmas
        new DateTime(2025, 11, 28), // Thanksgiving
        new DateTime(2025, 9, 2),   // Labor Day
        new DateTime(2025, 5, 26),  // Memorial Day
        new DateTime(2025, 2, 17)   // Presidents Day
    };
}

<div class="container mt-4">
    <h2>Appointment Booking</h2>

    <div class="form-group">
        <label for="appointmentDate">Select Appointment Date:</label>
        <kendo-datepicker name="appointmentDate"
                          disable-dates="@holidays"
                          value="DateTime.Now"
                          min="DateTime.Now"
                          format="MM/dd/yyyy"
                          placeholder="Choose a date for your appointment">
        </kendo-datepicker>
    </div>

    <div class="mt-3">
        <button type="button" class="btn btn-primary" onclick="bookAppointment()">
            Book Appointment
        </button>
    </div>
</div>

<script>
    function bookAppointment() {
        var datePicker = $("#appointmentDate").data("kendoDatePicker");
        var selectedDate = datePicker.value();

        if (selectedDate) {
            alert("Appointment booked for: " + selectedDate.toLocaleDateString());
        } else {
            alert("Please select a date for your appointment.");
        }
    }
</script>
```



```prompt Range Selection
#telerik-aspnetcoretag-assistant Implement two DatePickers for "From" and "To" date selection where the "To" picker's min date updates based on "From" selection.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"

<div class="container">
    <h2>Date Range Selection</h2>
    
    <div class="row">
        <div class="col-md-6">
            <label for="fromDate">From Date:</label>
            <kendo-datepicker name="fromDate" 
                              value="DateTime.Today" 
                              on-change="onFromDateChange"
                              style="width: 100%;">
            </kendo-datepicker>
        </div>
        
        <div class="col-md-6">
            <label for="toDate">To Date:</label>
            <kendo-datepicker name="toDate" 
                              min="DateTime.Today" 
                              value="DateTime.Today.AddDays(1)"
                              style="width: 100%;">
            </kendo-datepicker>
        </div>
    </div>
</div>

<script>
    function onFromDateChange() {
        var fromDatePicker = $("#fromDate").data("kendoDatePicker");
        var toDatePicker = $("#toDate").data("kendoDatePicker");
        
        var fromDate = fromDatePicker.value();
        
        if (fromDate) {
            // Set the minimum date of the "To" DatePicker to the selected "From" date
            toDatePicker.min(fromDate);
            
            // If the current "To" date is before the new minimum, update it
            var toDate = toDatePicker.value();
            if (toDate && toDate < fromDate) {
                toDatePicker.value(fromDate);
            }
        }
    }
</script>
```



```prompt Adaptive Mode
#telerik-aspnetcoretag-assistant Create an adaptive DatePicker using the adaptive mode for a mobile friendly user interface.
```
```C# Output
@addTagHelper "*, Kendo.Mvc"
<div class="container">
    <h2>Adaptive DatePicker Example</h2>

    <div class="form-group">
        <label for="adaptiveDatePicker">Select Date:</label>
        <kendo-datepicker name="adaptiveDatePicker"
          adaptive-mode="AdaptiveMode.Auto"
          auto-fill="true"
          date-input="true"
          placeholder="Select a date...">
        </kendo-datepicker>
    </div>
</div>
```



```prompt Form Integration
#telerik-aspnetcoretag-assistant Add the DatePicker as an editor into the Telerik UI for ASP.NET Core Form with 2 fields: Name and StartDate.
```
```C# Output
@addTagHelper *, Kendo.Mvc

@model PersonModel

<kendo-form name="personForm">
    <form-items>
        <form-item field="Name">
            <item-label text="Name:" />
            <textbox-editor placeholder="Enter your name" />
        </form-item>
        <form-item field="StartDate">
            <item-label text="Start Date:" />
            <datepicker-editor 
                format="dd/MM/yyyy" 
                date-input="true"
                placeholder="Select start date" />
        </form-item>
    </form-items>
</kendo-form>
```

</div>

### Form

The [{{ site.product }} Form](slug:htmlhelpers_form_aspnetcore_overview) provides a variety of built-in options and features to generate and manage forms in your application.

#### HtmlHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Form
#telerik-aspnetcorehtml-assistant Create a basic user profile settings page using the Telerik UI for ASP.NET Core HtmlHelper Form. The form must have 3 fields - name, email, and Agree.
```
```C# Output
//View
@model UserProfileViewModel

<div class="container">
    <h2>User Profile Settings</h2>
    
    @(Html.Kendo().Form<UserProfileViewModel>()
        .Name("userProfileForm")
        .HtmlAttributes(new { action = "SaveProfile", method = "post" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(true));
        })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.Name)
                .Label(l => l.Text("Full Name:"));
            
            items.Add()
                .Field(f => f.Email)
                .Label(l => l.Text("Email Address:"));
            
            items.Add()
                .Field(f => f.Agree)
                .Label(l => l.Text("I agree to the terms and conditions").Optional(false));
        })
        .Messages(m => m.Submit("Save Profile"))
    )
</div>

//Model
public class UserProfileViewModel
{
    [Required(ErrorMessage = "Name is required")]
    [Display(Name = "Full Name")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [Display(Name = "Email Address")]
    public string Email { get; set; }

    [Display(Name = "I agree to the terms and conditions")]
    public bool Agree { get; set; }
}
```



```prompt Editors
#telerik-aspnetcorehtml-assistant Show me how to create a Telerik UI Form that has three fields - a textbox for the name, a DatePicker for start date and DropDownList for the selected tier (free, premium, ultimate).
```
```C# Output
@model ProjectName.Models.UserSubscriptionModel

<div class="text-center">
    <h1>Subscription Form</h1>
    
    @(Html.Kendo().Form<ProjectName.Models.UserSubscriptionModel>()
        .Name("subscriptionForm")
        .HtmlAttributes(new { action = "Submit", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.Name)
                .Label(l => l.Text("Full Name:"))
                .Editor(e => e.TextBox());

            items.Add()
                .Field(f => f.StartDate)
                .Label(l => l.Text("Start Date:"))
                .Editor(e => e.DateTimePicker()
                    .Format("MM/dd/yyyy")
                    .TimeFormat("HH:mm"));

            items.Add()
                .Field(f => f.SelectedTier)
                .Label(l => l.Text("Subscription Tier:"))
                .Editor(e => e.DropDownList()
                    .OptionLabel("-- Select Tier --")
                    .Items(ddl =>
                    {
                        ddl.Add().Text("Free").Value("free");
                        ddl.Add().Text("Premium").Value("premium");
                        ddl.Add().Text("Ultimate").Value("ultimate");
                    }));
        })
        .Validatable(v => v
            .ValidateOnBlur(true)
            .ValidationSummary(true))
        .ButtonsTemplate("<button type='submit' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'>Submit</button>")
    )
</div>

<script>
    $(document).ready(function () {
        $("#subscriptionForm").submit(function (e) {
            e.preventDefault();
            var form = $("#subscriptionForm").getKendoForm();
            
            if (form.validator.validate()) {
                // Form is valid, you can submit the data
                console.log("Form data:", form.value());
                alert("Form submitted successfully!");
            } else {
                alert("Please correct the validation errors.");
            }
        });
    });
</script>
```



```prompt Validation
#telerik-aspnetcorehtml-assistant Generate a Form with required field validation for email and password inputs.
```
```C# Output
//View
@model LoginFormModel

<div class="text-center">
    <h1 class="display-4">Login Form</h1>
    
    @(Html.Kendo().Form<LoginFormModel>()
        .Name("loginForm")
        .HtmlAttributes(new { style = "width: 100%; max-width: 400px; margin: 0 auto;" })
        .Validatable(v => v
            .ValidateOnBlur(true)
            .ValidationSummary(true)
        )
        .Items(items =>
        {
            items.Add()
                .Field(f => f.Email)
                .Label(l => l.Text("Email Address:"))
                .Editor(e => e
                    .TextBox()
                    .HtmlAttributes(new { placeholder = "Enter your email", @class = "form-control" })
                );
            
            items.Add()
                .Field(f => f.Password)
                .Label(l => l.Text("Password:"))
                .Editor(e => e
                    .TextBox()
                    .HtmlAttributes(new { type = "password", placeholder = "Enter your password", @class = "form-control" })
                );
        })
    )
</div>

//Model
using System.ComponentModel.DataAnnotations;

namespace ProjectName.Models
{
    public class LoginFormModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
```


```prompt Custom Buttons
#telerik-aspnetcorehtml-assistant Create a Form with fields First Name, Last Name, Email, date of birth. Submit button with an icon and a Clear button.
```
```C# Output
//View
@model PersonModel

<div class="text-center">
    <h1 class="display-4">Person Information Form</h1>
    
    @(Html.Kendo().Form<PersonModel>()
        .Name("personForm")
        .FormData(Model ?? new PersonModel())
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name"));
            
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name"));
            
            items.Add()
                .Field(f => f.Email)
                .Label(l => l.Text("Email"));
            
            items.Add()
                .Field(f => f.DateOfBirth)
                .Label(l => l.Text("Date of Birth"))
                .Editor(e => e.DatePicker());
        })
        .ButtonsTemplate("<button type='submit' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'>" +
                        "<span class='k-icon k-i-check'></span>Submit</button>" +
                        "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-form-clear'>" +
                        "<span class='k-icon k-i-cancel'></span>Clear</button>")
        .Messages(m => m
            .Submit("Submit")
            .Clear("Clear"))
        .Validatable(v => v.ValidateOnBlur(true))
    )
</div>

//Model
using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectName.Models
{
    public class PersonModel
    {
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }
    }
}
```



```prompt Form Layout
#telerik-aspnetcorehtml-assistant Self-contained Kendo Form (HtmlHelper) bound to Model with grid layout: 2 columns, 20 gutter. Items: TextBox FirstName, TextBox LastName, TextBox Email, TextBox Phone. Enable Validatable with ValidationSummary Template (error list).
```
```C# Output
//View
@model PersonModel

<div class="container">
    <h2>Contact Information Form</h2>
    @(Html.Kendo().Form<PersonModel>()
        .Name("personForm")
        .Layout("grid")
        .Grid(grid => grid
            .Cols(2)
            .Gutter(20)
        )
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name"))
                .Editor(e => e.TextBox());
            
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name"))
                .Editor(e => e.TextBox());
            
            items.Add()
                .Field(f => f.Email)
                .Label(l => l.Text("Email"))
                .Editor(e => e.TextBox());
            
            items.Add()
                .Field(f => f.Phone)
                .Label(l => l.Text("Phone"))
                .Editor(e => e.TextBox());
        })
        .Validatable(validatable => validatable
            .ValidateOnBlur(true)
            .ValidationSummary(true)
            .ErrorTemplate("<div class='k-widget k-tooltip k-tooltip-error'><span class='k-icon k-i-warning'></span>#=message#</div>")
        )
        .FormData(Model)
    )
</div>

//Model
public class PersonModel
{
    [Required(ErrorMessage = "First Name is required")]
    [StringLength(50, ErrorMessage = "First Name cannot exceed 50 characters")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last Name is required")]
    [StringLength(50, ErrorMessage = "Last Name cannot exceed 50 characters")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Phone is required")]
    [Phone(ErrorMessage = "Please enter a valid phone number")]
    public string Phone { get; set; }
}
```

</div>

#### TagHelper Examples

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Form
#telerik-aspnetcoretag-assistant Create a basic user profile settings page using the Telerik UI for ASP.NET Core TagHelper Form. The form must have 3 fields - name, email, and Agree.
```
```C# Output
//View
@addTagHelper *, Kendo.Mvc
@model ProjectName.Models.UserProfileViewModel

<div class="container mt-4">
    <h2>User Profile Settings</h2>
    <div class="row">
        <div class="col-md-6">
            <kendo-form name="userProfileForm" 
                        form-data="@Model"
                        orientation="vertical"
                        focus-first="true"
                        clear-button="true">
                <form-items>
                    <form-item field="Name"></form-item>
                    <form-item field="Email"></form-item>
                    <form-item field="Agree"></form-item>
                </form-items>
                <validatable validate-on-blur="true" />
                <messages submit="Update Profile" />
            </kendo-form>
        </div>
    </div>
</div>

//Model
public class UserProfileViewModel
{
    [Required(ErrorMessage = "Name is required")]
    [Display(Name = "Full Name")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [Display(Name = "Email Address")]
    public string Email { get; set; }

    [Display(Name = "I agree to the terms and conditions")]
    public bool Agree { get; set; }
}
```



```prompt Editors
#telerik-aspnetcoretag-assistant Show me how to create a Telerik UI Form that has three fields - a textbox for the name, a DatePicker for start date and DropDownList for the selected tier (free, premium, ultimate).
```
```C# Output
@model ProjectName.Models.UserTierModel

<div class="text-center">
    <h1 class="display-4">User Tier Registration</h1>
    
    <kendo-form name="userTierForm" form-data="Model" orientation="vertical">
        <form-items>
            <form-item field="Name">
                <item-label text="Name" />
                <textbox-editor placeholder="Enter your name" />
            </form-item>
            
            <form-item field="StartDate">
                <item-label text="Start Date" />
                <datepicker-editor format="dd/MM/yyyy" />
            </form-item>
            
            <form-item field="SelectedTier">
                <item-label text="Selected Tier" />
                <dropdownlist-editor placeholder="Select your tier"
                  option-label="Choose a tier..."
                  datatextfield="Text"
                  datavaluefield="Value"
                  bind-to='new List<object> {
                      new { Text = "Free", Value = "free" },
                      new { Text = "Premium", Value = "premium" },
                      new { Text = "Ultimate", Value = "ultimate" }
                  }' />
            </form-item>
        </form-items>
        
        <buttons-template>
            <button type="submit" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">
                <span class="k-button-text">Submit</span>
            </button>
            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="clearForm()">
                <span class="k-button-text">Clear</span>
            </button>
        </buttons-template>
    </kendo-form>
</div>

<script>
    function clearForm() {
        var form = $("#userTierForm").data("kendoForm");
        if (form) {
            form.clear();
        }
    }
</script>
```



```prompt Validation
#telerik-aspnetcoretag-assistant Generate a Form with required field validation for email and password inputs.
```
```C# Output
//View
@model LoginModel

<div class="text-center">
    <h1 class="display-4">Login Form</h1>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <kendo-form name="loginForm" 
                        form-data="Model" 
                        orientation="vertical"
                        asp-action="Index" 
                        asp-controller="Home"
                        method="post">
                
                <validatable>
                    <validation-summary enabled="true" />
                </validatable>
                
                <form-items>
                    <form-item field="Email">
                        <item-label text="Email Address" />
                        <textbox-editor placeholder="Enter your email address" />
                    </form-item>
                    
                    <form-item field="Password">
                        <item-label text="Password" />
                        <textbox-editor placeholder="Enter your password" type="password" />
                    </form-item>
                </form-items>
            </kendo-form>
        </div>
    </div>
</div>

//Model
using System.ComponentModel.DataAnnotations;

namespace ProjectName.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
```



```prompt Custom Buttons
#telerik-aspnetcoretag-assistant Create a Form with fields First Name, Last Name, Email, date of birth. Submit button with an icon and a Clear button.
```
```C# Output
//View
@model PersonModel

@addTagHelper "*, Kendo.Mvc"

<div class="container mt-4">
    <h2>User Information Form</h2>
    
    <kendo-form name="userForm" 
                form-data="Model"
                orientation="vertical"
                clear-button="true">
        <form-items>
            <form-item field="FirstName" 
                      editor="TextBox" 
                      title="First Name">
                <item-label text="First Name:" />
            </form-item>
            
            <form-item field="LastName" 
                      editor="TextBox" 
                      title="Last Name">
                <item-label text="Last Name:" />
            </form-item>
            
            <form-item field="Email" 
                      editor="TextBox" 
                      title="Email">
                <item-label text="Email:" />
            </form-item>
            
            <form-item field="DateOfBirth" 
                      editor="DatePicker" 
                      title="Date of Birth">
                <item-label text="Date of Birth:" />
            </form-item>
        </form-items>
        
        <messages submit="Submit Form" clear="Clear Form" />
        
        <buttons-template>
            <button type="submit" class="k-button k-button-solid-primary k-form-submit">
                <span class="k-icon k-i-check"></span>
                Submit Form
            </button>
            <button type="button" class="k-button k-button-solid k-form-clear">
                <span class="k-icon k-i-reset"></span>
                Clear Form
            </button>
        </buttons-template>
    </kendo-form>
</div>

//Model
using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectName.Models
{
    public class PersonModel
    {
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }
    }
}
```



```prompt Form Layout
#telerik-aspnetcoretag-assistant Self-contained Kendo Form (TagHelper) with grid layout: 2 columns, 20 gutter. Items: TextBox FirstName, TextBox LastName, TextBox Email, TextBox Phone. Enable Validatable with ValidationSummary Template (error list).
```
```C# Output
//View
@addTagHelper "*, Kendo.Mvc"

<kendo-form name="userForm" layout="grid">
    <grid cols="2" gutter="20" />
    <form-items>
        <form-item field="FirstName" label="First Name">
            <textbox-editor />
        </form-item>
        <form-item field="LastName" label="Last Name">
            <textbox-editor />
        </form-item>
        <form-item field="Email" label="Email">
            <textbox-editor />
        </form-item>
        <form-item field="Phone" label="Phone">
            <textbox-editor />
        </form-item>
    </form-items>
    <validatable validation-summary="true" />
</kendo-form>

//Model
public class PersonModel
{
    [Required(ErrorMessage = "First Name is required")]
    [StringLength(50, ErrorMessage = "First Name cannot exceed 50 characters")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last Name is required")]
    [StringLength(50, ErrorMessage = "Last Name cannot exceed 50 characters")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Phone is required")]
    [Phone(ErrorMessage = "Please enter a valid phone number")]
    public string Phone { get; set; }
}
```

</div>
{% endif %}

{% if site.mvc %}

### Grid

The [{{ site.product }} Grid](slug:htmlhelpers_grid_aspnetcore_overview) lets you create responsive, accessible, and customizable {{ site.framework }} applications that require the displaying and management of large datasets.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Grid
#telerik-aspnetmvc-assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality.
```
```C# Output
// output placeholder
```

```prompt Filtering
#telerik-aspnetmvc-assistant Implement a Grid with filter row functionality. Show how to set up default filter operators for text, numeric, and date columns.
```
```C# Output
// View
@(Html.Kendo().Grid<Employee>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.Name)
            .Filterable(ftb => ftb.Cell(cell => cell.Operator("startswith")));
        columns.Bound(e => e.Age)
            .Filterable(ftb => ftb.Cell(cell => cell.Operator("eq")));
        columns.Bound(e => e.HireDate)
            .Filterable(ftb => ftb.Cell(cell => cell.Operator("gte")));
    })
    .Filterable(filterable => filterable
        .Mode(GridFilterMode.Row)
        .Operators(operators => operators
            .ForString(str => str.Clear()
                .StartsWith("Starts with")
                .IsEqualTo("Is equal to")
                .IsNotEqualTo("Is not equal to"))
            .ForNumber(num => num.Clear()
                .IsEqualTo("Equal to")
                .IsGreaterThan("Greater than")
                .IsLessThan("Less than"))
            .ForDate(date => date.Clear()
                .IsEqualTo("Equal to")
                .IsGreaterThanOrEqualTo("After or equal to")
                .IsLessThanOrEqualTo("Before or equal to"))
        )
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Employees_Read", "Home"))
    )
)
```

```prompt Export
#telerik-aspnetmvc-assistant Add Excel and PDF export functionality to a Grid.
```
```C# Output
// View
@(Html.Kendo().Grid<Employee>()
    .Name("grid")
    .ToolBar(toolbar =>
    {
        toolbar.Excel();
        toolbar.Pdf();
    })
    .Columns(columns =>
    {
        columns.Bound(e => e.EmployeeID);
        columns.Bound(e => e.Name);
        columns.Bound(e => e.Position);
        columns.Bound(e => e.Salary);
    })
    .Scrollable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Employees_Read", "Home"))
    )
)
```

```prompt Virtualization
#telerik-aspnetmvc-assistant Set up a Grid with virtual scrolling to handle large datasets efficiently.
```
```C# Output
// View
@(Html.Kendo().Grid<Employee>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.EmployeeID).Width(100);
        columns.Bound(e => e.Name).Width(200);
        columns.Bound(e => e.Position).Width(150);
        columns.Bound(e => e.Salary).Width(120);
    })
    .Scrollable(s => s.Virtual(GridVirtualizationMode.Rows))
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(100)
        .Read(read => read.Action("Employees_Read", "Home"))
    )
)
```

```prompt Column Templates
#telerik-aspnetmvc-assistant Create a Grid that bind to a Model and has 3 columns: Name, Age, Status, and StartDate. The Name column must use a client template with the Name and Age values. The StartDate column must be displayed in format "dd/MM/yyyy". The Status column must display "Active" if its value is "true" and "Inactive" if its value is "false".
```
```C# Output
// View
@model IEnumerable<Employee>
@(Html.Kendo().Grid<Employee>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.Name)
            .Title("Name & Age")
            .ClientTemplate("#= Name # (Age: #= Age #)");
        columns.Bound(e => e.Age)
            .Title("Age");
        columns.Bound(e => e.Status)
            .Title("Status")
            .ClientTemplate("#= Status ? 'Active' : 'Inactive' #");
        columns.Bound(e => e.StartDate)
            .Title("Start Date")
            .Format("{0:dd/MM/yyyy}");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Employees_Read", "Home"))
    )
)
```

</div>

### Charts

The [{{ site.product }} Charts](slug:htmlhelpers_charts_aspnetcore) provide a comprehensive charting solution for data visualization with multiple chart types and customization options.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Basic Chart
#telerik-aspnetmvc-assistant Create a basic Chart that displays quarterly sales data. Use a column series bound to Sales, with categories bound to Quarter. Add a title and legend.
```
```C# Output
// output placeholder
```

```prompt Multiple Series
#telerik-aspnetmvc-assistant Create a Chart with two line series, one bound to Revenue and the other bound to Expenses. Categories must be the months. Show a legend and a title.
```
```C# Output
// View
@model IEnumerable<ChartDataPoint>
@(Html.Kendo().Chart<ChartDataPoint>()
    .Name("chartRevenueExpenses")
    .Title("Monthly Revenue vs Expenses")
    .Legend(true)
    .Series(series =>
    {
        series.Line("Revenue", "Month").Name("Revenue");
        series.Line("Expenses", "Month").Name("Expenses");
    })
    .CategoryAxis(axis => axis
        .Categories(new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" })
        .Title("Month")
    )
    .ValueAxis(axis => axis
        .Title("Amount ($)")
    )
)
// Model
public class ChartDataPoint
{
    public string Month { get; set; }
    public double Revenue { get; set; }
    public double Expenses { get; set; }
}
```


```prompt Pie Chart
#telerik-aspnetmvc-assistant Create a Pie Chart that displays market share data. The series must be bound to Value and categorized by Company. Show labels with percentages.
```
```C# Output
// View
@model IEnumerable<MarketShareData>
@(Html.Kendo().Chart<MarketShareData>()
    .Name("chartMarketShare")
    .Title("Market Share Distribution")
    .Legend(true)
    .Series(series =>
    {
        series.Pie("Value", "Company")
            .Labels(labels => labels
                .Visible(true)
                .Template("#= Company #: #= kendo.format('{0:p}', percentage) #")
            );
    })
)
// Model
public class MarketShareData
{
    public string Company { get; set; }
    public double Value { get; set; }
}
```


```prompt Donut Chart
#telerik-aspnetmvc-assistant Create a Donut Chart to display budget allocation by Department. Series bound to Amount, category Department. Show labels with percentages inside.
```
```C# Output
// View
@model IEnumerable<BudgetAllocation>
@(Html.Kendo().Chart<BudgetAllocation>()
    .Name("chartBudgetDonut")
    .Title("Budget Allocation by Department")
    .Legend(true)
    .Series(series =>
    {
        series.Donut(b => b.Amount, b => b.Department)
            .Labels(labels => labels
                .Visible(true)
                .Position(ChartPieLabelsPosition.Center)
                .Template("#= Department #: #= kendo.format('{0:p}', percentage) #")
            );
    })
)
// Model
public class BudgetAllocation
{
    public string Department { get; set; }
    public double Amount { get; set; }
}
```

```prompt Scatter Chart
#telerik-aspnetmvc-assistant Create a Scatter Chart that plots Age versus Income from a Population model. X axis numeric Age, Y axis numeric Income.
```
```C# Output
// View
@model IEnumerable<Population>
@(Html.Kendo().Chart<Population>()
    .Name("chartScatterAgeIncome")
    .Title("Age vs Income Scatter Chart")
    .Legend(true)
    .Series(series =>
    {
        series.Scatter(p => p.Age, p => p.Income)
            .Name("Population");
    })
    .CategoryAxis(axis => axis
        .Numeric()
        .Title("Age")
    )
    .ValueAxis(axis => axis
        .Numeric()
        .Title("Income")
    )
)
// Model
public class Population
{
    public int Age { get; set; }
    public double Income { get; set; }
}
```

</div>

### DatePicker

The [{{ site.product }} DatePicker](slug:htmlhelpers_datepicker_aspnetcore) component allows users to select dates from a calendar pop-up or by typing in a date input field. It supports features such as date formatting, validation, min/max date restrictions, and integration with forms.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt DatePicker
#telerik-aspnetmvc-assistant Create a DatePicker named birthDate with format MM/dd/yyyy.
```
```C# Output
// View
@(Html.Kendo().DatePicker()
    .Name("birthDate")
    .Format("MM/dd/yyyy")
)
```

```prompt DateRangePicker
#telerik-aspnetmvc-assistant Create a DateRangePicker named orderRange with start and end inputs. Use format MM/dd/yyyy and show week numbers.
```
```C# Output
// View
@(Html.Kendo().DateRangePicker()
    .Name("orderRange")
    .Format("MM/dd/yyyy")
    .WeekNumber(true)
)
```

```prompt DateTimePicker
#telerik-aspnetmvc-assistant Create a DateTimePicker named meetingDate with format MM/dd/yyyy hh:mm tt and 30-minute intervals.
```
```C# Output
// View
@(Html.Kendo().DateTimePicker()
    .Name("meetingDate")
    .Format("MM/dd/yyyy hh:mm tt")
    .Interval(30)
)
```

</div>

### Form

The [{{ site.product }} Form](slug:htmlhelpers_form_aspnetcore_overview) provides a variety of built-in options and features to generate and manage forms in your application.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Form Layout
#telerik-aspnetmvc-assistant Create a Form with grid layout of 2 columns and gutter 20. Items: FirstName, LastName, Email, Phone as TextBoxes. Enable validation summary.
```
```C# Output
// View
@model PersonModel

@(Html.Kendo().Form<PersonModel>()
    .Name("contactForm")
    .Layout("grid")
    .Grid(grid => grid
        .Cols(2)
        .Gutter(20)
    )
    .Items(items =>
    {
        items.Add()
            .Field(f => f.FirstName)
            .Label(l => l.Text("First Name"))
            .Editor(e => e.TextBox());

        items.Add()
            .Field(f => f.LastName)
            .Label(l => l.Text("Last Name"))
            .Editor(e => e.TextBox());

        items.Add()
            .Field(f => f.Email)
            .Label(l => l.Text("Email"))
            .Editor(e => e.TextBox());

        items.Add()
            .Field(f => f.Phone)
            .Label(l => l.Text("Phone"))
            .Editor(e => e.TextBox());
    })
    .Validatable(validatable => validatable
        .ValidationSummary(true)
        .ValidateOnBlur(true)
    )
)
```

```csharp
// Model
public class PersonModel
{
    [Required(ErrorMessage = "First Name is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last Name is required")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Phone is required")]
    [Phone(ErrorMessage = "Please enter a valid phone number")]
    public string Phone { get; set; }
}
```

```prompt Form Validation
#telerik-aspnetmvc-assistant Create a Form bound to RegisterViewModel with fields Username, Password, ConfirmPassword, and Email. Add validation with custom error messages and a Submit button.
```
```C# Output
// View
@model RegisterViewModel

@(Html.Kendo().Form<RegisterViewModel>()
    .Name("registerForm")
    .Items(items =>
    {
        items.Add()
            .Field(f => f.Username)
            .Label(l => l.Text("Username"))
            .Editor(e => e.TextBox());

        items.Add()
            .Field(f => f.Password)
            .Label(l => l.Text("Password"))
            .Editor(e => e.TextBox().HtmlAttributes(new { type = "password" }));

        items.Add()
            .Field(f => f.ConfirmPassword)
            .Label(l => l.Text("Confirm Password"))
            .Editor(e => e.TextBox().HtmlAttributes(new { type = "password" }));

        items.Add()
            .Field(f => f.Email)
            .Label(l => l.Text("Email"))
            .Editor(e => e.TextBox());
    })
    .Validatable(validatable => validatable
        .ValidationSummary(true)
        .ValidateOnBlur(true)
    )
    .Messages(m => m.Submit("Register"))
)

// Model
public class RegisterViewModel
{
    [Required(ErrorMessage = "Username is required")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Confirm Password is required")]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; }
}
```

```prompt Form Editors
#telerik-aspnetmvc-assistant Create a Form with DropDownList Country, DatePicker BirthDate, and NumericTextBox Age. Enable validation and add a Submit button styled as primary.
```
```C# Output
// View
@model PersonFormModel

@(Html.Kendo().Form<PersonFormModel>()
    .Name("personForm")
    .Items(items =>
    {
        items.Add()
            .Field(f => f.Country)
            .Label(l => l.Text("Country"))
            .Editor(e => e.DropDownList()
                .OptionLabel("Select country...")
                .BindTo(new[]
                {
                    new { Text = "USA", Value = "USA" },
                    new { Text = "Canada", Value = "Canada" },
                    new { Text = "UK", Value = "UK" },
                    new { Text = "Germany", Value = "Germany" },
                    new { Text = "France", Value = "France" }
                })
                .DataTextField("Text")
                .DataValueField("Value")
            );

        items.Add()
            .Field(f => f.BirthDate)
            .Label(l => l.Text("Birth Date"))
            .Editor(e => e.DatePicker()
                .Format("MM/dd/yyyy")
            );

        items.Add()
            .Field(f => f.Age)
            .Label(l => l.Text("Age"))
            .Editor(e => e.NumericTextBox()
                .Format("n0")
                .Min(0)
                .Max(120)
            );
    })
    .Validatable(validatable => validatable
        .ValidationSummary(true)
        .ValidateOnBlur(true)
    )
    .Messages(m => m.Submit("Submit"))
    .ButtonsTemplate("<button type='submit' class='k-button k-button-solid-primary'>Submit</button>")
)

// Model
public class PersonFormModel
{
    [Required(ErrorMessage = "Country is required")]
    public string Country { get; set; }

    [Required(ErrorMessage = "Birth Date is required")]
    [DataType(DataType.Date)]
    public DateTime? BirthDate { get; set; }

    [Required(ErrorMessage = "Age is required")]
    [Range(0, 120, ErrorMessage = "Age must be between 0 and 120")]
    public int? Age { get; set; }
}
```

</div>
{% endif %}

## See Also

* [Telerik {{ site.framework }} AI Coding Assistant Overview](slug:overview_ai)
* [Telerik {{ site.framework }} AI Coding Assistant Intended Use](slug:overview_ai#intended-use)
* [Telerik {{ site.framework }} MCP Server](slug:ai_mcp_server)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
