namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class SignalRHierarchicalDataSourceModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactoryBase<TModel>, IHideObjectMembers
        where TModel : class
    {
        public SignalRHierarchicalDataSourceModelDescriptorFactory(ModelDescriptor model)
            : base(model)
        {
        }

        /// <summary>
        /// Specify the member used to identify an unique Model instance.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public new SignalRHierarchicalDataSourceModelDescriptorFactory<TModel> Id(string fieldName)
        {
            base.Id(fieldName);

            return this;
        }

        /// <summary>
        /// Specify the model children member name.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public SignalRHierarchicalDataSourceModelDescriptorFactory<TModel> Children(string fieldName)
        {
            model.ChildrenMember = fieldName;

            return this;
        }

        /// <summary>
        /// Specify the children DataSource configuration.
        /// </summary>
        /// <param name="fieldName">The configurator action.</param>
        public SignalRHierarchicalDataSourceModelDescriptorFactory<TModel> Children(Action<SignalRHierarchicalDataSourceBuilder> configurator)
        {
            model.ChildrenDataSource = new DataSource();
            model.ChildrenDataSource.ModelType(typeof(object));
            model.ChildrenDataSource.Type = DataSourceType.Custom;
            configurator(new SignalRHierarchicalDataSourceBuilder(model.ChildrenDataSource));

            return this;
        }

        /// <summary>
        /// Specify the member name used to determine if the model has children.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public SignalRHierarchicalDataSourceModelDescriptorFactory<TModel> HasChildren(string fieldName)
        {
            model.HasChildrenMember = fieldName;

            return this;
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
