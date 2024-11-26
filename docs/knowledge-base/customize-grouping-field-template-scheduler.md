---
title: Adding Custom HTML to Grouping Field Template in Scheduler
description: Learn how to customize the Scheduler's grouping column with custom HTML, such as adding buttons or links, using the groupHeaderTemplate configuration.
type: how-to
page_title: How to Customize Grouping Field Template in Scheduler with Custom HTML
slug: customize-grouping-field-template-scheduler
tags: kendo-ui, scheduler, groupheadertemplate, custom-html, customization
res_type: kb
ticketid: 1671258
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Scheduler for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I want to modify the grouping column in the Scheduler with custom HTML, such as adding a button or a link with the ID of the group.

This KB article also answers the following questions:
- How can I add a custom button to the Scheduler's group header?
- Is it possible to insert custom HTML into the Scheduler's grouping template?
- Can I customize the appearance of the Scheduler's group headers with HTML?

## Solution

To customize the grouping column in the Scheduler with custom HTML, such as adding buttons or links, utilize the [groupHeaderTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/group#groupheadertemplate) configuration option. This option allows the insertion of custom HTML content into the group header cells based on specific conditions or for specific resources.

Below is an example demonstrating how to add a custom button to the group header cell for a specific resource using the `groupHeaderTemplate` configuration:

```html
<script id="groupHeaderTemplate" type="text/x-kendo-template">
  # if(data.field === "roomId") { #
  <div style="color: #=color#">#=text#</div>
  <button>Custom Button</button>
 #  } else { #
 <div style="color: #=color#">#=text#</div>
 # } #
</script>
```

In this example, a custom button is added to the group header cell when the grouping is done based on the `roomId` field. You can modify the condition and content as needed to suit your particular requirements.

For a practical implementation of this solution, refer to this [example](https://dojo.telerik.com/MsoTFBhM/3).

## See Also

- [Scheduler Group Header Template Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/group#groupheadertemplate)
- [Scheduler Overview](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview)
- [Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview)
