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
    using Resources;

    public class PanelBar : WidgetBase, INavigationItemComponent<PanelBarItem>
    {
        internal bool isPathHighlighted;
        internal bool isExpanded;

        public PanelBar(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization)
            : base(viewContext, initializer)
        {

            Authorization = authorization;
            UrlGenerator = urlGenerator;

            Animation = new ExpandableAnimation();

            ExpandMode = PanelBarExpandMode.Multiple;
            HighlightPath = true;

            Items = new LinkedObjectCollection<PanelBarItem>(null);

            SelectedIndex = -1;
            SecurityTrimming = new SecurityTrimming();
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

        public ExpandableAnimation Animation
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

            options["expandMode"] = ExpandMode;
            //options["contentUrls"] = Items;

            writer.Write(Initializer.Initialize(Selector, "PanelBar", options));

            base.WriteInitializationScript(writer);
        }
        
        protected override void WriteHtml(HtmlTextWriter writer)
        {

            if (Items.Any())
            {
                if (SelectedIndex != -1 && Items.Count < SelectedIndex)
                {
                    throw new ArgumentOutOfRangeException(Exceptions.IndexOutOfRange);
                }

                int itemIndex = 0;

                var builder = new PanelBarHtmlBuilder(this, DI.Current.Resolve<IActionMethodCache>());

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
