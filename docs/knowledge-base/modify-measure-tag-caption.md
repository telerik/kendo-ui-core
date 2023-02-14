---
title: Modify the Captions of the PivotGrid Measure Tag
page_title: Modify PivotGrid Measure Tag Captions
description: "Learn how to measure tags in the header and modify their captions in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/modify-measure-tag-caption, /controls/data-management/pivotgrid/how-to/appearance/modify-measure-tag-caption
slug: howto_modify_measure_tag_captions_pivotgrid
tags: pivotgrid, modify, captions, of, measure, tag
component: pivotgrid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PivotGrid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I modify the measure tag captions in the header of a Kendo UI PivotGrid widget?

## Solution

The following example demonstrates how to access the **Internet Sales Amount** button and update its content.

```dojo
<div id="example">
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                    rows: [{ name: "[Geography].[City]" }],
                    measures: ["[Measures].[Internet Sales Amount]"],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: "https://demos.telerik.com/olap/msmdpump.dll",
                      parameterMap: function(options, type) {
                        var query = kendo.data.transports.xmla.fn.options.parameterMap(options, type);

                        //modify the query here if needed

                        return query;
                      }
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                },
                dataBound: function() {
                  var tags = this.wrapper.find(".k-settings-measures > span.k-chip");
                  
                  tags.each(function() {
                    var tag = $(this);
                    var name = tag.text().split(".");
                    var caption = name[name.length - 1];

                    caption = caption.substring(1, caption.length - 1);
                    
                    //update text node
                    tag.find(".k-chip-text")[0].childNodes[0].nodeValue = caption;
                  });
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
