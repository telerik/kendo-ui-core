---
title: Install Kendo UI as a Bower Package
page_title: Install Kendo UI as a Bower Package
description: "bower package, install Kendo UI Professional, install Kendo UI Core"
previous_url: /install/bower
position: 2
---

# Install Kendo UI as a Bower Package

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains 2 bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

> Kendo UI Professional bower package is available for licensed user accounts only. Check out the [list of Kendo UI components and their bundle support](/intro/supporting/list-of-widgets).

#### Option 1: Install Kendo UI Core Bower Package

The Kendo UI Core Bower package is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the bower registry:

```sh
bower install kendo-ui-core
```

#### Option 2: Install Kendo UI Professional Bower Package

The Kendo UI Professional Bower Package is hosted as a [private GitHub repository](https://bower.telerik.com). To access it, you need an active account for Telerik Platform. Bower will prompt for your username and password during the installation and update processes:

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package to the `bower.json` file:

```json
"dependencies": {
"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~2014.3.1425"
}
```

> During the installation of the Bower package, you may be requested to confirm your credentials more than once. For further information, refer to the Storing Repository Credentials section below.

#### Storing Your Repository Credentials

**Option 1:** In order to avoid retyping your credentials, you may cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2:** A secure alternative to do the same is to use the GitHub credential helpers. Refer to [Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github) to follow the discussion on the topic.

##### Store Your Credentials on Windows

> Caching your credentials is required if you use the Kendo UI Bower Package in an ASP.NET vNext project.

**Step 1:** Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`)  
**Step 2:** Declare a `HOME` environment variable:

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3:** Add the credentials using the format listed above.

GitHub might have problems resolving your home directory if it contains spaces in its path (e.g. `c:\Documents and Settings\jane`). Therefore, update your `%HOME%` environment variable to point to a directory having no spaces in its name.

##### Store Your Credentials on Linux, OS X and Unix-Like Systems

**Step 1:** Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

```sh
touch ~/.netrc
chmod 0600 ~/.netrc
```

**Step 2:** Add your credentials to the `~/.netrc` file using the format listed in the example below:

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

##### Troubleshooting

**Issue 1:** Bower on Windows has troubles installing the repository showing the error message

```
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

**Cause:** The cause of this issue is the underlying GitHub installation is missing the certificate bundle.

**Fix:** To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> 1.9.5 Git build will not work with the Bower package.

> When using @ symbol in the url for accessing the Kendo UI Bower repository (due to network restrictions or admin rules, for instance), make sure you encode it as follows: https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git.