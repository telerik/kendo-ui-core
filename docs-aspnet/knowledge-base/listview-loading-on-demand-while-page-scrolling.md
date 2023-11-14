---
title: Utilizing the ListView for Loading Items on Demand and Full-Page Scrolling
description: An example on how to use the Telerik UI for {{ site.framework }} ListView control to load items on demand while scrolling the browser page.
type: how-to
page_title: Utilizing the ListView for Loading Items on Demand and Full-Page Scrolling
slug: listview-loading-on-demand-while-page-scrolling
tags: listview, lazy, loading, on-demand, browser, page, scrolling, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} ListView</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I use the Telerik UI for {{ site.framework }} ListView component in a full-page scenario where the component's lazy loading doesn't rely on the height of the containing `div` but the browser window scroll position? 
This implementation will also prevent having two vertical scroll bars on the page, and it is a great use case for a page displaying news articles.

## Solution

To achieve the desired scenario:

1. Set up your View with the ListView component, but do not set it's height. Use the `PageSize()` property to set how many items must load on the initial page load. This particular example binds data to the local data from the Model.

    ```View
        @model YourModelName
        <div class="container listview-fullheight-container">
            @(Html.Kendo().ListView<YourModelName>(Model)
                .Name("newsListView")
                .TagName("div")
                .ClientTemplateId("template")
                .Scrollable(ListViewScrollableMode.Endless)
                .DataSource(dataSource => dataSource
                    .PageSize(50) // Render 50 articles on page load.
                    .ServerOperation(false)
                )
            )
        </div>
        // Don't forget to add your template script. This is just an example of what a news article might look like.
        <script type="text/x-kendo-template" id="template">
            <div>
                <p>#:Headline#</p>
                <p>#:ArticleText#</p>
            </div>
        </script>
    ```

1. Manipulate the ListView behavior on the front end by using JavaScript or jQuery. This particular solution is implemented with jQuery. The code comments explain what is happening. It also contains many `console.log` statements commented out. If you comment them in, you can track what is happening within the browser console as you scroll.

    ```Script
        var wh;
        var dh;
        // Determines weather or not to use the window's height or the document's height.
        // This will vary depending on whatever else you might have on your page, but for me it made sense to use window's height initially, and then switch to document's height after the first lazy load.
        var useDocument = false; 
        $(function () {
            // Insert this code after the ListView declaration.
            // Unset the height, so that there will be no scroll bar in the ListView, and to ensure that the component takes up all the vertical space it needs.
            $('.k-listview-content')
                .css('height', 'unset')
                .css('overflow', 'hidden');

            wh = $(window).height();
            dh = $(document).height();

            let lv = $('#newsListView').data('kendoListView');
            $(window).on('scroll', function () {
                let pageSize = lv.dataSource._pageSize;
                let numberOfDataItems = lv.dataSource._data.length;
                //console.log('numberOfDataItems is: ', numberOfDataItems);
                // Once the page size is greater than or equal to the total number of data items, it is no longer need to increment the page size.
                if (pageSize < numberOfDataItems) {
                    wh = $(window).height();
                    dh = $(document).height();
                    let currentScrollPosition = $(document).scrollTop();
                    let heightToUse = wh;
                    // This is an example of some other logic you might use, where you base using window or document height based on the current scroll position. You can use whatever logic suits your use case the best.
                    //if (currentScrollPosition > wh) {
                    //    heightToUse = dh;
                    //}
                    if (useDocument) {
                        heightToUse = dh;
                    }
                    let percentScrolled = currentScrollPosition / heightToUse;
                    //console.log('window was scrolled to position: ' + currentScrollPosition);
                    //console.log('window height is: ' + wh);
                    //console.log('document height is: ' + dh);
                    //console.log('heightToUse is: ' + heightToUse);
                    //console.log('percentScrolled is: ' + percentScrolled);
                    // Here you must choose at what percent scrolled down on the browser vertical scroll you would like to initiate the subsequent lazy load. Here you can see once the browser is scrolled down 65% of the way, more content will be lazy loaded into the ListView.
                    if (percentScrolled >= .65) {
                        useDocument = true; // Use window height on first instance of adding more data to view. On all subsequent ones use the document height.
                        //console.log('Window scrolled past threshold, load more data');
                        // See if it's possible to load more data into the ListView
                        //console.log('listview is:', lv);
                        //console.log('the page size is currently: ', pageSize);
                        let totalRecords = lv.options.dataSource.total;
                        if (pageSize < totalRecords) {
                            let newPageSize = pageSize + 100; // Load up to 100 more items by increasing the page size. This can be set to whatever suits your use case the best.
                            newPageSize = Math.min(newPageSize, totalRecords);
                            //console.log('New page size will be: ' + newPageSize);
                            lv.dataSource.pageSize(newPageSize); // Updating the ListView's page size will allow the component to render and show additional items.
                            lv.refresh();
                            // Need to make height unset.
                            $('.k-listview-content').css('height', 'unset');
                            //console.log(lv);
                            //console.log('dataItems are: ', lv.dataItems());
                        }
                    }
                }
            });
        });
    ```

1. By default, the ListView has a border. For a full-page implementation, you can remove it with the following CSS:

    ```Styles
        .k-listview {
            border: none;
        }
    ```

## Summary

What is happening here is the following:
* The height of the ListView component is removed. 
* The `PageSize()` property of the DataSource specifies the desired number of items during the initial page load.
* More items load when the browser vertical scrollbar reach an exact percentage of the way down the page. Instead of inserting more items into the array of shown items, you can increase the page size by the amount of additional items you want to load. The ListView component will take care of the rest behind the scenes. As a result, the ListView will grow as far as down the page as it needs to as it continues to render more items lazily. The component will be controlled by the browser scrollbar instead of its own scrollbar.

## More {{ site.framework }} ListView Resources

* [{{ site.framework }} ListView Documentation]({%slug htmlhelpers_listview_aspnetcore%})

* [{{ site.framework }} ListView Demos](https://demos.telerik.com/{{ site.platform }}/listview/index)

{% if site.core %}
* [{{ site.framework }} ListView Product Page](https://www.telerik.com/aspnet-core-ui/listview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ListView Product Page](https://www.telerik.com/aspnet-mvc/listview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ListView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [Server-Side API Reference of the ListView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/listview)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

