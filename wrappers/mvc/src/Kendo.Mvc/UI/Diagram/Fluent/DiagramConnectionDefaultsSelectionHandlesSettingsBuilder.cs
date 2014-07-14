namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSelectionHandlesSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSelectionHandlesSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsSelectionHandlesSettings container;

        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder(DiagramConnectionDefaultsSelectionHandlesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the handles fill options.
        /// </summary>
        /// <param name="configurator">The action that configures the fill.</param>
        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder Fill(Action<DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesFillSettingsBuilder(container.Fill));
            return this;
        }
        
        /// <summary>
        /// Defines the handles stroke options.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionDefaultsSelectionHandlesSettingsBuilder Stroke(Action<DiagramConnectionDefaultsSelectionHandlesStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsSelectionHandlesStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        //<< Fields
    }
}

