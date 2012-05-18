namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    
    using Extensions;
    using Infrastructure;
    using Infrastructure.Implementation;
    using System.ComponentModel.DataAnnotations;

    class GridBoundColumnSerializer : GridColumnSerializer
    {
        private readonly IGridBoundColumn column;

        public GridBoundColumnSerializer(IGridBoundColumn column)
            : base(column)
        {
            this.column = column;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("field", column.Member)
                .Add("format", column.Format, () => column.Format.HasValue())
                .Add("groupable", column.Groupable, true)
                .Add("encoded", column.Encoded, true);

            string editorHtml = column.EditorHtml;

            if (column.Grid.IsSelfInitialized && editorHtml != null)
            {
                editorHtml = editorHtml.Replace("<", "%3c").Replace(">", "%3e");
            }

            FluentDictionary.For(result)
                .Add("readonly", column.ReadOnly, false)
                .Add("editor", editorHtml, () => column.Grid.Editing.Enabled && column.Grid.IsClientBinding && !column.ReadOnly);

            if (column.ClientGroupHeaderTemplate.HasValue())
            {
                result.Add("groupHeaderTemplate", Encode(column, column.ClientGroupHeaderTemplate));
            }
            
            if (column.ClientGroupFooterTemplate.HasValue())
            {
                result.Add("groupFooterTemplate", Encode(column, column.ClientGroupFooterTemplate));
            }            
            

            SerializeValues(result);
            
            return result;
        }

        private void SerializeValues(IDictionary<string, object> result)
        {
            if (column.MemberType != null && column.MemberType.GetNonNullableType().IsEnum)
            {
                var type = column.MemberType.GetNonNullableType();

                var values = new Dictionary<string, object>();
                
                foreach (var value in Enum.GetValues(type))
                {
                    var name = Enum.GetName(type, value);
                    var member = type.GetMember(name).FirstOrDefault();

                    if (member != null)
                    {
                        var displayAttribute = member.GetCustomAttributes(typeof(DisplayAttribute), true)
                            .OfType<DisplayAttribute>()
                            .FirstOrDefault();

                        if (displayAttribute != null)
                        {
                            name = displayAttribute.GetName();
                        }
                    }
                    values[name] = value;
                }

                result["values"] = values;
            }
        }           
    }
}
