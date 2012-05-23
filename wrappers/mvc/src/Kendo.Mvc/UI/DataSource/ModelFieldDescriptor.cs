namespace Kendo.Mvc.UI
{
    using System;

    public class ModelFieldDescriptor
    {
        public Type MemberType { get; set; }
        public bool IsEditable { get; set; }
        public object DefaultValue { get; set; }
        public string Member { get; set; }
    }
}
