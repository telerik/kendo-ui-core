namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramEditableResizeSettings settings.
    /// </summary>
    public class DiagramEditableResizeSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramEditableResizeSettings container;

        public DiagramEditableResizeSettingsBuilder(DiagramEditableResizeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the handles style.
        /// </summary>
        /// <param name="configurator">The action that configures the handles.</param>
        public DiagramEditableResizeSettingsBuilder Handles(Action<DiagramEditableResizeHandlesSettingsBuilder> configurator)
        {
            configurator(new DiagramEditableResizeHandlesSettingsBuilder(container.Handles));
            return this;
        }
        
        //<< Fields
    }
}

