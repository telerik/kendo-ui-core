namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;

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

        public PopupAnimation Animation
        {
            get;
            private set;
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
            }

            if (ClientEvents.Keys.Any())
            {
                options["events"] = ClientEvents;
            }

            options["format"] = Format;

            if (ParseFormats.Any())
            {
                options["parseFormats"] = ParseFormats;
            }

            options["min"] = Min;
            options["max"] = Max;
            options["interval"] = Interval;

            if (Dates.Any())
            {
                options["dates"] = Dates;
            }

            writer.Write(Initializer.Initialize(Id, "TimePicker", options));

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
