---
title: Custom HierarchicalDataSource
page_title: HierarchicalDataSource Custom Binding | Kendo UI Hierarchical Data Source
description: "Learn how to fetch custom hierarchical data and represent it in a Kendo UI HierarchicalDataSource component."
previous_url: /framework/hierarchicaldatasource/custom-binding
slug: custombinding_ofhthehierarchical_datasourcecomponent
position: 7
---

# Custom HierarchicalDataSource

The HierarchicalDataSource allows you to apply custom ways for data binding when the default configuration is not actionable.

## Customizing Transport Binding

If you have a way of fetching data that cannot be achieved through the default [`transport` configuration](/api/framework/hierarchicaldatasource#configuration-transport) of the DataSource, you can provide the custom transport&mdash;a [custom `read` function](/api/framework/datasource#configuration-transport.read) that fetches the data and delivers it to the data source. This configuration enables you to query different URLs conditionally or provide generated authentication tokens for each request.

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      transport: {
        read: function(options) {
          var id = options.data.EmployeeId;

          // [additional processing here]

          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/employees",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            data: { EmployeeId: id },
            success: function(result) {
              // Notify the data source that the request succeeded.
              options.success(result);
            },
            error: function(result) {
              // Notify the data source that the request failed.
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


## Fetching Hierarchy through Single Requests

Because the HierarchicalDataSource loads data on demand, loading all available data can result in multiple requests to the server. To prevent this, make a single AJAX request to get all the data, and then provide it to the dataSource.

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

* [HierarchicalDataSource JavaScript API Reference](/api/javascript/data/hierarchicaldatasource)
* [HierarchicalDataSource Overview]({% slug custombinding_ofhthehierarchical_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
