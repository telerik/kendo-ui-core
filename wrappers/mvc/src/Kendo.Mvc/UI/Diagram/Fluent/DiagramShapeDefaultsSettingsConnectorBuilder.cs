namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsSettingsConnector settings.
    /// </summary>
    public class DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
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
        /// <param name="value">The value that configures the description.</param>
        public DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel,TConnectionModel> Description(string value)
        {
            container.Description = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel,TConnectionModel> Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public DiagramShapeDefaultsSettingsConnectorBuilder<TShapeModel,TConnectionModel> Position(string value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields
    }
}

