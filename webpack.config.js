const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development', // добавление режима разработчика
    devServer: {
        contentBase: path.resolve(__dirname, './dist'), // путь куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 9000, // порт, что бы открывать сайт по адресу
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ //массив правил
            //добавим в него обхект правил для бабеля
            { test: /\.js$/,
                //при обработке использовать бабель
                use: 'babel-loader',
                //исключает папку node_modules
                exclude: '/node_modules/' },

                {
                    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                    type: 'asset/resourse'
                },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                'postcss-loader'],
                //регулярное выражение, которое ищет все js файлы
                
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}