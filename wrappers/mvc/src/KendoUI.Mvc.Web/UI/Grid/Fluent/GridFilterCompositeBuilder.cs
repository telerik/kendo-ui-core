// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;

    public class GridFilterCompositeBuilder<TBuilder> : GridFilterCompositeBuilderBase where TBuilder : GridFilterDescriptorBuilderBase
    {
        public GridFilterCompositeBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public virtual TBuilder And()
        {
            FilterDescriptor previous = Descriptor.FilterDescriptors[Descriptor.FilterDescriptors.Count - 1] as FilterDescriptor;

            if (previous == null)
            {
                throw new InvalidCastException();
            }            

            FilterDescriptor descriptor = new FilterDescriptor { Member = previous.Member };

            Descriptor.LogicalOperator = FilterCompositionLogicalOperator.And;
            Descriptor.FilterDescriptors.Add(descriptor);

            TBuilder builder = (TBuilder) Activator.CreateInstance(typeof(TBuilder), new object[] { Descriptor });

            return builder;
        }

        public virtual TBuilder Or()
        {
            FilterDescriptor previous = Descriptor.FilterDescriptors[Descriptor.FilterDescriptors.Count - 1] as FilterDescriptor;

            if (previous == null)
            {
                throw new InvalidCastException();
            }

            FilterDescriptor descriptor = new FilterDescriptor { Member = previous.Member };

            Descriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;

            Descriptor.FilterDescriptors.Add(descriptor);

            TBuilder builder = (TBuilder)Activator.CreateInstance(typeof(TBuilder), new object[] { Descriptor });

            return builder;
        }
    }    
}