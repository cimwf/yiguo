const gulp = require("gulp");
const server = require("gulp-webserver");
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const watch = require('gulp-watch')
const proxy = require('http-proxy-middleware');
//编译sass
gulp.task('packscss',()=>{
    return gulp.src('./src/styles/app.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./dev/styles'))
})

//commonJS规范做JS模块化
gulp.task('packjs',()=>{
    return gulp.src('./src/scripts/**/*.js')
    .pipe(webpack({
        mode:'development',
        entry:{
            app:['@babel/polyfill','./src/scripts/app.js']
        },
        output:{
            filename:"app.js"
        },
        module:{
            rules:[
                {
                    test:/\.html$/,
                    use:['string-loader']
                },
                {
                    test:/\.js$/,
                    exclude:/(node_modules|bower_components)/,
                    use:{
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env'],
                            plugins:['@babel/plugin-transform-runtime']
                        }
                    }
                }
            ]
        },
    }))
    .pipe(gulp.dest('./dev/scripts'))
})

gulp.task("server",()=>{
    return gulp.src('./dev')
    .pipe(server({
        host:"localhost",
        port:2000,
        livereload:true,//是否自动更新
        // directoryListing:true  //是否打开目录
        //open:true   是否打开浏览器
         middleware:[
            // proxy('/api',{
            //     target:"https://m.lagou.com/",
            //     changeOrigin:true,
            //     pathRewrite:{
            //         '^/api':''
            //     }
            // })
            proxy('/api',{
                target:"http://localhost:3000",
                changeOrigin:true
            }),
            proxy('/lagou',{
                target:"http://m.lagou.com",
                changeOrigin:true,
                pathRewrite:{
                    '^/lagou':''
                }
            }),
            // http://h5homeapi.yiguo.com/api/Template/GetTemplate
            proxy('/api',{
                target:"http://localhost:2000",
                changeOrigin:true
            }),
            proxy('./api',{
                target:"https://b2capigateway.yiguo.com",
                changeOrigin:true
            })
        ]
    }))
})

gulp.task("copyhtml",()=>{
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dev/'))
})
//copy iconfonts
gulp.task("copyicons",()=>{
    return gulp.src('./src/iconfonts/**/*')
    .pipe(gulp.dest('./dev/iconfonts'))
})

//copy libs
gulp.task("copylibs",()=>{
    return gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./dev/libs'))
})

//copy images
gulp.task("copyimages",()=>{
    return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dev/images'))
})

//copy mock
// gulp.task("copymock",()=>{
//     return gulp.src('./src/mock/**/*')
//     .pipe(gulp.dest('./dev/mock'))
// })
//文件修改 watch
gulp.task('watch',()=>{
    gulp.watch('./src/*.html',['copyhtml'])
    // gulp.watch('./src/styles/**/*',['packscss'])
    //gulp-watch支持文件的创建，修改，删除
    //缺点：某些操作系统不支持
    watch('./src/styles/**/*',()=>{
        gulp.start(['packscss'])
    })
    watch('./src/libs/**/*',()=>{
        gulp.start(['copylibs'])
    })
    watch('./src/images/**/*',()=>{
        gulp.start(['copyimages'])
    })
    // watch('./src/mock/**/*',()=>{
    //     gulp.start(['copymock'])
    // })
    gulp.watch('./src/scripts/**/*',['packjs'])
})

gulp.task("default",["packscss",'packjs','copyhtml','copyicons','copyimages','copylibs',"server",'watch'],()=>{
    console.log("all works!")
})