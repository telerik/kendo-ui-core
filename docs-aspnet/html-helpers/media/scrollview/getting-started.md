---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} ScrollView component by following a complete step-by-step tutorial."
components: ["scrollview"]
slug: aspnetcore_scrollview_getting_started
position: 1
---

# Getting Started with the ScrollView

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} ScrollView and highlights the major steps in the configuration of the component.

You will initialize a ScrollView and learn how to scroll to a view. Then, you will see how to attach an event handler to the component. 
{% if site.core %}
Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the component.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} ScrollView](./images/scrollview-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, paragraphs, and others.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>ScrollView with event handler</h4>
<p>
</p>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
<h4>ScrollView with event handler</h4>
<p>
</p>
```
{% endif %}

## 2. Initialize the ScrollView

Use the ScrollView HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the ScrollView element.
* The `ContentHeight()` configuration method sets the height of the ScrollView content.
* The `Items()` configuration method sets the items in the ScrollView.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>ScrollView with event handler</h4>
<p>
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false)
                .ContentHeight("100%")
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Custom()
                          .Type("odata-v4")
                          .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/service/v2/odata/Products")))
                          .ServerPaging(true)
                          .PageSize(3))
                .HtmlAttributes(new { style = "height:500px; width:890px; max-width: 100%;" })
    )
</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px;  background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }
</script>

<style>
    .k-scrollview-wrap .img-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        align-items: center;
        justify-content: space-around;
        text-align: center;
    }

    .k-scrollview-wrap .img-wrapper>div {
        width: 30%;
        min-width: 150px;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 1em;
    }

    .k-scrollview-wrap .img-wrapper>div>div {
        margin: auto;
        margin-bottom: 0.5em;
    }
</style>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<p>

    <kendo-scrollview name="scrollView" enable-pager="false" content-height="100%" template-id="scrollview-template" style="height:500px; width:890px; max-width: 100%;">
        <datasource custom-type="odata-v4" page-size="3" server-paging="true">
            <transport>
                <read url="https://demos.telerik.com/service/v2/odata/Products" />
            </transport>
        </datasource>
    </kendo-scrollview>

</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }
</script>

<style>

    div.k-scrollview ul.k-scrollview-wrap > li {
        text-align: center;
        display: table;
        box-sizing: border-box;
    }

    ul.k-scrollview-wrap > li > .img-wrapper {
        padding: 2em;
        display: table-cell;
        vertical-align: middle;
    }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

            ul.k-scrollview-wrap > li > .img-wrapper > div > div {
                margin: auto;
                margin-bottom: 0.5em;
            }

</style>
```
{% endif %}

## 3. Use the Duration Configuration of the ScrollView

The next step is to configure Duration configuration. The `Duration` (in milliseconds) for the ScrollView is used to snap to the current page after the user releases it.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>ScrollView with event handler</h4>
<p>
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false)
                .ContentHeight("100%")
                .Duration(1500)
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Custom()
                          .Type("odata-v4")
                          .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/service/v2/odata/Products")))
                          .ServerPaging(true)
                          .PageSize(3))
                .HtmlAttributes(new { style = "height:500px; width:890px; max-width: 100%;" })
    )
</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px;  background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }
</script>

<style>
    .k-scrollview-wrap .img-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        align-items: center;
        justify-content: space-around;
        text-align: center;
    }

    .k-scrollview-wrap .img-wrapper>div {
        width: 30%;
        min-width: 150px;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 1em;
    }

    .k-scrollview-wrap .img-wrapper>div>div {
        margin: auto;
        margin-bottom: 0.5em;
    }
</style>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<p>

    <kendo-scrollview name="scrollView" enable-pager="false" content-height="100%" duration=1500 template-id="scrollview-template" style="height:500px; width:890px; max-width: 100%;">
        <datasource custom-type="odata-v4" page-size="3" server-paging="true">
            <transport>
                <read url="https://demos.telerik.com/service/v2/odata/Products" />
            </transport>
        </datasource>
    </kendo-scrollview>

</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }
</script>

<style>

    div.k-scrollview ul.k-scrollview-wrap > li {
        text-align: center;
        display: table;
        box-sizing: border-box;
    }

    ul.k-scrollview-wrap > li > .img-wrapper {
        padding: 2em;
        display: table-cell;
        vertical-align: middle;
    }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

            ul.k-scrollview-wrap > li > .img-wrapper > div > div {
                margin: auto;
                margin-bottom: 0.5em;
            }

</style>
```
{% endif %}

## 4. Handle a ScrollView Event

The ScrollView exposes a `Change()` event that you can handle and assign specific functions to the component. In this tutorial, you will use the `Change()` event to display a message when the page is changed.

```HtmlHelper
@using Kendo.Mvc.UI
<h4>ScrollView with event handler</h4>
<p>
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false)
                .ContentHeight("100%")
                .Duration(1500)
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Custom()
                          .Type("odata-v4")
                          .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/service/v2/odata/Products")))
                          .ServerPaging(true)
                          .PageSize(3))
                .HtmlAttributes(new { style = "height:500px; width:890px; max-width: 100%;" })
                .Events(e => e.Change("onChange"))
    )
</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px;  background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }

    function onChange(){
        console.log("change");
    }
</script>

<style>
    .k-scrollview-wrap .img-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        align-items: center;
        justify-content: space-around;
        text-align: center;
    }

    .k-scrollview-wrap .img-wrapper>div {
        width: 30%;
        min-width: 150px;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 1em;
    }

    .k-scrollview-wrap .img-wrapper>div>div {
        margin: auto;
        margin-bottom: 0.5em;
    }
</style>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<p>

    <kendo-scrollview name="scrollView" enable-pager="false" content-height="100%" duration=1500 template-id="scrollview-template" style="height:500px; width:890px; max-width: 100%;">
        <datasource custom-type="odata-v4" page-size="3" server-paging="true" on-change="onChange">
            <transport>
                <read url="https://demos.telerik.com/service/v2/odata/Products" />
            </transport>
        </datasource>
    </kendo-scrollview>

</p>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
            <p>#= data[i].ProductName #</p>
        </div>
        # } #
    </div>
</script>
<script>
    function setBackground(id) {
        return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
    }

    function onChange(){
        console.log("change");
    }
</script>

<style>

    div.k-scrollview ul.k-scrollview-wrap > li {
        text-align: center;
        display: table;
        box-sizing: border-box;
    }

    ul.k-scrollview-wrap > li > .img-wrapper {
        padding: 2em;
        display: table-cell;
        vertical-align: middle;
    }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

            ul.k-scrollview-wrap > li > .img-wrapper > div > div {
                margin: auto;
                margin-bottom: 0.5em;
            }

</style>
```
{% endif %}

For more examples, refer to the [demo on using the events of the ScrollView](https://demos.telerik.com/{{ site.platform }}/scrollview/events).

## 5. (Optional) Reference Existing ScrollView Instances

You can reference the ScrollView instances that you have created and build on top of their existing configuration:

1. Use the `id` attribute of the component instance to establish a reference.

    ```JS script
    <script>
        var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView; // scrollView is a reference to the existing scrollView instance of the helper.
    </script>
    ```
1. Use the [ScrollView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview#methods) to control the behavior of the widget. In this example, you will use the `next` method to switch to the next page with an animation.
    ```JS script
    <script>
        var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView; // scrollView is a reference to the existing scrollView instance of the helper.
        scrollView.next();
    </script>
    ```
For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

## Explore this Tutorial in REPL
You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:
* [Sample code with the ScrollView HtmlHelper](https://netcorerepl.telerik.com/cxbQlpbS41C5RHBh28)
{% if site.core %}
* [Sample code with the ScrollView TagHelper](https://netcorerepl.telerik.com/mRvGFzFe41TWZT9V52)
{% endif %}
## Next Steps
* [Use Paging for the ScrollView]({% slug htmlhelpers_scrollview_aspnetcore_paging %})
* [Use Templates for the ScrollView]({% slug htmlhelpers_scrollview_aspnetcore_templates %})
* [Use Keyboard Navigation for the ScrollView]({% slug htmlhelpers_scrollview_accessibility_keyboard_navigation_aspnetcore %})
## See Also
* [Using the API of the ScrollView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/api)
* [Client-Side API of the ScrollView](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
* [Server-Side API of the ScrollView](/api/scrollview)
* [Knowledge Base Section](/knowledge-base)