---
title: Refreshing Grid After Update/Create and Displaying Skipped Records in Popup
description: Learn how to refresh the Kendo UI for ASP.NET Core Grid after update/create operations and display skipped records in a popup.
type: how-to
page_title: Auto Refresh Grid and Show Skipped Records Popup in Kendo UI for ASP.NET Core Grid
meta_title: Auto Refresh Grid and Show Skipped Records Popup in Kendo UI for ASP.NET Core Grid
slug: auto-refresh-grid-show-skipped-records-popup-kendo-ui-aspnet-core
tags: grid, asp.net-core, datasource, refresh, popup, error, skipped-records
res_type: kb
ticketid: 1706850
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for ASP.NET Core Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

I want to refresh the [Kendo UI for ASP.NET Core Grid](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/data-management/grid/overview) after creating or updating records and display skipped records in a popup. Skipped records represent duplicates or entries that were not processed during the create operation.

This knowledge base article also answers the following questions:
- How to refresh the grid after adding or editing data?
- How to handle skipped records in Kendo UI for ASP.NET Core Grid?
- How to show a popup for skipped records after a grid update?

## Solution

### Refreshing the Grid After Update/Create

To refresh the grid after a data operation, bind the `change` event of the grid's DataSource and invoke the `read` method. Update the DataSource configuration to include the `change` event as shown below:

```csharp
.DataSource(ds => ds.Ajax()
    .Read(r => r.Url(Url.Page("OnCallAdmin", "Read")).Data("forgeryTokenRead"))
    .Update(u => u.Url(Url.Page("OnCallAdmin", "Update")).Data("forgeryToken"))
    .Destroy(r => r.Url(Url.Page("OnCallAdmin", "Delete")).Data("forgeryToken"))
    .Create(r => r.Url(Url.Page("OnCallAdmin", "Create")).Data("forgeryTokenCreate"))
    .Model(m => m.Id(id => id.ClinicianId))
    .Events(e => e.Change("change"))
)
```

Define the `change` JavaScript function:

```javascript
function change(e) {
    if (e.action === "sync") {
        var grid = $("#ScheduleDetailsGrid").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }
}
```

### Adding Error Handling

Add the `Error` event handler to the DataSource configuration for managing CRUD operation errors:

```csharp
.Events(e => {
    e.Change("change");
    e.Error("onError");
})
```

Define the `onError` JavaScript function for handling errors:

```javascript
function onError(e) {
    var message = "An error occurred.";
    if (e.errors) {
        message = "";
        $.each(e.errors, function(key, value) {
            if ('errors' in value) {
                $.each(value.errors, function() {
                    message += this + "\n";
                });
            }
        });
    }
    alert(message); // Replace alert with a Kendo Notification or Window for better UX.
}
```

### Displaying Skipped Records in a Popup

Modify the server-side `Create` action to include skipped records in the JSON response:

```csharp
var scheduleList = GetSchedules(details.SiteId, details.DepartmentId, details.StartDate, details.EndDate).ToList();
return new JsonResult(new {
    Data = scheduleList.ToDataSourceResult(request, ModelState),
    SkippedRecords = duplicates
});
```

Update the `change` event handler to display a popup with skipped records after a sync operation:

```javascript
function change(e) {
    if (e.action === "sync") {
        var grid = $("#ScheduleDetailsGrid").data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();

        // Check for skipped records in the response
        if (e.response && e.response.SkippedRecords && e.response.SkippedRecords.length > 0) {
            showSkippedRecordsPopup(e.response.SkippedRecords);
        }
    }
}

function showSkippedRecordsPopup(skippedRecords) {
    var message = "The following records were skipped:<br/>";
    skippedRecords.forEach(function(record) {
        message += "Date: " + kendo.toString(record.Date, "MM/dd/yyyy") +
                   ", Clinician: " + record.LastName + ", " + record.FirstName +
                   ", DayType: " + record.DayType + "<br/>";
    });
    $("<div />").kendoWindow({
        title: "Skipped Records",
        content: message,
        width: "400px",
        height: "200px",
        modal: true
    }).data("kendoWindow").center().open();
}
```

### Summary

- Use the [`change`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/change) event to refresh the grid after update or create operations.
- Add error handling using the `Error` event.
- Display skipped records in a popup by returning them in the server response and processing them in the `change` event.

## See Also

- [Grid Overview](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/data-management/grid/overview)
- [DataSource Change Event](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/events/change)
- [Kendo Window API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/window)