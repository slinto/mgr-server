# mgr-server

## Prerequisites
[Node.js](http://nodejs.org)
```
npm install -g gulp
npm install -g bower
```

## Workflow

### Recommended dev workflow
> Run server, nodemon for automatically reload node.js app, livereloading when is jade, js or css changed and run JSHint. Automatic compilation of Stylus code and automatic creating of google deps file.

```
gulp
```
Type `gulp` or `gulp server` and open localhost:8080 in your browser.

### Production build
> Compilation of Stylus code, minifying CSS code, image minifying and run Google Closure Compiler.

```
gulp build
```

### Release build
> App building, version bump, commit and push to git repository.

```
gulp release --version major|minor|patch
or
gulp release -v major|minor|patch
```

### Error: spawn EMFILE on OSX
Call `ulimit -n 10240` or `gulp set-ulimit`.
For automatic setup on start, call `gulp server-ulimit` instead `gulp server`