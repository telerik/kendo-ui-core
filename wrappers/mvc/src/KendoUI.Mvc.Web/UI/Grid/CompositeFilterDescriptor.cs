// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.Diagnostics.CodeAnalysis;
    using System.Linq.Expressions;
    
    using Infrastructure.Implementation;
    using Infrastructure.Implementation.Expressions;

    /// <summary>
    /// Represents a filtering descriptor which serves as a container for one or more child filtering descriptors.
    /// </summary>
    public partial class CompositeFilterDescriptor : FilterDescriptorBase
    {
        private FilterDescriptorCollection filterDescriptors;

        /// <summary>
        /// Gets or sets the logical operator used for composing of <see cref="FilterDescriptors"/>.
        /// </summary>
        /// <value>The logical operator used for composition.</value>
        public FilterCompositionLogicalOperator LogicalOperator
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the filter descriptors that will be used for composition.
        /// </summary>
        /// <value>The filter descriptors used for composition.</value>
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly", Justification = "Used for initialization from XAML")]
        public FilterDescriptorCollection FilterDescriptors
        {
            get
            {
                if (this.filterDescriptors == null)
                {
                    SetFilterDescriptors(new FilterDescriptorCollection());
                }
                return this.filterDescriptors;
            }
            set
            {
                if (this.filterDescriptors != value)
                {
                    this.SetFilterDescriptors(value);
                }
            }
        }

        /// <summary>
        /// Creates a predicate filter expression combining <see cref="FilterDescriptors"/> 
        /// expressions with <see cref="LogicalOperator"/>.
        /// </summary>
        /// <param name="parameterExpression">The parameter expression, which will be used for filtering.</param>
        /// <returns>A predicate filter expression.</returns>
        protected override Expression CreateFilterExpression(ParameterExpression parameterExpression)
        {
            var builder = new FilterDescriptorCollectionExpressionBuilder(parameterExpression, this.FilterDescriptors, this.LogicalOperator);
            builder.Options.CopyFrom(this.ExpressionBuilderOptions);

            return builder.CreateBodyExpression();
        }

        private void SetFilterDescriptors(FilterDescriptorCollection value)
        {
            if (this.filterDescriptors != null)
            {
                this.UnsubscribeForFilterDescriptorCollectionEvents();
            }

            this.filterDescriptors = value;

            this.SubscribeForFilterDescriptorCollectionEvents();
        }

        partial void SubscribeForFilterDescriptorCollectionEvents();

        partial void UnsubscribeForFilterDescriptorCollectionEvents();
    }
}