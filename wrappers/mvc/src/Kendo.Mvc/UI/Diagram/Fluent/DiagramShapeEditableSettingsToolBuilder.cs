namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramShapeEditableSettingsTool settings.
    /// </summary>
    public class DiagramShapeEditableSettingsToolBuilder: IHideObjectMembers
    {
        private readonly DiagramShapeEditableSettingsTool container;

        public DiagramShapeEditableSettingsToolBuilder(DiagramShapeEditableSettingsTool settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The name of the tool. The built-in tools are "edit", "delete", "rotateClockwise" and "rotateAnticlockwise". Can be set to a custom value.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public DiagramShapeEditableSettingsToolBuilder Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// The step of the rotateClockwise and rotateAnticlockwise tools.
        /// </summary>
        /// <param name="value">The value that configures the step.</param>
        public DiagramShapeEditableSettingsToolBuilder Step(double value)
        {
            container.Step = value;

            return this;
        }
        
        //<< Fields
    }
}

