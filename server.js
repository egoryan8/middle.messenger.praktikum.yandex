const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('./dist'));

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}./dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
