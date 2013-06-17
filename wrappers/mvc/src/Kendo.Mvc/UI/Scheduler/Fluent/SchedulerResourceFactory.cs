namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    /// <summary>
    /// Creates resources for the <see cref="Scheduler" /> class.
    /// </summary>
    public class SchedulerResourceFactory<TModel> : IHideObjectMembers
        where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerResourceFactory"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerResourceFactory(Scheduler<TModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a Scheduler resource.
        /// </summary>
        /// <returns></returns>
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
