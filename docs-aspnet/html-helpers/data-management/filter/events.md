---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Filter component for {{ site.framework }}."
slug: events_filter_aspnetcore
position: 6
---

# Events

You can subscribe to the `Change` [Filter event](/api/kendo.mvc.ui.fluent/filtereventbuilder) and further customize the functionality of the component.

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Filter<Kendo.Mvc.Examples.Models.Sushi>()
        .Name("filter")
        .MainLogic(FilterCompositionLogicalOperator.Or)
        .ApplyButton()
        .ExpressionPreview()
        .Fields(f =>
        {
            f.Add(p => p.name).Label("Name");
            f.Add(p => p.price).Label("Price");
            f.Add(p => p.description).Label("Description");
        })
        .FilterExpression(f =>
        {
            f.Add(p => p.price).IsGreaterThanOrEqualTo(5);
            f.Add(p => p.name).Contains("Salad");
        })
        .Events(e => e.Change("onChange"))
        .DataSource("dataSource1")
    )

    <script>
        function onChange(){
            console.log("change");
        }
    </script>
```
{% if site.core %}
```TagHelper
	<kendo-filter apply-button="true" expression-preview="true" main-logic="Or" name="filter" expression="InitialExpression" datasource-id="dataSource1" on-change="onChange">
		<fields>
	 		<filter-field name="name" type="string" label="Name">
	 		</filter-field>
	 		<filter-field name="price" type="number" label="Price">
	 		</filter-field>
	 		<filter-field name="description" type="string" label="Description">
	 		</filter-field>
		</fields>
	</kendo-filter>

    <script>
        function onChange(){
            console.log("change");
        }
    </script>
```
{% endif %}

## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Filter<Kendo.Mvc.Examples.Models.Sushi>()
        .Name("filter")
        .MainLogic(FilterCompositionLogicalOperator.Or)
        .ApplyButton()
        .ExpressionPreview()
        .Fields(f =>
        {
            f.Add(p => p.name).Label("Name");
            f.Add(p => p.price).Label("Price");
            f.Add(p => p.description).Label("Description");
        })
        .FilterExpression(f =>
        {
            f.Add(p => p.price).IsGreaterThanOrEqualTo(5);
            f.Add(p => p.name).Contains("Salad");
        })
        .Events(e => e.Change(@<text>
             function(){
                 // Handle the change event inline.
             }
            </text>))
        .DataSource("dataSource1")
    )
```
{% if site.core %}
```TagHelper
	<kendo-filter apply-button="true" expression-preview="true" main-logic="Or" name="filter" expression="InitialExpression" datasource-id="dataSource1" 
                                                    on-change="
                                                         function(){
                                                             // Handle the change event inline.
                                                         }">
		<fields>
	 		<filter-field name="name" type="string" label="Name">
	 		</filter-field>
	 		<filter-field name="price" type="number" label="Price">
	 		</filter-field>
	 		<filter-field name="description" type="string" label="Description">
	 		</filter-field>
		</fields>
	</kendo-filter>
```
{% endif %}

## See Also

* [Using the API of the DateRangePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/api)
* [DateRangePicker Server-Side API](/api/filter)
* [DateRangePicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter)