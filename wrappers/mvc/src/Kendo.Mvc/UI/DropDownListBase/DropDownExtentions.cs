namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Collections.Generic;

    internal static class DropDownExtentions
    {
        internal static string SelectedValue(this IEnumerable<DropDownListItem> source)
        {
            var selectListItem = source.Where(item => item.Selected == true).FirstOrDefault();

            if (selectListItem != null)
            {
                return selectListItem.Value ?? selectListItem.Text;
            }

            return null;
        }
    }
}
