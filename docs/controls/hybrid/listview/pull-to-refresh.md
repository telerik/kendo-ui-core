---
title: Pull-to-Refresh Pattern
page_title: Pull-to-Refresh Pattern | Hybrid UI ListView
description: "Learn how to use the pull-to-refresh pattern of the Hybrid UI ListView in the Kendo UI framework."
previous_url: /howto/howto-use-the-mobile-listview-with-pull-to-refresh
slug: pulltorefreshfeature_hybridlistview
position: 3
---

# Pull-to-Refresh Pattern

The [Hybrid UI ListView widget](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index) is used to display flat or grouped lists of items. It can be either used in the unbound mode by enhancing an HTML `ul` element, or bound to a DataSource instance.

The Pull-to-refresh pattern solves the issue that occurs when you have to display data of dynamic character.

## Getting Started

### Create ListViews with Pull-to-Refresh

**Step 1** Define a target HTML element such as a list.

###### Example

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

<!--_-->
**Step 2** Initialize the ListView by referring the template and a result set from the Twitter API to be displayed.

###### Example

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

This is the live example of the representation above:

<a class="jsbin-embed" href="http://jsbin.com/ukitas/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Send Additional Parameters

The Hybrid UI ListView provides a way to define the [`pullParameters`](/api/mobile/listview#pullparameters-function) function, which will add its result to the data that is sent to the server. This data will be available in the DataSource's [`parameterMap`](/api/framework/datasource#transportparametermap-function) function.

**Step 1** Modify the above example to send [an additional parameter](https://dev.twitter.com/docs/api/1.1/get/search/tweets#api-param-since_id) to the Twitter service.

###### Example

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

**Step 2** Use this additional parameter in the `parameterMap` function of the DataSource.

###### Example

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

This is the live example of the representation above:

<a class="jsbin-embed" href="http://jsbin.com/iloqid/1/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

## See Also

Other articles and how-to examples on the Hybrid UI ListView:

* [Hybrid UI ListView JavaScript API Reference](/api/javascript/mobile/ui/listview)
* [Overview of the Hybrid UI ListView]({% slug overview_hybridlistview %})
* [Endless Scrolling Feature]({% slug endlessscrolling_hybridlistview %})

For how-to examples on the Kendo UI hybrid ListView, browse its [**How To** documentation folder]({% slug howto_group_data_hybridlistview %}).
