---
title: Export Agenda View with Paging in PDF
page_title: Export Agenda View with Paging in PDF | Kendo UI Scheduler
description: "Learn how to export the agenda view to a paged PDF."
slug: howto_implement_pdf_export_inagenda_view_scheduler
---

# Export Agenda View with Paging in PDF

The example below demonstrates how to export the Kendo UI Scheduler `agenda` view to a paged PDF using the [drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#configuration-Automatic).

###### Example

```html
    <script src="//kendo.cdn.telerik.com/2016.2.504/js/jszip.min.js"></script>
    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="//kendo.cdn.telerik.com/2016.2.504/js/pako_deflate.min.js"></script>
    <div id="example">
      <button id="export" class="k-button">Export to PDF</button>
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          views: [
            "agenda"
          ],
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: function (e) {
                e.success(data);
              }
            }
          },
          resources: [
            {
              field: "ownerId",
              title: "Owner",
              dataSource: [
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
              ]
            }
          ]
        });

        $("#export").on("click", function() {
          drawing = kendo.drawing;

          //workaround PDF export rowspan limitation
          $(".k-scheduler-content table [rowspan]").each(function() {
            var currentCell = $(this);
            var rowSpan = parseInt(currentCell.attr("rowspan"));
            var currentRow = currentCell.closest("tr");

            var nextRow = null;
            for (var i = 0; i < rowSpan - 1; i++) {
              nextRow = nextRow ? nextRow.next() : currentRow.next();
              nextRow.prepend($("<td class='inserted'></td>"));
            }

            currentCell.attr("rowspan", 0);
          })

          drawing.drawDOM("#scheduler .k-scheduler-content", {
            paperSize: "A4",
            margin: "2cm",
            scale: 0.6
          }).then(function(group){
            drawing.pdf.saveAs(group, "scheduler_agenda.pdf");
            var scheduler = $("#scheduler").getKendoScheduler();
            scheduler.view(scheduler.view().name);
          });
        })
      });
    </script>

    <style>
      /*workaround PDF export rowspan limitation*/
      .inserted {
        border-color: #ffffff !important;
      }

      /*
      Use the DejaVu Sans font for display and embedding in the PDF file.
      The standard PDF fonts have no support for Unicode characters.
      */
      .k-widget {
        font-family: "DejaVu Sans", "Arial", sans-serif;
        font-size: .9em;
      }
    </style>

    <script>
      // Import DejaVu Sans font for embedding

      // NOTE: Only required if the Kendo UI stylesheets are loaded
      // from a different origin, e.g. cdn.kendostatic.com
      kendo.pdf.defineFont({
        "DejaVu Sans"             : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf",
        "DejaVu Sans|Bold"        : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic" : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic"      : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
      });
    </script>

    <script>
      /* ======================== TEST DATA =======================================*/
      var data = [{
        "taskId": 9,
        "title": "Alex's Birthday",
        "start": "2013-06-13T23:00:00.000Z",
        "end": "2013-06-13T23:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": null,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 2,
        "isAllDay": true,
        "uid": "a3c6b90b-a8a6-4d27-aa81-4bf91657d012"
      }, {
        "taskId": 0,
        "title": "HR Lecture",
        "start": "2013-06-13T16:00:00.000Z",
        "end": "2013-06-13T18:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": 25,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 1,
        "isAllDay": false,
        "uid": "716d315e-2062-43e9-8e80-27efe6124c77"
      }, {
        "taskId": 0,
        "title": "HR Lecture",
        "start": "2013-06-18T16:00:00.000Z",
        "end": "2013-06-18T18:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": 25,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 1,
        "isAllDay": false,
        "uid": "d815d34d-8724-4db8-952d-43dd2e94f910"
      }, {
        "taskId": 0,
        "title": "HR Lecture",
        "start": "2013-06-20T16:00:00.000Z",
        "end": "2013-06-20T18:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": 25,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 1,
        "isAllDay": false,
        "uid": "ba318647-e26c-490a-ba31-0f26a7e6bc6f"
      }, {
        "taskId": 0,
        "title": "Dance Practice",
        "start": "2013-06-17T15:30:00.000Z",
        "end": "2013-06-17T17:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": 95,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 2,
        "isAllDay": false,
        "uid": "24927b5a-1eef-41a5-ac52-db69fd701640"
      }, {
        "taskId": 0,
        "title": "Dance Practice",
        "start": "2013-06-19T15:30:00.000Z",
        "end": "2013-06-19T17:00:00.000Z",
        "startTimezone": null,
        "endTimezone": null,
        "description": "",
        "recurrenceId": 95,
        "recurrenceRule": null,
        "recurrenceException": null,
        "ownerId": 2,
        "isAllDay": false,
        "uid": "497ac8f8-898f-436a-91cf-20f26562022e"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-13T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 121,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "4aa406e0-2751-4616-b4e4-36e180af91ec"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-14T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "c4f28542-22f6-401f-9f20-2a5ae24f9609"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-15T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "f89c34b4-3043-4f64-9a3e-cb36b62055b6"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-16T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "a5ae4877-ce25-4008-986a-d65617d014bc"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-17T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "896135b2-64b4-4ce7-89b1-062b834e1737"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-18T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "eccbde7e-6418-45ab-913f-324d503d571f"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-19T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "edd7dc3c-0f24-4a9f-9e19-1178d2886c96"
      }, {
        "title": "Some Task 1",
        "start": "2013-06-20T06:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T06:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "Some Task 1",
        "taskId": 0,
        "recurrenceId": 121,
        "ownerId": 1,
        "uid": "b6bb1848-fc6f-4775-9abd-545971b15aee"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-13T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 122,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "390817b6-cf76-424c-999c-6c1be633a316"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-14T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "1b1aa98c-6be5-4ac2-a0b0-445c46922c60"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-15T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "0d8cf049-337d-438d-b9c6-890d0c237ee4"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-16T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "a37ad9bc-141d-4bd2-8f66-d83a2ed1f59c"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-17T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "09e9226d-2452-4951-aa3f-697f0cde0298"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-18T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "d1a3bc7a-6e02-49bb-a93b-31d8aaff3bed"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-19T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "59501b3d-6ca2-474a-8302-c6a40f84fc98"
      }, {
        "title": "Some Task 2",
        "start": "2013-06-20T06:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T07:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 122,
        "ownerId": 1,
        "uid": "f58c76be-caf6-41b5-b78b-6cba7f65a99d"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-13T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 123,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "1983b5fc-ee5f-42bb-beb0-38fb3b2fc4b0"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-14T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "58143039-da6e-4ee8-8fa0-15c784bc06b8"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-15T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "452e62b5-fd8c-442f-9779-9d51cec145bb"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-16T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "ba104864-e9a2-4c21-a071-3e2749b4d3c8"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-17T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "9e68d48e-f9cf-4cd7-a408-47833a355448"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-18T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "6f05ccc9-22f4-4278-8de5-00af561832e0"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-19T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "34567da9-0519-42e6-8c65-e20812138c61"
      }, {
        "title": "Some Task 3",
        "start": "2013-06-20T07:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T07:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 123,
        "ownerId": 1,
        "uid": "6b41f36d-a444-4738-aeba-3785b9f21caf"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-13T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 124,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "0e3eb581-ef3c-4006-aa15-11097ecc07dd"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-14T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "625dc217-3143-4ef7-ab71-5d0cde41af7f"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-15T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "ebe31f0c-188f-400f-ad26-bbdcda426431"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-16T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "501b9206-2799-448e-9b6e-24b059f1ef54"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-17T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "308bca47-351e-40ef-8a61-8c5510d7e09d"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-18T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "e967db17-2785-4453-96b3-a40e0ae00172"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-19T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "0c159045-ceed-4e3f-b268-89bcae140bef"
      }, {
        "title": "Some Task 4",
        "start": "2013-06-20T07:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T08:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 124,
        "ownerId": 1,
        "uid": "a2470509-5401-4f3a-be2d-2ae730062781"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-13T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 125,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "b101e856-b261-449c-a0df-f2c620adb2a9"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-14T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "c8fbd271-c72e-4b99-935b-2fb059614c32"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-15T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "3c927a30-9eea-4d5a-be6b-25a07a51ef34"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-16T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "11ea63fa-69dc-4823-a7a7-88b95d1ac39d"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-17T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "dcddd56a-ac54-4946-9142-45fa109f5ef0"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-18T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "3872ab5d-745e-4731-bbd0-f07b145e6530"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-19T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "ebdc5f61-9cbe-4056-aa56-a004f6af0b3f"
      }, {
        "title": "Some Task 5",
        "start": "2013-06-20T08:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T08:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 125,
        "ownerId": 1,
        "uid": "b72cc391-b5dc-499a-9ac3-729d1f94e839"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-13T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 126,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "38af9a7b-43d5-4dd7-bc57-e8d4f65754ff"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-14T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "cc310a66-aa13-4807-804a-6bee305dd4f0"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-15T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "bfc6e2a4-6731-41fd-92a5-c736b22e9029"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-16T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "c8e72683-779c-4088-9c13-27eeb562b3e4"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-17T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "58ed467c-267f-47da-a616-e2b666c168ca"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-18T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "b59db8a2-9c9b-4623-a956-82e41accf961"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-19T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "9f708ae4-d6c6-46f8-ad8c-db929404e189"
      }, {
        "title": "Some Task 6",
        "start": "2013-06-20T08:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T09:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 126,
        "ownerId": 1,
        "uid": "bd068575-6f08-47a5-9129-87de672cbbf6"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-13T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 127,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "de8c7106-d1e5-48ab-af1a-5fb54df40446"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-14T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "fed81675-40a1-4883-86db-951bea24a480"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-15T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "81d861d9-9abe-42be-a5a1-df24a60f2f8d"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-16T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "0a4ff475-b91d-4f21-b31b-d4297fac83b8"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-17T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "37c49c84-6077-49cf-85fc-4aab2fefc958"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-18T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "db5416f2-85b8-456d-889f-5307824c0c06"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-19T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "4c5464a9-f13d-4d69-8b2e-80f7c28c8871"
      }, {
        "title": "Some Task 7",
        "start": "2013-06-20T09:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T09:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 127,
        "ownerId": 1,
        "uid": "c9378987-ce79-46c2-94f4-c8304e0d7290"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-13T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 128,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "df7f67e7-501d-49c9-a95c-e79cae89da75"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-14T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "1113b920-4048-4449-8896-23998e205b39"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-15T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "d1f2ed55-99f2-45bd-86c4-90f2cf7a3758"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-16T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "85c0e6e9-59f9-48cb-a210-db1c3ef64613"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-17T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "453e24af-284d-432e-82ed-c250daf3fc2e"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-18T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "08dceba5-0b04-42d5-b3c8-361f2b5af5ae"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-19T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "f577a9d2-60f7-4cc9-b1b0-b98638231f2b"
      }, {
        "title": "Some Task 8",
        "start": "2013-06-20T09:30:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T10:00:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 128,
        "ownerId": 1,
        "uid": "e8711855-e3c3-464e-8e0e-74f55df663e6"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-13T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-13T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": "FREQ=DAILY",
        "recurrenceException": "",
        "isAllDay": false,
        "description": "",
        "taskId": 129,
        "recurrenceId": null,
        "ownerId": 1,
        "uid": "3ba69264-00d6-4a36-bd82-a308063eef4c"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-14T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-14T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "c74f196c-5a35-4ad3-96df-a78a57d78ddb"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-15T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-15T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "762e6129-b6ba-4edb-bba6-beb0e1013fe8"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-16T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-16T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "22bcc9ae-fffb-4e5b-89e4-ebec7c194140"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-17T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-17T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "ed36b4f7-ef1c-476e-9f11-67f50c9cefdb"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-18T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-18T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "9e390b7d-4c9c-4d9f-a360-9c2ab509fec4"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-19T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-19T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "f75b9211-bbec-4edd-bc17-3c478aab90ec"
      }, {
        "title": "Some Task 9",
        "start": "2013-06-20T10:00:00.000Z",
        "startTimezone": "",
        "end": "2013-06-20T10:30:00.000Z",
        "endTimezone": "",
        "recurrenceRule": null,
        "recurrenceException": null,
        "isAllDay": false,
        "description": "",
        "taskId": 0,
        "recurrenceId": 129,
        "ownerId": 1,
        "uid": "15c09cdb-f38d-41a1-ac54-7c2a8ea9d966"
      }];
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Create Custom month View with Event Count in Show More Button]({% slug howto_create_custom_monthview_eventcount_showmore_button_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
