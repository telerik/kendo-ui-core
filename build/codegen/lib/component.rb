require 'string'
require 'method'
require 'composite_option'
require 'array_option'
require 'option'
require 'event'

module CodeGen
    TYPES = ['Object',
             'Date',
             'Array',
             'String',
             'Number',
             'Boolean',
             'Function']

    class Component
        include Options

<<<<<<< HEAD
        attr_reader :name, :options, :events, :methods
=======
        attr_reader :name, :options, :events
>>>>>>> Add generate:java task

        def initialize(settings)
            @name = settings[:name].split('.').last
            @options = []
            @events = []
<<<<<<< HEAD
            @methods = []
        end

<<<<<<< HEAD
        def method_class
            Method
        end
=======
    end

    def composite_options
        @options.find_all { |option| option.composite? }.sort {|a, b| a.name <=> b.name }
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

    def add_option(settings)
        name = settings[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')
=======
        end

        def import(metadata)
            metadata[:options].each do |option|
>>>>>>> Add generate:java task

                @options.delete_if { |o| o.name == option[:name] }

                add_option(option)

<<<<<<< HEAD
        types = settings[:type]

        return unless types

        type = types.split('|').map { |type| type.strip }.find_all { |t| TYPES.include?(t) }

        return if type.empty?

        parents = @options.find_all { |option| name.start_with?(option.name + '.') && (option.type.include?('Object') || option.type.include?('Array')) }
>>>>>>> Refactor tld generation.

        def import(metadata)
            metadata[:options].each do |option|

                @options.delete_if { |o| o.name == option[:name] }

                add_option(option)

            end
        end

        def add_method(settings)
            settings[:owner] = self

            method = method_class.new(settings)

            @methods.push(method)

            method
=======
            end
>>>>>>> Add generate:java task
        end

        def add_event(settings)
            settings[:owner] = self

            @events.push event_class.new(settings)
        end
    end

end #module CodeGen
