---
title: Use nested model properties
page_title: Use nested model properties
description: Use nested model properties
---

# Use nested model properties

The following runnable sample demonstrates how to use nested model properties. CRUD operations are not fully configured.

#### Example:

```html
    <div id="grid"></div>
    <script>
      function getData(length, delay) {
        var data = [];
        var sampleDate = new Date();
        for (var j = 1; j <= length; j++) {
          data[j - 1] = {
            id: j
          };
          data[j - 1].person = {
            fname: "First Name " + j, 
            lname: "Last Name " + j, 
            bdate: new Date(sampleDate.getTime() - j * 1000 * 60 * 60 * 24)
          }
        }
        return {
          json: JSON.stringify({
            data: data
          }),
          delay: delay
        };
      }

      $("#grid").kendoGrid({
        dataSource: {
          transport: {
            read: {
              url: "/echo/json/",
              type: "post",
              data: getData(10, 1)
            }
          },
          schema: {
            data: "data",
            model: {
              id: "id",
              fields: {
                id: {
                  type: "int"
                },
                fname: {
                  from: "person.fname"
                },
                lname: {
                  from: "person.lname"
                },
                bdate: {
                  type: "date",
                  from: "person.bdate"
                }
              }
            }
          }
        },
        sortable: true,
        editable: {
          mode: "inline"
        },
        columns: [{
          field: "id",
          title: "ID"
        }, {
          field: "fname",
          title: "First Name"
        }, {
          field: "lname",
          title: "Last Name"
        }, {
          field: "bdate",
          title: "Birth Date",
          format: "{0:yyyy-MM-dd}"
        }, {
          command: ["edit", "destroy"],
          title: "&nbsp;"
        }]
      });
    </script>
```