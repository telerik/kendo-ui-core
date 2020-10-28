---
title: OLAP Fundamentals
page_title: jQuery PivotGrid Documentation | OLAP Fundamentals
description: "Get started with the jQuery PivotGrid by Kendo UI and review all fundamental concepts related to the widget."
slug: fundamentals_pivotgrid_widget
position: 2
---

# OLAP Fundamentals

The PivotGrid resembles a [pivot table](https://en.wikipedia.org/wiki/Pivot_table) that uses Online Analytical Processing (OLAP) concepts for representing multidimensional data.

## What Is OLAP?

OLAP is an acronym that stands for Online Analytical Processing. It allows access to data that is aggregated and organized in a multidimensional structure that is called a "cube". OLAP tools enable users to interactively perform analysis over multidimensional data.

For more information, refer to the following resources:
* [OLAP definition (Wikipedia)](https://en.wikipedia.org/wiki/Online_analytical_processing)
* [Working with Online Analytical Processing (MSDN)](https://msdn.microsoft.com/en-US/library/ms175367(v=SQL.90).aspx)

## What Is an OLAP Cube?

The OLAP cube is a dataset that is organized in a multidimensional manner. Every cube has 0 (zero) or more dimensions. The cube allows the performance of different operations which answer complex analytical queries. The OLAP cube introduces concepts like facts, measures, and dimensions.

For more information, refer to the following resources:
* [OLAP cube definition (Wikipedia)](https://en.wikipedia.org/wiki/OLAP_cube)
* [Understanding OLAP cubes (MSDN)](https://msdn.microsoft.com/en-us/library/aa140038%28v=office.10%29.aspx#odc_da_whatrcubes_topic2)

## What Are the Basic OLAP Cube Concepts?

* A [fact](http://social.technet.microsoft.com/wiki/contents/articles/1236.fact-olap.aspx) is the most detailed piece of information that can be measured.
* A [measure](http://social.technet.microsoft.com/wiki/contents/articles/1235.measure-group.aspx) is an aggregated value of facts.
* A [dimension](http://social.technet.microsoft.com/wiki/contents/articles/1192.dimension.aspx) is a categorical view of data.

## What Is XMLA?

XMLA is an acronym that stands for [XML for Analysis](https://en.wikipedia.org/wiki/XML_for_Analysis). XMLA is a protocol that is designed for universal data access to a multidimensional data source which resides on the Web. For more information, refer to [this article](http://technet.microsoft.com/en-us/library/ms187178(v=sql.90).aspx).

The [`PivotDataSource`](/api/javascript/data/pivotdatasource) configuration provides built-in support for XMLA by using specific XMLA [`transport`](/api/framework/pivotdatasource#configuration-transport) and [`schema`](/api/framework/pivotdatasource#configuration-schema) options.

## See Also

* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
