namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeHandlesSettings settings.
    /// </summary>
    public class DiagramEditableResizeHandlesSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeHandlesSettings container;

        public DiagramEditableResizeHandlesSettingsBuilder(DiagramEditableResizeHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Set the handles backgorund.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public DiagramEditableResizeHandlesSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the handles stroke styles.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramEditableResizeHandlesSettingsBuilder Stroke(Action<DiagramEditableResizeHandlesStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeHandlesStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Set the handles hover styles.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramEditableResizeHandlesSettingsBuilder Hover(Action<DiagramEditableResizeHandlesHoverSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeHandlesHoverSettingsBuilder(container.Hover));
            return this;
        }
        
        /// <summary>
        /// The hangles width.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramEditableResizeHandlesSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// The hangles height.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DiagramEditableResizeHandlesSettingsBuilder Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        //<< Fields
    }
}

