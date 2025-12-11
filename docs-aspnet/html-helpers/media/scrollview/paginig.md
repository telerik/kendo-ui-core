---
title: Paging
page_title: Paging
description: "Get started with the Telerik UI ScrollView component for {{ site.framework }} and learn how to enable its paging functionality."
components: ["scrollview"]
slug: htmlhelpers_scrollview_aspnetcore_paging
position: 3
---

# Paging

By default, the pager of the Telerik UI ScrollView for {{ site.framework }} is enabled.

If the pager is set to `false`, the ScrollView will not display a pager.

```HtmlHelper
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false) // The ScrollView will not display a pager.
                .ContentHeight("100%")
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Custom()
                          .Type("odata-v4")
                          .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/service/v2/odata/Products")))
                          .ServerPaging(true)
                          .PageSize(3))
                .HtmlAttributes(new { style = "height:600px; width:890px; max-width: 100%;" })
    )

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
```
{% if site.core %}
```TagHelper
    <kendo-scrollview name="scrollView" content-height="100%" 
                                        enable-pager="false"
                                        template-id="scrollview-template" 
                                        style="height:600px; width:890px; max-width: 100%;">
        <datasource custom-type="odata-v4" page-size="3" server-paging="true">
            <transport>
                <read url="https://demos.telerik.com/service/v2/odata/Products" />
            </transport>
        </datasource>
    </kendo-scrollview>

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
```
{% endif %}

## Using Overlay

The ScrollView component provides the PagerOverlay property which sets an overlay background color for the pager. It can be configured to one of the three possible values:
- `none` - no background overlay is set
- `dark` - sets a dark-colored background overlay
- `light` - sets a light-colored background overlay

```HtmlHelper
    <style>
        h1 {
            margin-top: 30%;
            text-align:center;
        }
    </style>
    @(Html.Kendo().ScrollView()
            .Name("scrollView")
            .PagerOverlay("dark")
            .ContentHeight("100%")
            .Items(x =>
            {
                x.Add().Content("<h1>One</h1>");
                x.Add().Content("<h1>Two</h1>");
                x.Add().Content("<h1>Three</h1>");
            })
            .HtmlAttributes(new { style = "height:748px; width:1022px; max-width: 100%;" })
    )
```
{% if site.core %}
```TagHelper
   <kendo-scrollview name="scrollView" content-height="100%" pager-overlay="dark" style="height:600px; width:890px; max-width: 100%;">
        <items>
            <scrollview-item>
                <content>
                    <h1>One</h1>
                </content>
            </scrollview-item>
            <scrollview-item>
                <content>
                    <h1>Two</h1>
                </content>
            </scrollview-item>
            <scrollview-item>
                <content>
                    <h1>Three</h1>
                </content>
            </scrollview-item>
        </items>
    </kendo-scrollview>
    <style>
        h1 {
            margin-top: 30%;
            text-align:center;
        }
    </style>
```
{% endif %}

## See Also

* [Basic Usage of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/index)
* [Server-Side API](/api/scrollview)
