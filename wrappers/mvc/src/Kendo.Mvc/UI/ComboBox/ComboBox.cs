namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;

    public class ComboBox : ViewComponentBase
    {
        //private bool hasItems = false;

        public ComboBox(ViewContext viewContext,  IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData)
        {
            //animation //
            
            ClientEvents = new DropDownClientEvents();

            DataSource = new DataSource();

            UrlGenerator = urlGenerator;

            AutoBind = true;
            Enabled = true;
            HighlightFirst = true;
            IgnoreCase = true;
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

        public int? SelectedIndex
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                options["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                options["dataSource"] = DataSource.Data;
            }

            if (!AutoBind)
            {
                options["autoBind"] = AutoBind;
            }

            if (!string.IsNullOrEmpty(DataTextField))
            {
                options["dataTextField"] = DataTextField;
            }

            if (!string.IsNullOrEmpty(DataValueField))
            {
                options["dataValueField"] = DataValueField;
            }

            if (Delay != null)
            {
                options["delay"] = Delay;
            }

            if (!string.IsNullOrEmpty(Filter))
            {
                options["filter"] = Filter;
            }

            if (Height != null)
            {
                options["height"] = Height;
            }

            if (!HighlightFirst)
            {
                options["highlightFirst"] = HighlightFirst;
            }

            if (!IgnoreCase)
            {
                options["ignoreCase"] = IgnoreCase;
            }

            if (SelectedIndex != null)
            {
                options["index"] = SelectedIndex;
            }

            if (MinLength != null)
            {
                options["minLength"] = MinLength;
            }

            if (!string.IsNullOrEmpty(Placeholder))
            {
                options["placeholder"] = Placeholder;
            }

            if (Suggest)
            {
                options["suggest"] = Suggest;
            }

            if (!string.IsNullOrEmpty(Template))
            {
                options["template"] = Template;
            }

            writer.Write(Initializer.Initialize(Id, "ComboBox", options));

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