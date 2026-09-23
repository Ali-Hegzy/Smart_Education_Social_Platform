const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname ,'../public')));

app.get('/', (req, res)=>{
});

module.exports = app;