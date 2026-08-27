---
title: Setting Up Your Kendo UI for jQuery License Key
page_title: Setting Up Your Kendo UI for jQuery License Key - Download and Installation
description: "Learn how to download and activate a Kendo UI for jQuery license key and replace an expired license key."
components: ["general"]
slug: using-license-file
published: True
position: 3
---

# Setting Up Your Kendo UI for jQuery License Key

Kendo UI for jQuery requires activation through a license key. A license key is required for both trial and commercial licenses. This article describes how to download your personal license key or replace an expired one and use it to activate the Kendo UI for jQuery components.

Kendo UI for jQuery is a professionally developed library distributed under a [commercial license](https://www.telerik.com/purchase/license-agreement/kendo-ui). Using any of the UI components from the Kendo UI for jQuery library requires either a commercial license key or an active trial license key. The activation process is identical for both license types and is required for the proper functioning of all components.

The license-file activation method is supported for Kendo UI versions starting with `2025.1.211`.

To activate the Kendo UI for jQuery components with a trial or commercial personal license key:

1. [Download your license key file](#download-your-license-key-file).
2. [Install or update the license key file in your project](#install-or-update-the-license-key-file-in-your-project).

If you are in a hurry, run the following command sequence in your project terminal to download and activate your license:

```sh npm
npm install --save @progress/kendo-licensing
npx kendo-ui-license refresh && npx kendo-ui-license activate
```
```sh yarn
yarn add @progress/kendo-licensing
yarn run kendo-ui-license refresh && yarn run kendo-ui-license activate
```

## Download Your License Key File

To download a license key for Kendo UI for jQuery, you must have either a developer license or a trial license. If you are new to Kendo UI for jQuery, [sign up for a free trial](https://www.telerik.com/try/kendo-ui) first and then follow the steps below.

Use the `refresh` command provided by the `@progress/kendo-licensing` package to download a fresh copy of your license key file. The command-line utility launches your default browser and asks you to log in to telerik.com.

```sh
npx -y @progress/kendo-licensing refresh
```

The license key file is saved in your current user's home directory, making it available to all projects:

* Windows: `%AppData%\Telerik\telerik-license.txt`
* Mac/Linux: `~/.telerik/telerik-license.txt`

To download the license key file to a different location, use the `--output` parameter and specify a path or file name:

```sh
npx -y @progress/kendo-licensing refresh --output kendo-ui-license.txt
```

Alternatively, visit the [License Keys page](https://www.telerik.com/account/your-licenses/license-keys), download the license key file using your browser, and place it in your home directory.

>note Starting with the 2025 Q1 release, the name of the downloaded file changes from `kendo-ui-license.txt` to `telerik-license.txt`. This change is required because all Telerik UI and Kendo UI products now use the same licensing mechanism with a common license key. See the [Handling License Key File Name and Environment Variable Name Changes in the 2025 Q1 Release](https://docs.telerik.com/kendo-ui/knowledge-base/license-key-file-name-and-environment-variable) KB article for more information.

## Install or Update the License Key File in Your Project

Whenever you purchase a new Kendo UI for jQuery license or renew an existing one, always download and install a new license key. The new license key includes information about all previous license purchases. The procedure for installing a new license key and updating an existing license key is the same:

1. Install `@progress/kendo-licensing` as a project dependency:

   ```sh npm
   npm install --save @progress/kendo-licensing
   ```
   ```sh yarn
   yarn add @progress/kendo-licensing
   ```

2. Run the activate command in the console:

   ```sh npm
   npx kendo-ui-license activate
   ```
   ```sh yarn
   yarn run kendo-ui-license activate
   ```

The licensing package searches for `telerik-license.txt` in your home directory and project directory. Do not commit the license key file to source control because it is your personal license key.

If you use a version of Kendo UI for jQuery before `2025.1.211`, activate the license by [adding a script license key]({% slug using-license-code %}) instead.

If the invalid license attributes are still displayed after you have installed or updated the license key, see [License Activation Errors and Warnings]({% slug activation-error-warnings %}) and the [Frequently Asked Questions]({% slug license-code-faq %}) for more information.

## Suggested Links

* [Adding Deployment Keys to CI/CD Services]({% slug license-key-to-ci-services %})
* [Licensing Overview]({% slug licensing-overview %})
* [License Activation Errors and Warnings]({% slug activation-error-warnings %})
* [Frequently Asked Questions about Your Kendo UI for jQuery License Key]({% slug license-code-faq %})
