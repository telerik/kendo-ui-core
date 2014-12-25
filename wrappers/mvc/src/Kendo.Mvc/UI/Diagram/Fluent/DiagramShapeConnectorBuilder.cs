namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeConnector settings.
    /// </summary>
    public class DiagramShapeConnectorBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeConnector container;

        public DiagramShapeConnectorBuilder(DiagramShapeConnector settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The connector description.
        /// </summary>
        /// <param name="value">The value that configures the description.</param>
        public DiagramShapeConnectorBuilder<TShapeModel,TConnectionModel> Description(string value)
        {
            container.Description = value;

            return this;
        }
        
        /// <summary>
        /// The connector name. Predefined names include:
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public DiagramShapeConnectorBuilder<TShapeModel,TConnectionModel> Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// The function that positions the connector.
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public DiagramShapeConnectorBuilder<TShapeModel,TConnectionModel> Position(string value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields
    }
}

