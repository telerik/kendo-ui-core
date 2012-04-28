namespace KendoUI.Mvc.UI
{

    using System;
    using System.IO;
    using System.Linq;
    using System.Web.UI;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Collections.Generic;

    using Extensions;
    using Infrastructure;
    using KendoUI.Mvc.Resources;
    
    public class Window : ViewComponentBase, IContentContainer, IAsyncContentContainer, IEffectEnabled
    {
        private readonly IList<IEffect> defaultEffects = new List<IEffect> { new ZoomAnimation(), new PropertyAnimation(PropertyAnimationType.Opacity) };

        private readonly IWindowHtmlBuilderFactory builderFactory;
        private readonly IList<IWindowButton> defaultButtons = new List<IWindowButton> { new HeaderButton{Name = "Close", CssClass = "t-close"} };
        
        private string loadContentFromUrl;

        public Window(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IWindowHtmlBuilderFactory builderFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            this.builderFactory = builderFactory;

            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.draganddrop.js", "telerik.window.js" });

            Template = new HtmlTemplate();

            ClientEvents = new WindowClientEvents();
            ResizingSettings = new WindowResizingSettings();

            Buttons = new WindowButtons();
            defaultButtons.Each(button => Buttons.Container.Add(button));

            Effects = new Effects();
            defaultEffects.Each(el => Effects.Container.Add(el));

            ContentHtmlAttributes = new RouteValueDictionary();

            Scrollable = true;

            Visible = true;
        }

        public HtmlTemplate Template
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public string IconUrl 
        { 
            get; 
            set; 
        }
        
        public string IconAlternativeText 
        { 
            get; 
            set; 
        }

        public string Title 
        { 
            get; 
            set; 
        }

        public int Width 
        { 
            get; 
            set; 
        }       

        public int Height 
        { 
            get; 
            set; 
        }

        public bool Visible 
        { 
            get; 
            set; 
        }

        public bool Scrollable 
        { 
            get; 
            set; 
        }

        public bool Modal 
        { 
            get; 
            set; 
        }

        public bool Draggable 
        { 
            get; 
            set; 
        }

        public WindowClientEvents ClientEvents
        {
            get;
            private set;
        }

        public WindowResizingSettings ResizingSettings
        {
            get;
            private set;
        }

        public WindowButtons Buttons
        {
            get;
            private set;
        }

        public string Html
        {
            get
            {
                return Template.Html;
            }
            set
            {
                Template.Html = value;
            }
        }

        public Action Content 
        {
            get
            {
                return Template.Content;
            }
            set
            {
                Template.Content = value; 

            }
        }

        public string ContentUrl
        {
            get
            {
                return loadContentFromUrl;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                loadContentFromUrl = value;
                ContentHtmlAttributes.Clear();
                Content = null;
            }
        }

        public IDictionary<string, object> ContentHtmlAttributes
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tWindow", writer);

            objectWriter.Start();

            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            //client events
            objectWriter.AppendClientEvent("onClose", ClientEvents.OnClose);
            objectWriter.AppendClientEvent("onError", ClientEvents.OnError);
            objectWriter.AppendClientEvent("onLoad", ClientEvents.OnLoad);
            objectWriter.AppendClientEvent("onDragStart", ClientEvents.OnDragStart);
            objectWriter.AppendClientEvent("onDragEnd", ClientEvents.OnDragEnd);
            objectWriter.AppendClientEvent("onOpen", ClientEvents.OnOpen);
            objectWriter.AppendClientEvent("onActivate", ClientEvents.OnActivate);
            objectWriter.AppendClientEvent("onResize", ClientEvents.OnResize);
            objectWriter.AppendClientEvent("onRefresh", ClientEvents.OnRefresh);

            //properties
            objectWriter.Append("modal", Modal);
            objectWriter.Append("contentUrl", ContentUrl);
            objectWriter.Append("draggable", Draggable);
            objectWriter.Append("resizable", ResizingSettings.Enabled);

            if (ResizingSettings.Enabled)
            {
                if(ResizingSettings.MinHeight != int.MinValue)
                    objectWriter.Append("minHeight", ResizingSettings.MinHeight);

                if (ResizingSettings.MinWidth != int.MinValue)
                    objectWriter.Append("minWidth", ResizingSettings.MinWidth);

                if (ResizingSettings.MaxHeight != int.MinValue)
                    objectWriter.Append("maxHeight", ResizingSettings.MaxHeight);

                if (ResizingSettings.MaxWidth != int.MinValue)
                    objectWriter.Append("maxWidth", ResizingSettings.MaxWidth);
            }

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            IWindowHtmlBuilder builder = builderFactory.Create(this);

            IHtmlNode windowTag = builder.WindowTag();

            //Header
            IHtmlNode headerTag = builder.HeaderTag().AppendTo(windowTag);

            builder.TitleTag().AppendTo(headerTag);

            if (Buttons.Container.Count > 0)
            {
                IHtmlNode buttonContainerTag = builder.ButtonContainerTag().AppendTo(headerTag);
                Buttons.Container.Each(button => builder.ButtonTag(button).AppendTo(buttonContainerTag));
            }

            //Content
            builder.ContentTag().AppendTo(windowTag);

            //output window HTML
            windowTag.WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (ResizingSettings.MinWidth != int.MinValue && 
                ResizingSettings.MaxWidth != int.MinValue &&
                ResizingSettings.MinWidth > ResizingSettings.MaxWidth)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinWidth", "MaxWidth"));
            }

            if (ResizingSettings.MinHeight != int.MinValue &&
                ResizingSettings.MaxHeight != int.MinValue &&
                ResizingSettings.MinHeight > ResizingSettings.MaxHeight)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinHeight", "MaxHeight"));
            }
        }
    }
}