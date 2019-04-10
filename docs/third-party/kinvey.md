---
title: Kinvey
page_title: Kinvey | Kendo UI Third-Party Tools
description: "Learn how to use the Kendo UI widgets with Kinvey services."
slug: kinveysupport_integration_kendoui
---

# Kinvey

[Kinvey](https://www.kinvey.com/) is a complete BaaS that powers mission-critical applications and entire digital businesses.

Kinvey provides a ready-for-use [API for CRUD operations](https://devcenter.kinvey.com/rest/guides/datastore#top) which enables you to configure and integrate the following services with the Kendo UI widgets:

* [Read](#read)
* [Update](#update)
* [Create](#create)
* [Destroy](#destroy)

> To dynamically set the id of the data item, configure the URLs of all transport operations as functions.

For a demo on integrating all CRUD operations, refer to [this Dojo example](https://dojo.telerik.com/iqASU).

## Configuring the Read Service

The `read` service defined by the DataSource transport returns data in the expected JSON format. Depending on the setting, you might be required to provide an authorization token.

The following example demonstrates how to configure the `read` transport operation with an authorization token.

```
    var token = customToken
    // ...
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

## Configuring the Update Service

The `update` service expects a `PUT` request that contains the id of the updated item as part of the URL. As a result, you need to programmatically add the id of the edited item to the URL on the `save` event of the widget&mdash;for example, on the [`save`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save) event of the Grid.

The following example demonstrates how to configure the `update` transport operation and add the id of the data item.

```
    var token = customToken
    var _id = 0;

    save: function (e) {
          _id = e.model._id
    },
    // ...
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

## Configuring the Create Service

The `create` service defined by the DataSource transport creates a new item. If the `_id` of the item is not specified, the widget automatically generates and sends it as an empty string. As a result, you need to programmatically remove it from the request by using the [`parameterMap`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.parametermap) of the DataSource.

The following example demonstrates how to configure the `create` transport operation and remove the `_id` from the request.

```
    var token = customToken
    // ...
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

## Configuring the Destroy Service

The `destroy` service submits the id of the data item that will be deleted and expects a `DELETE` request that contains the id of the item. As a result, you need to programmatically add the id of the edited item to the URL on the `remove` event of the widget&mdash;for example, on the [`remove`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/remove) event of the Grid.

The following example demonstrates how to configure the `destroy` transport operation and add the id of the data item.

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
