// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;

    public abstract class GridFilterEqualityDescriptorBuilderBase<TValue, TCompositeBuilder> : GridFilterDescriptorBuilderBase where TCompositeBuilder : GridFilterCompositeBuilderBase
    {
        protected GridFilterEqualityDescriptorBuilderBase(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public TCompositeBuilder IsEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsEqualTo, value);

            return CreateBuilder();
        }

        public TCompositeBuilder IsNotEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsNotEqualTo, value);

            return CreateBuilder();
        }

        protected TCompositeBuilder CreateBuilder()
        {
            return (TCompositeBuilder) Activator.CreateInstance(typeof(TCompositeBuilder), new object[] { Descriptor });
        }
    }
}