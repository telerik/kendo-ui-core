// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    public class ComparisonNode : IFilterNode, IOperatorNode
    {
        public FilterOperator FilterOperator 
        { 
            get; 
            set; 
        }

        public virtual IFilterNode First 
        { 
            get; 
            set; 
        }

        public virtual IFilterNode Second
        {
            get;
            set;
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
