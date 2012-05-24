namespace Kendo.Mvc.UI
{
    using Kendo.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Query.Dynamic; 

    public class NumericTextBox<T> : ViewComponentBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData)
            : base(viewContext, clientSideObjectWriterFactory, viewData)
        {
            ClientEvents = new Dictionary<string, ClientEvent>();

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

        public IDictionary<string, ClientEvent> ClientEvents
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            if (ClientEvents.Keys.Any())
            {
                options["events"] = ClientEvents;
            }

            options["format"] = this.Format;
            options["culture"] = this.Culture;
            options["placeholder"] = this.Placeholder;
            options["spinners"] = this.Spinners;
            options["decimals"] = this.Decimals;

            writer.Write(Initializer.Initialize(Id, "NumericTextBox", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

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
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }

            base.VerifySettings();
        }
    }
}