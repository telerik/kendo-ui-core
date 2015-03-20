---
title: Row template using dates
page_title: Row template using dates
description: Row template using dates
---

# Row template using dates

The following runnable sample demonstrates how to use dates inside a Kendo UI Grid row template.

#### Example
```html
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
                  url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
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