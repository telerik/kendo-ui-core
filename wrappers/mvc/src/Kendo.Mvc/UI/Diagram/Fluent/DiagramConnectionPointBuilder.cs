namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionPoint settings.
    /// </summary>
    public class DiagramConnectionPointBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionPoint container;

        public DiagramConnectionPointBuilder(DiagramConnectionPoint settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Sets the X coordinate of the intermediate point.
        /// </summary>
        /// <param name="value">The value that configures the x.</param>
        public DiagramConnectionPointBuilder<TShapeModel,TConnectionModel> X(double value)
        {
            container.X = value;

            return this;
        }
        
        /// <summary>
        /// Sets the Y coordinate of the intermediate point.
        /// </summary>
        /// <param name="value">The value that configures the y.</param>
        public DiagramConnectionPointBuilder<TShapeModel,TConnectionModel> Y(double value)
        {
            container.Y = value;

            return this;
        }
        
        //<< Fields
    }
}

