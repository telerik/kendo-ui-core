---
title: Charts
page_title: Charts | Kendo UI Accessibility Support
description: "Learn more tips and tricks how to make Kendo UI Charts accessible."
slug: charts_accessibility_support
position: 7
---

# Charts

This article provides five practical tips (with code samples and illustrative videos) for making Kendo UI charts and graphs more accessible. These are things you can quickly and easily do in your applications to make them easier to access by disabled users through assistive technologies which interact with your content.

## Accessibility Case

In the realm of Accessibility, the most oft-mentioned guidelines and regulations are WAI_ARIA, Section 508 and the W3C Web Content Accessibility Guidelines (WCAG) 2.0. Section 508 makes up the law that governs the creation of accessible software for government entities in the United States, while WCAG (along with WAI-ARIA) contains a comprehensive set of guidelines for creating accessible websites and applications.

Both Section 508 and the WCAG 2.0 guidelines have something to say that, we believe, applies to Kendo UI data visualisation components. Below is the first rule in Section 508:

"(a) A text equivalent for every non-text element shall be provided (e.g., via `alt`, `longdesc`, or in-element content)."

and WCAG Guideline 1.1:

"Guideline 1.1 Text Alternatives: Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language."

Providing text equivalents to non-text content is a key tenant of accessibility. Content like images, animations, video, and audio are great, but these are impossible for screen readers and other assistive technologies to parse. And if they cannot be parsed by these technologies, they cannot be enjoyed by disabled users. Thus, Section 508 and WCAG both require that all non-decorative non-text content be made accessible to assistive technologies.

## Data Visualization

Kendo UI charts and graphs definitely fit the bill of "non-text content". By definition, Kendo UI allows you to create visual charts and graphs that enhance textual or tabular data. These cannot possibly be accessible, out-of-the-box, right? 

Actually, they can be. And with a little bit of work as you add charts and graphs to your applications, they can be made even more accessible.

First, take a look at the out-of-the-box experience with Kendo UI. The [video below](http://www.youtube.com/watch?v=lymGnquNxBg&feature=youtu.be), uses the popular VoiceOver screen reader on Apple OS X to navigate a Donut chart.

<iframe width="853" height="480" src="http://www.youtube.com/embed/lymGnquNxBg" frameborder="0" allowfullscreen></iframe>

As you can see from the video, you are able to use a screen reader to hear both the title of the chart, as well as the values in the legend. Because Kendo UI creates charts using inline SVG elements, and SVG is just markup, VoiceOver is able to drill into the chart and piece together a reasonable representation of the content. Had we instead used a Canvas element to create the chart, we would be out of luck. Score one for SVG!

Of course, if you watched the video, you may have also noticed that the screen reader did not select the chart exactly, it just started reading the title. What is more, while it is great that the reader can access and read legend values, much more can eb done to make this chart even more consumable and accessible for disabled users.

In the next section look at five steps you can take to improve the accessibility of your charts. Each takes only minutes to add to your apps, and you can adopt any or all of these as long as they make sense. You might as well find that not only do these steps make your charts more accessible to disabled users, but also that the improvements enhance the value of your content for all of your users regardless of their abilities.

## Tips for Accessible Charts

### 1. Provide Text Description

The simplest thing you can do is add a pure-text description of your chart to the page. Here is an example of the markup for such a chart:

    <figure>
        <div id="chart" role="img" title="Sources of Electricity Produced in Spain, 2008"></div>
        <figcaption>
            In 2008, Spain produced electricity for its residents in four ways.
            Chief among these was Nuclear power, which accounted for approximately 49% of production.
            Next were Wind and Hydro-electric power, which produced
            27% and 22% of the nation's electricity, respectively.
            In a distant fourth was solor power,
            which accounted for only 2% of all electricity produced by the country.
        </figcaption>
    </figure>

Create the chart with the following JavaScript:

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

If you take a look at the above HTML, you will see that the `div` chart is wrapped in a `figure` element and then a `figcaption` that explains the chart in detail is added. You can also visit [jsbin.com/odowud/9](http://jsbin.com/odowud/9/edit) for a complete working example.

Here is a [brief video](http://www.youtube.com/watch?v=QyB3sTVRd3E&feature=youtu.be) of VoiceOver interacting with the `figcaption` element:

    <iframe width="853" height="480" src="http://www.youtube.com/embed/QyB3sTVRd3E" frameborder="0" allowfullscreen></iframe>

In this example the description is detailed, but it might as well not be. The goal is to provide disabled users with the key information found in your chart, which will vary depending on the data.

### 2. Add `role` and `title` to Chart Element

Another simple step you can take is to add a WAI-ARIA role and a title to the `div` that contains your chart. This can be as simple as doing the following:

        <div id="chart" role="img" title="Sources of Electricity Produced in Spain, 2008"></div>

In the first video, even though VoiceOver could read the chart title and legend to it, it could not select the container, or even tell you were interacting with an HTML element. By adding a role of `img` and a title, VoiceOver can do both, which you can see in the first 15 seconds of the video for step 1.

### 3. Add `title` and `desc` to the Root of the `svg` Element

The next step we can take is to manually add title and description elements to the SVG element created by Kendo UI. These elements can bev leveraged by screen readers as fallback content to be read to disabled users.

First, create a template script block for the `<title>` and `<desc>` fields:

        <script id="chartTmpl" type="text/x-kendo-tmpl">
            <title>#= title #</title>
            <desc>#= description #</desc>
        </script>

Then, load the `html` for that block to a `kendo.template` and render the template using a `chartDetails` object. Finally, use jQuery to select the `svg` element inside of your chart `div` and prepend the title and description to the beginning of that element.

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

For a complete working sample, check out [jsbin.com/odowud/19](http://jsbin.com/odowud/19/edit).

At the time of this writing, VoiceOver (as well as probably all other major screen readers) does not do anything with the `title` and `desc` elements, but since this technique is explicitly called out in the W3C [guidelines for accessible SVG](http://www.w3.org/TR/SVG-access/), this step is recommended even if for a future-proofing technique.

### 4. Generate Accessible Data Tables from DataSource

The last two steps deal with creating a data table to serve as an alternative or supplement to the chart or graph. Assuming you are using a DataSource to populate your chart, you can use the same DataSource and Kendo UI templates to create a tabular representation of the same data.

First, create a template script block for your table.

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

Next, declare a `createTable` function, where you will pass the template script into a Kendo UI template, render it with the DataSource, and then add the table to the page.

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

The result is a simple, accessible table based on the same data as the chart itself. Here is a [quick video](http://www.youtube.com/watch?v=0xdrBjwiFVA&feature=plcp) of how VoiceOver allows you to interact with the table:

    <iframe width="853" height="480" src="http://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

For a complete working sample of this example, see [http://jsbin.com/odowud/15](http://jsbin.com/odowud/15/edit).

### 5. Create Off-Screen Tables and Swapped On-Screen Tables and Charts

Generating a data table is nice, but you may not want to display the raw data on-screen with the chart for all users. In that case, you have two options. You can either 1) place the table off-screen, invisible to sighted users, but available to screen readers, or 2) provide all users with the ability to switch between the chart and the table.

To make the first option work, start by creating a CSS class called `hidden`, which positions any element 10,000px to the left and off-screen.

    .hidden {
      position:absolute;
      left:-10000px;
      top:auto;
      width:1px;
      height:1px;
      overflow:hidden;
    }

Now, your data table is no longer on the screen, but it is accessible to screen readers as shown in the [following video](http://www.youtube.com/watch?v=0xdrBjwiFVA&feature=youtu.be):

    <iframe width="853" height="480" src="http://www.youtube.com/embed/0xdrBjwiFVA" frameborder="0" allowfullscreen></iframe>

For a complete working sample of this example, see [http://jsbin.com/odowud/20](http://jsbin.com/odowud/20/edit).

For an alternative approach, place a link or button on the screen that allows the user to swap between the table and the chart. The advantage of this approach is that it enhances the experience for all users by giving them a choice as to which presentation of the data they prefer.

In this case, place a **Show Table** link on the screen. When the user clicks this link, the chart is hidden, the table is displayed, and the link text changes to **Show Chart**.

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

VoiceOver users can now choose which representation they wish to interact with as displayed in the [following video](http://www.youtube.com/watch?v=kZNz1H2Zp3U&feature=relmfu):

    <iframe width="853" height="480" src="http://www.youtube.com/embed/kZNz1H2Zp3U" frameborder="0" allowfullscreen></iframe>

For a complete working sample of this example, see [http://jsbin.com/odowud/21](http://jsbin.com/odowud/21/edit).

SVG (the technology used to power Kendo UI charts) is pretty accessible out of the box, but the tips above can help you make your charts and graphs even more consumable, and thus more accessible, to disabled users. Better still, following these tips and having an accessible mindset as you build your websites and applications can help you create content that is more accessible to all your users.

## Resources

- [Section 508](http://section508.gov/)
- [WCAG 2.0](http://www.w3.org/TR/WCAG20/)
- [W3C SVG Accessibility Guidelines](http://www.w3.org/TR/SVG-access/)
- [HTML5 Accessibility: SVG Text (Paciello Group Blog Post)](http://www.paciellogroup.com/blog/2011/08/html5-accessibility-chops-interactive-image-example/)

## See Also

Other articles on Kendo UI Accessibility support:

* [Overview of Web Accessibility Standards]({% slug overview_accessibility_support_kendoui %})
* [High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Keyboard Shortcuts]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Languages]({% slug right_toleft_languages_accessibility_support %})
* [Section 508]({% slug section508_accessibility_support %})
* [WAI-ARIA]({% slug wai_aria_accessibility_support %})