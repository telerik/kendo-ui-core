namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;
    using System.Web.Mvc;

    public class DropDownListBuilderTests
    {
        private readonly DropDownList dropDownList;
        private readonly DropDownListBuilder builder;

        public DropDownListBuilderTests()
        {
            dropDownList = DropDownListTestHelper.CreateDropDownList();
            builder = new DropDownListBuilder(dropDownList);
        }

        [Fact]
        public void Items_call_SelectListItemFactory_to_add_item()
        {
            builder.Items(c => c.Add());

            Assert.Equal(1, dropDownList.Items.Count);
        }

        [Fact]
        public void Items_should_return_builder()
        {
            var returnedBuilder = builder.Items(c => c.Add());

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_for_DropDownItem_IEnumerable_should_create_two_items()
        {
            List<DropDownItem> list = new List<DropDownItem>
                                    {
                                        new DropDownItem{Text="", Value=""},
                                        new DropDownItem{Text="", Value=""}
                                    };

            builder.BindTo(list);

            Assert.Equal(2, dropDownList.Items.Count);
        }

        [Fact]
        public void BindTo_for_DropDownItem_IEnumerable_should_return_builder()
        {
            var returnedBuilder = builder.BindTo(new List<DropDownItem>());

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_for_SelectListItem_IEnumerable_should_create_two_items()
        {
            List<SelectListItem> list = new List<SelectListItem>
                                    {
                                        new SelectListItem{Text="", Value=""},
                                        new SelectListItem{Text="", Value=""}
                                    };

            builder.BindTo(list);

            Assert.Equal(2, dropDownList.Items.Count);
        }

        [Fact]
        public void BindTo_for_SelectListItem_IEnumerable_should_return_builder()
        {
            var returnedBuilder = builder.BindTo(new List<DropDownItem>());

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void DataBinding_should_enable_Ajax() 
        {
            builder.DataBinding(c => c.Ajax());

            Assert.True(dropDownList.DataBinding.Ajax.Enabled);
        }

        [Fact]
        public void ClientEvents_should_set_events()
        {
            Action<DropDownClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(dropDownList.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<DropDownClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_selected_item_index()
        {
            builder.SelectedIndex(1);

            Assert.Equal(1, dropDownList.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_return_builder()
        {
            var returnedBuilder = builder.SelectedIndex(0);

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedValue_should_set_selected_item_value()
        {
            builder.Value("1");

            Assert.Equal("1", dropDownList.Value);
        }

        [Fact]
        public void SelectedValue_should_return_builder()
        {
            var returnedBuilder = builder.Value("0");

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void DropDownHtmlAttributes_be_able_to_set_dropdown_html_attributes()
        {
            builder.DropDownHtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", dropDownList.DropDownHtmlAttributes["class"]);
        }


        [Fact]
        public void DropDownHtmlAttributes_should_return_builder()
        {
            var returnedBuilder = builder.DropDownHtmlAttributes(new { });

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
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

            Assert.False(dropDownList.Encoded);
        }


        [Fact]
        public void Encoded_method_should_return_builder()
        {
            var returnedBuilder = builder.Encode(true);

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
        }

        [Fact]
        public void Delay_method_be_able_to_set_Delay_property()
        {
            int delay = 700;
            builder.Delay(delay);

            dropDownList.Delay.ShouldEqual(delay);
        }

        [Fact]
        public void Delay_method_should_return_builder()
        {
            var returnedBuilder = builder.Delay(700);

            Assert.IsType(typeof(DropDownListBuilder), returnedBuilder);
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

            Assert.True(dropDownList.HiddenInputHtmlAttributes.TryGetValue("required", out value));
            Assert.Equal("true", value);
        }
    }
}