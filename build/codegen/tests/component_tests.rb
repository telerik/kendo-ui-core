require 'test/unit'

$LOAD_PATH << File.join(File.dirname(__FILE__), '..', 'lib')

require 'component'

class ComponentTests < Test::Unit::TestCase
    def setup
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => 'foo', :type => 'Object')
        @component.add_option(:name => 'foo.bar', :type => 'Object')
    end

    def test_add_option_creates_multiple_options_for_multiple_types
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => 'foo', :type => 'String|Object')

        assert_equal 2, @component.configuration.size
        assert_equal 'String', @component.configuration[0].type
        assert_equal 'Object', @component.configuration[1].type
    end

    def test_add_option_adds_option_only_if_type_is_specified
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => 'foo')

        assert_equal 0, @component.configuration.size
    end

    def test_add_option_ignores_type_in_name
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => 'foo.type=bar.baz', :type => 'String')

        assert_equal 'foo.baz', @component.configuration[0].name
    end

    def test_add_option_trims_name
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => '  foo  ', :type => 'String|Object')

        assert_equal 'foo', @component.configuration[0].name
    end

    def test_add_option_trims_type
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => '  foo  ', :type => ' String |Object')

        assert_equal 'String', @component.configuration[0].type
    end

    def test_promote_removes_nested_options
        @component.promote_members

        assert_equal 1, @component.configuration.size
    end

    def test_promote_creates_nested_components
        @component = CodeGen::Component.new(:name => 'foo')

        @component.add_option(:name => 'foo', :type => 'Object')
        @component.add_option(:name => 'foo.bar', :type => 'Object')
        @component.add_option(:name => 'foo.bar.baz', :type => 'Object')

        @component.promote_members

        assert_equal true, @component.configuration[0].configuration[0].instance_of?(CodeGen::Component)
    end

    def test_promote_creates_components
        @component.promote_members

        assert_equal true, @component.configuration[0].instance_of?(CodeGen::Component)
    end

    def test_promote_adds_options_to_child_component
        @component.promote_members

        component = @component.configuration[0]

        assert_equal 'bar', component.configuration[0].name
    end
end
