---
title: Kendo UI PivotGrid FAQ
page_title: Kendo UI PivotGrid Frequently Asked Questions
description: Answers to Frequently Asked Questions about what Kendo UI PivotGrid supports
---

# Kendo UI PivotGrid Frequently Asked Questions

This is a collection of frequently asked questions about what Kendo UI PivotGrid supports.

## Q: Does the PivotGrid widget works with OLAP cube delived by MS SSAS?

A: _**Yes.**_ The [MS SSAS](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx) uses [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) protocol, which is the main requirement for the PivotGrid to work.

## Q: Does the PivotGrid widget works with different OLAP servers?

A: If the OLAP service implements [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) standard, then it should work out-of-the-box. Please note that the supported format of [Execute](http://msdn.microsoft.com/en-us/library/ms186691.Aspx) method is a **Multidimensional** property:

	<PropertyList>
       <Format>Multidimensional</Format>
    </PropertyList>

and value of the *Axis format* should be **TupleFormat**:

	<PropertyList>
       <AxisFormat>TupleFormat</AxisFormat>
    </PropertyList>

## Q: I don't have OLAP cube, can I still use Kendo UI PivotGrid?

A: Currently, the Kendo UI PivotDataSource has limited support for [binding to flat data](http://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding). Note that in this scenario not all of the features avialable when bound to a OLAP cube are supported. Those includes filtering, sorting, hierarchies and etc.

## Next steps:
- [Getting started](/web/pivotgrid/overview)
