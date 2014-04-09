require 'release_build_upload'

def description(name)
    name = name.split(/\W/).map { |c| c.capitalize }.join(' ')

    "Build Kendo UI #{name}"
end

desc "Upload all internal builds on kendoui.com"
task "internal_builds:bundles:all" => [ "build:production:get_binaries" ]

def bundle(options)
    name = options[:name]
    eula = options[:eula]
    readme = options[:readme]
    vsdoc_sources = options[:vsdoc]
    intellisense_sources = options[:intellisense]
    vsdoc_dest = options[:vsdoc_dest] || "vsdoc"
    type_script_sources = options[:type_script]
    changelog_suites = options[:changelog]
    demo_suites = options[:demos]
    path = "dist/bundles/#{name}"
    beta = options[:beta] || BETA
    legal_dir = File.join('resources', 'legal', beta ? 'beta' : 'official')
    license = nil

    prerequisites = [:js, :less] + options[:prerequisites].to_a

    if options[:license]
        license = "#{path}.license"
        file_license license => File.join(legal_dir, "#{options[:license]}.txt")
    end

    options[:contents].each do |target, contents|

        root = ROOT_MAP[target]

        raise "Nothing specified for '#{target}' in ROOT_MAP" unless root

        to = File.join(path, target)

        tree :to => to,
             :from => contents,
             :root => ROOT_MAP[target],
             :license => license

        prerequisites.push(to)
    end

    if eula
        license_agreements_path = File.join(path, "license-agreements")
        third_party_path = File.join(license_agreements_path, "third-party")
        eula_dir = beta ? "eula" : eula + "-eula"
        source_path = File.join(legal_dir, eula_dir)

        tree :to => license_agreements_path,
             :from =>  File.join(source_path, "*"),
             :root => source_path

        tree :to => third_party_path,
             :from =>  File.join(THIRD_PARTY_LEGAL_DIR, "*"),
             :root => THIRD_PARTY_LEGAL_DIR

        prerequisites.push(license_agreements_path)
        prerequisites.push(third_party_path)
    end

    if readme
        readme_path = File.join(path, "README")
        file_copy :to => readme_path, :from => File.join(README_DIR, "#{readme}.txt")
        prerequisites.push(readme_path)
    end

    if vsdoc_sources
        vsdoc_sources.each do |file|
            vsdoc_path = File.join(path, vsdoc_dest, "kendo.#{file}-vsdoc.js")
            vsdoc vsdoc_path => md_api_suite(file)
            prerequisites.push(vsdoc_path)
        end
    end

    if intellisense_sources
        intellisense_sources.each do |file|
            intellisense_path = File.join(path, vsdoc_dest, "kendo.#{file}.min.intellisense.js")
            intellisense intellisense_path => md_api_suite(file)
            prerequisites.push(intellisense_path)
        end
    end

    if type_script_sources
        type_script_build_files = FileList["build/codegen/lib/type_script/*.*"]

        type_script_sources.each do |file|
            type_script_path = File.join(path, "typescript", "kendo.#{file}.d.ts")
            type_script type_script_path => [md_api_suite(file), type_script_build_files].flatten
            prerequisites.push(type_script_path)
        end
    end

    if changelog_suites
        changelog_path = File.join(path, "changelog.html")
        write_changelog(changelog_path, changelog_suites, options[:changelog_exclude])
        prerequisites.push(changelog_path)
    end

    if demo_suites

        demo_dirs = demo_suites[:dir]

        demo_dirs = [demo_dirs] unless demo_dirs.is_a? Array

        demo_files = demo_dirs.map do |dir|
            demos( {
                :path => "#{path}/#{dir}",
                :suites => demo_suites[:suites],
                :template_dir => demo_suites[:template_dir]
            } )
        end

        prerequisites = prerequisites + demo_files.flatten
    end

    zip "#{path}.zip" =>  prerequisites

    desc description(name)
    task "bundles:#{name}" => "#{path}.zip"

    xml_changelog_path = "dist/bundles/#{name}.changelog.xml"
    write_changelog(xml_changelog_path, changelog_suites, options[:changelog_exclude])

    product_names = ['Kendo UI Core','Kendo UI Professional', 'UI for ASP.NET MVC', 'UI for JSP', 'UI for PHP']

    if options[:upload_as_internal_build]
        versioned_bundle_archive_path = File.join(ARCHIVE_ROOT, 'LIB Archive', VERSION, versioned_bundle_name(name) + ".zip")

        file_copy :to => versioned_bundle_archive_path, :from => "#{path}.zip"

        desc "Upload #{name} as an internal build on kendoui.com"
        task "internal_builds:bundles:#{name}" => versioned_bundle_archive_path do
            upload_internal_build \
                :title => versioned_bundle_name(name),
                :product => options[:product],
                :changelog_path => changelog_path,
                :vs_extension => !!options[:vs_extension],
                :archive_path => versioned_bundle_archive_path
        end

        # add bundle to bundles:all
        task "internal_builds:bundles:all" => "internal_builds:bundles:#{name}"
    end
    if options[:release_build]
      if defined? SERVICE_PACK_NUMBER
        destination_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}"
      else
        destination_folder_name = "Q#{VERSION_Q} #{VERSION_YEAR}"
      end

      versioned_bundle_destination_path = File.join(RELEASE_ROOT, VERSION_YEAR.to_s, destination_folder_name)
      versioned_bundle_archive_path = File.join(ARCHIVE_ROOT, "Production")

      FileUtils.mkdir_p(versioned_bundle_destination_path)

        desc "Copy #{name} as release build on telerik.com"

        task "release_builds:copy:#{name}" do
            release_build_file_copy(options[:release_build], name, versioned_bundle_destination_path, versioned_bundle_archive_path)                                
        end

        desc "Upload #{name} as release build on telerik.com"

        task "release_builds:upload:#{name}" =>  "release_builds:copy:#{name}" do
            p "starting version upload for #{name}"
            case options[:product] 
                  when "Kendo UI Complete"
                    upload_release_build \
                    :title => versioned_bundle_name(name),
                    #:product => options[:product],
                    :product => "Kendo UI Professional",
                    :params => options[:release_build],
                    :archive_path => versioned_bundle_destination_path 
                  when "UI for ASP.NET MVC"
                    upload_release_build \
                    :title => versioned_bundle_name(name),
                    :product => options[:product],
                    :params => options[:release_build],
                    :vs_extension => !!options[:vs_extension],
                    :archive_path => versioned_bundle_destination_path
                  else
                    upload_release_build \
                    :title => versioned_bundle_name(name),
                    :product => options[:product],
                    :params => options[:release_build],
                    :archive_path => versioned_bundle_destination_path 
            end   
        end
        # add bundle to bundles:all
        task "release_builds:bundles:all" => "release_builds:upload:#{name}"
    end
    
end

