const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");

// utilidades css 
const sourcemaps = require("gulp-sourcemaps")
    // funcion que compila sass

// utilidades JS
const terser = require("gulp-terser-js")

function css() {
    return src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/css"))
}
function javascript(){
    return src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe( concat("bundle.min.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/js"));
}
function imagenes(){
    return src("src/img/**/*")
        .pipe( imagemin())
        .pipe( dest( "./build/img"))

}

function watchArchivos() {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css,javascript, imagenes, watchArchivos);