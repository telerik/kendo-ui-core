namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    public class DataSourceModelDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly ModelDescriptor model;

        public DataSourceModelDescriptorFactory(ModelDescriptor model)
        {
            this.model = model;
        }

        public virtual void Id<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            model.Id = expression.MemberWithoutInstance();
        }

        public virtual DataSourceModelFieldDescriptorBuilder<TValue> Field<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddFieldDescriptor<TValue>(expression.MemberWithoutInstance(), typeof(TValue));
        }

        private DataSourceModelFieldDescriptorBuilder<TValue> AddFieldDescriptor<TValue>(string memberName, Type memberType)
        {
            Guard.IsNotNullOrEmpty(memberName, "memberName");
            Guard.IsNotNull(memberType, "memberType");

            var descriptor = new ModelFieldDescriptor();
            
            descriptor.Member = memberName;            
            descriptor.MemberType = memberType;

            model.Fields.Add(descriptor);

            return new DataSourceModelFieldDescriptorBuilder<TValue>(descriptor);            
        }
    }
}
