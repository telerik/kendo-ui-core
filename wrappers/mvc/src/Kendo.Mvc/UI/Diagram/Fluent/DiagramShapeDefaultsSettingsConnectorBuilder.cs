namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsSettingsConnector settings.
    /// </summary>
    public class DiagramShapeDefaultsSettingsConnectorBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsSettingsConnector container;

        public DiagramShapeDefaultsSettingsConnectorBuilder(DiagramShapeDefaultsSettingsConnector settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public DiagramShapeDefaultsSettingsConnectorBuilder Position(string value)
        {
            container.Position = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the description.</param>
        public DiagramShapeDefaultsSettingsConnectorBuilder Description(string value)
        {
            container.Description = value;

            return this;
        }
        
        //<< Fields
    }
}

