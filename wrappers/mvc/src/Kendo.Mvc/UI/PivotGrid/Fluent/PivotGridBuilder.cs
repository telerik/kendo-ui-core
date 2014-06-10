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
        /// If set to false the initial binding will be prevented.
        /// </summary>
        /// <param name="autoBind">The autoBind</param>
        public PivotGridBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public PivotGridBuilder DataSource(Action<PivotGridDataSourceBuilder> configurator)
        {
            configurator(new PivotGridDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }
    }
}
