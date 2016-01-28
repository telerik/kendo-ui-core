---
title: Performance
page_title: Performance | Kendo UI Hybrid Components
description: "Efficiently use the hybrid Kendo UI components and handle performance issues to speed up View transitions."
slug: performance_hybridkendoui
position: 3
---

# Performance

This article lists some approaches for you to apply so that you achieve a better performance of the hybrid Kendo UI components.

## Tips and Tricks

### Disable Hardware Acceleration on Android 4.x

On Android 4.x Google introduced OpenGL hardware acceleration in the native-browser rendering routines. While this improves the native scrolling fluidity and page rendering times, it detaches the rendering from the browser. This results in a number of performance issues which mainly manifest themselves as hardware accelerated CSS3 transitions happening much later than invoked and even finishing later than when the corresponding transition end event is fired. Unfortunately, this is unavoidable in the native browser, but in an application, such as PhoneGap, the OpenGL hardware acceleration can be switched off, resulting in much faster reacting transitions, while a little choppy. To do this, open your `AndroidManifest.xml` and update your application activity to disable the hardware acceleration as demonstrated in the example below.

###### Example

    ...
    <activity
        ...
        android:hardwareAccelerated="false" >
    ...

### Avoid Heavy Lifting on Changing Views

To speed up View transitions, make sure you have your data ready beforehand. For instance, if you load data from a service, initialize your data sources while the application is still initializing, create your ListViews in a View `init` event handler (do not recreate them every time) and then only refresh them on View show, as shown in the example below:

###### Example

    <div id="listView" data-role="listview" data-init="initList" data-show="viewShow"></div>

    <script>
        function initList() {
            myListView = $("#listView").kendoMobileListView({
                dataSource: dataSource
            }).data("kendoMobileListView");
        }

        function viewShow() {
            myListView.refresh();
        }
    </script>

## See Also

Articles on Hybrid UI components in Kendo UI:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [Native Scrolling]({% slug nativescrolling_hybrid_kendoui %})
* [Overview of the Application for Mobile]({% slug overview_hybridapplication %})
