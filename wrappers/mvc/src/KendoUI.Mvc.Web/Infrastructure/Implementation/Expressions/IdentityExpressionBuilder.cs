// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Linq.Expressions;

    internal class IdentityExpressionBuilder : ExpressionBuilderBase
    {
        public IdentityExpressionBuilder(Type itemType) : base(itemType)
        {
        }

        internal LambdaExpression CreateLambdaExpression()
        {
            return Expression.Lambda(this.ParameterExpression, this.ParameterExpression);
        }
    }
}