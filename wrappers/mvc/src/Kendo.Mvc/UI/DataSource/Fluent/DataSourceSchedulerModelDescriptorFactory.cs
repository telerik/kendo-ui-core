namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class DataSourceSchedulerModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private SchedulerModelDescriptor schedulerModel;

        public DataSourceSchedulerModelDescriptorFactory(SchedulerModelDescriptor model)
          : base(model)
        {
            schedulerModel = model;
        }

        /// <summary>
        /// Specify the member used for recurrenceId.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void RecurrenceId<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            schedulerModel.RecurrenceId = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for recurrenceId.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void RecurrenceId(string fieldName)
        {
            schedulerModel.RecurrenceId = fieldName;
        }
    }
}
