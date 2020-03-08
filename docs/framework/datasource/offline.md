---
title: Offline Support
page_title: Offline Support | Kendo UI Data Source
description: "Learn more about the offline support Kendo UI provides you with when working with the DataSource component."
slug: offlinesupport_kendoui_datasourcecomponent
position: 3
---

# Offline Support

Offline support enables data-bound Kendo UI widgets to function without an active server connection.

Users can continue to work with the available data until the network connectivity resumes. When the connection becomes available, the DataSource synchronizes all changes with the remote service.

> The offline storage support feature is available as of the Kendo UI 2014 Q2 SP1 release.

**Figure 1: Offline storage mechanism**

![Offline Storage](/framework/datasource/OfflineStorage.gif)

## Enabling Offline Storage

To enable the offline storage feature, set the [`offlineStorage`](/api/javascript/data/datasource/configuration/offlinestorage) option. The DataSource uses this value as a key when it saves and loads its state. By default, to persist its offline state, the DataSource uses the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) option.

> To use offline storage, provide the model with a designated `ID` field.

The following example demonstrates how to set the offline storage key.

    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });

## Switching the Offline and Online Modes

By default, the DataSource is online. All data item changes, such as create, update, and destroy, are included in the remote service that is configured through the [`transport`](/api/javascript/data/datasource/configuration/transport) option.

* To go back to online mode, call the [`online`](/api/javascript/data/datasource/methods/online) method with `true` as an argument. As a result, the DataSource calls the [`sync`](/api/javascript/data/datasource/methods/sync) method to send all offline changes to the remote service.
* To switch to offline mode, call the [`online`](/api/javascript/data/datasource/methods/online) method  with `false` as an argument. As a result, the DataSource starts to persist all data item changes in the offline storage.

The following example demonstrates how to go in offline mode.

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/products/update",
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
    // Fetch the data from the remote service.
    dataSource.fetch(function() {
        // Go in offline mode.
        dataSource.online(false);
        // Make some changes.
        dataSource.at(0).set("ProductName", "Updated");
        // Sync to accept the changes (the data source persists the change in localStorage).
        dataSource.sync();
        // Optionally go back online (the data source syncs the change with the remote service).
        dataSource.online(true);
    });

## Getting the Current Offline State

The [`offlineData`](/api/javascript/data/datasource/methods/offlinedata) method returns the current offline state of the DataSource. The state is an array of JavaScript objects that represent the data items. Changed data items have an attached `__state__` field which indicates the type of change&mdash;`"create"`, `"update"`, or `"destroy"`. Unmodified data items do not have a `__state__` field.

> If the [`serverGrouping`](/api/javascript/data/datasource/configuration/servergrouping) option is set to `true` the `offlineData` returns an array of groups in the following way `{ value:"group value", field:"group field", items: [ /* data items in the group */ ] }`.

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/products/update",
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
        // Go in offline mode.
        dataSource.online(false);
        // Change the ProductName field of the first data item.
        dataSource.at(0).set("ProductName", "Updated");
        // Sync to accept the changes.
        dataSource.sync();
        // Get the offline data.
        var offlineData = dataSource.offlineData();
        console.log(offlineData[0].__state__); // Displays "update".
    });

## Using Custom Offline Storage

To use custom offline storage, set the `offlineStorage` option to a JavaScript object that has the `getItem` method, which returns the data, and the `setItem` method, which saves the data.

    var dataSource = kendo.data.DataSource({
        // Use sessionStorage instead of localStorage.
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
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });

## Browser Internet Connection

At the time of this writing, no cross-browser way for determining whether a web application has Internet access or not is available. Also, the way browsers treat the online mode differs and this is the reason for the DataSource not to attempt to automatically detect offline mode. For more information on browser online mode, refer to [this MDN article](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine).

To configure the DataSource to automatically detect offline mode, use either handle the [`online` and `offline`](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) events or use AJAX polling.

### Handling the online and offline Events

The `online` and `offline` events behave differently across the browsers. Firefox and Internet Explorer fire those events when the user switches between offline and online mode. However, the `online` and `offline` events work as expected in mobile devices and PhoneGap applications.

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
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

### Using AJAX Polling

AJAX polling is more robust than using the `online` and `offline` events, works best for desktop browsers but leads to constant HTTP requests (CPU and bandwidth usage). AJAX requests may fail not only because of Internet disconnection but also due to server errors and timeout.

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    // Make a request to some URL every 5 seconds to see if Internet access is available.
    var pollId = setInterval(function() {
        $.ajax({
            // Use an URL from the same domain to adhere to the same origin policy.
            url: "/"
        })
        .done(function() {
            // The ajax request succeeded. You are probably online.
            dataSource.online(true);
        })
        .fail(function() {
            // The AJAX request failed. You are probably offline.
            dataSource.offline(false);
        });
    }, 5000);)

## Frequently Asked Questions

This is a collection of the most frequently asked questions (FAQ) related to the offline data storage when working with the Kendo UI DataSource component.

### What is the available offline storage space?

The default local storage space is around 5MB per origin, that is, specific domain, port, and protocol. However, it can depend on the browser and the browser settings which are controlled by the user. Theoretically, it is possible to measure the maximum available storage space by trying to save large chunks of data through the `localStorage` API. This approach may temporary disrupt the browser responsiveness and is therefore not recommended.

### Can Web applications request allocation for more offline storage space by the browser?

No.

### Do several DataSource instances share the same offline storage space?

Yes. Moreover, different Kendo UI DataSource instances must use different `offlineStorage` keys. Otherwise, they overwrite each other's saved data.

### How do I check the currently used local storage space?

Depending on the way you store data and what the desired implementation is, the available approaches vary. To measure the amount of the data stored by a DataSource instance, use the following example.

        // Check the amount of used offline storage space for a specific key.
        JSON.stringify(localStorage.getItem("your-offlineStorage-key-here")).length
        // Check overall used offline storage space.
        JSON.stringify(localStorage).length

### What happens when the offline storage quota is exceeded?

The data saving fails and the browser throws an exception. To handle the error, use a [customized `offlineStorage`](#use-custom-offline-storage) implementation with `try ... catch` blocks.

## See Also

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
