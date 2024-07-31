import express from 'express';
import { fileURLToPath } from 'url'
import { dirname } from 'path';
const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename); 

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('HomePage');
})

app.get("/search", (req, res)=>{
    res.render('SearchPage', {results:[1,2,3,4,5,6,7,8,9,10,11,12,13]});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})