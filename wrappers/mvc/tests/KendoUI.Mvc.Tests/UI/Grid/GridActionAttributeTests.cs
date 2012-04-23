namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Data;
    using System.Globalization;
    using System.Linq;
    using System.Web.Mvc;
    using Xunit;

    public class GridActionAttributeTests
    {
        const string secondKey = "goo";
        const string firstKey = "foo";

        private readonly GridActionAttribute gridAttribute;
        private readonly Mock<ActionExecutedContext> filterExecutedContext;
        private readonly Mock<ActionExecutingContext> filterExecutingContext;
        private readonly IDictionary<string, ValueProviderResult> valueProvider;
        private readonly ViewDataDictionary viewData;

        public GridActionAttributeTests()
        {
            filterExecutedContext = new Mock<ActionExecutedContext>();

            NameValueCollection headers = new NameValueCollection();
            headers["X-Requested-With"] = "XMLHttpRequest";

            filterExecutedContext.SetupGet(c => c.HttpContext).Returns(TestHelper.CreateMockedHttpContext().Object);
            filterExecutedContext.SetupGet(c => c.HttpContext.Request.Headers).Returns(headers);
            filterExecutedContext.Object.Result = new ViewResult();

            filterExecutingContext = new Mock<ActionExecutingContext>();
            filterExecutingContext.SetupGet(c => c.HttpContext).Returns(TestHelper.CreateMockedHttpContext().Object);
            filterExecutingContext.SetupGet(c => c.HttpContext.Request.Headers).Returns(headers);

            IDictionary<string, object> actionParameters = new Dictionary<string, object> { { "command", null } };

            filterExecutingContext.SetupGet(c => c.ActionParameters).Returns(actionParameters);

            valueProvider = new Dictionary<string, ValueProviderResult>();
            viewData = new ViewDataDictionary();

            ControllerBase controller = new ControllerTestDouble(valueProvider, viewData);

            filterExecutedContext.SetupGet(c => c.Controller).Returns(controller);
            filterExecutingContext.SetupGet(c => c.Controller).Returns(controller);

            gridAttribute = new GridActionAttribute();
        }

        [Fact]
        public void OnActionExecuted_updates_the_result()
        {
            var json = GetJsonResult(new ViewDataDictionary(new GridModel(new object[] { })));

            Assert.True(json.ContainsKey("data"));
            Assert.True(json.ContainsKey("total"));
            Assert.False(json.ContainsKey("modelState"));
        }

        [Fact]
        public void Should_serialize_model_state_if_there_are_errors()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));

            viewData.ModelState.AddModelError(firstKey, "bar");

            var json = GetJsonResult(viewData);

            Assert.True(json.ContainsKey("modelState"));
        }

        [Fact]
        public void Should_serialize_errors_in_model_state()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));

            viewData.ModelState.AddModelError(firstKey, "bar");

            var modelState = GetModelState(viewData);

            var errors = GetErrorsForKey(firstKey, modelState);

            Assert.Equal(1, errors.Count);
            Assert.Equal("bar", errors[0]);
        }

        [Fact]
        public void Should_serialize_all_errors_in_model_state()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));

            viewData.ModelState.AddModelError(firstKey, "bar");
            viewData.ModelState.AddModelError(firstKey, "baz");
            viewData.ModelState.AddModelError(secondKey, "moo");

            var modelState = GetModelState(viewData);

            Assert.Equal(2, modelState.Keys.Count);

            var gooErrors = GetErrorsForKey(secondKey, modelState);

            Assert.Equal(1, gooErrors.Count);
        }

        [Fact]
        public void Should_skip_entries_without_errors()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));

            viewData.ModelState.AddModelError(firstKey, "bar");
            viewData.ModelState.Add(secondKey, new ModelState());

            var modelState = GetModelState(viewData);

            Assert.Equal(1, modelState.Keys.Count);
        }

        [Fact]
        public void Should_serialize_friendly_error_message_with_attempted_value_when_empty_error_message_is_added()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));
            viewData.ModelState.Add(firstKey, new ModelState
            {
                Value = new ValueProviderResult("bar", "bar", CultureInfo.InvariantCulture)
            });

            viewData.ModelState.AddModelError(firstKey, "");

            var modelState = GetModelState(viewData);

            var errors = GetErrorsForKey(firstKey, modelState);
            Assert.Equal("The value 'bar' is invalid.", errors[0]);
        }

        [Fact]
        public void Should_serialize_empty_errors_array_when_model_state_is_missing_and_error_message_is_added()
        {
            var viewData = new ViewDataDictionary(new GridModel(new object[] { }));

            viewData.ModelState.AddModelError(firstKey, "");

            var modelState = GetModelState(viewData);

            var errors = GetErrorsForKey(firstKey, modelState);
            Assert.Equal(1, errors.Count);
            Assert.Equal("", errors[0]);
        }

        [Fact]
        public void OnActionExecuting_updates_the_grid_command_parameter()
        {
            valueProvider.Add(GridUrlParameters.CurrentPage, "1");
            valueProvider.Add(GridUrlParameters.OrderBy, "Name-asc");
            valueProvider.Add(GridUrlParameters.Filter, "Age~eq~1");
            valueProvider.Add(GridUrlParameters.PageSize, "42");
            valueProvider.Add(GridUrlParameters.GroupBy, "Name-asc");

            gridAttribute.OnActionExecuting(filterExecutingContext.Object);

            GridCommand gridCommand = (GridCommand)filterExecutingContext.Object.ActionParameters["command"];

            Assert.Equal(1, gridCommand.Page);
            Assert.Equal("Name", gridCommand.SortDescriptors[0].Member);
            Assert.Equal("Name", gridCommand.GroupDescriptors[0].Member);
            Assert.Equal("Age", ((FilterDescriptor)gridCommand.FilterDescriptors[0]).Member);
            Assert.Equal(42, gridCommand.PageSize);
        }
        
        [Fact]
        public void OnActionExecuting_finds_grid_command_parameter_by_type()
        {
            valueProvider.Add(GridUrlParameters.CurrentPage, "1");
            valueProvider.Add(GridUrlParameters.OrderBy, "Name-asc");
            valueProvider.Add(GridUrlParameters.Filter, "Age~eq~1");
            valueProvider.Add(GridUrlParameters.PageSize, "42");
            valueProvider.Add(GridUrlParameters.GroupBy, "Name-asc");

            filterExecutingContext.Object.ActionParameters["foo"] = new GridCommand();
            
            gridAttribute.OnActionExecuting(filterExecutingContext.Object);

            GridCommand command = (GridCommand)filterExecutingContext.Object.ActionParameters["foo"];

            Assert.Equal(1, command.Page);
            Assert.Equal("Name", command.SortDescriptors[0].Member);
            Assert.Equal("Name", command.GroupDescriptors[0].Member);
            Assert.Equal("Age", ((FilterDescriptor)command.FilterDescriptors[0]).Member);
            Assert.Equal(42, command.PageSize);
        }

        [Fact]
        public void OnActionExecuting_updates_the_grid_command_parameter_with_prefixed_values()
        {
            valueProvider.Add("test-" + GridUrlParameters.CurrentPage, "1");
            valueProvider.Add("test-" + GridUrlParameters.OrderBy, "Name-asc");
            valueProvider.Add("test-" + GridUrlParameters.Filter, "Age~eq~1");
            valueProvider.Add("test-" + GridUrlParameters.PageSize, "42");
            valueProvider.Add("test-" + GridUrlParameters.GroupBy, "Name-asc");

            gridAttribute.GridName = "test";
            gridAttribute.OnActionExecuting(filterExecutingContext.Object);

            GridCommand gridCommand = (GridCommand)filterExecutingContext.Object.ActionParameters["command"];

            Assert.Equal(1, gridCommand.Page);
            Assert.Equal("Name", gridCommand.SortDescriptors[0].Member);
            Assert.Equal("Name", gridCommand.GroupDescriptors[0].Member);
            Assert.Equal("Age", ((FilterDescriptor)gridCommand.FilterDescriptors[0]).Member);
            Assert.Equal(42, gridCommand.PageSize);
        }

        [Fact]
        public void Should_serialize_non_empty_data_if_bound_to_DataTable()
        {
            var viewData = new ViewDataDictionary(new GridModel(GetDataTable(1)));
            var result = GetJsonResult(viewData);
            Assert.True(((IEnumerable<Dictionary<string, object>>)result["data"]).Any());
        }

        [Fact]
        public void Should_serialize_empty_data_if_bound_to_empty_DataTable()
        {
            DataTable dataSource = GetDataTable(0);
            var viewData = new ViewDataDictionary(new GridModel(dataSource));
            var result = GetJsonResult(viewData);
            Assert.Empty((IEnumerable)result["data"]);
        }

        [Fact]
        public void Should_serialize_empty_data_if_bound_to_null_DataTable()
        {
            DataTable dataSource = null;
            var viewData = new ViewDataDictionary(new GridModel(dataSource));
            var result = GetJsonResult(viewData);
            Assert.Empty((IEnumerable)result["data"]);
        }

        private static DataTable GetDataTable(int howMany)
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add("Field1");
            dataSource.Columns.Add("Field2", typeof(int));

            for (int i = 0; i < howMany; i++)
            {
                dataSource.Rows.Add("value" + i, i);
            }
            return dataSource;
        }

        private IList<string> GetErrorsForKey(string key, IDictionary<string, Dictionary<string, object>> modelState)
        {
            var foo = modelState[key];
            return ((IList<string>)foo["errors"]);
        }

        private IDictionary<string, object> GetJsonResult(ViewDataDictionary viewData)
        {
            filterExecutedContext.Object.Result = new ViewResult
            {
                ViewData = viewData
            };

            gridAttribute.OnActionExecuted(filterExecutedContext.Object);

            var result = (JsonResult)filterExecutedContext.Object.Result;

            return (IDictionary<string, object>)result.Data;
        }

        private IDictionary<string, Dictionary<string, object>> GetModelState(ViewDataDictionary viewData)
        {
            var json = GetJsonResult(viewData);

            return (IDictionary<string, Dictionary<string, object>>)json["modelState"];
        }
    }
}