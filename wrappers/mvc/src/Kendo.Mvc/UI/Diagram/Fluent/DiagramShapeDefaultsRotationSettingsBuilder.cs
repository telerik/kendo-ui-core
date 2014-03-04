namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsRotationSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsRotationSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsRotationSettings container;

        public DiagramShapeDefaultsRotationSettingsBuilder(DiagramShapeDefaultsRotationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the angle.</param>
        public DiagramShapeDefaultsRotationSettingsBuilder Angle(double value)
        {
            container.Angle = value;

            return this;
        }
        
        //<< Fields
    }
}

