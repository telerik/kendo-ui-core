// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Linq.Expressions;
    using Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    public class GridGroupDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly GridGroupingSettings settings;

        public GridGroupDescriptorFactory(GridGroupingSettings settings)
        {
            this.settings = settings;
        }

        public GridGroupDescriptorBuilder<TModel> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Ascending);
        }

        public GridGroupDescriptorBuilder<TModel> Add<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Ascending);
        }

        public GridGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType, ListSortDirection.Ascending);
        }

        public GridGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType, ListSortDirection sortDirection)
        {
            return AddDescriptor(memberName, memberType, sortDirection);
        }

        public GridGroupDescriptorBuilder<TModel> Add<TValue>(string memberName, ListSortDirection sortDirection)
        {
            return AddDescriptor<TValue>(memberName, sortDirection);
        }

        public GridGroupDescriptorBuilder<TModel> AddDescending<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Descending);
        }

        public GridGroupDescriptorBuilder<TModel> AddDescending<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Descending);
        }

        public GridGroupDescriptorBuilder<TModel> AddDescending(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType, ListSortDirection.Descending);
        }

        private GridGroupDescriptorBuilder<TModel> AddDescriptor<TValue>(string memberName, ListSortDirection sortDirection)
        {
            return AddDescriptor(memberName, typeof(TValue), sortDirection);
        }

        private GridGroupDescriptorBuilder<TModel> AddDescriptor(string memberName, Type memberType, ListSortDirection sortDirection)
        {
            Guard.IsNotNullOrEmpty(memberName, "memberName");
            Guard.IsNotNull(memberType, "memberType");

            var descriptor = new GroupDescriptor();
            descriptor.Member = memberName;
            descriptor.SortDirection = sortDirection;
            descriptor.MemberType = memberType;

            settings.Groups.Add(descriptor);

            return new GridGroupDescriptorBuilder<TModel>(descriptor);
        }
    }
}
