// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public class GridFilterStringDescriptorBuilder : GridFilterEqualityDescriptorBuilderBase<string, GridFilterCompositeBuilder<GridFilterStringDescriptorBuilder>>
    {
        public GridFilterStringDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        public GridFilterCompositeBuilder<GridFilterStringDescriptorBuilder> StartsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.StartsWith, value);

            return CreateBuilder();
        }

        public GridFilterCompositeBuilder<GridFilterStringDescriptorBuilder> EndsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.EndsWith, value);

            return CreateBuilder();
        }

        public GridFilterCompositeBuilder<GridFilterStringDescriptorBuilder> Contains(string value)
        {
            SetOperatorAndValue(FilterOperator.Contains, value);

            return CreateBuilder();
        }

        public GridFilterCompositeBuilder<GridFilterStringDescriptorBuilder> DoesNotContain(string value)
        {
            SetOperatorAndValue(FilterOperator.DoesNotContain, value);

            return CreateBuilder();
        }
    }
}