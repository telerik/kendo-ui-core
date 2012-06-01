namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Collections.Generic;

    internal static class DropDownExtentions
    {
        internal static void ValueOfSelectedItem(this DropDownListBase instance, IEnumerable<DropDownListItem> source)
        {
            var selectListItem = source.Where(item => item.Selected == true).FirstOrDefault();

            if (selectListItem != null)
            {
                instance.Value = selectListItem.Value ?? selectListItem.Text;
            }
        }
    }
}
