---
title: Custom Binding
page_title: Custom Binding | Kendo UI Hierarchical Data Source
description: "Learn how to fetch custom hierarchical data and represent it in a Kendo UI HierarchicalDataSource component."
slug: custombinding_ofhthehierarchical_datasourcecomponent
position: 2
---

# Custom Binding

Below are a couple of ways to bind the Kendo UI HierarchicalDataSource component in a custom way when the default configuration is not actionable.

## Configuration

### Customize Transport Binding

If you have a way of fetching data that cannot be achieved through the default [dataSource transport configuration](/api/framework/hierarchicaldatasource#configuration-transport), you can provide a [custom `read` function](/api/framework/datasource#configuration-transport.read) that fetches the data and delivers it to the datasource, which is the so-called custom transport. This enables you to query different URLs conditionally, or provide generated authentication tokens for each request.

The example below demonstrates how to bind the HierarchicalDataSource component through a custom transport.

###### Example

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      transport: {
        read: function(options) {
          var id = options.data.EmployeeId;

          // [additional processing here]

          $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/employees",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            data: { EmployeeId: id },
            success: function(result) {
              // notify the data source that the request succeeded
              options.success(result);
            },
            error: function(result) {
              // notify the data source that the request failed
              options.error(result);
            }
          });
        }
      },
      schema: {
        model: {
          id: "EmployeeId",
          hasChildren: "HasEmployees"
        }
      }
    });

    datasource.read();
    </script>


### Fetch Hierarchy through Single Request

Because the HierarchicalDataSource component loads data on demand, loading all available data can result in multiple requests to the server. To prevent this, make a single AJAX request to get all the data, and then provide it to the dataSource.

The example below demonstrates how to fetch a complete hierarchy through a single request.

###### Example

    <script>
      var datasource = new kendo.data.HierarchicalDataSource({
        transport: {
          read: function(options) {
            // asynchonous operation for getting data (e.g. $.ajax)
            // then pass data in success or error handler
            options.success([
              { id: 1, Name: "Tea", items: [
                { id: 2, Name: "Earl Gray" },
                { id: 3, Name: "Oolong" }
              ] }
            ]);
          }
        },
        schema: {
          model: {
            children: "items"
          }
        }
      });

      datasource.read();

      var rootItems = datasource.data();

      console.log(rootItems.length); // logs 1

      rootItems[0].load(); // does not initiate AJAX request

      console.log(rootItems[0].children.data().length); // logs 2

    </script>

## See Also

Articles on the Kendo UI DataSource and HierarchicalDataSource components:

* [HierarchicalDataSource JavaScript API Reference](/api/javascript/data/hierarchicaldatasource)
* [HierarchicalDataSource Overview]({% slug custombinding_ofhthehierarchical_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
