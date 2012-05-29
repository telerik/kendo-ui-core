namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Infrastructure;

    public class TabStrip : ViewComponentBase, INavigationItemComponent<TabStripItem>
    {
        //private readonly IList<IEffect> defaultEffects = new List<IEffect>{ new SlideAnimation() };

        private readonly ITabStripHtmlBuilderFactory builderFactory;
        internal bool isPathHighlighted;

        public TabStrip(ViewContext viewContext, IJavaScriptInitializer initializer, 
            IUrlGenerator urlGenerator, INavigationItemAuthorization authorization, ITabStripHtmlBuilderFactory rendererFactory) : base(viewContext, initializer)
        {
            this.builderFactory = rendererFactory;

            UrlGenerator = urlGenerator;
            Authorization = authorization;

            //defaultEffects.Each(el => Effects.Container.Add(el));

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
            var options = new Dictionary<string, object>(Events);

            // TODO: add animation configuration and builder
            //if (!defaultEffects.SequenceEqual(Effects.Container))
            //{
            //    objectWriter.Serialize("effects", Effects);
            //}

            var urls = Items.Where(item => item.Visible).Select(item =>
                {
                    if (item.ContentUrl.HasValue())
                    {
                        return HttpUtility.UrlDecode(item.ContentUrl);
                    }
                    else
                    {
                        return "";
                    }
                });

            if (urls.Any(url => url.HasValue()))
            {
                options["contentUrls"] = urls;
            }

            writer.Write(Initializer.Initialize(Id, "TabStrip", options));

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