require 'option'
require 'composite_option'
require 'event'

module CodeGen
    TYPES = ['Object', 'Date', 'Array', 'String', 'Number', 'Boolean', 'Function']
end

class CodeGen::Component
    attr_reader :name, :full_name, :options, :events

    def initialize(settings)
        @full_name = settings[:name]
        @name = @full_name.split('.').last
        @options = []
        @events = []
    end

    def add_option(settings)
        name = settings[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = settings[:description]

        types = settings[:type]

        return unless types

        parents = @options.find_all { |option| name.start_with?(option.name + '.') && option.type =~ /Object|Array/ }

        parents.map! do |parent|
            unless parent.instance_of?(CodeGen::CompositeOption)
                @options.delete(parent)

                parent = CodeGen::CompositeOption.new(:name => parent.name,
                                                      :type => parent.type,
                                                      :description => parent.description)
                @options.push(parent)
            end

            parent
        end

        types.split('|').each do |type|
            type = type.strip

            next unless CodeGen::TYPES.include?(type)

            next if @options.any? { |option| option.name == name && option.type == type }

            option = CodeGen::Option.new(:name => name,
                                         :type => type,
                                         :description => description)

            if parents.any?
                parents.each { |parent| parent.add_option(option) }
            else
                @options.push(option)
            end
        end
    end

    def add_event(settings)
        @events.push CodeGen::Event.new(settings)
    end
end

