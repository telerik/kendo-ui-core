---
title: Introduction
---

## Downloading and Installing Telerik UI for JSP

The distribution files contain the following:

*   **\js** - Kendo UI minified JavaScript files.
*   **\styles** - Kendo UI minified CSS files and background images used by the themes.
*   **\wrappers\jsp\kendo-taglib** - Telerik UI for JSP jar files.
*   **\wrappers\jsp\spring-demos** - a sample JSP Spring MVC application.

## Running the sample application

#### Requirements

*   JDK 1.7
*   Eclipse Juno for Enterprise Developers (J2EE support)
*   Maven support for Eclipse - m2e
*   Configured server (tested with Tomcat 7)

![servers dialog](/images/servers.png)

You can find a sample JSP Spring MVC application in the **\wrappers\jsp\spring-demos** folder.

#### Steps to run the project

1.  Extract the Telerik UI for JSP zip file to some location.
2.  Start Eclipse.
3.  Right-click in Eclipse Project Explorer. Pick "Import".
4.  Choose "Existing Maven Projects". Click "Next". If you don't see that option make sure your Eclipse has Maven support installed.
5.  Browse to the location where you extracted Telerik UI for JSP. Then pick "wrappers\jsp\spring-demos" for "Root Directory". Click "Finish".
6.  Right-click "spring-demos" in Eclipse Project Explorer. Pick "Properties".
7.  In the properties window pick "Project Facets".
8.  Click "Convert to facetted form..."
9.  From the "Project Facets" menu select "Dynamic Web Module".

![facet dialog](/images/facet.png)

10. Click the "Runtimes" tab. Pick a runtime (Tomcat 7 for example).

![runtime dialog](/images/runtime.png)

11. Click "Further configuration available...". Type "src/main/webapp" in "Content directory". Press "OK".

![content dialog](/images/content.png)

12. Press "OK" to close the "Properties" window.
13. Right-click "spring-demos" in Eclipse Project Explorer. Pick "Properties" again.
14. Click "Deployment Assembly". Press the "Add" button.
15. Pick "Java Build Path Entries". Press "Next".
16. Select "Maven Dependencies". Click "Finish" and then "OK" to close the "Properties" dialog.

![deploy dialog](/images/deploy.png)

17. The demo application should be ready to run!

## Using Kendo UI in JSP application

1.  Create a new **"Dynamic Web Project"** from Eclipse or open an existing one.

2.  Add **\wrappers\jsp\kendo-taglib\kendo-taglib-[version].jar** to project's **/WebContent/WEB-INF/lib folder**.

3.  Copy the Kendo UI JavaScript files from the **\js** folder of the installation to the **WebContent/resources/js** folder of your application.
If you want to use CDN skip steps 3, 4 and 5 and check the [Using CDN](#using-cdn) section.

4.  Copy the Kendo UI CSS files and folders from the **\styles** folder of the installation to the **WebContent/resources/styles** folder of your application. If you want to use only one theme
copy **kendo.common.min.css**, the theme file (e.g. **kendo.default.min.css**), the theme folder (e.g. **Default**) and the **textures** folder.

5. Add a JSP page.
    *   Right-mouse click on WebContent folder
    *   Select New -> JSP file
    *   Enter file name and click Finish

6.  Configure your page to include the Kendo UI Web JavaScript and CSS files to the page:

        <link href="resources/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
        <script src="resources/js/jquery.min.js"></script>
        <script src="resources/js/kendo.web.min.js"></script>

7.  Configure your page to include the Kendo UI DataViz JavaScript and CSS files. **Important**: If you want to use Kendo UI Web and DataViz at the same time you should include **kendo.all.min.js** instead of **kendo.web.min.js** and **kendo.dataviz.min.js**. You
    can also create a custom JavaScript file using the [Custom Download Builder](http://www.telerik.com/download/custom-download).

        <link href="resources/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/styles/kendo.dataviz.min.css" rel="stylesheet" type="text/css" />
        <link href="resources/styles/kendo.dataviz.default.min.css" rel="stylesheet" type="text/css" />

        <script src="resources/js/jquery.min.js"></script>
        <script src="resources/js/kendo.dataviz.min.js"></script>

9.  Add taglib mapping to the kendo tags

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

10.  Use any Kendo UI HtmlHelper extension:

        <kendo:datePicker name="datePicker"></kendo:datePicker>

### Using CDN

You can include the JavaScript and CSS files from CDN. Don't forget to specify the version (e.g. 2012.2.710)

    <link href="http://cdn.kendostatic.com/<version>/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="http://cdn.kendostatic.com/<version>/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <!-- jQuery is not hosted on Kendo CDN - include from another location -->
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://cdn.kendostatic.com/<version>/js/kendo.web.min.js"></script>

## Next Steps

You can watch the videos in the [Kendo UI YouTube channel](http://www.youtube.com/kendouitv):

1. [Getting Started With Telerik UI for JSP - Episode 1](http://www.youtube.com/watch?v=3VH75XVhLCI)
1. [Getting Started With Telerik UI for JSP - Episode 2](http://www.youtube.com/watch?v=LyGHeRMmq5I)
1. [Getting Started With Telerik UI for JSP - Episode 3](http://www.youtube.com/watch?v=sCwqj_ZRGI8)
1. [Getting Started With Telerik UI for JSP - Episode 4](http://www.youtube.com/watch?v=fcbw4YR4P2I)
