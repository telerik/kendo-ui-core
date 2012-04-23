// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;

    internal static class FilterDescriptorExtensions
    {
        internal static bool IsActive(this FilterDescriptor filter)
        {
            object value = filter.Value;
            if (value == null)
            {
                return false;
            }

            string valueAsString = value as string;
            return valueAsString == null || !string.IsNullOrEmpty(valueAsString);
        }

        internal static IEnumerable<FilterDescriptor> SelectMemberDescriptors(this IEnumerable<IFilterDescriptor> descriptors)
        {
            return descriptors.SelectRecursive(f => GetChildDescriptors(f)).OfType<FilterDescriptor>();
        }

        private static IEnumerable<IFilterDescriptor> GetChildDescriptors(IFilterDescriptor f)
        {
            if (f is CompositeFilterDescriptor)
            {
                return ((CompositeFilterDescriptor)f).FilterDescriptors;
            }
            return null;
        }

#if MVC3
        internal static void SetMemberTypeFrom(this FilterDescriptor descriptor, object item)
        {
            if (!descriptor.Member.HasValue())
                return;

            descriptor.MemberType = BindingHelper.ExtractMemberTypeFromObject(item, descriptor.Member);
        }

        internal static IEnumerable<IFilterDescriptor> SetMemberTypeFrom(this IEnumerable<IFilterDescriptor> descriptors, object item)
        {
            if (item  != null)
            {
                descriptors.SelectMemberDescriptors()
                           .Each(f => f.SetMemberTypeFrom(item));
            }            

            return descriptors;
        }
#endif
        
    }
}