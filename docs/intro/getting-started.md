---
title: Getting Started with Kendo UI
page_title: HTML5, jQuery-based framework, getting started | Kendo UI
description: "Ways to get Kendo UI started: download and host Kendo UI in your project, install Kendo UI as a bower package, or use the Kendo UI CDN service. Customize your Kendo UI experience"
position: 2
---

# Getting Started with Kendo UI

In this section you will be presented with alternative ways to get your Kendo UI started and also with an array of possibilities to customize your Kendo UI package. This information is detailed in the following chapters below:  

* [Host Kendo UI in Your Project](...)
* [Install Kendo UI As a Bower Package](...)
* [Use the Kendo UI CDN Service](...)
* [Customize Your Kendo UI Experience](..)

## Host Kendo UI in Your Project

### Step 1: Download Kendo UI

You can download all Kendo UI bundles from the [download page](http://www.telerik.com/download/kendo-ui).

The downloaded Kendo UI distribution package consists of the following folders and files:

* The `/examples` folder contains the quick start demo files
* The `/js` folder contains the minified JavaScript files 
* The `/src` folder contains the source code files. It is not available in the Kendo UI trial version.
* The `/styles` folder contains the minified CSS files and theme images
* The `/wrappers` folder contains the server-side wrappers. It is only necessary for and available in Telerik UI for ASP.NET MVC, JSP or PHP distributions.
* The `changelog.html` folder contains the Kendo UI release notes

### Step 2: Add CSS and JavaScript References to Your Project

To use Kendo UI in your project, you need to include the required JavaScript and CSS files.

1. Extract the `/js` and `/styles` directories from the bundle archive and copy them to your web application root directory.
2. Include the Kendo UI JavaScript and CSS files in the `head` tag of your HTML document. Make sure the common CSS file is registered before the theme CSS file.

        <!DOCTYPE html>
        <html>
        	<head>
	            <title>Welcome to Kendo UI!</title>
	            <!-- Common Kendo UI CSS for web and dataviz widgets -->
	            <link href="styles/kendo.common.min.css" rel="stylesheet" />

	            <!-- Default Kendo UI theme CSS for web and dataviz widgets -->
	            <link href="styles/kendo.default.min.css" rel="stylesheet" />

	            <!-- (optional) Kendo UI Mobile CSS, include only if you will use the mobile devices features -->
	            <link href="styles/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />

	            <!-- jQuery JavaScript -->
	            <script src="js/jquery.min.js"></script>

	            <!-- Kendo UI combined JavaScript -->
	            <script src="js/kendo.all.min.js"></script>
	        </head>
        	<body>
            	Hello World!
        	</body>
        </html>

	> The rest of the code examples assume that the Kendo UI scripts and stylesheets are present in the document.  

3. Initialize a Kendo UI Widget (the DataPicker widget in the example):

        <!-- HTML element from which the DatePicker would be initialized -->
        <input id="datepicker" />
        <script>
        $(function() {
            // Initialize the Kendo DatePicker by calling the kendoDatePicker jQuery plugin
            $("#datepicker").kendoDatePicker();
        });
        </script>

	Here is the complete example:

    	<!DOCTYPE html>
    	<html>
        	<head>
	            <title>Welcome to Kendo UI!</title>
	            <link href="styles/kendo.common.min.css" rel="stylesheet" />
	            <link href="styles/kendo.default.min.css" rel="stylesheet" />
	            <script src="js/jquery.min.js"></script>
	            <script src="js/kendo.all.min.js"></script>
	        </head>
	        <body>
	            <input id="datepicker" />
	            <script>
	                $(function() {
                    $("#datepicker").kendoDatePicker();
	                });
	            </script>
	        </body>
	    </html>

## Install Kendo UI As a Kendo UI Core or Kendo UI Professional Bower Package

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains two bower packages--Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them. 

> The professional bower package is available only for licensed user accounts. It is not accessible for trial accounts. For the list of Kendo UI widgets and frameworks supported by the Kendo UI Core and the Kendo UI Professional bundles, refer to the [Bundle Support for Kendo UI Widgets and Frameworks](...)

### Install Kendo UI Core Bower Package

The Kendo UI Core Bower package is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the bower registry.

	sh bower install kendo-ui-core

### Install Kendo UI Professional Bower Package

The Kendo UI Professional Bower Package is hosted as a [private GitHub repository](https://bower.telerik.com). To access it, you need an active account for !!!Telerik Platform. Bower will prompt for your username and password during the installation and update processes.

!!!This is the ...
	sh bower install https://bower.telerik.com/bower-kendo-ui.git

You can also add the package to the `bower.json` file:

	json
	"dependencies": {
    	"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~2014.3.1425"
	}

> During the installation of the Bower package, you may be requested to confirm your credentials more than once. For further information, refer to [Storing Repository Credentials](...) below.

### Storing Your Repository Credentials

**Option 1:** In order to avoid retyping your credentials, you may cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php). 

**Option 2:** A secure alternative to do the same is to use the GitHub credential helpers. Refer to [Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github) to follow the discussion on the topic.

#### Store Your Credentials on Windows

> Caching your credentials is required if you use the Kendo UI Bower Package in an ASP.NET vNext project.

1. Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`).
2. Declare a HOME environment variable:

		C:\> SETX HOME %USERPROFILE%
   
3. Add the credentials using the format listed above.

GitHub might have problems resolving your home directory if it contains spaces in its path (e.g. `c:\Documents and Settings\jane`). Therefore, update your `%HOME%` environment variable to point to a directory having no spaces in its name.

#### Store Your Credentials on Linux, OS X and Unix-Like Systems

1. Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

    	sh
    	touch ~/.netrc
    	chmod 0600 ~/.netrc
    
2. Add your credentials to the `~/.netrc` file using the format listed in the example below:
		
		machine bower.telerik.com
        login my-telerik.identity@example.com
        password mysecret

#### Troubleshooting

**Issue 1:** Bower on Windows has troubles installing the repository showing the error message `fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate`. 

**Cause:** The cause of this issue is the underlying GitHub installation is missing the certificate bundle.  

**Fix:** To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> 1.9.5 GitHub build will not work with the Bower package.

## Use the Kendo UI CDN Service

The Kendo UI CDN is hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/). In order to access the Kendo UI CDN Service, you can use either of the options described below. 

### Through the HTTP Protocol

The minified versions of all JavaScript files are available via the following URLs:
<http://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js>  
<http://kendo.cdn.telerik.com/VERSION/styles/FILENAME.min.css>

For example, the 2014.1.318 version can be loaded from:  
<http://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js>  
<http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css>  

Use the following URL to load the minified Kendo UI Core script (available since Q1 2014 SP1):
<http://kendo.cdn.telerik.com/2014.1.416/js/kendo.ui.core.min.js> 

>The <http://cdn.kendostatic.com> URL will remain active, but is no longer recommended for new projects.   

### Through the HTTPS Protocol

To access the Kendo UI CDN service through the HTTPS protocol, use the same host name as above, only replacing the scheme (protocol) with `https`:  
<https://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js>

>The <https://da7xgjtj801h2.cloudfront.net> URL will remain active, but are no longer recommended for new projects.  

### Troubleshooting

**Issue 1:** Disruption and connection problems  
Although the Amazon CloudFront service provides for a reliable level of uptime support, you may encounter disruption or connection troubles. After you have checked the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and is operating normally.   

**Cause:** You could be experiencing Internet or network connectivity problems, or DNS problems, or it is possible that firewalls, antivirus or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on-the-fly.

**Fix:** Contact your system administrator, as remote investigation of connection problems is outside the scope of Kendo UI support. 

**Issue 2:** How to refer Kendo UI From CDN With a Local Script Fallback

**Cause:** Kendo UI internal builds are not uploaded on CDN, because they are intended only for clients with a commercial license. Only major releases and service packs are uploaded on the Kendo UI CDN.  

**Fix:** You should use a private CDN for internal builds. It is recommendable to implement a local fallback when using any kind of CDN in the way displayed here:  

    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Kendo UI</title>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2014.1.318/styles/kendo.blueopal.min.css" />

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/jquery.min.js"></script>
        <script>
            if (typeof jQuery == "undefined") {
                // fallback to local jQuery
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/jquery.min.js" %3E%3C/script%3E'));
            }
        </script>

        <script src="http://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min.js"></script>
        <script>
            if (typeof kendo == "undefined") {
                // checking for loaded CSS files is cumbersome,
                // that's why we assume that if the scripts have failed, so have the stylesheets

                // fallback to local Kendo UI stylesheets
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.common.min.css" %3C/%3E'));
                document.write(decodeURIComponent('%3Clink rel="stylesheet" href="/path/to/local/kendo.blueopal.min.css" %3C/%3E'));

                // fallback to local Kendo UI scripts
                document.write(decodeURIComponent('%3Cscript src="/path/to/local/kendo.all.min.js" %3E%3C/script%3E'));
                // also add kendo.aspnetmvc.min.js or kendo.timezones.min.js, if needed
            }
        </script>
    </head>
    <body>
        Hello world!
    </body>
    </html>

> You will be able to find more information on the topic at [Scott HanselMann - Fallback from CDN to Local Scripts](http://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx).


