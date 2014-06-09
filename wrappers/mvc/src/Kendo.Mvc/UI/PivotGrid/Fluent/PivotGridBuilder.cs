namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGrid"/>.
    /// </summary>
    public class PivotGridBuilder : WidgetBuilderBase<PivotGrid, PivotGridBuilder>
    {
        // <summary>
        /// Initializes a new instance of the <see cref="PivotGridBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PivotGridBuilder(PivotGrid component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().PivotGrid&lt;Product&gt;()
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
        /// &lt;%:Html.Kendo().PivotGrid&lt;Product&gt;()
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
        public PivotGridBuilder DataSource(Action<PivotGridDataSourceBuilder> configurator)
        {
            configurator(new PivotGridDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }
    }
}
