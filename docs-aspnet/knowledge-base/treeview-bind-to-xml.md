---
title: Binding the TreeView to XML Data
description: Learn how to bind the {{ site.product }} TreeView to XML data.
type: how-to
page-title: Bind the TreeView to XML Data
previous-url: helpers/navigation/treeview/how-to/bind-to-xml
slug: treeview-bind-to-xml
tags: treeview, xml, binding
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TreeView</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description
How can I bind the TreeView component to XML in {{ site.framework }} application?

## Solution

The example below uses the {% if site.core %}[`System.Xml.Linq`](https://learn.microsoft.com/en-us/dotnet/api/system.xml.linq?view=net-9.0){% else %}[`System.Xml.Linq`](https://learn.microsoft.com/en-us/dotnet/api/system.xml.linq?view=netframework-4.8.1){% endif %} library to convert the XML structure into C# models. The models represent the hierarchical data from the XML file and are then used to populate the TreeView data. Binding data from an XML source can be implemented using the following approaches: 

 * Server Binding

```HtmlHelper
@model IEnumerable<Telerik.Examples.Mvc.Areas.TreeViewBindingToXml.Models.Employee>

@(Html.Kendo().TreeView()
    .Name("serverTree")
    .BindTo(Model, (Kendo.Mvc.UI.Fluent.NavigationBindingFactory<TreeViewItem> mappings) =>
    {
        mappings.For<Telerik.Examples.Mvc.Areas.TreeViewBindingToXml.Models.Employee>(bound => bound.ItemDataBound((node, employee) =>
        {
            node.Text = employee.name;
            node.Id = employee.id.ToString();
        })
        .Children(e => e.items));
    })
)
```
{% if site.core %}
```TagHelper
<kendo-treeview name="serverTree">
    <items>
        @foreach (var employee in Model)
        {
            <treeview-item text="@employee.name" id="@employee.id">
                <items>
                    @foreach (var item in employee.items)
                    {
                        <treeview-item text="@item.name" id="@item.id"></treeview-item>
                    }
                </items>
            </treeview-item>
        }
    </items>
</kendo-treeview>
```
```Controller
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            XElement element = XElement.Load(Path.Combine(_webHostEnvironment.ContentRootPath, "employees.xml"));
            List<Employee> employees = ToEmployees(element);
            return View(employees);
        }

        private List<Employee> ToEmployees(XElement element)
        {
            if (element != null && element.HasElements)
            {
                List<Employee> employees = new List<Employee>();
                foreach (var child in element.Elements("Employee"))
                {
                    var employee = ToEmployee(child);
                    if (employee.hasChildren)
                    {
                        employee.items = ToEmployees(child.Element("items"));
                    }
                    employees.Add(employee);
                }
                return employees;
            }
            return null;
        }
    }
```
{% else %} 
```Controller
public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.Message = "Welcome to ASP.NET MVC!";

        XElement element = XElement.Load(Server.MapPath("~/App_Data/employees.xml"));
        List<Employee> employees = ToEmployees(element);
        return View(employees);
    }

    private List<Employee> ToEmployees(XElement element)
    {
        if (element != null && element.HasElements)
        {
            List<Employee> employees = new List<Employee>();
            foreach (var child in element.Elements("Employee"))
            {
                var employee = ToEmployee(child);
                if (employee.hasChildren)
                {
                    employee.items = ToEmployees(child.Element("items"));
                }
                employees.Add(employee);
            }
            return employees;
        }
        return null;
    }
}
```
{% endif %}

* AJAX Binding

```HtmlHelper
@(Html.Kendo().TreeView()
    .Name("ajaxTree")
    .DataTextField("name")
    .DataSource(source =>
    {
        source.Read(read =>
        {
            read.Action("Employees", "Home");
        });
    })
)
```
{% if site.core %}
```TagHelper
<kendo-treeview datatextfield="name" name="ajaxTree">
    <hierarchical-datasource>
        <schema >
            <hierarchical-model id="id"></hierarchical-model>
        </schema>
    </hierarchical-datasource>
</kendo-treeview>
```
```Controller
public class HomeController : Controller
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public HomeController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public JsonResult Employees(string id)
    {
        XElement element = XElement.Load(Path.Combine(_webHostEnvironment.ContentRootPath, "employees.xml"));
        IEnumerable<Employee> result;

        if (!string.IsNullOrEmpty(id))
        {
            // Search for "id" and return it's child items.
            result = FindByID(id, element.Element("Employee")).Element("items").Elements("Employee").Select(e => ToEmployee(e));
        }
        else
        {
            // Return first level nodes.
            result = element.Elements("Employee").Select(e => ToEmployee(e));
        }

        return Json(result);
    }

    private XElement FindByID(string id, XElement element)
    {
        if (element.Element("employeeId").Value == id)
        {
            return element;
        }

        if (element.Element("items") != null)
        {
            XElement item;
            foreach (var child in element.Element("items").Elements("Employee"))
            {
                item = FindByID(id, child);
                if (item != null)
                {
                    return item;
                }
            }
        }
        return null;
    }

    private Employee ToEmployee(XElement element)
    {
        return new Employee()
        {
            id = int.Parse(element.Element("employeeId").Value),
            name = element.Element("name").Value,
            hasChildren = element.Element("items") != null
        };
    }
}
```
{% else %}
```Controller
    public class HomeController : Controller
    {
        public JsonResult Employees(string id)
        {

            XElement element = XElement.Load(Server.MapPath("~/App_Data/employees.xml"));
            IEnumerable<Employee> result;

            if (!string.IsNullOrEmpty(id))
            {
                // Search for "id" and return it's child items.
                result = FindByID(id, element.Element("Employee")).Element("items").Elements("Employee").Select(e => ToEmployee(e));
            }
            else
            {
                // Return first level nodes.
                result = element.Elements("Employee").Select(e => ToEmployee(e));
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private XElement FindByID(string id, XElement element)
        {
            if (element.Element("employeeId").Value == id)
            {
                return element;
            }

            if (element.Element("items") != null)
            {
                XElement item;
                foreach (var child in element.Element("items").Elements("Employee"))
                {
                    item = FindByID(id, child);
                    if (item != null)
                    {
                        return item;
                    }
                }
            }
            return null;
        }

        private Employee ToEmployee(XElement element)
        {
            return new Employee()
            {
                id = int.Parse(element.Element("employeeId").Value),
                name = element.Element("name").Value,
                hasChildren = element.Element("items") != null
            };
        }
    }
```
{% endif %}

To see the complete example, refer to the [binding the TreeView to XML data](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/TreeViewBindingToXml) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} TreeView Resources

* [{{ site.framework }} TreeView Documentation]({%slug htmlhelpers_treeview_aspnetcore%})

* [{{ site.framework }} TreeView Demos](https://demos.telerik.com/{{ site.platform }}/treeview)

{% if site.core %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-core-ui/treeview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-mvc/panelbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [Server-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treeview)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)