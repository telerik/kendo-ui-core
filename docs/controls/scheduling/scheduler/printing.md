---
title: Printing
page_title: jQuery Scheduler Documentation | Printing
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to print its visible content."
slug: printing_kendoui_scheduler
position: 6
---

# Printing

When you print the Scheduler, its content has to be unscrollable.

The following example demonstrates how to ensure that the widget expands and displays all events in the current view during printing. The code from the example works in Internet Explorer and Google Chrome.

	@media print {
	   .k-scheduler,
	   .k-scheduler-content,
	   .k-scheduler-times
	   {
		  height: auto !important;
	   }

	   .k-scheduler-content
	   {
		  overflow-y: scroll !important;
	   }
	}

The following example demonstrates how to trigger the same behavior in Firefox as it ignores the `overflow-y` style. `17px` is a hard-coded value, which has to match the scrollbar width. It can be calculated and set with JavaScript before printing if desired.

    @media print {
        /* The same rules as above. */

        .k-ff .k-scheduler-content
        {
            margin-right: 17px !important;
        }
    }

<!--*-->
In addition, the Scheduler needs a fixed pixel width for itself or some of its ancestors. Otherwise, it may resize during printing which will cause the displayed absolutely positioned events to become misaligned. If the widget is part of a fluid layout, a fixed width can be set only for the printing task and then removed.

> Due to a bug in Internet Explorer which is related to absolutely positioned elements inside tables, the Scheduler events will be printed over their correct time slots only if the widget fits in one page.

    <button id="printPage" type="button">Print</button>

    <div id="scheduler"></div>

    <script>

        $("#printPage").click(function(e){
            var schedulerElement = $("#scheduler")
            schedulerElement.width(900);
            // Readjust the positions of the events.
            schedulerElement.data("kendoScheduler").resize();
            window.print();
            // Restore the previous layout of the Scheduler.
            schedulerElement.width("");
            schedulerElement.data("kendoScheduler").resize();
        });

        $("#scheduler").kendoScheduler({
            // ...
        });

    </script>

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
