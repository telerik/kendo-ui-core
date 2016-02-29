---
title: Project Setup
position: 1
---

# Project Setup - Kendo UI Music Store Dashboard

## Database

The Kendo UI Music Store Dashboard demo application uses a SQL Server database with sample data for artists, albums, orders, etc. In order to populate the sample database, the application uses Entity Framework Code First migrations to create the database and seed the sample data. The migrations are configured to only run in DEBUG mode. If you run in RELEASE mode, the code will assume that the database has already been created and will not try to create or seed the data.

The connection string configured in the web.config file is set to use LocalDB and will connect to a local database file in the App_Data folder. LocalDB requires a SQL Server 2012 or later instance. To run the Kendo UI Music Store Dashboard demo, please ensure that your system meets these requirements or simply change the connection string to use a SQL Server instance available on your computer.