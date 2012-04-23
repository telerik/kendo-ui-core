// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
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
