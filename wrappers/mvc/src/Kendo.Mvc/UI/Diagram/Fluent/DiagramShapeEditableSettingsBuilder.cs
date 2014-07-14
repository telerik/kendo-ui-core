namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeEditableSettings settings.
    /// </summary>
    public class DiagramShapeEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeEditableSettings container;

        public DiagramShapeEditableSettingsBuilder(DiagramShapeEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the connectors should appear on hover.
        /// </summary>
        /// <param name="value">The value that configures the connect.</param>
        public DiagramShapeEditableSettingsBuilder Connect(bool value)
        {
            container.Connect = value;

            return this;
        }
        
        //<< Fields
    }
}

