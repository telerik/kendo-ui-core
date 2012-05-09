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

    public class TabStrip : ViewComponentBase, INavigationItemComponent<TabStripItem>, IEffectEnabled
    {
        private readonly IList<IEffect> defaultEffects = new List<IEffect>{ new SlideAnimation() };

        private readonly ITabStripHtmlBuilderFactory builderFactory;
        internal bool isPathHighlighted;

        public TabStrip(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization, ITabStripHtmlBuilderFactory rendererFactory) : base(viewContext, clientSideObjectWriterFactory)
        {
            Guard.IsNotNull(urlGenerator, "urlGenerator");
            Guard.IsNotNull(authorization, "authorization");
            Guard.IsNotNull(rendererFactory, "rendererFactory");

            this.builderFactory = rendererFactory;

            UrlGenerator = urlGenerator;
            Authorization = authorization;

            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.tabstrip.js" });

            this.Effects = new Effects();
            defaultEffects.Each(el => Effects.Container.Add(el));

            ClientEvents = new TabStripClientEvents();

            Items = new List<TabStripItem>();
            SelectedIndex = -1;
            HighlightPath = true;
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

        public TabStripClientEvents ClientEvents
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public IList<TabStripItem> Items
        {
            get;
            private set;
        }

        public Action<TabStripItem> ItemAction
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            string id = Id;

            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(id, "tTabStrip", writer);

            objectWriter.Start();

            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            objectWriter.AppendClientEvent("onSelect", ClientEvents.OnSelect);
            objectWriter.AppendClientEvent("onContentLoad", ClientEvents.OnContentLoad);
            objectWriter.AppendClientEvent("onLoad", ClientEvents.OnLoad);
            objectWriter.AppendClientEvent("onError", ClientEvents.OnError);

            objectWriter.AppendContentUrls("contentUrls", Items, IsSelfInitialized);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            if (Items.Any())
            {
                ITabStripHtmlBuilder builder = builderFactory.Create(this);

                int itemIndex = 0;
                bool isPathHighlighted = false;

                IHtmlNode tabStripTag = builder.TabStripTag();

                //this loop is required because of SelectedIndex feature.
                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                Items.Each(item =>
                {
                    if (!isPathHighlighted)
                    {
                        if (itemIndex == this.SelectedIndex)
                        {
                            item.Selected = true;
                        }
                        itemIndex++;
                    }
                    
                    WriteItem(item, tabStripTag, builder);
                });

                tabStripTag.WriteTo(writer);
            }
            base.WriteHtml(writer);
        }

        private void WriteItem(TabStripItem item, IHtmlNode parentTag, ITabStripHtmlBuilder builder)
        {
            if (ItemAction != null)
            {
                ItemAction(item);
            }

            var accessible = true;
            if (this.SecurityTrimming)
            {
                accessible = item.IsAccessible(Authorization, ViewContext);
            }

            if (item.Visible && accessible)
            {
                IHtmlNode itemTag = builder.ItemTag(item).AppendTo(parentTag.Children[0]);

                builder.ItemInnerTag(item).AppendTo(itemTag);

                if (item.Template.HasValue() || item.ContentUrl.HasValue())
                {
                    builder.ItemContentTag(item).AppendTo(parentTag);
                }
            }
        }

        private void HighlightSelectedItem(TabStripItem item)
        {
            if (item.IsCurrent(ViewContext, UrlGenerator))
            {
                isPathHighlighted = true;
                item.Selected = true;
            }
        }
    }
}