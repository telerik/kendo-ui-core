namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring group.
    /// </summary>    
    public class DataSourceGroupDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IList<GroupDescriptor> descriptors;

        public DataSourceGroupDescriptorFactory(IList<GroupDescriptor> descriptors)
        {
            this.descriptors = descriptors;
        }

        /// <summary>
        /// Specifies the member by which the data should be grouped.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>     
        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Ascending);
        }

        /// <summary>
        /// Specifies the member by which the data should be grouped.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="memberName">Member name</param>        
        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Ascending);
        }

        /// <summary>
        /// Specifies the member by which the data should be grouped.
        /// </summary>
        /// <param name="memberName">Member name</param>
        /// <param name="memberType">Member type</param>        
        public DataSourceGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType)
        {
            return AddDescriptor(memberName, memberType, ListSortDirection.Ascending);
        }

        /// <summary>
        /// Specifies the member by which the data should be grouped.
        /// </summary>
        /// <param name="memberName">Member name</param>
        /// <param name="memberType">Member type</param>
        /// <param name="sortDirection">Sort order</param>        
        public DataSourceGroupDescriptorBuilder<TModel> Add(string memberName, Type memberType, ListSortDirection sortDirection)
        {
            return AddDescriptor(memberName, memberType, sortDirection);
        }

        /// <summary>
        /// Specifies the member by which the data should be grouped.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="memberName">Member type</param>
        /// <param name="sortDirection">Sort order</param>
        /// <returns></returns>
        public DataSourceGroupDescriptorBuilder<TModel> Add<TValue>(string memberName, ListSortDirection sortDirection)
        {
            return AddDescriptor<TValue>(memberName, sortDirection);
        }

        /// <summary>
        /// Specifies the member by which the data should be sorted in descending order and grouped.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>        
        public DataSourceGroupDescriptorBuilder<TModel> AddDescending<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDescriptor<TValue>(expression.MemberWithoutInstance(), ListSortDirection.Descending);
        }

        /// <summary>
        /// Specifies the member by which the data should be sorted in descending order and grouped.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="memberName">Member name</param>
        public DataSourceGroupDescriptorBuilder<TModel> AddDescending<TValue>(string memberName)
        {
            return AddDescriptor<TValue>(memberName, ListSortDirection.Descending);
        }

        /// <summary>
        /// Specifies the member by which the data should be sorted in descending order and grouped.
        /// </summary>        
        /// <param name="memberName">Member name</param>
        /// /// <param name="memberType">Member type</param>
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
