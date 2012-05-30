namespace Kendo.Mvc.Infrastructure.Implementation
{
    public interface IFilterNodeVisitor
    {
        void Visit(PropertyNode propertyNode);

        void Visit(IValueNode valueNode);

        void StartVisit(ILogicalNode logicalNode);
        
        void StartVisit(IOperatorNode operatorNode);
        
        void EndVisit();
    }
}
