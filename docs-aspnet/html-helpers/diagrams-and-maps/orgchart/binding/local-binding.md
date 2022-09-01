---
title:  Local Binding
page_title: Local Binding
description: "Learn how to implement Local Binding with Telerik UI OrgChart component for {{ site.framework }}."
previous_url: /helpers/editors/orgchart/binding/local-binding
slug: htmlhelpers_orgchart_localbinding_aspnetcore
position: 2
---

# Local Binding

You can bind the OrgChart to local data by using its API.

## Binding to a Local JSON Array

The following example demonstrates how to bind the OrgChart to a JSON array available on the client.

```HtmlHelper
    @(Html.Kendo().OrgChart<Kendo.Mvc.Examples.Models.OrgChartEmployeeViewModel>()
        .Name("orgchart")
    )

    <script>
        $(document).ready(function () {
            var employees = [
                {
                    "ID": 1,
                    "Name": "Daryl Sweeney",
                    "Position": "CEO",
                },
                {
                    "ID": 2,
                    "ParentID": 1,
                    "Name": "Guy Wooten",
                    "Position": "Chief Technical Officer",
                },
                {
                    "ID": 3,
                    "ParentID": 1,
                    "Name": "Priscilla Frank",
                    "Position": "Chief Product Officer",
                },
                {
                    "ID": 4,
                    "ParentID": 3,
                    "Name": "Ursula Holmes",
                    "Position": "EVP, Product Strategy",
                },
                {
                    "ID": 5,
                    "ParentID": 1,
                    "Name": "Anika Vega",
                    "Position": "Chief Process Officer",
                }
            ];

            var orgchart = $("#orgchart").data("kendoOrgChart");
            var dataSource = new kendo.data.OrgChartDataSource({
                data: employees,
                schema: {
                    model: {
                        id: "ID",
                        parentId: "ParentID",
                        expanded: true,
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            title: { field: "Position", nullable: true },
                            name: { field: "Name" }
                        }
                    }
                }
            });

            orgchart.setDataSource(dataSource);
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-orgchart name="orgchart"></kendo-orgchart>
    
    <script>
        $(document).ready(function () {
            var employees = [
                {
                    "ID": 1,
                    "Name": "Daryl Sweeney",
                    "Position": "CEO",
                },
                {
                    "ID": 2,
                    "ParentID": 1,
                    "Name": "Guy Wooten",
                    "Position": "Chief Technical Officer",
                },
                {
                    "ID": 3,
                    "ParentID": 1,
                    "Name": "Priscilla Frank",
                    "Position": "Chief Product Officer",
                },
                {
                    "ID": 4,
                    "ParentID": 3,
                    "Name": "Ursula Holmes",
                    "Position": "EVP, Product Strategy",
                },
                {
                    "ID": 5,
                    "ParentID": 1,
                    "Name": "Anika Vega",
                    "Position": "Chief Process Officer",
                }
            ];

            var orgchart = $("#orgchart").data("kendoOrgChart");
            var dataSource = new kendo.data.OrgChartDataSource({
                data: employees,
                schema: {
                    model: {
                        id: "ID",
                        parentId: "ParentID",
                        expanded: true,
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            title: { field: "Position", nullable: true },
                            name: { field: "Name" }
                        }
                    }
                }
            });

            orgchart.setDataSource(dataSource);
        });
    </script>
```
{% endif %}

## See Also

* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
