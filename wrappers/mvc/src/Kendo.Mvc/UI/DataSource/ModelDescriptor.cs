namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Extensions;

    public class ModelDescriptor : JsonObject
    {
        private readonly ModelMetadata metadata;

        public ModelDescriptor(Type modelType)
        {
            metadata = ModelMetadata.FromStringExpression("", new ViewDataDictionary(Activator.CreateInstance(modelType)));
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var fields = new Dictionary<string, object>();
            json["fields"] = fields;

            metadata.Properties.Each(prop =>
            {
                var field = new Dictionary<string, object>();
                fields[prop.PropertyName] = field;

                if (!prop.IsReadOnly)
                {
                    field["editable"] = false;
                }
                field["type"] = prop.ModelType.ToJavaScriptType().ToLowerInvariant();
            });
        }
    }
}
