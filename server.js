const express = require('express');

const app = express();

app.use('/static', express.static(`${__dirname}/build/static`));
app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(3000, () => console.log('Mathbank started'));
