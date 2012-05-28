namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Kendo.Mvc.UI;
    using Xunit;
    using System;
    using System.Globalization;


    public class InputComponentExtensionsTests: IDisposable
    {
        ViewContext viewContext;
        DatePicker datepicker;
        ValueProviderResult result;
        ModelState state;
        CultureInfo currentCulture; 

        public InputComponentExtensionsTests()
        {
            viewContext = TestHelper.CreateViewContext();
            datepicker = DatePickerTestHelper.CreateDatePicker(viewContext);
            datepicker.Name = "DatePicker1";

            result = new ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            state = new ModelState();
            state.Value = result;

            datepicker.ViewData.ModelState.Add("DatePicker1", state);
            currentCulture = CultureInfo.CurrentCulture;
        }

        public void Dispose()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = currentCulture;
        }

        [Fact]
        public void GetValue_should_not_throw_exception_if_ModelState_is_not_of_correct_type()
        {
            viewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());
            Assert.DoesNotThrow(() => datepicker.GetValue(o => (DateTime?)o));
        }

        [Fact]
        public void GetValue_should_return_null_if_ModelError()
        {
            viewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());
            datepicker.GetValue(o => (DateTime?)o).ShouldBeNull();
        }

        [Fact]
        public void GetValue_should_not_throw_exception_when_try_to_convert_value_from_ModelState()
        {
            result = new ValueProviderResult("11/22/2000", "11/22/2000", new CultureInfo("en-US"));
            state = new ModelState();
            state.Value = result;

            viewContext.ViewData.ModelState.Remove("DatePicker1");
            viewContext.ViewData.ModelState.Add("DatePicker1", state);

            System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("de-DE");

            Assert.DoesNotThrow(() => datepicker.GetValue(o => (DateTime?)o));
        }

        [Fact]
        public void GetAttempedValue_should_return_raw_value_of_model_state()
        {
            datepicker.GetAttemptedValue().ShouldEqual("s");
        }

        [Fact]
        public void GetAttempedValue_should_return_null_if_value_is_null()
        {
            state.Value = null;

            datepicker.GetAttemptedValue().ShouldEqual(null);
        }
    }
}
