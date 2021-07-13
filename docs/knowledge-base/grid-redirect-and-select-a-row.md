---
title: Select a row from a Grid in another page
description: An example on how to redirect from a grid row to another page and select a row from a grid on the other page.
type: how-to
page_title: Select a row from a Grid in another page | Kendo UI Grid for jQuery
slug: grid-redirect-and-select-a-row
tags: grid, redirect, navigate, new, page, select, row
res_type: how-to
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Chrome</td>
 </tr>
 <tr>
 <td>Created with version</td>
  <td>2016.3.914</td>
 </tr>
</table>

 
## Description

How can I add a link in grid template that will redirect to another page in my application and select a row from another grid?

## Suggested Solution

To add a link to the grid, you can use the `rowTemplate` and pass the dataItem id as part of the url. Then, on the other page, use the grid `databound` event to parse the url parameters and the grid `select()` method. 

- The anchor element will create a URL with a dynamic query id parameter:

```
    <a href="https://runner.telerik.io/fullscreen/oDUzU?id=#:data.EmployeeID#"/>                
        <img src="../content/web/Employees/#:data.EmployeeID#.jpg" alt="#: data.EmployeeID #" />
    </a>
```

- On the other page, parse it and select the row

```
    dataBound: function() {
          var id = getUrlParameter('id');
          
          if(id && id > 0 && id < 10){
            var record = this.dataSource.get(id),
                uid = record.uid,
                row = this.tbody.find("tr[data-uid='" + uid + "']");
            this.select(row);
          }
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
          }
        }
    }
```

```dojo
    <h3>Redirect to a new page with a grid and select a row</h3>
    <p>Click on the Employee picture to see it selected on a different page</p>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                </tbody>
            </table>
            <script id="rowTemplate" type="text/x-kendo-tmpl">
	            <tr data-uid="#: uid #">
		            <td class="photo">
                <a href="https://runner.telerik.io/fullscreen/orayUwed?id=#:data.EmployeeID#"/>
                
                       <img src="https://demos.telerik.com/kendo-ui/content/web/Employees/#:data.EmployeeID#.jpg" alt="#: data.EmployeeID #" />
                       </a>
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
	           </tr>
            </script>
            <script id="altRowTemplate" type="text/x-kendo-tmpl">
	            <tr class="k-alt" data-uid="#: uid #">
		            <td class="photo">
                  <a href="https://runner.telerik.io/fullscreen/orayUwed?id=#:data.EmployeeID#"/>
                       <img src="https://demos.telerik.com/kendo-ui/content/web/Employees/#:data.EmployeeID#.jpg" alt="#: data.EmployeeID #" />
                       </a>
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
	           </tr>
            </script>
            <script>
               $(document).ready(function() {
                    $("#grid").kendoGrid({
                        dataSource: {
                          type: "odata",
                          transport: {
                              read: {
                                  url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
                              }
                          }
                        },
                        rowTemplate: kendo.template($("#rowTemplate").html()),
                        altRowTemplate: kendo.template($("#altRowTemplate").html()),
                        height: 550
                    });
               });
            </script>
            <style>
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
