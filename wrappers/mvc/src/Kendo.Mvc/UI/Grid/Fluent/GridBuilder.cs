namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Globalization;
    using Extensions;
    using Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// The fluent API for configuring Kendo UI Grid for ASP.NET MVC.
    /// </summary>
    public class GridBuilder<T> : WidgetBuilderBase<Grid<T>, GridBuilder<T>> where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GridBuilder(Grid<T> component)
            : base(component)
        {
        }

        public GridBuilder<T> TableHtmlAttributes(object attributes)
        {
            return TableHtmlAttributes(attributes.ToDictionary());
        }

        public GridBuilder<T> TableHtmlAttributes(IDictionary<string, object> attributes)
        {

            Component.TableHtmlAttributes.Clear();
            Component.TableHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The data source configuration</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> DataSource(Action<DataSourceBuilder<T>> configurator)
        {
            configurator(new DataSourceBuilder<T>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the detail template of the grid
        /// </summary>
        /// <param name="codeBlockTemplate">The template</param>
        public GridBuilder<T> DetailTemplate(Action<T> codeBlockTemplate)
        {
            Component.DetailTemplate.CodeBlockTemplate = codeBlockTemplate;

            return this;
        }

        /// <summary>
        /// Sets the detail template of the grid using Razor syntax
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        public GridBuilder<T> DetailTemplate(Func<T, object> inlineTemplate)
        {
            Component.DetailTemplate.InlineTemplate = inlineTemplate;

            return this;
        }

        public GridBuilder<T> ClientDetailTemplateId(string id)
        {
            Component.ClientDetailTemplateId = id;

            return this;
        }

        /// <summary>
        /// Sets the row template of the grid
        /// </summary>
        /// <param name="codeBlockTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///     .RowTemplate(o =>
        ///     {
        ///        %&gt;
        ///           &lt;%= o.Name %&gt;
        ///           &lt;%= o.Age %&gt;
        ///        &lt;%
        ///     })
        ///  %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> RowTemplate(Action<T, Grid<T>> codeBlockTemplate)
        {

            Component.RowTemplate.CodeBlockTemplate = (dataItem) => codeBlockTemplate(dataItem, Component);

            return this;
        }

        /// <summary>
        /// Sets the row template of the grid
        /// </summary>
        /// <param name="codeBlockTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///     .RowTemplate(o =>
        ///     {
        ///        %&gt;
        ///           &lt;%= o.Name %&gt;
        ///           &lt;%= o.Age %&gt;
        ///        &lt;%
        ///     })
        ///  %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> RowTemplate(Action<T> codeBlockTemplate)
        {

            Component.RowTemplate.CodeBlockTemplate = codeBlockTemplate;

            return this;
        }

        /// <summary>
        /// Sets the row template of the grid using Razor syntax
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///     .RowTemplate(@&lt;text&gt;
        ///           @item.Name
        ///           @item.Age
        ///     &lt;/text&gt;)
        ///  %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> RowTemplate(Func<T, object> inlineTemplate)
        {

            Component.RowTemplate.InlineTemplate = inlineTemplate;

            return this;
        }

        public GridBuilder<T> RowTemplate(Func<Grid<T>, Func<T, object>> inlineTemplate)
        {

            Component.RowTemplate.InlineTemplate = (dataItem)  => inlineTemplate(Component)(dataItem);

            return this;
        }

        /// <summary>
        /// Sets the client row template
        /// </summary>
        /// <param name="template">The template</param>
        public GridBuilder<T> ClientRowTemplate(string template)
        {
            Component.ClientRowTemplate = template;
            return this;
        }

        /// <summary>
        /// Sets the client row template
        /// </summary>
        /// <param name="template">The template</param>
        public GridBuilder<T> ClientRowTemplate(Func<Grid<T>, string> template)
        {
            Component.ClientRowTemplate = template(Component);

            return this;
        }

        /// <summary>
        /// Specifies if the Grid should be automatically bound on initial load.
        /// This is only possible if AJAX binding is used, and widget is not initialy populated on the server.
        /// </summary>
        /// <param name="value">If true Grid will be automatically data bound, otherwise false</param>
        public GridBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;
            return this;
        }

        /// <summary>
        /// Configures the grid resizing settings
        /// </summary>
        /// <param name="configurator">Resizing settings configurator method</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Resizable(resizing => resizing.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Resizable(Action<GridResizingSettingsBuilder> configurator)
        {

            configurator(new GridResizingSettingsBuilder(Component.Resizable));

            return this;
        }

        /// <summary>
        /// Configures the grid reordering settings
        /// </summary>
        /// <param name="configurator">Resizing settings configurator method</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Reorderable(reordering => reordering.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Reorderable(Action<GridReorderingSettingsBuilder> configurator)
        {
            configurator(new GridReorderingSettingsBuilder(Component.Reorderable));

            return this;
        }

        /// <summary>
        /// Configures the grid editing settings.
        /// </summary>
        /// <param name="configurator">Configurator for the edit settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Editable(Action<GridEditingSettingsBuilder<T>> configurator)
        {
            configurator(new GridEditingSettingsBuilder<T>(Component.Editable));

            return this;
        }


        /// <summary>
        /// Enables the grid editing.
        /// </summary>
        public GridBuilder<T> Editable()
        {
            Component.Editable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Configures the toolbar of the grid.
        /// </summary>
        /// <param name="configurator">ToolBar configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .ToolBar(commands => commands.Create())
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ToolBar(Action<GridToolBarCommandFactory<T>> configurator)
        {
            configurator(new GridToolBarCommandFactory<T>(Component.ToolBar));

            return this;
        }

        /// <summary>
        /// Binds the grid to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        public GridBuilder<T> BindTo(IEnumerable dataSource)
        {
            Component.DataSource.Data = new CustomGroupingWrapper<T>(dataSource);
            return this;
        }

        /// <summary>
        /// Callback for each row.
        /// </summary>
        /// <param name="configurator">Action, which will be executed for each row.
        /// You can format the entire row</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .RowAction(row =>
        ///             {
        ///                 // "DataItem" is the Order object to which the current row is bound to
        ///                 if (row.DataItem.Freight > 10)
        ///                 {
        ///                     //Set the background of the entire row
        ///                     row.HtmlAttributes["style"] = "background:red;";
        ///                 }
        ///             });
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> RowAction(Action<GridRow<T>> configurator)
        {

            Component.RowAction = configurator;

            return this;
        }

        /// <summary>
        /// Callback for each cell.
        /// </summary>
        /// <param name="configurator">Action, which will be executed for each cell.
        /// You can format a concrete cell.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .CellAction(cell =>
        ///             {
        ///                if (cell.Column.Name == "Freight")
        ///                {
        ///                    if (cell.DataItem.Freight > 10)
        ///                    {
        ///                        //Set the background of this cell only
        ///                        cell.HtmlAttributes["style"] = "background:red;";
        ///                    }
        ///                }
        ///             });
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> CellAction(Action<GridCell<T>> configurator)
        {

            Component.CellAction = configurator;

            return this;
        }

        /// <summary>
        /// Enables or disables the custom binding of the grid.
        /// </summary>
        /// <param name="value">If true enables custom binding.</param>
        /// <returns></returns>
        public GridBuilder<T> EnableCustomBinding(bool value)
        {
            Component.EnableCustomBinding = value;

            return this;
        }

        /// <summary>
        /// Defines the columns of the grid.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Columns(Action<GridColumnFactory<T>> configurator)
        {

            GridColumnFactory<T> factory = new GridColumnFactory<T>(Component);

            configurator(factory);

            return this;
        }

        /// <summary>
        /// Allows sorting of the columns.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable()
        {
            Component.Sortable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Allows sorting of the columns.
        /// </summary>
        /// <param name="configurator">Use builder to define sort settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Sortable(sorting => sorting.SortMode(GridSortMode.MultipleColumn)
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable(Action<GridSortSettingsBuilder<T>> configurator)
        {

            Component.Sortable.Enabled = true;

            configurator(new GridSortSettingsBuilder<T>(Component.Sortable));

            return this;
        }

        /// <summary>
        /// Enables row selection.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Selectable()
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable()
        {
            Component.Selectable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables row selection.
        /// </summary>
        /// <param name="selectionAction">Use builder to define the selection settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Selectable(selection => selection.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable(Action<GridSelectionSettingsBuilder> selectionAction)
        {

            Selectable();

            selectionAction(new GridSelectionSettingsBuilder(Component.Selectable));

            return this;
        }

        /// <summary>
        /// Put grid name as a prefix.
        /// </summary>
        public GridBuilder<T> PrefixUrlParameters(bool prefix)
        {
            Component.PrefixUrlParameters = prefix;

            return this;
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Pageable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable()
        {
            return Pageable(delegate { });
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <param name="pagerAction">Use builder to define paging settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Pageable(paging =>
        ///                        paging.Refresh(true)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable(Action<PageableBuilder> pagerAction)
        {
            Component.Pageable.Enabled = true;

            pagerAction(new PageableBuilder(Component.Pageable));

            return this;
        }

        /// <summary>
        /// Allows filtering of the columns.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Filterable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable()
        {
            Component.Filterable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Allows filtering of the columns.
        /// </summary>
        /// <param name="configurator">Use builder to define filtering settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Filterable(filtering => filtering.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable(Action<GridFilterableSettingsBuilder> configurator)
        {
            Component.Filterable.Enabled = true;

            configurator(new GridFilterableSettingsBuilder(Component.Filterable));

            return this;
        }

        /// <summary>
        /// Enables/disables header column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .ColumnMenu();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnMenu()
        {
            Component.ColumnMenu.Enabled = true;
            return this;
        }

        /// <summary>
        /// Enables/disables header column menu.
        /// </summary>
        /// <param name="configurator">Use builder to define column menu settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .ColumnMenu(menu => menu.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnMenu(Action<GridColumnMenuSettingsBuilder> configurator)
        {
            Component.ColumnMenu.Enabled = true;

            configurator(new GridColumnMenuSettingsBuilder(Component.ColumnMenu));

            return this;
        }

        /// <summary>
        /// Show scrollbar if there are many items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Scrollable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable()
        {
            Component.Scrollable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Show scrollbar if there are many items.
        /// </summary>
        /// <param name="configurator">Use builder to define scrolling settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Scrollable(scrolling => scrolling.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable(Action<GridScrollSettingsBuilder> configurator)
        {

            Scrollable();

            configurator(new GridScrollSettingsBuilder(Component.Scrollable));

            return this;
        }

        /// <summary>
        /// Enables keyboard navigation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Navigatable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable()
        {
            Component.Navigatable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables keyboard navigation.
        /// </summary>
        /// <param name="configurator">Use builder to define keyboard navigation settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Navigatable(navigation => navigation.Enabled(true));
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable(Action<GridNavigatableSettingsBuilder> configurator)
        {

            Navigatable();

            configurator(new GridNavigatableSettingsBuilder(Component.Navigatable));

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Events(events => events
        ///                 .DataBinding("onDataBinding")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Events(Action<GridEventBuilder> configurator)
        {

            configurator(new GridEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Use it to configure grouping.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Groupable(grouping => grouping.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable(Action<GridGroupingSettingsBuilder> configurator)
        {

            Component.Grouping.Enabled = true;
            configurator(new GridGroupingSettingsBuilder(Component.Grouping));

            return this;
        }

        /// <summary>
        /// Allows grouping.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid()
        ///             .Name("Grid")
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Groupable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable()
        {
            return Groupable(delegate { });
        }
    }
}
