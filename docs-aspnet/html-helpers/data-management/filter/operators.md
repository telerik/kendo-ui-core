---
title: Setting the Operators
page_title: Setting the Operators
description: "Get started with the Telerik UI Filter HtmlHelper for {{ site.framework }} and learn how to select its available filter operators."
previous_url: /helpers/data-management/filter/operators
slug: htmlhelpers_filter_aspnetcore_choose_operators
position: 2
---

# Setting the Operators

The Filter provides options for defining which filter operators will be displayed in the filtering drop-down by using the `.Operators()` option.

The following example demonstrates how to set the `equals` and `contains` filter operators to the string fields and the `greater than` and `less than` filter operators to the numerical fields.

```View
<script type="text/x-kendo-template" id="itemTemplate">
    <li>
        <strong>#= Name #</strong>, aged #= Age #, is on vacation: #= IsOnLeave #
    </li>
</script>

@(Html.Kendo().DataSource<SampleData>()
    .Name("dataSource1")
    .Ajax(d=>d.Read(r => r.Action("GetPeople", "Filter")))
)

@(Html.Kendo().Filter<SampleData>()
    .Name("filter")

    .Operators(o => // Define the custom texts for the operator names and the available operators.
    {
        o.String(s =>
        {
            s.Eq("Is Exactly");
            s.Contains("Partially Matches");
        });
        o.Number(n =>
        {
            n.Gte("Older Than");
            n.Lt("Younger Than");
        });
    })

    .MainLogic(FilterCompositionLogicalOperator.And)
    .ExpressionPreview() // Shows a text preview of the filter expression.
    .ApplyButton() // Shows the built-in Apply button.
    .Fields(f => // Defining the fields is not mandatory. Otherwise, they will be taken from the data source schema.
                    // If you define the fields, their names and types must match the data source definition.
    {
        f.Add(p=>p.Name).Label("Name");
        f.Add(p=>p.Age).Label("Age");
        f.Add(p=>p.IsOnLeave).Label("On Vacation");
    })
    .FilterExpression(f => { // Defining an initial filter expression is not required.
        f.Add(p => p.Age).IsGreaterThanOrEqualTo(30);
        f.Add(p => p.Name).Contains("Doe");
    })
    .DataSource("dataSource1")
)

@(Html.Kendo().ListView<SampleData>()
    .Name("listView")
    .TagName("ul")
    .DataSource("dataSource1")
    .ClientTemplateId("itemTemplate")
)

<script>
    $(document).ready(function () {
        // Apply filtering immediately after the helper initialization because an initial filter is set.
        $("#filter").getKendoFilter().applyFilter();
    });
</script>
```
```Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

public class FilterController : BaseController
{
    public IActionResult GetPeople([DataSourceRequest]DataSourceRequest request)
    {
        var people = new List<SampleData>() {
             new SampleData()  { Name = "Jane Doe", Age = 25, IsOnLeave = false },
             new SampleData() { Name = "John Doe", Age = 33, IsOnLeave = true },
             new SampleData() { Name = "John Smith", Age = 37, IsOnLeave = true },
             new SampleData() { Name = "Nathan Doe", Age = 42, IsOnLeave = false }
        };
        return Json(people.ToDataSourceResult(request));
    }

    public IActionResult Index()
    {
        return View();
    }
}
```
```Model
public class SampleData
{
    public int Age { get; set; }
    public string Name { get; set; }
    public bool IsOnLeave { get; set; }
}
```

## See Also

* [Basic Usage of the Filter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/index)
* [Localization of Messages in the Filter HtmlHelper for {{ site.framework }}]({%slug htmlhelpers_filter_aspnetcore_localization%})
* [Server-Side API](/api/filter)
