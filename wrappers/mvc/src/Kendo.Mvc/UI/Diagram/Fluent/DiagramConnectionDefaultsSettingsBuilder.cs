namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsSettings settings.
    /// </summary>
    public class DiagramConnectionDefaultsSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionDefaultsSettings container;

        public DiagramConnectionDefaultsSettingsBuilder(DiagramConnectionDefaultsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionDefaultsSettingsBuilder Stroke(Action<DiagramConnectionDefaultsStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramConnectionDefaultsSettingsBuilder Hover(Action<DiagramConnectionDefaultsHoverSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionDefaultsHoverSettingsBuilder(container.Hover));
            return this;
        }
        
        /// <summary>
        /// The start cap (arrow, head or decoration) of the connection:
        /// </summary>
        /// <param name="value">The value that configures the startcap.</param>
        public DiagramConnectionDefaultsSettingsBuilder StartCap(string value)
        {
            container.StartCap = value;

            return this;
        }
        
        /// <summary>
        /// The start cap (arrow, head or decoration) of the connection:Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed. Much like the startCap example above, you can define custom caps (markers) for the endpoint of the connection.
        /// </summary>
        /// <param name="value">The value that configures the endcap.</param>
        public DiagramConnectionDefaultsSettingsBuilder EndCap(string value)
        {
            container.EndCap = value;

            return this;
        }
        
        //<< Fields
    }
}

