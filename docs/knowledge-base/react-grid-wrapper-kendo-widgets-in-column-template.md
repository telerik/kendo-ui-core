---
title: Use Kendo UI Widgets in the Column Template of the Grid Wrapper for React
description: An example on how to use Kendo UI widgets in the column template of a kendo UI Grid wrapper for React.
type: how-to
page_title: Render kendo UI Widgets in the Grid Wrapper for React | Kendo UI Wrappers for React  
slug: react-grid-wrapper-kendo-widgets-in-column-template
tags: react, reactjs, grid, column template, widgets, controls, components, render, show
ticketid: 1149333
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Wrappers for React</td>
	</tr>
</table>


## Description

I am using the Kendo UI Grid React wrapper and have a button inside the Grid which uses a column template similar to the following:

```
<GridColumn width="60px" template='<button class="k-button submit"\>Skicka </button\>' /\>
<GridColumn template='<span style="color:red; font-weight: bold; font-size: 16px;" "<button class="k-button exclude" \>X</button\></span\>' width="20px" /\>  
```

How can I have a button group instead and implement it by using Kendo UI Wrappers for React?

## Solution

Currently, you can initialize the [column templates](https://www.telerik.com/kendo-react-ui-wrappers/components/grid/columns/) which use Kendo UI widgets with jQuery by utilizing `dataBound` event of the Grid.

```
<Grid dataSource={this.dataSource} dataBound={this.onDataBound}>
  <GridColumn template="<div class='toolbar'>"/>

class GridContainer extends React.Component {
 constructor(props) {
   super(props);
   this.onDataBound = function(){
      $(".btns").kendoButtonGroup({
        index : 1
      });
   }
}
```

For more information on how to implement the suggested approach, refer to [this example](https://plnkr.co/edit/S33zdG0uKVemHdNEL2wK?p=preview).
