require 'test/unit'
require 'mocha/setup'

$LOAD_PATH << File.join(File.dirname(__FILE__), '..', 'lib')

require 'component'

class ComponentTests < Test::Unit::TestCase
    def setup
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo', :type => 'Object')
        @component.add_field(:name => 'foo.bar', :type => 'Object')
    end

    def test_add_field_creates_multiple_fields_for_multiple_types
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo', :type => 'String|Object')

        assert_equal 2, @component.fields.size
        assert_equal 'String', @component.fields[0].type
        assert_equal 'Object', @component.fields[1].type
    end

    def test_add_field_adds_field_only_if_type_is_specified
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo')

        assert_equal 0, @component.fields.size
    end

    def test_add_field_ignores_type_in_name
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo.type=bar.baz', :type => 'String')

        assert_equal 'foo.baz', @component.fields[0].name
    end

    def test_add_field_trims_name
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => '  foo  ', :type => 'String|Object')

        assert_equal 'foo', @component.fields[0].name
    end

    def test_add_field_trims_type
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => '  foo  ', :type => ' String |Object')

        assert_equal 'String', @component.fields[0].type
    end

    def test_promote_removes_nested_fields
        @component.promote_members

        assert_equal 1, @component.fields.size
    end

    def test_promote_creates_nested_components
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo', :type => 'Object')
        @component.add_field(:name => 'foo.bar', :type => 'Object')
        @component.add_field(:name => 'foo.bar.baz', :type => 'Object')

        @component.promote_members

        assert_equal true, @component.fields[0].fields[0].instance_of?(Component)
    end

    def test_promote_creates_components
        @component.promote_members

        assert_equal true, @component.fields[0].instance_of?(Component)
    end

    def test_promote_adds_fields_to_child_component
        @component.promote_members

        component = @component.fields[0]

        assert_equal 'bar', component.fields[0].name
    end

    def test_promote_adds_events_to_child_component
        @component.add_event(:name => 'foo.baz')

        @component.promote_members

        component = @component.fields[0]

        assert_equal 'baz', component.events[0].name
    end

    def test_accept_calls_component
        @component = Component.new(:name => 'foo')

        visitor = stub(:component)
        visitor.expects(:component).with(@component)

        @component.accept(visitor)
    end

    def test_accept_calls_field
        @component = Component.new(:name => 'foo')
        @component.add_field(:name => 'foo', :type => 'String')

        visitor = stub(:field, :component)

        visitor.expects(:component)
        visitor.expects(:field).with(@component.fields[0])

        @component.accept(visitor)
    end

    def test_accept_calls_event
        @component = Component.new(:name => 'foo')
        @component.add_event(:name => 'foo')

        visitor = stub(:event, :component)

        visitor.expects(:component)
        visitor.expects(:event).with(@component.events[0])

        @component.accept(visitor)
    end
end
