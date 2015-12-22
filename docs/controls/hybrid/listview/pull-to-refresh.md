---
title: Pull to refresh
previous_url: /howto/howto-use-the-mobile-listview-with-pull-to-refresh
position: 3
---

# Use the Mobile ListView with pull-to-refresh

The Kendo UI mobile ListView widget is used to display flat or grouped list of items. It can be either used in unbound mode by enhancing an HTML `UL` element, or bound to a DataSource instance.

'Pull to refresh' pattern solves the problem when the developer has to display a data with dynamic character.

## Create a Mobile ListView with pull-to-refresh

Let's see how the mobile ListView works by building a simple example that integrates the Twitter API.

First, we'll define a target HTML element such as a list:

    <ul id="localListView"></ul>

    <script id="pull-to-refresh-template" type="text/x-kendo-template">
        <div class="tweet">
            <img class="pullImage" src="#= profile_image_url #" alt="#= from_user #" />#= text #
            <div class="metadata">
                <a class="sublink" target="_blank" href="http://twitter.com/\\#!/#= from_user #/status/#= id_str #" rel="nofollow">#= kendo.toString(new Date(Date.parse(created_at)), "dd MMM HH:mm") #</a>
                |
                <a class="sublink" href="http://twitter.com/#= from_user #" rel="nofollow">#= from_user #</a>
            </div>
        </div>
    </script>

Next, we will initialize the Mobile ListView by referring the template and a result set from the Twitter API to be displayed:

    var dataSource = new kendo.data.DataSource({
        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: "http://search.twitter.com/search.json", // the remove service url
                dataType: "jsonp" // JSONP (JSON with padding) is required for cross-domain AJAX
            },
            parameterMap: function(options) {
                return {
                    q: "javascript",
                    page: options.page,
                    rpp: options.pageSize
                };
            }
        },
        schema: { // describe the result format
            data: "results" // the data which the data source will be bound to is in the "results" field
        }
    });

    $("#pull-to-refresh-listview").kendoMobileListView({
        dataSource: dataSource,
        pullToRefresh: true,
        appendOnRefresh: true,
        template: $("#pull-to-refresh-template").text(),
    });

Here's the live example of the representation (above):

<a class="jsbin-embed" href="http://jsbin.com/ukitas/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

## Send Additional Parameters

The Mobile ListView provides a way to define [pullParameters](/api/mobile/listview#pullparameters-function) function, which will add its result to the data send to the server.
These data will be available in the DataSource's [parameterMap](/api/framework/datasource#transportparametermap-function) function.

Let's modify the above example to send [an additional parameter](https://dev.twitter.com/docs/api/1.1/get/search/tweets#api-param-since_id) to Twitter service:

    $("#pull-to-refresh-listview").kendoMobileListView({
        dataSource: dataSource,
        pullToRefresh: true,
        appendOnRefresh: true,
        template: $("#pull-to-refresh-template").text(),
        pullParameters: function(item) {
            //item is the first data item in the ListView
            return {
                since_id: item.id_str,
                page: 1
            };
        }
    });

Now we can use this additional parameter in the `parameterMap` function of the DataSource:

    var dataSource = new kendo.data.DataSource({
        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: "http://search.twitter.com/search.json", // the remove service url
                dataType: "jsonp" // JSONP (JSON with padding) is required for cross-domain AJAX
            },
            parameterMap: function(options) {
                return {
                    q: "javascript",
                    page: options.page,
                    rpp: options.pageSize,
                    since_id: options.since_id //additional parameters sent to the remote service
                };
            }
        },
        schema: { // describe the result format
            data: "results" // the data which the data source will be bound to is in the "results" field
        }
    });

Here's the live example of the above example:

<a class="jsbin-embed" href="http://jsbin.com/iloqid/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
