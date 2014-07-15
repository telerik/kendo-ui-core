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
        /// If set to true the user will be able to filter by using the field menu.
        /// </summary>
        /// <param name="filterable">The filterable</param>
        public PivotConfiguratorBuilder Filterable(bool filterable)
        {
            Component.Filterable = filterable;

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
