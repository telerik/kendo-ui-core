---
title: Create the Dashboard Main Page
position: 3
---

# Create the Dashboard Main Page - Music Dashboard

![dashboard-overview](/tutorials/asp.net/kendo-music-store/music-store-dashboard/images/dashboard-overview.png)

The main page constitutes the landing page of the Dashboard, and the navigation strip, an overview of recent sales far various periods of time, top singles and albums, and a series of gauges showing hourly data. For this view, we use a declarative approach similar to the Kendo UI Music Store itself, also using the **data-** attributes, and the [Kendo UI MVVM](http://demos.telerik.com/kendo-ui/web/mvvm/index.html) framework.

This page is contained in the files **app/views/main.html**, **app/main-view.js**, and **Content/home-view.css**

## Display the Sales tabs
To implement the listings of Sales for the various times, we start with some simple HTML to define the categories to display:

	<section class="store-tall-tabs">
        <span class="big-sales-tab today-sales">
            <div class="big-sales-tab-title">TODAY</div>
            <div class="big-sales-tab-amount"><span data-role="widget" data-bind="text: today"></span></div>
        </span>
        <span class="big-sales-tab this-week-sales">
            <div class="big-sales-tab-title">THIS WEEK</div>
            <div class="big-sales-tab-amount"><span data-bind="text: week"></span></div>
        </span>
        <span class="big-sales-tab this-month-sales">
            <div class="big-sales-tab-title">THIS MONTH</div>
            <div class="big-sales-tab-amount"><span data-bind="text: month"></span></div>
        </span>
        <span class="big-sales-tab last-month-sales">
            <div class="big-sales-tab-title">LAST MONTH</div>
            <div class="big-sales-tab-amount"><span data-bind="text: lastMonth"></span></div>
        </span>
    </section>

Each of the **amount** &lt;spans&gt;s contain the **data-bind** attribute that specifies the name of the data in the scheme to place in that view.

This data is bound to an external **DataSource**, which is pulled and bound to these display widgets in the **main-view.js** file:

	var totals = new kendo.data.DataSource({
        transport: {
            read: 'api/sales/totals'
        },
        schema : {
          data : function(response) {
              var item = {
                  today: kendo.toString(response.Today, "c"),
                  week: kendo.toString(response.Week, "c"),
                  month: kendo.toString(response.Month, "c"),
                  lastMonth: kendo.toString(response.LastMonth, "c")
              };
              return [item];
          }  
        },
        change: function (data) {
            console.log(data.items[0]);
            kendo.bind($("#home-view"), data.items[0]);
        }
    });
    totals.read();

Note that the value names in the scheme data of the DataSource match the **data-bind** tags of the views: **data-bind="text: lastMonth"** matches that tag to the **lastMonth** value pulled from the DataSource.

The entirety of the view information in **main.html** is wrapped in the following tag

	<section id="home-view">

so that the binding of the sales totals passes back through to the view. **kendo.bind($("#home-view"), data.items[0]); makes use of standard jQuery syntax and performs the binding.

## Display Top Singles and Albums List Views
These lists are created via a combination of HTML markup, templating, and MVVM binding, with the data provided by a remote DataSource. Starting with the markup:

	<div class="top-singles-list">
        <h3 class="list-title">Top <span class="italic">Singles</span></h3>
        <div id="topSinglesListView"></div>
    </div>
    <div class="top-singles-list">
        <h3 class="list-title">Top <span class="italic">Albums</span></h3>
        <div id="topAlbumsListView"></div>
	</div>
Each requires a Kendo UI template, to render the individual items in the proper manner. The **Single** template is below:

	<script type="text/x-kendo-tmpl" id="top-single-template">
    	<div class="top-single-song-list-item">
	        <img src="${ArtUrl}" alt="${Name}" width="100px" height="100px" />
	        <div class="album-list-item-wrapper">
	            <div class="album-list-title">${Name}</div>
	            <div class="album-list-subtitle">${AlbumName}</div>
	            <div class="album-list-price">${kendo.toString(Price, 'c')}</div>
	        </div>
	    </div>
	</script>

There are several differences in this approach to that used in the Kendo UI Music Store - the use of a remote DataSource facilitates some of the detail be moved around.

The bindings are invoked in the JavaScript (int **main-view.js**); this is also where the templates are applied and the DataSource is bound.

	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "api/top/tracks",
                dataType: "json"
            }
        }
    });

    $("#topSinglesListView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#top-single-template").html()),
        dataBound: function (e) {
            // handle event
            $(".top-single-song-list-item").on("click", function (e) {
                e.preventDefault();
                window.location = "#/sales?target=singles";
            });
        }
    });

The **Albums** ListView is constructed similarly, with the same structure.

## Create a Gauge with a custom background

The radial gauges on this page use a custom background image of a record. Every gauge is contained within its own **&lt;div&gt;**, as shown below:

	<div class="gauge-container">
    	<div class="albums-per-hour home-gauge-box"></div>
        <header>
        	<h3 class="gauge-title"><span class="orange">Albums</span>/Hr</h3>
        </header>
	</div>

The key here is the **class** attribute "**gauge-container** assigned to each.

Looking at the CSS for this page in **home-view.css**, the background image is defined in the **background-image** attribute:

	.gauge-container {
 		height: 250px;
  		display: inline-block;
 		margin: 0 40px;
 		background-image: url("../img/record-gauge-home.png");
 	  	background-repeat: no-repeat;
  	  	background-position-y: 15px;
  	  	width: 225px;
	}