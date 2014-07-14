namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeDefaultsEditableSettings settings.
    /// </summary>
    public class DiagramShapeDefaultsEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeDefaultsEditableSettings container;

        public DiagramShapeDefaultsEditableSettingsBuilder(DiagramShapeDefaultsEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the connectors should appear on hover.
        /// </summary>
        /// <param name="value">The value that configures the connect.</param>
        public DiagramShapeDefaultsEditableSettingsBuilder Connect(bool value)
        {
            container.Connect = value;

            return this;
        }
        
        //<< Fields
    }
}

