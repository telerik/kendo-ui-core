namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;

    using Extensions;
    using Infrastructure;
    using Resources;

    public class PanelBar : ViewComponentBase, INavigationItemComponent<PanelBarItem>, IEffectEnabled
    {
        private readonly IList<IEffect> defaultEffects = new List<IEffect> { new PropertyAnimation(PropertyAnimationType.Height) };

        private readonly INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem> builderFactory;

        internal bool isPathHighlighted;
        internal bool isExpanded;

        public PanelBar(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization, INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem> rendererFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            Guard.IsNotNull(urlGenerator, "urlGenerator");
            Guard.IsNotNull(authorization, "authorization");

            Authorization = authorization;
            UrlGenerator = urlGenerator;

            this.builderFactory = rendererFactory;

            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.panelbar.js" });

            ClientEvents = new PanelBarClientEvents();

            this.Effects = new Effects();
            defaultEffects.Each(el => Effects.Container.Add(el));

            ExpandMode = PanelBarExpandMode.Multiple;
            HighlightPath = true;

            Items = new LinkedObjectCollection<PanelBarItem>(null);

            SelectedIndex = -1;
            SecurityTrimming = true;
        }

        public INavigationItemAuthorization Authorization
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public PanelBarClientEvents ClientEvents
        {
            get;
            private set;
        }


        public Action<PanelBarItem> ItemAction
        {
            get;
            set;
        }

        public bool HighlightPath
        {
            get;
            set;
        }

        public PanelBarExpandMode ExpandMode
        {
            get;
            set;
        }

        public bool ExpandAll
        {
            get;
            set;
        }

        public int SelectedIndex
        {
            get;
            set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public IList<PanelBarItem> Items
        {
            get;
            private set;
        }

        public bool SecurityTrimming
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tPanelBar", writer);

            objectWriter.Start();

            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            objectWriter.AppendClientEvent("onExpand", ClientEvents.OnExpand);
            objectWriter.AppendClientEvent("onCollapse", ClientEvents.OnCollapse);
            objectWriter.AppendClientEvent("onSelect", ClientEvents.OnSelect);
            objectWriter.AppendClientEvent("onLoad", ClientEvents.OnLoad);
            objectWriter.AppendClientEvent("onError", ClientEvents.OnError);

            objectWriter.Append("expandMode", (int) ExpandMode);

            objectWriter.AppendContentUrls("contentUrls", Items, IsSelfInitialized);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }
        
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            if (Items.Any())
            {
                if (SelectedIndex != -1 && Items.Count < SelectedIndex)
                {
                    throw new ArgumentOutOfRangeException(TextResource.IndexOutOfRange);
                }

                int itemIndex = 0;

                INavigationComponentHtmlBuilder<PanelBarItem> builder = builderFactory.Create(this);

                IHtmlNode panelbarTag = builder.Build();

                //this loop is required because of SelectedIndex feature.
                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                this.Items.Each(item =>
                {
                    if (item.Enabled)
                    {
                        PrepareItem(item, itemIndex);
                    }

                    itemIndex++;

                    item.WriteItem<PanelBar, PanelBarItem>(this, panelbarTag, builder);
                });

                panelbarTag.WriteTo(writer);
            }
            base.WriteHtml(writer);
        }

        private void HighlightSelectedItem(PanelBarItem item)
        {
            if (item.Enabled)
            {
                if (item.IsCurrent(ViewContext, UrlGenerator))
                {
                    item.Selected = true;
                    isPathHighlighted = true;

                    PanelBarItem tmpItem = item.Parent;
                    while (tmpItem != null)
                    {
                        tmpItem.Expanded = true;
                        tmpItem = tmpItem.Parent;
                    }
                }
                item.Items.Each(HighlightSelectedItem);
            }
        }

        private void PrepareItem(PanelBarItem item, int itemIndex) 
        {
            if (!this.isPathHighlighted)
            {
                if (itemIndex == this.SelectedIndex)
                {
                    item.Selected = true;

                    if (item.Items.Any() || item.Template.HasValue() || !string.IsNullOrEmpty(item.ContentUrl))
                        item.Expanded = true;
                }
            }

            if (ExpandMode == PanelBarExpandMode.Single)
            {
                if (item.Expanded && !isExpanded)
                {
                    isExpanded = true;
                }
                else
                {
                    if (item.Parent != null && item.Parent.Expanded)
                        item.Expanded = true;
                    else
                        item.Expanded = false;
                }
            }
            else
            {
                if (ExpandAll)
                {
                    item.Expanded = true;
                }
            }
        }
    }
}
