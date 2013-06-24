namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using Xunit;

    public class SchedulerEventControllerTests
    {
        public SchedulerEventControllerTests()
        {
        }

        //[Fact]
        //public void Should_return_all_available_events()
        //{
        //    SchedulerEventController<SchedulerEventDouble> controller = SchedulerEventControllerTestHelper.CreateController();

        //    var result = controller.Read(new DataSourceRequest());

        //    var dataSourceResult = result.Data as DataSourceResult;

        //    var browserResult = dataSourceResult.Data as IEnumerable<SchedulerEventDouble>;

        //    browserResult.Count<SchedulerEventDouble>().ShouldEqual(2);
        //}

        //[Fact]
        //public void Should_return_events_for_period()
        //{
        //    SchedulerEventController<SchedulerEventDouble> controller = SchedulerEventControllerTestHelper.CreateController();

        //    //The filter is not correct
        //    var filters = (IList<IFilterDescriptor>)new List<IFilterDescriptor>()  {
        //            new CompositeFilterDescriptor() 
        //            {
        //                LogicalOperator = FilterCompositionLogicalOperator.And, FilterDescriptors = new Kendo.Mvc.Infrastructure.Implementation.FilterDescriptorCollection() 
        //                {
        //                    new FilterDescriptor() 
        //                    {
        //                        Member = "Start", 
        //                        Operator = FilterOperator.IsGreaterThanOrEqualTo,
        //                        Value = new DateTime(2013, 1, 7) 
        //                    },
        //                    new FilterDescriptor() 
        //                    {
        //                        Member = "End",
        //                        Operator = FilterOperator.IsLessThanOrEqualTo,
        //                        Value = new DateTime(2013, 1, 20) 
        //                    }
        //                }
        //            }                                                 
        //        };

        //    var result = controller.Read(new DataSourceRequest() { Filters = filters });

        //    var dataSourceResult = result.Data as DataSourceResult;

        //    var browserResult = dataSourceResult.Data as IEnumerable<SchedulerEventDouble>;

        //    browserResult.Count<SchedulerEventDouble>().ShouldEqual(1);
        //}

        //[Fact]
        //public void Should_return_events_for_period_passing_recurrency_rules()
        //{ }

        //[Fact]
        //public void Should_insert_event()
        //{
        //    SchedulerEventController<SchedulerEventDouble> controller = SchedulerEventControllerTestHelper.CreateController();

        //    var result = controller.Create(
        //        new SchedulerEventDouble()
        //        {
        //            Id = 0,
        //            Title = "Meeting",
        //            Description = "Meeting with friend",
        //            IsAllDay = true,
        //            Start = new DateTime(2013, 1, 1),
        //            End = new DateTime(2013, 1, 2)
        //        });

        //    var dataSourceResult = result.Data as DataSourceResult;
        //    var browserResult = dataSourceResult;

        //    var readResult = controller.Read(new DataSourceRequest());
        //    var readDataSourceResult = readResult.Data as DataSourceResult;
        //    var readBrowserResult = readDataSourceResult.Data as IEnumerable<SchedulerEventDouble>;

        //    readBrowserResult.Count<SchedulerEventDouble>().ShouldEqual(3);
        //    browserResult.ShouldBeNull();
        //}

        //[Fact]
        //public void Should_not_insert_event_with_invalid_model_state()
        //{
        //    SchedulerEventController<SchedulerEventDouble> controller = SchedulerEventControllerTestHelper.CreateController();

        //    controller.ModelState.AddModelError("Title", "Title field is required!");

        //    var result = controller.Create(
        //        new SchedulerEventDouble() 
        //        { 
        //            Id = 0,
        //            Description = "Meeting with friend",
        //            IsAllDay = true,
        //            Start = new DateTime(2013, 1, 1),
        //            End = new DateTime(2013, 1, 2) 
        //        });

        //    var resultData = result.Data;
        //    Type resultDataType = resultData.GetType();
        //    PropertyInfo errorsProperty = resultDataType.GetProperty("Errors");

        //    var readResult = controller.Read(new DataSourceRequest());
        //    var readDataSourceResult = readResult.Data as DataSourceResult;
        //    var readBrowserResult = readDataSourceResult.Data as IEnumerable<SchedulerEventDouble>;

        //    readBrowserResult.Count<SchedulerEventDouble>().ShouldEqual(2);
        //    errorsProperty.ShouldNotBeNull();
        //}

        //TODO: Test ModelState errors
        //TODO: Test Errors in dataBase
    }
}
