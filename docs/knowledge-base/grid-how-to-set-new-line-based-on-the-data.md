---
title: How to Set a New Line in the Column From Data
description: An example on How to Set New Line Based On the Data
type: how-to
page_title: How to Set a New Line Based On the Data
slug: grid-how-to-set-new-line-based-on-the-data
tags: grid,
ticketid: 1138306
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

I would like to set the '/ n' in the response string and display it in the column without using the template.
What should I write in ajax's response?
'/n' doesn't work!

## Solution

If the desired result is to show the text on two lines without using the [column.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template) I can suggest using the "**br**" tag.  
  
This can be achieved by sending the tag as part of the response and setting the [encoding](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.encoded) to false:  
  
Please check the following example demonstrating this:

````html
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
  
