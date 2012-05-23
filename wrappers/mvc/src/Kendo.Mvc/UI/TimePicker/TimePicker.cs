namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Html;

    public class TimePicker : ViewComponentBase, IInputComponent<DateTime>
    {
        public TimePicker(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ViewDataDictionary viewData)
            : base(viewContext, clientSideObjectWriterFactory, viewData)
        {
            ClientEvents = new Dictionary<string, ClientEvent>();

            Format = CultureInfo.CurrentCulture.DateTimeFormat.ShortTimePattern;

            Min = DateTime.Today;
            Max = DateTime.Today;
            
            Value = null;
            Enabled = true;
            Interval = 30;

            Dates = new List<DateTime>();
            ParseFormats = new List<string>();
        }

        public IDictionary<string, ClientEvent> ClientEvents
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

        public List<DateTime> Dates 
        { 
            get; 
            set; 
        }

        public int Interval
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoTimePicker", writer);

            objectWriter.Start();

//TODO: Serialize            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Append("format", this.Format);
            objectWriter.AppendCollection("parseFormats", this.ParseFormats);

            objectWriter.Append("min", this.Min);
            objectWriter.Append("max", this.Max);

            objectWriter.Append("interval", this.Interval);
            objectWriter.Append("dates", this.Dates);
            
            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            TimePickerHtmlBuilder renderer = new TimePickerHtmlBuilder(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
