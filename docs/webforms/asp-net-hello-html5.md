---
title: Part 3 - Hello HTML5
page_title: Tutorial for HTML5 Development in Visual Studio
description: This tutorial will introduce you to HTML5 development with ASP.NET. Learn the theory and look at the implementation of HTML5 development in Visual Studio.
position: 3
---

# Tutorial: HTML5 Development With ASP.NET Part 3, Hello HTML5

This module will cover HTML5 as a broad topic. Up until now, this course has
not really touched on any actual HTML5 development, but has laid the
groundwork for learning HTML5. It's important to understand the current
concepts before taking on a much larger topic such as HTML5. This tutorial
will be more theoretical in nature, but will look at a few concrete
implementations that can be used today to begin doing HTML5 Development in
Visual Studio with ASP.NET.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/hRlaVe6Eqg0?rel=0" frameborder="0" width="640"></iframe>

## Written Content

### What is HTML5?

HTML5 is not a thing. It is not an IDE, an SDK or a runtime. It is not a
package that can be neatly downloaded. It is not an all or nothing technology.
It is not exclusive to pet projects, startups or nifty one page demos. It is
not owned by anyone, but by everyone.

HTML5 most simply put, is a set of new features in the areas of HTML, CSS and
JavaScript. It is a "living standard", meaning that it is constantly growing
and evolving. HTML5 is really a term used to refer to the current direction of
web technology, as the proliferation of connected devices has completely
changed the landscape of the internet's presence and influence on the day to
day life of nearly everyone. The truth is, you are probably doing some amount
of HTML5 development already, but you just haven't realized it.

Given that HTML5 is such a fluid concept, its difficult to nail down exactly
what constitutes an HTML5 application.

As was previously mentioned, HTML5 is really broken up into three different
categories, each of which constitute an available tool for building web
applications.

### HTML

The first area is HTML. This includes concepts such as semantic tags, as well
as new HTML elements like the canvas, audio and video tags.

New semantic tags introduce the concept of having html elements that not only
define the visual layout of the page, but their function in the page as well.

For instance, some of the new tags are the `<header>`, `<footer>` and
`<article>`. Content that appears in a `<header>` tag will not be
automatically laid out in a header format, but accessible screen readers will
know that when the content in the `<header>` tag is not the real content of
the page. The real content would most likely appear in the `<article>` or
`<section>` tag.

The new `<canvas>` tag creates an area on the page that can be drawn to with
JavaScript. The `<video>` and `<audio>` tags allow the developer to embed
audio and video directly into the site, without having to use some sort of
player, such as Flash or Silverlight.

### CSS

The second is [CSS3](http://www.css3.info/). This is the new standard for Cascading Style Sheets
that has vastly expanded to including new layouts (such as the box),
animations and transitions that are hardware accelerated (yes, you can move
things around the page with CSS) and support for new color standards, such as
[RGBA](http://www.css3.info/preview/rgba/) and [HSL](http://en.wikipedia.org/wiki/HSL_and_HSV).

### JavaScript API's

This is quite possibly one of the most important pieces of HTML5. JavaScript
has gained massive popularity, largely in conjunction with the amazing success
of jQuery. New API's include [GeoLocation](http://en.wikipedia.org/wiki/Geolocation), [Device Orientation](http://dev.w3.org/geo/api/spec-source-orientation.html),
[FileAPI](http://www.w3.org/TR/FileAPI/), [HistoryAPI](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history) and many many others.

### No Browser Left Behind

One of the difficult things about HTML5, is that it is entirely dependent on
the browser in which the application is running. This is something the
developer may or may not have control over. Given that there are 5 major
browsers, its difficult to know where your application is going to end up
running. This is even more difficult for ASP.NET Developers, who are usually
targeting IE. IE is terribly fragmented, and it's support for HTML5 is frankly
terrible. While IE 9 is much much better, not every developer has the luxury
of developing for such a capable browser. Most are still targeting IE 7 and 8.
Some are still even targeting 6 for primary support.

You can see from the description of HTML5 that it has nothing to do with
ASP.NET, but rather the browser. ASP.NET is just as capable as any other
platform of producing HTML5 applications, but due to the enterprise adoption
of the entire Microsoft stack (Windows, Office, Active Directory and IE),
ASP.NET developers often feel limited in their ability to move their web
applications forward into the HTML5 space.

However, there are work-arounds and solutions available for just about any
scenario you can imagine when it comes to the limitations of the browser.
These are commonly referred to as [polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/). Polyfills make HTML5
available when a certain feature is not supported by the browser. This is done
by injecting the functionality that is missing using JavaScript. The great
strength of HTML5 is that the community that has been moving it forward has
not forgotten about those still living with the browser "sins" of the past.

### Getting Started With HTML5 And ASP.NET

Open **Visual Studio** and create a blank **ASP.NET Web Application** called
**hello-html5**.  Right-click the project and select **Add New Item**.  In the
**Add New Item** dialgoue, select **Web Form**.  Call it **Default.aspx** and
click **Add**.

![New Web Form](/images/webforms/hello-html5-new-web-form.png)

When the **Default.aspx** file is added, it will open in the designer.  If it
doesn't, open the file.  Make sure you are viewing the HTML source of the Web
Form and not the code behind.

### New HMTL5 Doctype

Notice the second line in the document.  This is the [doctype](http://www.w3schools.com/tags/tag_doctype.asp) tag.
This tag designates this document as an HTML page.  Notice that the tag is
very long and somewhat confusing.  Remove this tag entirely.

The new HTML5 doctype is very simple, and replaces much of the unnecessary
verboseness that has been indicative of HTML documents for some time.

To add the new HTML5 doctype to your page, add the following line of code
where you removed the previous doctype declaration.


### New HTML5 Doctype


    <!doctype html>



The new HTML5 doctype is not case sensitive.

### Remove Excess Attributes

On the line below the doctype, remove the **xmlns** attribute.  This is not
necessary.

![xmlns](/images/webforms/hello-html5-xmlns.png)

![No XMLNS](/images/webforms/hello-html5-no-xmlns.png)

Some of HTML5 involves simplifying the web development experience and removing
all of the unnecessary and confusing configuration attributes.

### Add Semantic Tags

Inside the **form** tag, add some new HTML5 semantic tags to the page to
demonstrate a hypothetical page structure.  Delete the empty **div** that is
there by default.  Add `<header`>, `<footer>`, `<section>` and `<article>`
tags.

![Semantic Tags](/images/webforms/hello-html5-semantic-tags.png)

Notice that Visual Studio intellisense recognizes these as valid tags.  Ensure
that the schema validation selection is set to **HTML5**.

![HTML5 Schema Validation](/images/webforms/hello-html5-html5-schema-validation.png)

If **HTML5** is not available in the select box, ensure that you are running
at least Visual Studio 2008 SP 1.  If you cannot run at least Visual Studio
2008 SP1, you can get support for HTML5 schema validation in Visual Studio by
downloading these packages…

[HTML5 Schema Validation Support Prior To 2008 SP 1.](http://blogs.msdn.com/b/webdevtools/archive/2009/11/18/html-5-intellisense-and-validation-schema-for-visual-studio-2008-and-visual-web-developer.aspx)

Add some filler text to the article section.  You can use a **Lorem Ipsum** generator to do this for you.  My favorite one is [here](http://dalekipsum.com/).

![Lorem Ipsum](/images/webforms/hello-html5-lorem-ipsum.png)

### Run The Application

Press **F5** to run the application.  Notice that there is nothing special
about the layout of the content.  `<header>`, `<section>`, `<footer>` and
`<article>` are all block level elements, so they are displayed vertically
stacked on the page with a default margin between them.

![F5 No Style](/images/webforms/hello-html5-f5-no-style.png)

Press **F12** to open the IE Developer Tools.  Change the rendering mode from
IE 9 to IE 7.  Observe that there is virtually no change in the display.

![Browser Mode IE 7 No Style](/images/webforms/hello-html5-browser-mode-ie-7-no-style.png)

### Breaking HTML5 In Older Browsershello-html

Return to **Visual Studio** and add a stylesheet to the application by right-
clicking the project and select **Add New Item**.  Select **Style Sheet** and
name it **style.css**.  Link the stylesheet in the page by dragging it from
the **Project Explorer** and dropping it just under the empty title tag.

![Link Stylesheet](/images/webforms/hello-html5-link-stylesheet.png)

Open the **site.css**  file and add the following style to change the
background color of the article to **salmon**.

### Change The Background Color To Salmon


    article {

        background-color: salmon;

    }


Press **F5** to run the application.  The article now has a salmon colored
background.  Open the **F12** developer tools and select the IE 7 rendering
mode.  IE 7 does not apply the style to the article.

While older browsers such as IE 6 and 7 or 8 will render semantic tags in
pages, they won't apply the styles because they don't recognize the tags as
being valid. It is possible to force IE to recognize and style these tags
simply be creating the element in JavaScript.

### Modernizr

[Modernizr](http://modernizr.com/) is a feature detection library that helps developers know what
features are supported at runtime.  Additionally, Modernizer includes a
pollyfill out of the box for the scenario we have just created above with un-
styled semantic tags.

Return to Visual Studio and stop the application if necessary.  Right-click
the project and select **Add Library Package Reference**.  Select online
from the left-hand side and search for **modernizr.**

![Modernizr](/images/webforms/hello-html5-modernizr.png)

Add **Modernizr** to the head of the page by dragging it from the scripts
folder into the **Default.aspx** page and drop it directly below the
stylesheet reference.

Press **F5** to run the application.  Switch to IE 7 rendering mode and notice
that the salmon background color style is applied.

Switch to the **HTML** tab and notice that the `<html>` tag now has a long
string of classes.  Each of these classes indicates either a feature, or the
lack of one.  If a feature is not supported, it will be prefixed with `no-`.
Switch between IE 7, 8 and 9 rendering modes and notice how the classes change
to show what features are supported by each browser.

### Resources / Further Reading

The list of resources for HTML5 on the web is unprecedented in it's variety
and depth.  Virtually any topic is well documented with working examples and
code.  Below are a list of a few of the valuable resources for HTML5
Development.

[HTML5 Rocks](http://html5rocks.com)

[HTML5 Doctor](http://html5doctor.com/)

[Modernizr Website](http://modernizr.com/)
