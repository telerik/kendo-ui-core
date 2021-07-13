---
title: TreeList Aggregate Specifics
description: TreeList Aggregate Specifics
type: how-to
page_title: TreeList Aggregate Specifics | Kendo UI TreeList for jQuery
slug: treelist-aggregate-specifics
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TreeList for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This article explains the specifics about TreeList aggregates and how they are calculated.

Depending on the requirements of your project and the configuration of your data, you can choose between several components to display Aggregates (Calculations or Totals). Some examples are Grid, TreeList and PivotGrid.

The Grid has strong Grouping capabilities:
<https://demos.telerik.com/kendo-ui/grid/aggregates>

And Grid Hierarchy:
<https://demos.telerik.com/kendo-ui/grid/hierarchy>

And also the PivotGrid:
<https://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding>

The same applies for the TreeList, as well. The difference is that in the TreeList all the items should be of the same logical type. Although they can be placed on different levels, all records need to represent the same unit type, for instance - person, order, employee, etc. This component is not suitable for Parent-Child relations. Let's take for instance the following sample:
<https://dojo.telerik.com/UyEKIcid/6>

The Aggregate results are mathematically correct, but logically seem wrong and 1400 "seems" to have been 700 instead. But the results are actually correct and the total should say 1400. This is due to the prerequisite that the TreeList data should not be like Parent-Child or Department-Employee. This is the job of the Grid Grouping. Rather, the TreeList should contain same-type data, like Boss-Employee, where every record's amount/salary/number is its own, and not a total of the inner levels:
<https://dojo.telerik.com/equROBOr>

For better clarification, you can open the following live sample:
<https://demos.telerik.com/kendo-ui/treelist/aggregates>

As a Total count in the TreeList, there are 99 employees. But when you expand the CEO Daryl there are 98 people under him and he himself is the last 99th employee.

Another example you can find here which demonstrates the same thing (different Product's TreeList developed by another team):
<https://demos.telerik.com/aspnet-ajax/treelist/examples/columns/aggregates/defaultcs.aspx> 

Where although the Countries seem to be like children of Continents, in the context of records they are all intrepreted as Region Units. Therefore, the total aggregate calculation shows over 10 billion (total of all items) instead of 6.5 billion (total of just parent level).
