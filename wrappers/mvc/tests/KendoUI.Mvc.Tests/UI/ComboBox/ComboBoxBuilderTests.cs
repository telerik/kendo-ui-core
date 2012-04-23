namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;
    using System.Web.Mvc;

    public class ComboBoxBuilderTests
    {
        private readonly ComboBox combobox;
        private readonly ComboBoxBuilder builder;

        public ComboBoxBuilderTests()
        {
            combobox = ComboBoxTestHelper.CreateComboBox();
            builder = new ComboBoxBuilder(combobox);
        }

        [Fact]
        public void Filterable_should_enable_filtering()
        {
            builder.Filterable();

            Assert.True(combobox.Filtering.Enabled);
        }

        [Fact]
        public void Filterable_should_return_builder()
        {
            var returnedBuilder = builder.Filterable();

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void Filterable_with_params_should_enable_filtering()
        {
            Action<ComboBoxFilterSettingsBuilder> action = (filtering) => filtering.FilterMode(AutoCompleteFilterMode.Contains);
            
            builder.Filterable(action);

            Assert.True(combobox.Filtering.Enabled);
        }

        [Fact]
        public void Filterable_with_params_should_set_filter_type()
        {
            Action<ComboBoxFilterSettingsBuilder> action = (filtering) => filtering.Enabled(true)
                                                                                .FilterMode(AutoCompleteFilterMode.Contains);
            builder.Filterable(action);

            Assert.Equal(AutoCompleteFilterMode.Contains, combobox.Filtering.FilterMode);
        }

        [Fact]
        public void Filterable_with_params_should_return_builder()
        {
            Action<ComboBoxFilterSettingsBuilder> action = (filtering) => { };

            var returnedBuilder = builder.Filterable(action);

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void AutoFill_should_enable_auto_complete_of_first_matched_item()
        {
            builder.AutoFill(true);

            Assert.True(combobox.AutoFill);
        }

        [Fact]
        public void AutoFill_should_return_builder()
        {
            var returnedBuilder = builder.AutoFill(true);

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightFirstMatch_should_enable_highlighting_of_first_matched_item()
        {
            builder.HighlightFirstMatch(true);

            Assert.True(combobox.HighlightFirstMatch);
        }

        [Fact]
        public void HighlightFirstMatch_should_return_builder()
        {
            var returnedBuilder = builder.HighlightFirstMatch(true);

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_selected_item_index()
        {
            builder.SelectedIndex(1);

            Assert.Equal(1, combobox.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_allow_setting_Minus_1()
        {
            builder.SelectedIndex(-1);

            Assert.Equal(-1, combobox.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_throw_exception_when_index_is_less_then_minus_1()
        {
            Assert.Throws(typeof(ArgumentOutOfRangeException), () => builder.SelectedIndex(-2));
        }

        [Fact]
        public void SelectedIndex_should_return_builder()
        {
            var returnedBuilder = builder.SelectedIndex(0);

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void Encoded_method_be_able_to_set_Encoded_property()
        {
            builder.Encode(false);

            Assert.False(combobox.Encoded);
        }

        [Fact]
        public void Encoded_method_should_return_builder()
        {
            var returnedBuilder = builder.Encode(true);

            Assert.IsType(typeof(ComboBoxBuilder), returnedBuilder);
        }

        [Fact]
        public void InputHtmlAttributes_should_return_builder()
        {
            builder.InputHtmlAttributes(new { }).ShouldBeSameAs(builder);
            builder.InputHtmlAttributes(new Dictionary<string, object>() { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void InputHtmlAttributes_merges_wight_InputHtmlAttributes_property()
        {
            builder.InputHtmlAttributes(new { required = "true" });

            object value = "";

            Assert.True(combobox.InputHtmlAttributes.TryGetValue("required", out value));
            Assert.Equal("true", value);
        }

        [Fact]
        public void HiddenInputHtmlAttributes_should_return_builder()
        {
            builder.HiddenInputHtmlAttributes(new { }).ShouldBeSameAs(builder);
            builder.HiddenInputHtmlAttributes(new Dictionary<string, object>() { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void HiddenInputHtmlAttributes_merges_wight_InputHtmlAttributes_property()
        {
            builder.HiddenInputHtmlAttributes(new { required = "true" });

            object value = "";

            Assert.True(combobox.HiddenInputHtmlAttributes.TryGetValue("required", out value));
            Assert.Equal("true", value);
        }
    }
}