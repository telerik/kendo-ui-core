---
title: Charts
page_title: Charts - Telerik UI for ASP.NET Core Accessibility Support
description: "Learn more tips and tricks how to make {{ site.product }} Charts accessible."
slug: charts_accessibility_support
position: 8
---

# Charts

This article provides practical tips, code samples, and illustrative videos for making disabled users interact more easily with {{ site.product }} charts and graphs.

## Accessibility Standards

The basic accessibility standards are:
* [Section 508 (Latest Amendment)](https://www.access-board.gov/the-board/laws/rehabilitation-act-of-1973#508)
* [WCAG 2 Quick Reference Guide](https://www.w3.org/WAI/WCAG21/quickref/)
* [Accessible Rich Internet Applications (WAI-ARIA) 1.1](https://www.w3.org/TR/wai-aria-1.1/)

Section 508 specifies the law which governs the creation of accessible software for government entities in the United States. WCAG and WAI-ARIA contain a comprehensive set of guidelines for creating accessible websites and applications.

The fundamental requirement that refers to and is fulfilled by the Kendo UI data visualization components is:
* Section 508&mdash;"(a) A text equivalent for every non-text element shall be provided (e.g., via `alt`, `longdesc`, or in-element content)."
* WCAG 2.2&mdash;"Guideline 1.1 Text Alternatives: Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language."

Providing text equivalents for non-text content is a key tenant of accessibility. Visual content, such as images, animations, video, and audio resources, is a valuable asset for each web application and website. However, these visual elements are impossible to parse by screen readers and other assistive technologies and cannot be enjoyed by disabled users. That is why, both Section 508 and WCAG require that all non-decorative and non-text content has to be made accessible to assistive technologies.

## Data Visualization

While {{ site.product }} allows you to create visual charts and graphs that enhance textual or tabular data, the Charts and graphs fall into the "non-text content" category. Even though they are not accessible out of the box, you can include specific settings in them and make them accessible.

The [following video](https://www.youtube.com/watch?v=lymGnquNxBg&feature=youtu.be) uses the popular VoiceOver screen reader on Apple OS X to navigate a Donut chart.

<iframe width="853" height="480" src="https://www.youtube.com/embed/lymGnquNxBg" frameborder="0" allowfullscreen></iframe>

In the video, you can use a screen reader to hear both the title of the chart and the values in the legend. Because the {{ site.product }} creates charts by using inline SVG elements, and SVG is markup, VoiceOver is able to drill into the chart and piece together a reasonable representation of the content which would not have been possible if the Charts needed a `canvas` element to create them.

Also, the screen reader in the video does not select the chart exactly but rather starts reading the title. Even though the reader can access and read legend values, the Chart can be made more accessible for disabled users.

## Tips for Accessible Charts

This section contains quick steps for improving the accessibility of the charts and enhancing the value of the content altogether which you can use separately or in combination. SVG is the technology that powers the {{ site.product }} Charts and is accessible out of the box.

However, the following suggested approaches and tips help make the charts and graphs more consumable and accessible to disabled users.
* [Provide text descriptions](#providing-text-descriptions)  
* [Add role and title attributes to Chart elements](#adding-role-and-title-to-chart-elements)
* [Add title and desc to the root of svg elements](#adding-title-and-desc-to-the-root-of-svg-elements)  
* [Generate accessible data tables from data sources](#generate-accessible-data-tables-from-data-sources)  
* [Create off-screen tables and swapped on-screen tables and charts](#creating-off-screen-tables-and-swapped-on-screen-tables-and-charts)  

### Providing Text Descriptions

Add a pure-text description of your Chart to the page by using the following markup. In the HTML, the `div` chart is wrapped in a `figure` element. 

For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wwEblVFe50NmQ1G855).

```
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
The following example demonstrates the HtmlHelper syntax for creating the Chart and adds a `figcaption` that explains the chart in detail. The example provides a detailed description which might not always be the case. Your goal is to provide disabled users with the key information they can find in your chart and which can vary depending on the data.

```
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
```
For more information, refer to the [brief video](https://www.youtube.com/watch?v=QyB3sTVRd3E&feature=youtu.be) of VoiceOver which interacts with the `figcaption` element.

```
<iframe width="853" height="480" src="https://www.youtube.com/embed/QyB3sTVRd3E" frameborder="0" allowfullscreen></iframe>
``` 

### Adding role and title to Chart Elements

To enchance the ability of your Chart, you can also add WAI-ARIA `role` and `title` attributes to the chart using the `HtmlAttributes` configuration.

```
    .HtmlAttributes(new { role="img",title="Sources of Electricity Produced in Spain, 2008" })
```
In the [previous video](https://www.youtube.com/watch?v=QyB3sTVRd3E&ab_channel=KendoUI), even though VoiceOver reads the title and title legend of the Chart, it is not able to select the container or tell that the user is interacting with an HTML element. By adding a role of `img` and a `title`, VoiceOver can do both, which is demonstrated in the first 15 minutes of the video for step one.

### Adding title and desc to the Root of svg Elements

Another available approach is to manually add the `title` and `desc` elements to the `SVG` element that the {{ site.product }} creates. Screen readers are able to leverage these elements as fallback content that will be read to disabled users. 

For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cQOvFBvf24JM6fxL26).

> At the time of this writing, VoiceOver and possibly the other major screen readers do not reflect the `title` and `desc` elements. However, the suggested technique is explicitly stated in the W3C [guidelines for accessible SVG](https://www.w3.org/TR/SVG-access/) and this approach is recommended.

* Create a template script block for the `<title>` and `<desc>`

```
    <script id="chartTmpl" type="text/x-kendo-tmpl">
        <title>#= title #</title>
        <desc>#= description #</desc>
    </script>
```
* Load the HTML for that block to `kendo.template` and render the template by using a chartDetails object
* Use jQuery to select the `svg` element inside the `div` of the Chart and prepend the `title` and `description` to the beginning of that element.


```
    $(document).ready(function(){
          makeChartAccessible();
    })
    var chartDetails = {
      title: "Sources of Electricity Produced in Spain, 2008",
      description: "Graphic illustrating, by percentage, the four primary electricity sources for Spain in 2008."
    };

    function makeChartAccessible() {
      var template = kendo.template($("#chartTmpl").html());

      $('#chart svg').prepend(template(chartDetails));
    }
```

### Generate Accessible Data Tables from Data Sources

This approach and the following one deal with creating a data table to serve as an alternative or a supplement to the Chart or graph. Assuming you are using a DataSource to populate your Chart, you can use the same DataSource and the Kendo UI templates to create a tabular representation of the same data. 

For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cGElnvbe56GxmRpH44) example.
   
* Create a template script block for your table.

```
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
* Subscribe to the [`Change`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/datasourceeventbuilder#changesystemstring) event of the DataSource and provide a handler. Inside the handler pass the template script into a Kendo UI template, render it with the DataSource, and add the table to the page.

```
    .Events(events=>events.Change("onChange"))

    <script>
    function onChange(){
      var chartData = $("#chart").data("kendoChart").dataSource.data();
      var template = kendo.template($("#tableScript").html());
      $("#main").prepend(template(chartData));
    }
    </script>
```

As a result, you create a simple and accessible table that is based on the same data as the chart itself. For more information, on the way VoiceOver allows you to interact with the table, refer to the [quick video](https://www.youtube.com/watch?v=0xdrBjwiFVA&ab_channel=KendoUI).

```
    <iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>
```

### Creating Off-Screen Tables and Swapped On-Screen Tables and Charts

If you do not want to display the raw data with the Chart for all users on-screen, use either of the following options:

* Place the table off-screen to make it invisible to sighted users but available to screen readers.

    To make the table invinsible to sighted users but available to screen readers, create a CSS class called `hidden` which will position any element at 10,000px to the left and off-screen. For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/GwklHPly54SUlKZf11) example.

    ```
        .hidden {
          position:absolute;
          left:-10000px;
          top:auto;
          width:1px;
          height:1px;
          overflow:hidden;
        }
    ```
    As a result your data table is no longer on the screen but is accessible to screen readers as demonstrated in the [following video] (https://www.youtube.com/watch?v=0xdrBjwiFVA&ab_channel=KendoUI)

    ```
        <iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>
    ```

* Provide all users with the ability to switch between the Chart and the table.

    Place a link or button on the screen that allows the user to swap between the table and the chart. This approach enhances the   experience for all users by letting them choose which presentation of the data they prefer. For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wcubdFFT174yJUdG56) example.

    Place a **Show Table** link on the screen. When the user clicks this link, the Chart is hidden, the table is displayed, and the link text changes to **Show Chart**.

    ```
        @(Html.Kendo().Button()
            .Name("tableBtn")
            .FillMode(ButtonFillMode.Solid)
            .ThemeColor(ThemeColor.Base)
            .Content("Show Table")
            .Events(e=>e.Click("onClick"))
        )

        function onClick(){
          var chart=$("#chart");
          var chartTable=$("#chartTable");

          if (chartTable.hasClass('hidden')) {
          	 chart.addClass('hidden');
          	 chartTable.removeClass('hidden');
          	 $(this).text("Show Chart");
          } else {
          	 chartTable.addClass('hidden');
          	 chart.removeClass('hidden');
          	 $(this).text("Show Table");
          }
        }
    ```
    As a result, VoiceOver users can choose with which representation they wish to interact as demonstrated in the [following video](https://www.youtube.com/watch?v=kZNz1H2Zp3U&feature=relmfu).

    ```
        <iframe width="853" height="480" src="https://www.youtube.com/embed/kZNz1H2Zp3U" frameborder="0" allowfullscreen></iframe>
    ```
## See Also

* [Section 508](https://section508.gov/)
* [WCAG 2.2 (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/)
* [W3C SVG Accessibility Guidelines](https://www.w3.org/TR/SVG-access/)
* [HTML5 Accessibility: SVG Text (Paciello Group Blog Post)](https://developer.paciellogroup.com/blog/2011/08/html5-accessibility-chops-interactive-image-example/)
* [Overview of Accessibility Features in {{ site.product }}]({% slug overview_accessibility %})
