const express = require('express');
const morgan = require("morgan");
const compression = require('compression');
const serveStatic = require('serve-static');
const basicAuth   = require('basic-auth-connect');
const app = express();

const user = process.env.USER;
const pass = process.env.PASS;

app.set('port', process.env.PORT || 3000);

// if (user && pass) {
//   app.use(express.basicAuth(user, pass));
// }

if (user && pass) {
    app.use(basicAuth(user, pass));
  }

// app.use(express.logger('dev'));
// app.use(
//     morgan(
//       ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
//     )
// );
// app.use(express.compress());
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
// app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(morgan('dev'));
app.use(compression());
app.use(serveStatic(`${__dirname}/public`));

app.listen(app.get('port'), function() {
  console.log('Server listening on port %s', app.get('port'));
});