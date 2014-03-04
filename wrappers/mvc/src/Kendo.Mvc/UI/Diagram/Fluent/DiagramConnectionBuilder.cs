namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnection settings.
    /// </summary>
    public class DiagramConnectionBuilder: IHideObjectMembers
    {
        private readonly DiagramConnection container;

        public DiagramConnectionBuilder(DiagramConnection settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the stroke configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the stroke.</param>
        public DiagramConnectionBuilder Stroke(Action<DiagramConnectionStrokeSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionStrokeSettingsBuilder(container.Stroke));
            return this;
        }
        
        /// <summary>
        /// Defines the hover configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the hover.</param>
        public DiagramConnectionBuilder Hover(Action<DiagramConnectionHoverSettingsBuilder> configurator)
        {
            configurator(new DiagramConnectionHoverSettingsBuilder(container.Hover));
            return this;
        }
        
        /// <summary>
        /// The start cap (arrow, head or decoration) of the connection:
        /// </summary>
        /// <param name="value">The value that configures the startcap.</param>
        public DiagramConnectionBuilder StartCap(string value)
        {
            container.StartCap = value;

            return this;
        }
        
        /// <summary>
        /// The start cap (arrow, head or decoration) of the connection:Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed. Much like the startCap example above, you can define custom caps (markers) for the endpoint of the connection.
        /// </summary>
        /// <param name="value">The value that configures the endcap.</param>
        public DiagramConnectionBuilder EndCap(string value)
        {
            container.EndCap = value;

            return this;
        }
        
        /// <summary>
        /// Sets the intermediate points (in global coordinates) of the connection. It's important to note that currently these points cannot be manipulated in the interface.
        /// </summary>
        /// <param name="configurator">The action that configures the points.</param>
        public DiagramConnectionBuilder Points(Action<DiagramConnectionPointFactory> configurator)
        {
            configurator(new DiagramConnectionPointFactory(container.Points));
            return this;
        }
        
        //<< Fields
    }
}

