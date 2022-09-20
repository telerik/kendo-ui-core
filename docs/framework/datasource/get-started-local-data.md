---
title: Getting Started with Local Data
page_title: jQuery DataSource Documentation | Getting Started with the Local Data Binding
description: "Get started with the jQuery DataSource component by Kendo UI and learn how to bind and configure local data in your JavaScript widgets."
slug: getting_started_kendoui_local_data_binding
position: 2
---

# Getting Started with the Local DataSource Binding

This guide demonstrates how to configure the Kendo UI for jQuery DataSource component with local data and display the results of the retrieved data on the page by adding HTML elements.

For examples where the DataSource is bound to Kendo UI widgets, refer to the [Kendo UI for jQuery demos library](https://demos.telerik.com/kendo-ui/).

After the completion of this guide, you will be able to load, sort, and log the data items as demonstrated in the following example:

```dojo
    <div id="container"></div>
	<script>
		var movies = [
			{ title: "Star Wars: A New Hope", year: 1977 },
			{ title: "Star Wars: The Empire Strikes Back", year: 1980 },
			{ title: "Star Wars: Return of the Jedi", year: 1983 }
		];
	
		var localDataSource = new kendo.data.DataSource({ 
			data: movies,
			sort: { field: "year", dir: "desc" }
		});
		
	
		localDataSource.read();
	
		var currentView = localDataSource.view();
	
		currentView.forEach(function(el){
			$('#container').append(`<p><b>Title: </b>${el.title} --> <b>Year: ${el.year}</b></p> `)
		});
    </script>
```

## 1. Create the Local DataSource

First, you have to create a DataSource for your local data and bind it to that data by assigning an array of JavaScript objects to the `data` configuration property of the DataSource instance.

```
    var movies = [{
        title: "Star Wars: A New Hope",
        year: 1977
    }, {
        title: "Star Wars: The Empire Strikes Back",
        year: 1980
    }, {
        title: "Star Wars: Return of the Jedi",
        year: 1983
    }];

    var localDataSource = new kendo.data.DataSource({
        data: movies
    });
```

## 2. Load the Data
 
The `localDataSource` variable in the example is a DataSource that is initialized to represent an in-memory cache of the `movies` array. However, to load the data represented by the `movies` array in the DataSource, you need to call the `.read()` or `fetch()` methods. 

```
	localDataSource.read();
```

## 3. Get the Returned Data Items

Now, you will access the returned data items by using the [`view`](/api/javascript/data/datasource/methods/view) method of the DataSource. You can also retrieve them through [`data()`](/api/javascript/data/datasource/methods/data).

Note that when the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. By default, the widgets automatically bind to an associated DataSource. To override this built-in behavior, use the `autoBind` configuration.


```
	var currentView = localDataSource.view();
```

Once the basic initialization is completed, you can start adding additional configurations to the DataSource.

## 4. Add Sorting

As a final step, you will sort the items in the DataSource by using the [`sort`](/api/javascript/data/datasource/configuration/sort) configuration option.

```
	var localDataSource = new kendo.data.DataSource({ 
        data: movies,
        sort: { field: "year", dir: "desc" }
    });
```

This is it! Now you are ready to dive more deeply into the DataSource component, bind it to remote services, or use it in more advanced and complex scenarios!

## Next Steps 

* [Setting the Local CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource Operations]({% slug datasourceoperations_kendoui_datasourcecomponent %}) 
* [Demo Page for the DataSource](https://demos.telerik.com/kendo-ui/datasource/index)

## See Also 

* [Getting Started with the Remote DataSource Binding]({% slug getting_started_kendoui_remote_data_binding %})
* [JavaScript API Reference of the DataSource](/api/javascript/data/datasource)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>