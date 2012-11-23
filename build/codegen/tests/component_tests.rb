require 'test/unit'

$LOAD_PATH << File.join(File.dirname(__FILE__), '..', 'lib')

require 'component'

class ComponentTests < Test::Unit::TestCase
    def setup
        @component = Component.new(:name => 'foo')

        @component.add_field(:name => 'foo', :type => 'Object')
        @component.add_field(:name => 'foo.bar', :type => 'String')
    end

    def test_promote_removes_nested_fields
        @component.promote

        assert_equal 1, @component.fields.size
    end

    def test_promote_creates_components
        @component.promote

        assert_equal true, @component.fields[0].instance_of?(Component)
    end
end
