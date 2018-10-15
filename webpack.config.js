var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        'app': './src/main.ts'
    },
    devServer: {
        historyApiFallback: true,
    },
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "[name].js"       // название создаваемого файла
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:{
        rules:[   //загрузчик для ts
           {
                test: /\.ts$/, // определяем тип файлов
                exclude: /node_modules/,
                use: [{
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    },
                    'angular2-template-loader'
               ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test:/\.css$/,
                include: path.resolve(__dirname, 'src/styles'),
                loader: 'raw-loader'
            }
       ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'src'), // каталог с исходными файлами
            {} // карта маршрутов
        ),
        new webpack.SourceMapDevToolPlugin({})
  ] 
}