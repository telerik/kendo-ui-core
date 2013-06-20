namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileScrollView for ASP.NET MVC.
    /// </summary>
    public class MobileScrollViewBuilder: WidgetBuilderBase<MobileScrollView, MobileScrollViewBuilder>, IHideObjectMembers
    {
        private readonly MobileScrollView container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileScrollView"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileScrollViewBuilder(MobileScrollView component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The milliseconds that take the ScrollView to snap to the current page after released.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public MobileScrollViewBuilder Duration(int value)
        {
            container.Duration = value;

            return this;
        }
        
        /// <summary>
        /// The initial page to display.
        /// </summary>
        /// <param name="value">The value that configures the page.</param>
        public MobileScrollViewBuilder Page(int value)
        {
            container.Page = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the tag name of the item element. By default it will be `div` element
        /// </summary>
        /// <param name="value">The value that configures the itemtagname.</param>
        public MobileScrollViewBuilder ItemTagName(string value)
        {
            container.ItemTagName = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether exactly one item per page must be shown
        /// </summary>
        /// <param name="value">The value that configures the fititemperpage.</param>
        public MobileScrollViewBuilder FitItemPerPage(bool value)
        {
            container.FitItemPerPage = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The velocity threshold after which a swipe will result in a bounce effect.
        /// </summary>
        /// <param name="value">The value that configures the bouncevelocitythreshold.</param>
        public MobileScrollViewBuilder BounceVelocityThreshold(double value)
        {
            container.BounceVelocityThreshold = value;

            return this;
        }

        /// <summary>
        /// Multiplier applied to the snap amount of the ScrollView. By default, the widget scrolls to the next screen when swipe. If the pageSize property is set to 0.5, the ScrollView will scroll by half of the widget width.
        /// </summary>
        /// <param name="value">The value that configures the pagesize.</param>
        public MobileScrollViewBuilder PageSize(double value)
        {
            container.PageSize = value;

            return this;
        }
        

        /// <summary>
        /// The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current page).
        /// </summary>
        /// <param name="value">The value that configures the velocitythreshold.</param>
        public MobileScrollViewBuilder VelocityThreshold(double value)
        {
            container.VelocityThreshold = value;

            return this;
        }
        
        /// <summary>
        /// Contains the items of the ScrollView widget
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public MobileScrollViewBuilder Items(Action<MobileScrollViewItemFactory> configurator)
        {
            configurator(new MobileScrollViewItemFactory(container.Items));
            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileScrollView()
        ///             .Name("MobileScrollView")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileScrollViewBuilder Events(Action<MobileScrollViewEventBuilder> configurator)
        {

            configurator(new MobileScrollViewEventBuilder(Component.Events));

            return this;
        }
        
    }
}

