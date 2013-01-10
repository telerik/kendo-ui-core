namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using System.IO;
    using System.Web.Mvc;

    public class DropDownList : DropDownListBase
    {
        public DropDownList(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
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

        public string OptionLabel
        {
            get;
            set;
        }

        public int? SelectedIndex
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
            var options = this.SeriailzeBaseOptions();

            if (AutoBind != null)
            {
                options["autoBind"] = AutoBind;
            }

            if (!string.IsNullOrEmpty(DataValueField))
            {
                options["dataValueField"] = DataValueField;
            }

            if (SelectedIndex != null && SelectedIndex > -1)
            {
                options["index"] = SelectedIndex;
            }

            if (!string.IsNullOrEmpty(OptionLabel))
            {
                options["optionLabel"] = OptionLabel;
            }

            if (!string.IsNullOrEmpty(CascadeFrom))
            {
                options["cascadeFrom"] = CascadeFrom;
            }

            if (!string.IsNullOrEmpty(Text))
            {
                options["text"] = Text;
            }

            writer.Write(Initializer.Initialize(Selector, "DropDownList", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new DropDownListHtmlBuilderBase(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
