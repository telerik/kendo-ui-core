---
title: Performance
page_title: Mobile performance tips and tricks | Kendo UI Mobile framework Docs
description: Tricks and tips which help you use efficiently Kendo UI Mobile app development framework. Handle performance issues and speed up View transitions.
---

# Kendo UI Mobile Performance Tips and Tricks

## Disable HW acceleration in Android 4

In Android 4.x Google introduced OpenGL hardware acceleration in the native browser rendering routines. While this improves the native scrolling fluidity and page rendering times,
it detaches the rendering from the browser. This results in a number of performance issues which mainly manifest themselves as hardware accelerated
CSS3 transitions happening much later than invoked and even finishing later than when the corresponding transition end event is fired. Unfortunately this is unavoidable in the native
browser, but in an application (e.g. in PhoneGap) the OpenGL hardware acceleration can be switched off, resulting in much faster reacting transitions, while a little choppy. To do
this, open your AndroidManifest.xml and update your application activity to disable the hardware acceleration:

    ...
    <activity
        ...
        android:hardwareAccelerated="false" >
    ...

## Don't do heavy lifting on changing views

In order to speed up View transitions, make sure you have your data ready beforehand. For instance if you load data from a service, you can initialize your data sources while the
application is still initializing, create your ListViews in a View init event handler (don't recreate them every time) and then only refresh them on View show, like this:

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

