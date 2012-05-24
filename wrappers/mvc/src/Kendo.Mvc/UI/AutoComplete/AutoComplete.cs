namespace Kendo.Mvc.UI
{
    using Extensions;

    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Collections.Generic;


    public class AutoComplete : ViewComponentBase
    {
        //private readonly IList<IEffect> defaultEffects = new List<IEffect> { new SlideAnimation() };

        public AutoComplete(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            UrlGenerator = urlGenerator;

            ClientEvents = new Dictionary<string, object>();
            DropDownHtmlAttributes = new RouteValueDictionary();

            Items = new List<string>();

            Enabled = true;
            Encoded = true;
        }

        public bool Encoded
        {
            get;
            set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            set;
        }

        public bool AutoFill
        {
            get;
            set;
        }

        public IDictionary<string, object> ClientEvents
        {
            get;
            private set;
        }
        
        public IDictionary<string, object> DropDownHtmlAttributes
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            private set;
        }

        public IList<string> Items
        { 
            get;
            private set;
        }

        public bool HighlightFirstMatch
        {
            get;
            set;
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public string Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tAutoComplete", writer);

            objectWriter.Start();

            objectWriter.Append("autoFill", AutoFill, false);
            objectWriter.Append("highlightFirst", HighlightFirstMatch, false);
            
            if (Items.Any())
            {
                objectWriter.AppendCollection("data", Items);
            }

            if (DropDownHtmlAttributes.Any())
            {
                objectWriter.Append("dropDownAttr", DropDownHtmlAttributes.ToAttributeString());
            }

            objectWriter.Append("encoded", this.Encoded, true);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new AutoCompleteHtmlBuilder(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}