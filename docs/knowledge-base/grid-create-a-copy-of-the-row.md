---
title: Create Duplicate Row
description: An example on how to create a copy of the Grid row
type: how-to
page_title: Create a Copy of the Row | Kendo UI Grid
slug: grid-create-a-copy-of-the-row
position: 
tags: grid, copy, row
ticketid: 1145126
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® NumericTextBox for ASP.NET MVC</td>
	</tr>
</table>


## Description
I want to make a copy of the row on a button click.

## Solution
Hello, Ram,  
  
Thank you for the clarification.  
  
This is how the clone method of jQuery is working and the Kendo UI team has no control over if the events will be copied when the method is used.  
  
We can suggest using the built-in methods of the Grid to programmatically add a new row and set its model values based on the clicked row. The specific in this scenario is that the new row will be added at the top.  
  
I made an example demonstrating this:  
  
[http://dojo.telerik.com/Oveja](http://dojo.telerik.com/Oveja)  
  
[https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow)  
  
[https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell)  
  
[https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.click](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.click)  
  
I hope this is helpful.  
  
Regards,  
Stefan   
Progress Telerik

[Try our brand new, jQuery-free Angular components](http://www.telerik.com/kendo-angular-ui/?utm_medium=ticketsignature&utm_source=supportticket&utm_campaign=dt-kendo-angular2-beta&utm_content=mvc) built from ground-up which deliver the business app essential building blocks - a grid component, data visualization (charts) and form elements.
