---
title: Part 3 - Hello HTML5
page_title: Part 3 - Hello HTML5 | Kendo UI Third-Party Frameworks
description: "Learn in theory and in practice how to implement HTML5 in Visual Studio and build an HTML application in ASP.NET."
slug: part3_aspnetwebforms_tutorials
position: 3
---

# Part 3 - Hello HTML5

This module will cover HTML5 as a broad topic. Up to now, this course has not really touched on any actual HTML5 development, but has laid the groundwork for learning HTML5. It is important to understand the current concepts before taking on a much larger topic such as HTML5. This tutorial is more theoretical in nature, but looks at a few concrete implementations that can be used today when starting HTML5 development in Visual Studio with ASP.NET.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/hRlaVe6Eqg0?rel=0" frameborder="0" width="640"></iframe>

## Written Summary

Since HTML, CSS, and JavaScript API are the building blocks for displaying your web project to your users, read along to get acquainted with their basic concepts and application.

### HTML5

HTML5 is not a thing. It is not an Integrated Development Environment (IDE), nor is it a Software Development Kit (SDK), or a runtime. It is not a package that can be neatly downloaded. It is not an all or nothing technology. It is not exclusive to pet projects, startups, or one page demos and everyone can use it.

HTML5 is a set of new features in the areas of HTML, CSS, and JavaScript. It is a living standard, meaning that it is constantly growing and evolving. HTML5 is a term used to refer to the current direction of web technology, as the proliferation of connected devices completely changed the landscape of the Internet's presence and influence on the day-to-day life of nearly everyone. Given that HTML5 is a fluid concept, it is difficult to nail down exactly what constitutes an HTML5 application.

As previously mentioned, HTML5 essentially features three different categories, each of them constituting an available tool for building web applications.

### HTML

HTML includes concepts such as semantic tags, as well as new HTML elements like the Canvas, audio, and video tags.

New semantic tags introduce the concept of having HTML elements that not only define the visual layout of the page, but also their function in the page.

Some of the new tags are the `<header>`, `<footer>` and `<article>`. Content that appears in a `<header>` tag is not automatically laid out in a header format, but accessible screen readers are going to know that when the content in the `<header>` tag is not the real content of the page. The real content would most likely appear in the `<article>` or `<section>` tag.

The new `<canvas>` tag creates an area on the page that can be drawn to with JavaScript. The `<video>` and `<audio>` tags allow the developer to embed audio and video directly into the site, without having to use some sort of player, such as Flash or Silverlight.

### CSS

[CSS3](http://www.css3.info/) is the new standard for Cascading Style Sheets that has vastly expanded to including new layouts (such as the box), animations and transitions that are hardware accelerated (yes, you can move things around the page with CSS) and support for new color standards, such as [RGBA](http://www.css3.info/preview/rgba/) and [HSL](http://en.wikipedia.org/wiki/HSL_and_HSV).

### JavaScript API

The JavaScript Application Programming Interface (API) is one of the most important pieces of HTML5. JavaScript has gained massive popularity, largely in conjunction with the amazing success of jQuery. New APIs include [GeoLocation](http://en.wikipedia.org/wiki/Geolocation), [Device Orientation](http://dev.w3.org/geo/api/spec-source-orientation.html), [FileAPI](http://www.w3.org/TR/FileAPI/), [HistoryAPI](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history) and many others.

### Browser Support

HTML5 is entirely dependent on the browser in which the application is running, which usually is not within the capacity of developers to control. This is more difficult for ASP.NET developers who usually target the Internet Explorer (IE). Older IE versions, such as IE 7 or 8, are terribly fragmented, and their support for HTML5 is not good enough. IE 9 and later versions feature a significant improvement in this direction.

HTML5 has more to do with the browser technology rather than with ASP.NET. ASP.NET is as capable as any other platform of producing HTML5 applications. Due to the enterprise adoption of the entire Microsoft stack (Windows, Office, Active Directory, and IE), however, ASP.NET developers are sometimes limited in their ability to move their web applications forward into the HTML5 space.

There are available workarounds and solutions different scenarios you might come across while considering the possible limitations of a browser. These are commonly referred to as [polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/). Polyfills make HTML5 available when a certain feature is not supported by the browser. This is done by injecting the functionality that is missing by using JavaScript.

## Create Sample Application

### Get Started - HTML5 and ASP.NET

Open Visual Studio. Create a blank ASP.NET Web Application called **hello-html5**. Right-click the project, select **Add New Item**. In the **Add New Item** dialgue, select **Web Form**. Name it **Default.aspx**. Click **Add**.

**Figure 1. New Web Form**

![New Web Form](/images/webforms/hello-html5-new-web-form.png)

When the `Default.aspx` file is added, it opens in the designer. If it does not, open the file. Make sure you are viewing the HTML source of the Web Form and not the code behind.

### Remove HMTL5 Doctype

Notice the second line in the document. This is the [`doctype` tag](http://www.w3schools.com/tags/tag_doctype.asp). It designates this document as an HTML page. The tag is very long and confusing, so remove it entirely.

The new HTML5 doctype is very simple and replaces much of the unnecessary verboseness that was indicative of HTML documents previously.

The example below demonstrates how to add the  new HTML5 doctype to your page by using a line of code where the previous doctype declaration is removed.

###### Example

    <!doctype html>

The new HTML5 doctype is not case sensitive.

### Discard Excess Attributes

The figures below demonstrate how to remove excess attributes.

**Figure 2. Remove the unnecessary `xmlns` attribute**

![xmlns](/images/webforms/hello-html5-xmlns.png)

![No XMLNS](/images/webforms/hello-html5-no-xmlns.png)

Some of HTML5 involves simplifying the web development experience and removing all of the unnecessary and confusing configuration attributes.

### Add Semantic Tags

Inside the `form` tag, add some new HTML5 semantic tags to the page to demonstrate a hypothetical page structure. Delete the empty `div` that is there by default. Add the `<header`>, `<footer>`, `<section>`, and `<article>` tags.

**Figure 3. Addition of semantic tags**

![Semantic Tags](/images/webforms/hello-html5-semantic-tags.png)

Note that Visual Studio IntelliSense recognizes these as valid tags. Ensure that the schema validation selection is set to `HTML5`.

**Figure 4. HTML5 Schema Validation**

![HTML5 Schema Validation](/images/webforms/hello-html5-html5-schema-validation.png)

If **HTML5** is not available in the select box, ensure that you are running at least Visual Studio 2008 SP 1. If you cannot run at least Visual Studio 2008 SP1, you can get support for HTML5 schema validation in Visual Studio by downloading these packages:

**Figure 5. HTML5 schema validation support prior to Visual Studio 2008 SP 1**

[HTML5 Schema Validation Support Prior To 2008 SP 1.](http://blogs.msdn.com/b/webdevtools/archive/2009/11/18/html-5-intellisense-and-validation-schema-for-visual-studio-2008-and-visual-web-developer.aspx)

Add some filler text to the article section. You can use a Lorem Ipsum generator, such as [this one](http://dalekipsum.com/) to do this for you.

**Figure 6. Add some text**

![Lorem Ipsum](/images/webforms/hello-html5-lorem-ipsum.png)

#### Test the application

Press `F5` to run the application. Notice that there is nothing special about the layout of the content. `<header>`, `<section>`, `<footer>`, and `<article>` are all block level elements, so they are displayed vertically stacked on the page with a default margin between them.

**Figure 7. Output of the added text**

![F5 No Style](/images/webforms/hello-html5-f5-no-style.png)

Press `F12` to open the IE Developer Tools. Change the rendering mode from IE 9 to IE 7. Observe that there is virtually no change in the display.

**Figure 8. Browser Mode IE 7**

![Browser Mode IE 7 No Style](/images/webforms/hello-html5-browser-mode-ie-7-no-style.png)

### Display HTML5 in Older Browsers

Return to Visual Studio and add a stylesheet to the application by right-clicking the project. Select **Add New Item** > **Style Sheet** and name it `style.css`. Link the stylesheet in the page by dragging it from the **Project Explorer** and dropping it just under the empty title tag.

**Figure 9. Link stylesheet**

![Link Stylesheet](/images/webforms/hello-html5-link-stylesheet.png)

Open `site.css` and add some style to change the background color of the article to `salmon`, as demonstrated in the example below.

###### Example

    article {

        background-color: salmon;

    }

Press `F5` to run the application. The article now has a salmon colored background. Open the `F12` Developer Tools and select the IE 7 rendering mode. IE 7 does not apply the style to the article.

While older browsers, such as IE 6, 7, or 8, render semantic tags in pages, they do not apply the styles because they do not recognize the tags as being valid. It is possible to force IE to recognize and style these tags by creating the element in JavaScript.

### Use Modernizr

[Modernizr](http://modernizr.com/) is a feature detection library that helps developers know what features are supported at runtime. Additionally, Modernizer includes a pollyfill out of the box for the scenario created above with un- styled semantic tags.

Return to Visual Studio and stop the application if necessary. Right-click the project. Select **Add Library Package Reference** > **Online** and search for Modernizr.

**Figure 10. Modernizr**

![Modernizr](/images/webforms/hello-html5-modernizr.png)

Add **Modernizr** to the head of the page by dragging it from the scripts folder into the **Default.aspx** page and drop it directly below the stylesheet reference.

Press `F5` to run the application. Switch to IE 7 rendering mode. Note that the salmon background color style is applied.

Switch to the **HTML** tab. The `<html>` tag has now a long string of classes. Each of these classes indicates either a feature, or the lack of one. If a feature is not supported, it is prefixed with `no-`. Switch between IE 7, 8, and 9 rendering modes. The classes change to show what features are supported by each browser.

## Further Reading

The list of resources for HTML5 on the web is unprecedented in its variety and depth. Virtually any topic is well documented with runnable examples and code. Some of the valuable resources for HTML5 development include:

* [HTML5 Rocks](http://html5rocks.com)
* [HTML5 Doctor](http://html5doctor.com/)
* [Modernizr Website](http://modernizr.com/)

## See Also

Tutorials on how to build an HTML application in ASP.NET:

* [Part 1 - Hello jQuery]({% slug part1_aspnetwebforms_tutorials %})
* [Part 2 - Hello Services]({% slug part2_halloservices_aspnetwebforms_tutorials %})
* [Part 4 - Hello Kendo UI]({% slug part4_aspnetwebforms_tutorials %})
* [Part 5 - Hello Kendo UI Grid CRUD Operations]({% slug part5_aspnetwebforms_tutorials %})
