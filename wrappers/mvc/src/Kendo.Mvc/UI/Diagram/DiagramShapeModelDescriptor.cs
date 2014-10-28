namespace Kendo.Mvc.UI
{
    using Extensions;
    using System;
    using System.Collections.Generic;

    public class DiagramShapeModelDescriptor : ModelDescriptor
    {
        public DiagramShapeModelDescriptor(Type modelType)
            : base(modelType)
        { 
        }

        public string Width { get; set; }
        public string Height { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }

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

                var shapeInterface = typeof (IDiagramShape);

                var currentMember = prop.Member;

                if (shapeInterface.GetProperty(currentMember) != null)
                {
                    var updatedMember = Char.ToLowerInvariant(currentMember[0]) + currentMember.Substring(1);
                    fields[updatedMember] = field;
                    field["from"] = currentMember;
                }
                else if (Width.HasValue() && currentMember == Width)
                {
                    fields["width"] = field;
                    field["from"] = currentMember;
                }
                else if (Height.HasValue() && currentMember == Height)
                {
                    fields["height"] = field;
                    field["from"] = currentMember;
                }
                else if (X.HasValue() && currentMember == X)
                {
                    fields["x"] = field;
                    field["from"] = currentMember;
                }
                else if (Height.HasValue() && currentMember == Y)
                {
                    fields["y"] = field;
                    field["from"] = currentMember;
                }
                else if (Type.HasValue() && currentMember == Type)
                {
                    fields["type"] = field;
                    field["from"] = currentMember;
                }
                else if (Text.HasValue() && currentMember == Text)
                {
                    fields["text"] = field;
                    field["from"] = currentMember;
                }
                else
                {
                    fields[currentMember] = field;
                }

                if (!prop.IsEditable)
                {
                    field["editable"] = false;
                }

                field["type"] = prop.MemberType.ToJavaScriptType().ToLowerInvariant();

                if (prop.MemberType.IsNullableType() || prop.DefaultValue != null)
                {
                    field["defaultValue"] = prop.DefaultValue;
                }
            });
        }
    }
}
