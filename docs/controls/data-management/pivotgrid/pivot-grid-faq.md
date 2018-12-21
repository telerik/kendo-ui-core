---
title: Frequently Asked Questions
page_title: Frequently Asked Questions | Kendo UI PivotGrid
description: "Find the most frequently asked questions related to the Kendo UI PivotGrid widget and their answers."
slug: frequently_asked_questions_pivotgrid
position: 6
---

# Frequently Asked Questions

This article provides a collection of the most frequently asked questions (FAQs) and answers related to the Kendo UI PivotGrid.

## OLAP

### Does the PivotGrid work with the OLAP cube that is delivered by MS SSAS?

Yes, it does.

The [Microsoft SQL Server Analysis Services (MS SSAS)](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx) use the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) protocol, which is the main requirement for the PivotGrid to work.

### Does the PivotGrid work with different OLAP servers?

If the OLAP service implements the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) standard, it should work out-of-the-box. Note that the supported format of the [`Execute`](http://msdn.microsoft.com/en-us/library/ms186691.Aspx) method is a Multidimensional property:

	<PropertyList>
       <Format>Multidimensional</Format>
    </PropertyList>

The value of the `AxisFormat` should be `TupleFormat`.

	<PropertyList>
       <AxisFormat>TupleFormat</AxisFormat>
    </PropertyList>

### How can I connect to a secured OLAP instance?

For more information, refer to the [section on accessing the cube securely]({% slug olap_cube_setup_pivotgrid_widget %}#access-the-cube-securely).

### If I do not have an OLAP cube, can I still use the PivotGrid?

Currently, the Kendo UI `PivotDataSource` has limited support for [binding to flat data](http://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding). Note that in this scenario not all of the features that are available when the widget is bound to an OLAP cube (such as sorting, hierarchies, and other) are supported.

## See Also

Other article on the Kendo UI PivotGrid:

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [How-To Examples]({% slug howto_change_pivotgrid_fields_names_pivotgrid %})
* [Knowledge Base Section](/knowledge-base)
