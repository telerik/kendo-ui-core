// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
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
