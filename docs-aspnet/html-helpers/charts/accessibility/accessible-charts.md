---
title: Accessible Charts
page_title: Accessible Charts
description: "Learn different tips and tricks on how to make the {{ site.product }} Charts accessible."
previous_url: /accessibility/five-tips-for-accessible-charts-with-dataviz
slug: accessible_charts
position: 2
---

# Accessible Charts

This article provides practical tips, code samples, and illustrative videos to help make {{ site.product }} Charts and graphs more accessible for users with disabilities.

## Data Visualization

While {{ site.product }} allows you to create visual charts and graphs that enhance textual or tabular data, the Charts and graphs fall into the "non-text content" category. Even though they are not accessible out of the box, you can include specific settings in them and make them accessible.

The <a href="https://www.youtube.com/watch?v=lymGnquNxBg&feature=youtu.be" target="_blank">next video</a> demonstrates the use of the popular VoiceOver screen reader on Apple OS X to navigate a Donut Chart.

<iframe width="853" height="480" src="https://www.youtube.com/embed/lymGnquNxBg" frameborder="0" allowfullscreen></iframe>

The video above shows the use of a screen reader providing audible descriptions of the chart's title and the values in the legend. Because the {{ site.product }} creates charts by using inline `SVG` elements, and `SVG` is markup, VoiceOver is able to drill into the chart and piece together a reasonable representation of the content which would not have been possible if the Charts needed a `canvas` element to create them.

Also, the screen reader in the video does not select the chart exactly but rather starts reading the title. Even though the reader can access and read legend values, you can make the Chart more accessible for users with disabilities.

## Improve Charts Accessibility

This section contains quick steps for improving the accessibility of the charts and enhancing the value of the content altogether, which you can use separately or in combination. <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">SVG</a> is the technology that powers the {{ site.product }} Charts and is accessible out of the box.

The following approaches can help you make the charts and graphs more accessible to users with disabilities:

* [Provide text descriptions](#providing-text-descriptions).
* [Add "role" and "title" attributes to Chart elements](#adding-role-and-title-to-chart-elements).
* [Add "title" and "desc" elements to the root of SVG elements](#adding-title-and-desc-to-the-root-of-svg-elements).
* [Generate accessible data tables from data sources](#generating-accessible-data-tables-from-data-sources). 
* [Create off-screen tables and swap on-screen tables and charts](#creating-off-screen-tables-and-swap-on-screen-tables-and-charts).

### Providing Text Descriptions

1. Add a plain-text description of your Chart to the page by using the following markup.

    ```HTML
        <figure>
            <figcaption>
                In 2008, Spain produced electricity for its residents in four ways.
                Chief among these was Nuclear power which accounted for approximately 49% of production.
                Next were Wind and Hydro-electric power which produced
                27% and 22% of the nation's electricity, respectively.
                In a distant fourth was Solar power,
                which accounted for only 2% of all electricity produced by the country.
            </figcaption>
        </figure>
    ```

1. Define the Chart in the `figure` tag. Your goal is to provide users with disabilities with the key information they can find in your chart, which can vary depending on the data.

    ```HtmlHelper
        <figure>
            @(Html.Kendo().Chart()
                .Name("chart")
                .Title("Sources of Electricity Produced in Spain, 2008")
                .Legend(legend => legend
                .Position(ChartLegendPosition.Bottom)
                .Labels(labels => labels.Template("#= text # (#= value #%)"))
                )
                .SeriesDefaults(seriesDefaults => seriesDefaults
                        .Donut()
                        .Labels(labels => labels
                            .Visible(true)
                            .Position(ChartSeriesLabelsPosition.OutsideEnd)
                            .Format("{0}%")
                        )
                )
                .Series(series => {
                    series.Donut(new dynamic[] {
                        new {category = "Hydro",value = 22},
                        new {category = "Solar",value = 2},
                        new {category = "Nuclear",value = 49},
                        new {category = "Wind",value = 27}
                });
                })
                .Tooltip(tooltip => tooltip
                .Visible(true)
                .Format("{0}%")
                )
            )
        </figure>
    ```
    {% if site.core %}
    ```TagHelper
        <figure>
            <kendo-chart name="chart">
                <chart-title text="Sources of Electricity Produced in Spain, 2008"></chart-title>
                <chart-legend position="ChartLegendPosition.Bottom">
                    <labels template="#= text # (#= value #%)"></labels>
                </chart-legend>
                <series-defaults type="ChartSeriesType.Donut">
                    <labels visible="true" position="outsideEnd" format="{0}%"></labels>
                </series-defaults>
                <series>
                    <series-item data='new dynamic[] {
                        new {category = "Hydro",value = 22},
                        new {category = "Solar",value = 2},
                        new {category = "Nuclear",value = 49},
                        new {category = "Wind",value = 27}
                    }'>
                    </series-item>
                </series>
                <tooltip visible="true" format="{0}%"></tooltip>
            </kendo-chart>
        </figure>
    ```
    {% endif %}

To review and test the complete example, refer to the following [Telerik REPL sample](https://netcorerepl.telerik.com/wwEblVFe50NmQ1G855).

For more information, refer to the [brief video](https://www.youtube.com/watch?v=QyB3sTVRd3E&feature=youtu.be) of VoiceOver, which interacts with the `figcaption` element.

<iframe width="853" height="480" src="https://www.youtube.com/embed/QyB3sTVRd3E" frameborder="0" allowfullscreen></iframe>

### Adding Role and Title to Chart Elements

To enhance the accessibility of the Chart, you can also add WAI-ARIA `role` and `title` attributes to the chart element using the `HtmlAttributes` configuration.

```Razor
    .HtmlAttributes(new { role="img",title="Sources of Electricity Produced in Spain, 2008" })
```
In the [previous video](https://www.youtube.com/watch?v=QyB3sTVRd3E&ab_channel=KendoUI), even though VoiceOver reads the title and title legend of the Chart, it is not able to select the container or tell that the user is interacting with an HTML element. By adding a role of `img` and a `title`, VoiceOver can do both, which is demonstrated in the first 15 seconds of the video.

### Adding Title and Desc to the Root of SVG Elements

Another option is to manually add the `title` and `desc` elements to the `SVG` element that the {{ site.product }} creates. Screen readers are able to leverage these elements as fallback content that will be read to users with disabilities. 

> At the time of this article, VoiceOver and possibly the other major screen readers do not reflect the `title` and `desc` elements. However, the suggested technique is explicitly stated in the W3C [guidelines for accessible SVG](https://www.w3.org/TR/SVG-access/), and this approach is recommended.

1. Create a template `script` block for the `<title>` and `<desc>` elements.

    ```HTML
        <script id="chartTmpl" type="text/x-kendo-tmpl">
            <title>#= title #</title>
            <desc>#= description #</desc>
        </script>
    ```

1. Load the HTML content to the [`kendo.template()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) method and render the template by using the `chartDetails` object.
1. Use jQuery to select the `svg` element inside the `div` of the Chart and prepend the `title` and `description` to the beginning of that element.

    ```JS
        $(document).ready(function(){
            makeChartAccessible();
        });

        var chartDetails = {
            title: "Sources of Electricity Produced in Spain, 2008",
            description: "Graphic illustrating, by percentage, the four primary electricity sources for Spain in 2008."
        };

        function makeChartAccessible() {
            var template = kendo.template($("#chartTmpl").html());
            $('#chart svg').prepend(template(chartDetails));
        }
    ```

For the complete example, refer to the following [Telerik REPL sample](https://netcorerepl.telerik.com/cQOvFBvf24JM6fxL26).

### Generating Accessible Data Tables from Data Sources

This approach deals with creating a data table to serve as an alternative or a supplement to the Chart or graph. Assuming you are using a DataSource to populate the Chart, you can use the same DataSource and the [Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview) to create a tabular representation of the same data. 

1. Create a template `script` block for the table.

    ```HTML
        <script id="tableScript" type="text/x-kendo-tmpl">
            <table id="chartTable">
            <caption>1024x768 screen resolution trends</caption>
            <tr>
                <th scope="col">Resolution</th>
                <th scope="col">Year</th>
            </tr>
            # for(var i = 0, len = data.length; i < len; i++) { #
                <tr>
                <th scope="row">#= data[i].Resolution #</th>
                <td>#= data[i].Year #</td>
                </tr>
            # } #
            </table>
        </script>
    ```

1. Subscribe to the [`Change`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#changesystemstring) event of the DataSource and provide a handler. Inside the handler, pass the template script into a [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/overview), render it with the DataSource, and add the table to the page.

    ```JS
        <script>
            function onChange(){
                var chartData = $("#chart").data("kendoChart").dataSource.data();
                var template = kendo.template($("#tableScript").html());
                $("#main").prepend(template(chartData));
            }
        </script>
    ```

As a result, you create a simple and accessible table based on the same data as the Chart itself. 

For the complete example, refer to the following [Telerik REPL sample](https://netcorerepl.telerik.com/cGElnvbe56GxmRpH44).

For more information on the way VoiceOver allows you to interact with the table, refer to the [quick video](https://www.youtube.com/watch?v=0xdrBjwiFVA&ab_channel=KendoUI).

<iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

### Creating Off-Screen Tables and Swap On-Screen Tables and Charts

The next two approaches let you create a data table serving as an alternative or a supplement to the Chart or graph for the cases when you do not want to display the raw data with the Chart for all users on-screen:

* Place the table off-screen to make it invisible to sighted users but available to screen readers.

    To make the table invisible to sighted users but available to screen readers, create a CSS class called `hidden`, which will position any element at 10,000 pixels to the left and off-screen.

    ```CSS
        .hidden {
          position:absolute;
          left:-10000px;
          top:auto;
          width:1px;
          height:1px;
          overflow:hidden;
        }
    ```
    As a result, the data table is no longer on the screen but is accessible to screen readers as demonstrated in the [following video] (https://www.youtube.com/watch?v=0xdrBjwiFVA&ab_channel=KendoUI)

    <iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

    For the complete example, refer to the following [Telerik REPL sample](https://netcorerepl.telerik.com/GwklHPly54SUlKZf11).

* Provide all users with the ability to switch between the Chart and the table.

    Place a link or button on the screen that allows the user to swap between the table and the chart. This approach enhances the   experience for all users by letting them choose which presentation of the data they prefer.

    The example below shows how to add a **Show Table** button on the screen. When the user clicks the button, the Chart is hidden, the table is displayed, and the button's label changes to **Show Chart**.

    ```
        @(Html.Kendo().Button()
            .Name("tableBtn")
            .FillMode(ButtonFillMode.Solid)
            .ThemeColor(ThemeColor.Base)
            .Content("Show Table")
            .Events(e=>e.Click("onClick"))
        )

        <script>
            function onClick(){
                var chart = $("#chart");
                var chartTable = $("#chartTable");

                if (chartTable.hasClass('hidden')) {
                    chart.addClass('hidden');
                    chartTable.removeClass('hidden');
                    $(this.element).find(".k-button-text").text("Show Chart");
                } else {
                    chartTable.addClass('hidden');
                    chart.removeClass('hidden');
                    $(this.element).find(".k-button-text").text("Show Table");
                }
            }
        </script>
    ```

    As a result, VoiceOver users can choose with which representation they wish to interact as demonstrated in the [following video](https://www.youtube.com/watch?v=kZNz1H2Zp3U&feature=relmfu).

    <iframe width="853" height="480" src="https://www.youtube.com/embed/kZNz1H2Zp3U" frameborder="0" allowfullscreen></iframe>

    For the complete example, refer to the following [Telerik REPL sample](https://netcorerepl.telerik.com/wzYPkBPT30o3O5DX47).

## See Also

* [Section 508](https://section508.gov/)
* [WCAG 2.2 (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)
* [W3C SVG Accessibility Guidelines](https://www.w3.org/TR/SVG-access/)
* [HTML5 Accessibility: SVG Text (Paciello Group Blog Post)](https://developer.paciellogroup.com/blog/2011/08/html5-accessibility-chops-interactive-image-example/)
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})