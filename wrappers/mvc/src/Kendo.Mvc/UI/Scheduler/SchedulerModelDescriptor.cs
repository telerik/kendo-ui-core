namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Mvc;
    using Extensions;

    public class SchedulerModelDescriptor : ModelDescriptor
    {
        public SchedulerModelDescriptor(Type modelType)
            : base(modelType)
        { 
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

                var schedulerEventInterface = typeof (ISchedulerEvent);

                var currentMember = prop.Member;

                if (schedulerEventInterface.GetProperty(currentMember) != null)
                {
                    var updatedMember = Char.ToLowerInvariant(currentMember[0]) + currentMember.Substring(1);
                    fields[updatedMember] = field;
                    field["field"] = currentMember;
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
