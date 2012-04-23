// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TreeView"/> component.
    /// </summary>
    public class TreeViewBuilder : ViewComponentBuilderBase<TreeView, TreeViewBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TreeViewBuilder(TreeView component)
            : base(component)
        {
        }

        /// <summary>
        /// Defines the items in the TreeView
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder Items(Action<TreeViewItemFactory> addAction)
        {
            Guard.IsNotNull(addAction, "addAction");

            TreeViewItemFactory factory = new TreeViewItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ClientEvents(events =>
        ///                 .OnDataBinding("onDataBinding")
        ///                 .OnItemDataBound("onItemDataBound")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder ClientEvents(Action<TreeViewClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new TreeViewClientEventsBuilder(Component.ClientEvents, Component.ViewContext));

            return this;
        }


        /// <summary>
        /// Binds the TreeView to a sitemap
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <param name="siteMapAction">The action to configure the item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .BindTo("examples", (item, siteMapNode) =>
        ///             {
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder BindTo(string viewDataKey, Action<TreeViewItem, SiteMapNode> siteMapAction)
        {
            Guard.IsNotNullOrEmpty(viewDataKey, "viewDataKey");

            Component.BindTo(viewDataKey, siteMapAction);

            return this;
        }


        /// <summary>
        /// Binds the TreeView to a sitemap.
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .BindTo("examples")
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder BindTo(string viewDataKey)
        {
            Guard.IsNotNullOrEmpty(viewDataKey, "viewDataKey");

            Component.BindTo(viewDataKey);

            return this;
        }

        /// <summary>
        /// Binds the TreeView to a list of items.
        /// Use if a hierarchy of items is being sent from the controller; to bind the TreeView declaratively, use the Items() method.
        /// </summary>
        /// <param name="items">The list of items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .BindTo(model)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder BindTo(IEnumerable<TreeViewItemModel> items)
        {
            Guard.IsNotNull(items, "items");

            Component.BindTo(items, mapping => mapping
                .For<TreeViewItemModel>(binding => binding
                    .ItemDataBound((item, node) => {
                        item.Text = node.Text;
                        item.Enabled = node.Enabled;
                        item.Expanded = node.Expanded;
                        item.LoadOnDemand = node.LoadOnDemand;
                        item.Checked = node.Checked;
                        item.Checkable = node.Checkable;
                        item.Encoded = node.Encoded;
                        item.Value = node.Value;
                        
                        if (!String.IsNullOrEmpty(node.NavigateUrl))
                        {
                            item.Url = node.NavigateUrl;
                        }

                        item.ImageUrl = node.ImageUrl;
                    })
                    .Children(item => item.Items)
                )
            );

            return this;
        }

        /// <summary>
        /// Binds the TreeView to a list of objects. The TreeView will be "flat" which means a TreeView item will be created for 
        /// every item in the data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="itemDataBound">The action executed for every data bound item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .BindTo(new []{"First", "Second"}, (item, value)
        ///             {
        ///                item.Text = value;
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder BindTo<T>(IEnumerable<T> dataSource, Action<TreeViewItem, T> itemDataBound)
        {
            Guard.IsNotNull(itemDataBound, "itemDataBound");

            Component.BindTo(dataSource, itemDataBound);

            return this;
        }

        /// <summary>
        /// Binds the TreeView to a list of objects. The TreeView will create a hierarchy of items using the specified mappings.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="factoryAction">The action which will configure the mappings</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .BindTo(Model, mapping => mapping
        ///                     .For&lt;Customer&gt;(binding => binding
        ///                         .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
        ///                         .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to TreeViewItem properties
        ///                     )
        ///                     .For&lt;Order&lt;(binding => binding
        ///                         .Children(o => null) // "Orders" do not have child objects so return "null"
        ///                         .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to TreeViewItem properties
        ///                     )
        ///             ) 
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder BindTo(IEnumerable dataSource, Action<NavigationBindingFactory<TreeViewItem>> factoryAction)
        {
            Guard.IsNotNull(factoryAction, "factoryAction");

            Component.BindTo(dataSource, factoryAction);

            return this;
        }

        /// <summary>
        /// Use it to configure Data binding.
        /// </summary>
        /// <param name="configurator">Action that configures the data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .Ajax().Select("_AjaxLoading", "TreeView")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TreeViewBuilder DataBinding(Action<TreeViewDataBindingConfigurationBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new TreeViewDataBindingConfigurationBuilder(Component.DataBinding));

            return this;
        }

        /// <summary>
        /// Callback for each item.
        /// </summary>
        /// <param name="action">Action, which will be executed for each item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ItemAction(item =>
        ///             {
        ///                 item
        ///                     .Text(...)
        ///                     .HtmlAttributes(...);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder ItemAction(Action<TreeViewItem> action)
        {
            Guard.IsNotNull(action, "action");

            Component.ItemAction = action;

            return this;
        }

        /// <summary>
        /// Select item depending on the current URL.
        /// </summary>
        /// <param name="value">If true the item will be highlighted.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .HighlightPath(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder HighlightPath(bool value)
        {
            Component.HighlightPath = value;

            return this;
        }

        /// <summary>
        /// Configures the effects of the TreeView.
        /// </summary>
        /// <param name="effectsAction">The action which configures the effects.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().TreeView()
        ///	           .Name("TreeView")
        ///	           .Effects(fx =>
        ///	           {
        ///		            fx.Slide()
        ///			          .Opacity()
        ///					  .OpenDuration(AnimationDuration.Normal)
        ///					  .CloseDuration(AnimationDuration.Normal);
        ///	           })
        /// </code>
        /// </example>
        public TreeViewBuilder Effects(Action<EffectsBuilder> addEffects)
        {
            Guard.IsNotNull(addEffects, "addAction");

            EffectsBuilderFactory factory = new EffectsBuilderFactory();

            addEffects(factory.Create(Component.Effects));

            return this;
        }

        /// <summary>
        /// Expand all the items.
        /// </summary>
        /// <param name="value">If true all the items will be expanded.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ExpandAll(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder ExpandAll(bool value)
        {
            Component.ExpandAll = value;

            return this;
        }

        /// <summary>
        /// ShowLines indicates if lines connecting child nodes to parent nodes are displayed.
        /// </summary>
        /// <param name="value">If true lines connecting child nodes to parent nodes are displayed.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ShowLines(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder ShowLines(bool value)
        {
            Component.ShowLines = value;

            return this;
        }

        /// <summary>
        /// ShowCheckBox indicates if checkbox displayed before node.
        /// </summary>
        /// <param name="value">If true checkbox will be displayed for every node.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .ShowCheckBox(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder ShowCheckBox(bool value)
        {
            Component.ShowCheckBox = value;

            return this;
        }

        /// <summary>
        /// Enables drag &amp; drop between treeview nodes.
        /// </summary>
        /// <param name="value">If true, drag &amp; drop is enabled.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        ///             .DragAndDrop(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder DragAndDrop(bool value)
        {
            Component.DragAndDrop.Enabled = value;

            return this;
        }

        /// <summary>
        /// Enables drag &amp; drop between treeview nodes.
        /// </summary>
        /// <param name="configureDragAndDrop">Action that configures the drag and drop options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        ///             .DragAndDrop(settings =>
        ///             {
        ///                 
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder DragAndDrop(Action<TreeViewDragAndDropSettingsBuilder> configureDragAndDrop)
        {
            Component.DragAndDrop.Enabled = true;

            configureDragAndDrop(new TreeViewDragAndDropSettingsBuilder(Component.DragAndDrop));

            return this;
        }

        /// <summary>
        /// Enable/disable security trimming functionality of the component.
        /// </summary>
        /// <param name="value">If true security trimming is enabled.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .SecurityTrimming(false)
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewBuilder SecurityTrimming(bool value)
        {
            Guard.IsNotNull(value, "value");

            Component.SecurityTrimming = value;

            return this;
        }
    }
}