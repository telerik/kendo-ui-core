namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Collections.Generic;

    using Extensions;

    public class ComboBox : ViewComponentBase
    {
        //private bool hasItems = false;

        public ComboBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory, viewData)
        {
            UrlGenerator = urlGenerator; //check if needed

            ClientEvents = new DropDownClientEvents();

            //Items = new List<DropDownItem>();

            //animation //
            
            DataSource = new DataSource();

            AutoBind = true;
            Enabled = true;
            HighlightFirst = true;
            IgnoreCase = true;
            SelectedIndex = -1;
            Suggest = false;
        }

        public bool AutoBind
        {
            get;
            set;
        }

        public DropDownClientEvents ClientEvents
        {
            get;
            private set;
        }
        
        public string DataTextField 
        { 
            get; 
            set; 
        }

        public string DataValueField 
        { 
            get; 
            set; 
        }

        public int? Delay
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Filter
        {
            get;
            set;
        }   

        public int? Height
        {
            get;
            set;
        }

        public bool HighlightFirst
        {
            get;
            set;
        }

        public bool IgnoreCase
        {
            get;
            set;
        }

        //public IList<DropDownItem> Items
        //{
        //    get;
        //    private set;
        //}

        public int? MinLength
        {
            get;
            set;
        }

        public string Placeholder
        {
            get;
            set;
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public int SelectedIndex
        {
            get;
            set;
        }

        public bool Suggest
        {
            get;
            set;
        }     

        public string Template
        {
            get;
            set;
        }
       
        public IUrlGenerator UrlGenerator
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
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoComboBox", writer);

            objectWriter.Start();

            objectWriter.Append("autoBind", AutoBind, true);
            objectWriter.Append("dataTextField", DataTextField);
            objectWriter.Append("dataValueField", DataValueField);
            objectWriter.Append("delay", Delay);
            objectWriter.Append("filter", Filter);
            objectWriter.Append("height", Height);
            objectWriter.Append("highlightFirst", HighlightFirst, true);
            objectWriter.Append("ignoreCase", IgnoreCase, true);
            objectWriter.Append("index", SelectedIndex, -1);
            objectWriter.Append("minLength", MinLength);
            objectWriter.Append("placeholder", this.Placeholder);
            objectWriter.Append("suggest", Suggest, false);
            objectWriter.Append("template", this.Template);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            //hasItems = Items.Any();
            //this.AddPlaceholderItem();
            //if (hasItems)
            //{
            //    this.SyncSelectedIndex();
            //}

            ComboBoxHtmlBuilder builder = new ComboBoxHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}