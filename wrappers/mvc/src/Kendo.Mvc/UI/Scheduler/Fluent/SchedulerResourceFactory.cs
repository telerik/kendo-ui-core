namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;

    /// <summary>
    /// Creates resources for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class SchedulerResourceFactory<TModel> : IHideObjectMembers
        where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerResourceFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container</param>
        public SchedulerResourceFactory(Scheduler<TModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a Scheduler resource.
        /// </summary>
        public SchedulerResourceBuilder<TModel> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            //TODO: Refactor and add validation for fields
            if (!typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            string memberName = ExpressionHelper.GetExpressionText(expression);

            SchedulerResource<TModel> resource = new SchedulerResource<TModel>(memberName);

            container.Resources.Add(resource);

            return new SchedulerResourceBuilder<TModel>(resource, container.ViewContext, container.UrlGenerator);
        }
    }
}
