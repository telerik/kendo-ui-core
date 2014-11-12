namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramConnectionDefaultsEditableSettingsTool settings.
    /// </summary>
    public class DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramConnectionDefaultsEditableSettingsTool container;

        public DiagramConnectionDefaultsEditableSettingsToolBuilder(DiagramConnectionDefaultsEditableSettingsTool settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The name of the tool. The built-in tools are "edit" and "delete". Can be set to a custom value.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public DiagramConnectionDefaultsEditableSettingsToolBuilder<TShapeModel,TConnectionModel> Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        //<< Fields
    }
}

