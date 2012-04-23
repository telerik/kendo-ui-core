namespace Telerik.Web.Mvc.UI.Tests.UI
{
    using Xunit;

    using System.Linq;

    public class DropDownExtensionsTests
    {
        private readonly DropDownList dropdownlist;

        public DropDownExtensionsTests()
        {
            dropdownlist = DropDownListTestHelper.CreateDropDownList();
            dropdownlist.Name = "dropdownlist";

            dropdownlist.Items.Add(new DropDownItem { Text = "item1", Value = "item1" });
            dropdownlist.Items.Add(new DropDownItem { Text = "item2", Value = "item2" });
            dropdownlist.Items.Add(new DropDownItem { Text = "item3", Value = "item3" });
            dropdownlist.Items.Add(new DropDownItem { Text = "item4", Value = "item4" });
        }

        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_select_item_if_value_is_defined()
        {
            dropdownlist.Value = "item1";
            dropdownlist.SelectedIndex = 3;

            dropdownlist.Items[0].Selected = true;
            dropdownlist.Items[2].Selected = true;

            dropdownlist.SyncSelectedIndex();

            Assert.Equal(true, dropdownlist.Items[0].Selected);
            Assert.Equal(0, dropdownlist.SelectedIndex);
        }

        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_preserve_last_selected_item_even_selectedIndex_is_set()
        {
            dropdownlist.SelectedIndex = 3;

            dropdownlist.Items[0].Selected = true;
            dropdownlist.Items[2].Selected = true;

            dropdownlist.SyncSelectedIndex();

            Assert.Equal(true, dropdownlist.Items[2].Selected);
            Assert.Equal(2, dropdownlist.SelectedIndex);
        }

        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_select_item_if_selectedIndex_is_set()
        {
            dropdownlist.SelectedIndex = 3;

            dropdownlist.SyncSelectedIndex();

            Assert.Equal(true, dropdownlist.Items[3].Selected);
        }        
        
        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_select_second_item_if_SelectedValue_is_empty_string_and_GetValueFromViewDataByName_returns_value()
        {
            var value = "item2";
            dropdownlist.Name = "DDL";
            dropdownlist.ViewContext.ViewData["DDL"] = value;
            dropdownlist.Value = null;

            dropdownlist.SyncSelectedIndex();

            Assert.Equal(true, dropdownlist.Items[1].Selected);
        }
        
        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_select_first_item_if_no_selected_items()
        {
            dropdownlist.SyncSelectedIndex();

            Assert.Equal(true, dropdownlist.Items[0].Selected);
        }

        [Fact]
        public void PrepareItemsAndDefineSelectedIndex_should_not_select_any_item_if_no_selectedItems_and_component_is_comboBox()
        {
            var combobox = ComboBoxTestHelper.CreateComboBox();

            combobox.Name = "Combo";

            combobox.Items.Add(new DropDownItem { Text = "item1", Value = "item1" });
            combobox.Items.Add(new DropDownItem { Text = "item2", Value = "item2" });
            combobox.Items.Add(new DropDownItem { Text = "item3", Value = "item3" });
            combobox.Items.Add(new DropDownItem { Text = "item4", Value = "item4" });

            combobox.SyncSelectedIndex();

            Assert.Equal(0, combobox.Items.Where(i => i.Selected == true).Count());
        }
    }
}
