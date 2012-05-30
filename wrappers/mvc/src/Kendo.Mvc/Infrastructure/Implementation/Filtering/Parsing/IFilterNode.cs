namespace Kendo.Mvc.Infrastructure.Implementation
{
    public interface IFilterNode
    {
        void Accept(IFilterNodeVisitor visitor);
    }
}
