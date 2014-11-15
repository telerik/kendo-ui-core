namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGrid"/>.
    /// </summary>
    public class PivotGridBuilder<TModel> : WidgetBuilderBase<PivotGrid<TModel>, PivotGridBuilder<TModel>>
        where TModel : class
    {
        // <summary>
        /// Initializes a new instance of the <see cref="PivotGridBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PivotGridBuilder(PivotGrid<TModel> component)
            : base(component)
        {
        }

        /// <summary>
        /// If set to false the initial binding will be prevented.
        /// </summary>
        /// <param name="autoBind">The autoBind</param>
        public PivotGridBuilder<TModel> AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Use it to set the Id of the PivotConfigurator.
        /// </summary>
        /// <param name="configurator">The configurator</param>
        public PivotGridBuilder<TModel> Configurator(string configurator)
        {
            Component.Configurator = configurator;

            return this;
        }

        /// <summary>
        /// Use it to set the column width of the Pivot.
        /// </summary>
        /// <param name="columnWidth">The column width.</param>
        public PivotGridBuilder<TModel> ColumnWidth(int columnWidth)
        {
            Component.ColumnWidth = columnWidth;

            return this;
        }

        /// <summary>
        /// Use it to set the height of the Pivot.
        /// </summary>
        /// <param name="height">The height</param>
        public PivotGridBuilder<TModel> Height(int height)
        {
            Component.Height = height;

            return this;
        }

        /// <summary>
        /// If set to false the user will not be able to add/close/reorder current fields for columns/rows/measures.
        /// </summary>
        /// <param name="reorderable">The reorderable</param>
        public PivotGridBuilder<TModel> Reorderable(bool reorderable)
        {
            Component.Reorderable = reorderable;

            return this;
        }

        /// <summary>
        /// If set to true the user will be able to filter by using the field menu.
        /// </summary>
        /// <param name="filterable">The filterable</param>
        public PivotGridBuilder<TModel> Filterable(bool filterable)
        {
            Component.Filterable = filterable;

            return this;
        }

        /// <summary>
        /// Enables grid column sorting.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().PivotGrid()
        ///     .Name(&quot;pivotgrid&quot;)
        ///     .Sortable()
        ///     .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///     )
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .Sortable()
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///       )
        /// )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> Sortable()
        {
            Component.Sortable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the sorting configuration of the pivotgrid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the sorting</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().PivotGrid()
        ///     .Name(&quot;pivotgrid&quot;)
        ///     .Sortable(sorting =&gt; sorting.AllowUnsort(true))
        ///     .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///     )
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .Sortable(sorting =&gt; sorting.AllowUnsort(true))
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///       )
        /// )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> Sortable(Action<PivotGridSortSettingsBuilder> configurator)
        {
            Component.Sortable.Enabled = true;

            configurator(new PivotGridSortSettingsBuilder(Component.Sortable));

            return this;
        }

        /// <summary>
        /// Configures the client-side events
        /// </summary>
        public PivotGridBuilder<TModel> Events(Action<PivotGridEventBuilder> configurator)
        {
            configurator(new PivotGridEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public PivotGridBuilder<TModel> DataSource(Action<PivotDataSourceBuilder<TModel>> configurator)
        {
            configurator(new PivotDataSourceBuilder<TModel>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Binds the pivotGrid to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        public PivotGridBuilder<TModel> BindTo(IEnumerable<TModel> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Sets the messages of the pivotGrid.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the pivotGrid messages</param>
        public PivotGridBuilder<TModel> Messages(Action<PivotGridMessagesBuilder> addViewAction)
        {
            PivotGridMessagesBuilder builder = new PivotGridMessagesBuilder(Component.Messages);

            addViewAction(builder);

            return this;
        }

        /// <summary>
        /// Sets the data cell template of the pivot grid.
        /// </summary>
        /// <param name="template">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .DataCellTemplate(&quot;<em>#: dataItem.fmtValue #</em>&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> DataCellTemplate(string template)
        {
            Component.DataCellTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the data cell template of the pivot grid.
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .DataCellTemplateId(&quot;dataCellTemplateId&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> DataCellTemplateId(string templateId)
        {
            Component.DataCellTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the KPI Status template of the pivot grid.
        /// </summary>
        /// <param name="template">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .KPIStatusTemplate(&quot;<em>#: dataItem.value #</em>&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> KPIStatusTemplate(string template)
        {
            Component.KPIStatusTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the KPI Status template of the pivot grid.
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .KPIStatusTemplateId(&quot;kpiStatusTemplateId&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> KPIStatusTemplateId(string templateId)
        {
            Component.KPIStatusTemplateId = templateId;

            return this;
        }
        //......
        /// <summary>
        /// Sets the KPI Trend template of the pivot grid.
        /// </summary>
        /// <param name="template">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .KPITrendTemplate(&quot;<em>#: dataItem.value #</em>&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> KPITrendTemplate(string template)
        {
            Component.KPITrendTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the KPI Trend template of the pivot grid.
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .KPITrendTemplateId(&quot;kpiTrendTemplateId&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> KPITrendTemplateId(string templateId)
        {
            Component.KPITrendTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the column header cell template of the pivot grid.
        /// </summary>
        /// <param name="template">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .ColumnHeaderTemplate(&quot;<em>#: member.caption #</em>&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> ColumnHeaderTemplate(string template)
        {
            Component.ColumnHeaderTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the column header cell template of the pivot grid.
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .ColumnHeaderTemplateId(&quot;columnHeaderTemplateId&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> ColumnHeaderTemplateId(string templateId)
        {
            Component.ColumnHeaderTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the row header cell template of the pivot grid.
        /// </summary>
        /// <param name="template">The template</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .RowHeaderTemplate(&quot;<em>#: member.caption #</em>&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> RowHeaderTemplate(string template)
        {
            Component.RowHeaderTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the row header cell template of the pivot grid.
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid()
        ///       .Name(&quot;pivotgrid&quot;)
        ///       .RowHeaderTemplateId(&quot;rowHeaderTemplateId&quot;)
        ///       .DataSource(dataSource =&gt;
        ///         dataSource.Xmla()
        ///            .Columns(columns =&gt; columns.Add(&quot;[Date].[Calendar]&quot;).Expand(true))
        ///            .Rows(rows =&gt; rows.Add(&quot;[Geography].[City]&quot;))
        ///            .Measures(measures =&gt; measures.Values(new string[]{&quot;[Measures].[Internet Sales Amount]&quot;}))
        ///            .Transport(transport =&gt; transport
        ///                .Connection(connection =&gt; connection
        ///                    .Catalog(&quot;Adventure Works DW 2008R2&quot;)
        ///                    .Cube(&quot;Adventure Works&quot;))
        ///                .Read(read =&gt; read
        ///                    .Url(&quot;http://demos.telerik.com/olap/msmdpump.dll&quot;)
        ///                    .DataType(&quot;text&quot;)
        ///                    .ContentType(&quot;text/xml&quot;)
        ///                    .Type(HttpVerbs.Post)
        ///                )
        ///            )
        ///        )
        ///    )
        /// </code>
        /// </example>
        public PivotGridBuilder<TModel> RowHeaderTemplateId(string templateId)
        {
            Component.RowHeaderTemplateId = templateId;

            return this;
        }
    }
}
