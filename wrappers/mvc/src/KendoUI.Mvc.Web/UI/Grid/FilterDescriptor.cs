// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Linq.Expressions;

    using Infrastructure.Implementation.Expressions;

    /// <summary>
    /// Represents declarative filtering.
    /// </summary>
    public partial class FilterDescriptor : FilterDescriptorBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FilterDescriptor"/> class.
        /// </summary>
        public FilterDescriptor() : this(string.Empty, FilterOperator.IsEqualTo, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="FilterDescriptor"/> class.
        /// </summary>
        /// <param name="member">The member.</param>
        /// <param name="filterOperator">The filter operator.</param>
        /// <param name="filterValue">The filter value.</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FilterDescriptor(string member, FilterOperator filterOperator, object filterValue)
        {
            this.Member = member;
            this.Operator = filterOperator;
            this.Value = filterValue;
        }

        public object ConvertedValue
        {
            get
            {
                return this.Value;
            }
        }

        /// <summary>
        /// Gets or sets the member name which will be used for filtering.
        /// </summary>
        /// <filterValue>The member that will be used for filtering.</filterValue>
        public string Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the type of the member that is used for filtering.
        /// Set this property if the member type cannot be resolved automatically.
        /// Such cases are: items with ICustomTypeDescriptor, XmlNode or DataRow.
        /// Changing this property did not raise 
        /// <see cref="FilterDescriptorBase.PropertyChanged"/> event.
        /// </summary>
        /// <value>The type of the member used for filtering.</value>
        public Type MemberType { get; set; }

        /// <summary>
        /// Gets or sets the filter operator.
        /// </summary>
        /// <filterValue>The filter operator.</filterValue>
        public FilterOperator Operator
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the target filter value.
        /// </summary>
        /// <filterValue>The filter value.</filterValue>
        public object Value
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a predicate filter expression.
        /// </summary>
        /// <param name="parameterExpression">The parameter expression, which will be used for filtering.</param>
        /// <returns>A predicate filter expression.</returns>
        protected override Expression CreateFilterExpression(ParameterExpression parameterExpression)
        {
            var builder = new FilterDescriptorExpressionBuilder(parameterExpression, this);
            builder.Options.CopyFrom(ExpressionBuilderOptions);

            return builder.CreateBodyExpression();
        }
        
        /// <summary>
        /// Determines whether the specified <paramref name="other"/> descriptor 
        /// is equal to the current one.
        /// </summary>
        /// <param name="other">The other filter descriptor.</param>
        /// <returns>
        /// True if all members of the current descriptor are 
        /// equal to the ones of <paramref name="other"/>, otherwise false.
        /// </returns>
        public virtual bool Equals(FilterDescriptor other)
        {
            if (ReferenceEquals(null, other))
            {
                return false;
            }
            if (ReferenceEquals(this, other))
            {
                return true;
            }

            return 
                Equals(other.Operator, this.Operator) && 
                Equals(other.Member, this.Member) && 
                Equals(other.Value, this.Value);
        }

        /// <summary>
        /// Determines whether the specified <paramref name="obj"/>
        /// is equal to the current descriptor.
        /// </summary>
        public override bool Equals(object obj)
        {
            var other = obj as FilterDescriptor;
            if ( other == null )
            {
                return false;
            }

            return Equals(other);
        }

        /// <summary>
        /// Serves as a hash function for a particular type.
        /// </summary>
        /// <returns>
        /// A hash code for the current filter descriptor.
        /// </returns>
        public override int GetHashCode()
        {
            unchecked
            {
                int result = this.Operator.GetHashCode();
                result = (result * 397) ^ (this.Member != null ? this.Member.GetHashCode() : 0);
                result = (result * 397) ^ (this.Value != null ? this.Value.GetHashCode() : 0);
                return result;
            }
        }
    }
}