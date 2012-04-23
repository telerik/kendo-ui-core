namespace Telerik.Web.Mvc.Tests.Menu
{
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class MenuSerializationTests
	{
		private readonly Menu menu;
		private Mock<TextWriter> textWriter;
		private string output;

		public MenuSerializationTests()
		{
			Mock<HtmlTextWriter> htmlWriter = new Mock<HtmlTextWriter>(TextWriter.Null);

			textWriter = new Mock<TextWriter>();
			textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

			menu = MenuTestHelper.CreateMenu(htmlWriter.Object, null);
			menu.Name = "myMenu";
		}

		[Fact]
		public void Default_configuration_outputs_only_tMenu_init()
		{
			menu.WriteInitializationScript(textWriter.Object);

			Assert.Equal("jQuery('#myMenu').tMenu();", output);
		}

		[Fact]
		public void Vertical_menu_should_serialize_orientation()
		{
			menu.Orientation = MenuOrientation.Vertical;

			menu.WriteInitializationScript(textWriter.Object);

			Assert.Equal("jQuery('#myMenu').tMenu({orientation:'vertical'});", output);
		}

        [Fact]
        public void Menu_with_non_default_effects_should_serialize_them()
        {
            menu.Effects.Container.Clear();
            menu.Effects.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));

            menu.Effects.OpenDuration = 100;
            menu.Effects.CloseDuration = 200;

            menu.WriteInitializationScript(textWriter.Object);

            Assert.Equal("jQuery('#myMenu').tMenu({effects:{list:[{name:'property',properties:['opacity']}],openDuration:100,closeDuration:200}});", output);
        }

        [Fact]
        public void Menu_serializes_multiple_effects_correctly()
        {
            menu.Effects.Container.Clear();
            menu.Effects.Container.Add(new SlideAnimation());
            menu.Effects.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));
            menu.Effects.Container.Add(new ToggleEffect());

            menu.Effects.OpenDuration = 200;
            menu.Effects.CloseDuration = 200;

            menu.WriteInitializationScript(textWriter.Object);

            Assert.Equal("jQuery('#myMenu').tMenu(" +
                            "{effects:{list:[" +
                                "{name:'slide'}," +
                                "{name:'toggle'}," +
                                "{name:'property',properties:['opacity']}]," +
                                "openDuration:200,closeDuration:200" +
                            "}});", output);
        }

        [Fact]
        public void Menu_serializes_multiple_property_animations_correctly()
        {
            menu.Effects.Container.Clear();
            menu.Effects.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));
            menu.Effects.Container.Add(new PropertyAnimation(PropertyAnimationType.Height));

            menu.Effects.OpenDuration = 200;
            menu.Effects.CloseDuration = 200;

            menu.WriteInitializationScript(textWriter.Object);

            Assert.Equal("jQuery('#myMenu').tMenu(" +
                            "{effects:{list:[" +
                                "{name:'property',properties:['opacity','height']}],openDuration:200,closeDuration:200" +
                            "}});", output);
        }

        [Fact]
        public void Menu_with_openOnClick_serializes_correctly()
        {
            menu.OpenOnClick = true;

            menu.WriteInitializationScript(textWriter.Object);

            Assert.Equal("jQuery('#myMenu').tMenu({openOnClick:true});", output);
        }
	}
}
