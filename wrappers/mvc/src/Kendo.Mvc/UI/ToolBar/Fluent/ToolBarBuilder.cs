namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ToolBar for ASP.NET MVC.
    /// </summary>
    public class ToolBarBuilder: WidgetBuilderBase<ToolBar, ToolBarBuilder>
    {
        private readonly ToolBar container;
        /// <summary>
        /// Initializes a new instance of the <see cref="ToolBar"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ToolBarBuilder(ToolBar component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// If resizable is set to true the widget will detect changes in the viewport width and hides the overflowing controls in the command overflow popup.
        /// </summary>
        /// <param name="value">The value that configures the resizable.</param>
        public ToolBarBuilder Resizable(bool value)
        {
            container.Resizable = value;

            return this;
        }
        
        /// <summary>
        /// A JavaScript array that contains the ToolBar's commands configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public ToolBarBuilder Items(Action<ToolBarItemFactory> configurator)
        {
            configurator(new ToolBarItemFactory(container.Items));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ToolBar()
        ///             .Name("ToolBar")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ToolBarBuilder Events(Action<ToolBarEventBuilder> configurator)
        {

            configurator(new ToolBarEventBuilder(Component.Events));

            return this;
        }
        
    }
}

