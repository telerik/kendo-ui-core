// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Linq;
    using Xunit;

    public class GridButtonFactoryTests
    {
        private readonly GridButtonFactory factory;
        
        public GridButtonFactoryTests()
        {
            factory = new GridButtonFactory();
        }

        [Fact]
        public void Should_add_image_decorator_if_button_type_is_image()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Image);
            button.Decorators[0].ShouldBeType<GridButtonImageDecorator>();
        }        
        
        [Fact]
        public void Should_add_image_decorator_if_button_type_is_image_and_text()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.ImageAndText);
            button.Decorators[0].ShouldBeType<GridButtonImageDecorator>();
        }        
        
        [Fact]
        public void Should_not_image_decorator_if_button_type_is_text()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Text);
            button.Decorators.OfType<GridButtonImageDecorator>().Any().ShouldBeFalse();
        }        
        
        [Fact]
        public void Should_add_text_decorator_if_button_type_is_text()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Text);
            button.Decorators[0].ShouldBeType<GridButtonTextDecorator>();
        }        
        
        [Fact]
        public void Should_add_text_decorator_if_button_type_is_text_image()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.ImageAndText);
            button.Decorators[1].ShouldBeType<GridButtonTextDecorator>();
        }
        
        [Fact]
        public void Should_not_add_text_decorator_if_button_type_is_image()
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Image);
            button.Decorators.OfType<GridButtonTextDecorator>().Any().ShouldBeFalse();
        }

        [Fact]
        public void Should_contain_image_and_text_decorator_if_button_type_is_image_and_text() 
        {
            var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.ImageAndText);
            button.Decorators[0].ShouldBeType<GridButtonImageDecorator>();
            button.Decorators[1].ShouldBeType<GridButtonTextDecorator>();
        }

		[Fact]
		public void Should_contain_correct_css_classes_if_button_type_is_text()
		{
			var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Text);

			button.CssClass.ShouldEqual(UIPrimitives.Button);
		}

		[Fact]
		public void Should_contain_correct_css_classes_if_button_type_is_image()
		{
			var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.Image);

			button.CssClass.ShouldEqual(string.Format("{0} {1}", UIPrimitives.Button, UIPrimitives.ButtonIcon));
		}

		[Fact]
		public void Should_contain_correct_css_classes_if_button_type_is_image_and_text()
		{
			var button = factory.CreateButton<GridButtonBuilder>(GridButtonType.ImageAndText);

			button.CssClass.ShouldEqual(string.Format("{0} {1}", UIPrimitives.Button, UIPrimitives.ButtonIconText));
		}
	}
}
