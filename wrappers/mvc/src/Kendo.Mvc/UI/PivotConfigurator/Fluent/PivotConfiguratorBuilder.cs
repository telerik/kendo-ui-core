namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotConfigurator"/>.
    /// </summary>
    public class PivotConfiguratorBuilder : WidgetBuilderBase<PivotConfigurator, PivotConfiguratorBuilder>
    {
        // <summary>
        /// Initializes a new instance of the <see cref="PivotConfiguratorBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PivotConfiguratorBuilder(PivotConfigurator component)
            : base(component)
        {
        }

        /// <summary>
        /// Use it to set the height of the Pivot.
        /// </summary>
        /// <param name="height">The height</param>
        public PivotConfiguratorBuilder Height(int height)
        {
            Component.Height = height;

            return this;
        }

        /// <summary>
        /// If set to true the user will be able to filter by using the field menu.
        /// </summary>
        /// <param name="filterable">The filterable</param>
        public PivotConfiguratorBuilder Filterable(bool filterable)
        {
            Component.Filterable = filterable;

            return this;
        }

        /// <summary>
        /// Enables grid column sorting.
        /// </summary>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%:Html.Kendo().PivotConfigurator()
        ///     .Name(&quot;pivotconfigurator&quot;)
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
        /// @(Html.Kendo().PivotConfigurator()
        ///       .Name(&quot;pivotconfigurator&quot;)
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
        public PivotConfiguratorBuilder Sortable()
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
        /// &lt;%:Html.Kendo().PivotConfigurator()
        ///     .Name(&quot;pivotconfigurator&quot;)
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
        /// @(Html.Kendo().PivotConfigurator()
        ///       .Name(&quot;pivotconfigurator&quot;)
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
        public PivotConfiguratorBuilder Sortable(Action<PivotConfiguratorSortSettingsBuilder> configurator)
        {
            Component.Sortable.Enabled = true;

            configurator(new PivotConfiguratorSortSettingsBuilder(Component.Sortable));

            return this;
        }

        /// <summary>
        /// Sets the messages of the pivotConfigurator.
        /// </summary>
        /// <param name="addViewAction">The lambda which configures the pivotConfigurator messages</param>
        public PivotConfiguratorBuilder Messages(Action<PivotConfiguratorMessagesBuilder> addViewAction)
        {
            PivotConfiguratorMessagesBuilder builder = new PivotConfiguratorMessagesBuilder(Component.Messages);

            addViewAction(builder);

            return this;
        }
    }
}
