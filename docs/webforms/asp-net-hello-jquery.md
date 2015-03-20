---
title: Part 1 - Hello jQuery
page_title: "Tutorial series for HTML5 development with ASP.NET: Hello jQuery"
description: This tutorial for HTML5 development with ASP.NET will help you learn how to install jQuery, then use it with WebForms and IE F12 Developer Tools.
position: 1
---

# Tutorial: HTML5 Development With ASP.NET Part 1, Hello jQuery

This tutorial will walk you through building an HTML5 application in ASP.NET.  In this first tutorial of a 5 part series you will learn

- How to install jQuery
- How to use jQuery with WebForms
- How to use the IE F12 Developer Tools

This module will covers the very basic information that you will need to know
about [jQuery](http://jquery.com/) and how to use it inside of Visual Studio / Internet
Explorer. There are some good tips on things you can do with the [IE Developer Tools](http://msdn.microsoft.com/en-us/library/dd565628.aspx) here as well. Check out the screencast, or skip to the written
summary below.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/6BS-dZMHyKg?rel=0" frameborder="0" width="640"></iframe>

## Written Summary

In this tutorial, you will be building a sample application which takes in a
user's first name and last name, and then returns a greeting. First you will
build the application in typical WebForms fashion, then you will refactor the
application to use [jQuery](http://jquery.com/).

#### Create The Sample Application

Open Visual Studio. All of these examples will use Visual Studio 2010 and .NET
Version 4.0, but remember that the only limiting factor to your HTML5
development is the browser. As long the browser is capable, .NET is capable.

Select **File / New Project** and select the **ASP.NET Web Application** project template.  Name the application "HellojQuery".

![File New Project](/images/webforms/hello-jquery-file-new-project.png)

Open the **Default.aspx** page.  Switch to **Design** view and delete all the
content.  From the toolbox, drag out two **TextBoxes**, a **Button** and a
**Label** control.  In front of the first TextBox, type "First Name: ".
After the first TextBox, put a space and then type "Last Name: ".  Put a
space between the second TextBox and the Button.  Put the label on the
following line by pressing **Enter**.

Name the first TextBox "txtFirstName", the second one "txtLastName".
Name the Button "btnSayHello" and change it's **Text** property to "Say Hello".  Set the Label ID to **lblResult** and clear out the **Text** property.

![Default Design View](/images/webforms/hello-jquery-default-design-view.png)

Double-click the **Say Hello** button to create a new button click event in
the **Default.aspx.cs** file.  Set the label text equal to the string "Hello" concatenated with the **Text** property of **txtFirstName** and the
**Text** property of **txtLastName**.

### btnSayHello Click Event


    protected void btnSayHello_Click(object sender, EventArgs e) {

        lblResult.Text = "Hello " + txtFirstName.Text + " " + txtLastName.Text;

    }


#### Using IE Developer Tools

Press **F5** or the run icon and run the application.  Don't enter in your
name yet or click the button.  Instead, press **F12** to open the IE Developer
Tools.  Switch to the **Network** tab and click the **Start Capturing**
button.

![F12 Developer Tools](/images/webforms/hello-jquery-developer-tools.png)

Refresh the page.  Notice that the **Network** tab now shows three items.  The
first is the **Default.aspx** page that you are looking at.  The second is the
**CSS** file that is referenced in the head of the **Default.aspx** page.  The
last one is the **WebResource.axd** file which contains JavaScript and other
resources for the page as determined by WebForms per the ASP.NET controls that
you choose to use.

Also notice that the method for all three requests is a [GET](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).  This
means that the browser requested three files from the server and did that with
an HTTP [GET](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).  A [GET](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) is commonly used when requesting
information from a server.  By default when you visit a URL, your browser will
do a [GET](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) to retrieve the requested site.

![Network Traffic For A Get](/images/webforms/hello-jquery-network-traffic-get.png)

Now fill the form out in the application with your first name and click the
**Say Hello** button.  The server responds as expected by setting the label
text equal to the first name field plus the last name field.  Have another
look at the network traffic pane.  It looks nearly identical, but the
**Default.aspx** page was retrieved this time with a [POST](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).  This is
because this time the browser sent some data to the server specifically the
values of the first name and last name textboxes.  When browsers send
information to the server and expect a response, this is typically done with a
[POST](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).

![Network Traffic For A Post](/images/webforms/hello-jquery-network-traffic-post.png)

In ASP.NET WebForms, the page posts back to itself, or the same URL. To
inspect the information that was sent to the server, double click on the
[POST](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) method and click on the **Request Body** tab.

![Network Request Body](/images/webforms/hello-jquery-network-request-body.png)

Here you can see that the [_VIEWSTATE](http://msdn.microsoft.com/en-us/library/ms972976.aspx) object was sent back to the server.
If you scroll down far enough, you will find the values of the first and last
name textboxes in the view state object.  What happened is that the browser
did a **POST** to the server requesting the page, but also passing in the
values of the textboxes.  The server event was fired, the HTML in the
**Default.aspx** page was altered and then sent to the browser.

This requires a complete "round trip" to the server.  This means that the
browser has to load up the page all over again.  This is completely
unnecessary (especially in this simple application).

[jQuery](http://jquery.com/) is a simple JavaScript library that allows the developer to
interact with the HTML of the page (amongst many other things) in a very
straight forward way.

#### Add jQuery To The Project

Visual Studio projects actually come with [jQuery](http://jquery.com/) in the **Scripts** folder by default.  However, these [jQuery](http://jquery.com/) and VSDoc files may be out of
date and not connected with a [Nuget](http://msdn.microsoft.com/en-us/library/dd565622) installation.  Delete the [jQuery](http://jquery.com/) files in the **Scripts** folder, including the VSDoc file.

To install [jQuery](http://jquery.com/) from [Nuget](http://msdn.microsoft.com/en-us/library/dd565622.aspx), right-click the project and select
**Add Library Package Reference**.  Select **Online** from the left-hand side
and enter "jquery" in the search box.  Click the **Install** button on the
[jQuery](http://jquery.com/) package.  This will install the VSDoc files as well.  There is no
need to install them separately.

![Nuget jQuery Search](/images/webforms/hello-jquery-nuget-jquery-search.png)

This will put the latest version of [jQuery](http://jquery.com/) in the **Scripts** folder.
There will be 3 files there.

**1. jquery-1.9.1.js** This is the full [jQuery](http://jquery.com/) source file.

**2. jquery-1.9.1.min.js** This is the minified version of [jQuery](http://jquery.com/),
which removes all whitespace and comments, as well as [minifying](http://en.wikipedia.org/wiki/Minification_(programming) the
script to make it as small as possible.  This version is identical to the
first one in every way except that it is unreadable for debugging.  This is
generally the file used when an application is in production.  For
development, use the full [jQuery](http://jquery.com/) version.

**3. jquery-1.9.1-vsdoc.js** This file provides Intellisense inside of
Visual Studio for [jQuery](http://jquery.com/).  As long as this file is named in the same way
as the [jQuery](http://jquery.com/) file, Intellisense will work.

Open up the **Site.Master** page.  Drag the full [jQuery](http://jquery.com/) source into the
**head** of the page, directly below the **link** tag to **Site.css**.  This
will create a new **link** tag pointing to the jQuery-1.9.1.js file.
[JQuery](http://jquery.com/) has now been added to the project.

![jQuery Added To The Master Page](/images/webforms/hello-jquery-jquery-added-to-master.png)

#### Using jQuery Directly In The Browser

Run the application again.  When it comes up, open the developer tools by
selecting **F12**.  Switch to the **Console** tab in the developer tools.  The
console allows a developer to execute arbitrary JavaScript commands at
runtime.  As a test, type **alert("Hello!");** in the console and press enter.

![Alert Hello](/images/webforms/hello-jquery-alert-hello.png)

[jQuery](http://jquery.com/) code can be executed either by calling methods off of the
**jQuery** object, or simply using the **$**. The **$** is commonly known and
recognized as representing [jQuery](http://jquery.com/).

For this project, you should be aware of one important thing that [jQuery](http://jquery.com/)
does, and that's select items out of the [DOM](http://en.wikipedia.org/wiki/Minification).  The [DOM](http://en.wikipedia.org/wiki/Minification) is the
Document Object Model, but you can think of this as just your page.
[jQuery](http://jquery.com/) allows you to select elements out of your page and get or set
different properties on the elements.  [jQuery](http://jquery.com/) has many types of
selectors, but it's important to be very comfortable with the following two
basic types of selectors.

**1. ID Selectors**

This is when you select an element based upon it's unique ID.  Every HTML
element on your page should have a unique ID.  This is done by using a **#** sign.

### Selecting An Element By ID With jQuery


    // gets the firstname textbox
    var txtFirstName = $("#txtFirstName");



**2. Class Selectors**

This is when an element, or a group of elements is selected by the **css**
class.  If you have several elements on a page with the same class, all of
them will be returned.  This is done by using a `.`.

### Selecting Elements By Class With jQuery


    // gets the textboxes with a class of "textbox"
    var textboxes = $(".textbox");



Enter a first and last name in the textboxes in the application before
proceeding.

To select the **First Name** textbox value in this project, remember that you
set the ID earlier in this tutorial to **txtFirstName**.  You then need to
call the [jQuery](http://jquery.com/) [val()](http://api.jquery.com/val/) method to retrieve the text inside of the
textbox.  Enter the following command in the console and press enter.

### Get The Text Of txtFirstName


    // gets the text of the element with the id txtFirstName
    $("#txtFirstName").val();



Notice that the command is echoed out into the Console, but there is no value.
This mistake was made to demonstrate an important feature of ASP.NET WebForms.

![txtFirstName Has No Value](/images/webforms/hello-jquery-txtfirstname-no-value.png)

To debug why this didn't work, click on the white arrow which is the element
selector.  Then go up into the page and click on the textbox that you named
**txtFirstName**.  The HTML tab will open and the element in the page will be
highlighted.  Notice that it's ID is not **txtFirstName**, but rather
**MainContent_txtFirstName**.  This is because the controls were added to a
content container in **Default.aspx**.  In ASP.NET WebForms, controls added to
a parent server control will be prefixed with the parent name.  If parents are
nested within parents, they may have multiple values appended onto the front.
This is to make sure that ID's do in fact remain unique.

![Main Content Prefixed txtFirstName](/images/webforms/hello-jquery-main-content-txt-firstname.png)

Switch back to the **Console** tab and keeping in mind the actual ID of
**txtFirstName** at runtime, enter the following command in the **console.**

### Get The Text Of txtFirstName


    // gets the text of the element with the id txtFirstName
    $("#MainContent_txtFirstName").val();


Notice that the text value of the first name textbox is returned.

![txtFirstName Has A Value](/images/webforms/hello-jquery-txtfirstname-has-value.png)

#### Refactor The Application To Use jQuery

Given the fact that you can select any element in the page, and get or set its
value, switch back to Visual Studio and open up the **Default.aspx** file.
Right above the closing `</asp:Content>` tag, open a new script block.  You
do not have to specify the type of the script block.  All script blocks are
assumed to be JavaScript unless otherwise specified.

### Open A New Script Block


    <script>
        // ... JavaScript will go here
    </script>



**Document Ready**

Another important concept to understand in jQuery is the [Document Ready](http://api.jquery.com/ready/) function.  This is a function that jQuery will execute when the
page has finished loading.  This is important as you don't want to execute any
code until all libraries, CSS and HTML elements have been loaded into the
page.

The shorthand for this function is to declare a function, wrap that function
in parenthesis and put the jQuery **$** at the front.  This should be
committed to memory as it is used quite frequently in jQuery powered
applications.

### Create A Document Ready Function


    <script>

        $(function() {
        	// no code here will be executed until the page has
        	// finished loading
        });

    </script>


Before writing any code in the [Document Ready](http://api.jquery.com/ready/), a slight
modification is needed in the HTML.  All the contents inside of **Default.aspx** are ultimately rendered inside a **Form** tag that is in the Master page.
This means that any button click will cause the page to post back or rather,
submits the page to the server.  This is the round trip that we are attempting
eliminate.  Remove the **Button** markup and replace it with plain HTML that
renders an input with a type of button.  This will display a button, but its
click will not cause the form to post.

### Replace ASP Button Control With Standard Input


    <!-- Replace This -->
    <asp:Button ID="btnSayHello" runat="server" onclick="btnSayHello_Click" Text="Say Hello" />


    <!-- With This -->
    <input type="button" id="btnSayHello" value="Say Hello" />



In order to create a new click event for the input button, select the button
with [jQuery](http://jquery.com/) and then specify its **click** event.  When the click event
is specified, a function is passed in that will be executed when the button
click actually occurs.  Notice that it is unnecessary to prefix the new button
with **MainContent**, because while it is in fact in an ASP.NET Content Area,
it is not a server control and consequently its ID will not be modified at
runtime.

### Create A Click Event For The New Button


    <script>

        $(function() {

        	$("#btnSayHello").click(function() {

	            // all code here will be executed when
	            // btnSayHello is clicked

	        });

        });

    </script>


Select both the first name and last name textboxes and store their values in
variables.  Lastly, the **lblResult** control renders as a `<span>`  tag at
runtime.  In order to set the text that's rendered inside of the span tag,
select the **lblResult** control with [jQuery](http://jquery.com/) and set its **html** property.

### The Full Click Event Code


    <script>

        $(function() {


        	$("#btnSayHello").click(function() {

	            // get the values of the first and last name textboxes
	            var firstName = $("#MainContent_txtFirstName").val();
	            var lastName = $("#MainContent_txtLastName").val();

	            // set the text of the label
	            $("#MainContent_lblResult").html("Hello " + firstName + " " + lastName);

	        });

        });

    </script>


Run the application.  Enter in a first name and last name value.  Click the
button and notice that the value of the label is updated, but the page never
posts back to the server.  All manipulation happens client side.

### Further Reading / Resources

If you wish to become very knowledgeable about [jQuery](http://jquery.com/), it is highly
recommended that you go through the [30 Days To Learn jQuery](http://tutsplus.com/course/30-days-to-learn-jquery/) course on [TutsPlus](http://tutsplus.com/).  After finishing this set of learning screencasts for
[jQuery](http://jquery.com/), you should not only be extremely comfortable with the library,
but you will have vastly accelerated your skills in overall HTML5 development.

Code from this module can be downloaded from the course [GitHub repository](https://github.com/telerik/html5-dev-for-aspnet-devs).
