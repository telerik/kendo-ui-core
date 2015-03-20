---
title: Bind the Grid to Remote Data
page_title: Bind Kendo UI jQuery grid to remote data | Kendo UI Grid Documentation
description: This article will explain how to use Kendo UI Grid widget in your web application and bind it to remote data.
previous_url: /howto/bind-the-grid-to-remote-data
---

# Bind the Grid to Remote Data

Love them or hate them, grids are a staple of user interfaces. While jQuery has made UI engineering remarkably easier on most of us, the grid is still a very iffy scenario when designing for the web.

Fortunately, the [Grid](http://demos.telerik.com/kendo-ui/grid/index) makes this much easier on us. With to the rapid templating engine that is included with Kendo UI, and the built-in datasource, we can get up and running with our grid very quickly.

To start with, we need a data source. Due to my work on [instasharp.org](http://instasharp.org/) recently, I have become quite familiar with the Instagram API. We can use their "Popular" feeds endpoint without having to go through an authorization process. We still need a client_id, but it is easy to sign up for one of those at [http://instagram.com/developer/register/#](http://instagram.com/developer/register/#).

##Create The Grid

First we need a grid on our page. A simple table describing the column headers will do just fine. This makes sense. If you were making a grid yourself, you would start with a table.

<iframe style="width: 700px; height: 300px;" src="http://jsfiddle.net/65kWY/13/embedded/html"></iframe>

Now we need to make our div into a grid. First we need to download the Kendo UI or we can use the static CDN references.

We are going to need the **kendo.common.min.css**, the **kendo.kendo.min.css** as far as stylesheets go. We also need jQuery because Kendo UI is built on top of the jQuery platform. The last thing we need is the **kendo.all.min.js** reference. It's important to include your jQuery reference first as it is a dependency for Kendo UI.

For the sake of simplicity, here are all the script tags as CDN references that you can just copy and paste.

<iframe style="width: 700px; height: 150px;" src="http://jsfiddle.net/65kWY/2/embedded/js"></iframe>

We can turn the div into a grid in the document.ready() jQuery function.

<iframe style="width: 700px; height: 600px;" src="http://jsfiddle.net/65kWY/13/embedded/result"></iframe>

## Add Some Awesome Data

It's not much to look at, so lets add some data to it. Kendo UI provides a very powerful [data binding framework](http://demos.telerik.com/kendo-ui/datasource/index) we can use right inline with our grid. We simply need to define the data source of the grid and supply our remote endpoint. Kendo UI is still in beta so some of the naming may change slightly, but I'll explain what each one of these attributes / objects does.</p>

<iframe style="width: 700px; height: 350px;" src="http://jsfiddle.net/65kWY/12/embedded/js,html,css,result"></iframe>

## The Breakdown

* The **dataSource** object creates a new Kendo UI data source and assigns it as the data source for the grid.
* The **transport** object defines how we will communicate with our remote data source.
    * **read**
    * **url** is pretty self explanatory.
        * **dataType** tells the data source the format that we expect the response to be in. In this case, it's JSOP. JSONP is a way of returning json from a cross-browser request without getting blocked. It's also a way to get malicious code injected into your page. It basically wraps the json response in a callback to fool the browser. Don't do it unless you fully trust your data. I think the fine folks at Instagram are quite trustworthy enough for this demo!
    * **schema** tells the grid what the schema of our response is. Or you could think of it as the "json element to repeat on". Kendo UI will look for this element to represent each row in the grid. Instagram returns an array of "data" elements so our repeating item is just "data". </li>

Now if you run the above example (if you haven't already), you will see a grid with nothing in it. That's because we haven't told the grid what to render in each column. We can do this by simply specifying which element off the "data" tag in the Instagram response we want to show in that particular column. I have specified the "field" attribute in the columns array so now our grid will display the actual data from our response.

<iframe style="width: 700px; height: 600px;" src="http://jsfiddle.net/65kWY/10/embedded/result,js,html,css"></iframe>

Now we have data, but we have several problems. We have the URL of an image in our image column and the other columns are showing arrays of objects because they are. We need to tell the grid how we want each column displayed. We can do that through a simple inline template for the image. Now our image shows up just fine.

<iframe style="width: 700px; height: 600px;" src="http://jsfiddle.net/65kWY/11/embedded/result,js,html,css"></iframe>

## Make it pretty. Well. Prettier.

The rest of the columns need some more specific templating since they are complex displays, not single fields. We can do that by moving the template outside of the grid and then setting the template for the details to contain the name of the user that created the photo, the filter they used to create it, and the photo caption. In the last cell we use JavaScript in our templates to enumerate over the comments to display them in a list.

We have now moved all markup removed from our JavaScript (very clean). We add a little bit of style and our grid is now fully customizable.

<iframe style="width: 700px; height: 600px;" src="http://jsfiddle.net/65kWY/8/embedded/result,html,js,css/"></iframe>

## A Note About Templates

If you check out the "html" tab on the previous fiddle, you can see the templating syntax for [Kendo UI Templates](/framework/templates/overview). Templates are HTML inside of special script blocks. If you notice, I have also mixed in JavaScript right along with the html. The syntax will feel very familiar if you have ever done any PHP, Razor or other server side templating engine.

## Wrap Up

I hope you were able to see the power of the Kendo UI [Grid](http://demos.telerik.com/kendo-ui/grid/index), [Data Source](http://demos.telerik.com/kendo-ui/datasource/index) and [Templating](http://demos.telerik.com/kendo-ui/templates/index) engine in this article. As well as providing you with a complete toolkit for your jQuery / HTML5 development, it helps you write cleaner JavaScript and lets the markup remain where it belongs.

Download the toolkit [here](http://www.telerik.com/download/kendo-ui-complete), or use the CDN references. Make sure you also hit up the [forums](http://www.telerik.com/forums/kendo-ui-framework) if you have any questions or suggestions for Kendo UI.
