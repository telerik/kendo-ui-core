namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class GanttModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private GanttModelDescriptor ganttModel;

        public GanttModelDescriptorFactory(GanttModelDescriptor model)
            : base(model)
        {
            ganttModel = model;
        }

        /// <summary>
        /// Specify the member used for the parentId.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void ParentId<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            ganttModel.ParentId = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the parentId.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void ParentId(string fieldName)
        {
            ganttModel.ParentId = fieldName;
        }
    }
}
