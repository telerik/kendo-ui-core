// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public abstract class GridFilterComparisonDescriptorBuilderBase<TValue, TCompositeBuilder> : GridFilterEqualityDescriptorBuilderBase<TValue, TCompositeBuilder> where TCompositeBuilder : GridFilterCompositeBuilderBase
    {
        protected GridFilterComparisonDescriptorBuilderBase(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public TCompositeBuilder IsLessThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThan, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsLessThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThanOrEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsGreaterThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThanOrEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsGreaterThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThan, value);

            return CreateBuilder();
        }
    }
}