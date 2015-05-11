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

> The professional bower package is available only for licensed user accounts; *it is not accessible for trial accounts*.
> The initial installation may **request your password multiple times**. You may avoid this by [persisting your password](persisting your password).


## Storing repository credentials

To avoid retyping the user name/password entry when deploying, store the credentials in a [.netrc file](http://www.gnu.org/software/inetutils/manual/html_node/The-_002enetrc-File.html)

This file must be located at your home directory. That would be `~/.netrc` for \*NIX systems and `%HOME%\_netrc` for Windows.

You can use Git credential helpers as an alternative to storing the password as plain text.
See the discussion in [on Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Sample ~/.netrc file contents

```
machine bower.telerik.com
        login my-telerik.identity@example.com
        password mysecret
```

> Make sure that you set the `.netrc` file permissions file to being readable only [from your current user](http://www.mavetju.org/unix/netrc.php).

### Troubleshooting

Bower on Windows may have troubles installing the repository, failing with

```sh
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is the underlying git installation is missing the certificate bundle.
To resolve the issue, [follow the steps in this help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).
