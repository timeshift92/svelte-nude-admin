

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const fs = require('fs');
const queries = require('./queries');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const app = express();
const path = require('path')
const sharp = require('sharp')

const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
const hgeEndpoint = process.env.GRAPHQL_ENDPOINT + '/v1/graphql';
// const hgeEndpoint = 'http://graphql-engine:8080' + '/v1/graphql';

function echo(event) {
  let responseBody = '';
  if (event.op === "INSERT") {
    responseBody = `New user ${event.data.new.id} inserted, with data: ${event.data.new.email}`;
  }
  else if (event.op === "UPDATE") {
    responseBody = `User ${event.data.new.id} updated, with data: ${event.data.new.name}`;
  }
  else if (event.op === "DELETE") {
    responseBody = `User ${event.data.old.id} deleted, with data: ${event.data.old.name}`;
  }

  return responseBody;
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('./images'))

app.get('/images/:schema/:id/:image', async function (req, res) {
  // res.json(req.path)
  if (!req.query.width || !req.query.height) {
    res.status(422).json({ 'error': "width and height required" });
    return;
  }
  res.set('Cache-Control', 'public, max-age=31557600');
  let imagePath = req.path.substr(0, req.path.lastIndexOf('.'));
  let extension = req.path.substr(req.path.lastIndexOf('.'));
  imagePath = imagePath + `_${req.query.width}x${req.query.height}${extension}`;
  console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    res.sendFile(path.join(__dirname + imagePath));
    return
  } else {
    await sharp(path.join(__dirname + req.path))
      .resize(parseInt(req.query.width), parseInt(req.query.height), {
        kernel: sharp.kernel.nearest,
        fit: 'contain',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      // .resize({width:parseInt(req.query.width), height:parseInt(req.query.height)})
      //   .flatten( { background: '#ff6600' } )
      // .composite([{ input: './public/hoco.png', gravity: 'southeast' }])
      // .sharpen()
      // .withMetadata()
      // .webp({ quality: 90 })
      .toFile(path.join(__dirname + imagePath), err => { console.log(err) })
      .toBuffer(b => {
        res.sendFile(path.join(__dirname + imagePath));
      })
  }

  // .toBuffer()



})

app.post('/', function (req, res) {
  schemaName = req.body.table.name.replace('_images', '');
  if (req.body.event.op == 'DELETE') deleteImage(req, res, schemaName)
  else {
    try {
      if (Array.isArray != req.body.event.data.new.image && req.body.event.data.new.image.length < 100) {
        return;
      }

      saveImages(`./images/${schemaName}/` + req.body.event.data.new[`${schemaName}_id`], req.body.event.data.new, `UPDATE_${schemaName.toUpperCase()}_IMAGES`, `${schemaName}_id`);
      var result = echo(req.body.event);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.toString());
    }
  }
})


function deleteImage(req, res, name) {
  let delPath = './images/' + req.body.event.data.old.image.substr(req.body.event.data.old.image.indexOf(name));
  fs.unlink(delPath, function (err) {
    if (err) return console.log(err);
    console.log('file deleted successfully');
  });
}

app.post('/brand', function (req, res) {
  if (req.body.event.op == 'DELETE') {
    let delPath = './images/' + req.body.event.data.old.image.substr(req.body.event.data.old.image.indexOf('brand'));
    fs.unlink(delPath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  } else {

    try {
      if (Array.isArray != req.body.event.data.new.image && req.body.event.data.new.image.length < 100) {
        return;
      }
      saveImages('./images/brand/' + req.body.event.data.new.brand_id, req.body.event.data.new, 'UPDATE_BRAND_IMAGES', 'brand_id');
      var result = echo(req.body.event);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.toString());
    }
  }


});



function saveImages(path, item, query, id) {

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  const imgdata = item.image
  if (Array.isArray(imgdata)) {
    for (let i = 0; i < imgdata.length; i++) {
      item.image = imgdata[i];
      saveImage(path, item, query, id)
    }

  } else {

    saveImage(path, item, query, id)
  }

}

function saveImage(path, item, query = 'UPDATE_PRODUCT_IMAGES', id = 'product_id') {
  const imageName = item[id] + '_' + Date.now() + '.png';
	const base64Data = item.image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
	
  fs.writeFileSync(path + '/' + imageName, base64Data, { encoding: 'base64' });
  console.log(hgeEndpoint)
  fetch(hgeEndpoint, {
    method: 'POST',
    body: JSON.stringify({ query: queries[query], variables: { id: item.id, image: process.env.HOST + path.replace('./images', '') + '/' + imageName } }),
    headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': adminSecret },
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      // callback(null, response);
    });
}



app.post('/product', function (req, res) {
  console.log(req);
  if (req.body.event.op == 'DELETE') {
    let delPath = './images/' + req.body.event.data.old.image.substr(req.body.event.data.old.image.indexOf('product'));
    fs.unlink(delPath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  } else {
    try {
      if (Array.isArray != req.body.event.data.new.image && req.body.event.data.new.image.length < 100) {
        return;
      }
      saveImages('./images/product/' + req.body.event.data.new.product_id, req.body.event.data.new);
      var result = echo(req.body.event);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.toString());
    }
  }


});



app.get('/', function (req, res) {
  res.send('Hello World - For Event Triggers, try a POST request?');
});

var server = app.listen(process.env.PORT, function () {
  console.log(`server listening ${process.env.PORT}`);
});

