---
title: Store Credentials When Installing with Bower
page_title: Store Credentials When Installing with Bower
description: "Learn how to avoid being asked multiple times to provide your credentials while installing the Kendo UI Bower packages."
previous_url: /intro/installation/bower-install#storing-your-credentials
slug: troubleshoot_bower_storing_credentials
tags: troubleshooting, bower, credentials
type: troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery Bower Installation</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

I get asked multiple times to provide my credentials while installing the Kendo UI Bower packages. How can I avoid this?

## Solution

To preserve your credentials and handle the issue, use either of the following approaches:

* Cache your credentials by storing them as plain text in a [`.netrc` file](http://www.mavetju.org/unix/netrc.php).
* Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and follow the discussion on [skipping the password typing](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Storing on Windows

> * Caching your credentials is required if you use the Kendo UI Bower package in an ASP.NET vNext project.
> * If your home directory contains spaces in its path (for example, `c:\Documents and Settings\jane`), Git might have problems resolving it. That is why you need to update your `%HOME%` environment variable to point to a directory and exclude any spaces in its name.

1. Create a text file called `_netrc` in your home directory&mdash;for example, `c:\users\jane\_netrc`.
1. Declare a `HOME` environment variable.

      ```
      C:\> SETX HOME %USERPROFILE%
      ```

1. Add the credentials using the format.

      ```
      machine bower.telerik.com
          login my-telerik.identity@example.com
          password mysecret
      ```

### Storing on Unix-Like Systems

1. In your home directory, create a file called `.netrc` (`~/.netrc`). Verify that you modify the file permissions to make it readable only to you.

      ```sh
      touch ~/.netrc
      chmod 0600 ~/.netrc
      ```

1. Add your credentials to the `~/.netrc` file using the format demonstrated in the following example.

      ```
      machine bower.telerik.com
          login my-telerik.identity@example.com
          password mysecret
      ```
