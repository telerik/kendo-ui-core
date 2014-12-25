namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsRotationSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsRotationSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramShapeDefaultsRotationSettings container;

        public DiagramShapeDefaultsRotationSettingsBuilder(DiagramShapeDefaultsRotationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Sets the rotational angle of the shape.
        /// </summary>
        /// <param name="value">The value that configures the angle.</param>
        public DiagramShapeDefaultsRotationSettingsBuilder<TShapeModel,TConnectionModel> Angle(double value)
        {
            container.Angle = value;

            return this;
        }
        
        //<< Fields
    }
}

