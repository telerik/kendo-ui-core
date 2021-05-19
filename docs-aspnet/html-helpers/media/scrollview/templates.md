---
title: Templates
page_title: Templates
description: "Get started with the Telerik UI ScrollView HtmlHelper for {{ site.framework }} and learn how to use templates for configuring its items."
slug: htmlhelpers_scrollview_aspnetcore_templates
position: 2
---

# Templates

You can configure the items of the ScrollView by using [plain HTML and CSS](#html-template), by setting a [dynamic template](#dynamic-template), or by using a [no-item template](#no-item-template).

## HTML Template

The following example demonstrates how to use HTML templates to set the ScrollView items.

```Razor
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .ContentHeight("100%")
                .Items(x =>
                {
                    x.Add().Content("<div class='photo photo1'></div>");
                    x.Add().Content("<div class='photo photo2'></div>");
                    x.Add().Content("<div class='photo photo3'></div>");
                    x.Add().Content("<div class='photo photo4'></div>");
                    x.Add().Content("<div class='photo photo5'></div>");
                    x.Add().Content("<div class='photo photo6'></div>");
                    x.Add().Content("<div class='photo photo7'></div>");
                    x.Add().Content("<div class='photo photo8'></div>");
                    x.Add().Content("<div class='photo photo9'></div>");
                    x.Add().Content("<div class='photo photo10'></div>");
                })
                .HtmlAttributes(new { style = "height:748px; width:1022px; max-width: 100%;" })
    )
```
```CSS
    <style>

        .photo {
            display: inline-block;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            width:inherit;
            height:inherit;
        }

        .photo1 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo2 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo3 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo4 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo5 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo6 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo7 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo8 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo9 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }

        .photo10 {
            background-image: url("../shared/images/photos/@(random.Next(1,30)).jpg");
        }
    </style>
```

## Dynamic Template

The ScrollView allows for configuring a dynamic template which loops through all of its data items.

```Razor
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false)
                .ContentHeight("100%")
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Custom()
                          .Type("odata")
                          .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products")))
                          .ServerPaging(true)
                          .PageSize(3))
                .HtmlAttributes(new { style = "height:600px; width:890px; max-width: 100%;" })
    )
```
```JavaScript
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

## No-Item Template

The following example demonstrates how to set a template when no ScrollView items will be displayed.

```Razor
    @(Html.Kendo().ScrollView()
            .Name("scrollview")
            .EmptyTemplateId("scrollview-empty")
    )
```
```JavaScript
    <script id="scrollview-empty" type="text/x-kendo-template">
    <div style="width: 100%; height: 100%; background-color: red;">empty</div>
    </script>
```

## See Also

* [Basic Usage of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/index)
* [Server-Side API](/api/scrollview)
