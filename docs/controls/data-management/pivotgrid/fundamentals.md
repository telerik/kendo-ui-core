---
title: OLAP Fundamentals
page_title: OLAP Fundamentals | Kendo UI PivotGrid
description: "Review all fundamental concepts related to the Kendo UI PivotGrid widget."
slug: fundamentals_pivotgrid_widget
position: 4
---

# OLAP Fundamentals

Kendo UI PivotGrid resembles a [pivot-table](http://en.wikipedia.org/wiki/Pivot_table) widget, which uses Online Analytical Processing (OLAP) concepts for representing multidimensional data.

## Basic OLAP Concepts

### What Is OLAP?

OLAP is an acronym that stands for Online Analytical Processing. It allows access to data that is aggregated and organized in a multidimensional structure called a "cube". OLAP tools enable users to interactively perform analysis over multidimensional data.

For detailed information on what OLAP is and the way it processes data, refer to the following articles:

* [OLAP Definition, Wikipedia](http://en.wikipedia.org/wiki/Online_analytical_processing)
* [Working with Online Analylitical Processing, MSDN Knowldege Base](http://msdn.microsoft.com/en-US/library/ms175367(v=SQL.90).aspx)

### What Is an OLAP Cube?

The OLAP Cube is a data-set organized in a multidimensional manner. Every cube has 0 or more dimensions. The cube allows the performance of different operations, which answer complex analytical queries.

For detailed information on what an OLAP Cube is, refer to the following articles:

* [OLAP Cube, Wikipedia](http://en.wikipedia.org/wiki/OLAP_cube)
* [Understanding OLAP Cubes, MSDN Knoweldge Base](http://msdn.microsoft.com/en-us/library/aa140038%28v=office.10%29.aspx#odc_da_whatrcubes_topic2)

The OLAP Cube introduces concepts like facts, measures, and dimensions. For more information on these, refer to the sections below.

### What Is a Fact?

A [fact](http://social.technet.microsoft.com/wiki/contents/articles/1236.fact-olap.aspx) is the most detailed information that can be measured.

### What Is a Measure?

A [measure](http://social.technet.microsoft.com/wiki/contents/articles/1235.measure-group.aspx) is an aggregated value of facts.

### What Is a Dimension?

A [dimension](http://social.technet.microsoft.com/wiki/contents/articles/1192.dimension.aspx) is a categorical view of data.

### What Is XMLA?

XMLA is an acronym that stands for [XML for Analysis](http://en.wikipedia.org/wiki/XML_for_Analysis). XMLA is a protocol designed for universal data access to a multidimensional data source, which resides on the Web.

For detailed information on XMLA, refer to [this article](http://technet.microsoft.com/en-us/library/ms187178(v=sql.90).aspx).

[Kendo UI `PivotDataSource`](/api/framework/pivotdatasource) has a built-in support for XMLA using a specific XMLA [`transport`](/api/framework/pivotdatasource#configuration-transport) and [`schema`](/api/framework/pivotdatasource#configuration-schema).

## See Also

Other article on the Kendo UI PivotGrid:

* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})

For how-to examples on the Kendo UI PivotGrid widget, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
