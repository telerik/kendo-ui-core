#generate-nuget-api-key

As the Telerik NuGet server requires authentication, the first step is to obtain an API key that you will use instead of a password. Using an API key instead of a password is a more secure approach{% if site.core %}, especially when working with the .NET CLI or a `NuGet.Config` file{% endif %}.

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.
1. Click **Generate New Key +**.
1. In the **Key Note** field, add a note that describes the API key.
1. Click **Generate Key**.
1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.
1. Store the generated NuGet API key as you will need it in the next steps. Whenever you need to authenticate your system with the Telerik NuGet server, use `api-key` as the username and your generated API key as the password.

> API keys expire after two years. Telerik will send you an email when a key is about to expire, but we recommend that you set your own calendar reminder with information about where you used that key: file paths, project links, AzDO and GitHub Action variable names, and so on.

#end

#add-nuget-feed

In this tutorial, you will use the [Telerik NuGet feed]({% slug nuget_install_aspnetmvc6_aspnetmvc%}) to download the {{ site.product_short }} components. This NuGet feed is private and requires you to authenticate with a NuGet API key.

To generate your NuGet API key:

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.

1. Click **Generate New Key +**.

1. In the **Key Note** field, add a note that describes the API key.

1. Click **Generate Key**.

1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.

1. Store the generated NuGet API key as you will need it in the next steps.

Next, add the Telerik NuGet feed to Visual Studio:

1. In Visual Studio and go to **Tools** > **NuGet Package Manager** > **Package Manager Settings**.

1. Select **Package Sources** and then click the **+** button to add a new package source.

1. Enter a **Name** for the new package source, for example, `telerik.com`.

1. Add the `https://nuget.telerik.com/v3/index.json` URL as a **Source**. Click **OK**.

![Add the Telerik NuGet Feed in Visual Studio](images/add-nuget-source.png)

1. Whenever Visual Studio displays a dialog to enter credentials for `nuget.telerik.com`, use `api-key` as the username and your NuGet API key as the password.

#end