// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public class DatePickerBase : ViewComponentBase, IEffectEnabled, IDatePicker
    {
        public DatePickerBase(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            InputHtmlAttributes = new Dictionary<string, object>();

            ClientEvents = new DatePickerClientEvents();
            Effects = new Effects();

            Value = null;
            Enabled = true;
            OpenOnFocus = false;
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

        public DatePickerClientEvents ClientEvents
        {
            get;
            private set;
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