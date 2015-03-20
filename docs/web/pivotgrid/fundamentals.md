---
title: PivotGrid Fundamentals
page_title: Fundamental concepts related to the PivotGrid widget
description: Review of all fundamental contepts related to the PivotGrid widget
---

#PivotGrid Fundamentals

The Kendo UI PivotGrid is a [pivot-table](http://en.wikipedia.org/wiki/Pivot_table)-like widget, which uses **OLAP** concepts to represent multidimensional data.

## What is OLAP?

*Online Analytical Processing* (OLAP) allows access to aggregated and organized in a multidimensional structure called *cube*. OLAP tools enables users to perform analyze over multidimensional data interactively. For more detailed information check the following links:

- [OLAP (Wikipedia)](http://en.wikipedia.org/wiki/Online_analytical_processing)
- [Working with Online Analylitical Processing (MSDN)](http://msdn.microsoft.com/en-US/library/ms175367(v=SQL.90).aspx)

## What is OLAP cube?

OLAP cube is a data-set organized in a multidimensional manner. Every cube has 0 or more *dimensions*. Cube allows to perform different operations answering complex analytical queries. For more information about cubes check the following links:

- [Cube (Wikipedia)](http://en.wikipedia.org/wiki/OLAP_cube)
- [Understanding OLAP cubes (MSDN)](http://msdn.microsoft.com/en-us/library/aa140038%28v=office.10%29.aspx#odc_da_whatrcubes_topic2)

OLAP cube introduces other concepts like **facts**, **measures**, **dimensions**.

## What is a Fact?
[Fact](http://social.technet.microsoft.com/wiki/contents/articles/1236.fact-olap.aspx) is the most detailed information that can be measured.

## What is a Measure?

[Measure](http://social.technet.microsoft.com/wiki/contents/articles/1235.measure-group.aspx) is an aggregated value of facts.

## What is a Dimension?

[Dimension](http://social.technet.microsoft.com/wiki/contents/articles/1192.dimension.aspx) is a categorical view of data.

## What is XMLA?

[XML for Analysis (XMLA)](http://en.wikipedia.org/wiki/XML_for_Analysis) is a protocol designed for universal data access to a multidimensional data source, which resides on the Web. A more detailed explanation can be found [here](http://technet.microsoft.com/en-us/library/ms187178(v=sql.90).aspx).

[Kendo UI PivotDataSource](/api/framework/pivotdatasource) component has a built-in support for **XMLA** using a specific XMLA [transport](/api/framework/pivotdatasource#configuration-transport) and [schema](/api/framework/pivotdatasource#configuration-schema).

## Next steps:
- [Setup OLAP cube](/web/pivotgrid/olap-cube-setup)
- [Getting started](/web/pivotgrid/overview)