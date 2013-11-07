namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="HierarchicalModelDescriptor"/>.
    /// </summary>
    public class HierarchicalModelDescriptorBuilder: IHideObjectMembers
    {
        private readonly HierarchicalModelDescriptor model;

        public HierarchicalModelDescriptorBuilder(HierarchicalModelDescriptor model)
        {
            this.model = model;
        }

        /// <summary>
        /// Specify the model id member name.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public HierarchicalModelDescriptorBuilder Id(string fieldName)
        {
            model.IdMember = fieldName;

            return this;
        }

        /// <summary>
        /// Specify the model children member name.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public HierarchicalModelDescriptorBuilder Children(string fieldName)
        {
            model.ChildrenMember = fieldName;

            return this;
        }

        /// <summary>
        /// Specify the member name used to determine if the model has children.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public HierarchicalModelDescriptorBuilder HasChildren(string fieldName)
        {
            model.HasChildrenMember = fieldName;

            return this;
        }

        /// <summary>
        /// Describes a Model field
        /// </summary>
        /// <param name="memberName">Field name</param>
        /// <param name="memberType">Field type</param>        
        public virtual HierarchicalModelDescriptorBuilder Field(string memberName, Type memberType)
        {
            model.AddDescriptor(memberName, memberType);

            return this;
        }
    }
}
