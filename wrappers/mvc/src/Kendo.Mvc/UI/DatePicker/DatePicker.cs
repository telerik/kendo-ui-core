namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    
    using System;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using System.Globalization;
    using System.Collections.Generic;

    public class DatePicker : ViewComponentBase, IInputComponent<DateTime>
    {
        static internal DateTime defaultMinDate = new DateTime(1900, 1, 1);
        static internal DateTime defaultMaxDate = new DateTime(2099, 12, 31);

        public DatePicker(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData)
            : base(viewContext, clientSideObjectWriterFactory, viewData)
        {
            Format = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;
            ParseFormats = new List<string>();

            Min = defaultMinDate;
            Max = defaultMaxDate;

            Animation = new PopupAnimation();
            ClientEvents = new DatePickerClientEvents();
            MonthTemplate = new MonthTemplate();

            Value = null;
            Enabled = true;
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public DatePickerClientEvents ClientEvents
        {
            get;
            private set;
        }

        public MonthTemplate MonthTemplate
        {
            get;
            private set;
        }

        public string Format
        {
            get;
            set;
        }

        public List<string> ParseFormats
        {
            get;
            set;
        }

        public string Footer
        {
            get;
            set;
        }

        public string Start
        {
            get;
            set;
        }

        public string Depth
        {
            get;
            set;
        }

        public DateTime? Value
        {
            get;
            set;
        }

        public DateTime Min
        {
            get;
            set;
        }

        public DateTime Max
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
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoDatePicker", writer);

            objectWriter.Start();

            Animation.SerializeTo(objectWriter);
            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Append("format", this.Format);
            objectWriter.AppendCollection("parseFormats", this.ParseFormats);
            
            objectWriter.Append("min", this.Min);
            objectWriter.Append("max", this.Max);
            objectWriter.Append("footer", Footer);

            objectWriter.Append("depth", Depth); //use Enum
            objectWriter.Append("start", Start); //use Enum

            if (MonthTemplate.content.HasValue() || MonthTemplate.empty.HasValue())
            {
                objectWriter.AppendObject("month", MonthTemplate);
            }

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            DatePickerHtmlBuilder renderer = new DatePickerHtmlBuilder(this);

            renderer.Build().WriteTo(writer);
            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinValue", "MaxValue"));
            }
        }
    }
}