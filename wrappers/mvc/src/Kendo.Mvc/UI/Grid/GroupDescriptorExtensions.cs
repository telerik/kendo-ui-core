namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Infrastructure.Implementation;
    using Extensions;

    internal static class GroupDescriptorExtensions
    {
        private static void SetMemberTypeFrom(this GroupDescriptor descriptor, object item)
        {
            if (!descriptor.Member.HasValue())
                return;

            descriptor.MemberType = BindingHelper.ExtractMemberTypeFromObject(item, descriptor.Member);
        }

        internal static IEnumerable<GroupDescriptor> SetMemberTypeFrom(this IEnumerable<GroupDescriptor> descriptors, object item)
        {
            if (item != null)
            {
                descriptors.Each(g => g.SetMemberTypeFrom(item));
            }

            return descriptors;
        }
    }
}