namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc; 

    public class NumericTextBox<T> : WidgetBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
            Enabled = true;
        }

        public T? Value
        {
            get;
            set;
        }

        public T? Step
        {
            get;
            set;
        }

        public T? Min
        {
            get;
            set;
        }

        public T? Max
        {
            get;
            set;
        }

        public int? Decimals
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public string Culture
        {
            get;
            set;
        }

        public string Placeholder
        {
            get;
            set;
        }

        public string IncreaseButtonTitle
        {
            get;
            set;
        }

        public string DecreaseButtonTitle
        {
            get;
            set;
        }

        public bool? Spinners
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Format.HasValue())
            {
                options["format"] = Format;
            }

            if (Culture.HasValue())
            {
                options["culture"] = Culture;
            }

            if (Placeholder.HasValue())
            {
                options["placeholder"] = Placeholder;
            }

            if (IncreaseButtonTitle.HasValue())
            {
                options["upArrowText"] = IncreaseButtonTitle;
            }

            if (DecreaseButtonTitle.HasValue())
            {
                options["downArrowText"] = DecreaseButtonTitle;
            }

            if (Spinners != null)
            {
                options["spinners"] = Spinners;
            }

            if (Decimals != null)
            {
                options["decimals"] = Decimals;
            }

            writer.Write(Initializer.Initialize(Selector, "NumericTextBox", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {

            VerifySettings();

            NumericTextBoxHtmlBuilder<T> renderer = new NumericTextBoxHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            Name = Name ?? ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty);

            if (Min.HasValue && Max.HasValue && Nullable.Compare<T>(Min, Max) == 1)
            {
                throw new ArgumentException(Exceptions.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }

            base.VerifySettings();
        }
    }
}