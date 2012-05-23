namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Extensions;
    using System.Linq;

    public class ModelDescriptor : JsonObject
    {
        public ModelDescriptor(Type modelType)
        {
            var metadata = ModelMetadata.FromStringExpression("", new ViewDataDictionary(Activator.CreateInstance(modelType)));
            Fields = Translate(metadata);
        }

        public IList<ModelFieldDescriptor> Fields { get; private set; }
        public string Id { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Id.HasValue())
            {
                json["id"] = Id;
            }

            var fields = new Dictionary<string, object>();
            json["fields"] = fields;            

            Fields.Each(prop =>             
            {
                var field = new Dictionary<string, object>();
                fields[prop.Member] = field;

                if (!prop.IsEditable)
                {
                    field["editable"] = false;
                }

                field["type"] = prop.MemberType.ToJavaScriptType().ToLowerInvariant();

                if (prop.MemberType.IsNullableType() || prop.DefaultValue != null) {
                    field["defaultValue"] = prop.DefaultValue;
                }
            });
        }

        private IList<ModelFieldDescriptor> Translate(ModelMetadata metadata)
        {
            return metadata.Properties
                .Select(p => new ModelFieldDescriptor
                {
                    Member = p.PropertyName,
                    MemberType = p.ModelType,
                    IsEditable = !p.IsReadOnly
                }).ToList();            
        }
    }
}
