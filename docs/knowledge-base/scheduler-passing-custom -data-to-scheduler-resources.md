---
title: Pass custom data to Scheduler Resources to be consumed in HeaderTemplate
description: An example on how to pass custom data to Scheduler Resources to be consumed in HeaderTemplate
type: how-to
page_title: Passing custom Scheduler resources fields to groupHeaderTemplate
slug: scheduler-passing-custom-data-to-scheduler-resources
position: 0
tags: kendo, kendo-ui, scheduler, groupheadertemplate, datasource, resources
ticketid: 1428228
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2018.2.620</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Scheduler for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
By default, the resource object includes a specific set of fields (title, value, color, etc.). My resources dataSource returns those fields, but also includes other customer fields (a, b, x, y, z for example). Is there a way to use these values in the groupHeaderTemplate? 

## Solution
* Crate a [`groupHeaderTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/group#groupheadertemplate) with the additional custom fields:

```
<script id="groupHeaderTemplate" type="text/x-kendo-template">
    <div class="container">
        <label>#=text#</label>
        <div id="customField-timezone-#=value#">a</div>
        <div id="customField-message-#=value#">b</div>
        <div id="customField-status-#=value#">x</div>
    </div>
</script>
``` 

* Initialize a Kendo Scheduler and when specifying the  groupHeaderTemplate pass a custom function that would iterate the widget's dataSource, pass the custom values to the template and return the template:
```
<div id="scheduler"></div>
<script>
    $("#scheduler").kendoScheduler({
        ...
        groupHeaderTemplate: function (item) {
            var scheduler = $("#scheduler").data("kendoScheduler");
            var resourceData = scheduler.resources[0].dataSource.data();
            for (var i = 0; i < resourceData.length; i++) {
                if (resourceData[i].value == item.value) {
                    item.timezoneOffset = resourceData[i].timezoneOffset > 0 ? "+" + resourceData[i].timezoneOffset : resourceData[i].timezoneOffset;
                    item.message = resourceData[i].message;
                    item.status = resourceData[i].status;
                    break;
                }
            }

            var template = kendo.template($("#groupHeaderTemplate").html());
            return template(item);
        }
        ...
    })
</script>
``` 

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
