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
        /// Set the handles hover fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramEditableResizeHandlesHoverSettingsBuilder Fill(Action<DiagramEditableResizeHandlesHoverFillSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverFillSettingsBuilder(container.Fill));
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

