namespace Kendo.Mvc.UI
{
    using System;

    public class ModelFieldDescriptor
    {
        public ModelFieldDescriptor()
        {
            IsEditable = true;
        }

        public Type MemberType { get; set; }
        public bool IsEditable { get; set; }
        public object DefaultValue { get; set; }
        public string Member { get; set; }
    }
}
