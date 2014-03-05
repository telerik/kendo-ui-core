namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeConnector settings.
    /// </summary>
    public class DiagramShapeConnectorBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeConnector container;

        public DiagramShapeConnectorBuilder(DiagramShapeConnector settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public DiagramShapeConnectorBuilder Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the description.</param>
        public DiagramShapeConnectorBuilder Description(string value)
        {
            container.Description = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public DiagramShapeConnectorBuilder Position(string value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields
    }
}

