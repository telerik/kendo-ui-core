---
title: Create the Social Stats Page
page_title: Create the Social Stats Page | Music Store Dashboard Tutorial
description: "Learn how to build the Kendo UI Music Store Dashboard Social Stats page by using Telerik UI for ASP.NET MVC."
slug: buildsocialstats_muscistoredashboard_aspnetmvc
position: 5
---

# Create the Social Stats Page

**Figure 1. A snapshot of the Kendo UI Music Store Social Networking page**

![social-overview](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/social-overview.png)

The **Social Stats** page contains various views of social networking data taken from the Kendo UI Music Store. This includes Facebook Likes, Twitter tweets, Google Plus pluses, and Pintrest pins. The different social networks can be selected to show their data in the main graph view, potentially combining the views and adding axes to the graph.

This page is contained in the `app/social-view.js`, `app/views/social.html`, and `Content/social-view.css` files.

## Configuration

### Construct the Dynamic Chart

The chart itself is defined as a Kendo UI Chart in the JavaScript with some special considerations for the series and value axis, as these are the dynamic portions of the chart along with the data source. The relevant portions of the chart initializer are demonstrated in the example below. Note that the example is cut down for brevity.

###### Example

    $('#social-stats-chart').kendoChart({
        title: {
            text: "Social Stats",
            ...
        },
        dataSource: socialStatsDataSource,
        ...
        series: buildSocialStatsSeries(),
        ...
        valueAxis: buildSocialStatsValueAxis(),
        ...
    });

Note the `buildSocialStatsSeries` and `buildSocialStatsValueAxis` functions. These define which data views appear in the chart and their styles. It is these functions that perform the addition and removal of the dynamic content, and so are called when the chart is created and also whenever the user selects or deselects one of the social networks through the interactive elements located below the chart.

**Figure 2. A snapshot of the social tiles**

![social-tiles](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/social-tiles.png)

These tiles are constructed by using standard declarative markup in HTML and JavaScript events. The example below demonstrates the HTML.

###### Example

    <div class="social-tiles">
        <span class="social-tile-wrapper" data-selected="true">
            <span class="social-tile-title social-tile-title-selected">Facebook</span>
            <span class="social-tile social-tile-selected facebook-tile"></span>
        </span><span class="social-tile-wrapper" data-selected="false">
            <span class="social-tile-title">Twitter</span>
            <span class="social-tile twitter-tile"></span>
        </span><span class="social-tile-wrapper" data-selected="false">
            <span class="social-tile-title">Google +</span>
            <span class="social-tile google-tile"></span>
        </span><span class="social-tile-wrapper" data-selected="false">
            <span class="social-tile-title">Pinterest</span>
            <span class="social-tile pinterest-tile"></span>
        </span>
    </div>

Each tile is its own `<span>`, each with a `social-tile-wrapper` class that is used to associate a click event in the JavaScript.

###### Example

    $(".social-tile-wrapper").click(function (e) {
        changeChartData.call(this);
    });

The `changeChartData()` is invoked this way, so it runs in the context of the tile wrapper itself, rather than globally. It has the task of marking the wrapper as selected and, therefore, updating its style, as well as invoking the `buildSocialStatsSeries` and `buildSocialStatsValueAxis` help functions.

###### Example

    function changeChartData() {
        var selected = $(this).data('selected'),
            $this = $(this),
            chart = $("#social-stats-chart").data('kendoChart');

        $this.data('selected', !selected);

        if (selected) {
            $(".social-tile-selected", $this).removeClass("social-tile-selected");
            $(".social-tile-title", $this).removeClass("social-tile-title-selected");
        } else {
            $(".social-tile", $this).addClass("social-tile-selected");
            $(".social-tile-title", $this).addClass("social-tile-title-selected");
        }

        chart.options.valueAxis = buildSocialStatsValueAxis();
        chart.options.series = buildSocialStatsSeries();
        chart.refresh();
    }

jQuery does the heavy-lifting of locating the data and facilitating the actions, while the chart itself handles redrawing the new data.

The `buildSocialStatsValueAxis` builds the JavaScript object the chart expects for defining the `ValueAxis` property, taking its information from the social tiles and if they have the `social-tile-selected` class attached. An excerpt of this function is demonstrated in the example below, snipped for brevity, as the use of the Facebook tile is representative of the use of the others.

###### Example

    function buildSocialStatsValueAxis() {
        var axis = [
            {
                title: { text: "sales" },
                name: "Sales",
                min: 100000,
                max: 3000000,
                labels: {
                    format: "{0}",
                    color: "#fff"
                },
                color: "#fff"
            }
        ];

        //facebook selected
        if ($('.facebook-tile').hasClass("social-tile-selected")) {
            axis.push({
                title: { text: "likes" },
                name: 'Likes',
                color: "#fff"
            });
        }
		...
		return axis;
	}

The `buildSocialStatsSeries` is similarly constructed, but provides information for the Series of the chart instead, including the axis names and legend title. Similarly, it is trimmed for brevity in the example below.

###### Example

    function buildSocialStatsSeries() {

        var series = [{
            type: "column",
            field: "Sales",
            name: "Sales",
            groupNameTemplate: "#= group.value # (#= series.name #)"
        }];

        if ($('.facebook-tile').hasClass("social-tile-selected")) {
            series.push({
                field: 'Likes',
                name: 'Likes',
                type: 'line',
                axis: 'Likes',
                color: "#4099FF"
            });
        }
		...
		return series;
	}

Combined, these functions make the data presentation of the chart dynamic, and allow for the user to select multiple views while remaining robust and clear to develop.

## See Also

Other articles on the Kendo UI Music Store Dashboard sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Dashboard Project]({% slug projectsetup_muscistoredashboard_aspnetmvc %})
* [Create the Single-Page App]({% slug createthespa_muscistoredashboard_aspnetmvc %})
* [Create the Main Page]({% slug createthemainpage_muscistoredashboard_aspnetmvc %})
* [Build the Store Sales Page]({% slug buildthestoressales_muscistoredashboard_aspnetmvc %})
