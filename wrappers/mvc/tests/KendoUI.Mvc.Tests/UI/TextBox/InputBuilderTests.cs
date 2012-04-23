namespace Telerik.Web.Mvc.UI.Tests
{

    using System;
    using Xunit;

    public class InputBuilderTests
    {
        private readonly TextBoxBase<int> input;
        private readonly TextBoxBaseBuilderTestDouble builder;

        public InputBuilderTests()
        {
            input = TextBoxBaseTestHelper.CreateInput<int>(null, null);
            builder = new TextBoxBaseBuilderTestDouble(input);
        }

        [Fact]
        public void Value_should_set_Value_property_of_integerInput()
        {
            const int value = 10;
            builder.Value(value);

            Assert.Equal(value, input.Value);
        }


        [Fact]
        public void Value_should_return_builder()
        {
            const int value = 10;
            var returnedBuilder = builder.Value(value);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void MinValue_should_set_MinValue_property_of_integerInput()
        {
            const int minValue = 1;
            builder.MinValue(minValue);

            Assert.Equal(minValue, input.MinValue);
        }


        [Fact]
        public void MinValue_should_return_builder()
        {
            const int minValue = 1;
            var returnedBuilder = builder.MinValue(minValue);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void MaxValue_should_set_MaxValue_property_of_integerInput()
        {
            const int maxValue = 100;
            builder.MaxValue(maxValue);

            Assert.Equal(maxValue, input.MaxValue);
        }

        [Fact]
        public void MaxValue_should_return_builder()
        {
            const int maxValue = 1;
            var returnedBuilder = builder.MaxValue(maxValue);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void Spinner_should_set_Spinner_property_of_integerInput()
        {
            const bool allowSpinner = true;
            builder.Spinners(allowSpinner);

            Assert.Equal(allowSpinner, input.Spinners);
        }

        [Fact]
        public void Spinner_should_return_builder()
        {
            const bool allowSpinner = true;
            var returnedBuilder = builder.Spinners(allowSpinner);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void IncrementStep_should_set_IncrementStep_property_of_integerInput()
        {
            const int incrementStep = 1;
            builder.IncrementStep(incrementStep);

            Assert.Equal(incrementStep, input.IncrementStep);
        }

        [Fact]
        public void IncrementStep_should_return_builder()
        {
            const int incrementStep = 1;
            var returnedBuilder = builder.IncrementStep(incrementStep);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }


        [Fact]
        public void UpButtonTitle_should_set_UpButtonTitle_property_of_input()
        {
            const string upButtonTitle = "Up";
            builder.ButtonTitleUp(upButtonTitle);

            Assert.Equal(upButtonTitle, input.ButtonTitleUp);
        }

        [Fact]
        public void UpButtonTitle_should_return_builder()
        {
            const string upButtonTitle = "Up";
            var returnedBuilder = builder.ButtonTitleUp(upButtonTitle);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void DownButtonTitle_should_set_DownButtonTitle_property_of_input()
        {
            const string downButtonTitle = "Down";
            builder.ButtonTitleDown(downButtonTitle);

            Assert.Equal(downButtonTitle, input.ButtonTitleDown);
        }

        [Fact]
        public void DownButtonTitle_should_return_builder()
        {
            const string downButtonTitle = "down";
            var returnedBuilder = builder.ButtonTitleDown(downButtonTitle);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events_of_the_datepicker()
        {
            Action<TextBoxBaseClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(input.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<TextBoxBaseClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void NumberGroupSize_should_set_NumberGroupSize_property_of_NumericTextBox()
        {
            const int numberGroupSize = 10;
            builder.NumberGroupSize(numberGroupSize);

            Assert.Equal(numberGroupSize, input.NumberGroupSize);
        }

        [Fact]
        public void NumberGroupSize_should_return_builder()
        {
            const int decimalGroupSize = 1;
            var returnedBuilder = builder.NumberGroupSize(decimalGroupSize);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void NumberGroupSeparator_should_set_NumberGroupSeparator_property_of_NumericTextBox()
        {
            const string groupSeparator = ".";
            builder.NumberGroupSeparator(groupSeparator);

            Assert.Equal(groupSeparator, input.NumberGroupSeparator);
        }

        [Fact]
        public void NumberGroupSeparator_should_set_NumberGroupSeparator_property_to_empty_string()
        {
            const string groupSeparator = "";
            builder.NumberGroupSeparator(groupSeparator);

            Assert.Equal(groupSeparator, input.NumberGroupSeparator);
        }

        [Fact]
        public void NumberGroupSeparator_should_return_builder()
        {
            const string decimalGroupSeparator = ",";
            var returnedBuilder = builder.NumberGroupSeparator(decimalGroupSeparator);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void NegativePatternIndex_should_set_NegativePatternIndex_property_of_NumericTextBox()
        {
            const int negativePattern = 1;
            builder.NegativePatternIndex(negativePattern);

            Assert.Equal(negativePattern, input.NegativePatternIndex);
        }

        [Fact]
        public void NegativePatternIndex_should_return_builder()
        {
            const int negativePattern = 1;
            var returnedBuilder = builder.NegativePatternIndex(negativePattern);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void WaterMarkText_should_set_WaterMarkText_property_of_NumericTextBox()
        {
            const string waterMarkText = "Enter value";
            builder.EmptyMessage(waterMarkText);

            Assert.Equal(waterMarkText, input.EmptyMessage);
        }

        [Fact]
        public void WaterMarkText_should_return_builder()
        {
            const string waterMarkText = "Enter value";
            var returnedBuilder = builder.EmptyMessage(waterMarkText);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void InputHtmlAttributes_should_set_InputHtmlAttributes_property_of_datePicker()
        {
            var attributes = new { @class = "t-test" };

            builder.InputHtmlAttributes(attributes);

            Assert.Equal("t-test", input.InputHtmlAttributes["class"]);
        }

        [Fact]
        public void InputHtmlAttributes_should_return_builder()
        {
            var attributes = new { @class = "t-test" };
            var returnedBuilder = builder.InputHtmlAttributes(attributes);

            Assert.IsType(typeof(TextBoxBaseBuilderTestDouble), returnedBuilder);
        }
     }

    public class TextBoxBaseBuilderTestDouble : TextBoxBuilderBase<int, TextBoxBase<int>, TextBoxBaseBuilderTestDouble>
    {
        public TextBoxBaseBuilderTestDouble(TextBoxBase<int> component)
            : base(component)
        {
        }
    }
}
