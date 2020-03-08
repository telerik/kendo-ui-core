---
title: Use Nested Model Properties
page_title: Use Nested Model Properties | Kendo UI Grid for jQuery
description: "An example on how to use nested model properties in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/use-nested-model-properties, /controls/data-management/grid/how-to/binding/use-nested-model-properties
slug: howto_use_nested_model_properties_grid
tags: use, nested, model, properties, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I use nested model properties in the Kendo UI Grid for jQuery?

## Solution

When you use `from` together with CRUD operations and add new rows, you also have to define in `schema.model.fields` the original field or the sequence of nested fields which are used inside `from`.

The reason is that during updates and creates, the Kendo UI DataSource tries to construct a data item object which matches the original (server-side) data-item structure. For new data items, such a structure does not exist and needs to be defined explicitly, as demonstrated in the following example.

```
    myClientField1: { from: "myServerField1.foo" },
    myServerField1: { defaultValue: {} },

    myClientField2: { from: "myServerField2[0].bar" },
    myServerField2: { defaultValue: [{}] },

    myClientField3: { from: "myServerField3.myServerField4.baz" },
    myServerField3: { defaultValue: { myServerField4: {} } },
```

The following example demonstrates how to use nested model properties. The CRUD operations are not fully configured.

```dojo
    <div id="grid"></div>
    <script>
      function getData(length) {
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
        return data;
      }

      $("#grid").kendoGrid({
        dataSource: {
          data: getData(10),
          schema: {
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
                // A default value is needed for person to be defined to support additions
                person: { defaultValue: {} },
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
        toolbar: ["create"],
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
