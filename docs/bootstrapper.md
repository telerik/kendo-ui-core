---
title: Kendo UI Bootstrapper Tool
page_title: Kendo UI Bootstrapper Tool
position: 250
---

# Getting Started with the Kendo UI Bootstrapper

## What Is The Kendo UI Bootstrapper

The Kendo UI Bootstrapper is a free and open source tool designed to enhance your development workflow with Kendo UI by taking care of code linting,
static analysis, minification, bundling and easy access to documentation.  It is not an IDE.  It is not intended for you to use to edit code.
It exists to augment your current IDE by taking care of many of the more advanced and manual tasks of application development that your IDE may not handle out of the box.

### Video Overview

<iframe height="360" src="http://www.youtube.com/embed/MumyCDUYfQk?rel=0" frameborder="0" width="640"></iframe>

## Installation

### Bootstrapper Prerequisites

* [NodeJS v0.10+](http://nodejs.org/)
* [Google Chrome](https://www.google.com/intl/en/chrome/browser/)

### Download

#### GitHub Download

The Kendo UI Bootstrapper **requires NodeJS and Google Chrome** to run.  Once you have installed both of these dependencies, you can [download the latest version of the Bootstrapper from the Github repository](https://github.com/kendo-labs/kendo-bootstrapper/releases).

#### GitHub Clone

You can also install the Bootstrapper directly from GitHub by cloning the repo to a directory on your computer.

    git clone git@github.com:kendo-labs/kendo-bootstrapper.git

### Setup

The Bootstrapper depends on some NodeJS libraries that you will need to install.  Change to the directory where you unpacked or cloned the Bootstrapper, and install the necessary dependencies using Npm.

    cd kendo-bootstrapper
    npm install

Depending on your setup, you may have to install the packages as sudo `sudo npm install`.

### Running

You can start the Bootstrapper from the command line by having node run the `start.js` file from the `bin` directory.

    node bin/start.js

The Kendo UI Bootstrapper should now be up and running.  The first thing that it will want to know is where your Kendo UI source files are.  It's going to use this distribution to scaffold new projects, as well as know which files to provide to you during a build.  You have to provide this to continue on.

![Bootstrapper First Launch](/images/bootstrapper1.jpeg)

## Creating A Project

As mentioned, the Bootstrapper is not an IDE.  This means that you continue to use your existing IDE and the Bootstrapper augments your workflow.  Let's take a look at how that works.

Create a new project by clicking on the `+` icon in the "Projects" sidebar menu, and call it "GettingStarted".

![Create A New Project](/images/bootstrapper2.jpeg)

By default, the Bootstrapper puts all of your projects into a `PROJECTS` folder in the root of the Bootstrapper install location.  You also have the option to specify a [RequireJS](http://blogs.telerik.com/kendoui/posts/13-05-08/requirejs-fundamentals) project configuration if you want.  For now, leave that box unchecked.

The Bootstrapper will now scaffold you a simple project.  You can see the different project files in the main area of the Bootstrapper.  The files in your project are divided up into two types, **Project Files** and **Library Files**.  The **Project Files** are those which comprise the code that you are writing.  The **Library Files** are those third party libraries that you are using with your project.  Even if you don't have the library  files included in your HTML pages, the Bootstrapper will detect them and show them here if they exist in your project.

![Project Files vs Library Files](/images/bootstrapper3.jpeg)

You can preview the simple application that the Bootstrapper provided you with by clicking on the `Preview` button.  This will launch your application in a new Chrome window.

![Preview Button](/images/bootstrapper4.jpeg)

![Application Preview](/images/bootstrapper5.jpeg)

The Bootstrapper will automatically refresh changes to your app in the preview window, so you're free to keep it open as you work on your app.

The application is simple and contains just a [Kendo UI Window](http://demos.telerik.com/kendo-ui/web/window/index.html) widget as part of the scaffold. It's time to start editing this application.

### Editing

You can see how the Bootstrapper makes it dead simple to fire up a brand new Kendo UI Application.  It's not an IDE though, so now is the time to pick your favorite editor, and open the folder where the files are contained.  Sublime Text 2 will be used for demonstration purposes in this post.  You can inspect your project structure in your IDE.  Let's first look at the `index.html` page.

    <!DOCTYPE html>
    <html>
      <head>

        <title>GettingStarted</title>

        <!--KENDO_BOOTSTRAPPER:FILES-->
          <!-- Do not remove this section.  Here the bootstrapper will add code
            that loads the page assets.  The following <script> is only present
            in development. -->
          <script src="http://localhost:7569/@load-assets/GettingStarted/index.html"></script>
        <!--/KENDO_BOOTSTRAPPER:FILES-->

      </head>

      <body>

        <div style="display: none">
          <div id="hello-world-window">
            <h2>GettingStarted</h2>
            <p>
              This is a Kendo UI Window widget.
            </p>
          </div>
        </div>

      </body>
    </html>

You will notice that the Bootstrapper has reserved a section of the page in the `head`.  This is where the Bootstrapper is going to dynamically place all your CSS and JavaScript includes.  For now, take note that there is a `div` called "hello-world-window".  Open the `app.js` file in the `js` folder.  Here you will see the code that actually creates, launches the window and handles the callback when the window is dismissed.

Go ahead and remove all the code in the `app.js` file.  Also remove everything in the body of the `index.html` page.  Now copy in this new bit of markup to `index.html`.

    <div id="listview"></div>
    <script type="text/x-kendo-template" id="template">
        <img class="thumbnail" src="#: images.thumbnail.url #" alt="">
    </script>

Open up the `app.js` file and replace all the JavaScript with this snippet.

    $(function() {
      $("#listview").kendoListView({
        template: $("#template").html(),
        datasource: {
          transport: {
            read: {
               url: "https://api.instagram.com/v1/media/popular?client_id=4e0171f9fcfc4015bb6300ed91fbf719&count=25",
                dataType: "jsonp"
            }
          },
          schema: {
            data: "data"
          }
        }
      })
    });

### Automatic Updates

If you go back to your preview window now, you will see that it's empty.  The preview window will update in realtime as you save files.  There is no need to refresh or go back to the Bootstrapper.  However, the code that you have copied and pasted from the internet is broken.  It's very subtly broken.  The Bootstrapper includes a few tools to help you figure this out.

### Bootstrapper Code Tools

The Bootstrapper will lint your JavaScript for you using [JSHint](http://blogs.telerik.com/kendoui/posts/13-07-09/protecting-your-mellow-with-javascript-linters).  If you lint the code that you just copied, you will get one error.

![JSHint Button](/images/bootstrapper6.jpeg)

![JSHint Output](/images/bootstrapper7.jpeg)

Oops.  That's not a deal breaker, but lets correct it.

![Bootstrapper Console Output](/images/bootstrapper9.jpeg)

The Bootstrapper tells you the file and row where the error is.  If you dismiss the window, you will see the error in the console.

![Bootstrapper Console Output](/images/bootstrapper8.jpeg)

The preview window is still empty.  There is still a problem with the code, but now it's not a JavaScript error, it's a Kendo UI configuration error.  The Bootstrapper also ships with the [Kendo Linter](https://github.com/kendo-labs/kendo-lint).  This tool is much like JSHint, but it is specific to Kendo UI.  It's job is to inspect and warn you about invalid widget configuration.  From the Bootstrapper, click the Kendo Lint button.

![Kendo Linter Button](/images/bootstrapper10.jpeg)

![Kendo Linter Output](/images/bootstrapper11.jpeg)

The Kendo Linter is telling us that the option that was specified as `datasource` is invalid.  You can now consult the documentation inside of the Bootstrapper to find the ListView.

![Filter Documentation Sidebar](/images/bootstrapper12.jpeg)

You can see from the documentation that it should be `dataSource`, not `datasource`.

![dataSource with an uppercase S](/images/bootstrapper13.jpeg)

Make that fix in the code and then return to the preview window.  You should see the most popular pictures from Instagram returned.

### Realtime Style Updates

While the Bootstrapper refreshes the page for JavaScript and HTML changes, it applies CSS changes in realtime without a refresh.  In the `app.less` file, remove the body style to make the entire app white.  Once you save, the style is applied.  Also notice that the LESS file is being compiled to CSS automatically for you.  Add in the following style to put an outline around the pictures.  If you put your editor on one side of the screen and the preview window on the other, you will see it update immediately.

    .thumbnail {
      padding: 5px;
      background-color: #96CEB4;
      border-radius: 5px;
      margin: 5px;
    }

![Finished Demo App](/images/bootstrapper14.jpeg)

## Ready For Production

Now the application is ready to be deployed.  The Kendo UI Bootstrapper is well equipped to help you out here.

### Compile

Right now, the Bootstrapper is serving up the LESS file and letting the browser compile it.  We want the Bootstrapper to do that, so hit the Compile button.

![Compile LESS And CoffeeScript Files](/images/bootstrapper15.jpeg)

The LESS file is compiled to CSS.  The Bootstrapper is additionally capable of compiling JavaScript files.

### Build Kendo

You may notice that you are currently using the entire `kendo.web.js` file.  That file contains all the widgets and it's quite large.

![Kendo UI Web Is Large](/images/bootstrapper16.jpeg)

It's entirely unnecessary to have all of Kendo UI in an application that is only using one widget.  Really you just want the ListView and any other files it depends on.  The problem is that you don't know what files the ListView depends on, and it's kind of a pain to go hunt all of them down and copy and paste them in, hoping to get them in the right order.

The Bootstrapper now takes care of all of this for you.  Simply click the Build Kendo button.

![Build Kendo](/images/bootstrapper18.jpeg)

The Bootstrapper will now walk your application and automatically determine what files you need.  It creates a custom build for you based on what widgets your application is actually using.  You can optionally include other files in this window as well by checking them.

![Bootstrapper Determines Dependencies](/images/bootstrapper19.jpeg)

The resulting build is only 118K, which is roughly 6 times smaller.

### Bundle

The last step in a build process is usually to bundle all of the JavaScript and CSS up for delivery by Uglifying it, and then concatenating it together in one file.  The Bootstrapper does this with the Bundle button.

![Bundling Minifies and Concatenates Files](/images/bootstrapper20.jpeg)

The resulting output is a zip file containing your project, ready for deployment to production.

## Other Features

The Kendo UI Bootstrapper also has other features like the ability to open your IDE of choice by clicking the edit icon next to a file.  You can simply preview any file by clicking on it.  You can even open the Bootstrapper on an existing project.  The Bootstrapper also has support for RequireJS and RequireJS builds which it will handle for you automatically.
