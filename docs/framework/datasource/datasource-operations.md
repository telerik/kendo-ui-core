---
title: DataSource Operations
page_title: DataSource Operations | Kendo UI Data Source
description: "Learn how to filter, sort, and group your data items when working with the Kendo UI for jQuery DataSource component and your JavaScript widgets."
previous_url: /framework/datasource/basic-usage
slug: datasourceoperations_kendoui_datasourcecomponent
position: 4
---

# DataSource Operations

The DataSource component supports a number of operations for handling your data items, such as sorting, filtering, and grouping both locally on the client and remotely on the server, and also enables you to utilize its accent-folding filtering.

## Local Sorting

You can sort the data in the Kendo UI DataSource component by enabling its [`sort`](/api/javascript/data/datasource/configuration/sort) configuration option. First, set a field by which the items will be sorted and, then, an ascending or descending sorting direction. 

The example below demonstrates how to sort the items in the DataSource on the client. 

```dojo
  <div id="container"></div>
    <body>
    <script>
      var persons = [
        { name: "Lauren James", age: 35},
        { name: "Robert Lawrence", age: 34},
        { name: "Nicholas Bachmann", age: 46},
        { name: "Janette Daniels", age: 25},
        { name: "Jane Arnolds", age: 55},
        { name: "Alexander Martins", age: 23},
        { name: "Kevin Jhonson", age: 42}

      ];
      var personsDataSource = new kendo.data.DataSource({
        data: persons,
        sort: { field: "name", dir: "asc" }
      });

      personsDataSource.read()
      var currentItems = personsDataSource.view()

      currentItems.forEach(function(el){
        $('#container').append(`<p><b>Name: </b>${el.name} --> <b>Age: ${el.age}</b></p> `)
      });
  </script>
```

## Server Sorting

To perform sorting on the server, enable the [`serverSorting`](/api/javascript/data/datasource/configuration/serversorting) option of the DataSource. When `serverSorting` is enabled, information about the sorting field and direction is sent to the server. 

The following example demonstrates how to configure `serverSorting`.

```dojo
    <div id="container"></div>

    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",           
        serverSorting: true,
        sort: { field: "ProductName", dir: "asc" },           
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        },
      });    

      dataSource.fetch(function() {
        var currentView = dataSource.view();
        currentView.forEach(function(el){
          $('#container').append(`<p><b>Name: </b>${el.ProductName} `)
        });    
      });
    </script>
```

## Local Filtering

Filtering local data is a trivial task when you are using the DataSource. The component accepts a list of one or more filter expressions, which can be combined by using the `and` or `or` logical operators. 

Note that local filtering is convenient for small datasets and you need to avoid it when working with large numbers of data because it might lead to performance issues.

For more details about the filter expression structure, refer to the documentation on the [`filter`](/api/javascript/data/datasource/configuration/filter) configuration option. 

```dojo
    <div id="container"></div>
    <body>
    <script>
      var persons = [
        { name: "Lauren James", age: 35},
        { name: "Robert Lawrence", age: 34},
        { name: "Nicholas Bachmann", age: 46},
        { name: "Janette Daniels", age: 25},
        { name: "Jane Arnolds", age: 55},
        { name: "Alexander Martins", age: 23},
        { name: "Kevin Jhonson", age: 42}

      ];
      var personsDataSource = new kendo.data.DataSource({
        data: persons,
        filter: {
          logic: 'and',
          filters: [
            { field: 'name', operator: 'contains', value: 'ja' },
            { field: 'age', operator: 'gte', value: 30 }
          ]
        }
      });

      personsDataSource.read()
      var currentItems = personsDataSource.view()

      currentItems.forEach(function(el){
        $('#container').append(`<p><b>Name: </b>${el.name} --> <b>Age: ${el.age}</b></p> `)
      });
    </script>
```

## Server Filtering

Server filtering is convenient for large datasets. Make sure that you set the [`schema`](/api/javascript/data/datasource/configuration/schema) and the [`filter`](/api/javascript/data/datasource/configuration/filter) properties as necessary.

The following example features local data but the data returned by the [`transport`](/api/javascript/data/datasource/configuration/transport) will be evaluated in the same way.

```
        // The JSON result from "{remote service}"
        {
            result: [
                { 'w': 'done', 'length': 4 },
                { 'w': 'node', 'length': 5 }
            ]
        }

        var wordsDataSource = new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
                read: {
                    url: "{remote service}"
                }
            },
            schema: {
                data: "result"
            },
            filter: {
                logic: 'or',
                filters: [
                    { field: 'w', operator: 'contains', value: 'don' },
                    { field: 'length', operator: 'gte', value: 5 }
                ]
            }
        });
```

## Accent-Folding Filtering

As of R2 2019, the DataSource delivers a built-in functionality to handle cases when the user needs to filter on diacritic characters in a specific language. The [`accentFoldingFiltering`](/api/javascript/data/datasource/configuration/accentfoldingfiltering) option allows the user to define a specific culture that will be used when the filter is applied. 

Since these characters are unique for a specific language, you have to set the appropriate culture as a value. For example, `tr-TR` for Turkish, `es-ES` for Spanish, or `fr-FR` for French.

> Due to the specifics of the case-insensitive search, you can use only one language to filter the data. For example, if you mix Spanish and Turkish, you may observe unexpected behavior.

The following example demonstrates how to apply the accent-folding filtering option.

```dojo
    <div id="container"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          {  name: "KIZILTOPRAK" },
          {  name: "KARŞIYAKA" },
          {  name: "İSTANBUL" }
        ],
        filter: { field: "name", operator: "contains", value: "k\u0131z" }, //"k\u0131z" equals "KIZ"
        accentFoldingFiltering: "tr-TR"
      });
      dataSource.fetch(function() {
        var currentView = dataSource.view();
        currentView.forEach(function(el){
          $('#container').append(`<p>${el.name}</p> `)
        });    
      });
    </script>
```

## Local Grouping

When you group local data, you can continue to use the same DataSource you are already familiar with. However, generating grouped data on the server can be difficult when you are unsure of the format the DataSource is expecting. 

Note that local grouping is convenient for small datasets. However, for performance concerns, avoid it when you work with large numbers of data.

```dojo
    <div id="container"></div>
    <script>
      var words = {
        'count': 4,
        'input': 'kendo',
        'items': [
          { 'w': 'node', 'length': 4 },
          { 'w': 'kendo', 'length': 5 },
          { 'w': 'done', 'length': 4 },
          { 'w': 'nod', 'length': 3 },
          { 'w': 'keno', 'length': 4 }
          
        ]
      };
      var dataSource = new kendo.data.DataSource({
        data: words,
        group: { field: 'length', dir: 'desc'},
        schema: { data: 'items' }
      });

      dataSource.fetch(function() {
        var currentView = dataSource.view();
        var groupsCount = currentView.length;
        
        currentView.forEach(function(gr){
          $('#container').append(`<p><b>Group: </b>Field: ${gr.field} --> Value: ${gr.value}</p> `)
          var items = gr.items;
          items.forEach(item => $('#container').append(`<div>${item.w}</div>`))
        });  
      });
    </script>
```

## Server Grouping

Server grouping is an excellent option when working with large datasets. Be sure to set the `schema` and `group` properties as necessary.

The following example features local data but the data returned by a `transport` will be evaluated in the same way.

```
    var words = {
        'count': 4,
        'input': 'kendo',
        'groups': [{
            'field': 'length',
            'value': '5',
            'itemCount': '1', // Specify the number of items in the group.
            'items': [{
                'w': 'kendo'
            }],
            'hasSubgroups': false,
            'aggregates': {}
        },{
            'field': 'length',
            'value': '4',
            'itemCount': '3',
            'items': [
                { 'w': 'done' },
                { 'w': 'keno' },
                { 'w': 'node' }
            ],
            'hasSubgroups': false,
            'aggregates': {}
        }, {
            'field': 'length',
            'value': '4',
            'subgroupCount': '1', // Specify the number of subgroups when hasSubgroups is true.
            'items': [
                {
                    'field': 'anotherField',
                    'value': 'test',
                    'itemCount': '1',
                    'items': [{
                        's': 'my-item'
                    }],
                    'hasSubgroups': false,
                    'aggregates': {}
                }
            ],
            'hasSubgroups': true,
            'aggregates': {}
        }]
    };
    
    var wordsDataSource = new kendo.data.DataSource({
        data: words,
        schema: {
            groups: 'groups'
        },
        group: {
            field: 'length'
        },
        serverGrouping: true
    });
```

## Mixed Data Operation Mode

Note that all data operations have to occur either on the server or on the client. Therefore, while you can still use the mixed data operation mode of the DataSource, this approach is not recommended as it leads to undesired side effects. 

For example, if you enable `serverPaging` and disable `serverFiltering`, the DataSource will filter only the data from the current page and the user will see less results than expected. In other scenarios, the DataSource may make more requests than necessary to execute the data operations.

## Widget Binding

Kendo UI widgets support data binding and use the DataSource component as a binding source for both their local and remote data.

The following example demonstrates how to create a DataSource inline with the other Kendo UI widget settings.

    $("#chart").kendoChart({
        title: {
            text: "Employee Sales"
        },
        dataSource: new kendo.data.DataSource({
            data: [
            {
                employee: "Joe Smith",
                sales: 2000
            },
            {
                employee: "Jane Smith",
                sales: 2250
            },
            {
                employee: "Will Roberts",
                sales: 1550
            }]
        }),
        series: [{
            type: "line",
            field: "sales",
            name: "Sales in Units"
        }],
        categoryAxis: {
            field: "employee"
        }
    });

## Shared DataSource

The DataSource component also enables you to create a shared data source, which will allow multiple Kendo UI widgets to bind to the same data collection. Using a shared DataSource decreases the data requests, improves the performance, and provides automatic synchronized refreshing of all bound widgets when the data changes.

```dojo
    <div id="chart"></div>
    <div id="grid"></div>
    <script>
      var data = [
        {employee: "Aaron", sales: 15000},
        {employee: "Brian", sales: 18000},
        {employee: "Kevin", sales: 23500},
        {employee: "James", sales: 38400},
        {employee: "Paolo", sales: 12000}        
      ]
      var sharedDataSource = new kendo.data.DataSource({
        data: data,
      });
      // Bind two UI widgets to the same DataSource.
      $("#chart").kendoChart({
        title: {
          text: "Employee Sales"
        },
        dataSource: sharedDataSource,
        series: [{
          field: "sales",
          name: "Sales in Units"
        }],
        categoryAxis: {
          field: "employee"
        }
      });
      $("#grid").kendoGrid({
        dataSource: sharedDataSource,
        columns: [
          {
            field: "employee",
            title: "Employee"
          },
          {
            field: "sales",
            title: "Sales",
            template: '#= kendo.toString(sales, "N0") #'
          }]
      });
    </script>
```

## See Also

* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
