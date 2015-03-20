---
title: Fetch data from another domain
page_title: Use Cross-origin resource sharing to fetch data from another domain
previous_url: /howto/use-cors-with-all-modern-browsers
description: This how-to article explains how you can use CORS technology for the web.
position: 4
---

# Fetch data From Another Domain by using CORS with All (Modern) Browsers

CORS is cool. [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/) is a (slowly) emerging technology for the web that finally gives async web operations a way to directly grab resources from different domains. In fact, we've talked about CORS a couple of times on the Kendo UI blogs [here](http://blogs.telerik.com/kendoui/posts/11-08-25/shields_up_web_service_abstraction_with_kendo_ui) and [here](http://blogs.telerik.com/kendoui/posts/11-08-24/cross-domain_queries_to_odata_services_with_jquery).

By default, the "[same origin](https://developer.mozilla.org/En/Same_origin_policy_for_JavaScript)" security sandbox built-in to all browsers does not allow XHR (Ajax) calls across different domains. You can try, but you'll get an error that looks something like this:

**XMLHttpRequest cannot load [URL]. Origin [YOUR WEBSITE] is not allowed by Access-Control-Allow-Origin.**

This message basically says that you can't use Ajax to load resources from a different domain. But what's that last part of the error?

## Access-Control-Allow-Origin
CORS works by adding a special header to responses from a server to the client. If a response contains the Access-Control-Allow-Origin header, *and if the browser supports CORS*, then there is a chance you can load the resource directly with Ajax - no need for a proxy or [JSONP hacks](http://en.wikipedia.org/wiki/JSONP).

Why just a chance?

The header is capable of specifying *which* remote sites are allowed to load the cross-origin resources. For example, consider the following CORS header in a hypothetical response:

**Access-Control-Allow-Origin: [http://htmlui.com](http://htmlui.com/)**

With this configuration, only scripts that originate from [http://htmlui.com](http://htmlui.com/) are allowed to load resources from telerik.com. Any other domain trying to use Ajax to load resources from telerik.com will be given the standard security error message. In this way, site owners can limit which domains are allowed to load their resources with CORS.

Alternatively, site owners can grant wide-open access with the always ready to party asterisk:

__Access-Control-Allow-Origin: *__

Now, any site that wants to load a resource directly using Ajax can do so without getting the browser security error. It's a very helpful technique for modern apps that often load data using JavaScript, and hopefully more modern web APIs will start to support CORS. You can already find CORS in action with the [GeoNames.org](http://www.geonames.org/export/ws-overview.html) and [Last.fm](http://www.last.fm/api) APIs. Twitter does not yet support CORS, but [they are considering it](https://dev.twitter.com/discussions/1291) for APIs that already support JSONP. Facebook does not support CORS.

## Server-side Setting
Clearly, CORS is powerful. It opens-up the tightly controlled browser security sandbox that is essential to the trusted fabric of the web. As you might expect, then, it's a decision that must be made by site owners (you can't use CORS with sites that don't allow it), and it's controlled by web server configuration.

Anyone can "CORS-enable" their site by simply having the web server add the necessary Access-Control-Allow-Origin header. In fact, there is [an entire website dedicated to showing you how](http://enable-cors.org/) to add this header for a host of different web servers. In Apache, it's as simple as adding this line to the .htaccess file:

`Header set Access-Control-Allow-Origin *`

## Dealing with Browsers
It's never simple with browsers, especially when you want to ensure broad compatibility.

As confirmed by the useful [CanIUse.com](http://caniuse.com/#search=CORS), support for CORS is a bit of a mixed-bag. CORS is 100% ready to roll in:

- Webkit browsers (Chrome, Safari, iOS, Android)
- Gecko browsers (Firefox)
- Trident browsers (Internet Explorer 8+)
- Presto browsers (specifically, Opera 12+)

That's not bad. Unitl recently Opera was missing from that list, but with the release of Opera 12 in mid 2012, [Opera also now supports CORS](http://dev.opera.com/articles/view/dom-access-control-using-cross-origin-resource-sharing/).

We'll talk about handling old Opera versions more in a minute, but let's first address IE.

### Internet Explorer and XDomainRequest

IE, pre IE10, approaches cross origin resource sharing a bit differently. Rather than go the route of Webkit and Gecko, IE 8 and 9 do not reuse the standard Ajax XMLHttpRequest object for CORS requests. Instead, they introduce a *brand new* object for cross-origin resource sharing called [`XDomainRequest`](http://msdn.microsoft.com/en-us/library/cc288060(v=vs.85).aspx).

This means your Ajax code for cross-domain calls looks 100% identical to "same-domain" calls in Chrome and Firefox, but it will have to "fork" in Internet Explorer to use the new XDR object with CORS requests. A pain, but a solvable problem. *(There are some other limits with XDR, [but we'll leave that to you to research](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx).*

With this small snippet, we can write code that works with CORS XHR, XDR, and when that doesn't work, some kind of fallback approach:

    //Detect browser support for CORS
    if ('withCredentials' in new XMLHttpRequest()) {
        /* supports cross-domain requests */
        document.write("CORS supported (XHR)");
    }
    else{
      if(typeof XDomainRequest !== "undefined"){
         //Use IE-specific "CORS" code with XDR
         document.write("CORS supported (XDR)");
      }else{
         //Time to retreat with a fallback or polyfill
         document.write("No CORS Support!");
      }
    }

(You can [try this code snippet live in different browsers](http://jsbin.com/ohugih/8/edit) to confirm it works.)

The [`XMLHttpRequest2` object](http://www.w3.org/TR/XMLHttpRequest2/), which includes required support for CORS, can be used to "feature detect" browser support for CORS. If the browser's XHR object has the XHR2 "withCredentials" property, you're in business. If not, step 2.

In step 2, we take one more attempt to use CORS by looking for IE's proprietary `XDomainRequest` object (which works with the same Access-Control-Allow-Origin headers, by the way). If the XDR object exists, we're in IE and we can write the necessary code to do XDR CORS.

Finally, if all else fails (such as in older versions of Opera or IE6/7), we have to either provide an alternate experience or find a hack for CORS.

### Handling Opera (or non-CORS browsers)

Assuming we reach the point where XHR2/CORS and XDR are not available, what's the next step? Abandon CORS? As it turns out, you have a few choices. You can:

1. Use a CORS polyfill
There are a couple of rather "hacky" [polyfills for CORS](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) that rely on either A) Flash under the covers, or B) some voodoo HTML5. Either way, they work around the browser limits and try to give you some semblance of CORS support.

2. Use JSONP
Of course, if you can use JSONP, the argument can be made that you should just use JSONP instead of CORS for all browsers since it is still more universally supported. But let's say you're trying to "evolve" past JSONP except when you absolutely need it. In that case, you can fallback to XHR and JSONP callbacks with Opera and older browsers.

3. Display an error message
The most draconian of your choices, but given *most* browsers *do* support CORS, you could simply elect to tell the small auidence of users to update their browser. Just depends how important Opera and IE 6/7 traffic is to your site.

The choice is yours, but clearly, you have *some* choice that should still make CORS appealing.

## Putting It All Together
In the [Kendo UI Feed Reader demo](http://blogs.telerik.com/kendoui/posts/11-09-29/rss_feed_reader_built_with_kendo_ui_yql_amp_less), we use [YQL](http://developer.yahoo.com/yql/) to feed RSS XML directly to the browser. YQL supports CORS, so we elected to send XML to the browser instead of JSONP to highlight [Kendo UI's data source support for XML](http://demos.telerik.com/kendo-ui/web/datasource/xml-data.html).

Version 1 of this demo did not support non-CORS browsers. To add support for these browsers, we modified the code to use XDR with IE and YQL JSONP with Opera and all non-CORS browsers.

### Fixing IE with jQuery $.ajax transports

Making CORS code work with IE 8/9 is actually very easy thanks to [some code](https://github.com/dkastner/jquery.iecors) written by [Derek Kastner](http://twitter.com/#!/dkastner). With jQuery 1.5+, you can create custom "transport" implementations to control the inner-workings of jQuery $.ajax. Derek has done just that with XDR.

[His "iecors" project](https://github.com/dkastner/jquery.iecors) simply creates a jQuery transport that uses XDR in jQuery $.ajax requests when it's needed. All you have to do is add the small JS file to your page and everything starts working (no changes to your code). The Kendo UI Data Source, which uses jQuery $.ajax under the covers, will now use XDR in IE.

So, to make the Feed Reader demo CORS work in IE 8/9, a small snippet is added to the bottom of the page, after jQuery but before any Kendo script references:

    <!--[if lt IE 10]>
    <!--iecors provides a jQuery ajax custom transport for IE8/9 XDR-->
    <script src="scripts/jquery.iecors.js"></script>
    <![endif]-->

### Fixing Opera with More Code and JSONP

Unfortunately, fixing older versions of Opera is not as easy. And, ultimately, there is no clean way to do CORS in Opera. Your choices are to either display a "browser not supported" message for Opera (pre v12) users OR bite the bullet and "fallback" to YQL JSONP when CORS is just not going to work.

We elected to use the later approach in the Feed Reader demo since it also helps extend support to other older browsers.

    //**HACK for OPERA (and non-XHR2/XDR browsers)
    //For lack of a reasonable Opera workaround to support CORS, fallback to use
    //YQL support for JSONP when dealing with a browser than doesn't support
    //CORS XHR or XDR
    if (!('withCredentials' in new XMLHttpRequest()) && !(typeof XDomainRequest !== "undefined")){
        _feedItemDS = new kendo.data.DataSource({
            transport:{
                read:{
                    url: "#",
                    dataType: "jsonp"
                },
                dialect: function (options) {
                    var result = ["callback=?","format=json"],
                        data = options || {};

                    return result.join("&");
                }
            },
            schema:{
                type:"json",
                data:"query.results.rss.channel.item",
            }
        });
    //**END OPERA/Non-CORS HACK
    }

Now, Opera (any other non-CORS browser) will use an alternate configuration of the Kendo UI data source pointed at a JSONP endpoint and expecting a JSON response. Not pretty code, but it's functional. Sometimes, that's what it takes to build software that runs in *every major browser and platform.*

## Bottom Line on CORS
Hopefully this post helps highlight the value of CORS and how it can be used with most modern browsers. As more app code moves to the client, the need for CORS will only grow. Start playing with it today and help push web standards to the next level.

*[This article was [originally published on the Kendo UI Blogs](http://blogs.telerik.com/kendoui/posts/11-10-03/using_cors_with_all_modern_browsers) on October 3rd, 2011. Updated July 2012.]*
