namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Extensions;
    using Infrastructure;
    using Kendo.Mvc.Resources;

    /// <summary>
    /// Telerik Treeview for ASP.NET MVC is a view component for presenting hierarchical data.
    /// </summary>
    public class TreeView : ViewComponentBase, INavigationItemComponent<TreeViewItem>
    {
        //private readonly IList<IEffect> defaultEffects = new List<IEffect> { new PropertyAnimation(PropertyAnimationType.Height) };

        private readonly ITreeViewHtmlBuilderFactory builderFactory;

        internal bool isPathHighlighted;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeView"/> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL generator.</param>
        /// <param name="urlGenerator">The navigation item authorization.</param>
        /// <param name="builderFactory">The builder factory.</param>
        public TreeView(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization, ITreeViewHtmlBuilderFactory factory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            Guard.IsNotNull(urlGenerator, "urlGenerator");
            Guard.IsNotNull(authorization, "authorization");
            Guard.IsNotNull(factory, "factory");

            UrlGenerator = urlGenerator;
            Authorization = authorization;
            builderFactory = factory;

            ClientEvents = new TreeViewClientEvents();

            DragAndDrop = new TreeViewDragAndDropSettings();

            DataBinding = new TreeViewDataBindingConfiguration();
            Ajax = DataBinding.Ajax;
            WebService = DataBinding.WebService;

            //defaultEffects.Each(el => Effects.Container.Add(el));

            Items = new LinkedObjectCollection<TreeViewItem>(null);

            ShowLines = true;

            SelectedIndex = -1;
            SecurityTrimming = true;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public INavigationItemAuthorization Authorization
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the client events of the treeview.
        /// </summary>
        /// <value>The client events.</value>
        public TreeViewClientEvents ClientEvents
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the items of the treeview.
        /// </summary>
        public IList<TreeViewItem> Items
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the item action.
        /// </summary>
        public Action<TreeViewItem> ItemAction
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects.
        /// </summary>
        public Effects Effects
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether all the item is expanded.
        /// </summary>
        /// <value><c>true</c> if expand all is enabled; otherwise, <c>false</c>. The default value is <c>false</c></value>
        public bool ExpandAll
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether all the item is expanded.
        /// </summary>
        /// <value><c>true</c> if expand all is enabled; otherwise, <c>false</c>. The default value is <c>false</c></value>
        public bool ShowLines
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether all the item is expanded.
        /// </summary>
        /// <value><c>true</c> if expand all is enabled; otherwise, <c>false</c>. The default value is <c>false</c></value>
        public bool ShowCheckBox
        {
            get;
            set;
        }

        public int SelectedIndex
        {
            get;
            set;
        }

        public bool HighlightPath
        {
            get;
            set;
        }

        public bool SecurityTrimming
        {
            get;
            set;
        }

        public TreeViewDataBindingConfiguration DataBinding
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the ajax configuration.
        /// </summary>
        public TreeViewBindingSettings Ajax
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the web service configuration
        /// </summary>
        public TreeViewBindingSettings WebService
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the drag & drop configuration
        /// </summary>
        public TreeViewDragAndDropSettings DragAndDrop
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoTreeView", writer);
            objectWriter.Start();

            //if (!defaultEffects.SequenceEqual(Effects.Container))
            //{
            //    objectWriter.Serialize("effects", Effects);
            //}

            if (!ShowLines)
            {
                objectWriter.Append("showLines", ShowLines);
            }

            if (ShowCheckBox)
            {
                objectWriter.Append("showCheckBox", ShowCheckBox);
            }

            if (DragAndDrop.Enabled)
            {
                if (DragAndDrop.DropTargets.HasValue())
                {
                    var dragAndDropOptions = new Dictionary<string, string>();

                    dragAndDropOptions["dropTargets"] = DragAndDrop.DropTargets;

                    objectWriter.AppendObject("dragAndDrop", dragAndDropOptions);
                }
                else
                {
                    objectWriter.Append("dragAndDrop", true);
                }
            }

            if (Ajax.Enabled)
            {
                Dictionary<string, string> ajax = new Dictionary<string, string>();

                ajax["selectUrl"] = UrlGenerator.Generate(ViewContext.RequestContext, Ajax.Select);

                objectWriter.AppendObject("ajax", ajax);
            }

            if (WebService.Enabled)
            {
                Dictionary<string, string> webService = new Dictionary<string, string>();

                webService["selectUrl"] = UrlGenerator.Generate(ViewContext.RequestContext, WebService.Select.Url);

                objectWriter.AppendObject("ws", webService);
            }

            objectWriter.AppendClientEvent("onExpand", ClientEvents.OnExpand);
            objectWriter.AppendClientEvent("onCollapse", ClientEvents.OnCollapse);
            objectWriter.AppendClientEvent("onSelect", ClientEvents.OnSelect);
            objectWriter.AppendClientEvent("onLoad", ClientEvents.OnLoad);
            objectWriter.AppendClientEvent("onError", ClientEvents.OnError);
            objectWriter.AppendClientEvent("onChecked", ClientEvents.OnChecked);
            objectWriter.AppendClientEvent("onNodeDragStart", ClientEvents.OnNodeDragStart);
            objectWriter.AppendClientEvent("onNodeDragging", ClientEvents.OnNodeDragging);
            objectWriter.AppendClientEvent("onNodeDragCancelled", ClientEvents.OnNodeDragCancelled);
            objectWriter.AppendClientEvent("onNodeDrop", ClientEvents.OnNodeDrop);
            objectWriter.AppendClientEvent("onNodeDropped", ClientEvents.OnNodeDropped);
            objectWriter.AppendClientEvent("onDataBinding", ClientEvents.OnDataBinding);
            objectWriter.AppendClientEvent("onDataBound", ClientEvents.OnDataBound);

            objectWriter.Complete();
            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            ITreeViewHtmlBuilder builder = builderFactory.Create(this);

            IHtmlNode treeViewTag = builder.TreeViewTag();

            if (Items.Any())
            {
                if (SelectedIndex != -1 && Items.Count < SelectedIndex)
                {
                    throw new ArgumentOutOfRangeException(TextResource.IndexOutOfRange);
                }

                //this loop is required because of SelectedIndex feature.
                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                Items.Each((item, index) =>
                {
                    if (!this.isPathHighlighted)
                    {
                        if (index == this.SelectedIndex)
                        {
                            item.Selected = true;

                            if (item.Items.Any() || item.Template.HasValue())
                            {
                                item.Expanded = true;
                            }
                        }
                    }

                    if (item.LoadOnDemand)
                    {
                        item.Expanded = false;
                    }

                    if (ExpandAll)
                    {
                        ExpandAllChildrens(item);
                    }

                    if (string.IsNullOrEmpty(item.Value))
                    {
                        item.Value = item.Text;
                    }

                    WriteItem(item, treeViewTag.Children[0], builder);
                });
            }

            treeViewTag.WriteTo(writer);

            base.WriteHtml(writer);
        }

        private void ExpandAllChildrens(TreeViewItem treeViewItem)
        {
            treeViewItem.Expanded = true;

            foreach (var item in treeViewItem.Items)
            {
                ExpandAllChildrens(item);
            }
        }

        private void WriteItem(TreeViewItem item, IHtmlNode parentTag, ITreeViewHtmlBuilder builder)
        {
            if (ItemAction != null)
            {
                ItemAction(item);
            }

            if (item.Visible)
            {
                var accessible = true;
                if (this.SecurityTrimming)
                {
                    accessible = item.IsAccessible(Authorization, ViewContext);
                }


                if (accessible)
                {
                    var hasAccessibleChildren = item.Items.Any(x => x.Visible);
                    if (hasAccessibleChildren && this.SecurityTrimming)
                    {
                        hasAccessibleChildren = item.Items.IsAccessible(Authorization, ViewContext);
                    }

                    IHtmlNode itemTag = builder.ItemTag(item, hasAccessibleChildren).AppendTo(parentTag);

                    builder.ItemInnerContent(item).AppendTo(itemTag.Children[0]);

                    if (item.LoadOnDemand || ShowCheckBox || item.Value.HasValue())
                    {
                        builder.ItemHiddenInputValue(item).AppendTo(itemTag.Children[0]);
                    }

                    if (item.Template.HasValue())
                    {
                        builder.ItemContentTag(item).AppendTo(itemTag);
                    }
                    else if (hasAccessibleChildren)
                    {
                        IHtmlNode ul = builder.ChildrenTag(item).AppendTo(itemTag);

                        item.Items.Each(child => WriteItem(child, ul, builder));
                    }
                }
            }
        }

        private void HighlightSelectedItem(TreeViewItem item)
        {
            if (item.IsCurrent(ViewContext, UrlGenerator))
            {
                item.Selected = true;
                isPathHighlighted = true;

                TreeViewItem tmpItem = item.Parent;

                while (tmpItem != null)
                {
                    tmpItem.Expanded = true;
                    tmpItem = tmpItem.Parent;
                }
            }

            item.Items.Each(HighlightSelectedItem);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Ajax.Enabled && WebService.Enabled)
            {
                throw new NotSupportedException(TextResource.CannotUseAjaxAndWebServiceAtTheSameTime);
            }

            if (WebService.Enabled && string.IsNullOrEmpty(WebService.Select.Url))
            {
                throw new ArgumentException(TextResource.WebServiceUrlRequired);
            }
        }
    }
}