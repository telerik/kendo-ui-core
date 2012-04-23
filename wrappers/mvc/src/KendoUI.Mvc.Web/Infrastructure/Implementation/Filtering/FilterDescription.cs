// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Linq.Expressions;
    using Telerik.Web.Mvc.Infrastructure.Implementation.Expressions;
    /// <summary>
	/// The class enables implementation of custom filtering logic.
	/// </summary>
    public abstract class FilterDescription : FilterDescriptorBase
	{
		/// <summary>
		/// The method checks whether the passed parameter satisfies filter criteria. 
		/// </summary>
		public abstract bool SatisfiesFilter(object dataItem);

        /// <summary>
        /// If false <see cref="SatisfiesFilter"/> will not execute.
        /// </summary>
        public virtual bool IsActive
        {
            get
            {
                return true;
            }
        }

	    /// <summary>
	    /// Creates a predicate filter expression that calls <see cref="SatisfiesFilter"/>.
	    /// </summary>
	    /// <param name="parameterExpression">The parameter expression, which parameter 
	    /// will be passed to <see cref="SatisfiesFilter"/> method.</param>
	    protected override Expression CreateFilterExpression(ParameterExpression parameterExpression)
        {
            var expressionBuilder = new FilterDescriptionExpressionBuilder(parameterExpression, this);

            return expressionBuilder.CreateBodyExpression();
        }

	    
	}
}
