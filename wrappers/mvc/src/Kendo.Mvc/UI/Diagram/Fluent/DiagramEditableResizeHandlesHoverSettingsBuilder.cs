namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesHoverSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesHoverSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesHoverSettings container;

        public DiagramEditableResizeHandlesHoverSettingsBuilder(DiagramEditableResizeHandlesHoverSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the handles backgorund.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramEditableResizeHandlesHoverSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableResizeHandlesHoverSettingsBuilder Stroke(Action<DiagramEditableResizeHandlesHoverStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

