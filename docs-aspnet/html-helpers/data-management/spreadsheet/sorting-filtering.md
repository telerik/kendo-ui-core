---
title: Sorting and Filtering
page_title: Spreadsheet Sorting and Filtering
description: "Learn how to configure the sorting and filtering functionality of the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_sorting_filtering_aspnetcore
position: 6
---

# Sorting and Filtering

The Spreadsheet for {{ site.framework }} allows you to set predefined sort and filter settings.

## Sorting

You can set the Sorting configuration via the [`Sort()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetBuilder#sortsystemactionkendomvcuifluentspreadsheetsheetsortsettingsbuilder)  option. Set the reference over which the sorting will be applied via the [`Ref()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetSortSettingsBuilder) configuration and define further sorting settings via the [`Columns()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetSortSettingsBuilder) configuration option.

```HtmlHelper
    .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .Sort(sort => sort
                    .Ref("A3:G49")
                    .Columns(columns => { 
                        columns.Add().Index(3).Ascending(false); 
                    })
                )
                //additional sheet configuration options
        })
```
{% if site.core %}
```TagHelper
    <sheet name="Sheet1">
        <sort ref="A3:G49">
			<sort-columns >
				<sort-column index="3" ascending="false">
                </sort-column>
            </sort-columns>
        </sort>
    </sheet>
```
{% endif %}

## Filtering

You can set the Filtering configuration via the [`Filter()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetBuilder#filtersystemactionkendomvcuifluentspreadsheetsheetfiltersettingsbuilder) option. Set the reference over which the filtering will be applied via the [`Ref()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetFilterSettingsBuilder) configuration and define further filtering settings via the [`Columns()`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetFilterSettingsBuilder) configuration option. You will need to set a [`Filter`](/api/Kendo.Mvc.UI.Fluent/SpreadsheetSheetFilterSettingsColumnFactory#topfiltersystemactionkendomvcuifluentspreadsheettopfilterbuilder) and the additional parameters for each filter.

The supported filters are:
* ValueFilter - Represents a filter applied to a column of a given range. Used to filter a column by a predefined set of values.
* TopFilter - Represents a filter applied to a column of a given range. It may be used to filter the top X items (top X percent, bottom X percent, top X number, bottom X number).
* DynamicFilter - Represents a filter applied to a column of a given range. It may be used to filter dates and numbers for relative values, like belowAverage, yesterday, etc.
* CustomFilter - Represents a filter applied to a column of a given range. It may specify one or two criterion, comparison operator (equals, starts with, greater than etc.), and logical operator (and, or).

```HtmlHelper
    .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .Filter(filter => filter
                    .Ref("A3:G49")
                    .Columns(columns => { columns
                        .Add()
                        .Index(0)
                        .Filter("custom")
                        .Criteria(criteria=>criteria
                            .Add()
                            .Operator(SpreadsheetFilterOperator.GreaterThan)
                            .Value(10227)); 
                    }))
        //additional sheet configuration options
    })
```
{% if site.core %}
```TagHelper
    <sheet name="Sheet1">
		<filter>					
			<filter-columns>
				<filter-column index="0" filter="custom">
					<criterias>
						<criteria operator="SpreadsheetFilterOperator.GreaterThan" value="10227"></criteria>
					</criterias>
				</filter-column>
			</filter-columns>
		</filter>
	</sheet>
```
{% endif %}

## See Also
* [Sorting and Filtering of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/sorting-filtering)
* [Server-Side API](/api/spreadsheet)
