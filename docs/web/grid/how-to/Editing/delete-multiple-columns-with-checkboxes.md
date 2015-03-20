---
title: Delete multiple columns in Grid with checkboxes
page_title: Delete multiple columns in Grid with checkboxes
description: Delete multiple columns in Grid with checkboxes
---

# Delete multiple columns in Grid with checkboxes

The following runnable sample demonstrates how to delete multiple columns selected with checkboxes

#### Example

```html
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
              {
                field : "Select",
                title : "Select",
                width : "16%",
                template: "<input type='checkbox' class='sel' />"},
              { command: { text: "Delete", click: whenYourDeleteButtonIsClicked }, title: " ", width: "140px" }]
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

        function whenYourDeleteButtonIsClicked(){
          console.log("here");
          debugger;
          var grid = $("#grid").data("kendoGrid");
          $("#grid").find("input:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
          })
        }

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

      <style type="text/css">
        #details-container
        {
          padding: 10px;
        }

        #details-container h2
        {
          margin: 0;
        }

        #details-container em
        {
          color: #8c8c8c;
        }

        #details-container dt
        {
          margin:0;
          display: inline;
        }
      </style>
    </div>

    <script>

    </script>
```