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
        /// <param name="configurator">The lambda which configures the data source</param>
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
        /// Sets the server-side detail template of the grid in ASPX views.
        /// </summary>
        /// <param name="codeBlockTemplate">The template as a code block</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Product&gt;&gt;&quot; %&gt;
        /// &lt;% Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .DetailTemplate(product =&gt; {
        ///         %&gt;
        ///            Product Details:
        ///            &lt;div&gt;Product Name: &lt;%: product.ProductName %&gt;&lt;/div&gt;
        ///            &lt;div&gt;Units In Stock: &lt;%: product.UnitsInStock %&gt;&lt;/div&gt;
        ///         &lt;%
        ///     })
        ///     .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> DetailTemplate(Action<T> codeBlockTemplate)
        {
            Component.DetailTemplate.CodeBlockTemplate = codeBlockTemplate;

            return this;
        }

        /// <summary>
        /// Sets the server-side detail template of the grid in Razor views.
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .DetailTemplate(@&lt;text&gt;
        ///        Product Details:
        ///        &lt;div&gt;Product Name: @product.ProductName&lt;/div&gt;
        ///        &lt;div&gt;Units In Stock: @product.UnitsInStock&lt;/div&gt;
        ///     &lt;/text&gt;)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> DetailTemplate(Func<T, object> inlineTemplate)
        {
            Component.DetailTemplate.InlineTemplate = inlineTemplate;

            return this;
        }


        /// <summary>
        /// Sets the id of the script element which contains the client-side detail template of the grid.
        /// </summary>
        /// <param name="id">The id</param>
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
        ///     .ClientDetailTemplateId(&quot;detail-template&quot;)
        /// )
        /// &lt;script id=&quot;detail-template&quot; type=&quot;text/x-kendo-template&quot;&gt;
        ///     Product Details:
        ///     &lt;div&gt;Product Name: #: ProductName # &lt;/div&gt;
        ///     &lt;div&gt;Units In Stock: #: UnitsInStock #&lt;/div&gt;
        /// &lt;/script&gt;
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
        ///     .ClientDetailTemplateId(&quot;detail-template&quot;)
        /// %&gt;
        /// &lt;script id=&quot;detail-template&quot; type=&quot;text/x-kendo-template&quot;&gt;
        ///     Product Details:
        ///     &lt;div&gt;Product Name: #: ProductName # &lt;/div&gt;
        ///     &lt;div&gt;Units In Stock: #: UnitsInStock #&lt;/div&gt;
        /// &lt;/script&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ClientDetailTemplateId(string id)
        {
            Component.ClientDetailTemplateId = id;

            return this;
        }

        /// <summary>
        /// Sets the server-side row template of the grid in ASPX views.
        /// </summary>
        /// <param name="codeBlockTemplate">The template as a code block</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Product&gt;&gt;&quot; %&gt;
        ///  &lt;%: Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowTemplate((product, grid) =&gt;
        ///     {
        ///         %&gt;
        ///             &lt;div&gt;Product Name: &lt;%: product.ProductName %&gt;&lt;/div&gt;
        ///             &lt;div&gt;Units In Stock: &lt;%: product.UnitsInStock %&gt;&lt;/div&gt;
        ///         &lt;%
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
        /// Sets the server-side row template of the grid in ASPX views.
        /// </summary>
        /// <param name="codeBlockTemplate">The template as a code block</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Product&gt;&gt;&quot; %&gt;
        ///  &lt;%: Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowTemplate(product =&gt;
        ///     {
        ///         %&gt;
        ///             &lt;div&gt;Product Name: &lt;%: product.ProductName %&gt;&lt;/div&gt;
        ///             &lt;div&gt;Units In Stock: &lt;%: product.UnitsInStock %&gt;&lt;/div&gt;
        ///         &lt;%
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
        /// Sets the server-side row template of the grid in Razor views.
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowTemplate(@&lt;text&gt;
        ///        &lt;div&gt;Product Name: @product.ProductName&lt;/div&gt;
        ///        &lt;div&gt;Units In Stock: @product.UnitsInStock&lt;/div&gt;
        ///     &lt;/text&gt;)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> RowTemplate(Func<T, object> inlineTemplate)
        {
            Component.RowTemplate.InlineTemplate = inlineTemplate;

            return this;
        }

        /// <summary>
        /// Sets the server-side row template of the grid in Razor views.
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowTemplate(grid => @&lt;text&gt;
        ///        &lt;div&gt;Product Name: @product.ProductName&lt;/div&gt;
        ///        &lt;div&gt;Units In Stock: @product.UnitsInStock&lt;/div&gt;
        ///     &lt;/text&gt;)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> RowTemplate(Func<Grid<T>, Func<T, object>> inlineTemplate)
        {
            Component.RowTemplate.InlineTemplate = (dataItem)  => inlineTemplate(Component)(dataItem);

            return this;
        }

        /// <summary>
        /// Sets the client-side row template of the grid. The client-side row template must contain a table row element (tr).
        /// </summary>
        /// <param name="template">The template</param>
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
        ///     .ClientRowTemplate(
        ///     &quot;&lt;tr&gt;&quot; +
        ///         &quot;&lt;td&gt;#: ProductName #&lt;/td&gt;&quot; +
        ///         &quot;&lt;td&gt;#: UnitsInStock #&lt;/td&gt;&quot; +
        ///     &quot;&lt;/tr&gt;&quot;
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
        ///     .ClientRowTemplate(
        ///     &quot;&lt;tr&gt;&quot; +
        ///         &quot;&lt;td&gt;#: ProductName #&lt;/td&gt;&quot; +
        ///         &quot;&lt;td&gt;#: UnitsInStock #&lt;/td&gt;&quot; +
        ///     &quot;&lt;/tr&gt;&quot;
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ClientRowTemplate(string template)
        {
            Component.ClientRowTemplate = template;
            return this;
        }

        /// <summary>
        /// Sets the client-side row template of the grid. The client-side row template must contain a table row element (tr).
        /// </summary>
        /// <param name="template">The template</param>
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
        ///     .ClientRowTemplate(grid =&gt;
        ///     &quot;&lt;tr&gt;&quot; +
        ///         &quot;&lt;td&gt;#: ProductName #&lt;/td&gt;&quot; +
        ///         &quot;&lt;td&gt;#: UnitsInStock #&lt;/td&gt;&quot; +
        ///     &quot;&lt;/tr&gt;&quot;
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
        ///     .ClientRowTemplate(grid =&gt;
        ///     &quot;&lt;tr&gt;&quot; +
        ///         &quot;&lt;td&gt;#: ProductName #&lt;/td&gt;&quot; +
        ///         &quot;&lt;td&gt;#: UnitsInStock #&lt;/td&gt;&quot; +
        ///     &quot;&lt;/tr&gt;&quot;
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ClientRowTemplate(Func<Grid<T>, string> template)
        {
            Component.ClientRowTemplate = template(Component);

            return this;
        }

        /// <summary>
        /// If set to <c>false</c> the widget will not bind to the data source during initialization; the default value is <c>true</c>.
        /// Setting AutoBind to <c>false</c> is supported in ajax-bound mode.
        /// </summary>
        /// <param name="value">If true the grid will be automatically data bound, otherwise false</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .AutoBind(false)
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
        ///     .AutoBind(false)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;
            return this;
        }

        /// <summary>
        /// Sets the resizing configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the resizing</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Resizable(resizing => resizing.Columns(true))
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Resizable(resizing => resizing.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Resizable(Action<GridResizingSettingsBuilder> configurator)
        {

            configurator(new GridResizingSettingsBuilder(Component.Resizable));

            return this;
        }

        /// <summary>
        /// Sets the reordering configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the reordering</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Reorderable(reordering => reordering.Columns(true))
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Reorderable(reordering => reordering.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Reorderable(Action<GridReorderingSettingsBuilder> configurator)
        {
            configurator(new GridReorderingSettingsBuilder(Component.Reorderable));

            return this;
        }

        /// <summary>
        /// Sets the editing configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the editing</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Editable(editing => editing.Mode(GridEditMode.PopUp))
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Editable(editing => editing.Mode(GridEditMode.PopUp))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Editable(Action<GridEditingSettingsBuilder<T>> configurator)
        {
            configurator(new GridEditingSettingsBuilder<T>(Component.Editable));

            return this;
        }


        /// <summary>
        /// Enables grid editing.
        /// </summary>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Editable()
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .Editable()
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Editable()
        {
            Component.Editable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Sets the toolbar configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the toolbar</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .ToolBar(commands => commands.Create())
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .ToolBar(commands => commands.Create())
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
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Product&gt;&gt;&quot; %&gt;
        /// &amp;lt;%: Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .BindTo(Model)
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Binds the grid to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&gt;&quot; %&gt;
        /// &amp;lt;%: Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .BindTo(Model)
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable;
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> BindTo(IEnumerable dataSource)
        {
            Component.DataSource.Data = new CustomGroupingWrapper<T>(dataSource);
            return this;
        }

        /// <summary>
        /// Sets a lambda which is executed for every table row rendered server-side by the grid.
        /// </summary>
        /// <param name="configurator">The lambda which will be executed for every table row</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&gt;&quot; %&gt;
        /// &amp;lt;%: Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowAction(row =&gt;
        ///     {
        ///         // &quot;DataItem&quot; is the Product instance to which the current row is bound
        ///         if (row.DataItem.UnitsInStock &gt; 10)
        ///         {
        ///             //Set the background of the entire row
        ///             row.HtmlAttributes[&quot;style&quot;] = &quot;background:red;&quot;;
        ///         }
        ///     });
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .RowAction(row =&gt;
        ///     {
        ///         // &quot;DataItem&quot; is the Product instance to which the current row is bound
        ///         if (row.DataItem.UnitsInStock &gt; 10)
        ///         {
        ///             //Set the background of the entire row
        ///             row.HtmlAttributes[&quot;style&quot;] = &quot;background:red;&quot;;
        ///         }
        ///     });
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> RowAction(Action<GridRow<T>> configurator)
        {
            Component.RowAction = configurator;

            return this;
        }

        /// <summary>
        /// Sets a lambda which is executed for every table cell rendered server-side by the grid.
        /// </summary>
        /// <param name="configurator">The lambda which will be executed for every table cell</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&gt;&quot; %&gt;
        /// &amp;lt;%: Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .CellAction(cell =&gt;
        ///     {
        ///        if (cell.Column.Name == &quot;UnitsInStock&quot;)
        ///        {
        ///            if (cell.DataItem.UnitsInStock &gt; 10)
        ///            {
        ///                //Set the background of this cell only
        ///                cell.HtmlAttributes[&quot;style&quot;] = &quot;background:red;&quot;;
        ///            }
        ///        }
        ///     })
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .CellAction(cell =&gt;
        ///     {
        ///        if (cell.Column.Name == &quot;UnitsInStock&quot;)
        ///        {
        ///            if (cell.DataItem.UnitsInStock &gt; 10)
        ///            {
        ///                //Set the background of this cell only
        ///                cell.HtmlAttributes[&quot;style&quot;] = &quot;background:red;&quot;;
        ///            }
        ///        }
        ///     })
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> CellAction(Action<GridCell<T>> configurator)
        {
            Component.CellAction = configurator;

            return this;
        }

        /// <summary>
        /// If set to <c>true</c> the grid will perform custom binding.
        /// </summary>
        /// <param name="value">If true enables custom binding.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .EnableCustomBinding(true)
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
        ///     .EnableCustomBinding(true)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> EnableCustomBinding(bool value)
        {
            Component.EnableCustomBinding = value;

            return this;
        }

        /// <summary>
        /// Sets the column configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures columns</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Columns(columns =&gt;
        ///     {
        ///         columns.Bound(product =&gt; product.ProductName).Title(&quot;Product Name&quot;);
        ///         columns.Command(command =&gt; command.Destroy());
        ///     })
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Destroy(destroy =&gt; destroy.Action(&quot;Products_Destroy&quot;, &quot;Home&quot;)
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Columns(columns =&gt;
        ///     {
        ///         columns.Bound(product =&gt; product.ProductName).Title(&quot;Product Name&quot;);
        ///         columns.Command(command =&gt; command.Destroy());
        ///     })
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Destroy(destroy =&gt; destroy.Action(&quot;Products_Destroy&quot;, &quot;Home&quot;)
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
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
        /// Enables grid column filtering.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable()
        {
            Component.Sortable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the sorting configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the sorting</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable(sorting =&gt; sorting.SortMode(GridSortMode.MultipleColumn)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable(sorting =&gt; sorting.SortMode(GridSortMode.MultipleColumn)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable(Action<GridSortSettingsBuilder<T>> configurator)
        {
            Component.Sortable.Enabled = true;

            configurator(new GridSortSettingsBuilder<T>(Component.Sortable));

            return this;
        }

        /// <summary>
        /// Enables grid row selection.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Selectable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Selectable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable()
        {
            Component.Selectable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the selection configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the selection</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Selectable(selection =&gt; selection.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Selectable(selection =&gt; selection.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable(Action<GridSelectionSettingsBuilder> configurator)
        {
            Selectable();

            configurator(new GridSelectionSettingsBuilder(Component.Selectable));

            return this;
        }

        /// <summary>
        /// If set to <c>true</c> the grid will prefix the query string parameters with its name during server binding.
        /// By default the grid will prefix the query string parameters.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Product&gt;&gt;&quot; %&gt;
        /// &lt;%: Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .PrefixUrlParameters(false)
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Product&gt;
        /// @(Html.Kendo().Grid(Model)
        ///     .Name(&quot;grid&quot;)
        ///     .PrefixUrlParameters(false)
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> PrefixUrlParameters(bool prefix)
        {
            Component.PrefixUrlParameters = prefix;

            return this;
        }

        /// <summary>
        /// Enables grid paging.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable()
        {
            return Pageable(delegate { });
        }

        /// <summary>
        /// Sets the paging configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the paging</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable(paging =>
        ///         paging.Refresh(true)
        ///     )
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable(paging =>
        ///         paging.Refresh(true)
        ///     )
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable(Action<PageableBuilder> configurator)
        {
            Component.Pageable.Enabled = true;

            configurator(new PageableBuilder(Component.Pageable));

            return this;
        }

        /// <summary>
        /// Enables grid filtering.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable()
        {
            Component.Filterable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Sets the filtering configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the filtering</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable(filtering =&gt; filtering.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable(filtering =&gt; filtering.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable(Action<GridFilterableSettingsBuilder> configurator)
        {
            Component.Filterable.Enabled = true;

            configurator(new GridFilterableSettingsBuilder(Component.Filterable));

            return this;
        }

        /// <summary>
        /// Enables the grid column menu.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .ColumnMenu()
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .ColumnMenu()
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnMenu()
        {
            Component.ColumnMenu.Enabled = true;
            return this;
        }

        /// <summary>
        /// Sets the column menu configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the column menu</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .ColumnMenu(columnMenu =&gt; columnMenu.Enabled(true))
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .ColumnMenu(columnMenu =&gt; columnMenu.Enabled(true))
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnMenu(Action<GridColumnMenuSettingsBuilder> configurator)
        {
            Component.ColumnMenu.Enabled = true;

            configurator(new GridColumnMenuSettingsBuilder(Component.ColumnMenu));

            return this;
        }

        /// <summary>
        /// Enables grid scrolling.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Scrollable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Scrollable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable()
        {
            Component.Scrollable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the scrolling configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the scrolling</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Scrollable(scrolling =&gt; scrolling.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Scrollable(scrolling =&gt; scrolling.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable(Action<GridScrollSettingsBuilder> configurator)
        {
            Scrollable();

            configurator(new GridScrollSettingsBuilder(Component.Scrollable));

            return this;
        }

        /// <summary>
        /// Enables grid keyboard navigation.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable()
        {
            Component.Navigatable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the keyboard navigation configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the keyboard navigation</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable(navigation =&gt; navigation.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable(navigation =&gt; navigation.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable(Action<GridNavigatableSettingsBuilder> configurator)
        {
            Navigatable();

            configurator(new GridNavigatableSettingsBuilder(Component.Navigatable));

            return this;
        }

        /// <summary>
        /// Sets the event configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the events</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .Events(events =&gt; events.DataBound(&quot;grid_dataBound&quot;))
        /// %&gt;
        /// &lt;script&gt;
        /// function grid_dataBound(e) {
        ///     // handle the dataBound event
        /// }
        /// &lt;/script&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///     .Events(events =&gt; events.DataBound(&quot;grid_dataBound&quot;))
        /// )
        /// &lt;script&gt;
        /// function grid_dataBound(e) {
        ///     // handle the dataBound event
        /// }
        /// &lt;/script&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Events(Action<GridEventBuilder> configurator)
        {

            configurator(new GridEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the grouping configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the grouping</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Groupable(grouping =&gt; grouping.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Groupable(grouping =&gt; grouping.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable(Action<GridGroupingSettingsBuilder> configurator)
        {

            Component.Grouping.Enabled = true;
            configurator(new GridGroupingSettingsBuilder(Component.Grouping));

            return this;
        }

        /// <summary>
        /// Enables grid grouping.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Groupable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// %&gt;
        /// </code>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Groupable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable()
        {
            return Groupable(delegate { });
        }
    }
}
