---
title: Create the Home Page
page_title: Create the Home Page | Music Store Web App Tutorial
description: "Learn how to create the Home page in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createthehomepage_muscistorewebapp_aspnetmvc
position: 3
---

# Create the Home Page

For the main content of the **Home** page, a main banner image rotator and two groups of Albums are going to be displayed. One will be the top-sellers, and the other will be a featured artist. For this, you will be using the [Kendo UI ListView widget](http://demos.telerik.com/kendo-ui/web/listview/index.html). For this view, we will also use a declarative approach to initializing the widgets, using the `data-` attributes, and the [Kendo UI MVVM](http://demos.telerik.com/kendo-ui/web/mvvm/index.html) framework.

This page is contained in the `Views\Home\Index.cshtml` and `Scripts\App\home-index.js` files.

## Display Items in the ListView

**Figure 1. A snapshot of the Kendo UI Music Store main lists**

![kendo-music-store-web-main-lists-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-music-store-web-main-lists-screenshot.png)

To implement the lists of the **Featured Artist** and **Top Selling** albums, start with simple HTML markup to represent the two ListView widgets.

###### Example

	<section class="album-list">
		<h3>Featured Artist: <span data-bind="text: featuredArtistName" class="featureartist-text"></span></h3>
		<div data-role="listview" data-bind="source: featuredArtistAlbums" data-template="album-template"></div>
	</section>

	<section class="album-list">
		<h3>Top Selling Albums</h3>
		<div data-role="listview" data-bind="source: topSellingAlbums" data-template="album-template"></div>
	</section>

The `data-role="listview"` of each `<div>` is set in such a way that Kendo UI knows to transform these `<div>` elements into ListView widgets. Each album will look the same between the two lists, which enables you to share a template. Both `<div>` elements get the attribute `data-template="album-template"`. Now add the template itself.

###### Example

    <script id="album-template" type="text/x-kendo-template">
        <div class="album" data-bind="click: viewAlbumDetails">
            <img src="" data-bind="attr: { src: AlbumArtUrl }" />
            <span class="title" data-bind="text: Title"></span>
            <span class="artist" data-bind="text: Artist.Name"></span>
            <span class="price" data-bind="textFormatted: Price" data-format="c"></span>
        </div>
    </script>

The template is moved to an ASP.NET MVC partial to keep the code clean and to allow the reuse of the template between pages. Include the partial as demonstrated in the example below.

###### Example

    @Html.Partial("_AlbumListTemplatePartial")

<!--_-->
In the template, note the special `type="text/x-kendo-template"`. This is required for Kendo UI to be able to resolve the template. Also the `id` matches the template indicated by the `<div>` tags.

For more information on templates, refer to [this online demo](http://demos.telerik.com/kendo-ui/web/templates/index.html).

Finally, the `data-bind` property contains the list of binders that will be applied to this widget. In this case the examples are using the `source` binder, and binding it to the `featuredArtistAlbums` property of the view model. This means you need to create your view model in JavaScript, as shown in the example below.

###### Example

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

The `viewModel` is a Kendo UI `Observable` object, which facilitates the updating of properties and notifying the view when it needs to be redrawn. The last line of JavaScript tells Kendo UI to apply bindings between the `viewModel` and the HTML element with the ID `"body"`, using normal jQuery selector syntax. In your view model, you have set a featured artist on the `featuredArtistName` property. This text string will be shown in the `<h3>` header element, due to the data-binding.

###### Example

    <h3>Featured Artist: <span data-bind="text: featuredArtistName"></span></h3>

The `featuredArtistAlbums` and `topSellingAlbums` properties of the view model are both set to the [Kendo UI DataSources](http://demos.telerik.com/kendo-ui/web/datasource/index.html) that will pull remote data from our WCF Data Service. In the case of the `featuredArtistAlbums` data source, there is additional code specified that enabled server-side filtering by artist name, which is using OData.

## Add the Image Rotator

The final item that needs to be added to the main page is an image rotator. Kendo UI does not actually provide an image rotator widget. However, the Kendo UI MVVM bindings are expendable, and so you will write your own custom binding to handle this.

### Define the Custom MVVM Binder

Start by setting up a property on the view model to hold the URLs for the images you want to rotate.

###### Example

    var viewModel = kendo.observable({
        bannerImages: [
            "/Content/Images/banner1.jpg",
            "/Content/Images/banner2.jpg"
        ]
    });

The `bannerImages` property is just a simple array of image URLs. Next, make our custom binding. The best practice is to separate your custom Kendo UI extensions into a separate file, or into multiple files if they become large. In this case, put your custom binder in `Scripts\App\kendo-custom-bindings.js`.

The example below demonstrates what the basic layout for the custom binder is.

###### Example

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

The example is assigning the binder to `kendo.data.binders.rotateImages` and `rotateImages` becomes the name of the binder.

The `init` function is called only once for each element that uses it. All startup and initialization should be performed here.

The `refresh` function is called whenever the MVVM framework determines that any watched properties on the bound view model changed. This is where you would normally put the code to update your element.

The `destroy` function is called when the binder is removed or cleaned up. Any tear-down code would be put here, and would normally undo anything that the `init` function did.

For the image rotator, your `init` function fetches the array of images to rotate, and a time delay value from a `data-rotate-delay` attribute to use to time the image change. It also defines a `doImageRotation` function that gets assigned to the binding, so you can get and use the function in the `refresh` method.

The example below demonstrates what the `init` function contains.

###### Example

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

Note the third line of code above.

###### Example

    var binding = this.bindings.rotateImages;

The `this.bindings` contains all the bindings that are being applied to this element. Each of them is added as a property with the same name as the binding. So `this.bindings.rotateImages` gives us this instance of the binder object.

The `refresh` function is called as the array of images is bound to the element, so that it knows to update.

The example below demonstrates what the code is.

###### Example

    refresh: function () {
        var binding = this.bindings.rotateImages;
        binding.imageIndex = 0;
        binding.doImageRotation();
        binding.interval = setInterval(binding.doImageRotation, binding.rotateDelay);
    }

This code again gets the instance of the binder using `this.bindings.rotateImages`. It then gets the current image index from a property on the binder. Then the `doImageRotation` function is called. This is called once to set the initial image, without waiting the time delay. Then the JavaScript `window.setInterval()` function is used to set up an interval that rotates the images on a time delay.

Note that if for some reason the `viewModel.bannerImages` array were to change, then the `*rotateImages.refresh` method will be called again, which will reset to index `0` of the images, and will start rotating the images again.

Also, the interval is saved to the binding, so that you can get to it later in the `destroy` method.

Finally, the `destroy` function just stops the interval that we started.

###### Example

    destroy: function () {
        var binding = this.bindings.rotateImages;
        clearInterval(binding.interval);
    }

The binding looks complicated, but functionally, it is fairly simple. It uses a JavaScript `setInterval()` to periodically change the `src` attribute of an `<img>` element. However, it demonstrates a way to retain data in the binding by adding properties to the object instance, and a way to pass in additional data, in this case the delay time. The examples use a second `data-*` property on the element, `data-rotate-delay`, and the custom binding can read this data property
with jQuery `$(element).data("rotate-delay")`.

### Apply the rotateImages Binder

Now you can make our HTML that uses our custom binding.

###### Example

    <img data-bind="rotateImages: bannerImages" data-rotate-delay="5000" />

You indicated that the `<img>` element will be bound to the custom `"rotateImages"` binding, using the `"bannerImages"` property of the view model as its data. Through the use of the additional `data-` attribute, you also indicated that your image will update every 5000 milliseconds (5 seconds).

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
