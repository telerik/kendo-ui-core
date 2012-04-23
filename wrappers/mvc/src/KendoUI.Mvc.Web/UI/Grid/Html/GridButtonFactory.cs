// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    public class GridButtonFactory
    {
        public T CreateButton<T>(GridButtonType type) 
            where T : IGridButtonBuilder, new()
        {
            var button = new T();
			button.CssClass = DetermineCssClass(type);
            
            Decorate(button, type);

            return button;
        }

		private string DetermineCssClass(GridButtonType buttonType)
		{
			string buttonTypeCssClass = "";
			
            switch (buttonType)
			{
				case GridButtonType.Image:
					{
						buttonTypeCssClass = UIPrimitives.ButtonIcon;
					}
					break;
				case GridButtonType.ImageAndText:
					{
						buttonTypeCssClass = UIPrimitives.ButtonIconText;
					}
					break;
				case GridButtonType.BareImage:
					{
						buttonTypeCssClass = string.Format("{0} {1}", UIPrimitives.ButtonIcon, UIPrimitives.ButtonBare);
					}
					break;
				default:
					return UIPrimitives.Button;
			}
			
            return string.Format("{0} {1}", UIPrimitives.Button, buttonTypeCssClass);
		}

        private void Decorate(IGridButtonBuilder button, GridButtonType type)
        {
			if (type == GridButtonType.Image || type == GridButtonType.BareImage || type == GridButtonType.ImageAndText)
            {
                button.Decorators.Add(new GridButtonImageDecorator(button));
            }

			if (type != GridButtonType.Image && type != GridButtonType.BareImage)
            {
                button.Decorators.Add(new GridButtonTextDecorator(button));
            }
        }
    }
}
