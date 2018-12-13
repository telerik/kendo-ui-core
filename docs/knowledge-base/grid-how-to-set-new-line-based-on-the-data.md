---
title: Set New Lines in Grid Column From Data
description: An example on how to set a new line based on the data of a Kendo UI Grid.
type: how-to
page_title: How to Set a New Line Based On the Data
slug: grid-how-to-set-new-line-based-on-the-data
tags: grid
ticketid: 1138306
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

How can I set the `/ n` in the response string and display it in the Grid column without using the template? What do I have to write in the AJAX response?

## Solution

To display the text on two lines without implementing the [`column.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template), use the `br` tag.

1. Send the tag as part of the response.
1. Set [`encoding`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.encoded) to `false`.

````dojo
<div id="grid"></div>
<script>
$("#grid").kendoGrid({
  columns: [
    { field: "name", encoded: false }
  ],
  dataSource: [ { name: "Jane Doe </br> test" } ]
});
</script>
````
