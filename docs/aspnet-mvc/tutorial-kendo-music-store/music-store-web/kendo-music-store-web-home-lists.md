---
title: Create the Home Page
position: 3
---

# Create the Home Page - Kendo UI Music Store

For the main content of the "Home" page, we want to display a main banner image rotator, and 2 groups of Albums.
One will be our "top sellers," and the other is a "featured artist."
For this, we will be using the [Kendo UI ListView](http://demos.telerik.com/kendo-ui/web/listview/index.html) widget.
For this view, we will also use a **"declarative"** approach to initializing the widgets,
using the **data-** attributes, and the [Kendo UI MVVM](http://demos.telerik.com/kendo-ui/web/mvvm/index.html) framework.

This page is contained in the files **Views\Home\Index.cshtml** and **Scripts\App\home-index.js**

## Display items in a ListView (with MVVM, templates, and binding to a remote data source)

![kendo-music-store-web-main-lists-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-music-store-web-main-lists-screenshot.png)

To implement our lists of "featured artist" and "top selling" albums,
we can start with some simple HTML markup to represent the 2 ListView widgets:

	<section class="album-list">
		<h3>Featured Artist: <span data-bind="text: featuredArtistName" class="featureartist-text"></span></h3>
		<div data-role="listview" data-bind="source: featuredArtistAlbums" data-template="album-template"></div>
	</section>

	<section class="album-list">
		<h3>Top Selling Albums</h3>
		<div data-role="listview" data-bind="source: topSellingAlbums" data-template="album-template"></div>
	</section>

We have set **data-role="listview"** of each &lt;div&gt; so that Kendo UI knows to transform these &lt;div&gt;s
into ListView widgets. Each album will look the same between the 2 lists, so we chose to share a template.
Both &lt;div&gt;s get the attribute **data-template="album-template"**.
In addition, we need to add the template itself:

    <script id="album-template" type="text/x-kendo-template">
        <div class="album" data-bind="click: viewAlbumDetails">
            <img src="" data-bind="attr: { src: AlbumArtUrl }" />
            <span class="title" data-bind="text: Title"></span>
            <span class="artist" data-bind="text: Artist.Name"></span>
            <span class="price" data-bind="textFormatted: Price" data-format="c"></span>
        </div>
    </script>

We moved the template to an ASP.NET MVC partial to keep the code clean and allow
reuse of the template between pages. The partial was then included with:

    @Html.Partial("_AlbumListTemplatePartial")

In the template, note the special **type="text/x-kendo-template"**. This is required for Kendo UI to be able to resolve the template.
Also the **id** matches the template indicated by the &lt;div&gt; tags.
More information on templates can be found [here](http://demos.telerik.com/kendo-ui/web/templates/index.html).

Finally, the **data-bind** property contains our list of binders that will be applied to this widget.
In this case we are using the **source** binder, and binding it to the **featuredArtistAlbums** property of the view model.
This means we need to create our view model in JavaScript, which is:

    var viewModel = kendo.observable({
        featuredArtistName: store.config.featuredArtist,

        featuredArtistAlbums: new kendo.data.DataSource({
            // ...
        }),

        topSellingAlbums: new kendo.data.DataSource({
            // ...
        })
    });

	kendo.bind("#body", viewModel);

Our viewModel is a Kendo UI **Observable** object, which facilitates the updating of properties
and notifying the view when it needs to be redrawn.
The last line of JavaScript tells Kendo UI to apply bindings between the viewModel and the HTML
element with the ID "body", using normal jQuery selector syntax.
In our view model, we have set a featured artist on the **featuredArtistName** property.
This text string will be shown in our &lt;h3&gt; header element, due to the data-binding:

    <h3>Featured Artist: <span data-bind="text: featuredArtistName"></span></h3>

The **featuredArtistAlbums** and **topSellingAlbums** properties of the view model are both set to
[Kendo UI DataSources](http://demos.telerik.com/kendo-ui/web/datasource/index.html) that will pull remote data
from our WCF Data Service.
In the case of the featuredArtistAlbums data source, there is additional code specified that enabled
server-side filtering by artist name. This is using OData.

## Image Rotator (with a custom binding)

The final item we need to add to the main page is an image rotator. Kendo UI does not actually provide an image rotator widget.
However, the Kendo UI MVVM bindings are expendable, and so we will write our own custom binding to handle this.

### Define the custom MVVM Binder

We can start by setting up a property on our view model to hold the URLs for the images we want to rotate:

    var viewModel = kendo.observable({
        bannerImages: [
            "/Content/Images/banner1.jpg",
            "/Content/Images/banner2.jpg"
        ]
    });

The **bannerImages** property is just a simple array of image URLs. Next we will make our custom binding.
The best practice is to separate your custom Kendo UI extensions into a separate file, or multiple files if they become large.
In this case, we put our custom binder in **Scripts\App\kendo-custom-bindings.js**. The basic layout for the custom binder is:

	kendo.data.binders.rotateImages = kendo.data.Binder.extend({
		init: function (element, bindings, options) {
			kendo.data.Binder.fn.init.call(this, element, bindings, options);
			var binding = this.bindings.rotateImages;
			// ... rest of init code ...
		},
		refresh: function () {
			var binding = this.bindings.rotateImages;
			// ... rest of refresh code...
		},
		destroy: function () {
			var binding = this.bindings.rotateImages;
			// ... rest of destroy code ...
		}
	});

We are assigning the binder to **kendo.data.binders.rotateImages** and **rotateImages** becomes the name of the binder.

The **init** function is called only once for each element that uses it. All startup and initialization should be performed here.

The **refresh** function is called whenever the MVVM framework determines that any watched properties on the bound view model have changed.
This is where you would normally put the code to update your element.

The **destroy** function is called when the binder is removed or cleaned up. Any tear-down code would be put here, and would normally
undo anything that the **init** function had done.

For our image rotator, our **init** function fetches the array of images to rotate, and a time delay value from a **data-rotate-delay**
attribute to use to time the image change. It also defines a **doImageRotation** function that gets assigned to the binding,
so we can get and use the function in our **refresh** method.

The **init** function contains:

    init: function (element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var binding = this.bindings.rotateImages;
        var target = $(element);
        binding.rotateDelay = target.data("rotate-delay");
        binding.imageIndex = 0;
        binding.doImageRotation = function () {
            var imageArray = binding.get();
            var nextImageUrl = imageArray[binding.imageIndex];
            target.fadeTo('slow', 0, function () { target.attr('src', nextImageUrl).fadeTo('slow', 1); });
            binding.imageIndex++;
            if (binding.imageIndex >= imageArray.length) {
                binding.imageIndex = 0;
            }
        };
    }

Note the 3rd line of code above:

    var binding = this.bindings.rotateImages;

**this.bindings** contains all the bindings that are being applied to this element.
They are each added as a property with the same name as the binding. So **this.bindings.rotateImages**
gives us this instance of the binder object.

The **refresh** function is called as the array of images is bound to the element, so that it knows to update.
Our code is:

    refresh: function () {
        var binding = this.bindings.rotateImages;
        binding.imageIndex = 0;
        binding.doImageRotation();
        binding.interval = setInterval(binding.doImageRotation, binding.rotateDelay);
    }

This code again gets our instance of the binder using **this.bindings.rotateImages**. It then gets the current
image index from a property on the binder. Then the **doImageRotation** function is called. This is called once
to set our initial image, without waiting the time delay. Then the JavaScript **window.setInterval()** function
is used to set up an interval that rotates the images on a time delay.

Note that if for some reason the **viewModel.bannerImages** array were to change, then the **rotateImages.refresh**
method would be called again, which would reset us to index 0 of the images, and start rotating the images again.

Also, the interval is saved to the binding, so that we can get to it later in the destroy method.

Finally, the **destroy** function just stops the interval that we had started:

    destroy: function () {
        var binding = this.bindings.rotateImages;
        clearInterval(binding.interval);
    }

The binding looks complicated, but functionally, this is fairly simple. All it does is use a JavaScript setInterval()
to periodically change the "src" attribute of an &lt;img&gt; element. However, it does demonstrate a way to retain data
in the binding by adding properties to the object instance, and a way to pass in additional data, in this case the delay time.
We use a second data-* property on the element, **data-rotate-delay**, and the custom binding can read this data property
with jQuery **$(element).data("rotate-delay")**.

### Apply the rotateImages binder

Now we can make our HTML that uses our custom binding:

    <img data-bind="rotateImages: bannerImages" data-rotate-delay="5000" />

We have indicated that this &lt;img&gt; element will be bound to our custom "rotateImages" binding, using the "bannerImages"
property of the view model as its data. Through use of the additional **data-** attribute, we have also indicated that our
image will update every 5000 milliseconds (5 seconds).
