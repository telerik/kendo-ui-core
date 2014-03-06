namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class ReadOnlyCustomDataSourceModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactoryBase<TModel>, IHideObjectMembers
        where TModel : class
    {
        public ReadOnlyCustomDataSourceModelDescriptorFactory(ModelDescriptor model)
            : base(model)
        {
        }

        /// <summary>
        /// Specify the member used to identify an unique Model instance.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public new void Id(string fieldName)
        {
            base.Id(fieldName);
        }

        /// <summary>
        /// Describes a Model field
        /// </summary>
        /// <param name="memberName">Field name</param>
        /// <param name="memberType">Field type</param>        
        public virtual CustomDataSourceModelFieldDescriptorBuilder<TModel> Field(string memberName, Type memberType)
        {
            return AddFieldDescriptor<TModel>(memberName, memberType);
        }

        private CustomDataSourceModelFieldDescriptorBuilder<TValue> AddFieldDescriptor<TValue>(string memberName, Type memberType)
        {
            var descriptor = model.AddDescriptor(memberName);

            descriptor.MemberType = memberType;

            return new CustomDataSourceModelFieldDescriptorBuilder<TValue>(descriptor);
        }
    }
}
