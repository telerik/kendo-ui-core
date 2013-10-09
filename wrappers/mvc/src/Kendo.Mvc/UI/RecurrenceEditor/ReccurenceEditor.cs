namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;
    using System.Text.RegularExpressions;

    public class RecurrenceEditor : WidgetBase
    {
        public RecurrenceEditor(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Frequencies = new List<RecurrenceEditorFrequency>();

            FirstWeekDay = 0;
        }

        public DateTime? Start
        {
            get;
            set;
        }

        public int FirstWeekDay 
        {
            get;
            set;
        }

        public string Timezone
        {
            get;
            set;
        }

        public string Value
        {
            get;
            set;
        }

        public IList<RecurrenceEditorFrequency> Frequencies
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            writer.Write(Initializer.Initialize(Selector, "RecurrenceEditor", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            if (Start != null)
            {
                options["start"] = Start;
            }

            if (FirstWeekDay != 0)
            {
                options["firstWeekDay"] = FirstWeekDay;
            }

            if (!string.IsNullOrEmpty(Timezone))
            {
                options["timezone"] = Timezone;
            }

            if (!string.IsNullOrEmpty(Value))
            {
                options["value"] = Value;
            }

            if (Frequencies.Count > 0)
            {
                string[] frequencies = new string[Frequencies.Count];

                for (int i = 0; i < Frequencies.Count; i++)
                {
                    frequencies[i] = Frequencies[i].ToString().ToLowerInvariant();
                }

                options["frequencies"] = frequencies;
            }

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            RecurrenceEditorHtmlBuilder builder = new RecurrenceEditorHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
