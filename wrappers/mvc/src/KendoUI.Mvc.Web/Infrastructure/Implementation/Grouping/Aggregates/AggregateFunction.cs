// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.Globalization;
    using System.Linq.Expressions;
    using System;

    public abstract class AggregateFunction
    {
        public abstract string AggregateMethodName { get; }

        private string functionName;

        /// <summary>
        /// Gets or sets the informative message to display as an illustration of the aggregate function.
        /// </summary>
        /// <value>The caption to display as an illustration of the aggregate function.</value>
        public string Caption
        {
            get;
            set;
        }
        
        /// <summary>
        /// Gets or sets the name of the field, of the item from the set of items, which value is used as the argument of the aggregate function.
        /// </summary>
        /// <value>The name of the field to get the argument value from.</value>
        public virtual string SourceField
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the name of the aggregate function, which appears as a property of the group record on which records the function works.
        /// </summary>
        /// <value>The name of the function as visible from the group record.</value>
        public virtual string FunctionName
        {
            get
            {
                if (string.IsNullOrEmpty(this.functionName))
                {
                    this.functionName = this.GenerateFunctionName();
                }

                return this.functionName;
            }
            set
            {
                this.functionName = value;
            }
        }

        public Type MemberType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a string that is used to format the result value.
        /// </summary>
        /// <value>The format string.</value>
        public virtual string ResultFormatString
        {
            get;
            set;
        }

        /// <summary>
        /// Creates the aggregate expression that is used for constructing expression 
        /// tree that will calculate the aggregate result.
        /// </summary>
        /// <param name="enumerableExpression">The grouping expression.</param>
        /// <param name="liftMemberAccessToNull"></param>
        /// <returns></returns>
        public abstract Expression CreateAggregateExpression(Expression enumerableExpression, bool liftMemberAccessToNull);

        /// <summary>
        /// Generates default name for this function using this type's name.
        /// </summary>
        /// <returns>
        /// Function name generated with the following pattern: 
        /// {<see cref="object.GetType()"/>.<see cref="MemberInfo.Name"/>}_{<see cref="object.GetHashCode"/>}
        /// </returns>
        protected virtual string GenerateFunctionName()
        {
            return string.Format(CultureInfo.InvariantCulture, "{0}_{1}", this.GetType().Name, this.GetHashCode());
        }
    }
}