module CodeGen::PHP

    module Options
        def component_class
            Component
        end

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def event_class
            Event
        end

        def array_option_class
            ArrayOption
        end
    end

COMPOSITE_OPTION_SETTER = ERB.new(%{
    public function set<%= name.pascalize %>(\\<%= php_namespace %>\\<%= php_class %> $value) {
        $this->setProperty('<%= name %>', $value);

        return $this;
    }
})

COMPOSITE_OPTION_PROPERTIES = ERB.new(%{//>> Properties
<%= options.map { |option| option.to_setter }.join %>
//<< Properties})

    COMPOSITE_OPTION = ERB.new(File.read("build/codegen/lib/php/composite_option.php.erb"), 0, '%<>')

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def to_setter
            COMPOSITE_OPTION_SETTER.result(binding)
        end


        def php_namespace
            return @owner.php_namespace if @owner.instance_of?(component_class)

            @owner.php_namespace
        end

        def php_class
            @owner.php_class + @name.pascalize
        end

        def path
            php_namespace.gsub('\\', '/')
        end

        def to_php(filename)
            php = File.exists?(filename) ? File.read(filename) : COMPOSITE_OPTION.result(binding)

            php.sub(/\/\/>> Properties(.|\n)*\/\/<< Properties/, COMPOSITE_OPTION_PROPERTIES.result(binding))
        end
    end

DATA_SOURCE_SETTER = %{
    public function setDataSource(\\kendo\\data\\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }
}

OPTION_SETTER = ERB.new(%{
    public function set<%= name.pascalize %>($value) {
        $this->setProperty('<%= name %>', $value);

        return $this;
    }
})

    class Option < CodeGen::Option
        include Options

        def to_setter
            return DATA_SOURCE_SETTER if @name == 'dataSource'

            OPTION_SETTER.result(binding)
        end
    end

EVENT_SETTER = ERB.new(%{
    public function set<%= name.pascalize %>($value) {
        $this->setProperty('<%= name %>', new \\kendo\\JavaScriptFunction($value));

        return $this;
    }
})

    class Event < CodeGen::Event
        include Options

        def to_setter
            EVENT_SETTER.result(binding)
        end
    end

ARRAY_SETTER = ERB.new(%{
    public function add<%= item.name.pascalize %>(\\<%= php_namespace %>\\<%= item.php_class %> $value) {
        $values = $this->getProperty('<%= name %>');

        if ($values == null) {
            $values = array();
            $this->setProperty('<%= name %>', $values);
        }

        $values[] = $value;

        return $this;
    }
})

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_setter
            ARRAY_SETTER.result(binding)
        end
    end

    class ArrayItem < CompositeOption
        def php_class
            super.sub(@owner.name.pascalize, '')
        end
    end

    COMPONENT = ERB.new(File.read("build/codegen/lib/php/component.php.erb"), 0, '%<>')

COMPONENT_PROPERTIES = ERB.new(%{//>> Properties
<%= options.map { |option| option.to_setter }.join %><%= events.map { |events| events.to_setter }.join %>
//<< Properties})

    class Component < CodeGen::Component
        include Options

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def php_base_class
            return '\\kendo\\SerializableObject' if @name == 'DataSource'

            '\\kendo\\ui\\Widget'
        end

        def path
            namespace.gsub('.', '/')
        end

        def php_class
            @name
        end

        def php_namespace
            namespace.gsub('.', '\\');
        end

        def to_php(filename)
            php = File.exists?(filename) ? File.read(filename) : COMPONENT.result(binding)

            php.sub(/\/\/>> Properties(.|\n)*\/\/<< Properties/, COMPONENT_PROPERTIES.result(binding))
        end
    end


    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            write_php(component)

            composite_options(component.composite_options)
        end

        def write_php(component)
            filename = "#{@path}/#{component.path}/#{component.php_class}.php"

            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, component.to_php(filename))
        end

        def composite_options(options)
            options.each do |option|

                write_php(option) unless option.instance_of?(ArrayOption)

                composite_options(option.composite_options)

            end

        end
    end
end
