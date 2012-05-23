namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public class DatePickerBase : ViewComponentBase, IDatePicker
    {
        public DatePickerBase(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            InputHtmlAttributes = new Dictionary<string, object>();

            Value = null;
            Enabled = true;
            OpenOnFocus = false;

            ClientEvents = new Dictionary<string, ClientEvent>();
        }

        public IDictionary<string, ClientEvent> ClientEvents
        {
            get;
            private set;
        }
        /// <summary>
        /// Gets the id.
        /// </summary>
        /// <value>The id.</value>
        public new string Id
        {
            get
            {
                // Return from htmlattributes if user has specified
                // otherwise build it from name
                return InputHtmlAttributes.ContainsKey("id") ?
                       InputHtmlAttributes["id"].ToString() :
                       (!string.IsNullOrEmpty(Name) ? Name.Replace(".", HtmlHelper.IdAttributeDotReplacement) : null);
            }
        }

        public IDictionary<string, object> InputHtmlAttributes
        {
            get;
            set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public bool OpenOnFocus
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public string TodayFormat
        {
            get;
            set;
        }

        public DateTime? Value
        {
            get;
            set;
        }

        public DateTime MinValue
        {
            get;
            set;
        }

        public DateTime MaxValue
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }
    }
}