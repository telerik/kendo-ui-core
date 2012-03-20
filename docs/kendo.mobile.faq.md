## Why would I choose Kendo UI Mobile vs jQuery Mobile?
In the simplest terms, there are two ways we provide extended benefit and a differentiated approach than jQuery Mobile. First, Kendo UI Mobile is a cohesive mobile framework for all of your HTML/JS development, whereas jQuery Mobile is primarily focused on UI (and mostly mobile UI at that). Kendo UI provides core framework components, like templating, MVVM, validation, and a data source, as well as UI for mobile touch interfaces.  

Second, our approach to solving the mobile UI problem is different than jQuery Mobile. Where jQuery Mobile tends to promote a "one size fits all" UI model, we think UIs should be tailored to touch interaction mode and platform (iOS/Android/BlackBerry/etc.). Kendo UI Mobile exemplifies this by providing UI widgets that "look right" wherever they run. On iOS, they look like iOS widgets. On Android, they look like Android widgets.


## Does Kendo UI Mobile support Windows Phone?
Currently, Kendo UI Mobile does not support Windows Phone 7 due to a combination of missing
features in Internet Explorer, such as support for touch events. If you're looking for Metro-style,
Windows 8-like controls, we include the Metro theme in Kendo UI Web, which provides a look-and-feel
that mimics that experience. It's pretty nice, in fact.

Also check [this blog post](http://www.kendoui.com/blogs/teamblog/posts/12-02-06/kendo_ui_on_windows_phone.aspx) on the subject.

## Does Kendo UI Mobile support Blackberry?

Blackberry support is a first-grade, in fact. Check out our [online
demos](http://demos.kendoui.com/mobile/), where a simulator is provided. You can also browse the
demos using your blackberry device for native experience.

## Why does the iOS theme look just slightly different from an actual iOS application?

For performance and flexibility reasons, the iOS theme does not use any images. The UI elements are
built with CSS effects only.

## Can I use the DataViz with the mobile?

Yes. There aren't any known issues and conflicts betwen Kendo UI Mobile and Kendo UI DataViz. Make
sure to initialize the dataviz widgets on the view init event.

## Can I use the Web Widgets with the mobile?

Yes. There aren't any known issues and conflicts betwen Kendo UI Mobile and Kendo UI Web. Make sure
to initialize the widgets on the view init event.

## Can I use native device features like the camera?

Kendo UI Mobile itself does not expose such functionality. It is in fact, a matter of browser
limitations. If you need to access the native device features, we recommend
[PhoneGap](http://phonegap.com/).

## Can I build a site and have it adaptive render down from Web to Mobile?

Although possible, this approach is not practical, and may lead to quite complex code base. The
recommended way to handle this would be to do a server-side agent detection and redirect mobile
devices to a different URL for the mobile version of the website.

## What format does my data need to be in for Kendo UI Mobile?

Kendo UI Mobile is designed on top of the Kendo UI Framework, which is common for Kendo UI Web,
Kendo UI Mobile, and Kendo UI DataViz.
The recommended way to consume data is through the [DataSource
component](http://www.kendoui.com/documentation/framework/datasource/overview.aspx).
The DataSource supports variety of formats, including JSON, JSONP, XML, and OData.

## Can I upload files from the mobile application?

iOS does not support file upload. It works if the application is [wrapped with
PhoneGap](http://wiki.phonegap.com/w/page/18270855/Image%20Upload%20using%20JQuery%20and%20Python),
though.

## Can I store my data locally?

Yes, you can use the [Web Storage API](http://dev.w3.org/html5/webstorage/). Currently, Kendo UI
Mobile does not offer
any enhancements on top of it, but this may change in the future.

## Does Kendo UI Mobile work with PhoneGap?

Kendo UI works and is tested actively in PhoneGap. If you experience any troubles, do not hesitate
to contact us.
