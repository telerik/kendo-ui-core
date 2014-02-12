namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Mvc;
    using Extensions;

    public class ModelDescriptor : JsonObject
    {
        public ModelDescriptor(Type modelType)
        {
            var metadata = ModelMetadataProviders.Current.GetMetadataForType(null, modelType);                
            Fields = Translate(metadata);
        }

        public IList<ModelFieldDescriptor> Fields { get; private set; }
        public IDataKey Id { get; set; }

        public ModelFieldDescriptor AddDescriptor(string member)
        {

            var descriptor = Fields.FirstOrDefault(f => f.Member == member);
            if (descriptor != null)
            {
                return descriptor;
            }

            descriptor = new ModelFieldDescriptor { Member = member };
            Fields.Add(descriptor);

            return descriptor;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Id != null)
            {
                json["id"] = Id.Name;
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

                if (!string.IsNullOrEmpty(prop.From))
                {
                    field["from"] = prop.From;
                }

                if (prop.IsNullable)
                {
                     field["nullable"] = prop.IsNullable;
                }

                if (prop.Parse.HasValue())
                {
                    field["parse"] = prop.Parse;
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

        private object CreateDataItem(Type modelType)
        {
            if (modelType == typeof(DataRowView))
            {
                return new DataTable().DefaultView.AddNew();
            }

            if (modelType == typeof(DataRow))
            {
                return new DataTable().NewRow();
            }

            return Activator.CreateInstance(modelType);
        }
    }

    internal static class ModelDescriptorExtentions
    {
        public static bool IsReadOnly(this DataSource dataSource, string fieldName)
        {
            return dataSource.Schema.Model.Fields.Any(f => f.Member == fieldName && !f.IsEditable);
        }
    }
}
