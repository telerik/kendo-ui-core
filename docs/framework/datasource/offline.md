---
title: Offline Support
page_title: Offline Support | Kendo UI Data Source
description: "Learn more about the offline support Kendo UI provides you with when working with the DataSource component."
slug: offlinesupport_kendoui_datasourcecomponent
position: 3
---

# Offline Support

Offline support allows data-bound Kendo UI widgets to function without active server connection. Users can continue working with the available data until network connectivity resumes. The DataSource syncs all changes with the remote service when a connection becomes available.

> **Important**
>
> Offline storage support has been available ever since the Kendo UI 2014 Q2 SP1 when it was introduced for the first time.

**Figure 1. Offline storage mechanism**

![Offline Storage](/framework/datasource/OfflineStorage.gif)

## Configuration

### Set Offline Storage

Set the [`offlineStorage`](/api/javascript/data/datasource#configuration-offlineStorage) option to enable offline storage. The DataSource uses this value as a key when saving and loading its state. By default, the Kendo UI DataSource uses the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) option to persist its offline state.

> **Important**
>
> To use offline storage, you must provide the model with a designated ID field.

The example below demonstrates how to set the offline storage key.

###### Example

    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });

## Offline and Online Switching

### Go Online

By default, the DataSource is online. All data item changes, such as create, update, and destroy, go to the remote service configured via the [`transport`](/api/javascript/data/datasource#configuration-transport) option.

To go back to online mode, call the `online` method with `true` as an argument. The DataSource immediately calls the [`sync`](/api/javascript/data/datasource#methods-sync) method to send all offline changes to the remote service.

### Go Offline

To switch to offline mode call the [`online`](/api/javascript/data/datasource#methods-online) method  with `false` as an argument. From now on the DataSource is going to persist all data item changes in offline storage.

The example below demonstrates how to go in offline mode.

###### Example

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "http://demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });
    // fetch the data from the remote service
    dataSource.fetch(function() {
        // go in offline mode
        dataSource.online(false);
        // make some changes
        dataSource.at(0).set("ProductName", "Updated");
        // sync to accept the changes (the data source persists the change in localStorage)
        dataSource.sync();
        // optionally go back online (the data source syncs the change with the remote service)
        dataSource.online(true);
    });

## Offline State

### Get Current Offline State

The [`offlineData`](/api/javascript/data/datasource#methods-offlineData) method returns the current offline state of the DataSource. The state is an array of JavaScript objects that represent the data items. Changed data items have a `__state__` field attached. That field indicates the type of change: `"create"`, `"update"` or `"destroy"`. Unmodified data items do not have a `__state__` field.

The example below demonstrates how to get the offline state.

###### Example

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "http://demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });

    dataSource.fetch(function() {
        // go in offline mode
        dataSource.online(false);
        // change the ProductName field of the first data item
        dataSource.at(0).set("ProductName", "Updated");
        // sync to accept the changes
        dataSource.sync();
        // get the offline data
        var offlineData = dataSource.offlineData();
        console.log(offlineData[0].__state__); // displays "update"
    });

> **Important**
>
> If the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) option is set to `true` the `offlineData` returns an array of groups in the following way `{ value:"group value", field:"group field", items: [ /* data items in the group */ ] }`.

## Customization

### Use Custom Offline Storage

To use custom offline storage set the `offlineStorage` option to a JavaScript object that has two methods&mdash;`getItem` and `setItem`. The `setItem` method saves the date and `getItem` returns it.

###### Example

    var dataSource = kendo.data.DataSource({
        // use sessionStorage instead of localStorage
        offlineStorage: {
            getItem: function() {
                return JSON.parse(sessionStorage.getItem("products-key"));
            },
            setItem: function(item) {
                sessionStorage.setItem("products-key", JSON.stringify(item));
            }
        },
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });

## Browser Internet Connection

At the time of this writing there is not a cross-browser way to determine whether a web application has Internet access or not. Also, some browsers treat online mode differently than others. That is why the Kendo UI DataSource component does not attempt to automatically detect offline mode. You are able to implement this by either handling the [`online` and `offline`](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) events or via Ajax polling.

For more information on browser online mode, refer to [this MDN article](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine).

### Use online and offline Events

The `online` and `offline` events behave differently among the browsers. Firefox and Internet Explorer fire those events when the user switches between offline and online mode. However, the `online` and `offline` events work as expected in mobile devices and Phonegap applications.

The example below demonstrates how to detect the offline mode via the `online` and `offline` events.

###### Example

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    dataSource.online(navigator.onLine);
    $(window).on("offline", function() {
       dataSource.online(false);
    });
    $(window).on("online", function() {
       dataSource.online(true);
    });

### Use Ajax Polling

Ajax polling is more robust than using the `online` and `offline` events, but leads to constant HTTP requests (CPU and bandwidth usage). Note that Ajax requests could fail for reasons other than not having Internet connection, such as server error, timeout. The Ajax polling approach works best for desktop browsers.

The example below demonstrates how to detect the offline mode via Ajax polling.

###### Example

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    // make a request to some URL every 5 seconds to see if Internet access is available
    var pollId = setInterval(function() {
        $.ajax({
            // use an URL from the same domain to adhere to the same origin policy
            url: "/"
        })
        .done(function() {
            // the ajax request succeeded - we are probably online.
            dataSource.online(true);
        })
        .fail(function() {
            // the ajax request failed - we are probably offline.
            dataSource.offline(false);
        });
    }, 5000);)

## Frequently Asked Questions

This is a collection of the most frequently asked questions (FAQ) related to the offline data storage when working with the Kendo UI DataSource component.

### What Is the Available Offline Storage Space?

The default localStorage space is normally around 5MB per origin, i.e. specific domain, port, and protocol. However, do not fully rely on it as it can depend on the browser and the browser settings, controlled by the user. Theoretically, it is possible to measure the maximum available storage space by trying to save large chunks of data via the localStorage API, but this may cause the browser to become temporarily irresponsive and, therefore, is not recommended.

### Can Web Apps Request Allocation for More Offline Storage Space by the Browser?

No.

### Do Several DataSource Instances Share the Same Offline Storage Space?

Yes. Moreover, different Kendo UI DataSource instances must use different `offlineStorage` keys, otherwise they overwrite each other's saved data.

### How Do I Check the Currently Used Local Storage Space?

There are different ways to do this, depending on how you store your data and what exactly you want to check. A possible option to measure the amount of data stored by a Kendo UI DataSource instance is:

        // check amount of used offline storage space for a specific key
        JSON.stringify(localStorage.getItem("your-offlineStorage-key-here")).length
        // check overall used offline storage space
        JSON.stringify(localStorage).length

### What Happens When the Offline Storage Quota Is Exceeded?

The data saving fails and the browser triggers an unhandled exception. If you want to handle these, it is possible to use a [customized offlineStorage](#use-custom-offline-storage) implementation with `try ... catch` blocks.

## See Also

Other articles on the Kendo UI DataSource component:

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
