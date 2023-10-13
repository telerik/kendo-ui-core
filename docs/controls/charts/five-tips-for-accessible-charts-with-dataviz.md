---
title: Accessibility
page_title: Charts - Kendo UI Accessibility Support
description: "Learn more tips and tricks how to make Kendo UI Charts accessible."
slug: charts_accessibility_support
position: 6
---

# Charts Accessibility

This article provides practical tips, code samples, and illustrative videos for making disabled users interact with Kendo UI charts and graphs.

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

While Kendo UI allows you to create visual charts and graphs that enhance textual or tabular data, the Charts and graphs fall into the "non-text content" category. Even though they are not accessible out of the box, you can include specific settings in them and make them accessible.

The [following video](https://www.youtube.com/watch?v=lymGnquNxBg&feature=youtu.be) uses the popular VoiceOver screen reader on Apple OS X to navigate a Donut chart.

<iframe width="853" height="480" src="https://www.youtube.com/embed/lymGnquNxBg" frameborder="0" allowfullscreen></iframe>

In the video, you can use a screen reader to hear both the title of the chart and the values in the legend. Because Kendo UI creates charts by using inline SVG elements, and SVG is markup, VoiceOver is able to drill into the chart and piece together a reasonable representation of the content which would not have been possible if the Charts needed a `canvas` element to create them.

Also, the screen reader in the video does not select the chart exactly but rather starts reading the title. Even though the reader can access and read legend values, the Chart can be made more accessible for disabled users.

## Tips for Accessible Charts

This section contains quick steps for improving the accessibility of the charts and enhancing the value of the content altogether which you can use separately or in combination. SVG is the technology that powers the Kendo UI Charts and is accessible out of the box.

However, the following suggested approaches and tips help make the charts and graphs more consumable and accessible to disabled users.
* [Provide text descriptions](#providing-text-descriptions)  
* [Add `role` and `title` attributes to Chart elements](#adding-role-and-title-to-chart-elements)
* [Add title and desc to the root of svg elements](#adding-title-and-desc-to-the-root-of-svg-elements)  
* [Generate accessible data tables from data sources](#generating-accessible-data-tables-from-datasources)  
* [Create off-screen tables and swapped on-screen tables and charts](#creating-off-screen-tables-and-swapped-on-screen-tables-and-charts)  

### Providing Text Descriptions

Add a pure-text description of your Chart to the page by using the following markup. In the HTML, the `div` chart is wrapped in a `figure` element. For the complete example, refer to [jsbin.com/odowud/9](https://jsbin.com/odowud/9/edit).

    <figure>
        <div id="chart" role="img" title="Sources of Electricity Produced in Spain, 2008"></div>
        <figcaption>
            In 2008, Spain produced electricity for its residents in four ways.
            Chief among these was Nuclear power which accounted for approximately 49% of production.
            Next were Wind and Hydro-electric power which produced
            27% and 22% of the nation's electricity, respectively.
            In a distant fourth was Solar power,
            which accounted for only 2% of all electricity produced by the country.
        </figcaption>
    </figure>

The following example demonstrates the JavaScript for creating the Chart and adds a `figcaption` that explains the chart in detail. The example provides a detailed description which might not always be the case. Your goal is to provide disabled users with the key information they can find in your chart and which can vary depending on the data.

    function createChart() {
        $("#chart").kendoChart({
          title: {
            text: "Sources of Electricity Produced in Spain, 2008"
          },
          legend: {
            position: "bottom",
            labels: {
              template: "#= text # (#= value #%)"
            }
          },
          seriesDefaults: {
            labels: {
              visible: true,
              position: "outsideEnd",
              format: "{0}%"
            }
          },
          series: [{
            type: "donut",
            data: [{
              category: "Hydro",
              value: 22
            }, {
              category: "Solar",
              value: 2
            }, {
              category: "Nuclear",
              value: 49
            }, {
              category: "Wind",
              value: 27
            }]
        }],
        tooltip: {
          visible: true,
          format: "{0}%"
        }
      });
    }

    createChart();

For more information, refer to the [brief video](https://www.youtube.com/watch?v=QyB3sTVRd3E&feature=youtu.be) of VoiceOver which interacts with the `figcaption` element.

    <iframe width="853" height="480" src="https://www.youtube.com/embed/QyB3sTVRd3E" frameborder="0" allowfullscreen></iframe>

### Adding role and title to Chart Elements

To enhance the accessibility of your Chart, you can also add WAI-ARIA `role` and `title` attributes to the `div` element that contains the chart by using the `<div id="chart" role="img" title="Sources of Electricity Produced in Spain, 2008"></div>` configuration.

In the [previous video](https://www.youtube.com/watch?v=QyB3sTVRd3E&feature=youtu.be), even though VoiceOver reads the title and title legend of the Chart, it is not able to select the container or tell that the user is interacting with an HTML element. By adding a role of `img` and a title, VoiceOver can do both, which is demonstrated in the first 15 seconds of the video for step one.

### Adding title and desc to the Root of svg Elements

Another available approach is to manually add the `title` and `description` elements to the `SVG` element that Kendo UI creates. Screen readers are able to leverage these elements as fallback content that will be read to disabled users. For the complete example, refer to [jsbin.com/odowud/19](https://jsbin.com/odowud/19/edit).

> At the time of this writing, VoiceOver and possibly the other major screen readers do not reflect the `title` and `desc` elements. However, the suggested technique is explicitly stated in the W3C [guidelines for accessible SVG](https://www.w3.org/TR/SVG-access/) and this approach is recommended.

1. Create a template script block for the `<title>` and `<desc>` fields.

        <script id="chartTmpl" type="text/x-kendo-tmpl">
            <title>#= title #</title>
            <desc>#= description #</desc>
        </script>

1. Load the HTML for that block to `kendo.template` and render the template by using a `chartDetails` object.
1. Use jQuery to select the `svg` element inside the `div` of the Chart and prepend the `title` and `description` to the beginning of that element.

        var chartDetails = {
          title: "Sources of Electricity Produced in Spain, 2008",
          description: "Graphic illustrating, by percentage, the four primary electricity sources for Spain in 2008."
        };

        function createChart() { ... }

        function makeChartAccessible() {
          var template = kendo.template($("#chartTmpl").html());

          $('#chart svg').prepend(template(chartDetails));
        }

        createChart();
        makeChartAccessible();

### Generating Accessible Data Tables from Data Sources

This approach and the following one deal with creating a data table to serve as an alternative or a supplement to the Chart or graph. Assuming you are using a DataSource to populate your Chart, you can use the same DataSource and the Kendo UI templates to create a tabular representation of the same data. For the complete example, refer to [https://jsbin.com/odowud/15](https://jsbin.com/odowud/15/edit).

1. Create a template script block for your table.

        <script id="tableScript" type="text/x-kendo-tmpl">
            <table id="chartTable">
              <caption>Sources of Electricity Produced in Spain, 2008</caption>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Percentage</th>
              </tr>
              # for(var i = 0, len = data.length; i < len; i++) { #
                <tr>
                  <th scope="row">#= data[i].category #</th>
                  <td>#= data[i].value #%</td>
                </tr>
               # } #
            </table>
        </script>

1. Declare a `createTable` function where you will pass the template script into a Kendo UI template, render it with the DataSource, and add the table to the page.

        var chartData = new kendo.data.DataSource({
          data: [{
            category: "Hydro",
            value: 22
          }, {
            category: "Solar",
            value: 2
          }, {
            category: "Nuclear",
            value: 49
          }, {
            category: "Wind",
            value: 27
          }]
        });

        function createTable() {
          var template = kendo.template($("#tableScript").html());
           $("body").prepend(template(chartData.data()));
        }

    As a result, you create a simple and accessible table that is based on the same data as the chart itself. For more information on the way VoiceOver allows you to interact with the table, refer to the [quick video](https://www.youtube.com/watch?v=0xdrBjwiFVA&feature=plcp).

        <iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

### Creating Off-Screen Tables and Swapped On-Screen Tables and Charts

If you do not want to display the raw data with the Chart for all users on-screen, use either of the following options:

* Place the table off-screen to make it invisible to sighted users but available to screen readers. For the complete example, refer to [https://jsbin.com/odowud/20](https://jsbin.com/odowud/20/edit).

    To make the table invisible to sighted users but available to screen readers, create a CSS class called `hidden` which will position any element at 10,000px to the left and off-screen.

        .hidden {
          position:absolute;
          left:-10000px;
          top:auto;
          width:1px;
          height:1px;
          overflow:hidden;
        }

    As a result, your data table is no longer on the screen but is accessible to screen readers as demonstrated in the [following video](https://www.youtube.com/watch?v=0xdrBjwiFVA&feature=youtu.be).

        <iframe width="853" height="480" src="https://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

* Provide all users with the ability to switch between the Chart and the table.

    Place a link or button on the screen that allows the user to swap between the table and the chart. This approach enhances the experience for all users by letting them choose which presentation of the data they prefer. For the complete example, refer to [https://jsbin.com/odowud/21](https://jsbin.com/odowud/21/edit).

    Place a **Show Table** link on the screen. When the user clicks this link, the Chart is hidden, the table is displayed, and the link text changes to **Show Chart**.

        var toggle = $('#toggle'); // HTML Link Element ID
        toggle.on('click', function() {
          if (chartTable.hasClass('hidden')) {
            chart.addClass('hidden');
            chartTable.removeClass('hidden');
            toggle.text("Show Chart");
          } else {
            chartTable.addClass('hidden');
            chart.removeClass('hidden');
            toggle.text("Show Table");
          }
        });

    As a result, VoiceOver users can choose with which representation they wish to interact as demonstrated in the [following video](https://www.youtube.com/watch?v=kZNz1H2Zp3U&feature=relmfu).

        <iframe width="853" height="480" src="https://www.youtube.com/embed/kZNz1H2Zp3U" frameborder="0" allowfullscreen></iframe>

## See Also

* [Section 508](https://section508.gov/)
* [WCAG 2.2 (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/)
* [W3C SVG Accessibility Guidelines](https://www.w3.org/TR/SVG-access/)
* [HTML5 Accessibility: SVG Text (Paciello Group Blog Post)](https://developer.paciellogroup.com/blog/2011/08/html5-accessibility-chops-interactive-image-example/)
* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.2 Compliance of Kendo UI Components]({% slug section508_wcag21_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
