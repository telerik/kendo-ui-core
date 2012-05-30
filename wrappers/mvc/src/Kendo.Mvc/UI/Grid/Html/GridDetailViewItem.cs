namespace Kendo.Mvc.UI.Html
{
    public class GridDetailViewItem : GridItem
    {
        public GridItem Parent
        {
            get;
            set;
        }

        public override bool Expanded
        {
            get
            {
                return Parent.Expanded;
            }
            set
            {
                Parent.Expanded = value;
            }
        }
    }
}