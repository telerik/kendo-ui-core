namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ColorPickerMessagesSettings settings.
    /// </summary>
    public class ColorPickerMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly ColorPickerMessagesSettings container;

        public ColorPickerMessagesSettingsBuilder(ColorPickerMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Allows customization of the "Apply" button text.
        /// </summary>
        /// <param name="value">The value that configures the apply.</param>
        public ColorPickerMessagesSettingsBuilder Apply(string value)
        {
            container.Apply = value;

            return this;
        }
        
        /// <summary>
        /// Allows customization of the "Cancel" button text.
        /// </summary>
        /// <param name="value">The value that configures the cancel.</param>
        public ColorPickerMessagesSettingsBuilder Cancel(string value)
        {
            container.Cancel = value;

            return this;
        }
        
        //<< Fields
    }
}

