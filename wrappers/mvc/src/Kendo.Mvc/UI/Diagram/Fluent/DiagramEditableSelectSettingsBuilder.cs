namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableSelectSettings settings.
    /// </summary>
    public class DiagramEditableSelectSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableSelectSettings container;

        public DiagramEditableSelectSettingsBuilder(DiagramEditableSelectSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the thumb backgorund.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramEditableSelectSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the select stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableSelectSettingsBuilder Stroke(Action<DiagramEditableSelectStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableSelectStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

