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

    public class TabStrip : WidgetBase, INavigationItemComponent<TabStripItem>
    {
        internal bool isPathHighlighted;

        public TabStrip(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization) 
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;
            Authorization = authorization;

            Animation = new PopupAnimation();

            Items = new List<TabStripItem>();
            SelectedIndex = -1;
            HighlightPath = true;
            SecurityTrimming = new SecurityTrimming();
        }

        public PopupAnimation Animation
        {
            get;
            private set;
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

        public SecurityTrimming SecurityTrimming
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
            }

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

            writer.Write(Initializer.Initialize(Selector, "TabStrip", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {

            if (Items.Any())
            {
                TabStripHtmlBuilder builder = new TabStripHtmlBuilder(this);

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

        private void WriteItem(TabStripItem item, IHtmlNode parentTag, TabStripHtmlBuilder builder)
        {
            if (ItemAction != null)
            {
                ItemAction(item);
            }

            var accessible = true;
            if (this.SecurityTrimming.Enabled)
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