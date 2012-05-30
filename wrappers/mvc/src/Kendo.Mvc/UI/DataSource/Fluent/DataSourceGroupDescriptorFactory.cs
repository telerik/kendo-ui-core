namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    public class DataSourceGroupDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IList<GroupDescriptor> descriptors;

        public DataSourceGroupDescriptorFactory(IList<GroupDescriptor> descriptors)
        {
            this.descriptors = descriptors;
        }

        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Ascending);
        }

        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Ascending);
        }

        public DataSourceGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType, ListSortDirection.Ascending);
        }

        public DataSourceGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType, ListSortDirection sortDirection)
        {
            return AddDescriptor(memberName, memberType, sortDirection);
        }

        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(string memberName, ListSortDirection sortDirection)
        {
            return AddDescriptor<TValue>(memberName, sortDirection);
        }

        public DataSourceGroupDescriptorBuilder<TModel> AddDescending<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Descending);
        }

        public DataSourceGroupDescriptorBuilder<TModel> AddDescending<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Descending);
        }

        public DataSourceGroupDescriptorBuilder<TModel> AddDescending(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType, ListSortDirection.Descending);
        }

        private DataSourceGroupDescriptorBuilder<TModel> AddDescriptor<TValue>(string memberName, ListSortDirection sortDirection)
        {
            return AddDescriptor(memberName, typeof(TValue), sortDirection);
        }

        private DataSourceGroupDescriptorBuilder<TModel> AddDescriptor(string memberName, Type memberType, ListSortDirection sortDirection)
        {

            var descriptor = new GroupDescriptor();
            descriptor.Member = memberName;
            descriptor.SortDirection = sortDirection;
            descriptor.MemberType = memberType;

            descriptors.Add(descriptor);

            return new DataSourceGroupDescriptorBuilder<TModel>(descriptor);
        }
    }
}
