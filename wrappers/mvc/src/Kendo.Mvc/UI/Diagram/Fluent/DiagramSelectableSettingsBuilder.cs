namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramSelectableSettings settings.
    /// </summary>
    public class DiagramSelectableSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramSelectableSettings container;

        public DiagramSelectableSettingsBuilder(DiagramSelectableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the selection stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramSelectableSettingsBuilder Stroke(Action<DiagramSelectableStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramSelectableStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// The selectable key.
        /// </summary>
        /// <param name="value">The value that configures the key.</param>
        public DiagramSelectableSettingsBuilder Key(DiagramSelectableKey value)
        {
            container.Key = value;

            return this;
        }
        
        //<< Fields
    }
}

