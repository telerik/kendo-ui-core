---
title: Paging
page_title: Paging
description: "Configure the Telerik UI ListView for {{ site.framework }} to enable its paging functionality."
components: ["listview"]
slug: htmlhelpers_listview_aspnetcore_paging
position: 5
---

# Paging

By default, the paging functionality of the Telerik UI ListView for {{ site.framework }} is disabled.

To control the paging in the ListView, use the `Pageable` option. Additionally, you have to specify the number of records to display on each page by setting the `PageSize` on the DataSource.

```HtmlHelper
	@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
		  .Name("listview")  
          ...	
          .TagName("div") 	  
		  .Pageable()
		  .DataSource(dataSource => dataSource
			    .Ajax()
				.PageSize(15)
				...
		  )
	)
```
{% if site.core %}
```TagHelper
    <kendo-listview name="listView"
        tag-name="div">
        <pageable enabled="true" />
        <datasource type="DataSourceTagHelperType.Ajax" page-size="15">
        </datasource>
    </kendo-listview>
```
{% endif %}

Try to do paging operations on the server to avoid loading too much data in the HTML, which might slow down page performance. To accomplish this, keep the `ServerOperation` of the DataSource to its default `true` value.

You can change the available page sizes from which the user can choose with an array with integer values that are set to the `PageSizes` property.

```HtmlHelper
    .Pageable(p=> {
        p.PageSizes(new[] { 5, 10, 30 });
    })
```
{% if site.core %}
```TagHelper
    <pageable refresh="true" button-count="5" page-sizes="new[] { 5, 10, 30 }"
```
{% endif %}

Use as small page sizes as possible, because rendering too many records causes performance issues especially when the ListView renders many columns or complex templates for its cells.	

* The `ButtonCount` method specifies the number of numeric buttons that have to be displayed in the pager. By default, the number of displayed buttons is 10.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager.ButtonCount(15))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable  button-count="15" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}


* The `Enabled` method enables or disables paging. Use it when you need to enable paging based on a condition.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager.Enabled((bool)ViewData["EnablePager"]))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable enabled="(bool)ViewData["EnablePager"]" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}

* The `Info` method specifies whether to show additional paging info. By default, the pager displays the total number of items in the ListView and the first and last item number&mdash;for example, `"1-50 of 50 items"`. If the ListView is empty, the pager will show `"No items to display"`. The paging information is displayed by default.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager.Info(false))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable info="false" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}


* The `Input` method specifies whether to show a textbox for typing in a page number. By default, such a textbox is not shown.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager.Input(true))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable input="true" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}

* The `Numeric` method sets the numeric pager. When enabled, the pager will display numeric pager buttons. Numeric paging is enabled by default.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager
                .Numeric(false)
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable numeric="false" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}

* The `PreviousNext` method enables or disables the `Previous`, `Next`,`First` and `Last` pager buttons. These buttons navigate to the corresponding page when clicked. By default, the method is enabled.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager
                .PreviousNext(false)
            )
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable previous-next="false" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}

* The `Refresh` method enables or disables the `Refresh` pager button. Clicking that button reloads the current page. By default, the method is disabled.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(pager => pager
                .Refresh(true)
            )
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable refresh="true" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}


* The `Responsive` method enables or disables the Listview's Pager responsive capabilities (information about number of items displayed per page, currently selected page, total available items, etc). This information will be partly or completely hidden based on the width of the ListView. The responsiveness is enabled by default.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(p => p.Responsive(false))
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable responsive="false" />
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}


* The ListView Pager provides `Localization` options for defining the text of its messages. To localize the messages, set the desired strings in the `PagerMessagesSettingsBuilder` configurator.

    ```HtmlHelper
        @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("listview")
            .TagName("div") 
            .Pageable(p => p.Messages(m=>{
                    m.Refresh("Refresh data");
                    m.Display("Showing {0}-{1} from {2} data items");
                })
            )
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-listview name="listView"
            tag-name="div">
            <pageable>
                <messages refresh="Refresh data" display="Showing {0}-{1} from {2} data items" />
            </pageable>
            <datasource type="DataSourceTagHelperType.Ajax">
                <read url="@Url.Action("Products_Read", "Home")" />
            </datasource>
        </kendo-listview>
    ```
    {% endif %}


## See Also

* [Pager Component Demo](https://demos.telerik.com/{{ site.platform }}/pager)
* [Pager Localization](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/pager/globalization/localization)
* [Paging by the ListView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/index)
* [Server-Side API](/api/listview)
