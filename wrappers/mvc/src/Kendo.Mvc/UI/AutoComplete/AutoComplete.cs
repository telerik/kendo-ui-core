namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using System.IO;
    using System.Web.Mvc;

    public class AutoComplete : DropDownListBase
    {
        public AutoComplete(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData, urlGenerator)
        {
        }

        public string Filter
        {
            get;
            set;
        }

        public bool? HighlightFirst
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

        public string Separator
        {
            get;
            set;
        }

        public bool? Suggest
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            if (!string.IsNullOrEmpty(Filter))
            {
                options["filter"] = Filter;
            }

            if (HighlightFirst != null)
            {
                options["highlightFirst"] = HighlightFirst;
            }

            if (MinLength != null)
            {
                options["minLength"] = MinLength;
            }

            if (!string.IsNullOrEmpty(Placeholder))
            {
                options["placeholder"] = Placeholder;
            }

            if (Suggest != null)
            {
                options["suggest"] = Suggest;
            }

            if (!string.IsNullOrEmpty(Separator))
            {
                options["separator"] = Separator;
            }

            writer.Write(Initializer.Initialize(Selector, "AutoComplete", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new DropDownListHtmlBuilderBase(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}