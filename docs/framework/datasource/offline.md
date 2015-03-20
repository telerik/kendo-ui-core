---
title: Work Offline
page_title: Work offline with the Kendo DataSource
description: Kendo offline support
position: 3
---

# Work offline with the Kendo UI DataSource

Offline support allows data-bound Kendo UI widgets to function without active server connection.
Users can continue working with the available data until network connectivity resumes.

The Kendo UI DataSource syncs all changes with the remote service when a connection becomes available.

> Offline storage support is available since the 2014 Q2 SP1 release.

## Configure offline storage

Set the [offlineStorage](/api/framework/datasource#configuration-offlineStorage) option to enable offline storage. The DataSource uses this value as a key when saving and loading its state.

By default the Kendo UI DataSource uses [localStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage) to persist its offline state.

> In order to use offline storage, the model must have a designated ID field.

### Example - set offline storage key

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });

## Go offline and online

The DataSource is "online" by default. All data item changes (create, update, destroy) go to the remote service configured via the [transport](/api/framework/datasource#configuration-transport) option.

To switch to "offline" mode call the [online](/api/framework/datasource#methods-online) method  with `false` as an argument. From now on the DataSource will persist all data item changes in offline storage.

To go back in "online" mode call the `online` method with `true` as an argument. The DataSource immediately calls the [sync](/api/framework/datasource#methods-sync) method to send all offline changes to the remote service.

### Example - go in offline mode

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

## Get the offline state

The [offlineData](/api/framework/datasource#methods-offlineData) method returns the current offline state of the DataSource. The state is an array of JavaScript objects that represent the data items.
Changed data items have a `__state__` field attached. That field indicates the type of change: "create", "update" or "destroy". Unmodified data items don't have a `__state__` field.

### Example - get the offline state

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

> If the [serverGrouping](/api/framework/datasource#configuration-serverGrouping) option is set to `true` the `offlineData` will return array of groups: `{ value:"group value", field:"group field", items: [ /* data items in the group */ ] }`.

## Use custom offline storage

To use custom offline storage set the `offlineStorage` option to a JavaScript object that has two methods: `getItem` and `setItem`. The `setItem` method saves the sate and `getItem` returns it.

### Example - use custom offline storage
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

## Detect browser Internet connection

At the time of this writing there isn't a cross-browser way to determine whether a web application has Internet access or not. In addition some browsers treat online mode differently than the rest.
More info about browser online mode is available in [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine.onLine).

This is why the Kendo UI DataSource does not attempt to automatically detect offline mode. The developer could implement that by either handlng the ["online" and "offline"](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) events or via Ajax polling.

### Example - detect offline mode via the online and offline events

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

### Example - detect offline mode via Ajax polling

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


Both approaches have their pros and cons. The "online" and "offline" events behave differently among the browsers -
Firefox and Internet Explorer fire those events when the user switches between offline and online mode.

Ajax polling is more robust but leads to constant HTTP requests (CPU and bandwidth usage).
In addition Ajax requests could fail for other reasons than not having Internet connection - server error, timeout.

The online and offline events work as expected in mobile devices and Phonegap applications. The ajax polling approach works best for desktop browsers.

## Offline Storage Considerations and FAQ

* **What is the available offline storage space?** The default localStorage space is normally around 5MB per *origin* (i.e. specific domain, port and protocol),
but this should not be relied on, because it can depend on the browser and the browser settings, controlled by the user.
Theoretically, it is possible to measure the maximum available storage space by trying to save large chunks of data via the localStorage API,
but this may cause the browser to become temporarily irresponsive and is not recommended.

* **Can the web application request allocation of more offline storage space by the browser?** No.

* **Do several Kendo UI DataSource instances share the same offline storage space?** Yes. Moreover, different Kendo UI DataSource instances must use
different `offlineStorage` keys, otherwise they will overwrite one another's saved data.

* **How do I check the currently used local storage space?** There are different ways to do that, depending on how you store your data and what exactly you want to check.
One possible option to measure the amount of data stored by a Kendo UI DataSource instance is:
        
        // check amount of used offline storage space for a specific key
        JSON.stringify(localStorage.getItem("your-offlineStorage-key-here")).length
        // check overall used offline storage space
        JSON.stringify(localStorage).length

* **What happens when the offline storage quota is exceeded?** The data saving will fail and the browser will trigger an unhandled exception.
If you want to handle these, it is possible to use a [customized offlineStorage](#use-custom-offline-storage) implementation with `try ... catch` blocks.
