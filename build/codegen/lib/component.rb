require 'option'
require 'event'

module CodeGen
    TYPES = ['Object', 'Date', 'Array', 'String', 'Number', 'Boolean']
end

class CodeGen::Component
    attr_reader :name, :full_name, :configuration, :events

    def initialize(options)
        @full_name = options[:name]
        @name = @full_name.split('.').last
        @configuration = []
        @events = []
    end

    def add_option(options)
        name = options[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = options[:description]

        types = options[:type]

        if types

            types.split('|').each do |type|
                type = type.strip

                if CodeGen::TYPES.include?(type)
                    @configuration.push CodeGen::Option.new(:name => name,
                                       :type => type,
                                       :description => description)
                end
            end

        end
    end

    def add_event(options)
        @events.push CodeGen::Event.new(options)
    end

    def promote_members
        @configuration.clone.each do |member|
            prefix = member.name + '.'

            members = @configuration.find_all {|m| m.name.start_with?(prefix)}

            next unless members.any?

            @configuration.push promote_member_to_component(member, members)
        end
    end

    def import_members(members)
        prefix = @name + "."

        members.each do |member|
            member.name.sub!(prefix, '')
            @configuration.push(member)
        end
    end

    private

    def promote_member_to_component(member, members)
        members.each {|m| @configuration.delete(m) }

        @configuration.delete(member)

        component = CodeGen::Component.new(:name => member.name)

        component.import_members(members)

        component.promote_members

        component
    end
end

