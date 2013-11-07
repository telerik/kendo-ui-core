namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    public class HierarchicalModelDescriptor: JsonObject
    {
        public HierarchicalModelDescriptor()
        {
            Fields = new List<ModelFieldDescriptor>();
        }

        public ModelFieldDescriptor AddDescriptor(string member, Type memberType)
        {
            var descriptor = new ModelFieldDescriptor { Member = member, MemberType = memberType };
            Fields.Add(descriptor);

            return descriptor;
        }

        public string IdMember 
        { 
            get; 
            set; 
        }

        public string ChildrenMember
        {
            get;
            set;
        }

        public string HasChildrenMember
        {
            get;
            set;
        }

        public IList<ModelFieldDescriptor> Fields { get; private set; }


        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            FluentDictionary.For(json)
                    .Add("id", IdMember, IdMember.HasValue)
                    .Add("hasChildren", HasChildrenMember, HasChildrenMember.HasValue)
                    .Add("children", ChildrenMember, ChildrenMember.HasValue);

            if (Fields.Count > 0)
            {
                var fields = new Dictionary<string, object>();
                json["fields"] = fields;            

                Fields.Each(prop =>             
                {
                    var field = new Dictionary<string, object>();
                    fields[prop.Member] = field;
                    field["type"] = prop.MemberType.ToJavaScriptType().ToLowerInvariant();
                });
            }
        }
    }
}
