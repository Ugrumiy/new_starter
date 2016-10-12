//You should save the package.json file and whenever you need to start working you just do npm install to pull in your node modules.
'use strict';


// Требуемые плагины
var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    prefixer    = require('gulp-autoprefixer'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    svgstore    = require('gulp-svgstore'),
    sourcemaps  = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'), //concat слепливает в неправ. порядке
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'), // Уведомления об ошибках
    babel       = require('gulp-babel');




// Создание переменных для путей
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/resources/js/',
        js_app: 'build/resources/js/app/',
        style: 'build/resources/css/',
        img: 'build/resources/img/',
        fonts: 'build/resources/fonts/',
        temp: 'build/temp/',
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.pug', 
        js_custom: 'src/resources/js/partials/*.js', //собираем main.js
        js_libs: 'src/resources/js/libs/libs.js', //путь к сборке библиотек
        js_app: 'src/resources/js/app/**/*.*', //путь к сборке app
        style: 'src/resources/css/style.scss',
        style_libs: 'src/resources/css/style_libs.css',
        img: 'src/resources/img/**/*.*', 
        fonts: 'src/resources/fonts/**/*.*',
        temp: 'src/temp/**/*.*',
        sprite_svg: 'src/resources/sprite/*.svg', 
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.pug',
        js_custom: 'src/resources/js/partials/*.js',
        js_libs: 'src/resources/js/libs/libs.js',
        js_app: 'src/resources/js/app/**/*.*',
        style: 'src/resources/css/**/*.*',
        img: 'src/resources/img/**/*.*',
        fonts: 'src/resources/fonts/**/*.*',
        temp: 'src/temp/**/*.*',
        sprite_svg: 'src/resources/sprite/*.svg'
    },
};







// Задачи для HTML
gulp.task('html:build', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
        .pipe(pug({pretty: true})) //параметр отключает минификацию
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});




// Задачи для скриптов
gulp.task('js_libs:build', function () {
    return gulp.src(path.src.js_libs) //собираем файлик с библиотеками и плагинами
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(fileinclude()) //склеим файлы
        .pipe(uglify()) //минификация
        .pipe(sourcemaps.write('.')) //Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js_custom:build', function () {
    return gulp.src(path.src.js_custom) 
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(concat('main.js'))  //склеим файлы
        .pipe(babel({
            presets: ['es2015']
        })) //прогоним через babel
        //.pipe(uglify()) минификация
        .pipe(sourcemaps.write('.')) //Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js_app:build', function () {
    return gulp.src(path.src.js_app) 
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
        .pipe(gulp.dest(path.build.js_app)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});





// Задачи для стилей
gulp.task('style_libs:build', function () {
    return gulp.src(path.src.style_libs) 
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") }))
        .pipe(fileinclude())
        .pipe(cleanCSS())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.style)) //И в build
        .pipe(reload({stream: true}));
});

//стили sass
gulp.task('style:build', function () {
    return gulp.src(path.src.style) //Выберем наш style.scss
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") }))
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(sass({outputStyle: 'compressed'})) //Скомпилируем sass параметр - минификация
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(sourcemaps.write('.'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.style)) //И в build
        .pipe(reload({stream: true}));
});





// Задачи для шрифтов
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});



// Задачи для картинок
gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
       .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});



//зачачи для временного стаффа для верстки
gulp.task('temp:build', function () {
    return gulp.src(path.src.temp) 
        .pipe(gulp.dest(path.build.temp))
        .pipe(reload({stream: true}));
});



//сборка спрайта svg
gulp.task('sprite_svg:build', function() {
    return gulp.src( path.src.sprite_svg )
       .pipe(svgstore())
       //.pipe(imagemin({ multipass: true }))
       .pipe(gulp.dest(path.build.img))
       .pipe(reload({stream: true}));
});



// задача для запуска сборки
gulp.task('build', [
    'html:build',
    'js_libs:build',
    'js_custom:build',
    'js_app:build',
    'style:build',
    'style_libs:build',
    'fonts:build',
    'image:build',
    'temp:build',
    'sprite_svg:build'
]);


// Задача watch
gulp.task('watch', function(){
    gulp.watch( path.watch.html, ['html:build'] );

    gulp.watch( path.watch.style, ['style:build', 'style_libs:build' ] );

    gulp.watch( path.watch.js_libs, ['js_libs:build'] );
    gulp.watch( path.watch.js_custom, ['js_custom:build'] );
    gulp.watch( path.watch.js_app, ['js_app:build'] );

    gulp.watch( path.watch.fonts, ['fonts:build'] );

    gulp.watch( path.watch.img, ['image:build'] );

    gulp.watch( path.watch.temp, ['temp:build'] );

    gulp.watch( path.watch.sprite_svg, ['sprite_svg:build'] );
});



// задача запускает сервер
gulp.task('webserver', function () {
    browserSync({
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        logPrefix: "Ely_Serv"
    });
});



// Задача по умолчанию
gulp.task('default', ['build', 'webserver', 'watch']);


