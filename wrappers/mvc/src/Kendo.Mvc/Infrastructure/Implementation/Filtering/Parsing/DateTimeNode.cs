namespace Kendo.Mvc.Infrastructure.Implementation
{

    public class DateTimeNode : IFilterNode, IValueNode
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
