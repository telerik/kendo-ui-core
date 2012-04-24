namespace KendoUI.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Resources;
    using KendoUI.Mvc.UI;

    /// <summary>
    /// Used for action methods when using Ajax or Custom binding
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    public class GridActionAttribute : FilterAttribute, IActionFilter
    {
        private readonly IGridActionResultAdapterFactory adapterFactory;
        private readonly IGridActionResultFactory resultFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridActionAttribute"/> class.
        /// </summary>
        public GridActionAttribute()
        {
            ActionParameterName = "command";
            adapterFactory = DI.Current.Resolve<IGridActionResultAdapterFactory>();
            resultFactory = DI.Current.Resolve<IGridActionResultFactory>();
        }

        /// <summary>
        /// Gets or sets the name of the action parameter. The default value is "command".
        /// </summary>
        /// <value>The name of the action parameter.</value>
        /// <example>
        /// <code lang="CS">
        /// [GridAction(ActionParameterName="param")]
        /// public ActionResult Index(GridCommand param)
        /// {
        /// }
        /// </code>
        /// </example>
        public string ActionParameterName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the name of the Grid that is populated by the associated action method. Required
        /// when custom server binding is enabled and the grid query string parameters are prefixed.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// [GridAction(EnableCustomBinding=true, GridName="Employees")]
        /// public ActionResult Index(GridCommand param)
        /// {
        /// }
        /// </code>
        /// </example>
        public string GridName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether custom binding is enabled. Used when implementing custom ajax binding.
        /// </summary>
        /// <value><c>true</c> if custom binding is enabled; otherwise, <c>false</c>. The default value is <c>false</c>.</value>
        /// <example>
        /// <code lang="CS">
        /// [GridAction(EnableCustomBinding=true)]
        /// public ActionResult Index(GridCommand param)
        /// {
        /// }
        /// </code>
        /// </example>
        public bool EnableCustomBinding
        {
            get;
            set;
        }

        private string Prefix(string key)
        {
            if (GridName.HasValue())
            {
                return GridName + "-" + key;
            }

            return key;
        }

        public virtual void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var parameterName = ActionParameterName;

            var parametersOfGridCommandType = filterContext.ActionParameters
                .Where(parameter => parameter.Value is GridCommand);

            if (parametersOfGridCommandType.Count() == 1)
            {
                parameterName = parametersOfGridCommandType.First().Key;
            }

            if (filterContext.ActionParameters.ContainsKey(parameterName))
            {
                var command = ((GridCommand)filterContext.ActionParameters[parameterName] ?? new GridCommand());
                command.Page = filterContext.Controller.ValueOf<int>(Prefix(GridUrlParameters.CurrentPage));
                command.PageSize = filterContext.Controller.ValueOf<int>(Prefix(GridUrlParameters.PageSize));

                var orderBy = filterContext.Controller.ValueOf<string>(Prefix(GridUrlParameters.OrderBy));

                command.SortDescriptors.AddRange(GridDescriptorSerializer.Deserialize<SortDescriptor>(orderBy));

                var filter = filterContext.Controller.ValueOf<string>(Prefix(GridUrlParameters.Filter));

                command.FilterDescriptors.AddRange(FilterDescriptorFactory.Create(filter));

                var groupBy = filterContext.Controller.ValueOf<string>(Prefix(GridUrlParameters.GroupBy));

                command.GroupDescriptors.AddRange(GridDescriptorSerializer.Deserialize<GroupDescriptor>(groupBy));

                var aggregates = filterContext.Controller.ValueOf<string>(Prefix(GridUrlParameters.Aggregates));

                command.Aggregates.AddRange(GridDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates));
                
                filterContext.ActionParameters[ActionParameterName] = command;
            }
        }

        public virtual void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (!filterContext.HttpContext.Request.IsAjaxRequest())
            {
                return;
            }

            var actionResultAdapter = adapterFactory.Create(filterContext.Result);

            if (actionResultAdapter == null)
            {
                return;
            }

            var dataSource = actionResultAdapter.GetDataSource();

            if (dataSource == null)
            {
                return;
            }

            var total = actionResultAdapter.GetTotal();

            var dataProcessor = new GridDataProcessor(new GridActionBindingContext(EnableCustomBinding, filterContext.Controller, dataSource, total));

            var result = new Dictionary<string, object>();
            var dataTableEnumerable = dataSource as GridDataTableWrapper;
            if (dataTableEnumerable != null && dataTableEnumerable.Table != null)
            {
                result["data"] = dataProcessor.ProcessedDataSource.SerializeToDictionary(dataTableEnumerable.Table);
            }
            else
            {
                result["data"] = dataProcessor.ProcessedDataSource;
            }
                
            result["total"] = dataProcessor.Total;

            var modelState = actionResultAdapter.GetModelState();

            if (modelState != null && !modelState.IsValid)
            {
                result["modelState"] = SerializeErrors(modelState);
            }

            if (EnableCustomBinding)
            {
                var aggregates = actionResultAdapter.GetAggregates();
                if (aggregates != null)
                {
                    result["aggregates"] = aggregates;
                }

            }
            else
            {
                SerializeAggregateResults(result, dataProcessor.AggregatesResults);
            }            

            filterContext.Result = CreateActionResult(result);
        }

        protected virtual ActionResult CreateActionResult(object model)
        {
            return resultFactory.Create(model);
        }

        protected virtual void SerializeAggregateResults(Dictionary<string, object> result, IEnumerable<AggregateResult> aggregatesResults)
        {
            if (aggregatesResults.Any())
            {
                result["aggregates"] = aggregatesResults.GroupBy(a => a.Member)
                    .ToDictionary(g => g.Key, g => g.ToDictionary(a => a.AggregateMethodName, a => a.Value));
            }
        }       
        
        protected virtual object SerializeErrors(ModelStateDictionary modelState)
        {
            return modelState.Where(entry => entry.Value.Errors.Any())
                             .ToDictionary(entry => entry.Key, entry => SerializeModelState(entry.Value));
        }

        protected virtual Dictionary<string, object> SerializeModelState(ModelState modelState)
        {
            var result = new Dictionary<string, object>();
            result["errors"] = modelState.Errors
                                         .Select(error => GetErrorMessage(error, modelState))
                                         .ToArray();
            return result;
        }
        
        protected virtual string GetErrorMessage(ModelError error, ModelState modelState)
        {
            if (!error.ErrorMessage.HasValue())
            {
                if (modelState.Value == null)
                {
                    return error.ErrorMessage;
                }

                return TextResource.ValueNotValidForProperty.FormatWith(modelState.Value.AttemptedValue);
            }

            return error.ErrorMessage;
        }
    }
}
