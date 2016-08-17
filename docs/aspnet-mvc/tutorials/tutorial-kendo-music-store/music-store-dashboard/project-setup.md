---
title: Set Up the Project
page_title: Set Up the Project | Music Store Dashboard Tutorial
description: "Learn how to set up the Kendo UI Music Store Dashboard sample project by using Telerik UI for ASP.NET MVC."
slug: projectsetup_muscistoredashboard_aspnetmvc
position: 1
---

# Set Up the Project

## Handle the Database

The Kendo UI Music Store Dashboard demo application uses an SQL Server database with sample data for artists, albums, orders, etc.

To populate the sample database, the application uses Entity Framework Code First migrations to create the database and seed the sample data. The migrations are configured to only run in the `Debug` mode. If you run it in the `Release` mode, the code assumes that the database is already created and does not try to create or seed the data.

The connection string configured in the `web.config` file is set to use `LocalDB` and will connect to a local database file in the `App_Data` folder. `LocalDB` requires an SQL Server 2012 or later.

To run the Kendo UI Music Store Dashboard demo, make sure your system meets these requirements or change the connection string to use an SQL Server instance available on your computer.

## See Also

Other articles on the Kendo UI Music Store Dashboard sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Create the Single-Page App]({% slug createthespa_muscistoredashboard_aspnetmvc %})
* [Create the Main Page]({% slug createthemainpage_muscistoredashboard_aspnetmvc %})
* [Build the Store Sales Page]({% slug buildthestoressales_muscistoredashboard_aspnetmvc %})
* [Build the Social Stats Page]({% slug buildsocialstats_muscistoredashboard_aspnetmvc %})
