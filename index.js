var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true); //1
mongoose.set('useFindAndModify', false); //1
mongoose.set('useCreateIndex', true); //1  
mongoose.set('useUnifiedTopology', true); //1 
/*mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 저 부분이 바뀔 일은 왠만하면 없기 때문에 그냥 항상 저렇게 설정하고 쓰시면 됩니다. 이 부분이 빠지게 되면 서버 실행시 경고를 냅니다. */
mongoose.connect(process.env.MONGO_DB); //2
/* node.js에서 기본으로 제공되는 process.env 오브젝트는 환경변수들을 가지고 있는 객체입니다. 저는 DB connection string을 "MONGO_DB"라는 이름의 환경변수에 저장하였기 때문에 node.js코드상에서 process.env.MONGO_DB로 해당 값을 불러올 수 있습니다.
mongoose.connect('CONNECTION_STRING')함수를 사용해서 DB를 연결할 수 있습니다.*/
var db = mongoose.connection; //3
/*mongoose의 db object를 가져와 db변수에 넣는 과정입니다. 이 db변수에는 DB와 관련된 이벤트 리스너 함수들이 있습니다.  */
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


// Routes
app.use('/', require('./routes/home')); // 1
app.use('/contacts', require('./routes/contacts')); // 2


// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
