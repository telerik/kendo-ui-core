namespace Kendo.Mvc.UI
{
    using Extensions;

    using System.Web;
    using System.Linq;
    using System.Collections.Generic;   

    internal static class DropDownExtentions
    {
        //internal static void AddPlaceholderItem(this IDropDown instance)
        //{
        //    if (instance.Placeholder.HasValue())
        //    {
        //        instance.Items.Insert(0, new DropDownItem
        //        {
        //            Text = instance.Placeholder,
        //            Value = string.Empty,
        //            Selected = false
        //        });
        //    }
        //}

        //internal static void SyncSelectedIndex(this IDropDown instance)
        //{
        //    int selectedItemIndex = -1;
        //    IList<DropDownItem> items = instance.Items;
        //    string value = instance.GetValue<string>(instance.Value);

        //    if (value.HasValue())
        //    {
        //        selectedItemIndex = items.IndexOf(items.FirstOrDefault(item => (item.Value ?? item.Text).ToLowerInvariant() == value.ToLowerInvariant()));
        //    }

        //    if (selectedItemIndex == -1)
        //    {
        //        instance.Value = string.Empty;
        //        selectedItemIndex = items.IndexOf(items.LastOrDefault(item => item.Selected == true));
        //    }

        //    if (selectedItemIndex != -1)
        //    {
        //        for (int i = 0, length = instance.Items.Count; i < length; i++)
        //        {
        //            instance.Items[i].Selected = false;
        //        }

        //        instance.Items[selectedItemIndex].Selected = true;
        //        instance.SelectedIndex = selectedItemIndex;
        //    }
        //    else if (instance.SelectedIndex != -1 && instance.SelectedIndex < instance.Items.Count)
        //    {
        //        instance.Items[instance.SelectedIndex].Selected = true;
        //    }
        //    else if (instance is DropDownList)
        //    {
        //        instance.Items[0].Selected = true;
        //        instance.SelectedIndex = 0;
        //    }
        //}

        //internal static void EncodeTextPropertyofItems(this IDropDown instance) 
        //{
        //    foreach (DropDownItem item in instance.Items)
        //    {
        //        item.Text = HttpUtility.HtmlEncode(item.Text);
        //    }
        //}

        //internal static string GetName(this IDropDownRenderable instance, string suffix)
        //{
        //    object value = null;
        //    string name = instance.Name + suffix; 

        //    if (instance.HiddenInputHtmlAttributes.TryGetValue("name", out value) && value != null)
        //    {
        //        name = value.ToString();
        //    }

        //    return name;
        //}
    }
}
