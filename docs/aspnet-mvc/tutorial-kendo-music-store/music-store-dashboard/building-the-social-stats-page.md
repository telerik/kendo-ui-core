---
title: Build the Social Stats Page
position: 5
---

# Build the Social Stats Page

![social-overview](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/social-overview.png)

The Social Stats page contains various views of social networking data taken from the Kendo UI Music Store. This includes Facebook Likes, Twitter tweets, Google Plus pluses, and Pintrest pins.

The different social networks can be selected to show their data in the main graph view, potentially combining the views and adding axes to the graph.

This page is contained in the following files: **app/social-view.js**, **app/views/social.html**, and **Content/social-view.css**.

## Construct the Dynamic Chart

The chart itself is defined as a Kendo UI Chart in the JavaScript, with some special considerations for the series and value axis (as these are the dynamic portions of the chart, along with the data source. The relevant portions of the chart's initializer are below, cut down for brevity:

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

Note the functions **buildSocialStatsSeries** and **buildSocialStatsValueAxis**: these define which data views appear in the chart and their styles. It is these functions that perform the addition and removal of the dynamic content, and so are called when the chart is created and also whenever the user selects or deselects one of the social networks via the interactive elements located below the chart.

These "social tiles" are located below the chart:

![social-tiles](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/social-tiles.png)

These tiles are constructed using standard declarative markup in HTML and JavaScript events. The HTML is below:

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

Each tile is its own **&lt;span&gt;**, each with class "**social-tile-wrapper**" that is used to associate a click event in the JavaScript.

    $(".social-tile-wrapper").click(function (e) {
        changeChartData.call(this);
    });

**changeChartData()** is invoked this way so it runs in the context of the tile wrapper itself, rather than globally. It has the task of marking the wrapper as selected (and therefore updating its style), as well as invoking the help functions **buildSocialStatsSeries** and **buildSocialStatsValueAxis**:

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

**buildSocialStatsValueAxis** builds the JavaScript object the chart expects for defining the ValueAxis property, taking its information from the social tiles and if they have the **social-tile-selected** class attached. An excerpt of this function is below, snipped for brevity (as the use of the Facebook tile is representative of the use of the others):

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

**buildSocialStatsSeries** is similarly constructed, but instead provides information for the Series of the chart, including the axis names and legend title. Similar trimmed for brevity:

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