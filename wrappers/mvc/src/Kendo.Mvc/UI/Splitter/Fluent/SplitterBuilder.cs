namespace Kendo.Mvc.UI.Fluent
{
    using System;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Splitter"/> component.
    /// </summary>
    public class SplitterBuilder : WidgetBuilderBase<Splitter, SplitterBuilder>, IHideObjectMembers
    {
        public SplitterBuilder(Splitter component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the splitter orientation.
        /// </summary>
        /// <param name="value">The desired orientation.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Orientation(SplitterOrientation.Vertical)
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder Orientation(SplitterOrientation value)
        {
            Component.Orientation = value;

            return this;
        }

        /// <summary>
        /// Defines the panes in the splitter.
        /// </summary>
        /// <param name="configurePanes">The action that configures the panes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes => {
        ///                 panes.Add().LoadContentFrom("Navigation", "Shared");
        ///                 panes.Add().LoadContentFrom("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder Panes(Action<SplitterPaneFactory> configurePanes)
        {

            var paneFactory = new SplitterPaneFactory(Component, Component.ViewContext);

            configurePanes(paneFactory);

            return this;
        }

        /// <summary>
        /// Configures the client events for the splitter.
        /// </summary>
        /// <param name="configurator">The action that configures the client events.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events
        ///                 .OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterBuilder Events(Action<SplitterEventBuilder> configurator)
        {
            var clientEventsBuilder = new SplitterEventBuilder(Component.Events);

            configurator(clientEventsBuilder);

            return this;
        }
    }
}