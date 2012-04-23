// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
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