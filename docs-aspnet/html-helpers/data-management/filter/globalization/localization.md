---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI Filter HtmlHelper for {{ site.framework }} and learn how to localize its operator texts."
previous_url: /helpers/data-management/filter/globalization/localization
slug: htmlhelpers_filter_aspnetcore_localization
position: 2
---

# Localization

The Filter provides options for defining the text of its filter operators (for example, `contains`, `equals`, or `greater than`) and logic messages (for example, `AND` and `OR`).

To localize the messages, set the desired strings in the `.Operators()` and `.Messages()` options. You can also use this feature to [select the available filter operators]({% slug htmlhelpers_filter_aspnetcore_choose_operators %}).

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

    .Messages(m => // Custom texts for localizable UI.
    {
        m.And("AND"); // The AND main logic text.
        m.Or("OR"); // The OR main logic text.
        m.Apply("Set Filter"); // The APPLY button text.
    })

    .Operators(o => // Define the custom texts for the operator names and select the available operators.
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
    public ActionResult GetPeople([DataSourceRequest]DataSourceRequest request)
    {
        var people = new List<SampleData>() {
             new SampleData()  { Name = "Jane Doe", Age = 25, IsOnLeave = false },
             new SampleData() { Name = "John Doe", Age = 33, IsOnLeave = true },
             new SampleData() { Name = "John Smith", Age = 37, IsOnLeave = true },
             new SampleData() { Name = "Nathan Doe", Age = 42, IsOnLeave = false }
        };
        return Json(people.ToDataSourceResult(request));
    }

    public ActionResult Index()
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
* [Server-Side API](/api/filter)
