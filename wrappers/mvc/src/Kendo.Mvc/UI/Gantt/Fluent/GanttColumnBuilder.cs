namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttColumn settings.
    /// </summary>
    public class GanttColumnBuilder: IHideObjectMembers
    {
        private readonly GanttColumn container;

        public GanttColumnBuilder(GanttColumn settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The field to which the column is bound. The value of this field is displayed by the column during data binding.
		/// The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
        /// </summary>
        /// <param name="value">The value that configures the field.</param>
        public GanttColumnBuilder Field(string value)
        {
            container.Field = value;

            return this;
        }
        
        /// <summary>
        /// The text that is displayed in the column header cell. If not set the field is used.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public GanttColumnBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a standard number format,
		/// custom number format, standard date format or a custom date format.
        /// </summary>
        /// <param name="value">The value that configures the format.</param>
        public GanttColumnBuilder Format(string value)
        {
            container.Format = value;

            return this;
        }
        
        /// <summary>
        /// The width of the column. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public GanttColumnBuilder Width(string value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether this column can be edited by the user.
        /// </summary>
        /// <param name="value">The value that configures the editable.</param>
        public GanttColumnBuilder Editable(bool value)
        {
            container.Editable = value;

            return this;
        }
        
        //<< Fields
    }
}

