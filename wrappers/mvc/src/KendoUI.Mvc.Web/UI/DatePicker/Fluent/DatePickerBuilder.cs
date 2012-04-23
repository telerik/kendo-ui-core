// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    using Telerik.Web.Mvc.Resources;
    using System.ComponentModel;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePicker"/> component.
    /// </summary>
    public class DatePickerBuilder : DatePickerBaseBuilder<DatePicker, DatePickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBuilder(DatePicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets whether datepicker to be rendered with button, which shows calendar on click.
        /// </summary>
        public DatePickerBuilder ShowButton(bool showButton) 
        {
            Component.ShowButton = showButton;

            return this;
        }

        /// <summary>
        /// Sets the title of the datepicker button.
        /// </summary>
        public DatePickerBuilder ButtonTitle(string title) 
        {
            Guard.IsNotNullOrEmpty(title, "title");

            Component.ButtonTitle = title;

            return this;
        }

        /// <summary>
        /// Sets the value of the datepicker input
        /// </summary>
        public DatePickerBuilder Value(DateTime? date)
        {
            if (date.HasValue)
                date = date.Value == DateTime.MinValue ? null : date;

            Component.Value = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the datepicker input
        /// </summary>
        public DatePickerBuilder Value(string date)
        {
            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.Value = parsedDate == DateTime.MinValue ? null : new Nullable<DateTime>(parsedDate);
            }
            else 
            {
                Component.Value = null;
            }

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Min(string date)
        {
            Guard.IsNotNullOrEmpty(date, "date");

            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.MinValue = parsedDate;
            }
            else
            {
                throw new ArgumentException(TextResource.StringNotCorrectDate);
            }
            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Max(string date)
        {
            Guard.IsNotNullOrEmpty(date, "date");

            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.MaxValue = parsedDate;
            }
            else
            {
                throw new ArgumentException(TextResource.StringNotCorrectDate);
            }
            return this;
        }
    }
}