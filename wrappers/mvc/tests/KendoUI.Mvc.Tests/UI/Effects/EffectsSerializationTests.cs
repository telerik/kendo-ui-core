
namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using Moq;
    using Xunit;



    public class EffectsSerializationTests
    {
        private const string Id = "myId";
        private const string Type = "myObject";

        private readonly Mock<TextWriter> _writer;
        private readonly ClientSideObjectWriter _objectWriter;

        public EffectsSerializationTests()
        {
            _writer = new Mock<TextWriter>();
            _objectWriter = new ClientSideObjectWriter(Id, Type, _writer.Object);
        }

        [Fact]
        public void AnimationExtention_should_serialize_toggle_effect()
        {
            Effects effect = new Effects();
            effect.Container.Add(new ToggleEffect());

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'toggle'}],openDuration:200,closeDuration:200}"));
        }

        [Fact]
        public void AnimationExtention_should_serialize_slide_animation()
        {
            Effects effect = new Effects();
            effect.Container.Add(new SlideAnimation());

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'slide'}],openDuration:200,closeDuration:200}"));
        }

        [Fact]
        public void AnimationExtention_should_serialize_property_opacity_animation()
        {
            Effects effect = new Effects();
            effect.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'property',properties:['opacity']}],openDuration:200,closeDuration:200}"));
        }

        [Fact]
        public void AnimationExtention_should_serialize_property_height_animation()
        {
            Effects effect = new Effects();
            effect.Container.Add(new PropertyAnimation(PropertyAnimationType.Height));

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'property',properties:['height']}],openDuration:200,closeDuration:200}"));
        }

        [Fact]
        public void AnimationExtention_should_serialize_toggle_and_opacity_effect()
        {
            Effects effect = new Effects();
            effect.Container.Add(new ToggleEffect());
            effect.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'toggle'},{name:'property',properties:['opacity']}],openDuration:200,closeDuration:200}"));
        }

        [Fact]
        public void AnimationExtention_should_serialize_toggle_height_and_opacity_effect()
        {
            Effects effect = new Effects();
            effect.Container.Add(new ToggleEffect());
            effect.Container.Add(new PropertyAnimation(PropertyAnimationType.Height));
            effect.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));

            _writer.Setup(w => w.Write(It.IsAny<string>())).Verifiable();

            _objectWriter.Start().Serialize("effects", effect);

            _writer.Verify(w => w.Write("effects:{list:[{name:'toggle'},{name:'property',properties:['height','opacity']}],openDuration:200,closeDuration:200}"));
        }
    }
}
