namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionFromSettings settings.
    /// </summary>
    public class DiagramConnectionFromSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramConnectionFromSettings container;

        public DiagramConnectionFromSettingsBuilder(DiagramConnectionFromSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the point x value.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramConnectionFromSettingsBuilder X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Defines the point y value.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramConnectionFromSettingsBuilder Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        //<< Fields
    }
}

