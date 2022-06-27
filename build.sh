echo 'Building...'
export INLINE_RUNTIME_CHUNK=false;
export GENERATE_SOURCEMAP=false;
npm exec react-scripts build
echo 'Renaming files...'
mv build/index.html build/popup.html
echo 'Finished!'