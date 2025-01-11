import fs from 'fs'
import path from 'path'


const modelsPath = path.resolve('./models');
fs.readdirSync(modelsPath).forEach(file => {
    if(file.endsWith('.js')){
        import(`./models/${file}`);
    }
})
