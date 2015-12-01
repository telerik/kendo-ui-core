---
title: Frequently Asked Questions
page_title: Frequently Asked Questions | Kendo UI PivotGrid Widget
description: "Find the most frequent questions related to the Kendo UI PivotGrid widget and their answers."
slug: frequently_asked_questions_pivotgrid
position: 6
---

# Frequently Asked Questions

This is a collection of the most frequently asked questions (FAQ) related to the Kendo UI PivotGrid widget and their answers.

## OLAP 

### Does Kendo UI PivotGrid Work with OLAP Cube, Delived by MS SSAS?

Yes. The [Microsoft SQL Server Analysis Services (MS SSAS)](http://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx) use the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) protocol, which is the main requirement for the PivotGrid to work.

### Does the PivotGrid Work with Different OLAP Servers?

If the OLAP service implements the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) standard, it should work out-of-the-box. Note that the supported format of the [`Execute`](http://msdn.microsoft.com/en-us/library/ms186691.Aspx) method is a Multidimensional property:

	<PropertyList>
       <Format>Multidimensional</Format>
    </PropertyList>

The value of the `AxisFormat` should be `TupleFormat`:

	<PropertyList>
       <AxisFormat>TupleFormat</AxisFormat>
    </PropertyList>

### How to Connect to Secured OLAP Instance?

Check the [section related to accessing the cube securely](/kendo-ui/web/pivotgrid/olap-cube-setup#access-the-cube-securely).

### I Do Not Have OLAP Cube. Can I Still Use the PivotGrid?

Currently, Kendo UI `PivotDataSource` has limited support for [binding to flat data](http://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding). Note that in this scenario not all of the features that are avialable when the widget is bound to an OLAP cube are supported, such as filtering, sorting, hierarchies, etc.

## See Also 

Other article on Kendo UI PivotGrid:

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [PivotConfigurator]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})