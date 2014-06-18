namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class GanttDependenciesModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private GanttDependenciesModelDescriptor ganttDependenciesModel;

        public GanttDependenciesModelDescriptorFactory(GanttDependenciesModelDescriptor model)
            : base(model)
        {
            ganttDependenciesModel = model;
        }

        /// <summary>
        /// Specify the member used for the predecessorId.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void PredecessorId<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            ganttDependenciesModel.PredecessorId = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the predecessorId.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void PredecessorId(string fieldName)
        {
            ganttDependenciesModel.PredecessorId = fieldName;
        }

        /// <summary>
        /// Specify the member used for the successorId.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void SuccessorId<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            ganttDependenciesModel.SuccessorId = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the successorId.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void SuccessorId(string fieldName)
        {
            ganttDependenciesModel.SuccessorId = fieldName;
        }

        /// <summary>
        /// Specify the member used for the type.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Type<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            ganttDependenciesModel.Type = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the type.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Type(string fieldName)
        {
            ganttDependenciesModel.Type = fieldName;
        }
    }
}
