// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System.Linq.Expressions;
    using System.Reflection;

    internal class FilterDescriptionExpressionBuilder : FilterExpressionBuilder
    {
        private readonly FilterDescription filterDescription;

        public FilterDescription FilterDescription
        {
            get
            {
                return this.filterDescription;
            }
        }

        public FilterDescriptionExpressionBuilder(ParameterExpression parameterExpression, FilterDescription filterDescription) : base(parameterExpression)
        {
            this.filterDescription = filterDescription;
        }

        public override Expression CreateBodyExpression()
        {
            if (this.filterDescription.IsActive)
            {
                return this.CreateActiveFilterExpression();
            }

            return ExpressionConstants.TrueLiteral;
        }

        protected virtual Expression CreateActiveFilterExpression()
        {
            return this.CreateSatisfiesFilterExpression();            
        }

        private MethodCallExpression CreateSatisfiesFilterExpression()
        {
            Expression dataItemExpression = this.ParameterExpression;

            if (dataItemExpression.Type.IsValueType)
            {
                dataItemExpression = Expression.Convert(dataItemExpression, typeof(object));
            }

            return Expression.Call(this.FilterDescriptionExpression, SatisfiesFilterMethodInfo, dataItemExpression);
        }

        private Expression FilterDescriptionExpression
        {
            get
            {
                return Expression.Constant(filterDescription);
            }
        }

        private MethodInfo SatisfiesFilterMethodInfo
        {
            get
            {
                return filterDescription.GetType().GetMethod("SatisfiesFilter", new[] { typeof(object) });
            }
        }
    }
}