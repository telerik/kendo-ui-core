---
title: Kinvey Integration
page_title: Kinvey | Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI widgets with Kinvey services."
slug: kinveysupport_integration_kendoui
position: 10
---

# Kinvey

[Kinvey](https://www.kinvey.com/) is a complete BaaS that powers mission-critical apps and entire digital businesses.

# Kinvey and Kendo UI Integration with CRUD Operations

Kinvey provides an ready for use [API for CRUD operations](https://devcenter.kinvey.com/rest/guides/datastore#top), which can be easily integrated with the Kendo UI widgets.

> **Important**
>
> All transport operation URLs should be configured as functions in order to dynamically set the id of the data item.

## Read

The read service defined by the DataSource transport will return data in the expected JSON format. Depending on the setting an authorization token may be required.

The following code snippet demonstrates how to configure the transport read with authorization token:

```
    var token = customToken
    //.....
    read: {
     url: function () {
      return "https://baas.kinvey.com/appdata/kid_ByXpkJIDb/books/"
     },
     type: 'GET',
     beforeSend: function (req) {
     req.setRequestHeader('authorization', token);
     }
    }
```

## Update

The update service is expecting a PUT request containing the updated item id as part of the URL. This will require to programmatically add the id of the edited item in the URL. This can be achieved on the [save]((http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-save)) event of the Grid.

The following code snippet demonstrates how to configure the transport update operation and how to add the data item id:

```
    var token = customToken
    var _id = 0;

    save: function (e) {
          _id = e.model._id
    },
    //.....
    update: {
     url: function () {
      return "https://baas.kinvey.com/appdata/kid_ByXpkJIDb/books/" + _id
     },
     type: 'PUT',
     beforeSend: function (req) {
      req.setRequestHeader('authorization', token);
     }
    }
```

## Create

The Create service defined by the DataSource transport will create a new item and if an _id is not specified, one will be automatically generated. As the Grid will automatically send an _id as empty string, it has to be programmatically removed from the request using the [parameterMap](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.parameterMap) of the DataSource.

The following code snippet demonstrates how to configure the transport create operation and how to remove the _id from the request:

```
    var token = customToken
    //.....
    create: {
     url: "https://baas.kinvey.com/appdata/kid_ByXpkJIDb/books",
     type: 'POST',
     beforeSend: function (req) {
     req.setRequestHeader('authorization', token);
     }
    }
    // Remove the _id parameter from the request

   parameterMap: function (options, operation) {
    if (operation == "create" && options._id == "") {
     delete options._id;
     return options;
    }
   }
```

## Destroy

The destroy action submits the id of the data item that should be deleted. It expects a DELETE request with the item id. This will require to programmatically add the id of the edited item in the URL. This can be achieved on the [remove]((http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-remove)) event of the Grid.

The following code snippet demonstrates how to configure the transport destroy operation and how to add the data item id:

```
    remove: function (e) {
     _id = e.model._id
    },
    //.....
    destroy: {
     url: function () {
       return "https://baas.kinvey.com/appdata/kid_ByXpkJIDb/books/" + _id
      },
      type: 'DELETE',
      beforeSend: function (req) {
       req.setRequestHeader('authorization', token);
      }
    }
```

A runnable example demonstrating the shown configurations can be found [here.](https://dojo.telerik.com/iqASU)

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
