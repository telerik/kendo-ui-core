---
title: FAQ
page_title: jQuery PivotGrid Documentation | Frequently Asked Questions
description: "Get started with the jQuery PivotGrid by Kendo UI and find the most frequently asked questions related to the Kendo UI PivotGrid widget and their answers."
slug: frequently_asked_questions_pivotgrid
position: 80
---

# Frequently Asked Questions

This article lists the answers to the most frequently asked questions (FAQs) when working with the Kendo UI PivotGrid.

## Does the PivotGrid work with the OLAP cube that is delivered by MS SSAS?

Yes, it does. The [Microsoft SQL Server Analysis Services (MS SSAS)](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx) use the [XMLA](https://en.wikipedia.org/wiki/XML_for_Analysis) protocol, which is the main requirement for the PivotGrid to work.

## Does the PivotGrid work with different OLAP servers?

If the OLAP service implements the [XMLA](https://en.wikipedia.org/wiki/XML_for_Analysis) standard, it should work out-of-the-box. Note that the supported format of the [`Execute`](https://msdn.microsoft.com/en-us/library/ms186691.Aspx) method is a Multidimensional property:

	<PropertyList>
       <Format>Multidimensional</Format>
    </PropertyList>

The value of the `AxisFormat` should be `TupleFormat`.

	<PropertyList>
       <AxisFormat>TupleFormat</AxisFormat>
    </PropertyList>

## How can I connect to a secured OLAP instance?

For more information, refer to the [section on accessing the cube securely]({% slug olap_cube_setup_pivotgrid_widget %}#access-the-cube-securely).

## If I do not have an OLAP cube, can I still use the PivotGrid?

Currently, the Kendo UI `PivotDataSource` has limited support for [binding to flat data](https://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding). Note that in this scenario not all of the features that are available when the widget is bound to an OLAP cube (such as hierarchies and other) are supported.

## See Also

* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [JavaScript API Reference of the PivotGrid](/api/javascript/ui/pivotgrid)
* [Knowledge Base Section](/knowledge-base)
