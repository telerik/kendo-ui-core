namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;

    public class DropDownList : ViewComponentBase
    {
        public DropDownList(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData)
        {
            Animation = new PopupAnimation();

            Events = new Dictionary<string, object>();

            DataSource = new DataSource();

            UrlGenerator = urlGenerator;

            AutoBind = true;
            Enabled = true;
            IgnoreCase = true;
        }

        public bool AutoBind
        {
            get;
            set;
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public IDictionary<string, object> Events
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
        
        public int? Height
        {
            get;
            set;
        }

        public bool IgnoreCase
        {
            get;
            set;
        }

        public string OptionLabel
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
            var options = new Dictionary<string, object>(Events);

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                options["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                options["dataSource"] = DataSource.Data;
            }

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
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

            if (Height != null)
            {
                options["height"] = Height;
            }

            if (!IgnoreCase)
            {
                options["ignoreCase"] = IgnoreCase;
            }

            if (SelectedIndex != null)
            {
                options["index"] = SelectedIndex;
            }

            if (!string.IsNullOrEmpty(OptionLabel))
            {
                options["optionLabel"] = OptionLabel;
            }
            
            if (!string.IsNullOrEmpty(Template))
            {
                options["template"] = Template;
            }

            writer.Write(Initializer.Initialize(Id, "DropDownList", options));

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

            (new DropDownListHtmlBuilder(this)).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
