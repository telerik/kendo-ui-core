---
title: Filter Grid columns by date via Search Panel
description: An example of how to filter columns by date via Search Panel in Kendo UI Grid for jQuery
type: how-to
page_title: Filter columns by date via Search Panel | Kendo UI Grid for jQuery
slug: grid-filter-columns-by-date-via-search-panel
tags: grid, search, panel, filter, date, format, columns
ticketid: 1459985
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

How can I achieve a global search by date columns via the Search Panel?

## Solution

Search Panel works with strings, whereas the date type is an object. 
To accomplish date type searching: 

1. Add an additional field within the [`model`](/api/javascript/data/datasource/configuration/schema#schemamodel), that will represent a formatted date.
2. Use the newly created field in [`search.fields`](/api/javascript/ui/grid/configuration/search.fields) configuration.

```dojo

	<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataSource: {
              data: createRandomData(50),
              schema: {
                model: {
                  fields: {
                    City: { type: "string" },
                    Title: { type: "string" },
                    BirthDate: { type: "date" },
                    BirthDateFormatted: { type: "string" }
                  }
                },
                parse: function (response) {
                  for (var i = 0; i < response.length; i++) {
                    response[i].BirthDateFormatted = kendo.format("{0:MM/dd/yyyy}", response[i].BirthDate);
                  }
                  return response;
                }
              },
              pageSize: 15
            },
            height: 550,
            pageable: true,
            filterable: true,
            search: {
              fields: ["City", "Title", "BirthDateFormatted", "FirstName", "LastName"] 
            },
            toolbar: ["search"],
            columns: [
              {
                title: "Name",
                width: 190,
                filterable: false,
                template: "#=FirstName# #=LastName#"
              },
              {
                field: "City",
                width: 160,
              },
              {
                field: "Title",
                width: 250,
              },
              {
                field: "BirthDate",
                title: "Birth Date",
                format: "{0:MM/dd/yyyy}"
              }
            ]
          });
        });
      </script>
    </div>
```