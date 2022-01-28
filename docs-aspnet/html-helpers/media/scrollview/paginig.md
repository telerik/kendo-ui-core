---
title: Paging
page_title: Paging
description: "Get started with the Telerik UI ScrollView HtmlHelper for {{ site.framework }} and learn how to enable its paging functionality."
slug: htmlhelpers_scrollview_aspnetcore_paging
position: 3
---

# Paging

By default, the pager of the Telerik UI ScrollView for {{ site.framework }} is enabled.

If the pager is set to `false`, the ScrollView will not display a pager.

    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false) // The ScrollView will not display a pager.
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

## See Also

* [Basic Usage of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/index)
* [Server-Side API](/api/scrollview)
