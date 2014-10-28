namespace Kendo.Mvc.UI
{
    using Extensions;
    using System;
    using System.Collections.Generic;

    public class DiagramConnectionModelDescriptor : ModelDescriptor
    {
        public DiagramConnectionModelDescriptor(Type modelType)
            : base(modelType)
        { 
        }

        public string From { get; set; }
        public string To { get; set; }
        public string FromX { get; set; }
        public string FromY { get; set; }
        public string ToX { get; set; }
        public string ToY { get; set; }
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

                var connectionInterface = typeof (IDiagramConnection);

                var currentMember = prop.Member;

                if (connectionInterface.GetProperty(currentMember) != null)
                {
                    var updatedMember = Char.ToLowerInvariant(currentMember[0]) + currentMember.Substring(1);
                    fields[updatedMember] = field;
                    field["from"] = currentMember;
                }
                else if (From.HasValue() && currentMember == From)
                {
                    fields["from"] = field;
                    field["from"] = currentMember;
                }
                else if (To.HasValue() && currentMember == To)
                {
                    fields["to"] = field;
                    field["from"] = currentMember;
                }
                else if (FromX.HasValue() && currentMember == FromX)
                {
                    fields["fromX"] = field;
                    field["from"] = currentMember;
                }
                else if (FromY.HasValue() && currentMember == FromY)
                {
                    fields["fromY"] = field;
                    field["from"] = currentMember;
                }
                else if (ToX.HasValue() && currentMember == ToX)
                {
                    fields["toX"] = field;
                    field["from"] = currentMember;
                }
                else if (ToY.HasValue() && currentMember == ToY)
                {
                    fields["toY"] = field;
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
