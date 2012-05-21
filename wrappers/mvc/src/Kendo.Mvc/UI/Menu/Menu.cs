namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;

    public class Menu : ViewComponentBase, INavigationItemComponent<MenuItem>
    {
        //private readonly IList<IEffect> defaultEffects = new List<IEffect> { new SlideAnimation() };

        private readonly INavigationComponentHtmlBuilderFactory<Menu, MenuItem> rendererFactory;
        internal bool isPathHighlighted;

        public Menu(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization, INavigationComponentHtmlBuilderFactory<Menu, MenuItem> factory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            Guard.IsNotNull(urlGenerator, "urlGenerator");
            Guard.IsNotNull(authorization, "authorization");
            Guard.IsNotNull(factory, "factory");

            UrlGenerator = urlGenerator;
            Authorization = authorization;
            rendererFactory = factory;

            ClientEvents = new MenuClientEvents();

            this.Effects = new Effects();
            //defaultEffects.Each(el => Effects.Container.Add(el));

            Items = new LinkedObjectCollection<MenuItem>(null);

            SelectedIndex = -1;
            HighlightPath = true;
            SecurityTrimming = true;
        }

        public bool OpenOnClick
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

        public MenuOrientation Orientation
        {
            get;
            set;
        }

        public MenuClientEvents ClientEvents
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public IList<MenuItem> Items
        {
            get;
            private set;
        }

        public Action<MenuItem> ItemAction
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
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoMenu", writer);

            objectWriter.Start()
                        .Append("orientation", Orientation, MenuOrientation.Horizontal);

            //if (!defaultEffects.SequenceEqual(Effects.Container))
            //{
            //    objectWriter.Serialize("effects", Effects);
            //}

            if (OpenOnClick)
            {
                objectWriter.Append("openOnClick", true);
            }

            objectWriter.AppendClientEvent("onOpen", ClientEvents.OnOpen);
            objectWriter.AppendClientEvent("onClose", ClientEvents.OnClose);
            objectWriter.AppendClientEvent("onSelect", ClientEvents.OnSelect);
            objectWriter.AppendClientEvent("onLoad", ClientEvents.OnLoad);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            this.ThrowIfClassIsPresent("t-menu-rtl", TextResource.Rtl);
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

                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                INavigationComponentHtmlBuilder<MenuItem> builder = rendererFactory.Create(this);

                IHtmlNode menuTag = builder.Build();

                Items.Each(item => item.WriteItem<Menu, MenuItem>(this, menuTag, builder));

                menuTag.WriteTo(writer);
            }
            
            base.WriteHtml(writer);
        }

        private void HighlightSelectedItem(MenuItem item)
        {
            if (item.IsCurrent(ViewContext, UrlGenerator))
            {
                isPathHighlighted = true;

                item.Selected = item.Parent != null;

                MenuItem tmpItem = item;
                do
                {
                    if (!tmpItem.Selected)
                    {
                        tmpItem.HtmlAttributes.AppendInValue("class", " ", "t-highlighted");
                    }
                    tmpItem = tmpItem.Parent;
                }
                while (tmpItem != null);

                return;
            }
            item.Items.Each(HighlightSelectedItem);
        }
    }
}
