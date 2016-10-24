"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var gulpclass_1 = require("gulpclass");
var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");
var replace = require("gulp-replace");
var mocha = require("gulp-mocha");
var chai = require("chai");
var tslint = require("gulp-tslint");
var stylish = require("tslint-stylish");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var exec = require('child_process').exec;
var Gulpfile = (function () {
    function Gulpfile() {
    }
    // -------------------------------------------------------------------------
    // General tasks
    // -------------------------------------------------------------------------
    /**
     * Cleans build folder.
     */
    Gulpfile.prototype.clean = function (cb) {
        return del(["./build/**"], cb);
    };
    /**
     * Runs typescript files compilation.
     */
    Gulpfile.prototype.compile = function () {
        return gulp.src("*.js", { read: false })
            .pipe(shell(["tsc"]));
    };
    Gulpfile.prototype.compileAoT = function () {
        return gulp.src("*.js", { read: false })
            .pipe(shell([
            '"node_modules/.bin/ngc" -p tsconfig-aot.json'
        ]));
    };
    // -------------------------------------------------------------------------
    // Packaging and Publishing tasks
    // -------------------------------------------------------------------------
    /**
     * Publishes a package to npm from ./build/package directory.
     */
    Gulpfile.prototype.npmPublish = function () {
        return gulp.src("*.js", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish"
        ]));
    };
    /**
     * Copies all sources to the package directory.
     */
    Gulpfile.prototype.packageCompile = function () {
        var tsProject = ts.createProject("tsconfig.json");
        var tsResult = gulp.src(["./src/**/*.ts", "./typings/**/*.ts"])
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject));
        return [
            tsResult.dts.pipe(gulp.dest("./build/package")),
            tsResult.js
                .pipe(sourcemaps.write(".", { sourceRoot: "", includeContent: true }))
                .pipe(gulp.dest("./build/package"))
        ];
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageMoveCompiledFiles = function () {
        return gulp.src("./build/package/src/**/*")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageClearCompileDirectory = function (cb) {
        return del([
            "./build/package/src/**"
        ], cb);
    };
    /**
     * Change the "private" state of the packaged package.json file to public.
     */
    Gulpfile.prototype.packagePreparePackageFile = function () {
        return gulp.src("./package.json")
            .pipe(replace("\"private\": true,", "\"private\": false,"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will replace all typescript code blocks in the README (since npm does not support typescript syntax
     * highlighting) and copy this README file into the package folder.
     */
    Gulpfile.prototype.packageReadmeFile = function () {
        return gulp.src("./README.md")
            .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will copy typings.json file to the build package.
     */
    Gulpfile.prototype.copyTypingsFile = function () {
        return gulp.src("./typings.json")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Creates a package that can be published to npm.
     */
    Gulpfile.prototype.package = function () {
        return [
            "clean",
            "packageCompile",
            "packageMoveCompiledFiles",
            "packageClearCompileDirectory",
            ["packagePreparePackageFile", "packageReadmeFile", "copyTypingsFile"]
        ];
    };
    /**
     * Creates an AoT package that can be published to npm.
     */
    Gulpfile.prototype.packageAoT = function () {
        return [
            "clean",
            "compileAoT",
            ["packagePreparePackageFile", "packageReadmeFile", "copyTypingsFile"]
        ];
    };
    /**
     * Creates a package and publishes it to npm.
     */
    Gulpfile.prototype.publish = function () {
        return ["package", "npmPublish"];
    };
    Gulpfile.prototype.publishAoT = function () {
        return ["packageAoT", "npmPublish"];
    };
    // -------------------------------------------------------------------------
    // Run tests tasks
    // -------------------------------------------------------------------------
    /**
     * Runs ts linting to validate source code.
     */
    Gulpfile.prototype.tslint = function () {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
    };
    /**
     * Runs unit-tests.
     */
    Gulpfile.prototype.unit = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        return gulp.src("./build/es5/test/unit/**/*.js")
            .pipe(mocha());
    };
    /**
     * Compiles the code and runs tests.
     */
    Gulpfile.prototype.tests = function () {
        return ["clean", "compile", "tslint", "unit"];
    };
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "clean");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "compile");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "compileAoT");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "npmPublish");
    __decorate([
        gulpclass_1.MergedTask()
    ], Gulpfile.prototype, "packageCompile");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packageMoveCompiledFiles");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packageClearCompileDirectory");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packagePreparePackageFile");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "packageReadmeFile");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "copyTypingsFile");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "package");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "packageAoT");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "publish");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "publishAoT");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "tslint");
    __decorate([
        gulpclass_1.Task()
    ], Gulpfile.prototype, "unit");
    __decorate([
        gulpclass_1.SequenceTask()
    ], Gulpfile.prototype, "tests");
    Gulpfile = __decorate([
        gulpclass_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
