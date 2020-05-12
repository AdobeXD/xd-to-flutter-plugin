const exec = require("child_process").exec;
const CircularDependencyPlugin = require("circular-dependency-plugin");

let isProd = false;
let isWatch = true;
try {
  const config = JSON.parse(process.env.npm_config_argv);
  isProd = config.original.includes("--production");
  isWatch = !(config.original.includes("--no-watch") || isProd);
} catch (e) { }

module.exports = {
  entry: "./src/ui/main.jsx",
  mode: isProd ? "production" : "development",
  watch: isWatch,
  output: {
    path: __dirname + "/build",
    filename: 'main.js',
    libraryTarget: "commonjs2"
  },
  devtool: isProd ? "none" : "source-map",
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            ["transform-react-jsx", {
              "pragma": "h", // default pragma is React.createElement
              "pragmaFrag": "Fragment", // default is React.Fragment
            }]
          ]
        }
      },
      {
        test: /\.styl?$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader" // compiles Stylus to CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[ext]'
        }
      },
    ]
  },
  externals: [
    "os",
    "scenegraph",
    "application",
	"clipboard",
	"assets",
    "uxp",
    function (context, request, callback) {
      if (/lib/.test(request)) {
        return callback(null, request.substr(1), "commonjs2")
      }
      callback();
    }
  ],
  plugins: [
    // new CircularDependencyPlugin({ failOnError: true }),
    {
      apply: (compiler) => {
        const runDeploy = () => exec("yarn deploy", (err, stdout, stderr) => {
          if (stdout) { console.log("\nWebpack bundle complete, plugin folder updated"); }
          if (stderr) { console.error(stderr); }
        });
        if (isWatch) {
          compiler.hooks.afterEmit.tap("DeployPlugin", runDeploy);
        } else {
          compiler.hooks.done.tap("DeployPlugin", runDeploy);
        }
      }
    }
  ]
};