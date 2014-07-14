namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionSelectionHandlesSettings settings.
    /// </summary>
    public class DiagramConnectionSelectionHandlesSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionSelectionHandlesSettings container;

        public DiagramConnectionSelectionHandlesSettingsBuilder(DiagramConnectionSelectionHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramConnectionSelectionHandlesSettingsBuilder Fill(Action<DiagramConnectionSelectionHandlesFillSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesFillSettingsBuilder(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the handles stroke options.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionSelectionHandlesSettingsBuilder Stroke(Action<DiagramConnectionSelectionHandlesStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionSelectionHandlesStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

