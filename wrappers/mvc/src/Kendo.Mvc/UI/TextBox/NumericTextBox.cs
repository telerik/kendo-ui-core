namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;

    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html; 

    public class NumericTextBox<T> : ViewComponentBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData)
            : base(viewContext, clientSideObjectWriterFactory, viewData)
        {
            Spinners = true;

            ClientEvents = new NumericTextBoxClientEvents();

            Enabled = true;

            Step = (T)Convert.ChangeType(1, typeof(T));

            Format = "n";
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

        public bool Spinners
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public NumericTextBoxClientEvents ClientEvents
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoNumericTextBox", writer);

            objectWriter.Start();

            objectWriter.Append("format", this.Format);
            objectWriter.Append("culture", this.Culture);
            objectWriter.Append("placeholder", this.Placeholder);
            objectWriter.Append("spinners", this.Spinners, true);
            objectWriter.Append("decimals", this.Decimals);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

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