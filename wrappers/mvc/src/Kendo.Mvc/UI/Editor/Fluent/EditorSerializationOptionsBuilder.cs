namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the Editor serialization options
    /// </summary>
    public class EditorSerializationOptionsBuilder : IHideObjectMembers
    {
        private readonly EditorSerializationOptions serialization;

        public EditorSerializationOptionsBuilder(EditorSerializationOptions serialization)
        {
            this.serialization = serialization;
        }

        public EditorSerializationOptionsBuilder Entities(bool encode)
        {
            serialization.Entities = encode;
            return this;
        }
    }
}
