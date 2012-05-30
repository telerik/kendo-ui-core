namespace Kendo.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using Implementation;

    public static class FilterDescriptorFactory
    {
        public static IList<IFilterDescriptor> Create(string input)
        {
            IList<IFilterDescriptor> result = new List<IFilterDescriptor>();

            FilterParser parser = new FilterParser(input);

            IFilterNode filterNode = parser.Parse();

            if (filterNode == null)
            {
                return result;
            }

            FilterNodeVisitor visitor = new FilterNodeVisitor();

            filterNode.Accept(visitor);

            result.Add(visitor.Result);
            
            return result;
        }
    }
}