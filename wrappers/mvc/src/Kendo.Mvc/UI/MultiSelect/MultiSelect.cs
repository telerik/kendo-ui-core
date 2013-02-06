namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;

    public class MultiSelect : DropDownListBase
    {
        //Escape meta characters: http://api.jquery.com/category/selectors/
        private static readonly Regex EscapeRegex = new Regex(@"([;&,\.\+\*~'\:\""\!\^\$\[\]\(\)\|\/])", RegexOptions.Compiled);

        public MultiSelect(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData, urlGenerator)
        {
        }

        public bool? AutoBind
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

        public string ItemTemplate
        {
            get;
            set;
        }

        public string ItemTemplateId
        {
            get;
            set;
        }

        public string TagTemplate
        {
            get;
            set;
        }

        public string TagTemplateId
        {
            get;
            set;
        }

        public IEnumerable<string> Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            /*if (DataSource.ServerFiltering && !DataSource.Transport.Read.Data.HasValue())
            {
                DataSource.Transport.Read.Data = new ClientHandlerDescriptor
                {
                    HandlerName = "function() { return kendo.ui.ComboBox.requestData(\"" + EscapeRegex.Replace(Selector, @"\\$1") + "\"); }"
                };
            }*/

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            var options = this.SeriailzeBaseOptions();

            if (!string.IsNullOrEmpty(ItemTemplateId))
            {
                options["itemTemplate"] = new ClientHandlerDescriptor { HandlerName = string.Format("$('{0}{1}').html()", idPrefix, ItemTemplateId) };
            }
            else if (!string.IsNullOrEmpty(ItemTemplate))
            {
                options["itemTemplate"] = ItemTemplate;
            }

            if (!string.IsNullOrEmpty(TagTemplateId))
            {
                options["tagTemplate"] = new ClientHandlerDescriptor { HandlerName = string.Format("$('{0}{1}').html()", idPrefix, TagTemplateId) };
            }
            else if (!string.IsNullOrEmpty(TagTemplate))
            {
                options["tagTemplate"] = TagTemplate;
            }
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

            var value = GetValue();

            if (value != null)
            {
                options["value"] = value;
            }

            writer.Write(Initializer.Initialize(Selector, "MultiSelect", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new MultiSelectHtmlBuilder(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        private IEnumerable<string> GetValue()
        {
            ModelState state;
            if (ViewData.ModelState.TryGetValue(Name, out state) && (state.Value != null))
            {
                //if (ViewData.ModelState.IsValidField(Name)) TODO: Do I need this ?
                return state.Value.ConvertTo(typeof(string[]), null) as IEnumerable<string>;
            }
            else if (Value == null)
            {
                //if (Name.HasValue())   
                return ViewData.Eval(Name) as IEnumerable<string>;
            }

            return Value;
        }
    }
}
