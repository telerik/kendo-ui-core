namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;

    public class FilterNodeVisitor : IFilterNodeVisitor
    {
        private Stack<IFilterDescriptor> context;

        public FilterNodeVisitor()
        {
            context = new Stack<IFilterDescriptor>();
        }

        public IFilterDescriptor Result
        {
            get
            {
                return context.Pop();
            }
        }

        private IFilterDescriptor CurrentDescriptor
        {
            get
            {
                if (context.Count > 0)
                {
                    return context.Peek();
                }

                return null;
            }
        }

        public void StartVisit(IOperatorNode operatorNode)
        {
            FilterDescriptor filterDescriptor = new FilterDescriptor
            {
                Operator = operatorNode.FilterOperator
            };

            CompositeFilterDescriptor compositeFilterDescriptor = CurrentDescriptor as CompositeFilterDescriptor;

            if (compositeFilterDescriptor != null)
            {
                compositeFilterDescriptor.FilterDescriptors.Add(filterDescriptor);
            }

            context.Push(filterDescriptor);
        }

        public void StartVisit(ILogicalNode logicalNode)
        {
            CompositeFilterDescriptor filterDescriptor = new CompositeFilterDescriptor
            {
                LogicalOperator = logicalNode.LogicalOperator
            };

            CompositeFilterDescriptor compositeFilterDescriptor = CurrentDescriptor as CompositeFilterDescriptor;
            if (compositeFilterDescriptor != null)
            {
                compositeFilterDescriptor.FilterDescriptors.Add(filterDescriptor);
            }

            context.Push(filterDescriptor);
        }

        public void Visit(PropertyNode propertyNode)
        {
            ((FilterDescriptor)CurrentDescriptor).Member = propertyNode.Name;
        }

        public void EndVisit()
        {
            if (context.Count > 1)
            {
                context.Pop();
            }
        }

        public void Visit(IValueNode valueNode)
        {
            ((FilterDescriptor)CurrentDescriptor).Value = valueNode.Value;
        }
    }
}
