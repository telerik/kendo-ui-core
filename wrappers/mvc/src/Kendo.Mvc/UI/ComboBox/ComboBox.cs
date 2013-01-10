namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    using System.Globalization;
    using System.IO;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;

    public class ComboBox : DropDownListBase
    {
        //Escape meta characters: http://api.jquery.com/category/selectors/
        private static readonly Regex EscapeRegex = new Regex(@"([;&,\.\+\*~'\:\""\!\^\$\[\]\(\)\|\/])", RegexOptions.Compiled);

        public ComboBox(ViewContext viewContext,  IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData, urlGenerator)
        {
        }

        public bool? AutoBind
        {
            get;
            set;
        }

        public string CascadeFrom
        {
            get;
            set;
        }

        public string DataValueField 
        { 
            get; 
            set; 
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

        public int? SelectedIndex
        {
            get;
            set;
        }

        public bool? Suggest
        {
            get;
            set;
        }

        public string Text
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            if (DataSource.ServerFiltering && !DataSource.Transport.Read.Data.HasValue())
            {
                DataSource.Transport.Read.Data = new ClientHandlerDescriptor
                {
                    HandlerName = "function() { return kendo.ui.ComboBox.requestData(\"" + EscapeRegex.Replace(Selector, @"\\$1") + "\"); }"
                };
            }

            var options = this.SeriailzeBaseOptions();

            if (AutoBind != null)
            {
                options["autoBind"] = AutoBind;
            }

            if (!string.IsNullOrEmpty(DataValueField))
            {
                options["dataValueField"] = DataValueField;
            }

            if (!string.IsNullOrEmpty(Filter))
            {
                options["filter"] = Filter;
            }

            if (SelectedIndex != null && SelectedIndex > -1)
            {
                options["index"] = SelectedIndex;
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

            if (!string.IsNullOrEmpty(CascadeFrom))
            {
                options["cascadeFrom"] = CascadeFrom;
            }

            var text = this.GetInputValue();
            if (!string.IsNullOrEmpty(text))
            {
                options["text"] = text;
            }

            writer.Write(Initializer.Initialize(Selector, "ComboBox", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new DropDownListHtmlBuilderBase(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        protected string GetInputValue()
        {
            var inputName = Name + "_input";
            var text = this.GetValue<string>(inputName, null);

            if (string.IsNullOrEmpty(text)) {
                var result = this.ViewContext.Controller.ValueProvider.GetValue(inputName);

                var found = result != null;
                if (found)
                {
                    return (string)result.ConvertTo(typeof(string), CultureInfo.CurrentCulture);
                }

                text = Text;
            }

            return text;
        }
    }
}