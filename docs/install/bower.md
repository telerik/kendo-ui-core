---
title: Install Kendo UI as a Bower Package
page_title: Install Kendo UI as a Bower Package
description: "Use Kendo UI in your project by installing it as a Bower package"
position: 2
---

# Install Kendo UI as a Bower Package

[Bower](http://bower.io/) is a popular package manager for the web. Kendo UI maintains two bower packages, Kendo UI Core and Kendo UI Professional.
Official releases, service packs and internal builds are uploaded to both.

## Install Kendo UI Core Bower Package

The Kendo UI Core bower package is is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui). It is also registered as `kendo-ui-core` in the bower registry.

```sh
bower install kendo-ui-core
```

## Install Kendo UI Professional Bower Package

The Kendo UI Professional bower package is hosted as a username/password protected Git repository on `bower.telerik.com`. To access it, you need an active Telerik account.

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package in the `bower.json` file:

```json
"dependencies": {
    "kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~2014.3.1425"
}
```

Upon install/update you will be prompted for your Telerik username and password.

## Automate Kendo UI Professional package install on production servers

To avoid retyping the user name/password entry when deploying, store the credentials in a [.netrc file](http://www.gnu.org/software/inetutils/manual/html_node/The-_002enetrc-File.html)

### .netrc file contents

```sh
machine bower.telerik.com
        login my-telerik.identity@example.com
        password mysecret
```

> Make sure that you set the `.netrc` file permissions file to being readable only [from your current user](http://www.mavetju.org/unix/netrc.php).
