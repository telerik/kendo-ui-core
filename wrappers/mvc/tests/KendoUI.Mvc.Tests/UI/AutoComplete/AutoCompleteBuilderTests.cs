namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;
    
    using System.Linq;

    public class AutoCompleteBuilderTests
    {
        private readonly AutoComplete AutoComplete;
        private readonly AutoCompleteBuilder builder;

        public AutoCompleteBuilderTests()
        {
            AutoComplete = AutoCompleteTestHelper.CreateAutocomplete();
            builder = new AutoCompleteBuilder(AutoComplete);
        }

        [Fact]
        public void BindTo_should_set_list_of_items() 
        {
            var items = new List<string> { "1", "2", "3"};

            builder.BindTo(items);

            Assert.True(items.SequenceEqual(AutoComplete.Items));
        }

        [Fact]
        public void DataBinding_should_enable_Ajax()
        {
            builder.DataBinding(c => c.Ajax());

            Assert.True(AutoComplete.DataBinding.Ajax.Enabled);
        }

        [Fact]
        public void Filterable_with_params_should_enable_allow_setting_filter_type()
        {
            Action<AutoCompleteFilterSettingsBuilder> action = (filtering) => filtering
                                                                                .FilterMode(AutoCompleteFilterMode.Contains);

            builder.Filterable(action);

            Assert.Equal(AutoCompleteFilterMode.Contains, AutoComplete.Filtering.FilterMode);
        }

        [Fact]
        public void Filterable_with_params_should_return_builder()
        {
             Action<AutoCompleteFilterSettingsBuilder> action = (filtering) => {};

            var returnedBuilder = builder.Filterable(action);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void Multiple_should_enable_selecting_multiple_values()
        {
            builder.Multiple();

            Assert.True(AutoComplete.Multiple.Enabled);
        }

        [Fact]
        public void Multiple_should_return_builder()
        {
            var returnedBuilder = builder.Multiple();

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void Multiple_with_params_should_enable_and_allow_setting_separator()
        {
            Action<AutoCompleteMultipleValuesSettingsBuilder> action = (multi) => multi.Enabled(true)
                                                                                       .Separator(" ");

            builder.Multiple(action);

            Assert.True(AutoComplete.Multiple.Enabled);
            Assert.Equal(" ", AutoComplete.Multiple.Separator);
        }

        [Fact]
        public void Multiple_with_params_should_return_builder()
        {
            Action<AutoCompleteMultipleValuesSettingsBuilder> action = (multi) => { };

            var returnedBuilder = builder.Multiple(action);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void AutoFill_should_enable_auto_complete_of_first_matched_item()
        {
            builder.AutoFill(true);

            Assert.True(AutoComplete.AutoFill);
        }

        [Fact]
        public void AutoFill_should_return_builder()
        {
            var returnedBuilder = builder.AutoFill(true);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightFirstMatch_should_enable_highlighting_of_first_matched_item()
        {
            builder.HighlightFirstMatch(true);

            Assert.True(AutoComplete.HighlightFirstMatch);
        }

        [Fact]
        public void HighlightFirstMatch_should_return_builder()
        {
            var returnedBuilder = builder.HighlightFirstMatch(true);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events()
        {
            Action<DropDownClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(AutoComplete.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<DropDownClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void DropDownHtmlAttributes_be_able_to_set_dropdown_html_attributes()
        {
            builder.DropDownHtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", AutoComplete.DropDownHtmlAttributes["class"]);
        }


        [Fact]
        public void DropDownHtmlAttributes_should_return_builder()
        {
            var returnedBuilder = builder.DropDownHtmlAttributes(new { });

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void Effects_creates_fx_factory()
        {
            var fxFacCreated = false;

            builder.Effects(fx =>
            {
                fxFacCreated = fx != null;
            });

            Assert.True(fxFacCreated);
        }

        [Fact]
        public void Encoded_method_be_able_to_set_Encoded_property()
        {
            builder.Encode(false);

            Assert.False(AutoComplete.Encoded);
        }

        [Fact]
        public void Encoded_method_should_return_builder()
        {
            var returnedBuilder = builder.Encode(true);

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }

        [Fact]
        public void Value_method_should_set_Value_property()
        {
            builder.Value("test");

            AutoComplete.Value.ShouldEqual("test");
        }

        [Fact]
        public void Value_method_should_return_builder()
        {
            var returnedBuilder = builder.Value("test");

            Assert.IsType(typeof(AutoCompleteBuilder), returnedBuilder);
        }
    }
}