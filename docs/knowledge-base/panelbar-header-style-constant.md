---
title: Keep the PanelBar Header Style Constant
description: Set the CSS property of the Header in the Kendo UI PanelBar for all the states
type: how-to
page_title: Persistent Header Style | Kendo UI PanelBar
slug: panelbar-header-style-constant
position: 
tags: panelbar, header, style, state, hover, selected, focused, css, background
ticketid: 1445766
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>PanelBar for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I style the Header of the Kendo UI PanelBar such that its CSS property remains the same at all the states (focused, selected, hover)?

## Solution
In order to keep the CSS property of the Kendo UI PanelBar Header constant regardless of its state, use either of the two approaches:

### Approach 1

Set the CSS property of the following classes using a selector to add styling to a particular PanelBar:

```css
  #panelbar.k-panelbar>.k-item>.k-link, 
  #panelbar.k-panelbar>.k-item>.k-link .k-icon,
  #panelbar.k-panelbar>.k-item>.k-link:hover {
    background-color: blue;
    color: white;
    border-color: blue;
    box-shadow: none;
  }
```
#### Example
```dojo
<style>
  #panelbar.k-panelbar>.k-item>.k-link, 
  #panelbar.k-panelbar>.k-item>.k-link .k-icon,
  #panelbar.k-panelbar>.k-item>.k-link:hover {
    background-color: blue;
    color: white;
    border-color: blue;
    box-shadow: none;
  }
</style>

<div id="panelbar"></div> <br><br>
<div id="panelbar1"></div>

<script>
  $("#panelbar").kendoPanelBar({
    dataSource: [
      { text: "foo", items: [
        { text: "bar" },
        { text: "xyz" },
        { text: "abc" },
        { text: "pqr" }
      ] }
    ]
  });
  
  $("#panelbar1").kendoPanelBar({
    dataSource: [
      { text: "foo", items: [
        { text: "bar" },
        { text: "xyz" },
        { text: "abc" },
        { text: "pqr" }
      ] }
    ]
  });
</script>
```


**OR**

### Approach 2

Set the CSS property of the following classes using 'div' to add styling globally:

```css
  div.k-panelbar>.k-item>.k-link, 
  div.k-panelbar>.k-item>.k-link .k-icon,
  div.k-panelbar>.k-item>.k-link:hover {
    background-color: blue;
    color: white;
    border-color: blue;
    box-shadow: none;
  }
```
#### Example

``` dojo
<style>
  div.k-panelbar>.k-item>.k-link, 
  div.k-panelbar>.k-item>.k-link .k-icon,
  div.k-panelbar>.k-item>.k-link:hover {
    background-color: blue;
    color: white;
    border-color: blue;
    box-shadow: none;
  }
</style>

<div id="panelbar"></div> <br><br>
<div id="panelbar1"></div>

<script>
  $("#panelbar").kendoPanelBar({
    dataSource: [
      { text: "foo", items: [
        { text: "bar" },
        { text: "xyz" },
        { text: "abc" },
        { text: "pqr" }
      ] }
    ]
  });
  
  $("#panelbar1").kendoPanelBar({
    dataSource: [
      { text: "foo", items: [
        { text: "bar" },
        { text: "xyz" },
        { text: "abc" },
        { text: "pqr" }
      ] }
    ]
  });
</script>
```
