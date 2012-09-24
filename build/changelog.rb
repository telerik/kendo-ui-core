require 'github_api'
require 'erb'

CHANGELOG_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'changelog.html.erb')), 0, '%<>')

class Issue
    attr_reader :title, :suites, :widgets, :internal, :framework, :bug
    def initialize(issue)
        @title = issue.title
        @labels = issue.labels.map {|l| l.name }

        @internal = @labels.join(" ") =~ /Documentation|Internal|Deleted/
        @bug = @labels.include? "Bug"

        @suites = filtered_labels :s

        @suites.push "Framework" if @suites.length == 0

        @widgets = filtered_labels :w
        @framework = filtered_labels :f
    end

    def add_to(set)
        if @bug
            set.bugs.push(self)
        else
            set.features.push(self)
        end
    end

    def filtered_labels(prefix)
        @labels.grep(/#{prefix}:/i) { |l| l.split(":")[1].strip }
    end
end

class Widget
    attr_reader :bugs, :features
    def initialize
        @features = []
        @bugs = []
    end

    def add(issue)
        if issue.bug
            @bugs.push issue
        else
            @features.push issue
        end
    end
end

class Suite
    attr_reader :bugs, :features, :title, :key
    attr_accessor :widgets
    def initialize(title, key)
        @title = title
        @key = key
        @features = []
        @bugs = []
        @widgets = {}
    end

    def add(issue)
        if issue.widgets.length == 0
            if issue.bug
                @bugs.push issue
            else
                @features.push issue
            end
        else
            issue.widgets.each do |widget_name|
                (@widgets[widget_name] ||= Widget.new).add(issue)
            end
        end
    end
end

class ChangeLog
    attr_reader :suites

    def initialize
        @suites = [
            Suite.new("Framework", "framework"),
            Suite.new("Web", "web"),
            Suite.new("DataViz", "dataviz"),
            Suite.new("Mobile", "mobile"),
            Suite.new("ASP.NET MVC Wrappers" , "aspnetmvc")
        ]
    end

    def fetch_issues
        closed_issues.map { |issue| Issue.new(issue) }.each do |issue|
            next if issue.internal
            issue.suites.each do |suite_name|
                find_suite(suite_name).add(issue)
            end
        end
        suites.each do |suite|
            suite.widgets = Hash[suite.widgets.sort]
        end
    end

    def render_changelog(suite_names)
        suites = @suites.select { |suite| suite_names.include? suite.key }
        CHANGELOG_TEMPLATE.result(binding)
    end

    private

    def find_suite(key)
        @suites.find { |s| s.title == key }
    end

    def client
        @client ||= Github.new :oauth_token => "5dd646a3d9d8d5fb69fe59c163fc84b76fc67fcb", :user => "telerik", :repo => "kendo"
    end

    def closed_issues
        current_milestones.map { |milestone| milestone_issues(milestone) }.flatten
    end

    def current_milestones
        milestones.select { |milestone| current_milestone_names.include? milestone.title }
    end

    def milestone_issues(milestone)
        page = 1
        issues = []

        begin
            issues_page = page_issues(milestone, page)
            issues += issues_page
            page += 1
        end while issues_page.length == 100

        issues
    end

    def page_issues(milestone, page)
        $stderr.puts "Fetching issues for #{milestone.title}, page #{page}..."
        client.issues.list_repo nil, nil,
            :state => "closed",
            :milestone => milestone.number,
            :per_page => 100,
            :page => page
    end

    def milestones
        @milestones ||= client_milestones.list(nil, nil, :state => "open") + client_milestones.list(nil, nil, :state => "closed")
    end

    def client_milestones
        client.issues.milestones
    end

    def current_milestone_names
       names = [self.class.milestone_name(VERSION_YEAR, VERSION_Q, VERSION_SERVICE_PACK)]

       if (!VERSION_SERVICE_PACK)
            q = VERSION_Q - 1;
            year = VERSION_YEAR

            if (q === 0)
                year -= 1
                q = 3;
            end

            names.unshift self.class.milestone_name(year, q, ".next")
       end
    end

    class << self
        def milestone_name(year, quarter, service_pack)
            "#{year}.Q#{quarter}#{".SP#{service_pack}" if service_pack}"
        end

        def instance
            unless @changelog
                @changelog = ChangeLog.new
                @changelog.fetch_issues
            end

            @changelog
        end
    end
end

class WriteChangeLogTask < Rake::FileTask
    attr_accessor :suites
    def execute(args)
        File.open(name, 'w') { |file| file.write(contents) }
    end

    def contents
        @contents ||= ChangeLog.instance.render_changelog(suites)
    end

    def needed?
        !File.exist?(name) || File.read(name).strip != contents.strip
    end
end

def write_changelog(path, suites)
    task = WriteChangeLogTask.define_task(path)
    task.suites = suites
end
