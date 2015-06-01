---
title: Install Kendo UI as a Bower Package
page_title: Install Kendo UI as a Bower Package
description: "Use Kendo UI in your project by installing it as a Bower package"
position: 2
---

# Install Kendo UI as a Bower Package

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains two bower packages, Kendo UI Core and Kendo UI Professional.
Official releases, service packs and internal builds are uploaded to both.

> The professional bower package is available only for licensed user accounts; *it is not accessible for trial accounts*.

## Install Kendo UI Core Bower Package

The Kendo UI Core Bower package is is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui). It is also registered as `kendo-ui-core` in the bower registry.

```sh
bower install kendo-ui-core
```

## Install Kendo UI Professional Bower Package

The Kendo UI Professional Bower package is hosted as a private Git repository on `bower.telerik.com`. To access it, you need an active Telerik account.

Bower will prompt for your Telerik username and password during installation and update.

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package in the `bower.json` file:

```json
"dependencies": {
    "kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~2014.3.1425"
}
```

> The installation may **request your password multiple times**. See the next section.


## Storing repository credentials

Credentials can be cached to avoid retyping them.
The simplest option is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

You can use Git credential helpers as a secure alternative.
See the discussion in [on Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Windows

> Caching the credentials is required if you're using the Kendo UI Bower package in an **ASP.NET vNext** project.

1. Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`).
1. Declare a HOME environment variable:

    ```
    C:\> SETX HOME %USERPROFILE%
    ```
1. Add the credentials using the format listed above.

Git might have problems resolving your home directory if it contains spaces in its path (e.g. `c:\Documents and Settings\jane`).
You should update your %HOME% environment variable to point to a directory with no spaces in its name.

### Linux, OS X and Unix-like systems

1. Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

    ```sh
    touch ~/.netrc
    chmod 0600 ~/.netrc
    ```
1. Add the credentials using the format listed below.

### Sample ~/.netrc file contents

```
machine bower.telerik.com
        login my-telerik.identity@example.com
        password mysecret
```

### Troubleshooting

* Bower on Windows may have troubles installing the repository, failing with

```
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is the underlying git installation is missing the certificate bundle.
To resolve the issue, [follow the steps in this help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

* GitHub build 1.9.5 will not work with the Bower package. Using Git version 1.8.3 is recommended.


