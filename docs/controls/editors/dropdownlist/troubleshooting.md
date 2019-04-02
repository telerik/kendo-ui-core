---
title: Troubleshooting
page_title: jQuery DropDownList Documentation | Troubleshooting | Kendo UI
description: "Learn how to handle possible issues while working with the Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/troubleshoot/troubleshooting
slug: troubleshooting_common_issues_dropdownlist_kendoui
position: 60
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Kendo UI DropDownList widget.

## Data Source

* [The selected item is lost when bound to a shared data source](#the-selected-item-is-lost-when-bound-to-shared-datasource)
* [Repetitive requests are performed while filtering in ASP.NET](#repetitive-requests-are-performed-while-filtering-in-aspnet)

### The selected item is lost when bound to a shared data source

**Cause** This is expected behavior. The selected item of the widget is directly related to the data source view and if it does not contain the selected item, then the widget removes its current value.

**Solution** Use separate data sources.

The following example demonstrates a sample issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });

    $("#ms1").kendoDropDownList({
        dataSource: ds
    });

    $("#ms2").kendoDropDownList({
        dataSource: ds
    });

The following example demonstrates the solution to the sample issue.

###### Example

    var ds = new kendo.data.DataSource({ data: ["foo", "bar"] });
    ds.read();

    $("#ms1").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

    $("#ms2").kendoDropDownList({
        dataSource: new kendo.data.DataSource({ data: ds.data() });
    });

### Repetitive requests are performed while filtering in ASP.NET

**Cause** Repetitive requests that are performed by the Kendo UI DropDownList widget are caused by the response from the ASP.NET Web API Order controller.

**Solution** The `total` configuration has to respond to the total number of records that are found after filtering, that is, `dataResult.Count`. Otherwise, the widget continues to request the remainder of the `total`.

The following example demonstrates how to change the service accordingly.

###### Example

```
   public object Get(int? take = null, int? skip = null, string q = null)
    {
    	List<OrderModel> dataResult = string.IsNullOrEmpty(q) ? Orders.Skip(skip ?? 0).Take(take ?? int.MaxValue).ToList() : Orders.Where(m => m.Name.Contains(q)).ToList();
    	return new
    	{
    		total = dataResult.Count,
    		data = dataResult
    	};
    }
```

## Cascading DropDownLists

* [How can I preset the selected items when I use cascading DropDownLists with autoBind: true?](#how-can-i-preset-the-selected-items-when-i-use-cascading-dropdownlists-with-autobind-true)
* [How can I preset the selected items when I use cascading DropDownLists with load on demand?](#how-can-i-preset-the-selected-items-when-i-use-cascading-dropdownlists-with-load-on-demand)
* [Why server filtering is disabled and the child DropDownList does not work?](#why-server-filtering-is-disabled-and-the-child-dropdownlist-does-not-work)
* [What to do when I cannot get the request parameters on the server?](#what-to-do-when-i-cannot-get-the-request-parameters-on-the-server)

### How can I preset the selected items when I use cascading DropDownLists with autoBind: true?

Set the value of the DropDownLists&mdash;define it before initialization as demonstrated in the following example. You can also use the [`value`](/api/javascript/ui/combobox#configuration) option.

###### Example

    <input id="parent" value="1" />
    <input id="child" value="36" />

    <script>
       $("#parent").kendoComboBox();

       $("#child").kendoComboBox({
                cascadeFrom: "parent"
       });
    </script>

### How can I preset the selected items when I use cascading DropDownLists with load on demand?

Set the [`value`](/api/javascript/ui/combobox#configuration) and [`text`](/api/javascript/ui/combobox#configuration) options.

###### Example

    <input id="parent" value="1" />
    <input id="child" value="36" />

    <script>
       $(function() {
            $("#parent").kendoComboBox({
               value: "1",
               text: "Parent1",
               dataTextField: "parentName",
               dataValueField: "parentID",
               dataSource: {
                  // The dataSource settings.
               },
               autoBind: false
            });

            $("#child").kendoComboBox({
               cascadeFrom: "parent",
               value: "36",
               text: "Child36",
               dataTextField: "childName",
               dataValueField: "childID",
               dataSource: {
                  // The dataSource settings.
               },
               autoBind: false
            });
       });
    </script>

### Why server filtering is disabled and the child DropDownList does not work?

When [server filtering](/api/framework/datasource#configuration) is disabled, the DropDownList does not make any additional requests to the server. As a result, it filters the initial data by using the `dataValueField` property of the parent. If it does not find any items, the child DropDownList remains empty. To use a child DropDownList with disabled server filtering, provide all the necessary data on the client.

### What to do when I cannot get the request parameters on the server?

Check the format of the request parameters as displayed in the section on [enabling the cascading functionality](#initialize-cascading). To get them correctly, modify your server code. Alternatively, manually pass the `ID` of the parent DropDownList by using the data callback of the `Transport.Read` DataSource object as demonstrated in the following example.

###### Example

    <input id="child" />

    <script>
      $("#child").kendoComboBox({
        cascadeFrom: "parent",
        dataTextField: "childName",
        dataValueField: "childID",
        dataSource: {
          transport: {
            read: {
              url: "",
              data: function() {
                return { parentID: $("#parent").val() };
              }
            }
          }
        }
      });
    </script>


## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
