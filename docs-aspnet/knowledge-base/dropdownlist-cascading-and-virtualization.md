---
title: Cascade DropDownLists with Enabled Virtualization
page_title: Cascade DropDownLists with Enabled Virtualization
description: "Learn how to create cascaded DropDownLists and enabled virtualization in {{ site.framework }} applications."
type: how-to
previous_url: /helpers/editors/dropdownlist/how-to/cascading-and-virtualization, /html-helpers/editors/dropdownlist/how-to/cascading-and-virtualization
slug: howto_cascadeddlenabledvirtualization_ddlaspnetmvc
tags: dropdownlist, cascade, virtualization
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I implement cascading {{ site.framework }} DropDownLists with enabled virtualization?

## Solution

To implement cascading DropDownLists and still virtualize the data, you must use a [custom DataSource]({% slug htmlhelper_datasourcetypes_aspnetcore%}) configuration. It enables the usage of the `DataSourceRequest` and `ToDataSourceResult` methods, which internally parse all filter and page expression information, and apply it directly to the data.

```HtmlHelper
@(Html.Kendo().DropDownList()
    .Name("Category")
    .BindTo(ViewBag.Categories)
    .DataTextField("CategoryName")
    .DataValueField("CategoryId")
)

<h5>Type "4" in the filter input</h5>

@(Html.Kendo().DropDownList()
    .Name("SelectEmployeeId")
    .CascadeFrom("Category")
    .DataValueField("Id")
    .DataTextField("Name")
    .Filter("contains")
    .Virtual(v => v.ValueMapper("SelectEmployeeValueMapper").ItemHeight(26))
    .DataSource(source =>
    {
        source.Custom()
        .ServerFiltering(true)
        .ServerPaging(true)
        .Type("aspnetmvc-ajax")
        .Transport(transport => transport.Read(r => r.Action("GetVirtualData", "Home")))
        .Schema(schema =>
        {
            schema.Data("Data").Total("Total");
        });
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-dropdownlist name="Category"
    datatextfield="CategoryName"
    datavaluefield="CategoryId"
    bind-to="ViewBag.Categories">
</kendo-dropdownlist>

<h5>Type "4" in the filter input</h5>

<kendo-dropdownlist name="SelectEmployeeId" cascade-from="category"
    datatextfield="Name"
    datavaluefield="Id"
    filter="FilterType.Contains">
    <datasource type="DataSourceTagHelperType.Custom" 
        page-size="80" 
        server-paging="true" 
        server-filtering="true">
        <schema data="Data" total="Total"></schema>
        <transport>
            <read url="@Url.Action("GetVirtualData", "Home")"/>
        </transport>
    </datasource>
    <virtual item-height="26" value-mapper="SelectEmployeeValueMapper" />
</kendo-dropdownlist>
```
{% endif %}
```JavaScript Scripts
<script>
    // The valueMapper function is called when you want to select a data item that is not present in the DataSource.
    function SelectEmployeeValueMapper(options) {
        $.ajax({
            url: "@Url.Action("EmployeeValueMapper", "Home")",
            data: {
                value: options.value || 0,
                status: 1,
                excludeId: -1
            },
            success: function (data) {
                options.success(data);
            }
        });
    }
</script>
```
{% if site.mvc %}
```C# Controller
public class HomeController : Controller
{
    public ActionResult Index()
    {
        var categories = Enumerable.Range(1, 5).Select(i => {
            return new Category
            {
                CategoryId = i,
                CategoryName = "Category " + i.ToString()
            };
        });
        ViewBag.Categories = categories;
        return View();
    }

    public JsonResult GetVirtualData([DataSourceRequest] DataSourceRequest request)
    {
        var data = GetEmployee();
        return Json(data.ToDataSourceResult(request));
    }

    private static List<Employee> GetEmployee()
    {
        var rand = new Random();

        var data = Enumerable.Range(0, 1000).Select(i => {
            return new Employee
            {
                Id = i,
                CategoryId = rand.Next(1, 5),
                Name = "Emp" + i.ToString()
            };
        }).ToList();

        return data;
    }

    public JsonResult EmployeeValueMapper(int value)
    {
        var dataItemIndex = -1;
        var data = GetEmployee();
        if (value != 0)
        {
            var index = 0;
            foreach (var vm in data)
            {
                if (vm.Id == value)
                {
                    dataItemIndex = index;
                    break;
                }

                index += 1;
            }
        }
        return Json(dataItemIndex, JsonRequestBehavior.AllowGet);
    }
}
```
{% else %}
```C# Controller
public class HomeController : Controller
{
    public IActionResult Index()
    {
        var categories = Enumerable.Range(1, 5).Select(i => {
            return new Category
            {
                CategoryId = i,
                CategoryName = "Category " + i.ToString()
            };
        });
        ViewBag.Categories = categories;
        return View();
    }

    public JsonResult GetVirtualData([DataSourceRequest] DataSourceRequest request)
    {
        var data = GetEmployee();
        return Json(data.ToDataSourceResult(request));
    }

    private static List<Employee> GetEmployee()
    {
        var rand = new Random();

        var data = Enumerable.Range(0, 1000).Select(i => {
            return new Employee
            {
                Id = i,
                CategoryId = rand.Next(1, 5),
                Name = "Emp" + i.ToString()
            };
        }).ToList();

        return data;
    }
    
    public JsonResult EmployeeValueMapper(int value)
    {
        var dataItemIndex = -1;
        var data = GetEmployee();
        if (value != 0)
        {
            var index = 0;
            foreach (var vm in data)
            {
                if (vm.Id == value)
                {
                    dataItemIndex = index;
                    break;
                }

                index += 1;
            }
        }
        return Json(dataItemIndex);
    }
}
```
{% endif %}

To see the complete example, refer to the ASP.NET MVC project on how to [cascade DropDownLists with enabled virtualization](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/DropDownListVirtualization). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DropDownList for {{ site.framework }}](/api/taghelpers/dropdownlist)
{% endif %}
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
