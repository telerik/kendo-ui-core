namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the EditorSerializationSettings settings.
    /// </summary>
    public class EditorSerializationSettingsBuilder: IHideObjectMembers
    {
        private readonly EditorSerializationSettings container;

        public EditorSerializationSettingsBuilder(EditorSerializationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.
        /// </summary>
        /// <param name="value">The value that configures the entities.</param>
        public EditorSerializationSettingsBuilder Entities(bool value)
        {
            container.Entities = value;

            return this;
        }
        
        //<< Fields
    }
}

