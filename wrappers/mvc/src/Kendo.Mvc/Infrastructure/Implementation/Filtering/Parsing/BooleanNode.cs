namespace Kendo.Mvc.Infrastructure.Implementation
{
    public class BooleanNode : IFilterNode, IValueNode
    {
        public object Value
        {
            get;
            set;
        }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
