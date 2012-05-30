namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;

    public class FunctionNode : IFilterNode, IOperatorNode
    {
        public FunctionNode()
        {
            Arguments = new List<IFilterNode>();
        }

        public FilterOperator FilterOperator
        {
            get;
            set;
        }

        public IList<IFilterNode> Arguments
        {
            get;
            private set;
        }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.StartVisit(this);

            foreach (IFilterNode argument in Arguments)
            {
                argument.Accept(visitor);
            }

            visitor.EndVisit();
        }
    }
}
