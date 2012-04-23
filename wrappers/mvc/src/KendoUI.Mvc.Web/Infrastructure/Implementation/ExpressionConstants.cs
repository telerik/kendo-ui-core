// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Linq.Expressions;

    internal class ExpressionConstants
    {
        internal static Expression TrueLiteral
        {
            get { return Expression.Constant(true); }
        }

        internal static Expression FalseLiteral
        {
            get { return Expression.Constant(false); }
        }

        internal static Expression NullLiteral
        {
            get { return Expression.Constant(null); }
        }
    }
}
