namespace Kendo.Mvc.UI
{
    using System;

    public class ModelFieldDescriptor
    {
        public ModelFieldDescriptor()
        {
            IsEditable = true;
            Parse = new ClientHandlerDescriptor();
        }

        public Type MemberType { get; set; }
        public bool IsEditable { get; set; }
        public object DefaultValue { get; set; }
        public string Member { get; set; }

        public string From { get; set; }
        public bool IsNullable { get; set; }
        public ClientHandlerDescriptor Parse { get; set; }
    }
}
