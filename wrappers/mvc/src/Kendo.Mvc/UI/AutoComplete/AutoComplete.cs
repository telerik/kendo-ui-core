namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;


    public class AutoComplete : ViewComponentBase
    {
        public AutoComplete(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData)
        {
            Animation = new PopupAnimation();

            ClientEvents = new Dictionary<string, object>();

            DataSource = new DataSource();

            UrlGenerator = urlGenerator;

            Enabled = true;
            HighlightFirst = false;
            IgnoreCase = true;
            Suggest = false;
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public IDictionary<string, object> ClientEvents
        {
            get;
            private set;
        }

        public string DataTextField
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

        public string Separator
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
            var options = new Dictionary<string, object>(ClientEvents);

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
            
            if (!string.IsNullOrEmpty(DataTextField))
            {
                options["dataTextField"] = DataTextField;
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

            if (MinLength != null)
            {
                options["minLength"] = MinLength;
            }

            if (!string.IsNullOrEmpty(Placeholder))
            {
                options["placeholder"] = Placeholder;
            }

            if (!string.IsNullOrEmpty(Separator))
            {
                options["separator"] = Separator;
            }

            if (Suggest)
            {
                options["suggest"] = Suggest;
            }

            if (!string.IsNullOrEmpty(Template))
            {
                options["template"] = Template;
            }

            writer.Write(Initializer.Initialize(Id, "AutoComplete", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new AutoCompleteHtmlBuilder(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}