---
title: FontAwesome icons in custom command buttons
page_title: FontAwesome icons in custom command buttons
description: FontAwesome icons in custom command buttons
---

# FontAwesome icons in custom command buttons

The following runnable sample demonstrates how to use FontAwesome icons inside a Kendo UI Grid custom command button.

#### Example

```html
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <script src="http://demos.kendoui.com/content/shared/js/people.js"></script>

    <div id="example" class="k-content">
        <div id="grid"></div>
        <div id="details"></div>
    <script>
        var wnd,
            detailsTemplate;

        $(document).ready(function () {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              pageSize: 20,
              data: createRandomData(50)
            },
            pageable: true,
            height: 430,
            columns: [
              { field: "FirstName", title: "First Name", width: "140px" },
              { field: "LastName", title: "Last Name", width: "140px" },
              { field: "Title" },
              { command: { 
                text: " View Details", 
                click: showDetails,
                className: "fa fa-map-marker"
              }, 
               title: " ", 
               width: "140px" 
              }]
          }).data("kendoGrid");

          wnd = $("#details")
          .kendoWindow({
            title: "Customer Details",
            modal: true,
            visible: false,
            resizable: false,
            width: 300
          }).data("kendoWindow");

          detailsTemplate = kendo.template($("#template").html());
        });

        function showDetails(e) {
          e.preventDefault();

          var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
          wnd.content(detailsTemplate(dataItem));
          wnd.center().open();
        }
      </script>
      <script type="text/x-kendo-template" id="template">
            <div id="details-container">
                <h2>#= FirstName # #= LastName #</h2>
                <em>#= Title #</em>
                <dl>
                    <dt>City: #= City #</dt>
                    <dt>Birth Date: #= kendo.toString(BirthDate, "MM/dd/yyyy") #</dt>
                </dl>
            </div>
      </script>
```