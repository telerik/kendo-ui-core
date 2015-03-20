---
title: Icons
position: 7
---

# Icons in Kendo UI Mobile

> **Important:** Current WP8 versions do not support web fonts loaded from a local CSS when used in PhoneGap or HTML5 applications!
Unfortunately there are no known workarounds yet. Use [images for icons](#custom-icons-in-wp8) when targeting WP8 applications.

Kendo UI Mobile includes 38 integrated font icons, which can be used directly in a Kendo UI Mobile project by specifying a `data-icon` attribute with one of the following icon names
(supported by all Button widgets and the ListView items):

<ul class="additional-icons">
    <li><span class="button km-about"></span>about</li>
    <li><span class="button km-action"></span>action</li>
    <li><span class="button km-add"></span>add</li>
    <li><span class="button km-bookmarks"></span>bookmarks</li>
    <li><span class="button km-camera"></span>camera</li>
    <li><span class="button km-cart"></span>cart</li>
    <li><span class="button km-compose"></span>compose</li>
    <li><span class="button km-contacts"></span>contacts</li>
    <li><span class="button km-delete"></span>delete</li>
    <li><span class="button km-details"></span>details</li>
    <li><span class="button km-downloads"></span>downloads</li>
    <li><span class="button km-fastforward"></span>fastforward</li>
    <li><span class="button km-favorites"></span>favorites</li>
    <li><span class="button km-featured"></span>featured</li>
    <li><span class="button km-globe"></span>globe</li>
    <li><span class="button km-history"></span>history</li>
    <li><span class="button km-home"></span>home</li>
    <li><span class="button km-info"></span>info</li>
    <li><span class="button km-more"></span>more</li>
    <li><span class="button km-mostrecent"></span>mostrecent</li>
    <li><span class="button km-mostviewed"></span>mostviewed</li>
    <li><span class="button km-organize"></span>organize</li>
    <li><span class="button km-pause"></span>pause</li>
    <li><span class="button km-play"></span>play</li>
    <li><span class="button km-phone"></span>phone</li>
    <li><span class="button km-recents"></span>recents</li>
    <li><span class="button km-refresh"></span>refresh</li>
    <li><span class="button km-reply"></span>reply</li>
    <li><span class="button km-rewind"></span>rewind</li>
    <li><span class="button km-search"></span>search</li>
    <li><span class="button km-settings"></span>settings</li>
    <li><span class="button km-share"></span>share</li>
    <li><span class="button km-sounds"></span>sounds</li>
    <li><span class="button km-stop"></span>stop</li>
    <li><span class="button km-toprated"></span>toprated</li>
    <li><span class="button km-trash"></span>trash</li>
    <li><span class="button km-volume"></span>volume</li>
    <li><span class="button km-wifi"></span>wifi</li>
</ul>

In addition to these icons, there are more icons available inside the font file distributed with Kendo UI Mobile. For a full list of them, check the [end of this document](#additional-icons-in-kendo-ui-mobile-font).

# Creating custom icon font

Currently there are two options - using a font generator service like [Fontello](http://fontello.com/) to simplify the task, or prepare the icon, SVG and fonts manually.

Using [Fontello](http://fontello.com/) is pretty straightforward - pick the icons, choose the Unicode characters for them, type a font name and click Download to get a ZIP file
with the needed for mobile TTF and WOFF font formats, which can be directly used for icons. From the other files in there, EOT is not needed as it targets only IE6-8 and the
SVG font can be used to further modification.

The manual way is considerably more difficult. First create the desired icons using a vector editing software like Inkscape or Adobe Illustrator.
Export them to SVG format. Consult [these](http://www.webdesignerdepot.com/2012/01/how-to-make-your-own-icon-webfont/)
[articles](http://cleversomeday.wordpress.com/2010/02/09/inkscape-dings/) about SVG font creation using [Inkscape](http://inkscape.org/).
Import the SVG icons in Inkscape and create the SVG font icon by icon, assigning them to separate characters.
After creating the SVG font, convert it to TTF/WOFF formats, using [Online Font Converter](http://onlinefontconverter.com/) or other similar service.

### Loading the two fonts (TTF/WOFF) with @font-face:
    <style>
        @font-face {
            font-family: "MyCustomFont";
            src: url("images/MyCustomFont.woff") format("woff"),
                 url("images/MyCustomFont.ttf") format("truetype");
        }
    </style>

### Overriding the Kendo UI font for all icons (alternatively separate classes can be used to override them one by one)
    <style>
        .km-icon:after,
        .km-icon:before
        {
            font: 1em/1em "MyCustomFont";
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="favorites">Home</a>
    </div>

### Specify the character corresponding to every custom icon.
    <style>
        .km-mycustomicon:after,
        .km-mycustomicon:before
        {
            content: "\E03a";
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="mycustomicon">Home</a>
    </div>

Where mycustomicon is the icon name set in the data-icon attribute and \E03a is the Unicode character code of the icon.

## Serving icon fonts

As of Q3 2012, Kendo UI Mobile employs an icon font for its icon rendering. To be able to render it in most mobile and supported Desktop browsers out there, there are two font formats included in the Kendo UI distribution - TTF and WOFF. Most web servers out there doesn't support serving these fonts with a specific mime type. Since currently there is no standardized mime types for fonts, you only need to serve them both with mime type application/octet-stream or you can come up with any valid mime type (like application/x-font-ttf and application/x-font-woff for instance).

## Configure IIS

The two mime types can be specified either through the IIS management console (inetmgr) or in the site Web.config, like this:

### Configure IIS Web.config

    <?xml version="1.0"?>
    <configuration>
        ...
        <system.webServer>
            ...
            <staticContent>
                <remove fileExtension=".ttf" />
                <mimeMap fileExtension=".ttf" mimeType="application/octet-stream" />
                <remove fileExtension=".woff" />
                <mimeMap fileExtension=".woff" mimeType="application/octet-stream" />
            </staticContent>
        </system.webServer>
    </configuration>

Removing the mime type first is there to avoid clashes if the mime types for these files are already defined /IIS throws exception if they are/. Can be removed if not needed.

## Configure Apache

Apache configuration in some distributions includes mime-types application/x-font-ttf and application/x-font-woff by default. If these mime types are not listed, they can be added easily like this:

### Configure Apache in .htaccess

    AddType application/x-font-ttf .ttf
    AddType application/x-font-woff .woff

### Configure Apache in mime.types file

    application/x-font-ttf .ttf
    application/x-font-woff .woff

## Configure Nginx

For Nginx the configuration is similar:

### Configure Nginx mime.types file

    application/x-font-ttf .ttf
    application/x-font-woff .woff


## Configure CORS headers

Since fonts are usually copyrighted, most browsers doesn't allow using them across different domains. If serving multiple domains from one font location is needed, the fonts should be served with a Access-Control-Allow-Origin header. This header also supports using * instead of the domain name list, and while using it for normal text fonts is not advisable, it can be freely used for our icon font if the icons are living in a Kendo UI Mobile application. Configuration goes like this:

### Configure IIS - place a web.config in the font folder and add this in it:

    <httpProtocol>
      <customHeaders>
        <add name="Access-Control-Allow-Origin" value="*" />
      </customHeaders>
    </httpProtocol>

### Configure Apache

    <FilesMatch "\.(ttf|woff)$">
    <IfModule mod_headers.c>
        Header set Access-Control-Allow-Origin "*"
    </IfModule>
    </FilesMatch>

### Configure Nginx

    location / {
        ...
        if ($filename ~* \.(ttf|woff)$){
            add_header Access-Control-Allow-Origin *;
        }
    }

## Using Custom Icons with background-image

To use any image for an icon in Kendo UI Mobile, raise the specificity of the background-image style to at least 40 in order to override the defaults. Use background-size to resize the image accordingly.

### Define custom background-image icon

    <style>
        .km-root .km-pane .km-view .km-custom
        {
            background-image: url("custom.jpg");
            -webkit-background-clip: border-box;
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="custom">Home</a>
    </div>

## Using Custom Icons with WebKit masks

To use colorizable icon masks, specify the icon image as a **box mask** (either as dataURI or as a separate image).
The image should be **PNG8** or **PNG24** with alpha channel (**PNG8+Alpha** is supported by only few graphic editors, so **better stick with PNG24** if not sure).
The image color is not important - it will be used as a mask only - the alpha transparency will clip the colorized content.

> **Important:** WebKit masks have numerous bugs across most platforms - **consider using them only if necessary**! <br /><br />
In Android and MeeGo Webkit masks are unreliable - they can be turned into colorized rectangles by a simple CSS transformation at the wrong place.
In BBOS 7.0 WebKit masks are completely broken - though they work in BBOS 6.0 and 7.1!

### Define custom WebKit mask for an icon

    <style>
        .km-custom {
            -webkit-mask-box-image: url("foo.png");
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="custom">Home</a>
    </div>
> **Important:** WebKit masks are now deprecated for Android mobile application, where background: url() should be used instead. WebKit masks can still be used in iOS applications.

In Q3 2012 due to numerous issues with WebKit mask icons, they were deprecated and Kendo UI Mobile introduced font icons. This change requires the usage of additional styling
to enable the WebKit masks as icons. Please note that the below example will disable all font icons.

### Define custom icon after Q3 2012

    <style>
        .km-root .km-pane .km-view .km-icon {
            background-size: 100% 100%;
            -webkit-background-clip: border-box;
            background-color: currentcolor;
        }

        .km-custom {
            -webkit-mask-box-image: url("foo.png");
            background-color: red;
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="custom">Home</a>
    </div>

If you want to add only one or two custom icons, specify them with their respective classes (.km- + data-icon name):

### Restyle only the custom icon.

    <style>
        .km-root .km-pane .km-view .km-question {
            background-size: 100% 100%;
            -webkit-background-clip: border-box;
            background-color: currentcolor;
        }

        .km-question {
            -webkit-mask-box-image: url("foo.png");
            background-color: red;
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="question">Home</a>
    </div>

When custom icons are used and their names are the same as the integrated Kendo UI Mobile icon names, make sure that the font icons are not rendered.

### Hide all Kendo UI Mobile font icons.

    <style>
        .km-root .km-pane .km-view .km-icon:after,
        .km-root .km-pane .km-view .km-icon:before
        {
            visibility: hidden;
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="custom">Home</a>
    </div>

Again if only several icons should be overridden, specify them with their classes instead:

### Hide only one Kendo UI Mobile font icon.

    <style>
        .km-root .km-pane .km-view .km-favorites:after,
        .km-root .km-pane .km-view .km-favorites:before
        {
            visibility: hidden;
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="favorites">Home</a>
    </div>

## Custom icons in WP8

Windows Phone 8.0 has some severe issues that may affect your icons usage. First of all, masks are not supported in any way (Firefox allows SVG mask usage, WebKit/Blink have image masks, although broken in Android.
If you plan to only have a web app that runs in the browser, you can go for font icons as they look better across different resolutions and can be colorized.
The default Kendo UI Mobile icons will work, as any icon font like Font Awesome. Learn more about using font icons and Font Awesome from [this excellent blog post](http://blogs.telerik.com/kendoui/posts/13-09-17/easy-custom-kendo-ui-mobile-icons-with-font-awesome).

However, if you plan to create a hybrid app with PhoneGap or HTML5 template in WP8 SDK, font icons don't work there - the WebView [doesn't load them at all](http://stackoverflow.com/questions/14575208/using-css-font-face-in-a-phonegap-windows-phone-8-app).
We provide image replacements for our default icons, but if you want custom ones, you are left out with only normal images/backgrounds and you need to provide one for normal and another for the selected state
(if they differ). You should also think about the dark and light background themes in WP8, as Kendo UI Mobile automatically supports them in Cordova.

### How we define WP8 app icon backgrounds in Kendo UI Mobile:

    <style>
        .km-on-wp.km-app .km-icon:after,
        .km-on-wp.km-app .km-filter-wrap:before,
        .km-on-wp.km-app .km-state-active .km-icon:after
        {
            background-image: url("images/wp8_icons.png");
        }
        .km-wp-light.km-app .km-icon:after,
        .km-wp-light.km-app .km-filter-wrap:before
        {
            background-image: url("images/wp8_inverseicons.png");
        }
        .km-on-wp.km-app .km-action:after
        {
            background-position-x: 20%;
        }
        .km-on-wp.km-app .km-add:after
        {
            background-position-x: 22%;
        }
    </style>

The sprite is laid out horizontally and we use background-size and background-position-x to specify the icon offsets. This is done to allow the icon to be resized with its container size.
You don't need your icons to have circles around them, as they are defined in CSS just for the TabStrip.

## Additional icons in Kendo UI Mobile font

The icon font shipped with Kendo UI Mobile contains much more icons than the 34 defined ones (about 10 times more). The reason for this is that we wanted to keep our CSS small. In order to use them,
you can choose an icon from the list below and add a definition for it in your CSS using its Unicode character code (be sure to have a km- prefix):

    <style>
        .km-arrow-e:after,
        .km-arrow-e:before
        {
            content: "\e000";
        }
    </style>

    <div data-role="tabstrip">
        <a href="#index" data-icon="arrow-e">Home</a>
    </div>

After that you will be able to specify it as a data-icon="arrow-e" in your application.

Keep in mind that icons with Unicode codes from \e0ca to \e0f0 are the original Kendo UI Mobile icons listed in the beginning of the article. Also, the ones starting from \e200 are
already defined and in use, but only in the iOS7 platform theme (and available starting from Q2 2013 SP).

<style>
@font-face {
    font-family: "KendoUI";
    src: url("data:application/octet-stream;base64,d09GRgABAAAAAGTMAA8AAAAAyWgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABWAAAABoAAAAcaL6l5EdERUYAAAF0AAAAHwAAACABhAAET1MvMgAAAZQAAABEAAAAVjWqVXJjbWFwAAAB2AAAAlIAAAQE/0I+lWdhc3AAAAQsAAAACAAAAAj//wADZ2x5ZgAABDQAAFTXAACrFLgfaDVoZWFkAABZDAAAACsAAAA2/+V492hoZWEAAFk4AAAAHAAAACQIXgQEaG10eAAAWVQAAAFIAAACtmumW+9sb2NhAABanAAAArAAAAKwhMGwXG1heHAAAF1MAAAAHwAAACABsAFVbmFtZQAAXWwAAADrAAABjLnnV1Nwb3N0AABeWAAABQIAAA5qwMX95nZoZWEAAGNcAAAAIAAAACQGYAq4dm10eAAAY3wAAAFOAAACtkTHT5J4nGNgYGBkAIIz4kXJIPpc8MwDMBoAQIcGrgAAeJxjYGRgYOADYgkGEGBiYGRgZAwDkixgHgMACAgAigB4nGNgZGFgnMDAysDBNJPpDAMDQz+EZnzNYMzIycDAxMAKJGFAAMFkCEhzTWFweMDwWI3Z+L8xQwwLRJgRRAAA2KkKn3ic3ZJlV5QBEIWfuywIFiWKGKgIgmKgYCuIhaSE3d3d3d3d3d3d3d2t2N0d67vwyb/gnTN1ztyZD3MBG5I9MzIipj9Gp6TebEo0ckrsMRnGA3Oiz0Mfi8U6dZ8HlkRLcp0EK8Pe5GSqm1SbjB1mbLEjhcF2MHakIjVpSIsjTjjjgivpcCM9GXAnIx5kMu5lISueZCM7OfAiJ974kAtf/MhNHvzJSz7yU4AAClKIQIIoTBGKUozilKAkpShNMCGUIZSylKM8FahIGJUIJ4JIoogmhsrEEkc8CVSlGtWpQU1qUZs61KUe9WlAQxrRmCY0pRnNaUFLWtGaNrSlHe3pQEc60ZkudKUb3elBT3rRmz70pR/9GcBABjGYIQxlGMMZwUhGMZoxjGUc45nARCYxmSlMZRrTmcFMZjGbOcxlHvNZwEIWsZglLGUZy1nBSlaxmjWsZR3r2cBGNrGZLWxlG9vZwU52sZs97GUf+znAQQ5xmCMc5RjHOcFJTnGaM5zlHOe5wEUucZkrXOUa17nBTW5xmzvc5Z71sSTykEc85glPecZzXvCSV7zmDW95x3s+8JFPfOYLX/nGd37wk1/85g8WIckkG5llKztVUQrZy0EplUqplUZp5SgnOctFrkonN6VXBrkrozyUSZmVRVnlqWzKrhzyUk55y0e55Cs/5VYe+SteVZVX+ZRfBRSggiqkQAWpsIqoqIqpuEqopEqptIIVojIKVVmVU3lVUEWFqZLCFaFIRSlaMaqsWMUpwZCqXbJ0kyRsssqffyH+e/wFfZWcfQAAAAAAAf//AAJ4nOy9CZhbxZUofOuWpKtdutput6RubS2p2723WlJ76e7r9oLtNnYb8L7Q2Bhss7WNQ1iDwhJsCMEBYpKQmIYEXmYGAtiGkDgYhYFMkp8QyHiyzvMYZkgyeQnxDCQz/GNdv3Oq7pXUbTsk87//fe9739itqrp1azm1na1O1RWIAP/or0zgCEJvQk7QX51qgCdCVJIUy+JxQYQHOQ2PJfG4Nv+4gO+SRBWPi2X2jiZE4Tj5pljWSme8i8Dj8eP4ipSml+kiPF48fvw4f6fCO5bPRmRWX12+6jt4dc53NpLQy2TATMuXMPJhk0V4gCZDo02CBG8bSU6maVksq6pWosJp+C/CD1qMaQVMC+XwtME2kjfTBMYSTIONVzGfwNOqrFyRpY1A/wQTeeyG41gkFRA+raSqerliuQqDnGsUzTIRAExIVitdYP1ahraUjLYUSbmMTSnzd6xhosreSTAeZXhWq+8gpVhi75QiUSFjqay/K0GZql6mpIj4rmy8+7nwILWIXxNkeMhmkpZAjEiWQKhvmBSyBVF7z6Z4rW+/bfUqtvdshJBvvgdBjGjwWt+3uVysjIuJl94mztbLkDIewktQQn2Ffnrje3aXy4b5bG9hPqJiSRDRwEtumF6GkEl6DFhCxRBAQm/zNljffgtheQ8qtb9nFdt1sAAKKOx96/S2FAv9WIxFsUAhAEZWjGJd1lrd5Im3rXqBkB9e4bgKHxXepXupD8pI6ZBUi+iGQs1n9BH5kqxY37MTAlApsu2tt2zkvxsh/Q0lso1V8x7GANjHjIDCX0C97wofpT66V/AJLQC9ZUoXdpOMJNZ1B2tZllQc1qnl/FqZWg/dS6xTQdHC04DFvhdUQaVlWhYUnB+5YCovKXnwlGIKvGIWInKi8MwEzJnyxDMHd7189OjLu2j5pfLEs8/uevmll17e9eyzE2UopySUKPzHcvxyUZGyciILXkKWwJMTEFEsXXvo4G6i7jp08FqiXvvswV1aefehw9fSkla+9vCh3Vp518Fn8c3BQ7uIuvvgoWuFunJtOLcJlkoUWVSv1VRMSsqQHcNQBISJKkzLA7AQBIJA7SwBJmY1VgsQeD+Q5bQsPsvqgS5IYNth/cNyEY8erWjis9BebCvOtTFBFQ9Cn7G0ORk7S2a9hD2EvVPRXnpJFPX+FaB/fyc0IVZxi8FAM+kbIvn+rBQKBtwk2QXhQjGYJuUrntl6/evvv379pdtWrvnswc+ueWgX6aW/2+25+VvX3Pj69de/fuOBmwc33br2s2vWfHbtR59Tdj9zRvkukm8m1VKLWUu1ti6SFVXtB6R310Os7JXbLmV1bX3mCvq7Z57ZrTz3UV7wrZsGbz7Aq7vmWzd7eN98C/pzmF4iNLA2QA2heEFvgSWZYfAXybeuvv8IsR6ZNzpz78t7x0dP0Uu2h5659o4jR+64elX7yOpL9u69ZOyW4Jb7p5UHfY0ws3IYxKzsTFYcPnVqdByKmjk6D8u9/2p6yafv3xK8ZQxLWj3SvupqLPvaZ0Icl3kZ/j4luNiYNJPZJJ/qTWayOfLopxGQZcuwdvHUqavvXzk+auQxMTyOeZIWCcdxiOR6c3nxIJS7nVe3jAr3X42wrGR5BOIVT+l5AFgF5wn0dm+e6MmosKwuM8tjAvxm1BPsDVgkXGRDZJCIfwUdBRBBHtY3HFK9HmiNeJLncZMmksv3so4WBdYCeFdr1v2CXg/2Ac/D+7U3mGOdKbAG3H+1eFKHaxnvOF7PyWq/uUmqNxXM9RWKOfHiWsrtop5f0POYxJNGe3K9fSEFu66LpEh9O6iwkreO5YGlJFboo0KgOodyfcW8JWXMH5HA/LkjHo8lLmGz51E+eyxrbNV5A2VcDGWorIykpa73+wu5PiWfEdU7jvBB2HtJPB6nKpsf241pY1tj4fP5YkDLqljBcvw4V6C9MJ1TOJ1TOGVOfnpa5WLlVD10WEYZyniUl8H7jU3glIU1DLqPemu1cjCgEB2wOILJ4KAAx2m9Pcb86wM4pBwuApFMA/+IeLqufVAMb08Zynm0Wk4woOQyrEuMcSGn6zsSGyeextbE46yv+RBB/1IYo9P6GBnrMpXMBkOsgzJZcvrUlCbQRz89rZFGORdDOfo4ScECa5Ix66EgUq6v+whVpwJ3LW+XCHj8Y/Q2wOMSzjQhbvECbvBmgQoUFXFSe/ntt8nQ2y8s077yo2V7aOltHtEAzz9Zdve0/P5a/rQCZAnIERCkbLWUyttf/OLCAwcWMrda1nwjBlxeHqcrU8vLBYFeAp1ESvmI9vJbb5GhtzQVGDD4o6W3eMwl+FSaUoajVoYZGMhq3kpJBNawmvPikvBn183+VUtIsMc/re4ycq5T66ZVHsEBdUcgJukmnLD0Z8xstpKCRPhSFm98H4kHOtoLdxzJaYuWfZW8sGzTHUdomUeDYztyx6Zl5IXcA9qiHATZHP6y8CRdRkOCGXn8rGQm1KId/CACssYeGtLavnX93yNBJZxPB9yDfJ4UVOAvV1Ry+Wwxn5KyRBRffhl53KGjR4eg9wVxzssvzwGGd+To0RHkemGtCGWqwtx0MHkhmJBzciKfkEn5NDIOyI5T9bRQ0p+M9QV5gPeGav3A6QN3LUIfG7w3lz+wPBgKGJB8DoaDlFmni9yrpi0zHp5iWpAYkKfnBdXa5eFrWAY0koBVJ/dnUkSNpNMRUkKXCumIVjKeuYzD5AuqyxfsP8EpgAKGyH5MDoF2c5nFzSQ6M/CUrAqogEl32ojL73eRMroowpT8YT/8MbhZXpXTiFTS0kQCodlEycni4fJuhGV3eSlVy+kIgIRyCNZi9LMkBHHGIEdb6E/XZ07RSCGdLqS1fqOMpaKaxqit1ZIozFmYeWy8/MiVk2AzAVQSRLjF/gwrt77UvJxPieX569fP37F//wxWmra2Wj4V5jt33HuFY97+Y/u1d1jtOtQlcuvH6/ipslDk85wRGSyaj0U7waoQu8Zx3ud5DI4WphgkDL2xNTBvMB1h4wZO02sk+VpT7Xlw3vW4Gm5c99jgXWwo2QvHyOJPv/bapxePOPBJK6N71+Bj6258nfO0X4K1qwpxTisCzSalmShDpDhkBvZOdBMJ8PzwsgkSai6m57kH11mlTbO8QzP6Y6HOBasvWqrEtlG1dHVquL27oc3WujUa3tbmyIY724dTc7cW5YaFhUVLOJ4x6pn7R2qSgLYM0WZgZ91UYjHZLnhb+BAIevsvb/L0FGb2z2gMtKcGnZ2LzJYF3fZc04yQPPSh4F2/fF5qdspvbRqakcjPCGdsseWB0PnNUsyfSvREFi4SpsLf+0fgZ2iLg46D9iFgE7V70IA3uv1D4bxhwYIqfA8+M3eMzatGYTP9pUlgMgM1KzRtpsW0KNyv/dV/zCWdpHPuf2h/ZRK077b/D+3pJ54gK/5HO6eBtXz++pxZEEOVrFTMFqeVcf/aNz6X/drXsp97Y2pp170Y3vf6ZZe9vi8sGPCIApRrNkqtlmPke3xKOoeRLg+VDpNq6hdaP/fG2mqWbVtfvy/yImo7cP2X2LpVYN12MxyA64StI0td2FQXDvGFjCupn65n65OvUo0/PMxcqsLyEHB5iELkYWOpwCKKpCOnWTwRIuvZukYH24vwlHS8r8ND6hCgeXoYVzOEpbp4YtSYNmrny5bXXqo6PB3AmM9k8oBezuIhtv4Y8CbP0McEC2D8RuzbdBeVGPOW9mdAktO5UvH5S8kmd9vQyl9Mvh0ghXU+slP7nHag/6uXTb5NH9MObE8sWDo78Pbk8Jw7yEdF7f7FD120+e1JG1P5VeuwQZuziLthHRSNaoqIxYZJhkiMec1K1Ro7e85zP2bU+Zh03coZUOvT5hsv7FnV9Lhe8yPeJb291boXRCIrb6JPQf2pC3e2tSyswoByNeJTQcjzGRBQpEyKUwNguYsoBPiRZ64+ooLDSCZRiCUw6OKjHl8Ehx4DZnPZDkHpeZuVxUlfs1oly1EHkkar7XobIv2I1XqDjWhveTFbxOv+J5HFYoCQJm8gwtZWD8yJMr0B5kQIuQ6zYhDdtIR6tN4cAY7iFu017Q8EKW8kXbmHaL/o/DUpAsbo1t6Dzrv1395lg17+AN/8s3YLWdmh/QOsKpWVjbyWB3BRK9QlCLxxAYvuk4TMGisbc6xFf1EwEjxeN+vFE6dOIEl2URVItPZC3eoQy4zQvcPJ3cPiJNLwCiYL+/mrnzNXgNnGecDaOpgtnAdczR9bC39GmFUslqvVu0QBXU348+KpynmP0od7wjnbRBLJDAhBib4Q8At1YeXPjKfjOmgI5r2aWuWSrv0z46nwp7fqf9846WMg1I3Bnxz/v2Sc/v+be/+p8H+1ySIsE7z0TfqA0AVYe1BYIJwvrIT1hIuhnSgh4DxIUWFrI5U4w8/pyYjC5EElh35/AXy2ppTEVJ9uQgBnzw2aLpp3qjzvAvEmBvyrKvkPNtsWqITFaK+qLOKIWvnqYI/LH59Qn8Hnk6r2BlthE6o2xgIn1QrGEGzzXFPwwnlUnXchhNX6H7ll0O8KfgTDpakO0k3kXdwwpk3QAyAHkJCCzD60Lt9XBA5f7u8iqXyiD/UjksUclJguq1BEEpaB/0wwzmYkcd36dP+s8/ZoRzq8Xpcr3kFyV6/PJ5IgW4bD6XjCKweC6ZZF89RkMhZbIPqDze0LFnXPlG3WcD+Z7A97fdllHV0tLV3fb2gMy3Isnu1sSXncLc3FlQW3h2/rMbmuAWBVhBbG8Sb6lJDCIZOYByyuRUr5gzkGOwKWkuofUPJcmk43N7U2NrTNGg4EzsvFbvnZx1cu9SUyibh/w5LrF/qj6WgkvIaqwE0H5rV1ZtJ++YJiR9uMXgslYvBBasrEmtImEThYc1sy2maz6XpCoSy+A7Ahf1NMSEkAhCJtDylSothXKPpRq0S+YiYDlhlKSP6IyyV3m7SXzT0dvuscYdoty37/HO2ydo9scxFZTg+Sz2f8coCVfR2UjesOZWma85NTn7jjE1StlES+9wdjqNIF7D1wHsV8IkgSwRQKdHIAGR0+jjhcuM8BHImEnCdjhbJd+hBDBZWPk3leEM0aZ3X2tbSkrDZ3IPMTVzhltXjcOy9Z0THY52xqVVWVCrInUtBev6jQooRWbBFOz/D5JIcsB0OezG+v6em9INi8YRnwlBGPwDYdVSZPUyEhCGmELScHFAQLoYIwdBT8Z6BkM3mQ8IXK6VtN1qF8oei41WGPRrq7lqzr7irYnKxu7ckVDdmuDnWUrNee39ndHY/7/cHgSLqwXWDrWSWov7FBfWlYz6PCLcIewFFQL2f9iv26hk6vEBgvrsaEOZ3mrySmGIUOg25JStlirslgUFlqDi0qQEHM0uOgO/nmQA5nZAgeoYVYZBCTDhKLpGuBVVoKOue39S4hYzPbi163z242ORz+uL+xrz3WKMtafEZP50iuo9DYHxGpXbK5Tavd3qSvqa8v7pVd/73DKfubszaXOhoNBxxOd4NnoC/T6LNZiCjZTRZ/Ku719bgbgxFfA/leLBaYOXjhwvkrOxucHqeUttuUWK5/edCTuWXW0pHzu1t9ftLe63BazY7UO095vcNzBmZbLa8mzda2RNAbzESc7XGHw+V3e72eSKfLHnDP2Nxms1tEk9/XHeq62m91N/uU5rp+F49Bv8eAMswSNgs79X5XdIUxIA1U00rYrbrq2JySc6gyReHaksxmYLnwjk5Wexk6GTIWEd3gzM0OiYCLWBeHlFQmi8PB+rYPcRJ0b77HOrd79qJYLJ7unmPtlpKN6a7OVFNWm9vVG+uJdMfkxZc1EbfSGodJdCwSbmjqyfljAXfz7Kjbn04mrD1S88CSrpBZtNhykiWSb3Y53c0DHQ4rebmtzWfpGzh/cddCn9zdITU15WfOyqcWkE99KhvMFmNLVrQ/tk3JDBQHCj9X7LaullAqaDaZJJur2Sk3xCyxTEAOB52JufNbZO/HHZLZbAm4AuHGoBw31nGZroO1kmB7oymJ449gKg+d4M/5Q/iQyONcxe7oFiVx3vGwK+jqfTPZHj9hezsR9DRpbzrTbrtIXL2bxsmuweZA2CWZZNnctYi8X9EW+z2iLNutbqvN1LzzJz/h9b4E9c5l+is7rNFUNgE4NOfPSnTuvcXTQn7vB3t9a1aVP/1psaTd8u67XNZ5C/LEIE+S6QJxKbUTGcEFeVIHEsCU2YpJ5WlM9rQkfB09ZovXEw1qzwajslOydKvNbQ6Zqk/N6fdaNX+vy2mz+Xw2yevsIb+NZM57iuNW6BlRY/AJaRmoUTAlk/JRcurFshi48srKb1BjYOhtbYJPiMLa7xYGhBFhiXAh9mShP8toNeDAYgECUhqmYx9MIphoWaDMfTHihjXLqPdsgjgblnN/0cz26gZxUxzfQMYYgVKS3aRAS3us1j0gDh1Nzhz35zN+7XYQO2Ij3xz3Z/L+8ZkL2MvInoj+mtzCXndPTkxMTjTpiUg5NhKD+JdnJllMiOexfoxlGU9+/qxv1QkspE9Pc2bbM9D2mcKwsEhYcda2C7xJxWCA/rFeKMqMZzH6Iq2cs+XHsWWx0lnb/+9jExP36gnF8DnaXdmE7YIc4gNn7YGSVoI2a0f15OPVpsPcNdruwR3WlmSX2I8YQgy4CeGq+5wsrn/+ievPO+/6J7innb740Y0bH71YrcagJ/5o46NHH91INtaVGWEcUUqXXBOcWQ1ynQ2T3injXBOIsIAGpLg2RVfw0BIqeA0dDQRRg/Iw06Ko+lMEA6jVxvBpYUpsqf5J41pxtNgp6bodD0DXjvClEU3KOGJAvOSAxcQf2UN22jtqyOAAIBWqehzth4wfLtcUO2lDX0zKHOJIWgUOu8QY1pKrs/6FHmIu18WUdH2YRXDCjBTSCESOtBHoGouDkVIRaiFkWAP2gKhQJxQDlYmMp6lASWRE07A0ynRZc2nJKKsoo6yqpGUUeYu5NIwGy0gqt/KcpZchZwm7lHyLCFqZF871YqpQNiEvYgYJRkbtMoNMByxrRsAo06+n8thneUVCRQhRNVUTRBWHCCtQG7PqYOzSgwd1iImKg1wu4TZFqqn0hfh8ddPmKfW5hYAQZtps1KEDqQCeFJZdirDq0zhp0lICgaBCtlE9ePDS2CArVISK05Ey1Mv6SSw1pdTNm9T58S9gw7B50I+lMm+5vn/D5keJ7ZAAsyUXZYKsItvhoaWlpwVt6TO4ec7pjUCX0teY3kbgkk4Q6IMkk3yOLp1RKc94jWz71Jpw6bSwjXxyhqjOeG0pPGqnniGHgZEWmEZVKLE2okyYBBliFtNGVMW6NBfuWAzhsy8VIak0Wz7tTC9ZrAvTsjHVcVqm67SO2s9RapmchO5mM62s7y9why0wXDHcIyeYHDXOdraMucy8M2BOMW5FMBYvguKvg1+qC9enqWuLWK4C9E4d9A9XVbUA/DtVSLWtRjt0iMhUADX9UYzXmgBzCZzpOl0dT5+hzzlHPClVYXinDrSHzwq8rmVLn9Xj/B7T+dXgmQP0RiC1kczVz4L6HiV1M0LJBnnq2WLQXJdGrOmZYfXVgDVXmIwvorxfOcQ8F4uae0xl/RVXxRN1aYy+JarRuVzyJ2Xuv/38g+A++GSdPqBjWrtms3bVwZY9RxunzPT69rL0IrM1o5N1wP327G2svFrXLvH8KS3mTTx2TCW6lkOd2j49tqI3j6V68PmDDzLJERAS20tu4jsCmay+7pgZRsDSYkwUaEIGp7mbzzBmWpGkwsLrksfzo6P548nrFu7Yv7+y39im1UqRx6vRO1gyIiycNbpjdNbC/cf2c7XtR/SnhbMAjwPXCLAcZ/u4HtbPWYApB309LMwTlgNeBjEVJIOUGZAwsv2EmWUUU+m6FUiVYjbNxNt8imSlGGHiWjBHIB54V8VnjBIkB5KOFq2PHd/cnVt4Hfk8usnjpEYBXxtpGalcA03IdW8m/9Iy0qKHNQeEW+Fld3Xbo3yAfvNA+crAQu3b4Mwylu0KSPT/zFoYuFKUIcsPMFR5D0LiUXih7dcXTs0uwYUWI0U5LyM3G8wBxyyTbDGbkLOI4cpELWlfXXcCTQhLuLFQLmnlclkrkwsgUivvOnPfmQCbjfnNvLDEIG75p8TXn914GEqpQJECuGiatOvgWrRAhFqAsMBUUgXBWtXtUWYx4RH8MC4RkOVAhsN9/kTQfA6/VFKBCgrTXW4NMM2ZokPMwogPC+uFj05dX0h869mpen7rXOtN+iN56B97N16ns64cisNy4WhED4i5uvdajhsMsKhrz0h7ZoDoSnBROPP9af2dvlLLZ0txZhyMzqeFRwA/zYIRSgp9sFIy/mK22RIUsxkKK7aLdJNMEZZ0XwhFFXhAw14UW9CIt19837/O/L41cv7CVUMz1NGEqn3QlOtMhu5av55Yg/5Gf/CH6b9e5c/7unw+8Pyd/g8KRPS8Tx0tLfm+2WHtWruZ5CBTo10J7lm/DjJ5vcE3M8nQKh/kyftX+SFPnvNtMDOBhw7CLAL6mk4YnCjChppT5EdFoKG5fgVXKipSIUmqamEwRIshkCDRLBzRjtK8denWZgWCPwOBoIx8Ma5IRrJKZl9fe69nbVJWR/OikB/tXb68dzSvQQj3TyPAdTOmlrOrNk9S2TB5/kZhir2PVfAyG80UkWg6R/Ikmyf9MRL0S5acEhgm4h1EK5DrSSch36t8p5M8Qzqg/cAHraMD8EL72xvI94h2M7x+mpAOQrzr4B1Zp9fB98c8IJ211PoC0a3OleM0DspFc1HJ6JImLVX45qrAQa9AY98STt+9/9/HBgbGBoDbFBlCwnhRx8Plf3ikVB7A97xtAmsb8oJdIAkLAkqzULg/wRE/6kSxStmoHzWGNbDSXDjUldy6KKwzFyKv5t8rk60DA63xZOQAgsahibboUJ96B6bsOM7d8WpA/A4Dv1ICJ97ca78LQNbJyDfsvTFygrcpnDkxNR8nz7g5L6hAO0pCo8Ft1mZWFXZ9dpE8a1VCFgyaAVOsns2g5VMcqSMpu+pCJgo9jqRYBM7a72JLX3WRzuoGfBoYTLbpjSBfeBWIbGwTXiyVkEsFfvwpvr9Q5ZP42MPoA+RsfqWzRSUIYirph3WA5j2ibi5E02+u+6G2+qsPrFr1ADqfZ5qC0g/Xvbm+zGPAIX/JZP/6cpFPiUJN/V26vNtXyOpWcoiggTIqObFWwgxuo0VULFhsq1b3lyxaiwAQwhlwBxBuLKe+kkQ+QaeBNwMPg/wciiB/UVcwl0uegvIuhHFrw7MTxSHAVB6iI+Zsxk1wp8VNmsmwgZ+V0BDJ0PxzzynuSE55DrrzOSUXcSvTI8hD27e7cl1u97Y3cZDe3OZ2d+VcZ4ljx08E8TRMoU62P9/EJfVBUZfvc7rUrCtz5Tx/hGhx+7H9Ow/sBI5GzfRnwIMHmIX7dwBuWr5z5/IykGjEUWh/Fs5kwqeFUhmfSamMrzF6B/bBEqGX7qbPYf0+RMr8tAXF7W+FFAlTwVBUs2QJ08ewyBP7R/cQz8DkxMCe9c+ld4ymyY4ubb8/nfc/t/4uACaj/cuegYnJAbKjU9s/Sp/bf2x0j/YvAxOPDOxZ93wa3+/vIjt8hbT/uXV70lcsSRPPHixN299JdqBxuLeKA+2ArVF/NANWVp9QgNU1JCwQFgvnCyuEjcIl0AQ090sBzx7MKeAzE0AYKvDzcqrI3qFJHoU1B2Q3h2csSEJOKOAn4OeH7IBQkLsrQnQWkviDCWZHCCxLnkC8qJaQVQMHeQbuqyqwQ8CtQKCiIq/M+COeDB5UZIvYezyHRPDkEnglXgrLj8+cAyzj/gImR86HlaaWgU6BW8JiVOCIWMFYhmFLo7J1gLoWxpsShlvaKUOEom4qZ4bpJNbsGM1VRhp3/+rCOjJlmrVhMpqPjzM8N/cfcLqwivOjE2NEHZuonCBs3/k0c+vDJcOhY1ZrBSYaYBxO9kbz0CGlsQkoobxaOceWp75fpLLzKzHkveQhK6rgc7wtZmyGnLRQQVPNzZ6oL+IPBazhi86ba2/MpiuPZ8KRNBAnUcoEWgJNXlkaGx/LhFFig/4MZ4Dgsn4z+Lwg1NEOfJ7A+DqkM4wTayKJXCLPlWdcPUVrctVsnRsYJKhtwz6FEFVLHNui6kgFDJb+OTBRLmDJxjmeBmeS8QSIlkXmA2LW8TsGxrlEzXuCycJc9hXQut+wheQSSVE4D8Z6tXCxcLlwDXCotwp31Sw7M7pf0H1/SieOiSqRnGLUSvnwV0m+Rc9n+F6dLs8g/NkwjTHpvm9aveLP6+xhuMFMqcR0jRiazjTwvni8Lgv7K3PBUZde+Ov1tdeGRuWdOpfoCkldLRmpMSiVOnsxLhA9zHOUaiW+k66FKw/XRQn6fCnr86VJSCOGPDvHaIyB0SctBruk8rZuTl73yeuSm5GS/55R0KvYaGv/fMGsWRfMKnOZddbChbO4abEoMIKqnWSTYmIWpppqy4WWiOa8wSEZs9FMy6iBq2lM8JTo1x/WxWFwH/46lPGSMEG9MKdaUbMQylgylgLg9WIho4SKfDroumLeOAn4XQvd9crqFxctenH15t7ezas3paPhdAQF/XAmHE1vWk1Ki46ueeWVNUdbfPD/xQ7Z7I8jQ6Ix8wkyjksk7jfLHS/W8baoK04yG18x0Cz2DSEdF+t4EJKS8QjRND35Y0dRTY4OIsUyFDRFYV6ZwV+CgwblKrMn5vbLYegzvl1qYRZwTYRvfybY3h7d7bx948B4rGfm8omZiybGRGFsolVsTKY33p7riE2MOfyXDiEO6xoz7BNKbBxSIC9iuZxdlYaIwahmg3yBDRK+wMxVpMGHjeYdQJvL0UbvcIYAgm1bjY+MQMMTalhrekbiaIwiMXck20bzp4XM8DssITrPVfVnhl66Ji+DJJ+r/i8DHQGCIpYrqvHjc8rAieGavXXITVNDJjQGREMKcdsbz15+/nzqaYjIRGpcMGvYO6N127OXX07V5XctX/DRtujM9pRftDSE2xVp+V2P3CUINZ0Cltt1rpJJMusGjmtIzLIjRHEgQ+esTPt127xgn8dtsrtNM5d+nUhf//q56teGHc3dNps5MDeVvKKw+e67X7mb7Z+U9HnQdy54/Nwkg52Vwd33ZhIj3ZT8GFhGdaboDIRAbA3O7O13pxKrgYs8URy+anXsOw+suTqRDF6SyVp9QQ9V5+4cmXlpUulpafKK5kCoxW8ZmbhzpxZMbh5YckOkOGfXf3MULc05h90aTLRW5TDeTwvPBRmd2lNIsM1/HrC/DnfJXR6Pye6hXXPvf+P++8nmPwf8e6WGtEUyuXPR6Lr25RMTByauP3uDON5EtT7lNtNIaZkuBagrWptUaae5ju9I1fMgDGtSIV3RyURFIHGm5EDnkGoQVjQ3RbSvqcjelnU1o85S1PbLgrjHIXCZq97aEzkiv7GNlqJAsipMRGK0Q1OPH4CHAyITpvheWFUd+nBtd0ywEJjnYnmajkogTA+VC57hI+OnlQ0HT4kzhVfVxf6znrVMpvcyyjGfw59WPq/krEovvkb1cbIIzWh/i4hKsTFeUgLRCvFXtpiVkCoUCbCoT9usYslq0/6erBDF73R+x2atwCMERJF8jDyFsdptZIXNqhnRLBHBPLdxnIB86+3QqjjWh5UVckQ5Z41kntmmPQ31msk8kdx8RqU309u1F0XtaahZWw2PZ635Di47ZgBn/4zpJWW0h6rS7LhJCpniLcWMoFNtsZVpA4a1lzVt5kwiAqkXZ87UnmaUWxxnOgbS8Ox99z0LP+1ZLvyK1T0uL45TnTalmTB1Sj5RP/XwaBA/QxTbsKC6K4P7ZnzKL9zQrLGttlLV1r2s88iop40Is3GPdar6I1+nGsmiRYKhtWoGojQFHNQxjk9Xg1xV4lB8294b0yarwLWUx89Qevy/xKLDhWoVhHfBBsgT60W5zeDjPYyTRx16ETjt5cC1GjzrfcJDwiMcJ9RzpEb/Z/5Ev8qP67x6/kOefX9m+cYYMQ5S89Vhl3P9EbX+HMKZzlV/QhkUerbCiDpKLxWukb3qj7qVp6rbjuWzhCqlP6EMjg8OMJq9WT+tAExS/eEq4whWCzseoDOJwDtR9bbYbbGPYVU3x+6MY2Mrk4VsEspNAnnj8pGuotqcjWT9lW+w3aOF/myE7ctzPiEi9HOJ7I/M6iAz0lLq5JYmwrZiDHktkTzLzP5tvHXAon3DGEuvt3WA7WCjMJYkwpnzezI+0Or1GhzYJywDJCvrhgS4Bk/B/J4N8zt8pta0HpD66VN53KjvVDoMxWYyQE7CafJurVwVyr2b2VB04b6JmyD3OEw4R5lNMM2oPhwKIsghgis7yE3k7zjizzdqK5OFhp8mcw3kkajye2C5VTYDPKpHnD9LnbWQsN0D4ZVoSyb8SiyRuUzleiHFp/oUos5eAMm4Pr8EsDxI5whu4NBB6iFNIhsTmioqZrZZkauXHpnhUrXVuLt38HntyoWzRvNV5LV3kXar0QPinP6lcbfP544v7T92rH9pYQmnq+HMhrt9CBGfiyOCSDV6lMm7ArTUA/x6N7FISgjv58h04zUdGNNFhkkmK2FMBo/T8Jgh4IYKxSzGFEIQ5DFYSkgpYgyWElK6COr3hgj9Xjhmdpg6wufLjb1eezAf6vf0tra5IWY43GxyZxILg3lPC7w5z20a1dMu9UVyHluoP9TvzWVaq2lb4oshdxreLHKZ3/3ibdENX7g9Qv5gvE7HztNfL3SbltaK6uVFefrqisokFulpF7vq0jbq1XpyrW33RtdDFeu/yPrsa8LX6GK6mOHeqnSXKWRChVDBYkjqtPzuFb9YvfoXV7yr+1/cMTq6Y1QU6qLQbxvFeLb/PCT00L+lb7NyEaOjRfo5y8+cI17EByUUkKZInSFdi2BquHvozlzfJ4buvnvoE325O4fWD7W3D7U/8ZH8zvb2nf27d/ejnz+/P53uT//TebosuuboovOOrmGhLwytHhpaLV4OWe9mRd05ePfdg3c2dAx2dAwegawfqSsqkMZytAdeAbkWRFa5RZdfZZRff4oFDXGbIb5X0SjMxRYz3JSagn10DUBWrpfG5aqSdooP+NKPu+4yw6S0VKo7RcdUJD83BHV9E11lKqEy4MpNm0SXXzcy4XYIKmdIUVkY0Q/E6QYmccMKyniGxQWCOG4e1NvioHUNWj7LiFMTiFtk3SYHNRBAr0AkdqJlTjoCRR9mNipGXh/wixmQo5iNir5JJie4ARF0BhbWxFR3ok5LLZwO8/dV+qpOjJXGJgD1sTa74oCfHmBEsN5FvSNqHzlthYbE1bjfRSYZ2XqgTvPIyBhhNim4F+Nnlh8AFo5IsNpIEYrTBKhYbyUpYeFaeWyijA1F3GObJkfX+G88/6xbAaCf1n9m/SfrPl7wxBl6vL9G033O4GMIBpKU8Q//oVhO0NPPSNbXi3pQ9h/9IPxEpmrGn1YyQqSs4T1VLAx/OMaUlEyCyM/Y128tPXrqZdwao0PZgQFRnbl8YGD5TLRlhUxiiZ8xFfiEZnOc8G09kzDQeqrMMqqtTGcQh3VxnH6JSXbZ6oZJUiIW5BRC/Cy4MfuZzoNxD/SNfel85n7fTL+2KeCKDje2ZCMvZfLpF6PZVKMadZLf7XsLR/OS+30+SBFLNVaiWUPUykYrjalmYYp9ZRDPFhDahbQSjzY0kZqSxcKPileZQCSemaKf01PFTw9utM5OacnUbOtGdz4tvpbOz/V6yk454Cl7ArKz7PHScdrgIf/kaaDj5Lvk8VR3d0pbPzh8KJ3Ppw8Nw1J3qp5AwKM65aCbPO0OBNzaCi5rPCHcyOBrZHpDgSSzQGey+QJa5xdCxQI7+onLIg3Cj6E1FMvJhPbj1NZMb7d7ldfSagn4Q/v/bv9+7ahW7iLqv7KxIC/ZII0p8VK0x/WQbC5aAkpvccd+SPcQS0Ua+FZrrY9ygL25/E3ZzhKtcStMP8XML/GdwYeTTuAq+KShJcQrsLLqzGr4I2eK02QIpCRdLqawgMbj3CwgHje2gdORuBE3XtXM7n3hhRv4XqTI9oM1A06BgTIVxxpgT9V20v4amEHxKoSpdi0DA7GGW8nHalAStQqeWEJuowYePnGlMTbj2As3wNT8aN3eRBnwHvJ8XaY8V1LiCfbq6Amu9msuWsD2F0c2bRoZm9y5c3Kn6h344t2TvaiAeWB178OfvWsVFXfiG0P3xvXLeD5HShiXKBjGIIquqVc/0G6I6Ea3f/NBJJ0xrnrgcgVafArhjKHLU5l8CDwbkasHfeV0XXiQELU5mUeaT0p6AHebtKdlpPh58p0e7Wt6sMzu0BO+xe7rOQoc+nzE+FlLNhO0hCzAdBXz7cBvFWBWA6sO05sdNBkSZ1NktqQm4hHdhKaAm1WaSTEHCbJdRCwvWmyJuIkompw9ZNdOj2z1iHPoXxEx0mQi7lRjKB5LNMeSLVS0OLxzEgsWxGOyLRsaGgLfGoMxFF0mq6XRbw14lEkSbjKbyEUXeF0OtyncZLUSk8O3MKuElYZAE14gSIejPllEz+PD+zr0uzQSjLOdJm1UpUU8i8RkDr482Jn4vHgCqQ5TavfKo3k1Pyr3wsNT+uZEmdFbPCPcnGTmIaVkMxIwNqVKnLMV+Z4O4NomtuscrLsvrFDMo+6PKcMBqQp8+Nmchy5byTTbKxdde6+u8b5XO8hP46/c1f35ddx8fN3nu3cVf3bHeq4QX3/Hz7TH6qyiGS9Hhbkmgd7K7vOIMXun2VPP6maB0jCbwrPEkbp9Q7Nu6zSFqszQ3iIx6Ab7lLgE+QeIO/UCe8yyV8QsspOHlcdIaYBbjyC781JduPIyp1Cl6h6hYafmZzoWnfAk/DljxfhJ/WgxI/VyGbV6JdwZ4ZtSfHuNcqZDrQh8g6iky2FUeEN4g+ZoDqixC9elP5iDrggCwszhJW5BPBYEIfGNG8/Lbb3vpi1fuXTLc7cvu/GSL/0jWXJj7rzf33Tf1ku/suX9G5fd/tyWm//xS5fotuclXW/TLsyZYh2CVqa43Z+bYnVj0LE8CabqNBiwhI0tJeCGytACYGbS6+sxn1ZW9eaoVWUSN/cvlXDTH5ChUNUMELQPZ1kZ32Ou6qI97LzUbGGUW/LXLQpL4kOead2smZ63zraRpM8WnF13aFb722p06Y+rVQy707pk0OcTwgS9gF4gyLDS21DbiAdFQOQA7NQsouDI+BVmhVYkhf6CLqZQr/aZ9I7MukyG7PCt37K+xeJLfH69r+DTTvr96BOv/y5+i4QoaPszkHIHJk34LC2QPLIeID/pz/vAJ15f4e00pmW2K+wsWpn1bdbQiLNhHiIws+jU7aJgyNBGljW2iS4KqZs2b75pS/1g/1y/fAAwTX50ZCP8P12bzKXqPibyxHjesQyrH89qyrBkSKnEDA5KaNyuqSJetVTbI/GxE1QpKZuqQcQGd9r0hFYB54r8Oe6XTXinEF14xfh75hC1tsosuh4Y+TfcVe1lp5x1HDTbUKHoOh9zHa+Ca0ZXQqUo3l+EP24YEDQWhn6dENO51N0VQn7O6kfLCtSpRrgxuWqQVbV+29TYfAMJqsx+OMfKtXMkXAebBrgHmQUBnmvVSTdeVlQVNfCuNc79ZsxoX6CvBTOypHzFA9nVdER040IVLbggtPBGlUHP2RJR5YIRUmimQZlbnrESG7ByRnkuixgvxZkAhKIRBs8qR+RzQQUECfTN6AtldkSkXGHX05bLTK5Aa14WmMpjn3v/RN8odpDc9P0T3Kg/cPz42TdQ1jNf4DUx/gpEFpXdvRXj86Bep+afNukM40uCrqN+PRABYtlqOQ0uqUfstT1brCM3Zf2xEfJPW39MpO0vsvPKLFHRkqJCbYeW1Ww0CKaKvjtL1MywtzFKBb49i45WU8WeZgCyPV+EsC3pMOjaRjoJ8lRI34fhJ3hjRMoyW3LCDTN0sflG7Se2h3asP++bC25+MXXt/GSCtGZ2jF6ZR0xDiqQtkdyxf1bsa/tjAyMgK6RHd1yTwXf8vpVv0MfoIqEBT6ozazO3KThE8YKtYrrQn02bqzfDWOouFy0UU+KOllDPyvH5naHlWzb0dSWImEhomvbpjbff/o3baUuMbrhtQ19bU5eJLmoOb7NFciNb57TPidrJjmyjciikKgdfgoS3b/T6iNntnrthw9yu8/2dacaz7oNx2cfvtTu7RTTqPsWuDSOTXSMjXZMjRoDuq39iAWjjpPAMCG4TMM4dZ+4x0Dp+Lz9dvUytlZMt/f0tohfcK0uG3Uop058pIdc90d9SS6CN39SczTbfhJZHdyotLcqd0P0CrLd9UP8EHQO6k4R5VhTmCovZmUdsWzNhm6AFdkTbxIQXPPLIVlEeFesSPwc3SNhFPOZgIl+zGzBVrUu4T8YT3U0pMp5q6k5ol4x0dyesVmQ3Rd9IF4GA1Zrorpwg49qk7CQZp6zx7Qfyfb7PMNadWO8uJHp6EgX3+kR3uXukW3yZ2Wt4xXhXV1zUTuLTy2L3yM6xsQl2t8PYvrqtCujrCRKnk+IJ4GoG9RYGDLG7ThEABC5j7MQwcpdJ5Zi4bkhymRSJB6LRQM25MtAecgZWYJB4IOzyPxnocPyrwxkgAxgpntATjutZlERDNFAORBviDQ1ebZ8XnsYn4SXH2WOw9p+hs2F9xYUZArsTU24ihT4lBz/selhtqYzUp6CYJMmFRDVEIjsuufgnmwqbfnLxJTsu3bho46WbLlq1QR0eEh1zh4bVDasuorM7V2mbUrki/FtFHlvV2dq6tE1bn5TJXwQC2mo5SR5v4zA8AzAsYtbWHay3UH8tTTPLQmkqm7FwlVnVmEsUkrMczlTBdhMy1SKzb77JVkhlvsg2Jd/dMAKzny6ymU3y7OaBVu3LmIBsaB1oni37vsJ2KOMjmAh4vDHhQYBjH8zUEPBFORw5Q4ZVABZ+BdMwWqkA6W2meJLdGDzqJlxbm0pUQ18tZvGESCSbyEbI1csLT2Qjmou0O7wBp1W0ROY3/3Mkm12f7O5Z0NubJCeT3b0LenpSdF8W892ajcDrEfhdSkw2t+LpzWWjiWhGO0x65vdCSt3D/hsXxgFHTrL7N2EMjdszW9BYiAlQ/QW8vUyEGWdY7SHQ4pPaV95/n6x5X5MO4gXL6Py+FSYNHT8f585YIEon3+dpvshfg0OigQmcWphwAu+7oKRRKIm/ZGdkIkzvlbSgiNuHGwzsnrKpT4ofb0BmV2xkUuJEwG8RLUpAAdcfmPp0IqCYlpkSMHkT4CsBWor4Tf4Ic+qDUb+2yR+N+slj/ijK+u8JD1EX9Ie/hjcVP/CyUKGBL8e7msOvNC6GX1MXdN5I18liRvsZcLaZTPFkF/TpLcIt9Dp6FfAIEWYPlrGEsBkF3F2Zwh13E3Yregi3UYBzpp7+FuKb62fufXmf9pwPnvI+Mur3z9UsIYvf0hzeHLb71nrolaQlDy9Jut83d7tfe96f96vAGy9BX7uIxDaHmy1+c9K/1sPX6kPCZrqdPgqzs5XtByYlMyfC7MKQQjHN7F4UixHNImDlwOoFyENuErJk3CRT6AJGv1gQ75b92r2ZQrQtWsgSOVOIfdzpwIhChlybKWR/6bTah0ZsBRiNwtK8EmjI20aG7E76qHmbfVGrdkG21zE3S2ZmFzmWOvoafMF7CWUvbsjOcGxznNdK7kq0PalElYbGWWMDjYHILNtC1R9rGEmhcC9sFrbRA/QObucGHciuOcH762GqsOvliwW81z7bBUssmxHd0aB5+Wl3yGRr+MFykzUUcfzgB46Io8G2/AcNNlPIfXq5md7hdb3ndTX59r/nCnutDz1ktfqa3tvva3J533Ox/usXvkm/Q+ewM3VZvAlJsoQUNqhZyk7imJJukIBwJPXNr0w289fzsiCHkU9lFkUl3zW+zX0N3eKdOy8ci5KmFW3PzrBU3vSHxIZUWHS76By/f3la25Vu9V3YRzJ9m2SrpxTJta9ebovfnRjRriHJpJcGk24X13E9TGx0MY2xe+k5rmPm9JzfyDDF8VGvPxv9fjZKhqNR7VvR7PdlGmsMaQsSQd/ereD8na/f/3e+YGLrXp1fQtluH+AwvjeIs98iZY1TRZbaDal4T4B+zqh6i+ggKRQVfvKoG4I6g95O8CaCfn42KYM67ZSoI2FyMhDNdXS6W90ht7sj6hhGtDHsiHa4IaLV3dmRYxTow5Is3jU2tmuM7vvP5D0zifbBGJY3BS92o7xevZmYXR4t4a2b0J4uEYgKeLS/OESLaLuKF52ElGaq4IpRmkUlZFEsKa6HquHMt9de/ej1vvPbQsBWWGbMbfSnUpK5IRSwOVKRqGRtDMRMTot274r54aTdKVIqWRyWgNNEmySfvPaza3JV1Hp75vFLb37BV7zcKaebZHu4LWi2ErvZ5wn6HE6b2NDYqFiS/fcHJNkuUxoMpAM2m1v2fj5E1nx27fwbYMxr7VxU10pc9HgnCywsN9QegIbAVFeYh6RLyqDNHJrNoeqRsuuhMsDR1ppYHJvn91odplig0SpFIymHLRBqMEuplL9x7gyLSPyhjhUeJ3E6RJMzAM2TKBWd9mR44RpR9K4frVGP5+PWVMSiNDY2iDanwxf0+Mx2YjUH28J2uSktu3bNNM8anOeS3TYbNC9IKTRVCjxmEmMzrSJfK8tAbvsq3cW5c6l6Rs643VbUJWPRuA/XmMdUtDfYtKtttjZbg2002djUmEw1XNeQYqFRiGuz2f6wawbdZdWu4k9LtN82pFINa9aiu3YNusS/hBfwb7tmCCLZJ4yLEzq9rVpL1d8bihRmxPijk8w/PtKllZEdJ2oX22t8BuS6Mbxlybh7khVUVPiVk3inTraA904ik6NtGBH/MYHFJP5RHNF9FkPHRroczhsTEJm40enoGuGBEItCmZxM0pI4rtvJV6EtTPOJlSkXf1Xn6vZc9X9A6yeB1o/rd0cqU1o/xdctxer/KFdm/qrOhX54X/gopXQv08szfGwOBZB+NRNAgxwTZQAZknxzwGsKkKZgUPvHgDmZD5Ku2DwSCJD5zdoPfXSvEsjLv5N74JdvM8mV8EwCD2RmuOIxzlDw/uZydM10Jy/Xdk+qz6QHB8rLRqtUDWJXayqLZANZC8OcCAt7xF+zORGc0iuAeNl15NAMscisCdTSzUpQ6b/uL6/rB59Ojm5funT7yc0L5i64ravrNvDYfH9DeIDaYL474Umn5tAZWUICM8LFDHk+k9GW0F0kGatMAitDWsKLG0kLm1cT0M4J1sqMYckdL+RT1c9hBEJ6t4p2v3LjE0eI/cg4CKBXX9Cd+HIi8eUAnSDNkSXO52++88iRO0GI3XjRx5wLWxtDV4eGQlezffIHQWbYR1W9J5Gm6AdWa6fTU0GuuxPHbn7euSQb5rlDja0LHB+7CAtd/eDKlQ9S9Ykbea2J7guuBiDG2SaRwGzxPwBZkd0SQ5L86JlktgRgerDDZlxkPd8jvxFolrVyBFUNrW9Es37qcXxyW6jR8Xf+fh8SxsvvAYccCTXCHBgTPk7vo2WuS9Bvigcps0byoBaTQdp+yY7Erb5o8ZvKSIO1oeGNtlXat5lMQfEE3YMr295UFJsyT3lz8UWrH5ix85GJiUeE2h3uZ7srnc0qwmRyqsL8GTeemWy+lm6kX2a83Z/O2Ym3AQ93AHi4bAQmBc0WYjc5nBgBPNzmTLGVftm8xbEoq10KzJraStqAWVvk6G2QA3sJ3QI8mra1tc1+qX1Rlnwh0cbWyfeAlsyntwlu7CMOBy5FtjtFOPPOVD6MeT9it2sb4gl5Vpx8KZ6wSh3afYk2ywJTppH4GzPm+Za2OL1N3GmdpSZsE7aZ8Uhc+15fXDvQEI83kM3xPuivPcIp+hXggRoYXq+OcB+QqX4gSsCt+2oDPGv7NWsaepfu2DJAY05gfXx/5w8mdnlSC/vO+8iyoZTzFvbdkGqZjToHxDQ5uRpnJXZ5/QNbrlja27jm6u2zs+x6Zq3MOKtbnKmhZR85r29hyrMrEfSzOpxcRr2JXk//AvjVIp7NhZ5Bq3MLc/ETKAEmHuANlM0iG24T47mYUQ+XFZDZsLDvNtXicEX/s82qzPSl2iOOwZg91tkJzqAj0p7yzeyMB0mzz9JlsSxcKEldFp9lXnf3vH1OU9zhCIVMprjJaerooH9hcgxEivMijpjdZB9KiIkh8GOOyLxitBiKJcRyOHYACvFJC7690MKKGzl0aGSPKeaww6I0Oc0xs7n95nYuYywTngA6axPsQkC3BZYU3LssQoMgWOiDEAhASlG87uSJNas2nTq1adUa7eS+T+RXLfreolX5hy9LrVpFbevXrNo4b97GVWs+V8yvOu+8VfmjLatWYfknhX20h+mgYvpN1/WqxtSHPvfgZiEpo8ut288M04lMOM72r8MZ7cTZw7inQzpgwh8DnG3ogkO465jLS1N+eGVMnuw7of+79NixS+mk19sTj6tjYxP79pX3afvIxD6B3fsiiGMmgX9bhO9XKl0iu2YQL0kR7vnN3rE9Ry7f/cquyqFEd7dJ2Pubey5/ce8FRNz97d2HKt0j3ZzXYQcF2D4ocHP15cTZd5mkIYo3+d+j/bpWHrmssuuV3Zcf2TO2d3qxlUPgieSCvS9efs9vdLsCXn4HO1XBalCCIAXA/M2FcjHSF+gLoh0gPOFfCG/5Y/uuaby+E6cvXtyZRHNC3jhYpQwaQqh7+wqCHiFmE/4NDJPObpvV59t2dO+KvdqhscXr7snCv3vWbXxtY/PFE9gTDGK32+qTyWVPD4oifppMJJQm/S4zFLZi79Ft9/zmFkuMZ2L53bNeuRZ6LNFZ354A2zc+s+dT7L7CFFcqsk9OiWwwln/iG5dd+zIDoTtkBBLsxdd5Lx7Ze6FIP/LqtWxwqgH9DVSrVOt2MN3HbMAN64Qdwo3CXuEzwqPCU8LXhe8KPxX+WfiA2EgjaSMzyQKyQtdL6LfJmxGXxFCvWWR8QgKRBOt0JKlZLr57CL8CE6LMfZAYr1tEs85iAe8uDfHsqJ1g2d2EZx8iLDuzC4XszOYTszcTPT9mr90pn6i/X77u3En9eRRlWvGJadVLdcV34ZfpplWvTGtdblrrMX/IUte8aa2vv4c/Y1jNoTYr0IpKKe1XLofssG9zR3WfHI66t9kh7DJ8p91rs21zNeq+ttgsbjNJogieKFLxK1GX3S4fxvR2u++wgyoux2EoCks8LNvtrmijy2bzHnY4wk673XvYfupXlB42i6IJ5J/Ddgstopj6BtPFCtXgG2/IiiKjU5n7hmSzSeh8YJQIvs9ud5NJqNPB6tZhsNkOuyTJHrRbD7usVru21mkxmaXDZrPDYjKBv2Va496DVttttdZHffZtFskh2XT/3ywWm9m8TXLr/mOs0+Y0eL0NXpNgwBpISvaMfLjBYs/4Djc0HPZl7JaGw3LGLpkstpT3cIi7LabDkomYDlOQBW9rkLNQBXct2+xZuYG7ppA3Zdtm4W4cuthusojbLHbLK1FWN/+zKkkF/hpsIAK6beP1BdQX7ASQm1w+7nrtkte0jXJ3hMPHYeVw8zZ4YaTCksl72NkomazU7LcddlJzwHrYaa821+p1vuH0osNsHHcLKv0kO1u8QlgrXCJsF3YKNwgfhzXN6CHQ7QzOYpCdLfGsW5T4tbSwCFCO0zdpQop+PwKqPovsdgRdp4IaFfZFAVw9BrtZmOYb8S26b5n2XszvWBtefnB5+LjVuo2IonjVaeEq8Mh2GGqbJDlKlG7BfYkrnI1XOSRX2LG9ZcO2DS3bHWGX5Liq0XkFvtxC6a1OSbJVjrGNC36q+G/5Cdx36g8c83sy+BtavmFrMrn1LtMck9dtzmbNbq950OSF7l3S7mlKQYpFg8NSGDDU4OD8+YOD0GFhaXhwEbxoiXral0hhh1c/3s4L52ct6o4bP1y/lcLu5av/xlO2yruz838t8ZDXEs94W84mh9d98amRDL2Fn44iD9edmq778NOA/l2pR/Xz0LUtTGE6DLE/AkOtbkMS/k/BUKtdS+vWClNhUJlG6ywwpJPGF+z077WxG5CNC42LhSLqfov8w4uicbFv/uxg3jk83htTMm7PjM5Mj9fhDDf55GBTsNUK2M4qu/v8/mjvuvb+lnRjw9ma8Zn+sYw/3tXR2RmXo05nCMazLxmJzghKVq/f2eXz9yc7Rjs0XyocTSSiYd7P7N6zEPsWVFhA0z1JSf8J19GbhGPHTrFjKvzWy7qLoKaEaej5gz+ccpeTcdWCXjf7XpZRd31l54aDnR7Ryyfxc8Mh6jV2PH/w2BQQ2Ng+qdetnKXuc8NRX3d9XdPhEKe2tgYCu6ed24UHueUd402mya55TmsT+f5QPc0dm5wwLAzSkd/vGD0tbOVzujQxVqq3AiiN9YzmS6X872ufvqnZrDWzXSusNadvOk+rHar11VVL9k1OqKM7RmtVa+VavWVmXTCtdu3k1G/uECbsmAR21p5bHU2rs57/kRJyImQoBtRatSeqJ24fwG/TcfxpEtIRfk8RBTfOe3m8UlL1dYx2MtDbrG5mreefVrOZXcFSq50fbWAlVsr41bRatVPrKlWEeO3eEIvwiHAb9O8gyDVJYbWwRfhvwiGsDSiWgQ2Yi4yUMmW24bdgQ31okZ3jtrx46IpnYjoyRsLYPd/6B1zPlj+HW35DIsdB+gWMffzKdv5VH/1icd2oE0rhrHl9Ue9aTG6fx261mh1xm1W2/lVtgldK3gaP1eqWLMTutQJz5LJbIrLJYrdvAEbJPpdSye8HRGN12VxP1WdzKx6rzWySiIla7JLTJTvMwI5JxEHdXrvb6vJIxGKSbFZPQ3MDkFJgxBySJ3C4DoUMmgIeq8kima0Nu+z2xvts9kHe7X9t8/htktUmi27JZZU8HsnU4DN5zJLdZpEkC7V6vJIU9th9bpPFyGJ1QRNsJtGOZ8htLpfVKRGvx+6xyj5qskkW2euwyUGHHWitTXbZvS4jJx9j4w4HtMjEcydDqJ0wZhSfUH11VKlYF57yonCOMDPOhQl2P8ceYbTu0x84EeOmE1O+e5UGVDQXj7GRl1zM+Dyc0Y3PXZVvufw+tzh8Zjymh/h6+Xf6dxB/pM0gP7oIPZOgzbhIf+L63f+ybfnfZ9sikDjQqhNAK/j3ZM5q20ITOW7B0i62ESnXRmaT3iaxN5VoF3sZAunN97Idxmem2rdYL32SaHYM2S3aHdpuq5V8ktxssds08uQW20BrPN46cIaNi27S0gMuvB6HVPw+PUOP0oGW3P6qlj8UnK2fuzFuJ2EmHTEiZ/iBrf5Cm34FNzxLcrHAzOpO5EfjceaN5rUTszKZWdoJEm9pcOYvPJHo7hYJiaMC4cSFeWeDSRjNV1guZqIKofb2noj71HfV7oRYwmQVcFVadHP+UhDGge+ZZPsq3XhvlbGH4Cac7UeLYZSo23XzmPZpBKvubMhsZm2Bp2D7mFaStVgcL+/ZU97Tc+Vnr4Q/Yv1MuM/aYO0L/0j3P8NUZ7jA7TbpVAlF1M/MWOJWTA2OHzkaTIp7yYzPSDbxiT1YzJNYxpU/amlc2NjCnExYY1ep4XGLShkzi4JkK7QutPt89oWtBZskWIHKr6BH6NP6vYodQr8wR5iP91Ljeq3XLFN+xDfLDuTUGHsu/gjTnqe/p/sra8Nx04CpI0w2hYuOV5zBdyxxp/aYzUtmUpP4uYpruKNjuENVvF7FK17DDOmXcuXBpctnzlw+sDTb1JSN0s50WPtEOJ1UyCcaEtpqp99tIzeYTAc7hjo7h2Z7MXvl68wOf3UUc+yuCwv1888hpNBeAzVt3mYSHyLeTEtfvSaNfdqEfaBEYYNaW01Uv/AuxRVse39DQuBq7d9cfWGpBf6VLlxdC76K/X6SOXEveqjEqmZbOy01Dy61SRobL5bBGyeqZPs/z6ZHFB4EoK6Evkyz7z3x2wCZigjVSfr2k/6USubZmVPzdPuxGoaqN5vmlg/ISv+7ZDNTutXkNjkdjkfAe8ThcIK3lVIzdNMX2LR+Ad1j6HwZncpXqkGTYJOe1IpWutVsdjgdB8zmA+CZzVuplXz3Scn2Gqyr32BCGqh2eGUpK/SwHiEY84b+mP4YQla2LyopRYlIRTKlQRIefizSh9rV9ju1JdEN5PlTH2NlnZBsPZVxsbGH/hjembUlG6Lk+Qugqjh7vb2n8ktxsoffq87nJ9q0Z4QedoIpwdnwhMw+tc6sh6YTUzx0WVSyxVRWSinZ2WSYxGDwPXjJDrjDJEtPnkIgxBPjiEb+Bh+g0Vh9thIXT1TeKJcXv/TbxYt/+1LHupQ9GrWn1i2OOqKLo1H0sBtL45V4D89Thl6rFnDqJGTffs89b33yrbc+uSGxcmUiH0isygcC+VWJgK7bbgQ8+kvBhtpz/JYwfpM0nchOBbEbnoqicIN2A5lzPZnDHO2GG5baU++/GrWPvhqNvjpqj776fspOf6l98hfaJ995h+z+xU9/lbgvmPjVfcHgfb9KBO9LYB8OCN+hr9FFQgBkiDzwXmu4XVFAYR8hKlZNi7haVPGHlGAmi3rXYgGtjUKGIlXqU/qChp40z94XC3xHnKtWs5lvj7S2ZMinYqoPuGLDFmlWX2tD6wXua1ymxrB2bYQSW5P4h4mLljcRj9zdkn5mhnRbdxMxB55VAm6zk0jWWKolqd0ZcNqJ0+4Oelyi20kXBXzLM9quWFa0XdRLsr0Xe63eHpfVvTyr/TTZTORG8qlIQDJ5xqJ9HauznU13x0cCDuLy3ONzx1JNdpc/5HRqt/u8KavFaU+5nWwcfgLj0AohmGdpG5GJLLJPPmvCT0gradXArTwj6LSPz0Okfefh/ScGijfOSJsL/dlUJlsENCllsvlMUgpapCygTsUipaCvcyGFfT8UOjfUV8wXivhJ3WyhmLXgkEO6bsCyHuDCANUOAqrFSQBlDbNgOx59gelQwGkB+WIsOIg2sE1sQw91eIqHBWcTQNntRFx78NZbD976wN1btty9hYxZrZu9mQXhkcyCwQWdmzrBzYyEF2S8m8/1otudDERa3TG5NZLID6VDHaH0UD4RaZVj7tZIIOm2ZgdEcSBr/dOSiT+5FcHRTm9BeJQ/CYIpLxz/Hyo/MxnHYf9le/V/i+0VRTmM/p5+wM5s5/Dcm2zct5ICMoSUgdOGLEnJuTQ/Paabx/YpnDTTiZM2CdD4ScDqJA5cM9AH7cTkJHlcCwGF1UKc0pLvGI7T0UOuBmHeot1PftyjzUQKQP6mR2sjy+4lvzbpOTCtSRswQfI6PGIF/rIDqZnAP05mCfiB0uOXBXWWPpjLp5K++usVfZYpbFjBYM/Ib9qamlubL5WeSEab/P6O33Z7O944unfFir1Hubf5LDxVS4v4m6ZAsLm5tfIjQDsPmBPhRu11vz+RoG3VjOhVFp/JxEEQm4GG3W8wfqeTnwHjVmLmjL6NWTQbdmKppMTMGvgHinUtlTDNp9d9fJ1dO9C9WF2/Xl3cTTbb13183bq5i7u1A3Y72dy9eO66v1k7NLR2qPK3zBP/gnkmYb3aFP7+rPWl9bO+H26CzKV1M1+LzIq8NnNdqX14DaTRfjq8Znh4jfbTIfSYTmKSTNLxqs0Zv+lKmM62Fz7kmXALMs6Y//s5wrqN2hq2ibT7HGFmo/6/2m7tVSh0NowPHqPglh5IGqp24cNioR8FwkVh22qbjWyy2UD+gGAYwkEFolZ3aI8Bp7Pa3ohvwug02llSfA25Osgm4GequlnKvhCUk1P4w2NpeCINL52nQqW6B06fAzljP+OP+XVQMKsVtoGvINZFVCQlAN+aAecM6hq8AqAe/VQVY1KK7KOIwQASPCWEewce0cKpZwDxMvuf0LV/pkERMVe3yBAY0k1w+/P9WEixTzRJEWnFTpvVLEmS1+6Uu1JpcWn7goZ5cXo6Pk9uTXQ0tJkDDY3OLtlhky1Wq9nl2TzfZvc2uiWnW7J0t6RsgSYqmswmu4n6TFa322/zBluCPrNndyEVPnVPOJW7ISh5/ImA1+5zeyST30TtZrOZUJ/TQma0D1o9TnqYXD02U7F7o8lYyCltGPI2xT0k4ksHBiYmBtxhn9/uESWnT/F4hzZIzlAsGQ04IzMXbidSD25tZjK5Dk8yIkreUNBtFh3B1pZE2On1htJKCBhqS3tnU6HQNKPdSs3WkJIFudDVmEi1BR2i2R0MeS1UibiyEpndNoNw+46SsICW6BEcNb9McHyPnLqbHGHvzod5dYieZlZgwSqGyvdn8dDZdGmxkAumRWHto7sXLNj96EHwHO2W5uYrFiw6sGjBFc3NLLicFOnpz8H7Zx/DZI+t6e1uTLUsryXgaQ8cMmxPzqen6SF25gH1uGj+MhUlutnmflZiRiG4ifTlZx/9yPzPHT50oLnpygWLvrho4RVNsVjTFQsXLWtJNXb3rnn0IwsWfIQeAhDWat8lxTOqtrQ7OPjCufhGvJFdnM431uw+XNVTL3gisIi7q7p8jV8HZdM3VddrYgy3px65aztZOVt78iJtzp7hORvD4YA/pTR15Auz57PHcHjjHJOAO1kXaU/OJiu33/XIsxg3PH92Id/RpKT8AfbIMhvjyvcz8PpbkM7Ywq0wea6mC+Cy1p8qZ32IJPVhohI7T4z3WP4Q5Ej8xuJc4UJhiy4/Ixms6lyGARZ2jxrb9+BfVJMShk7Jn3ITJuKLwK7U7pQJKYbMn62/DY8bO34xnPnC3PlFsS1MSuE2sVsi8+d+MRN+9VXJ9o7tMbGh6MIbKV0XgdRLvMRmIdWAYGEByUuMwN6qvEx/mAmrPZVmpmm+83xvjxrOQOtVVbKVKkmr02kVPwU5Kq9DVlibfRabzVJ5HUq2WcQ+9CR8wjdM2MY5tB3m+0Mwh0BetIn5PpOSw12IVBbGhc0hBXVuuM5wFj5N5E7fir0vbuvp3oQkO2Y6//ef7NH20Ye0n2g//dyxL39+24t7L5i7M50qXbRkxc47rjt2ljqSJvwAzpCYKwZTSf4RZFTWBdPkNNbytPa7s9RBJv5IHSahRfgq/Xt6AftSXiO7WUcKMUNDSQF+FD/cavZLIS8+ZSW8RBrN+mCSXdbTFc1kol0912lW7fiBAyT5rz0bN/Zc+od8pqMDBNHOTnpBpDiy/tvrR4qRB8nNO75yWviK2Bq9WPvDxdGrSKahOTS6ZjTU3LzusnV8nn8O1u9VxncuZIXdBl7MtMRNfj3cxZRJxUxy48rjJ46v3LhN+xftXe1fVmzsueljN/VsnPfUV5/66L3/s73zC22riuN4zr3Nvbm5d0lukvbuT1Nyl8y065q0uakdS2fpXNGseShYGaOZgiuo7RQVLYi4hcHsiwqNMtiTDMQHmeCLg0HBR/cy2FtfVFbEF2HggwhCc+o5v3P/t0nbKSNoSbgkudzkd3Lv/Z3f+XzP73c+OfUVd/PiixcukP2XL+Ofa4VisVB7dmpqg+xy3fsy9OYusnbMAMkgQyUDLzR7eRbdwAuzeAHd8ICxivnh7L6O8CR1BOTSEXanIuygFLRSBTyMgc47PR2Yg3Mb5VRbBAi6swA0NXcMRAG9hWSQYKaKgOOtlHyInWiCPF/HDyPhrDJepWVv8GA4gln9m+q4gr60lAOfonCkoD8sne/uPl+iWoJOdYUseVJJgf9C7o80X8hTLT8Sl+V4pFk/kMhz30Q+Hxz0ywwbm3rhZD5/kskMRwYGyBfDfWnpC55ofCdVwa78W91RNsAfgcDALYHC0Eob+BP0A3Y6HD1Acyp/uHUA61oN+K7dbRD/xq8A9bkJwPm4BCDfi/CvAbhvfspK58DWG0fIMK/H5UuChrXADF0/5LRzATzt9Sw3TXj+uwXgPf5Fo4idAXnYMMTewYxdDtDSd2ZR1RRnDCA1CdM16dTMKKsWY74ziqOqz0lyB6Gdw+gsXm2J0/GqDdP5s7fp69sx/Ny26PyuG5v7+LhM+xjKx6MIwhbGyd0GMUDeGBalRgP/WOtF2eaMhckZIG9I4jDd11tDWYuSBzwxW4zlxoOPMnTVCtj8AkMmqBmilhPHcsYDGrTVQUTbSNsxm4jfqjz6vgL0G0K3Zn27yO399Y/XKeI243GLZ7to9hZy7abUzPbOynXdCw927scxUM12C3sNLyS2clS5wp556C3gul2BvWLdV/C3gGD3+ed/iX9yNv9MsXmfoiU4utAnyyHLIR56DJ32EKKDNQ0behrMG+KeD8jtvhmQ+L8skmk0/wC/pBiUZsrot+ZdgJ9vCmGvlpyEsbmrl+oqsno0JU1NarQ+TGbUsCTPUW9H9V5/X2qg76IYjhUenUgkUr1HPT1Vrq87merr/xq/ERUkXU8kUPHQYR38kMMjd0kid0Ec29JF0mYvR2ydu8qY3T3X9snkrnYWA0QuBvjYBPDxkd0/oGz7TOzfZ2KwypHlj3nRol7omfVMGWXKjGyRt3iijH8q78SvnO+lsZBFr5xQaAu7MrlV3Y+t2oQ97CccXjUEa2O0ZVXU22qJHkGko7AcT3oQnVb+F3kykOHyiJY0ztiij1kkrwWX+gX5qRP5m/1s6podxG/HoYg797AmH4dykydEHq+Tc0qZkIc6cchDmbzIJ7DlOJsksVjKJkf+4/6XfIina4ceDsyQtmosRwcmMdPacdTtjdBNcewoGVtFODL2FcSkmcbGphLB7Gby0mDjHOLNaXmfucXVJTV5KDl5/7jMS+WrK9xKtXru1XvXURfiuDO3lt/VdbFn8tTzpSwK3eG7lBBCDVmaCIWfmh+aUeMhWRKuCCEltMYrweUg/2DlajmkHL9/Rs3Hl1YXr//w2vT09GdoBE3W5tJpUaucW7z09shBYRlJiFuLxT+Mx8bnh6YUJchP8MIKr0S/C5m+n/ioTaj6PYgiPDRIaNsg6v5pk17ifXYjqa3hiAPLN9HkXC2dFrTK9MKld4apiSEOranqFVUdnz8xdQBMDDYQUqJ3xM6ssdeBNv0NMYN7dgB4nGNgZGBgAOIp5683x/PbfGXQZmEAgXPBM/8i0ywMYHEOBiYQBQBG8AoOAHicY2BkYGBh+P+fIYaFAQSAJCMDKmABAEYNAm14nI1RsUrEQBB9Y9LZ2MZK5LCQK1JcYSWLpeCRP7jDL7AQr1K2tDxBsBA0hdhZW7opbKzsr/IHRNBe38wO8RrBfcxmM2/2vcmkBFBCAmNTQ8ISYEh2jrKQCbHADO8IiIYgDc8BHTpZIyClB4QLEyQNKaTwG34PdwJyyX0s+B575crBGpwRAXXPKca8qy4n5L+th4QnvMmKnYPXJmcSP5PVPA8B45LxF14ByyoeqLbvd3I3gbqhz0TX1onkTraMSbhxv4g9PGLX3lL+ShSSsEHu3ryyTieqpHN5NdUjamKp7+xXM1rMyTaGqVT4xCmucIgRrpmfEmOZa7W0+KLnOhUTLtl3w2eLF5wTDWf2IUP8ruN+VsG8owZurUf1zGubk6uolteO7eq5ymeNlp7PormIA6+JHsDA9r+0Rv/W0l898EyN+gfrMXfmAAAADAAaACgANgBEAFIAYABuAHwAkgCoAL4A1ADiAPAA/gEMAS4BUAFyAZQB0AIOAjICXgJ4ApICqAK+Au4DIANIA3IDjAOmA8AD2gP0BA4EKARCBGQEiASqBMwE8AUUBTgFXAV8BaQFxgXiBgQGIAZSBmYGhgagBq4GxAbSBu4HAgcgBzoHXgeWB+IIFgh2CMII3gkKCR4JOgmCCcoJ/Ao+CowKugsGC3AL2gxEDK4NGA2YDe4OPA5qDnoOyA8AD7wQXhCaELQQ6hD8EXoR+BIiEnASwhLoEw4TRhOAE5YTuBQSFGwUtBUgFYwV0hZQFnYWnBbQF3AXxBgYGEoYhhjwGUgZdBmkGcwaDhpOGpobKBuSG8QcHBzcHSQdRh2GHb4d6B40Hk4eeh7CHw4feB+6H+4gGCBMIIQgwiDyISQhdiJUIo4i5iMSI1gjmiQ0JGAk3CVGJWQltiXYJhQmOCZQJmgmqCb4JzonjifgKAwoNChgKMYpBilGKaQp1ioAKlQquisCK0ArVCuIK+YsOCxaLJAswi0QLUQtji22LfYubC7ALwIvRi+iL+IwKjBMMJYw/DE2MX4xqDIuMqIzFDNaM3wzsDPYNAA0NDRkNIw0qDTaNQw1NjVoNYQ1yDYANio2VDbINvg3PjdmN4o3ujgiOGA6SjsSO1Q7ljwIPEY8hDzCPP49PD16Pa4+oD8KPyQ/ZD/aQC5AhED2QW5BzEIUQopCvkMoQ2BD7EQCROxFYEXSRiZGjEbqRzRHXEeQR6RIekiISMhJCEkeSWZJdEmwSkBKckqkSuhLHEtIS4hL/kw0TLRM/k1CTX5Nxk4aTk5OkE6sTvRPCk9sT+BQUlCUUNRRDlE2UV5RklGmUgRSElJSUpJSqFLGUtRTCFN8U5hTtFP4VCxUpFT2VUBVinicY2BkYGAMZwxiEGcAASYgZgRCBgYHMJ8BABWvAQgAeJx9jk1Kw1AUhb+0aW1RxJE4fODEScJLSgfpAgLSWaGdF/oaCiWBtAVX4sg1OHUZLsA1uAdPwnXiwAeX991zz/0BbnglonsRV9wZD8RPxkMeeTGOmfBuPOKaT+Ox9G85o3gq5bbv6nggfjAeUuKNY216Mx5xz4fxWPoXSwI1OxrWPMMy1LtmLVhJr7hwZEurNFSX41ZQyllz7v9WjoAjJ9U2x0Kxt/pMqmduakHSR6dlqlE29bls2iq4PPVu4fbKZ7mfC4ukSHKfyfR3Fr8u2Ghxy4lDb3Ea2p3AJrSnQ1O7LPX/tf8AoqQ2HwB4nF3TZdAWBRSG4e8+KmALqKBiYifvOZugIhYqKoqB3d3d3d3d3d3d3d3d3d3OvOeZcdyZnef82evX3j3W89+Hnv89jP33NcZhXMajF73pw/hMwIRMxMRMwqRMRl/60Z/JmYIpGcBApmJqpmEQ0zId0zMDMzITg5mZWZiV2ZidOZiTuZibeZiX+RhCBycoKKmoaWgZyjDmZwEWZDgLMYKFWYRFWYzFGckSLMlSjGJplmFZRrMcyzOGFViRlViZsazCqqzG6qzBmqzF2qzDuqzH+mzAhmzExmzCpmzG5mzBlmzF1mzDtmzH9uzAjuzEzuzCruzG7uzBnuzF3uzDvuzH/hzAgRzEwRzCoRzG4RzBkRzF0RzDsRzH8ZzAiZzEyZzCqZzG6ZzBmZzF2ZzDuZzH+VzAhVzExVzCpVzG5VzBlVzF1VzDtVzH9dzAjdzEzdzCrdzG7dzBndzF3dzDvdzH/TzAgzzEwzzCozzG4zzBkzzF0zzDszzH87zAi7zEy7zCq7zG67zBm7zF27zDu7zH+3zAh3zEx3zCp3zG53zBl3zF13zDt3zH9/zAj/zEz/zCr/zG7/zBn/zF39ZjmNk4Nq6NZ72st/Wx8W0Cm9AmsoltEpvUJrO+1s/62+Q2hU1pA2ygTWVT2zQ2yKa16Wx6m8FmtJlssM1ss9isNpvNbnPYnDaXzW3z2Lw2nw2xjrmFFVZaZbU11tpQG2bz2wK2oA23hWyELWyL2KK2mC1uI20JW9KWslG2tC1jy9poW86WtzG2gq1oK9nKNrbXxlvsus0mne54d6I7RXfK7lTdqbvTdKft3f18SG4n13Mjt8gtc6vcOrfJTc/T8/Q8PU/P0/P0PD1Pz9Pz9CK9SC/Si/QivUgv0ov0Ir1Ir0ivSK9Ir0ivSK9Ir0ivSK9Ir0ivTK9Mr0yvTK9Mr0yvTK9Mr0yvTK9Kr0qvSq9Kr0qvSq9Kr0qvSq9Kr06vTq9Or06vTq9Or06vTq9Or06vSa9Jr0mvSa9Jr0mvSa9Jr0mvSa9Nr02vTa9Nr02vTa9Nr02vTa9t++T/PERHR4frCB2FjlJHpaPW0eiQ3JHckdyR3JHckdyR3JHckdyR3JHskl2yS3bJLtklu2SX7JJdckgOySE5JIfkkBySQ3JIDsmF5EJyIbmQXEguJBeSC8mF5EJyKbmUXEouJZeSS8ml5FJyKbmUXEmuJFeSK8mV5EpyJbmSXEmuJNeSa8m15FpyLbmWXEuuJdeSa8mN5EZyI7mR3EhuJDeSG8mN5EZyK7mV3EpuJbeSW8mt5FZyK1kNuhp0Nehq0NWgq0FXg64GXQ26GnQ16GrQ1aCrQVeDrgZdDboadDXoatDVoKtBV4OuBl0Nuhp0Nehq0NWgq0FXg64GXQ26GnQ16GrQ1aCrQVeDrgZdDboadDXoatDVoKtBV4OuBl0Nuhp0Nehq0NWgq0FXg64GXQ26GnQ16GrQ1aCrQVeDrgZdDboadDXoatDVoKtBV4OuBl0Nuhp0Nehq0NWgq0FXg64GXQ26GnQ16GrQ1aCrQVeDrgZdDboadDXoatDVoKtBV4OuBl0Nuhp0Nehq0NVgqMFQg6EGQw2GGgw1GGow1GCowVCDoQZDDYYaDDUYajDUYKjBUIOhBkMNhhoMNRhqMNRgqMFQg6EGQw2GGgw1GGow1GCowVCDoQZDDYYaDDUYajDUYKjBUINR+D+STzBtAAB4nGNgFGBgYvjHwBDDEMXA8CeKhQEIGBmQAQsAUFYDJ3icnVGhTgNBEN3MO1NFgqitxeNoSdZRXFNZRdGQAA7VC2DqSBDYg2JQhACpIJD7ABQhwV0IBgmWBHK8mb3bFIMgL7M7N/PmzcyeGyTODaSg5WpS0AxwanqKl5TnVNrEFPMYI0eqkEt678QQQ/lSNvkfhPon8PJNlFKqHyoq5GiS4alM9VBHhiIPd+IC7OuUcNhlnY84mvE9GvIU/byCt57hfJjhOhRRacmY9Uzms+dNFQ3TuErN/dLIq3s/brZOr03r4B6reI27et2TqpM4mdamcqdbYkTGorH6EjJ1Z32TCbo4xBZ68kJt9TNmM2zwRQ/YqWWRDDu0nqwxN0aP/jZrPOZM7wx75LVwjgajWf2yiYvTNO1/p7o7o8s2l/XkneGCp77KM+0NK1iwaIZPZWtPzeMatyhxZVmNPOKY6GPzD63OP7RKvkL3BwVTlloAAA==") format("woff"),
         url("data:application/octet-stream;base64,AAEAAAAPAIAAAwBwRkZUTWi+peQAAMZwAAAAHEdERUYBhAAEAADGUAAAACBPUy8yNapVcgAAAXgAAABWY21hcP9CPpUAAASIAAAEBGdhc3D//wADAADGSAAAAAhnbHlmuB9oNQAACzwAAKsUaGVhZP/leQ8AAAD8AAAANmhoZWEIXgQEAAABNAAAACRobXR4a6Zb7wAAAdAAAAK2bG9jYYTBsFwAAAiMAAACsG1heHABsAFVAAABWAAAACBuYW1luedXUwAAtlAAAAGMcG9zdMDF/eYAALfcAAAOanZoZWEGYAq4AADGjAAAACR2bXR4RMdPkgAAxrAAAAK2AAEAAAABAACUz9dTXw889QArBAAAAAAAzlOaCQAAAADOU5oJAAAAAAQABAAAAAAIAAIAAAAAAAAAAQAABAD//wBcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAQAAQAAAVcBUgAXAAAAAAACAAAAAQABAAAAQAAAAAAAAAABBAABkAAFAAgCmQLMAAAAjwKZAswAAAHrADMBCQAAAgAFCQAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDgAOMmAzP/MwBcBAAAAAAAAAEAAAAAAAAEAAAABAABQAQAASIEAAEiAUABQAFAAUABQAFAAQABAAEAAcABQAFAAYAB2wFfAV8B2wB3AO4AQACAAIAAgABAAVAAQABAAMEAwQEQARABAAEEAQABBAEAAQABAQEBAF8AwABfAMABAwEDAIAAgACAAIAAgACAAEAApAEAAMAAwAFAAUABAAFAAQABQADAAIAAQACAAIAAgAAZABkAGQAZAMAAwAB+AH4AQAAwAEAAgACAAIAAgACAAE4AwAEAAQABdgDAAP8AQABAAMAAvwDhAQIAQABAAEAAQACAAIAAwABAAEAAwADAAAAAAAEAAEAALAAAAEAAgADAAIAAgACRAMAAQABAAAAAAABAAEAAQACtAP8ASgBAAMAAwACAAEAAgABAAL8AQABAAMAAwACAAIAAQABAAIAAQAGAAYAAgACAACYAwADAAMAAngCAAMAAQACAAEIAtwA+AIAAwADAAQAAwADAAAMBwAAgAEAApgBAAAAAwACAAIAAwQFAAEAAAwCAANAAgABAAHAAQAEAAEAAgACAAMAAQADAAMAAgAAwAIAAoACQAHAAUABQAFAAYAEZAPMAfQCXAGIANACbAHAAYABgAE4BkADAAIABoAD0AMABGgDQAMAAlAC/AFAAwACgAMoAiACIAFAATgDwASwAAAAAAAAAAAAAAHQAQABAAEAAQABAAEABAACAAQAAgACfAEAAAACgAJAAAAAAAAAAKgAAARkAlAAAAAAAAAA4AAAAAABgAGAACwAAADAAoAGgAMUBAAAAAIAATQAAAAAAAACAAAAAgAAAAAAAJAAAAAAAoACQAAAAAAAAACoAAAEZAJQAAAAAAAAANAAAAAAAYABgAAsAAAAwAKABoADFAQAAAACAAE0AAAAAAAAAgAAAAIAAAQABACQAAAAAAAAAMAAwAAAAAAADAAAAAwAAABwAAQAAAAAC/gADAAEAAAAcAAQC4gAAAAoACAACAAIAAOEE4ibjJv//AAAAAOAA4f/i////AAAAAAAAAAAAAQAAAAgCEAJeAAAAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEAYgBjAGQAZQBmAGcAaABpAGoAawBsAG0AbgBvAHAAcQByAHMAdAB1AHYAdwB4AHkAegB7AHwAfQB+AH8AgACBAIIAgwCEAIUAhgCHAIgAiQCKAIsAjACNAI4AjwCQAJEAkgCTAJQAlQCWAJcAmACZAJoAmwCcAJ0AngCfAKAAoQCiAKMApAClAKYApwCoAKkAqgCrAKwArQCuAK8AsACxALIAswC0ALUAtgC3ALgAuQC6ALsAvAC9AL4AvwDAAMEAwgDDAMQAxQDGAMcAyADJAMoAywDMAM0AzgDPANAA0QDSANMA1ADVANYA1wDYANkA2gDbANwA3QDeAN8A4ADhAOIA4wDkAOUA5gDnAOgA6QDqAOsA7ADtAO4A7wDwAPEA8gDzAPQA9QD2APcA+AD5APoA+wD8AP0A/gD/AQABAQECAQMBBAEFAQYBVQEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBUwFWAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEBUgFUAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAGgAoADYARABSAGAAbgB8AJIAqAC+ANQA4gDwAP4BDAEuAVABcgGUAdACDgIyAl4CeAKSAqgCvgLuAyADSANyA4wDpgPAA9oD9AQOBCgEQgRkBIgEqgTMBPAFFAU4BVwFfAWkBcYF4gYEBiAGUgZmBoYGoAauBsQG0gbuBwIHIAc6B14HlgfiCBYIdgjCCN4JCgkeCToJggnKCfwKPgqMCroLBgtwC9oMRAyuDRgNmA3uDjwOag56DsgPAA+8EF4QmhC0EOoQ/BF6EfgSIhJwEsIS6BMOE0YTgBOWE7gUEhRsFLQVIBWMFdIWUBZ2FpwW0BdwF8QYGBhKGIYY8BlIGXQZpBnMGg4aThqaGygbkhvEHBwc3B0kHUYdhh2+HegeNB5OHnoewh8OH3gfuh/uIBggTCCEIMIg8iEkIXYiVCKOIuYjEiNYI5okNCRgJNwlRiVkJbYl2CYUJjgmUCZoJqgm+Cc6J44n4CgMKDQoYCjGKQYpRimkKdYqACpUKrorAitAK1QriCvmLDgsWiyQLMItEC1ELY4tti32LmwuwC8CL0Yvoi/iMCowTDCWMPwxNjF+MagyLjKiMxQzWjN8M7Az2DQANDQ0ZDSMNKg02jUMNTY1aDWENcg2ADYqNlQ2yDb4Nz43ZjeKN7o4IjhgOko7EjtUO5Y8CDxGPIQ8wjz+PTw9ej2uPqA/Cj8kP2Q/2kAuQIRA9kFuQcxCFEKKQr5DKENgQ+xEAkTsRWBF0kYmRoxG6kc0R1xHkEekSHpIiEjISQhJHklmSXRJsEpASnJKpEroSxxLSEuIS/5MNEy0TP5NQk1+TcZOGk5OTpBOrE70TwpPbE/gUFJQlFDUUQ5RNlFeUZJRplIEUhJSUlKSUqhSxlLUUwhTfFOYU7RT+FQsVKRU9lVAVYoAAQAAAAAD6AQAAAMAADEhESED6PwYBAAAAQFAASICwALeAAIAAAERJQFAAYAC3v5E3gAAAAEBIgFAAt4CwAACAAABAyECAN4BvALA/oAAAAABASIBQALeAsAAAgAAARsBASLe3gLA/oABgAAAAQFAASICwALeAAIAAAENAQLA/oABgALe3t4AAAEBQAFAAsACwAACAAAJAREBQAGAAsD+gAGAAAABAUABQALAAsAAAgAAAREBAUABgALA/oABgAAAAQFAAUACwALAAAIAAAkBIQLA/oABgALA/oAAAAEBQAFAAsACwAACAAABESEBQAGAAsD+gAAAAAACAUABAAMAAwAABAAHAAABGQEzEQMlEQLAQED+gAMA/wD/AAIA/wDe/kQAAAIBAAEAAwACwAAEAAcAAAEVKQE1BQMhAQABAAEA/wDeAbwCwEBAQP6AAAAAAgEAAUADAAMAAAIABwAAARsBAyEVITUBIt7e3v8AAgADAP6AAYD+gEBAAAACAQABAALAAwAABAAHAAABETMZAgURAQBAAYADAP4AAQABAP8A3gG8AAAAAAEBwAFAAoACwAACAAABETcBwMACwP6AwAAAAAABAUABgALAAkAAAgAAAQchAgDAAYACQMAAAAAAAQFAAcACwAKAAAIAAAEXNwFAwMACgMDAAAAAAAEBgAFAAkACwAACAAABBxcCQMDAAsDAwAAAAAABAdsAlAMGArcAEQAAAScmIgYUHwEHBhQWMj8BNic2Av7zCRcQCOLiCBAXCfMJAQEBvPMIEBcI4uIIGBAI9AkNDQAAAAEBXwEQA4ICOwARAAABJyYHJg8BBhQWMj8BFxYyNjQDevMKDQ0J8wgQFwnh4ggYEAFA8wkBAQnzCBgQCOLiCBAYAAAAAQFfARADggI7ABEAAAAmIg8BJyYiBhQfARY3Fj8BNgOCEBgI4uEJFxAI8wkNDQrzCAIrEAji4ggQFwj0CQEBCfQIAAABAdsAlAMGArcAEQAAATc2NCYiDwEGFwYfARYyNjQnAhziCBAYCPMJAQEJ8wgYEAgBpuIIFxAI8wkNDQn0CBAYCAAAAAIAdwDuA4kDEgARACMAAAAmIg8BBhcGHwEWMjY0LwE3NgUnJiIGFB8BBwYUFjI/ATYnNgGjERcI8woBAQrzCBcRCeHhCQHd8wgXEQnh4QkRFwjzCgEBAwERCfMJDQ0J8wkRFwji4gjU8wkRFwji4ggXEQnzCQ0NAAIA7gB3AxIDiQASACQAAAEGDwEGFBYyPwEXFjI2NC8BJgcCIgYUHwEWNxY/ATY0JiIPAScB/QsI8wkRFwji4ggXEQnzCQ3qFxEJ8wkNDQnzCREXCOLiA4kBCPMIFxEJ4eEJERcI8woB/hoRFwjzCgEBCvMIFxEJ4eEAAAABAEAAQAPAA8AAFwAAAQczFSM1Bxc1MxUjFzcjNTMVNycVIzUzAgCwcMDAwMBwsLJywr6+wnIDwL/AcLGxcsK/v8JysbFwwAABAIAAgAOAA4AAFwAAExE3FwcnESEnNxcHIREHJzcXESEXByc3gHOzsnQBQHKzsnMBQHOxsnL+wHSztHMDgP7Ac7SzdP7AcrKxcwFAc7KzcgFAdLKzcwAAAQCAAIADgAOAAAkAAAEXAScRIScBFxECQHP+QHMBQHMBwHMDgHP+QHP+wHMBwHMBQAAAAAEAgACAA4ADgAAJAAATETcBByERBwE3gHMBwHMBQHP+QHMDgP7Ac/5AcwFAcwHAcwAAAAABAEABTwPAArEACQAAAQcXNSEVNycVIQEAwMACAr6+/f4CsbGxcnKxsXAAAAEBUABAArIDwAAJAAABBzMRIxc3IxEzAgCwcHCwsnJyA8C//f6/vwICAAAAAQBAAAADwAPvAB0AAAEVDgIVFB4BMj4BNTQnBxYVFA4BIi4BNTQ2NxUlAcBrsGV4zvTOeGRoVViYsphYl3IBMQPvdA98wW96znh4znqefD1ef1mYWFiYWXe1F3SwAAAAAQBAAAADwAPvAB0AAAENATUeARUUDgEiLgE1NDcnBhUUHgEyPgE1NC4BJwJA/s8BMXKXWJiymFhVaGR4zvTOeGWwawPvsLB0F7V3WZhYWJhZf149fJ56znh4znpvwXwPAAAAAAEAwQCAAz8DYQAYAAABFQ4BFRQWIDY1NCcHFhUUBiImNTQ2NxU3AcFukrsBCLtDSzmJwolgS/wDYWkWsHOEu7uEblYrQldhiYlhUH0VY5IAAQDBAIADPwNhABgAAAEHFzUeARUUBiImNTQ3JwYVFBYgNjU0JicCP/z8S2CJwok5S0O7AQi7km4DYZGSYxV9UGGJiWFXQitWboS7u4RzsBYAAAAAAQEQAQADAAL8AA0AAAEHMx4BOwE1IzEiJiczAaGRaRawc05OUH0VYwL8/G6SVWBLAAAAAAEBEAEEAwADAAANAAABIgYHIxc3Iz4BMzEzNQKyc7AWaZGSYxV9UE4DAJJu/PxLYFUAAAABAQABEAL8AwAADQAAARUUFhcVNycVLgE1MTUBAJJu/PxLYAMATnOwFmmRkmMVfVBOAAAAAQEEARADAAMAAA0AAAEVMRQGBzUHFzU+AT0BAqtgS/z8bpIDAE5QfRVjkpFpFrBzTgAAAAEBAAEAAvwC8AANAAABFQ4BHQEzNTE0NjcVNwIAbpJVYEv8AvBpFrBzTk5QfRVjkgAAAAABAQQBAAMAAvAADQAAAQcXNR4BFTEVMzU0JicCAPz8S2BVkm4C8JGSYxV9UE5Oc7AWAAAAAQEAAQAC8AL8AA0AAAEHMw4BIzEjFTMyNjczAl+SYxV9UE5Oc7AWaQL8/EtgVZJuAAAAAAEBAAEEAvADAAANAAABFTMxMhYXIxc3Iy4BIwEATlB9FWOSkWkWsHMDAFVgS/z8bpIAAAABAQEAwAL9A6EAFAAAARUOARUUFjMyNzUGIyImNTQ2NxU3AgFukruEICAfIWGJYEv8A6FpFrBzhLsGWAmJYVB9FWOSAAEBAQBfAv0DQAAUAAABIgYVFBYXFTcnFS4BNTQ2MzIXNSYCQIS7km78/EtgiWEgICADQLuEc7AWaZGSYxV9UGGJCVgGAAAAAAEAXwEBA0AC/QAUAAATBzMeATMyNjU0JyMWFRQGIyImJzPwkWkWsHOEuwZYCYlhUH0VYwL9/G6Su4QgIB8hYYlgSwAAAQDAAQEDoQL9ABQAAAEHMw4BIyImNTQ3IwYVFBYzMjY3MwMQkmMVfVBhiQlYBruEc7AWaQL9/EtgiWEgICAghLuSbgABAF8BAwNAAv8AFAAAASIGByMXNyM+ATMyFhUUBzM2NTQmAgFzsBZpkZJjFX1QYYkJWAa7Av+Sbvz8S2CJYSAgICCEuwAAAAABAMABAwOhAv8AFAAAASIGFRQXMyY1NDYzMhYXIxc3Iy4BAf+EuwZYCYlhUH0VY5KRaRawAv+7hCAgICBhiWBL/PxukgAAAAABAQMAwAL/A6EAFAAAAQcXNR4BFRQGIyInFRYzMjY1NCYnAf/8/EtgiWEgICAghLuSbgOhkZJjFX1QYYkJWAa7hHOwFgAAAAABAQMAXwL/A0AAFAAAASIHFTYzMhYVFAYHNQcXNT4BNTQmAcAgICAgYYlgS/z8bpK7A0AGWAmJYVB9FWOSkWkWsHOEuwAAAAACAIAAfgOCA4AABwANAAAAIAYQFiA2ECcXASc3FwKg/sLi4gE+4rhO/qjWTogDgOL+wuLiAT4YTv6o2E6KAAAAAgCAAH4DggOAAAcAEwAAACAGEBYgNhAlFzcXBxcHJwcnNycCoP7C4uIBPuL94p2dRp6eRp2dRp6eA4Di/sLi4gE+RJ6eRp2dRp6eRp2dAAACAIAAgAOAA4AABwATAAAAIAYQFiA2ECUzFTMVIxUjNSM1MwKf/sLh4QE+4f5AgMDAgMDAA4Dh/sLh4QE+YcCAwMCAAAIAgACAA4ADgAAHAAsAAAAgBhAWIDYQBSEVIQKf/sLh4QE+4f2AAgD+AAOA4f7C4eEBPl+AAAAAAgCAAIADgAOAAAcAEwAAACAGEBYgNhAlMxUzFSMVIzUjNTMCn/7C4eEBPuH+QICAgICAgAOA4f7C4eEBPiGAgICAgAACAIAAgAOAA4AABwALAAAAIAYQFiA2EAUhFSECn/7C4eEBPuH9wAGA/oADgOH+wuHhAT5fgAAAAAMAQABAA8ADwAALABMAGwAAACIOARQeATI+ATQmBTIWFRQHATYHAQYjIiY1NAJ69M54eM70znh4/riEuzP+SE6uAbhOXoS7A8B4zvTOeHjO9M4Ju4ReTgG4M5P+SDO7hF4AAAABAKQArANOAxYABQAACQEnBwUBAwb+svkbASIBiAMW/inBeNwCAgAAAQEAAQADAAMAABEAAAEHFRcHFRczNxczNSc3NSMHJwECAsLCAkDAwD6+vj7AwAMAAjzCwjwCwMBCvr5CwMAAAAEAwADAA0ADQAALAAABESEVIREzESE1IREBwP8AAQCAAQD/AANA/wCA/wABAIABAAAAAAABAMABwANAAkAAAwAAExUhNcACgAJAgIAAAAAAAQFAAUACwALAAAsAAAEVIxUzFTM1MzUjNQHAgICAgIACwICAgICAgAAAAAABAUABwALAAkAAAwAAARUhNQFAAYACQICAAAAAAQEAAQADAAMAAA8AAAEiBhURFBYzITI2NRE0JiMBQBslJRsBgBslJRsDACUb/oAbJSUbAYAbJQACAUABAALAAwAAAwAHAAABETMRMxEzEQFAgICAAwD+AAIA/gACAAAAAgEAAMADAAMAAAIADgAAAQMhBSIGFBYzITI2NCYjAgDeAbz+Qg0TEw0BwA0TEw0DAP6AgBMaExMaEwAAAQFAAMADAANAAA0AAAEHIyIGHQEUFjsBFzMRArTAdBslJRt0wEwDQMAlG4AbJcACgAAAAAIAwADAA0ADQAAHABUAAAAiBhQWMjY0JSMiBh0BFBY7ARczESMDGzYlJTYl/jR0GyUlG3TATEwCQCU2JSU2ZSUbgBslwAKAAAMAgADAA8ADQAALABMAIwAAARUeARQGBxUyNjQmAjQmIgYUFjIlIyIGHQEUFjsBFzM1ETUjAsBEW1tEapaWKiU2JSU2/ll0GyUlG3TATEwDAEQMao1rC0OW1Jb+5TYlJTYlwCUbgBslwIABf4EAAAABAEAAAAPAA8AANwAAACIOARUUFhcVFBY7ATI2NRE0JisBIgYdASY1NDYgFhUUBzU0JisBIgYVERQWOwEyNj0BPgE1NCYCevTOeEM9JRtAGyUlG0AbJR3MASLMHSUbQBslJRtAGyU9Q3gDwHjOelqiPYcbJSUbAUAbJSUbC0JJkczMkUlCCxslJRv+wBslJRuHPaJaes4AAAEAgACjA4ADQAAgAAABIgYHFB4EFx4BFz4BNz4FNTQuAg4BBy4BAT9OcAEWHjclQw49WggHXjoQPio0HxYtRVdUTBcfaANAgG4jPysvGCkJKGUcGmgpCycaLSs/I0FlNxEYRjZISgAAAgCAAKMDgANAACAAQQAAASIGBxQeBBceARc+ATc+BTU0LgIOAQcuAQcyFhc+Ax4CFRQOAwcOAQcuAScuBTU0NgE/TnABFh43JUMOPVoIB146ED4qNB8WLUVXVEwXH2gxNGcdDzA2OTQqGRQrIz0MLUgFBkUvCjMdKhYRPgNAgG4jPysvGCkJKGUcGmgpCycaLSs/I0FlNxEYRjZISnhPQyM7IxMIHT4qITUqGiYJH08UFk0eBx8TIyEwG0ZIAAAAAgCAAKMDgANAACAAMQAAASIGBxQeBBceARc+ATc+BTU0LgIOAQcuAQUyFhUUDgMHDgEHPQE+AQE/TnABFh43JUMOPVoIB146ED4qNB8WLUVXVEwXH2gBQC89FCsjPQwtSAUcaQNAgG4jPysvGCkJKGUcGmgpCycaLSs/I0FlNxEYRjZISnlFRSE1KhomCR9PFJSwQVAAAAABABkAYgPnBAAACQAAAQMFFwMlBQM3JQIAkv6r+0EBLQEtQfv+qwQA/skr6/6vpqYBUesrAAAAAAIAGQBiA+cEAAAJABMAAAEDBRcDJQUDNyUnHwEHFycHNyc3AgCS/qv7QQEtAS1B+/6rklnQmSe3tyeZ0AQA/skr6/6vpqYBUesrdr0akM5mZs6QGgAAAAABABkAYgIABAAABQAAAQMFFwMlAgCS/qv7QQEtBAD+ySvr/q+lAAAAAQAZAGICAAQAAAsAAAEDBRcDJTUHNyc/AQIAkv6r+0EBLbgomdBZBAD+ySvr/q+laGXOjxu9AAAEAMAAwAOAA0AACwAXACMALwAAACIGFREUFjI2NRE0BiIGFREUFjI2NRE0BCIGFREUFjI2NRE0FiIGHQEUFjI2PQE0A1s2JSU2JeU2JSU2Jf5bNiUlNiWbNiUlNiUDQCUb/gAbJSUbAgAbmyUb/sAbJSUbAUAbGyUb/wAbJSUbAQAbWyUbgBslJRuAGwAAAAAEAMAAgANAA0AACwAXACMALwAAASIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBY7ATI2NCYjByIGFBYzITI2NCYjAQAbJSUbAgAbJSUb/gAbJSUbAUAbJSUb/sAbJSUbgBslJRuAGyUlGwEAGyUlGwNAJTUmJjUlwCU1JiY1JcAlNSYmNSXAJTUmJjUlAAADAH4AfgOwA6IABgAPABkAAAEDJS4DByIGFRQXJRMmAQ0BHgEzMjY1NAK2ZAFeDik+Veag4hQBNloSAXH+mf6eNK5moOIDov6eaSFFTDsU4qA/PIQBdwL+kkmXVGLioAkAAAAAAwB+AH4DsAOiAAkAFwAnAAABBx4BFzcuAwciBhUUFzcmNTQ2PwEmAQcOASMiJicHHgEzMjY1NAK2LTBHDqIOKT5V5qDiFKIHdlUqEgFxrwV6UzBWHaU0rmag4gOinxBKMTEhRUw7FOKgPzxFGxtVewOtAv6SI1NxKSRGVGLioAkAAAAAAQBAAQADwAMAADUAAAAiBhUUFwcmIyIGFBYyNjU0JzcWMzI3EwYVFBYyNjU0JzcWMzI2NCYiBhUUFwcmIyIHAzY1NAGbNiUCoQ8SGyUlNiUCoQ8SBQXACiU2JQe2CQgbJSU2JQe3CAgHBr4LAwAlGwgJeAklNiUlGwgIeQkB/uEQEhslJRsQDuQCJTYlJRsQDuQCAQEdEBQbAAAAAgAwAIADwAN5AAsAFgAACQEFFxQWMyEyNjURJQcBFzcBMTMBJwECff7M/vYBJRsDABsl/YsB/uYt6gE3AQE/L/7zASYBf/fuGyUlGwHA+QH+5i3p/n0BVSz+3wAFAEAAgAPAA4AABwAPACAAKAAwAAAAMjY0JiIGFAYyNjQmIgYUASERNCYiBhURFBYzITI2NCYkMjY0JiIGFDYyNjQmIgYUAaU2JSU2JZs2JSU2JQLg/OATGhMTDQNADRMT/rg2JSU2JeU2JSU2JQLAJTYlJTblJTYlJTb+mwKgDRMTDf1ADRMTGhPAJTYlJTbbJTYlJTYAAAYAgACAA4ADQAALABcAIwAvADsARwAAEyIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjoA0TEw0CwA0TEw39QA0TEw0CAA0TEw3+AA0TEw0CwA0TEw39QA0TEw0CAA0TEw3+AA0TEw0CwA0TEw39QA0TEw0CAA0TEw0DQBMaExMaE4ATGhMTGhOAExoTExoTgBMaExMaE4ATGhMTGhOAExoTExoTAAAABgCAAIADgANAAAsAFwAjAC8AOwBHAAABISImNDYzITIWFAYHISImNDYzITIWFAYXISImNDYzITIWFAYHISImNDYzITIWFAYXISImNDYzITIWFAYHISImNDYzITIWFAYDYP1ADRMTDQLADRMTjf5ADRMTDQHADRMTc/1ADRMTDQLADRMTjf5ADRMTDQHADRMTc/1ADRMTDQLADRMTjf5ADRMTDQHADRMTAwATGhMTGhOAExoTExoTgBMaExMaE4ATGhMTGhOAExoTExoTgBMaExMaEwAGAIAAgAOAA0AACwAXACMALwA7AEcAABMiBhQWMyEyNjQmIwUiBhQWMyEyNjQmIwUiBhQWMyEyNjQmIwUiBhQWMyEyNjQmIwUiBhQWMyEyNjQmIwUiBhQWMyEyNjQmI6ANExMNAsANExMN/gANExMNAgANExMN/UANExMNAsANExMN/gANExMNAgANExMN/UANExMNAsANExMN/gANExMNAgANExMNA0ATGhMTGhOAExoTExoTgBMaExMaE4ATGhMTGhOAExoTExoTgBMaExMaEwAAAAYAgACAA4ADQAALABcAIwAvADsARwAAEyIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjBSIGFBYzITI2NCYjoA0TEw0CwA0TEw39QA0TEw0CwA0TEw39QA0TEw0CwA0TEw39QA0TEw0CwA0TEw39QA0TEw0CwA0TEw39QA0TEw0CwA0TEw0DQBMaExMaE4ATGhMTGhOAExoTExoTgBMaExMaE4ATGhMTGhOAExoTExoTAAAABgCAAIADgANAAAsAFwAjAC8AOwBHAAATIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiOgDRMTDQLADRMTDf1ADRMTDQLADRMTDf1ADRMTDQLADRMTDf1ADRMTDQLADRMTDf1ADRMTDQLADRMTDf1ADRMTDQLADRMTDQNAExoTExoTgBMaExMaE4ATGhMTGhOAExoTExoTgBMaExMaE4ATGhMTGhMAAAAGAE4AEAPRA5MALgA1AD0ARQBNAFUAAAEyFhQGKwEXFh8BBwE3FyEyFhQGIyEXITIWFAYjIRchMhYUBiMhFzMyFhQGKwEXARcjIiY1NBczFyMiJjQ2FzMXISImNDYXIRchIiY0NhchFyEiJjQ2A14NExMNO0EVBFRD/MBDUgJ7DRMTDf3FQAH7DRMTDf5FQAF7DRMTDf7FQPsNExMNu0D9rj0wDRMgcECwDRMTDfBA/tANExMNAXBA/lANExMNAfBA/dANExMBQBMaE0EEFVNDA0BDUxMaE0ATGhNAExoTQBMaE0ABfT0TDRV1QBMaE4BAExoTgEATGhOAQBMaEwAAAwDAAMADDgNAAB0ALgA3AAABFhcWFRQHBiMhNTI3PgE1ETQuASM1ITIeARUUBwYFFQcUFjMyNzY3NjU0JyYnJicyPgE0JicmBwJaWyU0OkeI/rssEBANDSAsATNuWzUhIv8AARoaJSAhEBEUFSUkSENAIiIfH0UCExUeK0VILzkRCQgaNAGgNBoQEidOLC4kJC7NGBkaEREfICctJCMPDiQeN1U2Dg8BAAAAAAMBAADAAxgDQAAXACQAMQAAASEyFxYXHgEVFAcGBx4BFRQHDgEHBgcjExUzMjc+ATU0JicmIwcVMzI3PgE1NCYnJiMBAAEATCUlHh0oGRgpOj8UFEczH33agVVMEiEmISATXEp4RhMcJRwbGlgDQAYHFBRDKS0mJRMRUjcsKSoxBgMBAhWUAwQmHx0lBAL+qwQFKSIcKQkJAAAAAAEBAADAAuUDQAAZAAABNyEHIgcGBwMGFRQXFhcHITcyNjcTNjU0JgGoBQE4BioXFhF1DQ0RLwT+wgUwLBJ2CxoDLxERExM8/mYrDxEJDQERESU9AZomExEUAAAAAQF2AMACgANAAAMAAAEDMxMB/IaEhgNA/YACgAAAAAACAMAAQANFA0AAAwA1AAA3NSEVASEVIyIOARURFB4BMzI3PgE1ETQnJicmIzUzFSMiBgcGHQEUBw4BIyInLgE1ETQuASPAAoD9gQFDECUbCxk6LTIkJCMICQ4UJtgNGiMIBg8OcWFRLD0yDB0oQEBAAwARDxs2/s5UNiQXFlFjAP8qEhIHCxERFRYPJu1vMDFSFR5cTgEyNhsPAAACAP8AQAMAA0AAAwAhAAAlNSEVATMRFBceATMyPgE1ETMRFAcGBwYHBiMiJy4BJyY1AQACAP3/fwQIPjU2Nwt/CwocGy8uSlovLjYJDEBAQAMA/qxRGCcuLEBLAVv+tnEvLyAgExMVFUIlNmkAAAAABgBAAUADwAMJAAMAJQA9AEsAfQCIAAATNSEVBw4BIyImNzQ2MzIWFRQGIyInLgEnJiMiBwYVFBYzMjc2NyU2MzIWFRQHBiMiJicRNCcuASMiByc3Mx0BHgEzMjY1NCYjIgcGBwYHBiMiJjU0Nz4BNzU0JiMiBwYdARQGIiY1NDYzMhcWFxYdARQXHgEyNzY3FQYjIiY9AQYHDgEVFBYzMkADgBUMRCkxSgFQOSs3EA4SCgUECwsTIBMZMisfGRER/iAqMC1CMyw2GTQbAgMKBwkOBFcOECISHTIyIBARDd0sDBETHicJDUBLHBoUCwwOGA84MiYZEgkGAQIHCgQGEyMgEBIwDhkVGxIYAcofHxQ5PVNGRFUtGAwPDAclCgkXHzM0TxUPJn06TEJNLygSEwErMQsMCAULI+WtEBA/PDg7CAbFIgUIKSEVEBUmGwwrIAsLDRMOEBAPGy0NChQOKmIpCQoGAgQTEi8WLm4TCA4eEhceAAAAAAYAQAFAA8AC1AADAB8ALwA6AGIAcQAAEzUhFQcXDgEjIiY1NDY3NjMyFhcHLgEjIgYVFBYzMjYFIxEzFTYzMh4CFRQGIicmFBcWMzI2NTQmIgcGBwYjIiY1ND4BNzY3Njc1NCcmIyIGByc+AjIeARcWHQEUFhcjJicGBwYHDgEVFBYyNjc2NUADgDUwCEEvO0gfHyAlLzwILwciGSUuLSMdJ/5BLjEfMBsvHxFJZh0BDhcoIC4sQNQbGhgdMDMTHxQOHjscDhMlIiEIMAceOEouFgUCBgkzBwYbNR4NDA4eOCwLCAHCKSkSBjI4TUkuRhIRLywHHR01OTo1I0UBjo4nFSc3H0pRK6JoFyY4Nzg22xcKCS4kFiMVBQQEBwkNHgwRGB8GHyYUERoVDCFBRCQREIELBwUFBhQNFBoZFREgAAAAAAIAwADAA1oDQAAhACQAAAEjBwYVFBcWFxUjNT4BNxMzExYXFhcVITUzMjc2NTQnJi8CBwJD3hoNFQ0x0SIrIOAJ4iEVDx3+0QwlDgoCAQ0xXmABcj0eFBoNBwQREQUuSAH0/f5JEw8CEREKCA4ICQQecdjYAAAAAAIAvwDAA0EDQAAHAAoAACUjJyEHIxMzEycHA0GNN/8ANYn5iRJYVsCRkQKA/n3u7gAAAAABAOEAwAMfA0AAIgAAARUjLgEnJisBERQXFhcWOwEVITUzMjc2NzY1ESMiBwYHIzUDHxEPJCESLDAFBhAPHBX+sRUcEQwHBi9AHikLEQNArTw0EAj+EzENDAkJEhIJBxAMMAHtGyZHrQAAAAABAQIAwAL+A0AABwAAJREjNSEVIxEBwL4B/L3AAhRsbP3sAAAJAEAAQAPAA8AACQASABwAJQAvADgAQgBKAFMAAAEjNjQnMzIWFAYnJic3NjIWFAclNTQ2MhYdASYiBycmNDYyHwEOARQXIyImNDY7ARcWFwcGIiY0NwUVFAYiJj0BFjI2IiY0NjIWFB8BFhQGIi8BNgOAiAgIiBslJb4iOWATNSYT/oMlNiUfQrxgEyY1E2A5RQiIGyUlG4gbIjlgEzUmEwF9JTYlH0IvoHBwoHAdYBMmNRNgOQHAH0IfJTYlwjkiYBMmNRMWiBslJRuICH5gEzUmE2AimkIfJTYlwjkiYBMmNRMWiBslJRuICEBwoHBwoDJgEzUmE2AiAAAJAEAAQAPAA8AACQASABwAJgAvADkAPwBIAFEAAAEjNjQnMzIWFAYnJic3NjIWFAcAIiY9ARYyNxUUAzU0NjIWHQEmIgcnJjQ2Mh8BDgEUFyMiJjQ2OwE3ESImNDYDFhcHBiImNDclFxYUBiIvATYDgIgICIgbJSW+IjlgEzUmE/7eNiUfQh+AJTYlH0K8YBMmNRNgOUUIiBslJRuI+FBwcI0iOWATNSYTAhpgEyY1E2A5AcAfQh8lNiXCOSJgEyY1E/1eJRuICAiIGwKTiBslJRuICH5gEzUmE2AimkIfJTYlgP6AcKBw/r45ImATJjUTYGATNSYTYCIAAAACAEAAQAPAA8AADwAYAAAkIi4CND4CMh4CFA4BASIOARQeATMRAlu2pnhHR3imtqZ4R0d4/v9foV1doV9AR3imtqZ4R0d4prameALWXaG+oV0BXQACAEAAQAPAA8AAGwA3AAABIxE0JiIGFREhIgYUFjMhFRQWMjY9ATMyNjQmAzI2NCYjITU0JiIGHQEjIgYUFjsBERQWMjY1EQOAQCU2Jf8AGyUlGwEAJTYlQBslJZsbJSUb/kAlNiVAGyUlG0AlNiUBQAEAGyUlG/8AJTYlQBslJRtAJTYlAYAlNiVAGyUlG0AlNiX+QBslJRsBwAAEAIAAgANAA0AADwAbACsANwAAJSMiJjURNDY7ATIWFREUBgQiJjURNDYyFhURFCcjIiY1ETQ2OwEyFhURFAYDNCYiBhURFBYyNjUDAIAbJSUbgBslJf7SGhMTGhPAgBslJRuAGyUlGyU2JSU2JcAlGwHAGyUlG/5AGyVAEw0CgA0TEw39gA0tJRsBwBslJRv+QBslAcAbJSUb/sAbJSUbAAAAAAMAgADAA4ADQAAGAAwAEgAAJSImNREzASkBAREUBgsBMzI2NQKAGyUBAT/+AP8AAUAlG4BAGyXAJRsCQP2AAoD9wBslAUL+/iUbAAADAMAAgANBA4AABgAMABIAADcRNDYzIRclEQEhIiY3MyUVFBbAJRsCQAH9fwKA/cAbJYDC/v4lgAEAGyUBwQEA/sAlG4BAGyUAAAAABABAAMAEAANAAAUACwARACAAACUiJjURASkBAREUBicFMzI2NQMjIgYdASM1NDY7ATUXBwMAGyUBQP5A/gACQCUb/wDAGyWAQBknQD0fZLKywCUbAkD9gAFA/wAbJcCAJRsBgCMdgJwgREBeYgAAAAQAQADABAADQAAOABQAGgAgAAABNCYrARUnNxUzMhYdASMBIiY1EQElFBY7ASUHIQERFAYDACcZQLKyZB89QP8AGyUCQP4AJRvA/wDA/wABQCUCgB0jQGJeQEQgnP7AJRsBAP7AgBslgMACgP3AGyUAAAAAAQDAAIADQAOAAAcAAAEhFQERNxEBA0D9gAEAgAEAA4BM/wD+TLABBAEAAAACAMAAAANMA8wABwAPAAABBwE3FyEVDwIRBxEBNTMDTCr9wCrMAWiOWBqA/wBoAYwqAkAqzEyOWBr+/LABtAEATAAAAAUAAACABAADQAALABcAIgAuADoAAAEhIgYUFjMhMjY0JiUhMjY0JiMhIgYUFgE0JiIGFREjGwEjJTMyNjQmKwEiBhQWNzMyNjQmKwEiBhQWA8D+QBslJRsBwBslJf4lAUAbJSUb/sAbJSX+2xMaE4CgoIABQMAbJSUbwBslJRtAGyUlG0AbJSUBACU2JSU2JUAlNiUlNiUB4A0TEw3+YP8AAQCAJTYlJTYlwCU2JSU2JQAAAAUAAACABAADQAALABcAIwAvADoAAAEjIgYUFjsBMjY0JhMhIgYUFjMhMjY0JgchIgYUFjMhMjY0JgEjIgYUFjsBMjY0JgE0JiIGFREjGwEjAsDAGyUlG8AbJSXl/kAbJSUbAcAbJSWb/sAbJSUbAUAbJSX+5UAbJSUbQBslJf5lExoTgKCggAHAJTYlJTYlAYAlNiUlNiXAJTYlJTYl/oAlNiUlNiUCIA0TEw3+YP8AAQAAAAQBAACAA0ADQAALABcAIwAvAAABIyImNDY7ATIWFAYXISImNDYzITIWFAYHIyImNDY7ATIWFAYXISImNDYzITIWFAYBgEAbJSUbQBslJeX+wBslJRsBQBslJZvAGyUlG8AbJSXl/kAbJSUbAcAbJSUCwCU2JSU2JcAlNiUlNiXAJTYlJTYlwCU2JSU2JQAAAAYAQACAA8ADQAALABcAIwAvADwASAAAATI2NCYrASIGFBYzASEiBhQWMyEyNjQmEyEiBhQWMyEyNjQmASEyNjQmIyEiBhQWFycVKwEiBhQWOwIVBSEiBhQWMyEyNjQmAsAbJSUbgBslJRsBQP7AGyUlGwFAGyUlBf3ADRMTDQJADRMT/bMCQA0TEw39wA0TE0HUQCANExMNIEAC4P3ADRMTDQJADRMTAYAlNiUlNiUBQCU2JSU2Jf6AExoTExoTAcATGhMTGhPitpQTGhOUrBMaExMaEwAAAAYALACAA8ADQAALABcAIwAvADsASAAAASEiBhQWMyEyNjQmJzI2NCYrASIGFBYzASEiBhQWMyEyNjQmJSEyNjQmIyEiBhQWASEiBhQWMyEyNjQmATI2NCYrAjUHFzUzA6D9wA0TEw0CQA0TE+0bJSUbgBslJRsBQP7AGyUlGwFAGyUl/cUCQA0TEw39wA0TEwJN/cANExMNAkANExP9sw0TEw0gQNTUQAFAExoTExoTQCU2JSU2JQFAJTYlJTYlQBMaExMaE/3AExoTExoTAUATGhOUtrKUAAMAAAEABAADAAARAB0ALwAAASImJzMyNjQmKwE+ATMyFhQGJDQ2MyEyFhQGIyEiJhQWOwEOASMiJjQ2MzIWFyMiAwBGdiLeNUtLNd4idkZqlpb9liUbAYAbJSUb/oAbpUs13iJ2RmqWlmpGdiLeNQEARjpLaks6RpbUluU2JSU2JXVqSzpGltSWRjoADABAACIEAAPeAAMABwAPABcAIwAnAC8AMwA7AD8AQwBPAAAlMxUjETMVIwU7ATUmIyIGARUWMzI2NyMlIyIGFBY7ATI2NCYDFzcnJR4BMzI3NSMBJwcfAS4BIyIHFTMBFzcnEycHFxI0JisBIgYUFjsBMgIAQEBAQP6i3mIvM0Z2AZovM0Z2It4BAIAbJSUbgBslJcxCJEL9byJ2RjMvYgHxJEIkbyJ2RjMvYv4LJEIkKEIkQi8lG4AbJSUbgBvAngO8nsBsFEb+xmwURjrAJTYlJTYl/lFCJELLOkYUbAIRJEIkzzpGFGz98yRCJAK+QiRC/pY2JSU2JQAAAgCAAIADgAOAAA0AFAAANxE1ESEVIxEVMyE1MxEBJzcnIREngAFAwMABQID+rlrgdAFAcoABAEABwID+wMDA/sABUlrgdP7AcgAAAAIAwADAA0ADQAAHABUAAAEHIzU3JyERBRUzITUzESE9AREhFSMCzrFdtHQBQP3AwAEAQP3AAQDAAnKyWbN0/sBAwMD/AMBAAUBAAAAIAIAAgAOAA0AAAwAHAAsADwATABcAGwAfAAATNTMVMzUhFQU1MxUzNSEVBTUzFTM1IRUFNTMVMzUhFYCAQAJA/QCAQAJA/QCAQAJA/QCAQAJAAsCAgICAwICAgIDAgICAgMCAgICAAAYAgACAA4ADQAALACcAMwA/AFsAdwAAASEiBhQWMyEyNjQmASM1NCYiBh0BIyIGFBY7ARUUFjI2PQEzMjY0JgEhIgYUFjMhMjY0JiUhMjY0JiMhIgYUFgcjNTQmIgYdASMiBhQWOwEVFBYyNj0BMzI2NCYDIzU0JiIGHQEjIgYUFjsBFRQWMjY9ATMyNjQmA2D+QA0TEw0BwA0TE/2zIBMaEyANExMNIBMaEyANExMCM/5ADRMTDQHADRMT/jMBwA0TEw3+QA0TE3MgExoTIA0TEw0gExoTIA0TEw0gExoTIA0TEw0gExoTIA0TEwEAExoTExoTAgAgDRMTDSATGhMgDRMTDSATGhP/ABMaExMaE8ATGhMTGhPAIA0TEw0gExoTIA0TEw0gExoT/wAgDRMTDSATGhMgDRMTDSATGhMAAwCRAJ8DwAM6AA8AIgAyAAAlJhM3Jx4GFQInJgMBDgEuAS8BJjcBPgEyFh8BFhQvASYiDwEGFB8BFjI/ATY0AvQTWgX0CBtNRlY+KkBLIUD++R0zLSIWh1tbAQgVExkTFdIlw1YTNRIuEhJWEzUTLRP5NgECD/QDCyQkNTI7Gv5zCgUBM/75HRkKFxWIW1oBCBUQEBXRJiIWVhISLhI1E1YTEy0TNQAAAwDAAEADQAPAABUAGwA6AAAlISImNRE0NjsBPgEyFhczMhYVERQGAiIGFTM0FzQmKwEUBisBIiY1IyIGFREUFjsBMj4DNxY3NjUCwP6ANUtLNRceZUxlHhc1S0vaNiWAwCUbQCUbgBslQBslJRuABRIyKzEPWSIRQEs1AgA1SzFPTzFLNf4ANUsDQCUbG5sbJRslJRslG/5AGyUBCQ8iF1ygTV0AAAAAAwBAAEADwAPAAAgAEAAYAAABIwEHAyUzATUBJzUBNB8BFRMHBjMXFD8BAoQB/jYBeAEtAQHK/cgtAbABLFtaAQG0AVoDOP42Af7TeQHKAf58LQEBrwEBLAEBEFoBtAEBWgAAAAMAQACAA8ADgAAPABwAJAAAJSEiJjURNDYzITIWFREUBgM0JiMhIgYVETcFNxcmIiY0NjIWFAOA/QAbJSUbAwAbJSUbJRv9gBsl4QD/ipb4UDg4UDiAJRsCgBslJRv9gBslAoAbJSUb/oDA35+AwDhQODhQAAAAAAMAAABAA8ADgAAHAC4ASgAAABQGIiY0NjITITI2NCYrATU0Jic3BTcXETQmIyEiBhURDgEVETQ2MyEyFhURFAYlNDYyFh0BMzIWFAYrARUUBiImPQEjIiY0NjsBAsA4UDg4UPj9oCg4OCggIhueAP+KliUb/YAbJRwkJRsDABslJfzlExoTYA0TEw1gExoTYA0TEw1gAshQODhQOP2AOFA4IB4xCoffn4ABgBslJRv+ugoxHwHgGyUlG/2AGibgDRMTDWATGhNgDRMTDWATGhMAAAAABAAAAEAEAAOAABkAIgAuADoAACUhIiY1ETQ2OwERNDYzITIWFREzMhYVERQGATUhIgYVESERABQWOwEyNjQmKwEiBSEiBhQWMyEyNjQmA8D8gBslJRuAJRsBgG1TgBslJf6l/sAbJQIA/sATDUANExMNQA0BLf4AGyUlGwIAGyUlQCUbAQAbJQGAGyVTbf8AJRv/ABslAoCAJRv+wAEA/q0aExMaE4AlNiUlNiUAAAADAEAAgAOAA8AABAAQABgAACUnNxcVJCIuATQ+ATIeARQGAiIGFBYyNjQDJdFa0v5XrpNWVpOuk1ZWmqBwcKBwgNJa0VvAVpOuk1ZWk66TAapwoHBwoAAAAwBAAIADgAPAAAsAFwAcAAAANC4BIg4BFB4BMjYnIxUjNSM1MzUzFTMBJwcXMwLAVpOuk1ZWk66TKoCAgICAgAFA0lrRWwIprpNWVpOuk1ZWqoCAgICA/hvRWtIAAAAAAwBAAIADgAPAAAQAEAAUAAAlJwcXMwI0LgEiDgEUHgEyNichNSEDgNJa0VvAVpOuk1ZWk66TKv6AAYDb0VrSAamuk1ZWk66TVlaqgAAAAAABAK0AgANTA4AAKQAAASc3PgEuAQ8BNTQmIgYdAScmDgEWHwEHDgEeAT8BFRQWMjY9ARcWPgEmAzW1tRcOGzMXtSU2JbUXMxsOF7W1Fw4bMxe1JTYltRczGw4Bl2lpDTMuDg5o0RslJRvRaA4OLjMNaWkNMy4ODmjRGyUlG9FoDg4uMwABAP8AAAL/BAAALQAAACIGHQERFBYyNj0CETQmIgYVETMRNDYyFhURHQEUBiImNRE1NDYyFhURMxE0AmnUlnGecUtqS0AmNCZLaktxnnFABACWasD+gE9xcU/AgAEANUtLNf4AAgAaJiYa/wCAwDVLSzUBgMBPcXFP/gACAGoAAAEASgAxA3QDtQAtAAASBhQfAQEWMjY0LwMmIgYUFwE3ASY0NjIfAxYUBiInAScmNDYyFwE3ASbglkuIAQ84oHA4iFu1JWpLJQFqLv6WEyU1E7VbhyZLaib+8Yg4cKA4AWot/pZLA7WW1EuI/vE4cJ84iFq2JUtqJv6WLgFqEjYlE7VaiCVrSiUBD4g4oHA4/pYtAWpLAAAAEABAAEADwAPAAAoAFQAcACYAKgAuADIANgA6AD4ARQBJAE0AUQBdAGEAAAEzNSM1IxUrARUzFzUjFSMVMxUzPQEXIxUzNREjNzUjNSMVMxEzEQMRIREDIzUzBzMVIwEhESEXMxUjITMVIxMzNSMdATMlMxUjNyERIScjNTMTFSEVMxUzNSE1MzUBMxUjAkCAQEBAQIBAQICAgMBAgEBAgIBAQMABQEDAwIBAQP1AAUD+wEDAwAFAQEBAQIBA/sBAQMD+wAFAQMDAgP6AQEABQED+gEBAAYBAQECAQEBAQICAQIBAQAEAQEBAQP7AAQACAP7AAUD/AMBAQP1AAUBAwEADQEBAwIBAwP7AQMD/AEBAQEBAQP6AQAAAAAAEAMAAQAOAA8AAKwA3AEMATwAAARYVERQGKwMiJjQ2OwIyNjURNCYrBSIGHQIRFBYzITI2NRE0BSEyFhQGIyEiJjQ2FyEyFhQGIyEiJjQ2FzMyFhQGKwEiJjQ2Az8BSzUgYOANExMNQd81S0s1QEBAQEA1S3BQAUBQcP3gAQANExMN/wANExMNAQANExMN/wANExMNgA0TEw2ADRMTA1AICP3ANUsTGhNLNQIANUtLNYBA/oBQcHBQAcBXFxMaExMaE4ATGhMTGhOAExoTExoTAAAAAAIAwABAA0ADgAAXAB8AAAEhET4IMzIeAjMyNjURNCYFERQWMxEiBgMA/kAFHg8cEhsTFhQIGlRHQQoZJyX9pSYaGyUDgP0CByYUJBQdEBEHUGBQJhoCwBslQP1AGiYDQCUAAAAEAIAAgAOAA0AAFQAfACsAPwAAASM1NCYjISIGHQEjIgYdASEzITU0JiMhNTQ2OwEyFhUDMjY0JisBIgYUFjsBFAYrASImPQEhFRQWMyEyNj0BIQNAgCUb/wAbJYAbJQFAgAFAJdv/ABMNwA0TYA0TEw1ADRMTDaAlG4AbJf8AJRsCgBsl/wACgIAbJSUbgCUbgIAbJWANExMN/mATGhMTGhMbJSUbQMAbJSUbwAAAAA0AQAAAA8ADwAAHAA8AFwA3AEcATwBXAF8AZwBvAHcAfwCHAAAAIgYUFjI2NCYiBhQWMjY0NiIGFBYyNjQTIxUUBiImPQEhFRQGIiY9ASMiBhURFBYzITI2NRE0JgMUBiMhIiY1ETQ2MyEyFhUGIgYUFjI2NAYiBhQWMjY0EBQGIiY0NjIqAQYUFjI2NCQyNjQmIgYUBDI2NCYiBhQSIgYUFjI2NCYiBhQWMjY0Ats2JSU2JeU2JSU2JZs2JSU2JYCAJTYl/wAlNiWAGyUlGwMAGyUlGyUb/YAbJSUbAoAbJaU2JSU2JeU2JSU2JSU2JSU2wDYlJTYlASU2JSU2Jf6lNiUlNiVbNiUlNiUlNiUlNiUBACU2JSU25SU2JSU25SU2JSU2ASVAGyUlG0BAGyUlG0AlG/0AGyUlGwMAGyX9ABslJRsCABslJRvAJTYlJTabJTYlJTYBgDYlJTYlJTYlJTblJTYlJTYlJTYlJTb9myU2JSU25SU2JSU2AAAAAAQAgADAA4ADQAAVAB0AJQAtAAAlISImNRE0NjsBPgEyFhczMhYVERQGACIGFBYyNjQSIgYUFjI2NCQiJjQ2MhYUA0D9gBslJRtiInaMdiJiGyUl/vWgcHCgcG0aExMaE/7pUjo6UjrAJRsBgBslOkZGOiUb/oAbJQIAcKBwcKD+8BMaExMacDpSOjpSAAAAAAEAQAEAA8ADAAATAAABBTU0JiMhIgYVERQWMyEyNj0BBQPA/sAlG/5AGyUlGwHAGyUBQALeuZsbJSUb/oAbJSUbm7kAAQC/AHADEAPAACgAAAAGFiYGJgY2JyY0NzYmFxY3JjURNDYzERQWMjY1ETMyFhURFAcWNzYGA3LEV71ISL1XYjExYldeJRwaJRsTGhNAGiYaHCVeVwGASL5YxMRYviQSJBIkvSwRBRMgAQAbJf6gDRMTDQFgJRv/ACATBREsvQADAEAAQAPAA8AADwAbACIAAAAiDgIUHgIyPgI0LgECIi4BND4BMh4BFAYBIxE7ATUjAlu2pnhHR3imtqZ4R0d4or6hXV2hvqFdXf8AQEDAwAPAR3imtqZ4R0d4prameP0qXaG+oV1dob6hAcD/AEAAAQBAAMADwANAABoAAAE2NTQmIyIGByYjIgYdAQ4BFRQWMyEyNjU0JgN0DINdOGAfMDlPcDlIcFACAFBwKAIZIiVdgzMsH3BQCxNkPlBwcFAuUAAAAwDAAMADgAMAABMAIwAzAAABNjURNCYjISIHPgEzITIWFREUBicVFAYjISImPQE0NjMhMhYFFRQWMyEyNj0BNCYjISIGAzULSzX+wBwZED8mAUA1SylXSzX+wDVLSzUBQDVL/gAlGwFAGyUlG/7AGyUBCxkcAQA1SwsiKUs1/wAmP+XANUtLNcA1S0u1QBslJRtAGyUlAAADAMAAgAOAA0AAAwAHAAsAADcRMxEzETMRMxEzEcDAQMBAwIACwP1AAsD9QALA/UAAAAAAAQCAAIADgANAABoAAAAiDgEVFBYXFg4DIz4ENxYzMj4BNCYCaNCxZ01EAw8YGxEBBxlFOj8QKihosWdnA0BPh09FdykcOSsjEwIGGBorFwdPh5+HAAAAAAIAgACAA4ADQAAaAC4AAAAiDgEVFBYXFg4DIz4ENxYzMj4BNCYBIicOAQ8BPgInLgE1NDYgFhQGAmjQsWdNRAMPGBsRAQcZRTo/ECooaLFnZ/7qKUMVMg8OBAoOBDlMuQEHubkDQE+HT0V3KRw5KyMTAgYYGisXB0+Hn4f+PwseLwkJBRRBIyJrNmKKisSKAAIAQACAA8ADQAAaADIAAAAiDgEVFBYXFg4DIz4ENxYzMj4BNCYTPgE1NCYnFhUUBgcWMzI3HgEfAS8DAdeuk1ZAOQIMFBYPAQYVOTE0DiMhV5NWVuA3P21XH8iTWG4hIhVhJicIEhUPA0BBcUI5ZCIXMCQdEAIFFBYkEwZCcIVx/hUiYjhKeRs3PHKnCzcGHjMLCggVISgAAwBAAIADwANAABoALgBGAAAAIg4BFRQWFxYOAyM+BDcWMzI+ATQmAyInDgEPAT4CJy4BNTQ2MhYUBgU+ATU0JicWFRQGBxYzMjceAR8BLwMB166TVkA5AgwUFg8BBhU5MTQOIyFXk1ZW6houES4PDwQKDwMuQZLQkpIBYjc/bVcfyJNYbiEiFWEmJwgSFQ8DQEFxQjlkIhcwJB0QAgUUFiQTBkJwhXH+jQcYJQYHBA4zHBxaK09wcJ5weCJiOEp5Gzc8cqcLNwYeMwsKCBUhKAAAAAAEAIABAAOAAwAACQATAB8AKwAAASEiBh0BITU0JgEUFjMhMjY9ASEFMzIWFAYrASImNDYjMzIWFAYrASImNDYDQP2AGyUDACX9JSUbAoAbJf0AASDADRMTDcANExOzQA0TEw1ADRMTAwAlG0BAGyX+QBomJhrAQBMaExMaExMaExMaEwACAEAAQAPAA8AAFQAgAAAAIgYVESERNCYiBhURFBYzITI2NRE0BRMjETQmIgYVESMDmzYl/YAlNiUlGwMAGyX+QN6eJTYlngIAJRv/AAEAGyUlG/7AGyUlGwFAG5sBQAEAGyUlG/8AAAYBgACAAsADQAADAAcACwAPABMAFwAAATUzFTM1MxUBNTMVMzUzFQE1MxUzNTMVAYCAQID+wIBAgP7AgECAAoDAwMDA/wDAwMDA/wDAwMDAAAAAAAgBgACAAsADQAADAAcACwAPABMAFwAbAB8AAAE1MxUzNTMVBTUzFTM1MxUFNTMVMzUzFQU1MxUzNTMVAYCAQID+wIBAgP7AgECA/sCAQIACwICAgIDAgICAgMCAgICAwICAgIAAAAAAAgCAAQADgAMAAAYAHgAACQE2MyEyFwkBFhURFAcnBxcGIyEiJzcnByY1ETQ3AQIA/q8JCAKACAn+3AFRAgLILcgJCP2ACAnILcgCAgF+Aa0BUQIC/oIBUQkI/oAICcgtyAICyC3ICQgBgAgJ/oIAAAIAgABAA4ADgwAHACAAAAkBMhcJATYzARcBFhURFAcnBxcGIyEiJzcnByY1ETQ3AQIAAUMFCf6v/q8JBQFDAgF8AgLILcgJCP2ACAnILcgCAgF8A4P+vQL+rwFRAv5XAgF8CQj+gAgJyC3IAgLILcgJCAGACAn+hAAAAAADACYAwAPaA0AABwARABkAAAAiBhQWMjY0EiAEBxYEICQ3JgAiJjQ2MhYUAihQODhQOD/+wv7+OTkBAgE+AQI5Of6voHBwoHACYDhQODhQARixj4+xsY+P/rFwoHBwoAACAMAAgANAA4AAEAAfAAAlISImNRE0NjMhMh4BFREUBgM1ISIGFREUFjMhMjY1EQMA/gAbJSUbAYAfXEUlm/7AGyUlGwGAGyWAJRsCgBslRlwe/gAbJQJAgCUb/gAbJSUbAcAAAgDAAEADgAOAABsAOwAAJSMVFAYiJj0BIyImNDY7ATU0NjIWHQEzMhYUBicRIzUhIgYVERQWOwEeATMhIiY1ETQ2MyEyHgEVETQmA2BgExoTYA0TEw1gExoTYA0TE22A/sAbJSUbxgoxH/6gGyUlGwGAH1xFJMBgDRMTDWATGhNgDRMTDWATGhP6AQaAJRv+ABslHCQlGwKAGyVFXB/+oB8xAAAQAMAAQANAA4AADwAXAB8AJwAvADcAPwBPAF8AbwB3AH8AhwCPAJcAnwAAASEiBhURFBYzITI2NRE0JgAiJjQ2MhYUJiImNDYyFhQmIiY0NjIWFCYiJjQ2MhYUJiImNDYyFhQmIiY0NjIWFAEUBisBIiY9ATQ2OwEyFhU1FAYrASImPQE0NjsBMhYVNRQGKwEiJj0BNDY7ATIWFRIiJjQ2MhYUJiImNDYyFhQmIiY0NjIWFCYiJjQ2MhYUJiImNDYyFhQmIiY0NjIWFAMA/gAbJSUbAgAbJSX+EhoTExoTExoTExoTExoTExoTExoTExoTExoTExoTExoTExoTAUAlG4AbJSUbgBslJRuAGyUlG4AbJSUbgBslJRuAGyVtGhMTGhMTGhMTGhMTGhMTGhMTGhMTGhMTGhMTGhMTGhMTGhMDgCUb/UAbJSUbAsAbJf0AExoTExptExoTExptExoTExptExoTExptExoTExptExoTExr9rRslJRtAGyUlG8AbJSUbQBslJRvAGyUlG0AbJSUb/YATGhMTGm0TGhMTGm0TGhMTGm0TGhMTGm0TGhMTGm0TGhMTGgAAAAACAJ4AgAOAA2IAFwAnAAABIyIGKwEiBhURFBY7ATI2OwEyNjURNCYkIgYVFBcRFBYyNjURNjU0A0CCH4IffhslJRt8H4UggBslJf2gNiciExoTIgMAQCUb/wAbJUAlGwEAGyViJxsnE/26DRMTDQJGEycbAAMAgACAA4ADQAAbADQAPwAAASMVFAYiJj0BIyImNDY7ATU0NjIWHQEzMhYUBicVIyIGFRQXISImNRE0NjMhMhYdASYjIgYBNTQ2OwEyFhUhIgNgYBMaE2ANExMNYBMaE2ANExPtICg4Bv66GyUlGwIAGyUQECg4/gAlG8AbJf8AIgEAYA0TEw1gExoTYA0TEw1gExoToCA4KBAQJRsBQBslJRuGBjgBJxEbJSUbAAAAAgDAAPwDQAM7AA8AGgAAJSEiJjURNDYzITIWFREUBgE1NDY7ATIWFSEiAwD+ABslJRsCABslJf2lJRvAGyX/ACL8JRoBQBsmJhv+wBolAe4RGyUlGwAAAAIAQAD8A4oDQAAPAC4AAAEHDgEjISImPwE+ATMhMhYnISsBNTQmKwEiBhURFBcHJjURPgE7AR4BFSEyFhQGA4S7EzUZ/lUiNhjZIjMYAZ8cF/X/ACBAJRtAGyUPQA8CRDpAOkYBIA0TEwIAxBwkJhrEHyEmZkAaJiYa/wAXEkASFwFAO0UCRDoTGhMAAwCAAPwDlAM8AA4AIgAtAAABHQIUBiImPQMjNxcFOwEVFBYzFAYjISImNRE0NjMhByU1NDY7ATIWFSEiAwATGhOUsrb+bEY6SzUlG/4AGyUlGwGJSP5/JRvAGyX/ACICPDRMIA4SEg4gTDTU1DRMNkobJSUbAUAaJlyKEhomJhoAAAAAAgBCAAID/gO+AFcAXwAAAR4BDwEOAS8BBgcXFgYPAQYmLwEGDwEOAS8BLgE/ASYnBwYmLwEmNj8BJi8BLgE/AT4BHwE2NycmNj8BNhYfATY/AT4BHwEeAQ8BFhc3NhYfARYGDwEWFy4BDgEeAT4BA8oaHwULBCwaTREZMRAKFTUWNA8xKCkOBCwaPxoeBA4mIUYVNQ8kEAoVRw4ESxofBQsELBpMEhszDwkWNBY0EDMmKA4ELBo/Gh4EDiQgSRY0DyUPCRZIDQXunYIcXJyDGwH2BCwaPxoeBA4lH0cWNA8lDwkWRg4ETBofBQsELBpMEhsxDwkWNBY0DzImKA4ELBo/Gh4EDiYhSBY0DyUPCRZJDQRMGh8FCwQsGkwSGTMPCRY0FjQPMygpjRxbnYIcW50AAAACALcAtwNJA0kADwAXAAAABhYmBiYGNiY2JhY2FjYGJiIGFBYyNjQDwO5r5ldX5mvu7mvmV1fma51qS0tqSwIAV+Zr7u5r5ldX5mvu7mvmKUtqS0tqAAAABgA+ADAD0wPiAA8AFwAnAC8ARQBNAAAABhYmBiYGNiY2JhY2FjYGJiIGFBYyNjQmBhYmBiYGNiY2JhY2FjYGJiIGFBYyNjQCNhY2BhcWFAcGFiYGJgY2JyY0NzYmFhQWMjY0JiIEGIo+hTMyhj6Kij6GMjOFPls+Kys+K6Z1NXErK3E0dHQ0cSsrcTVNNCUlNCXkR0i9V2IxMWJYvkhHvlhiMTFiWJw+Vz4+VwJnM4U+ioo+hTMyhT2Kij2FGCw9LCw9uytxNXV1NXErK3E0dHQ0cRQlNCUlNP6TxMRXvSQSJBEkvljExFi+JBEkEiS92Vc+Plc+AAADAIAAQAPAA4AAGQBBAE0AAAEjFRQGIyEiJjURNDYzITIWHQEzMhYVERQGJxE1NCYjISIGFREUFjMRNDYyFhURMxE0NjIWFREzETQ2MhYVETI2NRM0JisCETsBMjY1A4CAJRv+ABslJRsCABslgBslJdslG/6AGyUlGxMaE0AlNiVAExoTGyXAEw0CXl4CDRMBQMAbJSUbAsAbJSUbQCUb/sAbJUABQEAbJSUb/gAbJQHgDRMTDf4gAcAbJSUb/kAB4A0TEw3+ICUbAaANE/7AEw0AAAEAwACAA0ADgAAPAAABNSEVAREjIgYVITQmKwERA0D9gAEAgBslAgAlG4ADdAwM/wD+TCUbGyUBtAAAAAUAwACAA0ADgAASAB4AJgAyADoAAAEjFAYrASImNREhFTMyFh0BFAYnNCYrAR0CMzI2NQIiJjQ2MhYUBiImPQE0NjIWHQEUBiImNDYyFhQDAEBwUIBQcAIAQBslJRsTDSAgDROTGhMTGhOTGhMTGhOTGhMTGhMBQFBwcFABQEAlG4AbJaANEyBAIBMNAaATGhMTGpMTDYANExMNgA0TExoTExoAAQEAAIADAAOAABMAAAEyNjURIREUFjMVIyIGFSE0JisBAkBQcP4AcFCAGyUCACUbgAGAcFABQP7AUHDAJRsbJQAAAAAJAMAAgAOAA0AAAwAHAAsADwATABcAGwAfACMAAAEzFSMRMxUjATMVIyUzFSMlMxUjBTMVIwUzFSMRMxUjBTMVIwLAwMDAwP8AwMABAMDA/gDAwAEAwMD/AMDAwMABAMDAAUDAAcDAAcDAwMDAwEDAQMABwMBAwAAEAMAAgAOAA0AAAwAHAAsADwAAASERIREhESEBIREhFSERIQJAAUD+wAFA/sD+gAFA/sABQP7AAcD+wALA/sABQP7AQP7AAAABAAMBgAQAAkAACwAAASEiBhQWMyEyNjQmA6H8wig4OCgDPic4OAJAOU84OE85AAABAcAAAAKABAAACwAAADIWFREUBiImNRE0AfhQODhQOAQAOCj8wCg4OCgDQCgAAAABACAAQAPeA6MAKwAAASc1NCYiBh0BJyYiBwEGFjsBMhYdARQWOwERNDYyFhURMzI2PQE0NjsBMjYD0JAlNSaSEjkT/l4UDRw/GSQnG78mNSW9HCcjGUAcDAHvkOENExMNYZISEv5eFB8jGf0cJwEAGyUlG/8AJxz9GSMeAAAAAAIAQABAA8ADwAAVADUAAAEDLgEjISIGBwMGHQEUFjMhMjY9ATQmBisBIgYdARQGKwEiJj0BNCYrASImNxM+ATMhMhYXEwOyXQg7I/4iIzsIXQ41JQLMJTVBEA/ADBEUD8APFBEMwA8QA2ADGA8B5A8YA2AByQGlIy8vI/5bPT+zJTU1JbM/BhURDEAPFBQPQAwRFQ4Brw4UFA7+UQAAAAADAKYAegPAA8AAGQAdACUAAAEiJwEOASc1Njc+ATc2Fjc2NyY1NDYyFhQGJQEXARIiBhQWMjY0AsAiIf7XI2UmMS8OVhAGKAYUExaW1ZaW/r7+wC4BQPJQODhQOAG/Cf7XIwQhvxwwDZcRBTcGFBcxN2qWltWWl/7ALgFAARg4UDg4UAACAEAAQAPAA8AAMwA+AAABISIGHQMUFjI2PQM0NjMhMhYVERQGIyEiJj0DNCYiBh0DFBYzITI2NRE0JgEtARUhIgYUFjMhA4D+ABslExoTJRsBgBslJRv+gBslExoTJRsCABslJf4lAT7+wv7AGyUlGwFAA8AlG2AgIA0TEw0gICAbJSUb/YAbJSUbICAgDRMTDSAgYBslJRsDABsl/Ym4uHklNiUAAAACAAAAQAP+A8AAMwA+AAAAIgYdAxQGIyEiJjURNDYzITIWHQMUFjI2PQM0JiMhIgYVERQWMyEyNj0DNC0BFSEiBhQWMyEVAm0aEyUb/oAbJSUbAYAbJRMaEyUb/gAbJSUbAgAbJQF+/sL+wBslJRsBQAFAEw0gICAbJSUbAoAaJiYaICAgDRMTDSAgYBomJhr9ABslJRtgICAN1Lh5JjUldwAAAAIAwABAA0ADwAASABoAACUuBDU0PgEyHgEVFA4DEiIGFBYyNjQCAA0rb1RFVpOuk1ZCXl5CUKBxcaBxQBA4nYqgMVeTVlaTVzGbmIdWAwJxoHFxoAAAAAABAIAAwAOAA0AAGQAAAQchIgYdARQWOwEVFBYyNj0BMxcyNjURNCYDQPn+eRslJRtAJTYlx/kbJSYDQMAlG4AbJYAbJSUbgMAlGwIAGiYAAAEAgACAA0ADgAAbAAABHQERJiMiBhQWMjY1ESURJiMiBhQWMjY1ET0BAUAeIjVLS2pLAYAeIjVLS2pLA0BAQP6vEUtqS0s1Acgw/rcRS2pLSzUBwEBAAAACAMEBAQNAAr4ANABEAAABIycGJyYVBhYGBwYmNzUrAS4BNjc2FjsBNTc+ARYXFh0BPgI7Ax8BHgEHHQEPAg4BAyMHDgEXHgE3Mzc+AScuAQLASEkGGw4BAgIEDDABcnEPEQgPAjwDqwECGx0EAQ4jGRYgHyEeHyIkAwIGCxA8IUVFIB8RCScWPj4gHxEIHwFAAQINBAgGGRMIFA8XoAEaHQUEAVRSEA0LDgQaHQgIAQQLEkYnFxoXGBQdIQEAAQM/HBIRAgEDPxwPEgACAUAAwAMAA0AAIQAtAAABIxUUBiImPQEjIiY0NjsBJj0BNDY7ATIWHQEUBzMyFhQGAzQmIgYdARQWMjY1AuCgExoToA0TEw0xEUs1QDVLETENExOtJTYlJTYlAcDgDRMTDeATGhMeIoA1S0s1gCIeExoTAQAbJSUbgBomJhoAAAIAQAAAA8AEAAAdACkAAAEVHgEVFA4BIi4BNTQ2NzUOARUUHgIyPgI1NCYAMjY1ETQmIgYVERQCwEhVXaG+oV1VSHONR3imtqZ4R43+sjYlJTYlA1VyL5paX6FdXaFfWpovcjfahFumeEdHeKZbhNr+oiUbAcAbJSUb/kAbAAAABgADAEEEAAN/AAsAEwAfACcAMwA7AAABISImNDYzITIWFAYnIRUhMjY0JichIiY0NjMhMhYUBichFSEyNjQmASEyFhQGIyEiJjQ2BSEyNjQmIyEDofzCKDg4KAM+Jzg4Kv7hAR8NExMK/MIoODgoAz4nODgq/iEB3w0TE/y4Az4nODgn/MIoODgBBQJeDRMTDf2iAYA4UDg4UDiAQBMaE784UDg4UDiAQBMaE/3COU84OE85gBMaEwAAAAACAIAAgAOAA4AAEwAfAAAlNTQmIgYdASETMxUUFjI2PQEzEwE0JiIGHQEUFjI2NQJAJTYl/sDAgCU2JYDA/sAlNiUlNiWAwBslJRvAAwBAGyUlG0D9AAIAGyUlG4AbJSUbAAAAAwDQANADMwMzAAQADQAZAAATFTM0JicVMhYVMzQuAScVMh4CFTM0LgLQekczZY97Y6hkY7WDTnpho+MBSnozR/V7j2VkqGP0ek6DtWN846NhAAAAAwCAAIADgAOAABsAKwA8AAAlISImNRE0NjsBERQWOwIyNj0CMzIWFREUBgM0JiMhIgYdARQWMyEyNjUBFSMiJj0BNDY7ATIWFSMiBgNA/YAbJSUbQCUbwEAbJUBQcCVbJRv+gBslJRsBgBsl/sBAGyUlG4AbJUAbJYAlGwKAGyX/ABslJRuAgHFP/gAbJQEAGyUlG0AbJSUbAcCAJRuAGyUlGyUAAAAABQBAAIADwANAAA8AHwAvADsASwAAJSMiJj0BNDY7ATIWHQEUBiEjIiY9ATQ2OwEyFh0BFAYhIyImPQE0NjsBMhYdARQGAyEiJjQ2MyEyFhQGJSMiJj0BNDY7ATIWHQEUBgEAgBslJRuAGyUlASWAGyUlG4AbJSUBJYAbJSUbgBslJTv9QA0TEw0CwA0TE/7TgBslJRuAGyUlgCUbgBslJRuAGyUlG4AbJSUbgBslJRuAGyUlG4AbJQFAExoTExoTgCUbgBslJRuAGyUAAwBwAHADUgNSABEAIQApAAAJAQYiLwEmNDcBPgIeAg4BLwEmIgcBBhQfARYyNwE2NDYmIgYUFjI2AxD+lSVqJlomJgFqEltjWyQGEiGaWxI2Ev7wExNbEjYSARAThyU1JiY1JQIA/pYmJlomaiYBahIhEgYkW2NbG1sTE/7wEzUSWxMTARASNuIlJTUmJgAAAwBAAUADwALAAA8AHwAnAAABISIGHQEUFjMhMj4BNC4BAxQGIyEiJj0BNDYzITIWFRYiJjQ2MhYUAsD+ADVLSzUCACN7YmJ7YyUb/oAbJSUbAYAbJds2JSU2JQLASzWANUtCXUJdQv8AGyUlG4AbJSUbgCU2JSU2AAAAAAEBAABAAwADwAAGAAABAzMRASETAYCAwAFA/wCAA8D+QP5AAoABAAACAEAAgAPAA0AAEgAiAAABIwcnIyImPQE0NjMhMhYdARQGAzQmIyEiBh0BFBYzITI2NQMAQMDAQFBwcFACAFBwcBAlG/4AGyUlGwIAGyUBQMDAcFCAUHBwUIBQcAFAGyUlG4AbJSUbAAYAgABAA4ADwAAVACUALQAxADUAPQAAASEiJjQ2OwE1NDY7ATIWHQEzMhYUBgUhMhYVERQGIyEiJjURNDYBMjY1ETQmIwMzESMDMxEjAxQWMxEiBhUDQP2AGyUlG8AlG4AbJcAbJSX9pQIAGyUlG/4AGyUlAdsbJSUbgEBAwEBAgCUbGyUCwCU2JUAbJSUbQCU2JUAlG/5AGyUlGwHAGyX+ACUbAUAbJf5AAcD+QAHA/oAbJQHAJRsAAAAAAwCAAEADgAOAACUAMQA9AAABIzUhFSMiBh0BFBY7ARQWFxUjIgYVITQmKwE1PgE1MzI2PQE0JgUdASMiJj0BNDY7AQUUBisBPQIzMhYVA0BA/gBAGyUlG0B6RkAbJQGAJRtARnpAGyUl/aUgDRMTDSACQBMNICANEwNAQEAlG8AbJUHAKlUlGxslVSrAQSUbwBslYIAgEw2ADROgDRMggCATDQAEAMAAgAOAA0AAAwAHAAsADwAAATUzFRcRIREBNTMVBREhEQEAwIABQP8AwP2AAUACQMDAQAFA/sD+wMDAQAFA/sAAAAIAQABAA8ADwAAVACAAAAAiBhURIRE0JiIGFREUFjMhMjY1ETQFFBYyNjURMwsBMwObNiX9gCU2JSUbAwAbJf4AJTYlnt7engIAJRv/AAEAGyUlG/7AGyUlGwFAG1sbJSUbAQABQP7AAAAAAAIAwAEAA0ADAAAPAB8AAAEhIiY1ETQ2MyEyFhURFAYTNCYjISIGHQEUFjMhMjY1AsD+gDVLSzUBgDVLSwslG/6AGyUlGwGAGyUBAEs1AQA1S0s1/wA1SwEAGyUlG4AbJSUbAAADAMAAwAOAAwAADwAfADMAAAEhIgYdARQWMyEyNj0BNCYTFAYjISImPQE0NjMhMhYVASImNRE0Nw4BFREUFjMhMjY3BiMDAP7ANUtLNQFANUtLCyUb/sAbJSUbAUAbJf5ANUsLIilLNQFAJj8QGRwDAEs1wDVLSzXANUv+wBslJRtAGyUlG/8ASzUBABwZED8m/wA1SykiCwAAAAACAIAAXQOgA6MAFgAeAAAJATY1NCYjIgcfAQcnHgEzMjcBFjI2NAYiJjQ2MhYUA3r+2AmXaltHvEV8vSNzRCIhASgmaktsNSUlNSYBNwEpISJqljoft5YfOEIJ/tclS2pvJjUlJTUAAAIAMAC6A6IDSAAYADEAAAAiBh0BDgQVPgMXFRQWNyU2NCclBSIGFBYyNjU0JwYHFhUUBiImNTQ2NzY3IwJqJBYwVWBELRZPY1wyLiEBAiEh/v7+kV2Dg7qDAyQfA1yCXDIpHS4EA0geGmgJGzNCZTwrPBwKAWonGRezFkAXsr+DuoODXRASAQUODkFcXEEuTRMtJQABAIAAkAOAA5AAGwAAACIGHQEjIgYUFjsBFRQWMjY9ATMyNjQmKwE1NAIuXEKgLkJCLqBCXEKgLkJCLqADkEIuoEJcQqAuQkIuoEJcQqAuAAIAoACwA2ADcAAPACwAAAEhIgYVERQWMyEyNjURNCYDIxUUBiImPQEjIiY1NDY7ATU0NjIWHQEzMhYUBgMI/fAkNDQkAhAkNDRsgCU2JYAbJSUbgCY0JoAbJSYDcDQk/fAkNDQkAhAkNP5gex4nJx57JhobJYUXJCQXhSU1JgAABwCQALADcANQABEAIgAzADcAQQBJAFEAAAEiBh0BHgEdASE1NDY3NTQmIwQiBhQWMzI3FRQWMjY1ETUmJCIGBxURFBYyNj0BFjMyNjQFFSE1BRUUFjMhMjY9AQQiBhQWMjY0JCIGFBYyNjQBYCEvHSMBYCMdLyH+YUIvLyEICBMaEwECEkIuARMaEwgIIS/94AFg/qARDAEmDBH+bRoTExoTAc0aExMaEwNQLyFbDjYhMDAhNg5bIS/AL0IvAsINExMNARACIC4uIAL+8A0TEw3CAi9CcVBQcFANExMNUJATGhMTGhMTGhMTGgACAHABIAOgAuAAKwA9AAABIgYdARQGKwEiBh0BFBY7ATIWHQEUFjsBMj4BJisBIiY9ATQ2MyEyPgEmIzMiBgcDBhYzITI2PQM0JiMBIBQcHBQgFBwcFCAUHBwUbBQrFgwUURQcHBQBDxQrFg0TrBQsC/ILDBQBOBQcHBQC4BwUIBQcHBRgFBwcFCAUHBchGBwUwBQcGCAYGBD+kBAYHBRgoGAUHAAAAAADAFAAwAOwAzsAFgAgACoAAAEiBxURHQE2MhczNjIXNRE1JiMiByMmBzIXESYjIgcRNiEyFxEmIyIHETYBG2phX9heNl7YX2FqZF1IXWReVFZcQD8+AgtBPj9AXFZUAzstVv5eIzM3Nzc3VgGiVi0oKEwp/lsiEQGpFBT+VxEiAaUpAAADAFAAsAOwA0gAHAAkACwAAAEiBg8BDgEHIyIGFREUFjMhMjY1ETQmKwEuAScmBjIWFAYiJjQ2IgYUFjI2NAIAIjoLDCM2CXsoODgoAqAoODgoewk2IyadoHBwoHDuXEJCXEIDSAkFBBE7Hjgo/qQoODgoAVwoOB47ERKocKBwcKAgQlxCQlwABQBQAJQDsAOQAAcAFgApADMAPQAAEiIGFBYyNjQXIgYVFxQWMyEyPwE0JiMFITIeAwYHDgErASImPQE0NgMOARQWMjY0JiMhDgEUFjI2NCYjrjcnJzcnIRsnIScbAW5PNqYnG/4NASsLEBQMCAIGG0Qe6RsnJ1siLzBFMTEiAfAiLzFFMDAjA5AnNycnN38nG+kbJ0LpGydkAQQJDhcPMTMnHCEcJv60ATBEMTFFMAEwRDExRTAAAAMAYABgA6ADoAAHABMAKgAAACAGEBYgNhAkMh4BFA4BIi4BNDYWIgYdAhQWOwMyNjQmKwEiJj0BNAKs/qj09AFY9P4HsphYWJiymFhY9SgcHBQDYE0UHBwUUBQcA6D0/qj09AFYnViYsphYWJiymAEcFHBgFBwcKBwcFHAUAAAAAwEZAIAC5wOAAA0AGwArAAABIgYfAR4BMjY/ATYmIwciBh8BHgEyNj8BNiYjByIGFxMeATsBMjY3EzYmIwJwFBMGAgYXFBcGAgYTFHAUEwYCBhcUFwYCBhMU4BQXBE4EIRTAFCEETgQXFAOAGxMEExsbEwQTG4AbEwQTGxsTBBMbgBwT/l4THBwTAaITHAAAAQDzAJcDDQOgABMAAAAiBh0BIyIGFxMWMjcTNiYrATU0Ai5cQmAuHhrEGUkaxBkdLmADoEIu8Dcm/tomJgEmJjfwLgADAH0AfQN2A20ACwAbACgAAAAmBhYfAR4BNiYvAQYiBwEGFB8BFjI3ATY0LwEBBg8BBhY/AT4BLwEmAw80JAESQRM0JAESQY81Ev61EhJBEzUSAUsTE0H+BhYGEwYeGmIaChJZDwNsASQ1EkETASU0EkFpE/62EzUTQBMTAUoTNRNA/lQBH2IaHgYTBSITWQ8AAAAAAwCXAGIDaQOhABYAKAA/AAABIgcFDgEVERQWPgE1ETQ2NyU+ATU0JhcGBwUOARURFBY3JT4BNRE0JgcyFx4BNhYOARYGJg4BJjYuAT4CNzYCihET/o0mNhwpHDYnAREmNh+BDAv+jSY2NiYBcyY2J+cMCAo+Qgk2FxQXNkw1FxQYNQlCPgoMA6EFaApIKP5SJzELQScBOSdIC0wLMhgSFY0BA2gKSCj+eScqC2gLRygBhyEprBccFxgZOlA4GRQbOglGQBMfGEIjKQAAAQBiAGgDngOEACIAAAAiBg8BIyIGBwYfAQcGHgEyPwEXFjI3Ni8BNzYnLgErAScmAg4cFQVP/w4WBAkYz08ECBYbC8/PCxsLGAlPzxgJBBYO/08FA4QQDfMQDR0SlvMNGhAIl5cICBId85YSHQ0Q8w0AAAADADQAvAPIAzwAEQAdACcAABMiBwYWFwEeATYmJwMuAS8BJgQiDgIeAj8BPgEBDgEeAT4BJicmw0MnJQElAY4mSBwHEm8SYjIYLwKFcVNQHAEdUSmxKgb90RMWAhgjGgIODQM8ExNPJf5yJSgSUzIBJjJeEQgPgBszK1dPCSCKIUL+bwEiIhADFSIODQAAAAABAJsBCQNJAx8AFwAAEyIGFREUFj8BFRQWNyU2NCclJgYdAScmvhATJxzNJxwBPxwc/sEcJ80RAx8ZFv5FIRUSiWUhFRLVEjQT1RIVIWWJCwAAAAACAHAAcAOQA5AAVwBfAAABIgYdAQYHJyYiDwEGFB8BBgcjIgYdARQWOwEWFwcGFB8BFjI/ARYXFRQWOwEyNj0BNjcXFjI/ATY0LwE2NzMyNj0BNCYrASYnNzY0LwEmIg8BJic1NCYjAjIWFAYiJjQB8BQcMywtDigOFg4OLBwLPxQcHBQ/CxwsDg4WDigOLSwzHBQgFBwzLC0OKA4WDg4sHAs/FBwcFD8LHCwODhYOKA4tLDMcFElyUFByUAOQHBQ/CxwsDg4WDigOLSwzHBQgFBwzLC0OKA4WDg4sHAs/FBwcFD8LHCwODhYOKA4tLDMcFCAUHDMsLQ4oDhYODiwcCz8UHP75UHJQUHIAAwBgAGADoAOgAAcALwBLAAAAIAYQFiA2ECUeARUUBgc+ATc+ASYnLgInJgYmJy4DNDc+Azc+ATIWMzI2BRYXHgMXFg4BFhceAhcWBhcGIyIuATU0NgKs/qj09AFY9P7iWW6heBJNKRYTAQIGKkEZEyMjBwUYFhQJCyMbHAcIGRQfBAwG/o1RRBoiCgwCAwMHBgsGFAwEAx0HEhFZmFgzA6D0/qj09AFYgyalZHy4EjdnDBElHREKGikVBQgBCgUSDxUSCwwJAhgZGRcGIjSSFAcRChEDAxUUJRQJCQ4REJoWAViYWUR5AAIAYABgA6ADoAAHAEgAAAAgBhAWIDYQJTIXHgEGIyImIgYHDgMHBhQeAhceATYXHgIXHgEGBw4BByY+AicuAicuAT4BJy4DJyYnJicmNjc2Aqz+qPT0AVj0/jdQQxMQCAsEHxQZCAccGyMLCRQWGAUHIyMTGUEqBgIBExYsUQ8MAQwLAgQMFAYLBgcDAwIMCiIaRlgCAhBbSxwDoPT+qPT0AVi2IAgjGwYXGRkYAgkMCxIVDxIFCgEIBRUpGgoRHSURDXI5BTo9Qw0RDgkJFCUUFQMDEQoRBxSiBAIfOQgCAAAAAAEATgCAA64DcgAxAAAAIgcBBhQfARYyPwERFBY7ATI2PQI0NjsBMhYdAhQWOwEyNjURFxYyPwE2NC8DAgoYCf5uCQkpCRgJSyIZHRkiIxh2GCMiGR0ZIksJGAkpCQn2cioDcgj+bQkYCSkJCUr+7RgjIxhYWRgjIxhZWBgjIxgBE0oJCSkJGAn3cioAAgGQAGACcAOgAAcAEwAAACIGFBYyNjQGIgYVERQWMjY1ETQCLlxCQlxCQlxCQlxCA6BCXEJCXN5CLv7ALkJCLgFALgABAMAAsANAA1AAIQAAACIGFRQXByYiBhQWMjcXBhUUFjI2NCYiByc2NCc3FjI2NAL+XEIC4yFcQkJcIeMCQlxCQlwh4wIC4yFcQgNQQi4LDHohQlxCIXoMCy5CQlxCIXoMFgx6IUJcAAMAgAGgA4ACYAAHAA8AFwAAACIGFBYyNjQ2IgYUFjI2NDYiBhQWMjY0AQhQODhQOOhQODhQOOhQODhQOAJgOFA4OFA4OFA4OFA4OFA4OFAAAwGgAIACYAOAAAcADwAXAAAAIgYUFjI2NAYiBhQWMjY0BiIGFBYyNjQCKFA4OFA4OFA4OFA4OFA4OFA4A4A4UDg4UOg4UDg4UOg4UDg4UAABAPQAdwMDA4kAGwAAASIHBhYXBRYUBwUOAR4BNyU2PwE2NC8BJiclJgE1HhQQBBQBHRUV/uMUBSI1FQEuH0MBFBQBRB7+0hIDiRcUNRHvETAR7xE1KQQR/Ro5AREwEQE5Gv0PAAAAAAIAwACwA0ADUAAPAB8AAAEiBhURFBY7ATI2NRE0JiMhIgYVERQWOwEyNjURNCYjATAuQkIuEC5CQi4BgC5CQi4QLkJCLgNQQi7+QC5CQi4BwC5CQi7+QC5CQi4BwC5CAAIBGgCIAuoDoAAHABUAAAAiBhQWMjY0BiIGDwEGHgEyPgEvASYCN2pLS2pLQIB8FxUXNHaqdjQXFRcDoEtpTExp8GJFQUWCLi6CRUFFAAAAAQDQAJMDCQNyAAwAAAAOARURFBY3ATY0JwEBFCoaNyYBtiYm/koDcgEiH/2gLh4aASQaSRkBJAABAMAAcANAA3AAHwAAASYGHQEOARUUFiA2NSMUBiImNTQ2NxUUFj8BNjQvASYCChMXeqa7AQq7YIO6g25SLyGkISGkFANwAR4bSgy2fIW7u4Vdg4NdVH4MRigZFm4WPhZuDQAAAQCUAMADkANAAB8AAAEiBgcjIgYfARYyPwE2JisBPgEzMhYUBiMVMj4BNC4BAlB8tgxKJxoWbhY+Fm4WGShFC35UXYODXVeUVVWUA0Cmei8hpCEhpCEvUm6DuoNgVpOuk1YAAAEAvwD5A3ADDwAYAAABIg8BNTQmIgcFBhQXBRY2PQEXFjY1ETQmA00PEdAUHhH+wBsbAUAbKNAcJxMDDwuMaBYZC9UTNBLVEhUhZ4sSFSEBuxYZAAIAUACBA48DwAAWAB4AAAAiDgEUHgEzMjcXFjI/ATY0LwE2NTQmBDIWFAYiJjQB566TVlaTV1RJ0RdCGAgYGNApVv7GoHBwoHADwFaTrpRVKdEXFwkXQxfRSVRXkypxn3BwnwABAMAAwANAA0AADwAAASIGFREUFjMhMjY1ETQmIwEwLkJCLgGgLkJCLgNAQi7+YC5CQi4BoC5CAAIAoABZA10DpAAWACgAAAEiBwUOARURFBY+ATURNDY3JT4BNTQmFwYHBQ4BFREUFjclPgE1ETQmAoIRE/6eJjYcJxs3JgEDJzYfewsM/p4mNjYmAWImNygDpAVjC0gn/mQnMQtAKAEpJ0gLSAsxGBEUiQEDYwtHKP5lKCkKZApIJwGcISkAAAACAMoAYANEA4IADgAeAAABIgcFDgEeATclPgEnLgEBIgYXEx4BMyEyNjcTNiYjArsKCv5cICEROiABoyAhCAcs/o8hKQZFBCYZARMZJgVEBikgA4ICcQg6QCEJcAk5IBsg/soyIP6eGCAgGAFiIDIAAQCIAPwDqAMfABgAAAAiBwUGFBcFFjY9ATIeAhc0LgMnNTQCEh4R/sAbGwFAGyg6aW9YGDFMamM4Ax8M1RI0EtUTFSFyDyNGMkd1Tj4jDH0WAAAAAQCIAPwDqAMfABkAAAEiBh0BDgQVPgMzFRQWNyU2NCclJgIuEBM4Y2tMMRlYbmk7JxsBQBsb/sARAx8ZFn0MIz5OdUcyRiMPciEVE9USNBLVDAAAAwBQAHsDeAOpACIANwBKAAABIgcOAQ8BBgcOAQ8BDgEdARQWHwEeARcWHwEeAjY1ETQmBCIPAQYUFxYUBwYUHwEWMjc+ASYnBiIPAQYXFhQHBhQfARYyNzY0JwHpCQgXORIjKxsLPR8KHy0tHwofPQsbKyMSOS0gFQEeEgYuBgZGRgcHLgYSBkMvL0OQDAQgCwsWFgQEIAQMBCwsA6kECzgbN0MbCx8KBAo+IQIhPgoECh8LG0M3HDcWHyECwBofngYuBhIHRcZGBhIGLgYGQrOzQogEHwsKFj4WBAwFHwUFK3wrAAAAAAMATgCmA64DCQAKABQAGQAAACIGBxc+ARYXNyYEIgYHFzYyFzcmBiIHFzcCdvDgWFZe/PxeVlj+8JCGNVZIykhWNZtmI1ZWAwlbWFZdQ0NdVliZNzVWR0dWNb4kVlYAAAMA8ACQAzADcAAPAB8ALwAAASIGHQEUFjMhMjY9ATQmIwEiBh0BFBYzITI2PQE0JiMBIgYdARQWMyEyNj0BNCYjATAaJiYaAcAaJiYa/kAaJiYaAcAaJiYa/kAaJiYaAcAaJiYaA3AmGiAaJiYaIBom/uAmGiAaJiYaIBom/uAmGiAaJiYaIBomAAAABQEsAAAC1AOgAAMABwALAA8AFgAAARUzNQcVMzUHFTM1BxUzNQcVIxsBIzUBkODg4ODg4ODgZNTUZAOgEBAwICBAUFBwkJDAkP6QAXCQAAABAAAAAAJQBAAAFAAAASIOARUUHgIXLgI1NDYzMjY0JgIAi+yJUIi7Z3TEcv2zIS8vBACJ7ItnvYlSAQJ0xnSz/S9CLwAAAAABAAAAAAQABAAAHQAAACAOARUUHgIXLgI1NDYgFhUUDgEHPgM1NCYCi/7q7IlQiLtndMRy/QFm/XLEdGe7iFCJBACJ7ItnvYlSAQJ0xnSz/f2zdMZ0AgFSib1ni+wAAAACAAAAAAQABAAALABGAAAAIA4BFRQXFRYXFR4BFzMWMx8BMhQyFRYfARYXMxYXMxYXFhcWMzI+AjU0JiUWFx4BFxYUBw4BBwYiLwEuATU0NjMyNjU0Aov+6uyJAQEDDmlRAQEBAw4BAQUEAQUEATg/AS0vCQgSEmi+iVGJ/rNQSVqLJycnJ4taXcxdHl9w/bMhLwQAieyLDg4IEhEBZq89AgIKAQEDAgEDAyITDQUBAQFRib5oi+x9Bh8ni1pdzF1aiycnJw46xHOz/S8hLQAAAgAAAAAEAAQAABQAKQAAASIOARUUHgIXLgI1NDYzMjY0JiMeAhUUBiMiBhQWMzI+ATU0LgICAIvsiU+GumZzwnD9syEvLxZzwnD9syEvLyGL7IlPhrkEAInsi2e7iVMCA3XFc7P9L0IvA3XFc7P9L0IvieyLZ7uJUwAAABcAAAAABAAEAAALABsAKwA7AEoAWgBqAHoAiQCVAKEArQC5AMkA2QDpAPkBCQEZASkBOQFFAVEAAAAiBh0BFBYyNj0BNAUiBw4BHwEWMzI3PgEvASYhIg8BBhYXFjMyPwE2JicmBzIXHgEPAQYjIicuAT8BNgUyHwEWBwYjIi8BJjY3NgciBwYWHwEWMzI3NiYvASYhIg8BDgEXFjMyPwE+AScmBzIXFgYPAQYjIicmNj8BNgUyHwEeAQcGIyIvASY3NgciBhQWOwEyNjQmIyEiBhQWOwEyNjQmIwczMhYUBisBIiY0NgUzMhYUBisBIiY0NhciDwEOARcWMzI/AT4BJyYhIgcGFh8BFjMyNzYmLwEmBzIfAR4BBwYjIi8BLgE3NgUyFxYGDwEGIyInJjY/ATYXIg8BBhYXFjMyPwE2JicmMyIHDgEfARYzMjc+AS8BJgcyHwEWBgcGIyIvASY2NzYHMhceAQ8BBiMiJy4BPwE2FiIGHQEUFjI2PQE0JjIWHQEUBiImPQE0AhQoHBwoHP7oDQsRCwpoDhwNCxELCmgOAbQcDmgKCxELDRwOaAoLEQsNDAoQCQloDRkMChAJCWgN/kkFAmgEBwICBQJoAgIDAqgcDQoKEbQLDRwOCgoStAsDFw0LtBELCg4cDQu0EQoKDRwZDQkJELQLCxoMCgoQtAr86AMDtAUCAgQHAwO0CgYDNxQcHBTQFBwcFAIAFBwcFNAUHBwU0NARFxcR0BEXF/1B0AcJCQfQBwkJ+Q0LtBEKCg0cDQu0EgoKDgGgHA4KCxG0Cw0cDQoKEbQLDQkJtA0HBwoVCgi0DQgICv5ZDAYEBQe0BQULBgQEB7QFYxwOaAoLEQsNHA5oCgsRC/MNCxEKCWgOHA0LEQsKaA4cEgpoBgcLBwkSCmgGBwsH9wYGCQUFaAcOBgYJBQVoB6IoHBwoHDwYEBAYEAQAHBTQFBwcFNAUIgcKJhG0GAYKJhK0GBi0EiYKBhi0ESYKBwQGCSMQtBYGCSMQtBYkBLQHBAEEtAMGAgGCGBEnCmgGGBEnCmgGBmgKJxEYBmgKJxEYBBYQIwloBhYQIwloBiACaAIKBAYCaAYKBsQcKBwcKBwcKBwcKBwIFyIXFyIXGAkOCQkOCWAGaAonERgGaAonERgYEScKaAYYEScKaAYMBWgHHQ0SBWgHHQ0SEAoHEARoAwoHEARoA0IYtBEmCgcYtBImCgYGCiYStBgHCiYRtBgQELQLGgcEELQMGQcECAMFEwm0DAMFFAi0DAocFNAUHBwU0BQIEAzQDBAQDNAMAAAACQB0AEADjAPAAAcAUQBZAGEAaQBxAHkAgQCJAAAAIgYHFjI3JhciDwEuAicGICcOAgcnJiMiBwYWHwEGFRQXIyIGFBY7ARYXBw4BHgE/AR4BMjY3FxY+ASYvATY3MzI2NCYrATY1NCc3PgEnJgQyFhQGIiY0NjIWFAYiJjQ2MhYUBiImNAQyFhQGIiY0JDIWFAYiJjQGMhYUBiImNDYyFhQGIiY0AjVqWRpPsk8a3ggIaAECAgJt/wBtAgICAWkHCRIJBwcLgAMDYw0TEw1rDBltCwcNGgtpJFxoXCRpCxoNBwttGQxrDRMTDWMDA38MBwcJ/dQaExMaE6U2JSU2JdMaExMaE/7lNiUlNiUBJTYlJTYlrRoTExoT0xoTExoTA8B5ZSIiZYcEPAQQDgUnJwUOEAU9BBAMGQdKKw8dIxMaE0g9PwcaFgcGPT1ERD09BgcWGgc/PUgTGhMkHA8rSgcaCxCAExoTExoTJTYlJTYlExoTExptJTYlJTYlJTYlJTabExoTExoTExoTExoAAAQAQABAA8ADwAALABMAGwAnAAAAIg4BFB4BMj4BNCYkIBYQBiAmECQiBhQWMjY0BiIGFREUFjI2NRE0Anr0znh4zvTOeHj+GQE+4eH+wuEBmzYlJTYlJTYlJTYlA8B4zvTOeHjO9M444f7C4eEBPqElNiUlNpslG/7AGyUlGwFAGwAAAAQAQABAA8ADwAALABMAHwAnAAAAIg4BFB4BMj4BNCYkIBYQBiAmECQiBhURFBYyNjURNAIiBhQWMjY0Anr0znh4zvTOeHj+GQE+4eH+wuEBmzYlJTYlJTYlJTYlA8B4zvTOeHjO9M444f7C4eEBPqElG/7AGyUlGwFAG/4lJTYlJTYAAAQAQABAA8ADwAALABMAQABLAAAAIg4BFB4BMj4BNCYkIBYQBiAmECUiDgEVFBYzMjc+ATMyFhUUBgcGBwYHDgEVFBYzMjc2Nz4CNzY3PgE1NC4BAiIGFRQWMzI2NTQCevTOeHjO9M54eP4ZAT7h4f7C4QGFP2AxHxcmDg8qLSYwEAsMGh0SERUdFSgIBQICCBEOMhMTHDFaKzQkJRkYJQPAeM70znh4zvTOOOH+wuHhAT6VNFAmEyAuLC0tIBEcDAwWGhMTMiIbHCoVBwgQEwwuEhM0IixLLP4SIxocISEcGgAAAAQAQAEABAADFgACAA4AGgAmAAABBxclIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMFIgYUFjMhMjY0JiMEANTU/GANExMNAoANExMN/kANExMNAcANExMN/kANExMNAcANExMNAxa2stITGhMTGhPAExoTExoTgBMaExMaEwAEAEABAAQAAsAACwAOABoAJgAAASIGFBYzITI2NCYjBQcXJSIGFBYzITI2NCYjBSIGFBYzITI2NCYjASANExMNAcANExMNASDU1PxgDRMTDQKADRMTDf5ADRMTDQHADRMTDQLAExoTExoTLLay1BMaExMaE8ATGhMTGhMABABAAKwEAALAAAsAFwAaACYAAAEiBhQWMyEyNjQmIwUiBhQWMyEyNjQmIwUHFyUiBhQWMyEyNjQmIwEgDRMTDQHADRMTDf5ADRMTDQHADRMTDQEg1NT8YA0TEw0CgA0TEw0CwBMaExMaE4ATGhMTGhMstrLUExoTExoTAAMBAACAAwADgAAVAB0AKQAAACIGHQEiBhURFBYzITI2NRE0JiM1NCYyFh0BITU0FjIWHQEUBiImPQE0AlCgcBslJRsBgBslJRv1akv/AGU2JSU2JQOAcFCAJRv+wBslJRsBQBslgFAwSzWAgDX1JRuAGyUlG4AbAAIAgACAA4ADgAAeACoAAAAiBh0BMzU0NjIWHQEiBhURFBYzITI2NRE0JiMhNTQSMhYdARQGIiY9ATQBkKBwQEtqSxslJRsBgBslJRv+wGU2JSU2JQOAcFDAwDVLSzWAJRv+wBslJRsBQBslgFD+8CUbgBslJRuAGwAAAAAEAQAAAAMABAAADwAbAB8AJwAAASIGFREUFjMhMjY1ETQmIwczMhYUBisBIiY0NgchESEWMhYUBiImNAFAGyUlGwGAGyUlG+BADRMTDUANExOTAYD+gKU2JSU2JQQAJRv8gBslJRsDgBslIBMaExMaE2D9gEAlNiUlNgAAAwCAAAADgAQAAA8AEwAfAAATIgYVERQWMyEyNjURNCYjBSERIRczMhYUBisBIiY0NsAbJSUbAoAbJSUb/cACAP4A4EANExMNQA0TEwQAJRv8gBslJRsDgBslgP0AIBMaExMaEwAAAAAGAJ8AggOAAz0AFgAiAFcAYwCnALMAABMiDgIHDgEVFBYzMjcVFBYzMj0BNCYXIgYUFjMhMjY0JiMFIg4CFRQWMj4BNzYzMh4BFRQOAQcOAQcOARUUFjsBMjY1NCYrATY3Njc2Nz4BNTQuAScmFyIGFBYzITI2NCYjBSIOAhUUFjMyNj8BPgIzMhYVFAYrASIGFBYzMjYzMhYVFA4BIyImJy4BIyIGFRQeAjI+AjU0LgEnPgE1NC4CFyIGFBYzITI2NCYj7gYEDhIPCggIBQsgCQgRCKsNExMNAcANExMN/YAQGA8ICA4HBgEKEAgNCAgNCgYbEQQGCgpcCAgKCkEDAwcTEwcIEAgNCQ2tDRMTDQHADRMTDf2ADhcPCAkFBAcBBAMGCgcMDRELBQkJBwcBCwMOEAoOCA0PBwEGBAcJCA8YHhgSCQcNCgoLBw8UtA0TEw0BwA0TEw0DPQQUDwgEBgcFCBhyCgoZjwkKPRMaExMaE8MJDxMJBwgJEQIOBw0IBw8PBwQYEgQPBQcKCQYHBwYDCA8QBwcaDwoSDgQGPRMaExMaE8MIDQ4HBgkEAgoGBwQOCQ0NCAwHARAPCg8IERIDBAkHBhEQCwkRFQsKEA4FCRENChANBj0TGhMTGhMAAAAABgBAAMADwANAAA0AGQAmADIAPgBKAAATIgYVERQWMzI2NRE0JjIiBhURFBYyNjURNDciBhURFBYyNjURNCYyIgYVERQWMjY1ETQ2IgYVERQWMjY1ETQ2IgYVERQWMjY1ETSAGiYmGhslJZIaExMaE4AaJiY1JSWSGhMTGhObNiUlNiVtGhMTGhMDQCUb/gAbJSUbAgAbJRMN/kEOEhIOAb8NEyUb/oAaJiUbAYAbJRMN/cENExIOAj8NEyUb/oAaJiUbAYAbJRMN/cEOEhIOAj8NAAABAAAAAAQABAAACwAAAREhFSERMxEhNSERAdb+KgHWVAHW/ioEAP4qVP4qAdZUAdYAAAAAAgCgALADYANwAA8ALAAAASEiBhURFBYzITI2NRE0JgMjFRQGIiY9ASMiJjU0NjsBNTQ2MhYdATMyFhQGAwj98CQ0NCQCECQ0NGyAJTYlgBslJRuAJjQmgBslJgNwNCT98CQ0NCQCECQ0/mB7HicnHnsmGhslhRckJBeFJTUmAAAHAJAAsANwA1AAEQAiADMANwBBAEkAUQAAASIGHQEeAR0BITU0Njc1NCYjBCIGFBYzMjcVFBYyNjURNSYkIgYHFREUFjI2PQEWMzI2NAUVITUFFRQWMyEyNj0BBCIGFBYyNjQkIgYUFjI2NAFgIS8dIwFgIx0vIf5hQi8vIQgIExoTAQISQi4BExoTCAghL/3gAWD+oBEMASYMEf5tGhMTGhMBzRoTExoTA1AvIVsONiEwMCE2DlshL8AvQi8Cwg0TEw0BEAIgLi4gAv7wDRMTDcICL0JxUFBwUA0TEw1QkBMaExMaExMaExMaAAIAAAEgBAAC4AApAEcAABMiBh0BFAYrASIGHQEUFjsBMhYdARQWOwMhMzI2PQM0JisCKQEHMykBOwExHQIxIyErAjE1NCYrATE1MTMyNj0BsBQcHBQgFBwcFCAUHBwUCGSsAf4KFBwcFAoG/oT+dAgIAYwBfAYKCf4BrGMJOCggICg4AuAcFCAUHBwUYBQcHBQgFBwcFGCgYBQcMGCgYCAoOGA4KCAAAAMAAAAABAAEAAAdACwAOwAAEyIGFREUFjsBMhYVOwE0NjsBMjY1ETQmIyEiByYjBSEyHwERJisBIiY1ETQ2KQEyFhURFAYrASIHETc2gDVLSzXgNUsgIEs14DVLSzX+4DomJjr+4AEgJBgMNVPgIS8vAgEBICEvLyHgUzUMGAQASzX9gDVLSzU1S0s1AoA1SysrMBsO/MlALyECgCEvLyH9gCEvQAM3DhsAAAAEAAAAYAQAA6AABwAPAC8ATwAAACIGFBYyNjQOASImNDYyFiUjIiYvAS4BKwEiBg8BDgErASIGFREUFjMhMjY1ETQmAxQGIyEiJjURNDY7ATI2PwE+ATsBMhYfAR4BOwEyFhUCYMCIiMCIMGyYbGyYbAEIlRoyCBgIMhrWGjIIGAgyGpUaJiYaA4AaJiYKCQf8gAcJCQeVKkoOFwQYC9YLGAQXDkoqlQcJAqaIwIiIwKxsbJhsbNYkGUYZJCQZRhkkJhr+ABomJhoCABom/cAHCQkHAgAHCTYoRgoSEgpGKDYJBwAIACoAUQO7A68ADwAcACQALAA0ADwARABMAAABISIGFxMeATMhMjY3EzYmAw4BIyEiJicDNDYzISQiBhQWMjY0BiImNDYyFhQAIgYUFjI2NAYiJjQ2MhYUJCIGFBYyNjQGIiY0NjIWFAOW/VkaIAQ4BCwaAV4aNwvEDBXlBiAM/qIJEAE5AwQCmf0NPywsPyxAFxAQFxACb084OE85TCgcHCgc/mRPOTlPOEwnHR0nHAMtJRr+hholIhcBhhgh/lcMEw4JAXkEBLIsPi0tPjsQFxAQF/25OU84OE9XHCcdHSd0OU84OE9XHCcdHScAAAADAAAAAAQABAAACwAjAD8AAAAgDgEQHgEgPgEQJiQyFx4BFxYUBw4BBwYiJy4BJyY0Nz4BNxciBhURFAYrASIGHQEUFjsDMjY9AhE0JiMCi/7q7ImJ7AEW7ImJ/iu8V1OAJCQkJIBTV7xXU4AkJCQkgFPFBwkJB/AHCQkH8CAQBwkJBwQAiez+6uyJiewBFuxZJCSAU1e8V1OAJCQkJIBTV7xXU4AkTAkH/sAHCQkHEAcJCQcQIAFABwkAAAMBGQCAAucDgAANABsAKwAAASIGHwEeATI2PwE2JiMHIgYfAR4BMjY/ATYmIwciBhcTHgE7ATI2NxM2JiMCcBQTBgIGFxQXBgIGExRwFBMGAgYXFBcGAgYTFOAUFwROBCEUwBQhBE4EFxQDgBsTBBMbGxMEExuAGxMEExsbEwQTG4AcE/5eExwcEwGiExwAAAIAlAAAA2wEAAAlAFUAAAEiBh0BERQjIi8BJiIPAQYfARYyPwE2LwEmIg8BBiMiNRE1NCYjBSIGFREUFjMhMjY1ETQmKwEiBh0BFBY7ATIWFREUBiMhIiY1ETQ2OwEyNj0BNCYjAfgHCQUDA2UEDgQMCwufBA4EnwsLDAQOBGUDAwUJB/6cBwkJBwK4BwkJB9QHCQkHpAcJCQf9qAcJCQekBwkJBwQACQes/jcIA2UFBQsMC54FBZ4LDAsFBWUDCAHJrAcJzAkH/OwHCQkHAxQHCQkHEAcJCQf9TAcJCQcCtAcJCQcQBwkAAAAAAwAAAAAD1wPXAAMACAAbAAABBxc3BwEHNwEFIgYVERQWMyEyNjURBxEhESE3A5crQCuF/kocXAG2/H4HCQkHAuAHCTD9YAIZMAPXK0ArBf5KXBwBtlIJB/0gBwkJBwJpMP3nAqAwAAAFAAAAAAQABAAAEgAiACYAMABEAAABISIGHQEzNSERIxUzMjY1ETQmByEiBhURFBYzITI2NRE0JgMhESEBNxcnNyMnByMXJzsBPwEfATsBDwEfAS8BDwE/AScD8PzgBwkwAuBggAcJCcf84AcJCQcDIAcJCSf9IALg/dDAwEm/7UlJ7b8sWiMKHBwKI1pJHAscSRwcSRwLHAQACQeAYP0gMAkHAyAHCcAJB/zgBwkJBwMgBwn88ALg/WmLi+GM4eGMXCFVVSE1FCFWNRQUNVYhFAAAAAIAAAAZBAAD5wAJAB0AAAEDIQUDJQUDJSEnHwE7AQ8BHwEvAQ8BPwEvATsBNwIAef55ATx4ATwBPHgBPP55eUwKI/TFHApLxRwcxUsKHMX0IwoD5/6M5v6M5eUBdObZ6CGPFSHojxUVj+ghFY8hAAAFADgAyAPMA0gAFAAnADUASgBYAAATIgcGFBcBHgEzMjc2JicDLgEvASYHMh8BHgEXExYXFSYnASY3Njc2BCIOAhYXFjMyPwE+AQcyFzIVBg8BBiMiJyY1Jjc2NzY3NgEiBwYWFxYzMjc2JicmxkIoJCYBjh9AEgYEDgcSbxJiMhgvOjIoGChSDm8NBBka/nMbAwEJHQL2cFRPHQEPES8kJbAqB4IvHQEFFLEXFA4FDAEHCB8jJCL+hRQMCgEMCg4VDw0CDgwDSBQSTyb+ch8nAglUMQEnMV8QCBAwDQgOTyf+2SIeAREZAY4bFAcED1AcMixXJy0diiBCFAsBDQ+LEg4fIx0KDRMWDAz+gxIQIwgGDAojDgwAAgAAANgEAAMoAAIABQAAJQkBEQERAgACAP4A/gDYASgBKP7YASj9sAAAAAAEAAAAAAQABAAABwAPAEcAnwAAACIGFBYyNjQCIiY0NjIWFAU2NCcjJic3LgEnByYnNSYiBxUGBycOAQcXBgcjBhQXMxYXBx4BFzcWFxUWMjc1NjcXPgE3JzY3JwYPAR8BDgEHLwEHBg8BHQEGIic9AScmLwEPAS4BJz8BJyYvASsBJjQ3OwE3Nj8BLwE+ATcfATc2PwE9ATYyFx0BFxYfAT8BHgEXDwEXFh8BOwEWFAcrAQJZsn9/sn+TimNjimMBUAgIYhAmRRpCJkU9RS1eLUU9RSZCGkUmEGIICGIQJkUaQiZFPUUtXi1FPUUmQhpFJhAvDiIUGygOHxEoGyE1PiUWLBYlPjUhGygRHw4oGxQiDggnOAICOCcIDiIUGygOHxEoGyE1PiUWLBYlPjUhGygRHw4oGxQiDggnOAICOCcC2H+yf3+y/v9jimNjihctXi1FPUUmQhpFJhBiCAhiECZFGkImRT1FLV4tRT1FJkIaRSYQYggIYhAmRRpCJkU9RQs+NSEbKBEfDigbFCIOCCc4AgI4JwgOIhQbKA4fESgbITU+JRYsFiU+NSEbKBEfDigbFCIOCCc4AgI4JwgOIhQbKA4fESgbITU+JRYsFgAAAAADAGAAYAOgA6AABwAvAEsAAAAgBhAWIDYQJR4BFRQGBz4BNz4BJicuAicmBiYnLgM0Nz4DNz4BMhYzMjYFFhceAxcWDgEWFx4CFxYGFwYjIi4BNTQ2Aqz+qPT0AVj0/uJZbqF4Ek0pFhMBAgYqQRkTIyMHBRgWFAkLIxscBwgZFB8EDAb+jVFEGiIKDAIDAwcGCwYUDAQDHQcSEVmYWDMDoPT+qPT0AViDJqVkfLgSN2cMESUdEQoaKRUFCAEKBRIPFRILDAkCGBkZFwYiNJIUBxEKEQMDFRQlFAkJDhEQmhYBWJhZRHkAAgBgAGADoAOgAAcASAAAACAGEBYgNhAlMhceAQYjIiYiBgcOAwcGFB4CFx4BNhceAhceAQYHDgEHJj4CJy4CJy4BPgEnLgMnJicmJyY2NzYCrP6o9PQBWPT+N1BDExAICwQfFBkIBxwbIwsJFBYYBQcjIxMZQSoGAgETFixRDwwBDAsCBAwUBgsGBwMDAgwKIhpGWAICEFtLHAOg9P6o9PQBWLYgCCMbBhcZGRgCCQwLEhUPEgUKAQgFFSkaChEdJRENcjkFOj1DDREOCQkUJRQVAwMRChEHFKIEAh85CAIAAAAAAwALAAAD9QP5ABkAHQAzAAAlIxE0JisBIgYVESMRBxEUFjMhMyEyNjURJwEjETMlASYiBwEGHwEWMjcBNjIXARYyPwE2A3DwCQfgBwnwMAkHASDgASAHCTD+4KCgAaX+FgQOBP4WCwsMBA4EAcgEDgQByAQOBAwLMAFuBgoKBv6SAdcw/jkHCQkHAccw/ikBTo0B6gQE/hYLCwwEBAHIBAT+OAQEDAsABAAAAAAEAAQAAAgAHAAsAEQAAAAyNjU0JiIGFBMmNREHFTMyFhURFAYrARUzNSMiEiIOAhQeAjI+AjQuARIGBwYiJy4BJyY0Nz4BNzYyFx4BFxYUBwHsKR0eKB5kB6YiHB0TEyztLxAs0L6JUVGJvtC+iVFRiWKAU1e8V1OAJCQkJIBTV7xXU4AkJCQC7B0UFR4eKP3WBg8BkwUhGhn+zhMTISEDKVGJvtC+iVFRib7Qvon9SYAkJCQkgFNXvFdTgCQkJCSAU1e8VwAABAAwAAAD0AQAACUALQA1AD0AAAAiBhUUFwUmIyIGFBYzMjcFBhUUFjI2NCYjIgclNjQnJRYzMjY0JjIWFAYiJjQAMhYUBiImNAAyFhQGIiY0A3aBWgr+ni9JQFtbQEkvAWIKWoFaWkFJL/6eCgoBYi9JQVrHWT4+WT7901k+Plk+AqlZPj5ZPgQAW0AdGs06W4BbOs0aHUBbW4BaOcwbOhvMOVqAKz9YPj5Z/tk/WD8/WP7ZPlg/P1gAAAAGAKABoANgAmAABwAPABcAHwAnAC8AAAAiBhQWMjY0BiImNDYyFhQ2IgYUFjI2NAYiJjQ2MhYUNiIGFBYyNjQGIiY0NjIWFAEoUDg4UDhMKBwcKBz4UDg4UDhMKBwcKBz4UDg4UDhMKBwcKBwCYDhQODhQWBwoHBwodDhQODhQWBwoHBwodDhQODhQWBwoHBwoAAAAAwGgAIACYAOAAAcADwAXAAAAIgYUFjI2NAYiBhQWMjY0BiIGFBYyNjQCKFA4OFA4OFA4OFA4OFA4OFA4A4A4UDg4UOg4UDg4UOg4UDg4UAABAMUAAAM7BAAAHAAAACIPAQYUFwEWFAcBBhQfARYyNwE/AjY0LwIBAUgaCVcJCQFeCQn+ogkJVwkaCQFeFRdXCQlXLP6iBAAJVwoZCf6iCRoJ/qIJGQpXCQkBXhUXVwkaCVcsAV4AAAIBAACAAwADgAADAAcAAAEzESMBMxEjAkDAwP7AwMADgP0AAwD9AAACAAAAAAQAA7UAPwCWAAABIgYjIgYVFBcGBwYXFhcWFxYXFRQGBw4DBwYHISYnLgUnLgM9ATY3Njc2NzYnJic2NTQmIyIHJgcyHwE3NjMyFxYVFA8BFxYXFgcGBwYPAgYHBg8BHQEUHgMXFhcWFxYXITY3Njc2Nz4EPQInJicmLwImJyYnJjc2PwEnJjc0NTQ3NjMyNzICBAcbB1FxCQgFBwcHEAoMES4jJQJMK0UYQyAD/yBDESghLBgpBRQYGQwuEQsJEQYICAUND2JECQoQGQ4HDA4HBi8kIwkUHQMCBAUECgQDEgQIDg4TCRAVJBUSBQ90NiMa/IsaIzN5FQcPEyEUEAoSDg8HBBMEAwoFBQUBAxIMBgEqKz0IDwwDtAFuUDkXChAcIh8WDAdcPhAdIA8BGxIlFDhwcDgOGhITCg8CBwwSFw8QPlwHDBYfIhwUDBs5RmkBBzADBgIBJiYzLA8iGwIHEBYVDgUCCxUoJCEaDBAQFiUXFgkHAgYrLR02Nh0qKwgDBQgWFycXEBANGSEjKRULAgUOFRYQBgMXGw0nBwE7KSoBAAAAAAEAgABFA4ADuwACAAATEQGAAwADu/yKAbsAAAABAE0AAAOzA/8AKAAAARUiDgIUHgIyPgI1NCcHFhUUBw4BBwYiJy4BJyY0Nz4BNzYzFSUCAFmhdEVFdKGyoXRFCysGHh5rRUieSEVrHh4eHmtFSE8BNwP/mUV0obGidEVFdKJYMS8ZIyRPSEVrHh4eHmtFSJ5IRWseHp6zAAAAAAEAAABNA/8DswAoAAAAIg4CFSMbASM0Nz4BNzYyFx4BFxYUBw4BBwYjIicHFjMyPgI0LgECpLGhdUSZtLOeHh1sRUidSEZrHR8fHWtGSE4kIxkvMVihdUVFdQOzRXShWf7JATdPSEVrHh4eHmtFSJ5IRWseHgYrC0V0obKhdAAAAgAAANgEAAMoAAIABQAAJQkBEQERAgD+AAIAAgDYASgBKP7YASj9sAAAAAACAAAAAAQABAAADQAqAAAAIAYQFjMyNwE3ATY1NCQyFx4BFxYVFAcGDwIGBwYjIicuAScmNDc+ATcCH/7C4eGfh2kBVTv+rFT+PIg/PF0aGhQTIxcdLDU2O0Q/PF0aGhoaXTwEAOH+wuFU/qw7AVVph5+xGhpdPD9EOzY1LB0XIxMUGhpdPD+IPzxdGgAAAAABAIAAgAOAA4AAAwAAExEhEYADAAOA/QADAAAAAwAAAAAEAAQAABIAIgAmAAABISIGHQEzNSERIxUzMjY1ETQmByEiBhURFBYzITI2NRE0JgMhESED8PzgBwkwAuBggAcJCcf84AcJCQcDIAcJCSf9IALgBAAJB4Bg/SAwCQcDIAcJwAkH/OAHCQkHAyAHCfzwAuAABgCAAAADgAPSABsAJQAvAEEAUwBjAAABIgYdASsBFTMTHgEzITI2NxM/ATM1KwE1NCYjBzMyFh0BIzU0NgchAxQGIyEiJjUTIw4BFxMeATsCPgEnAy4BIyEiBgcDBhYXOwEyNjcTNiYnKwEiBhURFBY7ATI2NRE0JiMBnRomnEFENwIpGgGAGikCLwcBREGdJhrFxQcJ5QmiAhg3DQj+gAgNVBAHCQEQAQkGARAHCQEQAQkGAQAGCQEQAQkHEAEGCQEQAQkHEIkHCQkHEAcJCQcD0iYaQDD9HhslJRsChU0QMEAaJjAJB0BABwmA/SIIDAwIAo4BCQf9zgYJAQkHAjIGCQkG/c4HCQEJBgIyBwkBCQf9zgcJCQcCMgcJAAAAAgAAAGkD/wOXAA0AHQAACQI1MgQXMzU0LgIjJxUzMhceARcWFy4BKwEVJQIA/gACAK8BES0SUYm9aDAvXldTgCQfBE31jDD+kAOX/tj+2ZnUpJpovYlSQXElI4BUSlFxhHbUAAIAAABpA/8DlwANAB0AAAkCNSIEByM1ND4CMzcVIyIHDgEHBgc+ATsBFSUB/wIA/gCv/u8tElGJvWgwL15XU4AkHwRN9YwwAXADl/7Y/tmZ1KSaaL2JUkFxJSOAVEpRcYR21AAEACQArgPcA1IACwARABkAJQAAAQcWFxYUBwYHFzYQJQUjETMFEwcWEAcXNhAnBx4BFAYHFz4BNCYDZjAuHCYmHC4wdv4I/t6engEi8jBdXTBk9jUmLCwmNSYtLQNSGzdCW8ZbQjcblAF8aqj/AKgCKBxf/vZfHG0BJhgeFktYSxYeHlpmWgAAAwAAAJkEAANtAAsAFwAcAAARFz4BMhYXNyYkIAQTFz4BMhYXNy4BIgYfATcmIl1V3uDeVV1o/vH+7v7xUV0we357MF1Dra6td42NOqYCmV1VWVlVXWhsbP7eXC8yMi9cQ0VF/I2NOgACAAAAAAQABAAACwAXAAAAIA4BEB4BID4BECYlMxEhFSERIxEhNSECi/7q7ImJ7AEW7ImJ/l9UAZb+alT+agGWBACJ7P7q7ImJ7AEW7En+alT+agGWVAAAAgCgALADYANwAA8ALAAAASEiBhURFBYzITI2NRE0JgMjFRQGIiY9ASMiJjU0NjsBNTQ2MhYdATMyFhQGAwj98CQ0NCQCECQ0NGyAJTYlgBslJRuAJjQmgBslJgNwNCT98CQ0NCQCECQ0/mB7HicnHnsmGhslhRckJBeFJTUmAAAHAJAAsANwA1AAEQAiADMANwBBAEkAUQAAASIGHQEeAR0BITU0Njc1NCYjBCIGFBYzMjcVFBYyNjURNSYkIgYHFREUFjI2PQEWMzI2NAUVITUFFRQWMyEyNj0BBCIGFBYyNjQkIgYUFjI2NAFgIS8dIwFgIx0vIf5hQi8vIQgIExoTAQISQi4BExoTCAghL/3gAWD+oBEMASYMEf5tGhMTGhMBzRoTExoTA1AvIVsONiEwMCE2DlshL8AvQi8Cwg0TEw0BEAIgLi4gAv7wDRMTDcICL0JxUFBwUA0TEw1QkBMaExMaExMaExMaAAEAAAEgBAAC4AApAAATIgYdARQGKwEiBh0BFBY7ATIWHQEUFjsDITMyNj0DNCYrAikBsBQcHBQgFBwcFCAUHBwUCGSsAf4KFBwcFAoG/oT+dALgHBQgFBwcFGAUHBwUIBQcHBRgoGAUHAAAAAQAAAAABAAEAAAPAB8APQBbAAABISIPAhE2OwEyNjURNCYFJiMhIgYVERQWOwEyFxEnJSEiByYjISIGFREUFjsBMhYVOwE0NjsBMjY1ETQmExQGKwEiBgcuASsBIiY1ETQ2MyEyHwE3NjMhMhYVA4D+4A4KJAw8TOANExP+KwoO/uANExMN4Ew8DAGk/uA6JiY6/uA1S0s14DVLICBLNeA1S0sbLyHgNFcVFVc04CEvLyEBICQYJCQYJAEgIS8DnwsoDv1TLhMNAoAOEgsLEg79gA0TLgKtDpQrK0s1/YA1S0s1NUtLNQKANUv8/yEvOC4uOC8hAoAhLxspKRsvIQADAAAAYAQAA6AABwAnAC8AAAAiBhQWMjY0JSMiJi8BLgErASIGDwEOASsBIgYVERQWMyEyNjURNCYAIiY0NjIWFAJMmGxsmGwBCJUaMggYCDIa1hoyCBgIMhqVGiYmGgOAGiYm/obAiIjAiAJ2bJhsbJjWJBlGGSQkGUYZJCYa/gAaJiYaAgAaJv32iMCIiMAAAAAABAAqAFEDuwOvAA8AFwAfACcAAAEhIgYXEx4BMyEyNjcTNiYkIgYUFjI2NAAiBhQWMjY0JCIGFBYyNjQDlv1ZGiAEOAQsGgFeGjcLxAwV/OU/LCw/LAI/Tzg4Tzn+NE85OU84Ay0lGv6GGiUiFwGGGCGCLD4tLT79jjlPODhPOTlPODhPAAAAAAIAAAAABAAEAAALACcAAAAgDgEQHgEgPgEQJgUzMhYVER0BFAYrAyImPQE0NjsBMjY1ETQ2Aov+6uyJiewBFuyJif6ZEAcJCQcQIPAHCQkH8AcJCQQAiez+6uyJiewBFuwXCQf+wCAQBwkJBxAHCQkHAUAHCQAAAAMBGQCAAucDgAANABsAKwAAASIGHwEeATI2PwE2JiMHIgYfAR4BMjY/ATYmIwciBhcTHgE7ATI2NxM2JiMCcBQTBgIGFxQXBgIGExRwFBMGAgYXFBcGAgYTFOAUFwROBCEUwBQhBE4EFxQDgBsTBBMbGxMEExuAGxMEExsbEwQTG4AcE/5eExwcEwGiExwAAAIAlAAAA2wEAAALADkAAAE1NCYrASIGHQIzKQERFDMyPwE2Mh8BFg8BBiIvASY/ATYyHwEWMzI1ESEiBhURFBYzITI2NRE0JgIYCQcQBwkwAUT+vAUDA2UEDgQMCwufBA4EnwsLDAQOBGUDAwX+vAcJCQcCuAcJCQNErAcJCQesEP5HCANlBQULDAueBQWeCwwLBQVlAwgBuQkH/OwHCQkHAxQHCQAAAAMAAAAAA9cD1wADAAsAHAAAAQcXNw8BMzIWHQE3BwEHNwEhIgYVERQWMyEyNjUDlytAK4WSMAcJkpL+3FwcAST9UAcJCQcC4AcJA9crQCsFkgkHMJKS/twcXAEkCQf9IAcJCQcAAAAAAwAAAAAEAAQAABAAIAAqAAATIgYdATMhERUzMjY1ETQmIwUiBhURFBYzITI2NRE0JiMFFzMHFycHNycz0AcJMAKAgAcJCQf8IAcJCQcDIAcJCQf+cEntv0nAwEm/7QQACQeA/YAwCQcDIAcJwAkH/OAHCQkHAyAHCXnhjOGLi+GMAAAAAQAAABkEAAPnAAkAAAEDIQUDJQUDJSECAHn+eQE8eAE8ATx4ATz+eQPn/ozm/ozl5QF05gAAAAADADQAvAPIAzwAEQAdACcAABMiBwYWFwEeATYmJwMuAS8BJgQiDgIeAj8BPgEBDgEeAT4BJicmw0MnJQElAY4mSBwHEm8SYjIYLwKFcVNQHAEdUSmxKgb90RMWAhgjGgIODQM8ExNPJf5yJSgSUzIBJjJeEQgPgBszK1dPCSCKIUL+bwEiIhADFSIODQAAAAACAAAA2AQAAygAAgAFAAAlCQERARECAAIA/gD+ANgBKAEo/tgBKP2wAAAAAAIAAAAABAAEAAA3AD8AAAAiBxUGBycOAQcXBgcjBhQXMxYXBx4BFzcWFxUWMjc1NjcXPgE3JzY3MzY0JyMmJzcuAScHJic1AjIWFAYiJjQCL14tRT1FJkIaRSYQYggIYhAmRRpCJkU9RS1eLUU9RSZCGkUmEGIICGIQJkUaQiZFPUWhimNjimMEAAhiECZFGkImRT1FLV4tRT1FJkIaRSYQYggIYhAmRRpCJkU9RS1eLUU9RSZCGkUmEGL+sGOKY2OKAAADAGAAYAOgA6AABwAvAEsAAAAgBhAWIDYQJR4BFRQGBz4BNz4BJicuAicmBiYnLgM0Nz4DNz4BMhYzMjYFFhceAxcWDgEWFx4CFxYGFwYjIi4BNTQ2Aqz+qPT0AVj0/uJZbqF4Ek0pFhMBAgYqQRkTIyMHBRgWFAkLIxscBwgZFB8EDAb+jVFEGiIKDAIDAwcGCwYUDAQDHQcSEVmYWDMDoPT+qPT0AViDJqVkfLgSN2cMESUdEQoaKRUFCAEKBRIPFRILDAkCGBkZFwYiNJIUBxEKEQMDFRQlFAkJDhEQmhYBWJhZRHkAAgBgAGADoAOgAAcASAAAACAGEBYgNhAlMhceAQYjIiYiBgcOAwcGFB4CFx4BNhceAhceAQYHDgEHJj4CJy4CJy4BPgEnLgMnJicmJyY2NzYCrP6o9PQBWPT+N1BDExAICwQfFBkIBxwbIwsJFBYYBQcjIxMZQSoGAgETFixRDwwBDAsCBAwUBgsGBwMDAgwKIhpGWAICEFtLHAOg9P6o9PQBWLYgCCMbBhcZGRgCCQwLEhUPEgUKAQgFFSkaChEdJRENcjkFOj1DDREOCQkUJRQVAwMRChEHFKIEAh85CAIAAAAAAgALAAAD9QP5AB0AJwAAACIHAQYfARYyPwERFBYzITMhMjY1ERcWMj8BNicBAzMyFhURIRE0NgIHDgT+FgsLDAQOBDMJBwEg4AEgBwkzBA4EDAsL/hZ74AcJ/wAJA/kE/hYLCwwEBDP99AcJCQcCDDMEBAwLCwHq/bkKBv6SAW4GCgAAAwAAAAAEAAQAAAsAFAAoAAAAIA4BEB4BID4BECYEMhYVFAYiJjQXERQXFjsBFSM1MzI2NRE0JisBNQKL/ursiYnsARbsiYn+dSgeHSkeXQcKEC/tLBMTHRwiBACJ7P7q7ImJ7AEW7CceFRQdHiiq/m0PBgkhIRMTATIZGiEAAAABADAAAAPQBAAAJQAAACIGFRQXBSYjIgYUFjMyNwUGFRQWMjY0JiMiByU2NCclFjMyNjQDdoFaCv6eL0lAW1tASS8BYgpagVpaQUkv/p4KCgFiL0lBWgQAW0AdGs06W4BbOs0aHUBbW4BaOcwbOhvMOVqAAAMAoAGgA2ACYAAHAA8AFwAAACIGFBYyNjQ2IgYUFjI2NDYiBhQWMjY0AShQODhQOMhQODhQOMhQODhQOAJgOFA4OFA4OFA4OFA4OFA4OFAAAwGgAIACYAOAAAcADwAXAAAAIgYUFjI2NAYiBhQWMjY0BiIGFBYyNjQCKFA4OFA4OFA4OFA4OFA4OFA4A4A4UDg4UOg4UDg4UOg4UDg4UAABAMUAAAM7BAAAHAAAACIPAQYUFwEWFAcBBhQfARYyNwE/AjY0LwIBAUgaCVcJCQFeCQn+ogkJVwkaCQFeFRdXCQlXLP6iBAAJVwoZCf6iCRoJ/qIJGQpXCQkBXhUXVwkaCVcsAV4AAAIBAACAAwADgAADAAcAAAEzESMBMxEjAkDAwP7AwMADgP0AAwD9AAABAAAAAAQAA7UAPwAAASIGIyIGFRQXBgcGFxYXFhcWFxUUBgcOAwcGByEmJy4FJy4DPQE2NzY3Njc2JyYnNjU0JiMiByYCBAcbB1FxCQgFBwcHEAoMES4jJQJMK0UYQyAD/yBDESghLBgpBRQYGQwuEQsJEQYICAUND2JECQoQA7QBblA5FwoQHCIfFgwHXD4QHSAPARsSJRQ4cHA4DhoSEwoPAgcMEhcPED5cBwwWHyIcFAwbOUZpAQcAAAEAgABFA4ADuwACAAATEQGAAwADu/yKAbsAAAABAE0AAAOzA/8AKAAAARUiDgIUHgIyPgI1NCcHFhUUBw4BBwYiJy4BJyY0Nz4BNzYzFSUCAFmhdEVFdKGyoXRFCysGHh5rRUieSEVrHh4eHmtFSE8BNwP/mUV0obGidEVFdKJYMS8ZIyRPSEVrHh4eHmtFSJ5IRWseHp6zAAAAAAEAAABNA/8DswAoAAAAIg4CFSMbASM0Nz4BNzYyFx4BFxYUBw4BBwYjIicHFjMyPgI0LgECpLGhdUSZtLOeHh1sRUidSEZrHR8fHWtGSE4kIxkvMVihdUVFdQOzRXShWf7JATdPSEVrHh4eHmtFSJ5IRWseHgYrC0V0obKhdAAAAgAAANgEAAMoAAIABQAAJQkBEQERAgD+AAIAAgDYASgBKP7YASj9sAAAAAACAAAAAAQABAAABwALAAAAIAYQFiA2EAMHATcCH/7C4eEBPuEjOwEjOwQA4f7C4eEBPv4/O/7dOwAAAAABAIAAgAOAA4AAAwAAExEhEYADAAOA/QADAAAAAgAAAAAEAAQAABAAIAAAASEiBh0BMyERFTMyNjURNCYHISIGFREUFjMhMjY1ETQmA/D84AcJMAKAgAcJCcf84AcJCQcDIAcJCQQACQeA/YAwCQcDIAcJwAkH/OAHCQkHAyAHCQAAAAAEAIAAAAOAA9IAGwAtAD8ATwAAASIGHQErARUzEx4BMyEyNjcTPwEzNSsBNTQmIwMzMhYXExYGBysBIiYnAyY2NyE7AR4BBwMOASsCLgE3Ez4BIzMyFhURFAYrASImNRE0NgGdGiacQUQ3AikaAYAaKQIvBwFEQZ0mGuMBBgkBEAEJBxABBgkBEAEJBwERARAHCQEQAQkGARAHCQEQAQmCEAcJCQcQBwkJA9ImGkAw/R4bJSUbAoVNEDBAGib/AAkG/c4HCQEJBgIyBwkBAQkH/c4GCQEJBwIyBgkJB/3OBwkJBwIyBwkAAQABAGkEAAOXAA0AAAkCNTIEFzM1NC4CIwIB/gACAK8BES0SUYm9aAOX/tj+2ZnUpJpovYlSAAABAAEAaQQAA5cADQAACQI1IgQHIzU0PgIzAgACAP4Ar/7vLRJRib1oA5f+2P7ZmdSkmmi9iVIAAAQAJACuA9wDUgALABEAGQAlAAABBxYXFhQHBgcXNhAlBSMRMwUTBxYQBxc2ECcHHgEUBgcXPgE0JgNmMC4cJiYcLjB2/gj+3p6eASLyMF1dMGT2NSYsLCY1Ji0tA1IbN0JbxltCNxuUAXxqqP8AqAIoHF/+9l8cbQEmGB4WS1hLFh4eWmZaAAADAAAAmQQAA20ACwAXABwAABEXPgEyFhc3JiQgBBMXPgEyFhc3LgEiBh8BNyYiXVXe4N5VXWj+8f7u/vFRXTB7fnswXUOtrq13jY06pgKZXVVZWVVdaGxs/t5cLzIyL1xDRUX8jY06AAIAAAAAA/8EAAAaAFAAAAEXBycmIyIHDgEHDgEfAQcnNjc2NzE2NzY3MjciIwciDgIPAQ4GBxQfARYzMjc2PwE2LwEmNzY3PgE/ATYzMh8BFjMyPwI2LwEmA1trvHYRFBkUQc0qCwMJO3+RApFMTEpnyIUBBAECAkKhh3QhIQcWQTpINCQBCLYDBAwIAQGSCwk/CAomZC1QERIICwkGfgYIDAjXAwwFhwUD0JF/OwgMKs1CES4SdrxrhcdoS0tLkwExAUFcWyAgBxdJSmtjcTEYBocBCQEC1xASfRIQPGQtRQwMBQM/AwaRAwwPtQgAAAEAAAAAA/8D/wA1AAABKwEOAw8BDgYHBh8BFjMyNzY/ATYvASY3Njc+AT8BNjMyHwEWMzI/ATY3Ni8BJgNeAwJCoYd0ISEHFkE6SDQkAQEJtgMEDAgBAZILCT8ICiZkLVAREggLCQZ+BggMCNcBAgwFhwUD/wFBW1wgIAYXSUtqY3IwGAaHAQgCAdcREX4RETxkLEUNDAUDPwMFkgEBDA+2BwAAAgAwALoDogNIABgAMQAAACIGHQEOBBU+AxcVFBY3JTY0JyUFIgYUFjI2NTQnBgcWFRQGIiY1NDY3NjcjAmokFjBVYEQtFk9jXDIuIQECISH+/v6RXYODuoMDJB8DXIJcMikdLgQDSB4aaAkbM0JlPCs8HAoBaicZF7MWQBeyv4O6g4NdEBIBBQ4OQVxcQS5NEy0lAAIAMAC6A6IDSAAYADEAAAAiBh0BDgQVPgMXFRQWNyU2NCclBSIGFBYyNjU0JwYHFhUUBiImNTQ2NzY3IwJqJBYwVWBELRZPY1wyLiEBAiEh/v7+kV2Dg7qDAyQfA1yCXDIpHS4EA0geGmgJGzNCZTwrPBwKAWonGRezFkAXsr+DuoODXRASAQUODkFcXEEuTRMtJQAAAAwAlgABAAAAAAABAAcAEAABAAAAAAACAAcAKAABAAAAAAADACMAeAABAAAAAAAEAAgArgABAAAAAAAFAAsAzwABAAAAAAAGAAgA7QADAAEECQABAA4AAAADAAEECQACAA4AGAADAAEECQADAEYAMAADAAEECQAEABAAnAADAAEECQAFABYAtwADAAEECQAGABAA2wBLAGUAbgBkAG8AVQBJAABLZW5kb1VJAABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABGAG8AbgB0AEYAbwByAGcAZQAgADIALgAwACAAOgAgAGYAbwBuAHQAMwAyADAANQAgADoAIAA5AC0AOQAtADIAMAAxADMAAEZvbnRGb3JnZSAyLjAgOiBmb250MzIwNSA6IDktOS0yMDEzAABmAG8AbgB0ADMAMgAwADUAAGZvbnQzMjA1AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABmAG8AbgB0ADMAMgAwADUAAGZvbnQzMjA1AAACAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAVcAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEBUgFTAVQBVQFWAVcBWAFZAVoBWwFcAV0BXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagFrAWwBbQFuAW8BcAFxAXIBcwF0AXUBdgF3AXgBeQF6AXsBfAF9AX4BfwGAAYEBggGDAYQBhQGGAYcBiAGJAYoBiwGMAY0BjgGPAZABkQGSAZMBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcBuAG5AboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHUAdUB1gHXAdgB2QHaAdsB3AHdAd4B3wHgAeEB4gHjAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+Af8CAAIBAgICAwIEAgUCBgIHAggCCQIKAgsCDAINAg4CDwIQAhECEgITAhQCFQIWAhcCGAIZAhoCGwIcAh0CHgIfAiACIQIiAiMCJAIlAiYCJwIoAikCKgIrAiwCLQIuAi8CMAIxAjICMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJJAkoCSwJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwZnbHlwaDEGZ2x5cGgyBmdseXBoMwZnbHlwaDQGZ2x5cGg1BmdseXBoNgZnbHlwaDcGZ2x5cGg4BmdseXBoOQdnbHlwaDEwB2dseXBoMTEHZ2x5cGgxMgdnbHlwaDEzB2dseXBoMTQHZ2x5cGgxNQdnbHlwaDE2B2dseXBoMTcHZ2x5cGgxOAdnbHlwaDE5B2dseXBoMjAHZ2x5cGgyMQdnbHlwaDIyB2dseXBoMjMHZ2x5cGgyNAdnbHlwaDI1B2dseXBoMjYHZ2x5cGgyNwdnbHlwaDI4B2dseXBoMjkHZ2x5cGgzMAdnbHlwaDMxB2dseXBoMzIHZ2x5cGgzMwdnbHlwaDM0B2dseXBoMzUHZ2x5cGgzNgdnbHlwaDM3B2dseXBoMzgHZ2x5cGgzOQdnbHlwaDQwB2dseXBoNDEHZ2x5cGg0MgdnbHlwaDQzB2dseXBoNDQHZ2x5cGg0NQdnbHlwaDQ2B2dseXBoNDcHZ2x5cGg0OAdnbHlwaDQ5B2dseXBoNTAHZ2x5cGg1MQdnbHlwaDUyB2dseXBoNTMHZ2x5cGg1NAdnbHlwaDU1B2dseXBoNTYHZ2x5cGg1NwdnbHlwaDU4B2dseXBoNTkHZ2x5cGg2MAdnbHlwaDYxB2dseXBoNjIHZ2x5cGg2MwdnbHlwaDY0B2dseXBoNjUHZ2x5cGg2NgdnbHlwaDY3B2dseXBoNjgHZ2x5cGg2OQdnbHlwaDcwB2dseXBoNzEHZ2x5cGg3MgdnbHlwaDczB2dseXBoNzQHZ2x5cGg3NQdnbHlwaDc2B2dseXBoNzcHZ2x5cGg3OAdnbHlwaDc5B2dseXBoODAHZ2x5cGg4MQdnbHlwaDgyB2dseXBoODMHZ2x5cGg4NAdnbHlwaDg1B2dseXBoODYHZ2x5cGg4NwdnbHlwaDg4B2dseXBoODkHZ2x5cGg5MAdnbHlwaDkxB2dseXBoOTIHZ2x5cGg5MwdnbHlwaDk0B2dseXBoOTUHZ2x5cGg5NgdnbHlwaDk3B2dseXBoOTgHZ2x5cGg5OQhnbHlwaDEwMAhnbHlwaDEwMQhnbHlwaDEwMghnbHlwaDEwMwhnbHlwaDEwNAhnbHlwaDEwNQhnbHlwaDEwNghnbHlwaDEwNwhnbHlwaDEwOAhnbHlwaDEwOQhnbHlwaDExMAhnbHlwaDExMQhnbHlwaDExMghnbHlwaDExMwhnbHlwaDExNAhnbHlwaDExNQhnbHlwaDExNghnbHlwaDExNwhnbHlwaDExOAhnbHlwaDExOQhnbHlwaDEyMAhnbHlwaDEyMQhnbHlwaDEyMghnbHlwaDEyMwhnbHlwaDEyNAhnbHlwaDEyNQhnbHlwaDEyNghnbHlwaDEyNwhnbHlwaDEyOAhnbHlwaDEyOQhnbHlwaDEzMAhnbHlwaDEzMQhnbHlwaDEzMghnbHlwaDEzMwhnbHlwaDEzNAhnbHlwaDEzNQhnbHlwaDEzNghnbHlwaDEzNwhnbHlwaDEzOAhnbHlwaDEzOQhnbHlwaDE0MAhnbHlwaDE0MQhnbHlwaDE0MghnbHlwaDE0MwhnbHlwaDE0NAhnbHlwaDE0NQhnbHlwaDE0NghnbHlwaDE0NwhnbHlwaDE0OAhnbHlwaDE0OQhnbHlwaDE1MAhnbHlwaDE1MQhnbHlwaDE1MghnbHlwaDE1MwhnbHlwaDE1NAhnbHlwaDE1NQhnbHlwaDE1NghnbHlwaDE1NwhnbHlwaDE1OAhnbHlwaDE1OQhnbHlwaDE2MAhnbHlwaDE2MQhnbHlwaDE2MghnbHlwaDE2MwhnbHlwaDE2NAhnbHlwaDE2NQhnbHlwaDE2NghnbHlwaDE2NwhnbHlwaDE2OAhnbHlwaDE2OQhnbHlwaDE3MAhnbHlwaDE3MQhnbHlwaDE3MghnbHlwaDE3MwhnbHlwaDE3NAhnbHlwaDE3NQhnbHlwaDE3NghnbHlwaDE3NwhnbHlwaDE3OAhnbHlwaDE3OQhnbHlwaDE4MAhnbHlwaDE4MQhnbHlwaDE4MghnbHlwaDE4MwhnbHlwaDE4NAhnbHlwaDE4NQhnbHlwaDE4NghnbHlwaDE4NwhnbHlwaDE4OAhnbHlwaDE4OQhnbHlwaDE5MAhnbHlwaDE5MQhnbHlwaDE5MghnbHlwaDE5MwhnbHlwaDE5NAhnbHlwaDE5NQhnbHlwaDE5NghnbHlwaDE5NwhnbHlwaDE5OAhnbHlwaDE5OQhnbHlwaDIwMAhnbHlwaDIwMQhnbHlwaDIwMghnbHlwaDIwMwhnbHlwaDIwNAhnbHlwaDIwNQhnbHlwaDIwNghnbHlwaDIwNwhnbHlwaDIwOAhnbHlwaDIwOQhnbHlwaDIxMAhnbHlwaDIxMQhnbHlwaDIxMghnbHlwaDIxMwhnbHlwaDIxNAhnbHlwaDIxNQhnbHlwaDIxNghnbHlwaDIxNwhnbHlwaDIxOAhnbHlwaDIxOQhnbHlwaDIyMAhnbHlwaDIyMQhnbHlwaDIyMghnbHlwaDIyMwhnbHlwaDIyNAhnbHlwaDIyNQhnbHlwaDIyNghnbHlwaDIyNwhnbHlwaDIyOAhnbHlwaDIyOQhnbHlwaDIzMAhnbHlwaDIzMQhnbHlwaDIzMghnbHlwaDIzMwhnbHlwaDIzNAhnbHlwaDIzNQhnbHlwaDIzNghnbHlwaDIzNwhnbHlwaDIzOAhnbHlwaDIzOQhnbHlwaDI0MAhnbHlwaDI0MQhnbHlwaDI0MghnbHlwaDI0MwhnbHlwaDI0NAhnbHlwaDI0NQhnbHlwaDI0NghnbHlwaDI0NwhnbHlwaDI0OAhnbHlwaDI0OQhnbHlwaDI1MAhnbHlwaDI1MQhnbHlwaDI1MghnbHlwaDI1MwhnbHlwaDI1NAhnbHlwaDI1NQhnbHlwaDI1NghnbHlwaDI1NwhnbHlwaDI1OAhnbHlwaDI1OQhnbHlwaDI2MAhnbHlwaDI2MQhnbHlwaDI2MghnbHlwaDI2MwhnbHlwaDI2NAhnbHlwaDI2NQhnbHlwaDI2NghnbHlwaDI2NwhnbHlwaDI2OAhnbHlwaDI2OQhnbHlwaDI3MAhnbHlwaDI3MQhnbHlwaDI3MghnbHlwaDI3MwhnbHlwaDI3NAhnbHlwaDI3NQhnbHlwaDI3NghnbHlwaDI3NwhnbHlwaDI3OAhnbHlwaDI3OQhnbHlwaDI4MAhnbHlwaDI4MQhnbHlwaDI4MghnbHlwaDI4MwhnbHlwaDI4NAhnbHlwaDI4NQhnbHlwaDI4NghnbHlwaDI4NwhnbHlwaDI4OAhnbHlwaDI4OQhnbHlwaDI5MAhnbHlwaDI5MQhnbHlwaDI5MghnbHlwaDI5MwhnbHlwaDI5NAhnbHlwaDI5NQhnbHlwaDI5NghnbHlwaDI5NwhnbHlwaDI5OAhnbHlwaDI5OQhnbHlwaDMwMAhnbHlwaDMwMQhnbHlwaDMwMghnbHlwaDMwMwhnbHlwaDMwNAhnbHlwaDMwNQhnbHlwaDMwNghnbHlwaDMwNwhnbHlwaDMwOAhnbHlwaDMwOQhnbHlwaDMxMAhnbHlwaDMxMQhnbHlwaDMxMghnbHlwaDMxMwhnbHlwaDMxNAhnbHlwaDMxNQhnbHlwaDMxNghnbHlwaDMxNwhnbHlwaDMxOAhnbHlwaDMxOQhnbHlwaDMyMAhnbHlwaDMyMQhnbHlwaDMyMghnbHlwaDMyMwhnbHlwaDMyNAhnbHlwaDMyNQhnbHlwaDMyNghnbHlwaDMyNwhnbHlwaDMyOAhnbHlwaDMyOQhnbHlwaDMzMAhnbHlwaDMzMQhnbHlwaDMzMghnbHlwaDMzMwhnbHlwaDMzNAhnbHlwaDMzNQhnbHlwaDMzNghnbHlwaDMzNwhnbHlwaDMzOAhnbHlwaDMzOQhnbHlwaDM0MAhnbHlwaDM0MQhnbHlwaDM0MgAAAAAAAf//AAIAAQAAAA4AAAAYAAAAAAACAAEAAQFWAAEABAAAAAIAAAAAAAEAAAAAzBdyYwAAAADOU5nAAAAAAM5TmcAAARAAAgD+AABcAFoAAPxaBAAAAAABAAAAAAAAAAAAAAAAAAQAWgQAAFoC3gBaAsAAWgLAAt4CwALAAsACwAMAAsADAAMAAsACQAKAAsACtwI7AjsCtwMSA4kDwAOAA4ADgAKxA8AD7wPvA2EDYQL8AwADAAMAAvAC8AL8AwADoQNAAv0C/QL/Av8DoQNAA4ADgAOAA4ADgAOAA8ADFgMAA0ACQALAAkADAAMAAwADQANAA0ADwANAA0ADQAQABAAEAAQAA0ADQAOiA6IDAAN5A4ADQANAA0ADQANAA5MDQANAA0ADQANAA0ADCQLUA0ADQANAA0ADwAPAA8ADwANAA0ADgANAA0ADgAPMA0ADQANAA0ADQAMAA94DgANAA0ADQAM6A8ADwAOAA4ADgAPAA8ADwAOABAADtQPAA8ADgANAA8ADQAMAA8ADwANAAwADQANAA0ADQANAAwADwANAA0ADAAODA0ADgAOAA4ADYgNAAzsDQAM8A74DSQPiA4ADgAOAA4ADQANAAkAEAAOjA8ADwAPAA8ADwANAA4ACvQNABAADfwOAAzMDgANAA1ICwAPAA0ADwAOAA0ADwAMAAwADowNIA5ADcANQAuADOwNIA5ADoAOAA6ADbAOhA4QDPAMfA5ADoAOgA3IDoANQAmADgAOJA1ADoANxA3ADQAMPA8ADQAOkA4IDHwMfA6kDCQNwA6AEAAQABAAEAAQAA8ADwAPAA8ADFgLAAsADgAOABAAEAAM9A0AEAANwA1AC4AQAA6ADrwQAA4AEAAPXBAAD5wNHAygEAAOgA6AD+QQABAACYAOABAADgAO0A7sD/wOzAygEAAOABAAD0gOXA5cDUgNtBAADcANQAuAEAAOgA68EAAOABAAD1wQAA+cDPAMoBAADoAOgA/kEAAQAAmADgAQAA4ADtAO7A/8DswMoBAADgAQAA9IDlwOXA1IDbQQAA/8DSANIAAA=") format("truetype");
}
.additional-icons {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.additional-icons:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
.additional-icons li {
  float: left;
  margin: 0;
  padding: 0;
  width: 80px;
  height: 90px;
  text-align: center;
  color: #787878;
}
.button {
    display: block;
    width: 48px;
    height: 48px;
    text-decoration: none;
    color: #333;
    margin: 0 auto;
    font-size: 16px;
    border-radius: 50%;
    border: 1px solid #ebecee;
    background-color: #f5f7f8;
}
.button:after
{
    position: static;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    font: 1em/3em "KendoUI" !important;
}
.k-i-arrow-e:after { content: "\E000"; }
.k-i-arrow-n:after { content: "\E001"; }
.k-i-arrow-s:after { content: "\E002"; }
.k-i-arrow-w:after { content: "\E003"; }
.k-i-arrow-ne:after { content: "\E004"; }
.k-i-arrow-nw:after { content: "\E005"; }
.k-i-arrow-se:after { content: "\E006"; }
.k-i-arrow-sw:after { content: "\E007"; }
.k-i-seek-e:after { content: "\E008"; }
.k-i-seek-n:after { content: "\E009"; }
.k-i-seek-s:after { content: "\E00A"; }
.k-i-seek-w:after { content: "\E00B"; }
.k-si-arrow-e:after { content: "\E00C"; }
.k-si-arrow-n:after { content: "\E00D"; }
.k-si-arrow-s:after { content: "\E00E"; }
.k-si-arrow-w:after { content: "\E00F"; }
.k-i-arrowhead-e:after { content: "\E010"; }
.k-i-arrowhead-n:after { content: "\E011"; }
.k-i-arrowhead-s:after { content: "\E012"; }
.k-i-arrowhead-w:after { content: "\E013"; }
.k-i-arrowhead-ew:after { content: "\E014"; }
.k-i-arrowhead-ns:after { content: "\E015"; }
.k-i-move:after { content: "\E016"; }
.k-i-resize:after { content: "\E017"; }
.k-i-resize-45:after { content: "\E018"; }
.k-i-resize-135:after { content: "\E019"; }
.k-i-resize-h:after { content: "\E01A"; }
.k-i-resize-v:after { content: "\E01B"; }
.k-i-refresh:after { content: "\E01C"; }
.k-i-refresh-rev:after { content: "\E01D"; }
.k-si-refresh:after { content: "\E01E"; }
.k-si-refresh-rev:after { content: "\E01F"; }
.k-i-turn-en:after { content: "\E020"; }
.k-i-turn-es:after { content: "\E021"; }
.k-i-turn-ne:after { content: "\E022"; }
.k-i-turn-nw:after { content: "\E023"; }
.k-i-turn-se:after { content: "\E024"; }
.k-i-turn-sw:after { content: "\E025"; }
.k-i-turn-wn:after { content: "\E026"; }
.k-i-turn-ws:after { content: "\E027"; }
.k-i-uturn-e:after { content: "\E028"; }
.k-i-uturn-e-rev:after { content: "\E029"; }
.k-i-uturn-n:after { content: "\E02A"; }
.k-i-uturn-n-rev:after { content: "\E02B"; }
.k-i-uturn-s:after { content: "\E02C"; }
.k-i-uturn-s-rev:after { content: "\E02D"; }
.k-i-uturn-w:after { content: "\E02E"; }
.k-i-uturn-w-rev:after { content: "\E02F"; }
.k-i-tick-sign:after { content: "\E030"; }
.k-i-close-sign:after { content: "\E031"; }
.k-i-plus-sign:after { content: "\E032"; }
.k-i-minus-sign:after { content: "\E033"; }
.k-si-plus-sign:after { content: "\E034"; }
.k-si-minus-sign:after { content: "\E035"; }
.k-i-cancel:after { content: "\E036"; }
.k-i-tick:after { content: "\E037"; }
.k-i-close:after { content: "\E038"; }
.k-i-plus:after { content: "\E039"; }
.k-i-minus:after { content: "\E03A"; }
.k-si-plus:after { content: "\E03B"; }
.k-si-minus:after { content: "\E03C"; }
.k-i-stop:after { content: "\E03D"; }
.k-i-pause:after { content: "\E03E"; }
.k-i-eject:after { content: "\E03F"; }
.k-i-volume-off:after { content: "\E040"; }
.k-i-volume-low:after { content: "\E041"; }
.k-i-volume-high:after { content: "\E042"; }
.k-i-earphones:after { content: "\E043"; }
.k-i-heart:after { content: "\E044"; }
.k-i-heart-empty:after { content: "\E045"; }
.k-i-heart-half:after { content: "\E046"; }
.k-i-star:after { content: "\E047"; }
.k-i-star-empty:after { content: "\E048"; }
.k-i-star-half:after { content: "\E049"; }
.k-i-star-half-empty:after { content: "\E04A"; }
.k-i-chart-column:after { content: "\E04B"; }
.k-i-chart-bar:after { content: "\E04C"; }
.k-i-chart-pie:after { content: "\E04D"; }
.k-i-chart-donut:after { content: "\E04E"; }
.k-i-chart-line:after { content: "\E04F"; }
.k-i-chart-area:after { content: "\E050"; }
.k-i-chart-donut:after { content: "\E051"; }
.k-i-align-left:after { content: "\E052"; }
.k-i-align-center:after { content: "\E053"; }
.k-i-align-right:after { content: "\E054"; }
.k-i-align-justify:after { content: "\E055"; }
.k-i-align-clear:after { content: "\E056"; }
.k-i-bold:after { content: "\E057"; }
.k-i-bold-sans:after { content: "\E058"; }
.k-i-italic:after { content: "\E059"; }
.k-i-italic-sans:after { content: "\E05A"; }
.k-i-underline:after { content: "\E05B"; }
.k-i-underline-sans:after { content: "\E05C"; }
.k-i-strikethrough:after { content: "\E05D"; }
.k-i-strikethrough-sans:after { content: "\E05E"; }
.k-i-font-a:after { content: "\E05F"; }
.k-i-font-a-sans:after { content: "\E060"; }
.k-i-font-t:after { content: "\E061"; }
.k-i-font-t-sans:after { content: "\E062"; }
.k-i-brightness:after { content: "\E063"; }
.k-i-brightness-contrast:after { content: "\E064"; }
.k-i-contrast:after { content: "\E065"; }
.k-i-crop:after { content: "\E066"; }
.k-i-mirror:after { content: "\E067"; }
.k-i-flip-h:after { content: "\E068"; }
.k-i-flip-v:after { content: "\E069"; }
.k-i-rotate:after { content: "\E06A"; }
.k-i-rotate-rev:after { content: "\E06B"; }
.k-i-filter:after { content: "\E06C"; }
.k-i-filter-clear:after { content: "\E06D"; }
.k-i-sort-asc:after { content: "\E06E"; }
.k-i-sort-desc:after { content: "\E06F"; }
.k-i-sort-clear:after { content: "\E070"; }
.k-i-indent:after { content: "\E071"; }
.k-i-outdent:after { content: "\E072"; }
.k-i-hyperlink:after { content: "\E073"; }
.k-i-hyperlink-clear:after { content: "\E074"; }
.k-i-hyperlink-ext:after { content: "\E075"; }
.k-si-hyperlink-ext:after { content: "\E076"; }
.k-i-ul:after { content: "\E077"; }
.k-si-ul:after { content: "\E078"; }
.k-i-paint:after { content: "\E079"; }
.k-i-paste:after { content: "\E07A"; }
.k-i-pencil:after { content: "\E07B"; }
.k-i-image:after { content: "\E07C"; }
.k-i-image-add:after { content: "\E07D"; }
.k-i-print:after { content: "\E07E"; }
.k-i-zoom:after { content: "\E07F"; }
.k-i-zoom-in:after { content: "\E080"; }
.k-i-zoom-out:after { content: "\E081"; }
.k-i-asterisk:after { content: "\E082"; }
.k-i-clip:after { content: "\E083"; }
.k-i-clip-45:after { content: "\E084"; }
.k-i-qrcode:after { content: "\E085"; }
.k-i-book:after { content: "\E086"; }
.k-i-bookmark:after { content: "\E087"; }
.k-i-briefcase:after { content: "\E088"; }
.k-i-calendar:after { content: "\E089"; }
.k-i-camera-still:after { content: "\E08A"; }
.k-i-camera-video:after { content: "\E08B"; }
.k-i-certificate:after { content: "\E08C"; }
.k-i-clock:after { content: "\E08D"; }
.k-i-cloud:after { content: "\E08E"; }
.k-i-collapse:after { content: "\E08F"; }
.k-i-columns:after { content: "\E090"; }
.k-i-comment:after { content: "\E091"; }
.k-i-comment-empty:after { content: "\E092"; }
.k-i-comments:after { content: "\E093"; }
.k-i-comments-empty:after { content: "\E094"; }
.k-i-credit-card:after { content: "\E095"; }
.k-i-download:after { content: "\E096"; }
.k-i-draghandle:after { content: "\E097"; }
.k-si-draghandle:after { content: "\E098"; }
.k-i-envelop:after { content: "\E099"; }
.k-i-envelop-open:after { content: "\E09A"; }
.k-i-eye:after { content: "\E09B"; }
.k-i-file:after { content: "\E09C"; }
.k-i-file-add:after { content: "\E09D"; }
.k-i-film:after { content: "\E09E"; }
.k-i-flag:after { content: "\E09F"; }
.k-i-folder-add:after { content: "\E0A0"; }
.k-i-folder:after { content: "\E0A1"; }
.k-i-folder-open:after { content: "\E0A2"; }
.k-i-folder-up:after { content: "\E0A3"; }
.k-i-gear:after { content: "\E0A4"; }
.k-si-gear:after { content: "\E0A5"; }
.k-i-transmit:after { content: "\E0A6"; }
.k-i-beer:after { content: "\E0A7"; }
.k-i-cocktail:after { content: "\E0A8"; }
.k-i-coffee:after { content: "\E0A9"; }
.k-i-wine:after { content: "\E0AA"; }
.k-i-grid:after { content: "\E0AB"; }
.k-i-thumbs:after { content: "\E0AC"; }
.k-i-split-h:after { content: "\E0AD"; }
.k-i-split-v:after { content: "\E0AE"; }
.k-i-home:after { content: "\E0AF"; }
.k-i-inbox:after { content: "\E0B0"; }
.k-i-key:after { content: "\E0B1"; }
.k-i-login:after { content: "\E0B2"; }
.k-i-logout:after { content: "\E0B3"; }
.k-i-place:after { content: "\E0B4"; }
.k-i-megaphone:after { content: "\E0B5"; }
.k-i-note:after { content: "\E0B6"; }
.k-i-pin:after { content: "\E0B7"; }
.k-i-unpin:after { content: "\E0B8"; }
.k-i-power:after { content: "\E0B9"; }
.k-i-progress-bars:after { content: "\E0BA"; }
.k-i-road:after { content: "\E0BB"; }
.k-i-rss:after { content: "\E0BC"; }
.k-i-floppy:after { content: "\E0BD"; }
.k-i-sitemap:after { content: "\E0BE"; }
.k-i-tag-45:after { content: "\E0BF"; }
.k-i-tag-h:after { content: "\E0C0"; }
.k-i-thunderbolt:after { content: "\E0C1"; }
.k-i-tooltip:after { content: "\E0C2"; }
.k-i-trash:after { content: "\E0C3"; }
.k-i-trophy:after { content: "\E0C4"; }
.k-i-ungroup:after { content: "\E0C5"; }
.k-i-upload:after { content: "\E0C6"; }
.k-i-window:after { content: "\E0C7"; }
.k-i-tiles:after { content: "\E0C8"; }
.k-i-wrench:after { content: "\E0C9"; }
.k-i-action:after { content: "\E0CA"; }
.k-i-add:after { content: "\E0CB"; }
.k-i-add-inv:after { content: "\E0CC"; }
.k-i-armchair:after { content: "\E0CD"; }
.k-i-battery:after { content: "\E0CE"; }
.k-i-book-open:after { content: "\E0CF"; }
.k-i-camera:after { content: "\E0D0"; }
.k-i-cart:after { content: "\E0D1"; }
.k-i-time:after { content: "\E0D2"; }
.k-i-coffee-card:after { content: "\E0D3"; }
.k-i-download-arrow:after { content: "\E0D4"; }
.k-i-edit:after { content: "\E0D5"; }
.k-i-faves:after { content: "\E0D6"; }
.k-i-star:after { content: "\E0D7"; }
.k-i-featured:after { content: "\E0D8"; }
.k-i-forward:after { content: "\E0D9"; }
.k-i-cog:after { content: "\E0DA"; }
.k-i-globe:after { content: "\E0DB"; }
.k-i-globe-inv:after { content: "\E0DC"; }
.k-i-house:after { content: "\E0DD"; }
.k-i-info:after { content: "\E0DE"; }
.k-i-share:after { content: "\E0DF"; }
.k-i-more-h:after { content: "\E0E0"; }
.k-i-more-v:after { content: "\E0E1"; }
.k-i-next:after { content: "\E0E2"; }
.k-i-pause-a:after { content: "\E0E3"; }
.k-i-user:after { content: "\E0E4"; }
.k-i-play-a:after { content: "\E0E5"; }
.k-i-refresh-a:after { content: "\E0E6"; }
.k-i-reset:after { content: "\E0E7"; }
.k-i-rewind:after { content: "\E0E8"; }
.k-i-search-a:after { content: "\E0E9"; }
.k-i-stop-a:after { content: "\E0EA"; }
.k-i-tiles-a:after { content: "\E0EB"; }
.k-i-trash-a:after { content: "\E0EC"; }
.k-i-undo:after { content: "\E0ED"; }
.k-i-redo:after { content: "\E0EE"; }
.k-i-volume-a:after { content: "\E0EF"; }
.k-i-wifi:after { content: "\E0F0"; }
.k-i-more-lines:after { content: "\E0F1"; }
.k-i-pull-to-ref:after { content: "\E0F2"; }
.k-i-loading-android:after { content: "\E0F3"; }
.k-i-loading-blackberry:after { content: "\E0F4"; }
.k-i-loading-meego:after { content: "\E0F5"; }
.k-i-loading-custom:after { content: "\E0F6"; }
.k-i-loading-ios:after { content: "\E0F7"; }
.k-i-bug:after { content: "\E0F8"; }
.k-i-info:after { content: "\E0F9"; }
.k-i-warning:after { content: "\E0FA"; }
.k-i-question:after { content: "\E0FB"; }
.k-i-insert-n:after { content: "\E0FC"; }
.k-i-insert-m:after { content: "\E0FD"; }
.k-i-insert-s:after { content: "\E0FE"; }
.k-i-lock:after { content: "\E0FF"; }
.k-i-unlock:after { content: "\E100"; }
.k-i-phone:after { content: "\E101"; }
.k-i-tablet:after { content: "\E102"; }
.k-i-ol:after { content: "\E103"; }
.k-i-barcode:after { content: "\E104"; }
.k-i-html5:after { content: "\E105"; }
.k-i-css3:after { content: "\E106"; }
.k-i-kendoui:after { content: "\E107"; }
.k-i-telerik:after { content: "\E108"; }
.k-i-icenium:after { content: "\E109"; }
.k-i-sitefinity:after { content: "\E10A"; }
.k-i-twitter:after { content: "\E10B"; }
.k-i-linkedin:after { content: "\E10C"; }
.k-i-facebook:after { content: "\E10D"; }
.k-i-pinterest:after { content: "\E10E"; }
.k-i-youtube:after { content: "\E10F"; }
.k-i-vimeo:after { content: "\E110"; }
.k-i-behance:after { content: "\E111"; }
.k-i-dribbble:after { content: "\E112"; }
.k-i-googleplus:after { content: "\E113"; }
.k-i-minimize:after { content: "\E114"; }
.k-i-html:after { content: "\E115"; }
.k-i-group:after { content: "\E116"; }
.k-i-subscript:after { content: "\E117"; }
.k-i-superscript:after { content: "\E118"; }
.k-i-drophere:after { content: "\E119"; }
.km-contactadd:after, .km-rowinsert:after { content: "\E039"; }
.km-rowdelete:after { content: "\E03a"; }
.km-detaildisclose:after { content: "\E0E2"; }
.km-action:after { content: "\e0ca"; }
.km-add:after { content: "\e0cb"; }
.km-battery:after { content: "\e0ce"; }
.km-bookmarks:after { content: "\e0cf"; }
.km-camera:after { content: "\e0d0"; }
.km-cart:after { content: "\e0d1"; }
.km-edit:after, .km-compose:after { content: "\e0d5"; }
.km-contacts:after { content: "\e0e4"; }
.km-trash:after, .km-delete:after { content: "\e0ec"; }
.km-details:after { content: "\e0e2"; }
.km-download:after, .km-downloads:after { content: "\e0d4"; }
.km-fastforward:after { content: "\e0d9"; }
.km-toprated:after, .km-favorites:after { content: "\e0d7"; }
.km-featured:after { content: "\e0d8"; }
.km-globe:after { content: "\e0dc"; }
.km-history:after { content: "\e0e7"; }
.km-home:after { content: "\e0dd"; }
.km-info:after, .km-about:after { content: "\e0de"; }
.km-more:after { content: "\e0e0"; }
.km-mostrecent:after { content: "\e0cc"; }
.km-mostviewed:after { content: "\e0d6"; }
.km-organize:after { content: "\e0eb"; }
.km-pause:after { content: "\e0e3"; }
.km-play:after { content: "\e0e5"; }
.km-recents:after { content: "\e0d2"; }
.km-refresh:after { content: "\e0e6"; }
.km-reply:after { content: "\e0ed"; }
.km-rewind:after { content: "\e0e8"; }
.km-search:after { content: "\e0e9"; }
.km-settings:after { content: "\e0da"; }
.km-share:after { content: "\e0df"; }
.km-sounds:after, .km-volume:after { content: "\e0ef"; }
.km-stop:after { content: "\e0ea"; }
.km-wifi:after { content: "\e0f0"; }
.km-phone:after { content: "\e326"; }
.k-ios7-action:after { content: "\E200"; }
.k-ios7-add:after { content: "\E200"; }
.k-ios7-add-inv:after { content: "\E201"; }
.k-ios7-armchair:after { content: "\E202"; }
.k-ios7-battery:after { content: "\E203"; }
.k-ios7-book-open:after { content: "\E204"; }
.k-ios7-camera:after { content: "\E205"; }
.k-ios7-cart:after { content: "\E206"; }
.k-ios7-time:after { content: "\E207"; }
.k-ios7-coffee-card:after { content: "\E208"; }
.k-ios7-download-arrow:after { content: "\E209"; }
.k-ios7-edit:after { content: "\E20A"; }
.k-ios7-faves:after { content: "\E20B"; }
.k-ios7-star:after { content: "\E20C"; }
.k-ios7-featured:after { content: "\E20D"; }
.k-ios7-forward:after { content: "\E20E"; }
.k-ios7-cog:after { content: "\E20F"; }
.k-ios7-globe:after { content: "\E210"; }
.k-ios7-globe-inv:after { content: "\E211"; }
.k-ios7-house:after { content: "\E212"; }
.k-ios7-info:after { content: "\E213"; }
.k-ios7-share:after { content: "\E214"; }
.k-ios7-more-h:after { content: "\E215"; }
.k-ios7-more-v:after { content: "\E216"; }
.k-ios7-next:after { content: "\E217"; }
.k-ios7-pause-a:after { content: "\E218"; }
.k-ios7-user:after { content: "\E219"; }
.k-ios7-play-a:after { content: "\E21A"; }
.k-ios7-refresh-a:after { content: "\E21B"; }
.k-ios7-reset:after { content: "\E21C"; }
.k-ios7-rewind:after { content: "\E21D"; }
.k-ios7-search-a:after { content: "\E21E"; }
.k-ios7-stop-a:after { content: "\E21F"; }
.k-ios7-tiles-a:after { content: "\E220"; }
.k-ios7-trash-a:after { content: "\E221"; }
.k-ios7-undo:after { content: "\E222"; }
.k-ios7-redo:after { content: "\E223"; }
.k-ios7-volume-a:after { content: "\E224"; }
.k-ios7-wifi:after { content: "\E225"; }
.k-ios7-phone:after { content: "\E226"; }
.k-ios7-action-fill:after { content: "\E300"; }
.k-ios7-add-fill:after { content: "\E300"; }
.k-ios7-add-inv-fill:after { content: "\E301"; }
.k-ios7-armchair-fill:after { content: "\E302"; }
.k-ios7-battery-fill:after { content: "\E303"; }
.k-ios7-book-open-fill:after { content: "\E304"; }
.k-ios7-camera-fill:after { content: "\E305"; }
.k-ios7-cart-fill:after { content: "\E306"; }
.k-ios7-time-fill:after { content: "\E307"; }
.k-ios7-coffee-card-fill:after { content: "\E308"; }
.k-ios7-download-arrow-fill:after { content: "\E309"; }
.k-ios7-edit-fill:after { content: "\E30A"; }
.k-ios7-faves-fill:after { content: "\E30B"; }
.k-ios7-star-fill:after { content: "\E30C"; }
.k-ios7-featured-fill:after { content: "\E30D"; }
.k-ios7-forward-fill:after { content: "\E30E"; }
.k-ios7-cog-fill:after { content: "\E30F"; }
.k-ios7-globe-fill:after { content: "\E310"; }
.k-ios7-globe-inv-fill:after { content: "\E311"; }
.k-ios7-house-fill:after { content: "\E312"; }
.k-ios7-info-fill:after { content: "\E313"; }
.k-ios7-share-fill:after { content: "\E314"; }
.k-ios7-more-h-fill:after { content: "\E315"; }
.k-ios7-more-v-fill:after { content: "\E316"; }
.k-ios7-next-fill:after { content: "\E317"; }
.k-ios7-pause-a-fill:after { content: "\E318"; }
.k-ios7-user-fill:after { content: "\E319"; }
.k-ios7-play-a-fill:after { content: "\E31A"; }
.k-ios7-refresh-a-fill:after { content: "\E31B"; }
.k-ios7-reset-fill:after { content: "\E31C"; }
.k-ios7-rewind-fill:after { content: "\E31D"; }
.k-ios7-search-a-fill:after { content: "\E31E"; }
.k-ios7-stop-a-fill:after { content: "\E31F"; }
.k-ios7-tiles-a-fill:after { content: "\E320"; }
.k-ios7-trash-a-fill:after { content: "\E321"; }
.k-ios7-undo-fill:after { content: "\E322"; }
.k-ios7-redo-fill:after { content: "\E323"; }
.k-ios7-volume-a-fill:after { content: "\E324"; }
.k-ios7-wifi-fill:after { content: "\E325"; }
.k-ios7-phone-fill:after { content: "\E326"; }
</style>
<ul class="additional-icons">
    <li><span class="button k-i-arrow-e"></span>\e000</li>
    <li><span class="button k-i-arrow-n"></span>\e001</li>
    <li><span class="button k-i-arrow-s"></span>\e002</li>
    <li><span class="button k-i-arrow-w"></span>\e003</li>
    <li><span class="button k-i-arrow-ne"></span>\e004</li>
    <li><span class="button k-i-arrow-nw"></span>\e005</li>
    <li><span class="button k-i-arrow-se"></span>\e006</li>
    <li><span class="button k-i-arrow-sw"></span>\e007</li>
    <li><span class="button k-i-seek-e"></span>\e008</li>
    <li><span class="button k-i-seek-n"></span>\e009</li>
    <li><span class="button k-i-seek-s"></span>\e00a</li>
    <li><span class="button k-i-seek-w"></span>\e00b</li>
    <li><span class="button k-si-arrow-e"></span>\e00c</li>
    <li><span class="button k-si-arrow-n"></span>\e00d</li>
    <li><span class="button k-si-arrow-s"></span>\e00e</li>
    <li><span class="button k-si-arrow-w"></span>\e00f</li>
    <li><span class="button k-i-arrowhead-e"></span>\e010</li>
    <li><span class="button k-i-arrowhead-n"></span>\e011</li>
    <li><span class="button k-i-arrowhead-s"></span>\e012</li>
    <li><span class="button k-i-arrowhead-w"></span>\e013</li>
    <li><span class="button k-i-arrowhead-ew"></span>\e014</li>
    <li><span class="button k-i-arrowhead-ns"></span>\e015</li>
    <li><span class="button k-i-move"></span>\e016</li>
    <li><span class="button k-i-resize"></span>\e017</li>
    <li><span class="button k-i-resize-45"></span>\e018</li>
    <li><span class="button k-i-resize-135"></span>\e019</li>
    <li><span class="button k-i-resize-h"></span>\e01a</li>
    <li><span class="button k-i-resize-v"></span>\e01b</li>
    <li><span class="button k-i-refresh"></span>\e01c</li>
    <li><span class="button k-i-refresh-rev"></span>\e01d</li>
    <li><span class="button k-si-refresh"></span>\e01e</li>
    <li><span class="button k-si-refresh-rev"></span>\e01f</li>
    <li><span class="button k-i-turn-en"></span>\e020</li>
    <li><span class="button k-i-turn-es"></span>\e021</li>
    <li><span class="button k-i-turn-ne"></span>\e022</li>
    <li><span class="button k-i-turn-nw"></span>\e023</li>
    <li><span class="button k-i-turn-se"></span>\e024</li>
    <li><span class="button k-i-turn-sw"></span>\e025</li>
    <li><span class="button k-i-turn-wn"></span>\e026</li>
    <li><span class="button k-i-turn-ws"></span>\e027</li>
    <li><span class="button k-i-uturn-e"></span>\e028</li>
    <li><span class="button k-i-uturn-e-rev"></span>\e029</li>
    <li><span class="button k-i-uturn-n"></span>\e02a</li>
    <li><span class="button k-i-uturn-n-rev"></span>\e02b</li>
    <li><span class="button k-i-uturn-s"></span>\e02c</li>
    <li><span class="button k-i-uturn-s-rev"></span>\e02d</li>
    <li><span class="button k-i-uturn-w"></span>\e02e</li>
    <li><span class="button k-i-uturn-w-rev"></span>\e02f</li>
    <li><span class="button k-i-tick-sign"></span>\e030</li>
    <li><span class="button k-i-close-sign"></span>\e031</li>
    <li><span class="button k-i-plus-sign"></span>\e032</li>
    <li><span class="button k-i-minus-sign"></span>\e033</li>
    <li><span class="button k-si-plus-sign"></span>\e034</li>
    <li><span class="button k-si-minus-sign"></span>\e035</li>
    <li><span class="button k-i-cancel"></span>\e036</li>
    <li><span class="button k-i-tick"></span>\e037</li>
    <li><span class="button k-i-close"></span>\e038</li>
    <li><span class="button k-i-plus"></span>\e039</li>
    <li><span class="button k-i-minus"></span>\e03a</li>
    <li><span class="button k-si-plus"></span>\e03b</li>
    <li><span class="button k-si-minus"></span>\e03c</li>
    <li><span class="button k-i-stop"></span>\e03d</li>
    <li><span class="button k-i-pause"></span>\e03e</li>
    <li><span class="button k-i-eject"></span>\e03f</li>
    <li><span class="button k-i-volume-off"></span>\e040</li>
    <li><span class="button k-i-volume-low"></span>\e041</li>
    <li><span class="button k-i-volume-high"></span>\e042</li>
    <li><span class="button k-i-earphones"></span>\e043</li>
    <li><span class="button k-i-heart"></span>\e044</li>
    <li><span class="button k-i-heart-empty"></span>\e045</li>
    <li><span class="button k-i-heart-half"></span>\e046</li>
    <li><span class="button k-i-star"></span>\e047</li>
    <li><span class="button k-i-star-empty"></span>\e048</li>
    <li><span class="button k-i-star-half"></span>\e049</li>
    <li><span class="button k-i-star-half-empty"></span>\e04a</li>
    <li><span class="button k-i-chart-column"></span>\e04b</li>
    <li><span class="button k-i-chart-bar"></span>\e04c</li>
    <li><span class="button k-i-chart-pie"></span>\e04d</li>
    <li><span class="button k-i-chart-donut"></span>\e04e</li>
    <li><span class="button k-i-chart-line"></span>\e04f</li>
    <li><span class="button k-i-chart-area"></span>\e050</li>
    <li><span class="button k-i-chart-donut"></span>\e051</li>
    <!--li><span class="button k-i-align-left"></span>\e052</li>
    <li><span class="button k-i-align-center"></span>\e053</li>
    <li><span class="button k-i-align-right"></span>\e054</li>
    <li><span class="button k-i-align-justify"></span>\e055</li>
    <li><span class="button k-i-align-clear"></span>\e056</li-->
    <li><span class="button k-i-bold"></span>\e057</li>
    <li><span class="button k-i-bold-sans"></span>\e058</li>
    <li><span class="button k-i-italic"></span>\e059</li>
    <li><span class="button k-i-italic-sans"></span>\e05a</li>
    <li><span class="button k-i-underline"></span>\e05b</li>
    <li><span class="button k-i-underline-sans"></span>\e05c</li>
    <li><span class="button k-i-strikethrough"></span>\e05d</li>
    <li><span class="button k-i-strikethrough-sans"></span>\e05e</li>
    <li><span class="button k-i-font-a"></span>\e05f</li>
    <li><span class="button k-i-font-a-sans"></span>\e060</li>
    <li><span class="button k-i-font-t"></span>\e061</li>
    <li><span class="button k-i-font-t-sans"></span>\e062</li>
    <li><span class="button k-i-brightness"></span>\e063</li>
    <li><span class="button k-i-brightness-contrast"></span>\e064</li>
    <li><span class="button k-i-contrast"></span>\e065</li>
    <li><span class="button k-i-crop"></span>\e066</li>
    <li><span class="button k-i-mirror"></span>\e067</li>
    <li><span class="button k-i-flip-h"></span>\e068</li>
    <li><span class="button k-i-flip-v"></span>\e069</li>
    <li><span class="button k-i-rotate"></span>\e06a</li>
    <li><span class="button k-i-rotate-rev"></span>\e06b</li>
    <li><span class="button k-i-filter"></span>\e06c</li>
    <li><span class="button k-i-filter-clear"></span>\e06d</li>
    <li><span class="button k-i-sort-asc"></span>\e06e</li>
    <li><span class="button k-i-sort-desc"></span>\e06f</li>
    <li><span class="button k-i-sort-clear"></span>\e070</li>
    <li><span class="button k-i-indent"></span>\e071</li>
    <li><span class="button k-i-outdent"></span>\e072</li>
    <li><span class="button k-i-hyperlink"></span>\e073</li>
    <li><span class="button k-i-hyperlink-clear"></span>\e074</li>
    <li><span class="button k-i-hyperlink-ext"></span>\e075</li>
    <li><span class="button k-si-hyperlink-ext"></span>\e076</li>
    <li><span class="button k-i-ul"></span>\e077</li>
    <li><span class="button k-si-ul"></span>\e078</li>
    <li><span class="button k-i-paint"></span>\e079</li>
    <li><span class="button k-i-paste"></span>\e07a</li>
    <li><span class="button k-i-pencil"></span>\e07b</li>
    <li><span class="button k-i-image"></span>\e07c</li>
    <li><span class="button k-i-image-add"></span>\e07d</li>
    <li><span class="button k-i-print"></span>\e07e</li>
    <li><span class="button k-i-zoom"></span>\e07f</li>
    <li><span class="button k-i-zoom-in"></span>\e080</li>
    <li><span class="button k-i-zoom-out"></span>\e081</li>
    <li><span class="button k-i-asterisk"></span>\e082</li>
    <li><span class="button k-i-clip"></span>\e083</li>
    <li><span class="button k-i-clip-45"></span>\e084</li>
    <li><span class="button k-i-qrcode"></span>\e085</li>
    <li><span class="button k-i-book"></span>\e086</li>
    <li><span class="button k-i-bookmark"></span>\e087</li>
    <li><span class="button k-i-briefcase"></span>\e088</li>
    <li><span class="button k-i-calendar"></span>\e089</li>
    <li><span class="button k-i-camera-still"></span>\e08a</li>
    <li><span class="button k-i-camera-video"></span>\e08b</li>
    <li><span class="button k-i-certificate"></span>\e08c</li>
    <li><span class="button k-i-clock"></span>\e08d</li>
    <li><span class="button k-i-cloud"></span>\e08e</li>
    <li><span class="button k-i-collapse"></span>\e08f</li>
    <li><span class="button k-i-columns"></span>\e090</li>
    <li><span class="button k-i-comment"></span>\e091</li>
    <li><span class="button k-i-comment-empty"></span>\e092</li>
    <li><span class="button k-i-comments"></span>\e093</li>
    <li><span class="button k-i-comments-empty"></span>\e094</li>
    <li><span class="button k-i-credit-card"></span>\e095</li>
    <li><span class="button k-i-download"></span>\e096</li>
    <li><span class="button k-i-draghandle"></span>\e097</li>
    <li><span class="button k-si-draghandle"></span>\e098</li>
    <li><span class="button k-i-envelop"></span>\e099</li>
    <li><span class="button k-i-envelop-open"></span>\e09a</li>
    <li><span class="button k-i-eye"></span>\e09b</li>
    <li><span class="button k-i-file"></span>\e09c</li>
    <li><span class="button k-i-file-add"></span>\e09d</li>
    <li><span class="button k-i-film"></span>\e09e</li>
    <li><span class="button k-i-flag"></span>\e09f</li>
    <li><span class="button k-i-folder-add"></span>\e0a0</li>
    <li><span class="button k-i-folder"></span>\e0a1</li>
    <li><span class="button k-i-folder-open"></span>\e0a2</li>
    <li><span class="button k-i-folder-up"></span>\e0a3</li>
    <li><span class="button k-i-gear"></span>\e0a4</li>
    <li><span class="button k-si-gear"></span>\e0a5</li>
    <li><span class="button k-i-transmit"></span>\e0a6</li>
    <li><span class="button k-i-beer"></span>\e0a7</li>
    <li><span class="button k-i-cocktail"></span>\e0a8</li>
    <li><span class="button k-i-coffee"></span>\e0a9</li>
    <li><span class="button k-i-wine"></span>\e0aa</li>
    <li><span class="button k-i-grid"></span>\e0ab</li>
    <li><span class="button k-i-thumbs"></span>\e0ac</li>
    <li><span class="button k-i-split-h"></span>\e0ad</li>
    <li><span class="button k-i-split-v"></span>\e0ae</li>
    <li><span class="button k-i-home"></span>\e0af</li>
    <li><span class="button k-i-inbox"></span>\e0b0</li>
    <li><span class="button k-i-key"></span>\e0b1</li>
    <li><span class="button k-i-login"></span>\e0b2</li>
    <li><span class="button k-i-logout"></span>\e0b3</li>
    <li><span class="button k-i-place"></span>\e0b4</li>
    <li><span class="button k-i-megaphone"></span>\e0b5</li>
    <li><span class="button k-i-note"></span>\e0b6</li>
    <li><span class="button k-i-pin"></span>\e0b7</li>
    <li><span class="button k-i-unpin"></span>\e0b8</li>
    <li><span class="button k-i-power"></span>\e0b9</li>
    <li><span class="button k-i-progress-bars"></span>\e0ba</li>
    <li><span class="button k-i-road"></span>\e0bb</li>
    <li><span class="button k-i-rss"></span>\e0bc</li>
    <li><span class="button k-i-floppy"></span>\e0bd</li>
    <li><span class="button k-i-sitemap"></span>\e0be</li>
    <li><span class="button k-i-tag-45"></span>\e0bf</li>
    <li><span class="button k-i-tag-h"></span>\e0c0</li>
    <li><span class="button k-i-thunderbolt"></span>\e0c1</li>
    <li><span class="button k-i-tooltip"></span>\e0c2</li>
    <li><span class="button k-i-trash"></span>\e0c3</li>
    <li><span class="button k-i-trophy"></span>\e0c4</li>
    <li><span class="button k-i-ungroup"></span>\e0c5</li>
    <li><span class="button k-i-upload"></span>\e0c6</li>
    <li><span class="button k-i-window"></span>\e0c7</li>
    <li><span class="button k-i-tiles"></span>\e0c8</li>
    <li><span class="button k-i-wrench"></span>\e0c9</li>
    <li><span class="button k-i-action"></span>\e0ca</li>
    <li><span class="button k-i-add"></span>\e0cb</li>
    <li><span class="button k-i-add-inv"></span>\e0cc</li>
    <li><span class="button k-i-armchair"></span>\e0cd</li>
    <li><span class="button k-i-battery"></span>\e0ce</li>
    <li><span class="button k-i-book-open"></span>\e0cf</li>
    <li><span class="button k-i-camera"></span>\e0d0</li>
    <li><span class="button k-i-cart"></span>\e0d1</li>
    <li><span class="button k-i-time"></span>\e0d2</li>
    <li><span class="button k-i-coffee-card"></span>\e0d3</li>
    <li><span class="button k-i-download-arrow"></span>\e0d4</li>
    <li><span class="button k-i-edit"></span>\e0d5</li>
    <li><span class="button k-i-faves"></span>\e0d6</li>
    <li><span class="button k-i-star"></span>\e0d7</li>
    <li><span class="button k-i-featured"></span>\e0d8</li>
    <li><span class="button k-i-forward"></span>\e0d9</li>
    <li><span class="button k-i-cog"></span>\e0da</li>
    <li><span class="button k-i-globe"></span>\e0db</li>
    <li><span class="button k-i-globe-inv"></span>\e0dc</li>
    <li><span class="button k-i-house"></span>\e0dd</li>
    <li><span class="button k-i-info"></span>\e0de</li>
    <li><span class="button k-i-share"></span>\e0df</li>
    <li><span class="button k-i-more-h"></span>\e0e0</li>
    <li><span class="button k-i-more-v"></span>\e0e1</li>
    <li><span class="button k-i-next"></span>\e0e2</li>
    <li><span class="button k-i-pause-a"></span>\e0e3</li>
    <li><span class="button k-i-user"></span>\e0e4</li>
    <li><span class="button k-i-play-a"></span>\e0e5</li>
    <li><span class="button k-i-refresh-a"></span>\e0e6</li>
    <li><span class="button k-i-reset"></span>\e0e7</li>
    <li><span class="button k-i-rewind"></span>\e0e8</li>
    <li><span class="button k-i-search-a"></span>\e0e9</li>
    <li><span class="button k-i-stop-a"></span>\e0ea</li>
    <li><span class="button k-i-tiles-a"></span>\e0eb</li>
    <li><span class="button k-i-trash-a"></span>\e0ec</li>
    <li><span class="button k-i-undo"></span>\e0ed</li>
    <li><span class="button k-i-redo"></span>\e0ee</li>
    <li><span class="button k-i-volume-a"></span>\e0ef</li>
    <li><span class="button k-i-wifi"></span>\e0f0</li>
    <li><span class="button k-i-more-lines"></span>\e0f1</li>
    <li><span class="button k-i-pull-to-ref"></span>\e0f2</li>
    <li><span class="button k-i-loading-android"></span>\e0f3</li>
    <li><span class="button k-i-loading-blackberry"></span>\e0f4</li>
    <li><span class="button k-i-loading-meego"></span>\e0f5</li>
    <li><span class="button k-i-loading-custom"></span>\e0f6</li>
    <li><span class="button k-i-loading-ios"></span>\e0f7</li>
    <li><span class="button k-i-bug"></span>\e0f8</li>
    <li><span class="button k-i-info"></span>\e0f9</li>
    <li><span class="button k-i-warning"></span>\e0fa</li>
    <li><span class="button k-i-question"></span>\e0fb</li>
    <li><span class="button k-i-insert-n"></span>\e0fc</li>
    <li><span class="button k-i-insert-m"></span>\e0fd</li>
    <li><span class="button k-i-insert-s"></span>\e0fe</li>
    <li><span class="button k-i-lock"></span>\e0ff</li>
    <li><span class="button k-i-unlock"></span>\e100</li>
    <li><span class="button k-i-phone"></span>\e101</li>
    <li><span class="button k-i-tablet"></span>\e102</li>
    <li><span class="button k-i-ol"></span>\e103</li>
    <li><span class="button k-i-barcode"></span>\e104</li>
    <li><span class="button k-ios7-add"></span>\e200</li>
    <li><span class="button k-ios7-battery"></span>\e203</li>
    <li><span class="button k-ios7-book-open"></span>\e204</li>
    <li><span class="button k-ios7-camera"></span>\e205</li>
    <li><span class="button k-ios7-cart"></span>\e206</li>
    <li><span class="button k-ios7-time"></span>\e207</li>
    <li><span class="button k-ios7-download-arrow"></span>\e209</li>
    <li><span class="button k-ios7-edit"></span>\e20a</li>
    <li><span class="button k-ios7-faves"></span>\e20b</li>
    <li><span class="button k-ios7-star"></span>\e20c</li>
    <li><span class="button k-ios7-featured"></span>\e20d</li>
    <li><span class="button k-ios7-forward"></span>\e20e</li>
    <li><span class="button k-ios7-cog"></span>\e20f</li>
    <li><span class="button k-ios7-house"></span>\e212</li>
    <li><span class="button k-ios7-info"></span>\e213</li>
    <li><span class="button k-ios7-share"></span>\e214</li>
    <li><span class="button k-ios7-more-h"></span>\e215</li>
    <li><span class="button k-ios7-more-v"></span>\e216</li>
    <li><span class="button k-ios7-next"></span>\e217</li>
    <li><span class="button k-ios7-pause-a"></span>\e218</li>
    <li><span class="button k-ios7-user"></span>\e219</li>
    <li><span class="button k-ios7-play-a"></span>\e21a</li>
    <li><span class="button k-ios7-refresh-a"></span>\e21b</li>
    <li><span class="button k-ios7-reset"></span>\e21c</li>
    <li><span class="button k-ios7-rewind"></span>\e21d</li>
    <li><span class="button k-ios7-search-a"></span>\e21e</li>
    <li><span class="button k-ios7-stop-a"></span>\e21f</li>
    <li><span class="button k-ios7-tiles-a"></span>\e220</li>
    <li><span class="button k-ios7-trash-a"></span>\e221</li>
    <li><span class="button k-ios7-undo"></span>\e222</li>
    <li><span class="button k-ios7-redo"></span>\e223</li>
    <li><span class="button k-ios7-volume-a"></span>\e224</li>
    <li><span class="button k-ios7-wifi"></span>\e225</li>
    <li><span class="button k-ios7-phone"></span>\e226</li>
    <li><span class="button k-ios7-add-fill"></span>\e300</li>
    <li><span class="button k-ios7-battery-fill"></span>\e303</li>
    <li><span class="button k-ios7-book-open-fill"></span>\e304</li>
    <li><span class="button k-ios7-camera-fill"></span>\e305</li>
    <li><span class="button k-ios7-cart-fill"></span>\e306</li>
    <li><span class="button k-ios7-time-fill"></span>\e307</li>
    <li><span class="button k-ios7-download-arrow-fill"></span>\e309</li>
    <li><span class="button k-ios7-edit-fill"></span>\e30a</li>
    <li><span class="button k-ios7-faves-fill"></span>\e30b</li>
    <li><span class="button k-ios7-star-fill"></span>\e30c</li>
    <li><span class="button k-ios7-featured-fill"></span>\e30d</li>
    <li><span class="button k-ios7-forward-fill"></span>\e30e</li>
    <li><span class="button k-ios7-cog-fill"></span>\e30f</li>
    <li><span class="button k-ios7-house-fill"></span>\e312</li>
    <li><span class="button k-ios7-info-fill"></span>\e313</li>
    <li><span class="button k-ios7-share-fill"></span>\e314</li>
    <li><span class="button k-ios7-more-h-fill"></span>\e315</li>
    <li><span class="button k-ios7-more-v-fill"></span>\e316</li>
    <li><span class="button k-ios7-next-fill"></span>\e317</li>
    <li><span class="button k-ios7-pause-a-fill"></span>\e318</li>
    <li><span class="button k-ios7-user-fill"></span>\e319</li>
    <li><span class="button k-ios7-play-a-fill"></span>\e31a</li>
    <li><span class="button k-ios7-refresh-a-fill"></span>\e31b</li>
    <li><span class="button k-ios7-reset-fill"></span>\e31c</li>
    <li><span class="button k-ios7-rewind-fill"></span>\e31d</li>
    <li><span class="button k-ios7-search-a-fill"></span>\e31e</li>
    <li><span class="button k-ios7-stop-a-fill"></span>\e31f</li>
    <li><span class="button k-ios7-tiles-a-fill"></span>\e320</li>
    <li><span class="button k-ios7-trash-a-fill"></span>\e321</li>
    <li><span class="button k-ios7-undo-fill"></span>\e322</li>
    <li><span class="button k-ios7-redo-fill"></span>\e323</li>
    <li><span class="button k-ios7-volume-a-fill"></span>\e324</li>
    <li><span class="button k-ios7-wifi-fill"></span>\e325</li>
    <li><span class="button k-ios7-phone-fill"></span>\e326</li>
</ul>
