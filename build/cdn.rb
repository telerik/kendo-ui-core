namespace :cdn do
    desc('Deploy assets to CloudFront')
    task :deploy => 'bundles:cdn.commercial' do
        msbuild 'build/cdn.proj', "/p:Version=#{VERSION} /p:BundleRoot=../dist/bundles/cdn.commercial"
    end
end
