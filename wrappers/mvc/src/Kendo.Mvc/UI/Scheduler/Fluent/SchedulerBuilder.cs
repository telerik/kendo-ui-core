namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Scheduler"/>.
    /// </summary>
    public class SchedulerBuilder<T> : WidgetBuilderBase<Scheduler<T>, SchedulerBuilder<T>> where T : class, ISchedulerEvent
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="Scheduler"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public SchedulerBuilder(Scheduler<T> component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Scheduler()
        ///             .Name("Scheduler")
        ///             .Events(events =>
        ///                 events.Remove("remove")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public SchedulerBuilder<T> Events(Action<SchedulerEventBuilder> clientEventsAction)
        {
            clientEventsAction(new SchedulerEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Scheduler()
        ///             .Name("Scheduler")
        ///             .DataSource(source =>
        ///             {
        ///                 source.Read(read =>
        ///                 {
        ///                     read.Action("Read", "Scheduler");
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// 
        public SchedulerBuilder<T> DataSource(Action<DataSourceBuilder<T>> configurator)
        {
            configurator(new DataSourceBuilder<T>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }
    }
}
