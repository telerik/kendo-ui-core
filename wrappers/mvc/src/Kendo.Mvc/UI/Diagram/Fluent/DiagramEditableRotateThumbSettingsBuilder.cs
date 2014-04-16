namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableRotateThumbSettings settings.
    /// </summary>
    public class DiagramEditableRotateThumbSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableRotateThumbSettings container;

        public DiagramEditableRotateThumbSettingsBuilder(DiagramEditableRotateThumbSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the thumb backgorund.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramEditableRotateThumbSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the thumb stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableRotateThumbSettingsBuilder Stroke(Action<DiagramEditableRotateThumbStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableRotateThumbStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

