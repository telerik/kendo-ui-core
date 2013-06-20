namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileSplitView for ASP.NET MVC.
    /// </summary>
    public class MobileSplitViewBuilder: WidgetBuilderBase<MobileSplitView, MobileSplitViewBuilder>, IHideObjectMembers
    {
        private readonly MobileSplitView container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileSplitView"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileSplitViewBuilder(MobileSplitView component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the SplitView style - horizontal or vertical.
        /// </summary>
        /// <param name="value">The value that configures the style.</param>
        public MobileSplitViewBuilder Style(MobileSplitViewStyle value)
        {
            container.Style = value;

            return this;
        }
        
        /// <summary>
        /// Contains the panes of the splitview widget
        /// </summary>
        /// <param name="configurator">The action that configures the panes.</param>
        public MobileSplitViewBuilder Panes(Action<MobileSplitViewPaneFactory> configurator)
        {
            configurator(new MobileSplitViewPaneFactory(container.Panes));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileSplitView()
        ///             .Name("MobileSplitView")
        ///             .Events(events => events
        ///                 .Init("onInit")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileSplitViewBuilder Events(Action<MobileSplitViewEventBuilder> configurator)
        {

            configurator(new MobileSplitViewEventBuilder(Component.Events));

            return this;
        }
        
    }
}

