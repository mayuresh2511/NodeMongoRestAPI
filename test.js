const jwt = require('jsonwebtoken');

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYyMWFmMTYyMzFmNDA1MDQwZmExM2EiLCJpYXQiOjE2MDAyNjQ5NDV9.1Ox0b2KyXa9SnRwNff3Q3r28pGAtGFvKHB53Bd7HiFI'
const decode =  jwt.verify(token, 'myfirstprojectonnode');
console.log(decode);