namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Menu"/> component.
    /// </summary>
    public class MenuBuilder : WidgetBuilderBase<Menu, MenuBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MenuBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MenuBuilder(Menu component)
            : base(component)
        {
        }

        public MenuBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public MenuBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Defines the items in the menu
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Items(Action<MenuItemFactory> addAction)
        {
            MenuItemFactory factory = new MenuItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events =>
        ///                 events.Open("onOpen").OnClose("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Events(Action<MenuEventBuilder> clientEventsAction)
        {
            clientEventsAction(new MenuEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Specifies Menu opening direction.
        /// </summary>
        /// <param name="value">The desired direction.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Direction(MenuDirection.Left)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Direction(MenuDirection value)
        {
            Component.Direction = value.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Specifies Menu opening direction.
        /// </summary>
        /// <param name="value">The desired direction.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Direction("top")
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Direction(string value)
        {
            Component.Direction = value;

            return this;
        }

        /// <summary>
        /// Sets the menu orientation.
        /// </summary>
        /// <param name="value">The desired orientation.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Orientation(MenuOrientation.Vertical)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Orientation(MenuOrientation value)
        {
            Component.Orientation = value;

            return this;
        }

        /// <summary>
        /// Enables or disables the "open-on-click" feature.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .OpenOnClick(true)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder OpenOnClick(bool value)
        {
            Component.OpenOnClick = value;

            return this;
        }

        /// <summary>
        /// Specifies that sub menus should close after item selection (provided they won't navigate).
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .CloseOnClick(false)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder CloseOnClick(bool value)
        {
            Component.CloseOnClick = value;

            return this;
        }

        /// <summary>
        /// Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .HoverDelay(300)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder HoverDelay(int value)
        {
            Component.HoverDelay = value;

            return this;
        }

        /// <summary>
        /// Binds the menu to a sitemap
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <param name="siteMapAction">The action to configure the item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .BindTo("examples", (item, siteMapNode) =>
        ///             {
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder BindTo(string viewDataKey, Action<MenuItem, SiteMapNode> siteMapAction)
        {
            Component.BindTo(viewDataKey, siteMapAction);

            return this;
        }


        /// <summary>
        /// Binds the menu to a sitemap.
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .BindTo("examples")
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder BindTo(string viewDataKey)
        {
            Component.BindTo(viewDataKey);

            return this;
        }

        /// <summary>
        /// Binds the menu to a list of objects. The menu will be "flat" which means a menu item will be created for 
        /// every item in the data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="itemDataBound">The action executed for every data bound item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .BindTo(new []{"First", "Second"}, (item, value)
        ///             {
        ///                item.Text = value;
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder BindTo<T>(IEnumerable<T> dataSource, Action<MenuItem, T> itemDataBound)
        {
            Component.BindTo(dataSource, itemDataBound);

            return this;
        }

        /// <summary>
        /// Binds the menu to a list of objects. The menu will create a hierarchy of items using the specified mappings.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="factoryAction">The action which will configure the mappings</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .BindTo(Model, mapping => mapping
        ///                     .For&lt;Customer&gt;(binding => binding
        ///                         .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
        ///                         .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to MenuItem properties
        ///                     )
        ///                     .For&lt;Order&lt;(binding => binding
        ///                         .Children(o => null) // "Orders" do not have child objects so return "null"
        ///                         .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to MenuItem properties
        ///                     )
        ///             ) 
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder BindTo(IEnumerable dataSource, Action<NavigationBindingFactory<MenuItem>> factoryAction)
        {
            Component.BindTo(dataSource, factoryAction);

            return this;
        }

        /// <summary>
        /// Binds the menu to a list of items.
        /// Use if the menu items are being sent from the controller.
        /// To bind the Menu declaratively, use the <seealso cref="Items(Action<MenuItemFactory>)"> method.
        /// </summary>
        /// <param name="items">The list of items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("TreeView")
        ///             .BindTo(model)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder BindTo(IEnumerable<MenuItem> items)
        {
            Component.Items.Clear();

            (items as List<MenuItem>).ForEach(item => Component.Items.Add(item));

            return this;
        }

        /// <summary>
        /// Callback for each item.
        /// </summary>
        /// <param name="action">Action, which will be executed for each item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .ItemAction(item =>
        ///             {
        ///                 item
        ///                     .Text(...)
        ///                     .HtmlAttributes(...);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder ItemAction(Action<MenuItem> action)
        {
            Component.ItemAction = action;

            return this;
        }

        /// <summary>
        /// Select item depending on the current URL.
        /// </summary>
        /// <param name="value">If true the item will be highlighted.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .HighlightPath(true)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder HighlightPath(bool value)
        {
            Component.HighlightPath = value;

            return this;
        }

        /// <summary>
        /// Enable/disable security trimming functionality of the component.
        /// </summary>
        /// <param name="value">If true security trimming is enabled.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .SecurityTrimming(false)
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder SecurityTrimming(bool value)
        {
            Component.SecurityTrimming.Enabled = value;

            return this;
        }

        /// <summary>
        /// Defines the security trimming functionality of the component
        /// </summary>
        /// <param name="securityTrimmingAction">The securityTrimming action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .SecurityTrimming(builder =>
        ///             {
        ///                 builder.Enabled(true).HideParent(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder SecurityTrimming(Action<SecurityTrimmingBuilder> securityTrimmingAction)
        {
            securityTrimmingAction(new SecurityTrimmingBuilder(Component.SecurityTrimming));

            return this;
        }
    }
}