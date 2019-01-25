---
title: Use Dates inside Row Template
page_title:  jQuery Grid Documentation | Dates Inside a Row Template | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to use dates inside a row template."
slug: howto_use_dates_inside_row_template_grid
---

# Use Dates inside Row Template

The following example demonstrates how to use dates inside a Grid row template.

###### Example

```dojo
     <div id="example">
      <table id="grid">
        <colgroup>
          <col class="photo" />
          <col class="details"/>
          <col/>
        </colgroup>
        <thead>
          <tr>
            <th>
              Picture
            </th>
            <th>
              Details
            </th>
            <th>
              Country
            </th>
            <th>
              ID
            </th>
            <th>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
      <script id="rowTemplate" type="text/x-kendo-tmpl">
	            <tr data-uid="#: uid #">
		            <td class="photo">
                       <img src="../content/web/Employees/#:data.EmployeeID#.jpg" alt="#: data.EmployeeID #" />
        </td>
		            <td class="details">
			           <span class="name">#: FirstName# #: LastName# </span>
			           <span class="title">Title: #: Title #</span>
        </td>
                    <td class="country">
			            #: Country #
        </td>
		            <td class="employeeID">
		               #: EmployeeID #
        </td>
		            <td class="birthDate">
		               #: kendo.toString(kendo.parseDate(BirthDate), "MM/dd/yyyy") #
        </td>
        </tr>
      </script>
      <script id="altRowTemplate" type="text/x-kendo-tmpl">
	            <tr class="k-alt" data-uid="#: uid #">
		            <td class="photo">
                       <img src="../content/web/Employees/#:data.EmployeeID#.jpg" alt="#: data.EmployeeID #" />
        </td>
		            <td class="details">
			           <span class="name">#: FirstName# #: LastName# </span>
			           <span class="title">Title: #: Title #</span>
        </td>
		            <td class="country">
			            #: Country #
        </td>
                <td class="employeeID">
		               #: EmployeeID #
        </td>
		            <td class="birthDate">
		               #: kendo.toString(kendo.parseDate(BirthDate), "MM/dd/yyyy") #
        </td>
        </tr>
      </script>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
                }
              }
            },
            rowTemplate: kendo.template($("#rowTemplate").html()),
            altRowTemplate: kendo.template($("#altRowTemplate").html()),
            height: 550
          });
        });
      </script>
      <style scoped>
        .photo {
          width: 140px;
        }
        .details {
          width: 400px;
        }
        .name {
          display: block;
          font-size: 1.6em;
        }
        .title {
          display: block;
          padding-top: 1.6em;
        }
        .employeeID,
        .country {
          font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          font-size: 50px;
          font-weight: bold;
          color: #898989;
        }
        td.photo, .employeeID {
          text-align: center;
        }
        .k-grid-header .k-header {
          padding: 10px 20px;
        }
        .k-grid td {
          background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
          background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
          background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
          background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
          background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
          padding: 20px;
        }
        .k-grid .k-alt td {
          background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
          background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
          background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
          background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
          background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
        }
      </style>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Create Custom Editor in Detail Template]({% slug howto_create_custom_editorin_detail_template_grid %})
* [How to Refresh Grid in Detail Template]({% slug howto_refresh_gridin_detail_template_grid %})
* [How to Use Checkbox Column Templates and Edit]({% slug howto_use_checkbox_column_templateand_edit_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
