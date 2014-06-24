namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using System.Collections;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ContextMenu"/> component.
    /// </summary>
    public class ContextMenuBuilder : WidgetBuilderBase<ContextMenu, ContextMenuBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenuBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ContextMenuBuilder(ContextMenu component)
            : base(component)
        {
        }

        public ContextMenuBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public ContextMenuBuilder Animation(Action<PopupAnimationBuilder> animationAction)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Items(Action<ContextMenuItemFactory> addAction)
        {
            ContextMenuItemFactory factory = new ContextMenuItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Events(events =>
        ///                 events.Open("onOpen").OnClose("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Events(Action<ContextMenuEventBuilder> clientEventsAction)
        {
            clientEventsAction(new ContextMenuEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Specifies ContextMenu opening direction.
        /// </summary>
        /// <param name="value">The desired direction.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Direction(ContextMenuDirection.Left)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Direction(ContextMenuDirection value)
        {
            Component.Direction = value.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Specifies ContextMenu opening direction.
        /// </summary>
        /// <param name="value">The desired direction.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Direction("top")
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Direction(string value)
        {
            Component.Direction = value;

            return this;
        }

        /// <summary>
        /// Specifies ContextMenu target to bind to.
        /// </summary>
        /// <param name="value">The desired target.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Target("#target")
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Target(string value)
        {
            Component.Target = value;

            return this;
        }

        /// <summary>
        /// Specifies ContextMenu filter selector - would filter elements inside the target to bind to.
        /// </summary>
        /// <param name="value">The desired filter.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Filter(".item")
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Filter(string value)
        {
            Component.Filter = value;

            return this;
        }

        /// <summary>
        /// Specifies ContextMenu triggering event.
        /// </summary>
        /// <param name="value">The desired event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .ShowOn("click")
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder ShowOn(string value)
        {
            Component.ShowOn = value;

            return this;
        }

        /// <summary>
        /// Sets the menu orientation.
        /// </summary>
        /// <param name="value">The desired orientation.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Orientation(ContextMenuOrientation.Vertical)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Orientation(ContextMenuOrientation value)
        {
            Component.Orientation = value;

            return this;
        }

        /// <summary>
        /// Enables or disables the "open-on-click" feature.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .OpenOnClick(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder OpenOnClick(bool value)
        {
            Component.OpenOnClick = value;

            return this;
        }

        /// <summary>
        /// Specifies that sub menus should close after item selection (provided they won't navigate).
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .CloseOnClick(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder CloseOnClick(bool value)
        {
            Component.CloseOnClick = value;

            return this;
        }

        /// <summary>
        /// Specifies that context menu would align to its anchor (target or filter).
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .AlignToAnchor(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder AlignToAnchor(bool value)
        {
            Component.AlignToAnchor = value;

            return this;
        }

        /// <summary>
        /// Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .HoverDelay(300)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder HoverDelay(int value)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .BindTo("examples", (item, siteMapNode) =>
        ///             {
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder BindTo(string viewDataKey, Action<ContextMenuItem, SiteMapNode> siteMapAction)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .BindTo("examples")
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder BindTo(string viewDataKey)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .BindTo(new []{"First", "Second"}, (item, value) =>
        ///             {
        ///                item.Text = value;
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder BindTo<T>(IEnumerable<T> dataSource, Action<ContextMenuItem, T> itemDataBound)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .BindTo(Model, mapping => mapping
        ///                     .For&lt;Customer&gt;(binding => binding
        ///                         .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
        ///                         .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to ContextMenuItem properties
        ///                     )
        ///                     .For&lt;Order&lt;(binding => binding
        ///                         .Children(o => null) // "Orders" do not have child objects so return "null"
        ///                         .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to ContextMenuItem properties
        ///                     )
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder BindTo(IEnumerable dataSource, Action<NavigationBindingFactory<ContextMenuItem>> factoryAction)
        {
            Component.BindTo(dataSource, factoryAction);

            return this;
        }

        /// <summary>
        /// Binds the menu to a list of items.
        /// Use if the menu items are being sent from the controller.
        /// To bind the ContextMenu declaratively, use the <seealso cref="Items(Action<ContextMenuItemFactory>)"> method.
        /// </summary>
        /// <param name="items">The list of items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("TreeView")
        ///             .BindTo(model)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder BindTo(IEnumerable<ContextMenuItem> items)
        {
            Component.Items.Clear();

            foreach (ContextMenuItem item in items)
            {
                Component.Items.Add(item);
            }

            return this;
        }

        /// <summary>
        /// Callback for each item.
        /// </summary>
        /// <param name="action">Action, which will be executed for each item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .ItemAction(item =>
        ///             {
        ///                 item
        ///                     .Text(...)
        ///                     .HtmlAttributes(...);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder ItemAction(Action<ContextMenuItem> action)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .HighlightPath(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder HighlightPath(bool value)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .SecurityTrimming(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder SecurityTrimming(bool value)
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
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .SecurityTrimming(builder =>
        ///             {
        ///                 builder.Enabled(true).HideParent(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder SecurityTrimming(Action<SecurityTrimmingBuilder> securityTrimmingAction)
        {
            securityTrimmingAction(new SecurityTrimmingBuilder(Component.SecurityTrimming));

            return this;
        }
    }
}
