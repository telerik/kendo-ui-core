---
title: Delete multiple rows in Grid with checkboxes
page_title: Delete multiple rows in Grid with checkboxes
description: Delete multiple rows in Grid with checkboxes
---

# Delete multiple rows in Grid with checkboxes

The following runnable sample demonstrates how to delete multiple rows selected with checkboxes

#### Example

```html
    <script src="http://demos.kendoui.com/content/shared/js/people.js"></script>
    <div id="example" class="k-content">
      <div id="grid"></div>

      <div id="details"></div>

      <script>

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

        });

        function whenYourDeleteButtonIsClicked(){
          var grid = $("#grid").data("kendoGrid");
          $("#grid").find("input:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
          })
        }
      </script>


    </div>

    <script>

    </script>
```
