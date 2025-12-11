---
title: Create a Sample Application with Kendo UI for jQuery and Vite
page_title: Create a Sample Application with Vite | Kendo UI for jQuery
description: "A guide on how to set up a project with Vite and Kendo UI for jQuery."
components: ["general"]
slug: getting_started_vite
position: 10
---

# Getting Started with Kendo UI for jQuery and Vite

This guide provides the steps for creating a sample application with [Vite](https://vitejs.dev/) and Kendo UI for jQuery.

After completing this guide, you will have a basic Vite application that includes a Kendo UI for jQuery Grid component with minimal configuration and local data.

## Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine. The [recommended versions](https://vite.dev/guide/#scaffolding-your-first-vite-project) are `20.19+` or `22.12+`.
* A preferred text editor or IDE.

## 1. Create a Vite Project

First, create a new Vite project. You can use the following command to set up a vanilla JavaScript project:

```sh
npm create vite@latest my-kendo-app -- --template vanilla
```

Then, navigate to the project directory:

```sh
cd my-kendo-app
```

## 2. Install Kendo UI for jQuery and Dependencies

Install the Kendo UI for jQuery NPM package and its peer dependency, jQuery:

```sh
npm install --save @progress/kendo-ui jquery
```

## 3. Install the Kendo UI Theme

```sh
npm install @progress/kendo-theme-classic --save
```

For more information about the Kendo Themes, refer to the dedicated Themes installation [article](https://www.telerik.com/design-system/docs/themes/get-started/installation/).

## 4. Ensure jQuery is Globally Accessible 

The Kendo scripts expect that the `jQuery` variable is available in the global scope.

In the `src` folder, add a `globals.js` file and export jQuery globally:

```javascript
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

export default jQuery;
```

## 5. Add the HTML Markup

Open `index.html` and add a `<div>` element that will be used to initialize the Grid component:

```html
<body>
  <div id="app">
    <h3>Grid</h3>
    <div id="grid"></div>
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
```

## 6. Import the Scripts

Import jQuery and the Kendo UI scripts you need in the `main.js` file. For this guide, you'll import the Grid component and its dependencies:

```javascript
import './globals.js'; // Ensure jQuery is accessible in the global scope.
import '@progress/kendo-theme-classic/dist/all.css'; // Either import the needed theme here or add it in the index.html.
// Import only the required Kendo modules.
import '@progress/kendo-ui/esm/kendo.core.js';
import '@progress/kendo-ui/esm/kendo.data.js';
import '@progress/kendo-ui/esm/kendo.grid.js';
```

## 7. Initialize the Grid

In the `main.js` file, initialize the Grid and add its configuration:

```javascript
$(document).ready(() => {  
  $("#grid").kendoGrid({
    dataSource: {
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Smith", age: 33 }
      ],
      schema: {
        model: {
          fields: {
            name: { type: "string" },
            age: { type: "number" }
          }
        }
      }
    },
    columns: [
      { field: "name", title: "Name" },
      { field: "age", title: "Age" }
    ]
  });
});
```

## 8. Build and Run the Application

Execute the following command to build and run the app:

```sh
npm run dev
```

## See Also

* [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
* [Licensing Overview]({% slug licensing-overview %})
