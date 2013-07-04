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
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the data source is fired. By default the widget will bind to the data source specified in the configuration.Applicable only in data bound mode.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public MobileScrollViewBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
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
        /// The template which is used to render the pages without content. By default the ScrollView renders a blank page.Applicable only in data bound mode.
        /// </summary>
        /// <param name="value">The value that configures the emptytemplateid.</param>
        public MobileScrollViewBuilder EmptyTemplateId(string value)
        {
            container.EmptyTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// If set to true the ScrollView will display a pager. By default pager is enabled.
        /// </summary>
        /// <param name="value">The value that configures the enablepager.</param>
        public MobileScrollViewBuilder EnablePager(bool value)
        {
            container.EnablePager = value;

            return this;
        }
        
        /// <summary>
        /// Determines how many data items will be passed to the page template.Applicable only in data bound mode.
        /// </summary>
        /// <param name="value">The value that configures the itemsperpage.</param>
        public MobileScrollViewBuilder ItemsPerPage(int value)
        {
            container.ItemsPerPage = value;

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
        /// The template which is used to render the content of pages. By default the ScrollView renders a div element for every page.Applicable only in data bound mode.
        /// </summary>
        /// <param name="value">The value that configures the templateid.</param>
        public MobileScrollViewBuilder TemplateId(string value)
        {
            container.TemplateId = value;

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
        
        /// <summary>
        /// The height of the ScrollView content.
        /// </summary>
        /// <param name="value">The value that configures the contentheight.</param>
        public MobileScrollViewBuilder ContentHeight(string value)
        {
            container.ContentHeight = value;

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
        /// The height of the ScrollView content.
        /// </summary>
        /// <param name="value">The value that configures the contentheight.</param>
        public MobileScrollViewBuilder ContentHeight(int value)
        {
            container.ContentHeight = value + "px";

            return this;
        }

        /// <summary>
        /// Instance of DataSource or the data that the mobile ScrollView will be bound to.
        /// </summary>
        /// <param name="configurator">The value that configures the datasource.</param>
        public MobileScrollViewBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

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

