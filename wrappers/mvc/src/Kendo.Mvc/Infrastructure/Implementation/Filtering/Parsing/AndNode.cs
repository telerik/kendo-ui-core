namespace Kendo.Mvc.Infrastructure.Implementation
{
    public class AndNode : IFilterNode, ILogicalNode
    {
        public IFilterNode First 
        { 
            get; 
            set; 
        }

        public IFilterNode Second 
        { 
            get; 
            set; 
        }
		
        public FilterCompositionLogicalOperator LogicalOperator
		{
			get
			{
                return FilterCompositionLogicalOperator.And;
			}
		}
        
        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.StartVisit(this);
            
            First.Accept(visitor);
            Second.Accept(visitor);
            
            visitor.EndVisit();
        }
    }
}
