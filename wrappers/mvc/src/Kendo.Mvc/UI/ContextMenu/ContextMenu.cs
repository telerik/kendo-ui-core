namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;

    public class ContextMenu : WidgetBase, INavigationItemComponent<ContextMenuItem>
    {
        internal bool isPathHighlighted;

        public ContextMenu(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization)
            : base(viewContext, initializer)
        {
            Animation = new PopupAnimation();

            UrlGenerator = urlGenerator;
            Authorization = authorization;
          
            Items = new LinkedObjectCollection<ContextMenuItem>(null);

            CloseOnClick = true;
            HighlightPath = true;
            SecurityTrimming = new SecurityTrimming();
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public bool OpenOnClick
        {
            get;
            set;
        }

        public bool CloseOnClick
        {
            get;
            set;
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

        public ContextMenuOrientation Orientation
        {
            get;
            set;
        }

        public string Direction
        {
            get;
            set;
        }

        public string Target
        {
            get;
            set;
        }

        public string Filter
        {
            get;
            set;
        }

        public string ShowOn
        {
            get;
            set;
        }

        public IList<ContextMenuItem> Items
        {
            get;
            private set;
        }

        public Action<ContextMenuItem> ItemAction
        {
            get;
            set;
        }

        public bool HighlightPath
        {
            get;
            set;
        }

        public bool AlignToAnchor
        {
            get;
            set;
        }

        public SecurityTrimming SecurityTrimming
        {
            get;
            set;
        }

        public int? HoverDelay
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

            if (Direction.HasValue())
            {
                options["direction"] = Direction;
            }

            if (Orientation != ContextMenuOrientation.Vertical)
            {
                options["orientation"] = Orientation.ToString().ToLower();
            }
            
            if (OpenOnClick)
            {
                options["openOnClick"] = true;
            }

            if (!CloseOnClick)
            {
                options["closeOnClick"] = false;
            }

            if (AlignToAnchor)
            {
                options["alignToAnchor"] = true;
            }

            if (!Target.HasValue())
            {
                options["target"] = Target;
            }

            if (!Filter.HasValue())
            {
                options["filter"] = Filter;
            }

            if (!ShowOn.HasValue())
            {
                options["showOn"] = ShowOn;
            }

            if (HoverDelay != null)
            {
                options["hoverDelay"] = HoverDelay;
            }

            writer.Write(Initializer.Initialize(Selector, "ContextMenu", options));

            base.WriteInitializationScript(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            this.ThrowIfClassIsPresent("t-menu-rtl", Exceptions.Rtl);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (Items.Any())
            {
                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                INavigationComponentHtmlBuilder<ContextMenuItem> builder = new ContextMenuHtmlBuilder(this);

                IHtmlNode menuTag = builder.Build();

                Items.Each(item => item.WriteItem<ContextMenu, ContextMenuItem>(this, menuTag, builder));

                menuTag.WriteTo(writer);
            }
            
            base.WriteHtml(writer);
        }

        private void HighlightSelectedItem(ContextMenuItem item)
        {
            if (item.IsCurrent(ViewContext, UrlGenerator))
            {
                isPathHighlighted = true;

                item.Selected = item.Parent != null;

                do
                {
                    if (!item.Selected)
                    {
                        item.HtmlAttributes.AppendInValue("class", " ", "k-state-highlight");
                    }
                    item = item.Parent;
                }
                while (item != null);

                return;
            }
            item.Items.Each(HighlightSelectedItem);
        }
    }
}
