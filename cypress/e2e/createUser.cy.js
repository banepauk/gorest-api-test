/// <reference types="Cypress" />
const faker = require ('@faker-js/faker');
const jsonData = require('../fixtures/createUser.json')
//In fixture/ i create createUser.json file and put values for body so i can use it in all my tests

describe('create user', ()=>{
  //Get token in variable so i can use it like accessToken(get it from site directly when login via google)
  let accessToken = '7217be903d009fc2990c040179a7cc7a26ea6b7d97e219307e56813a70761c32'
  let email = faker.internet.email() 

  // 5 tests below, 4 negative, and 1 positive
  it('create user without name', ()=>{
    cy.request({
      method:'POST',
      url: 'https://gorest.co.in/public/v2/users',
      failOnStatusCode : false,
      headers:{
        'authorization' : "Bearer " + accessToken
      },
      body:{
        "name":"",
        "gender":jsonData.gender,
        "email":email,
        "status":jsonData.status,
      }
    }).then((res)=>{
      cy.log(JSON.stringify(res))
      //assertions to make sure everything is ok
      expect(res.status).eq(422)
      expect(res.body).to.deep.equal([{"field":"name","message":"can't be blank"}])
    })
  })

  it('create user without gender input', ()=>{
    cy.request({
      method:'POST',
      url: 'https://gorest.co.in/public/v2/users',
      failOnStatusCode : false,
      headers:{
        'authorization' : "Bearer " + accessToken
      },
      body:{
        "name":jsonData.name,
        "gender":'',
        "email":email,
        "status":jsonData.status,
      }
    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).eq(422)
      expect(res.body).to.deep.equal([{"field":"gender","message":"can't be blank, can be male or female"}])
    })
  })

  it('create user without email', ()=>{
    cy.request({
      method:'POST',
      url: 'https://gorest.co.in/public/v2/users',
      failOnStatusCode : false,
      headers:{
        'authorization' : "Bearer " + accessToken
      },
      body:{
        "name":jsonData.name,
        "gender":jsonData.gender,
        "email":'',
        "status":jsonData.status,
      }
    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).eq(422)
      expect(res.body).to.deep.equal([{"field":"email","message":"can't be blank"}])
    })
  })

  it('create user without token', ()=>{
    cy.request({
      method:'POST',
      url: 'https://gorest.co.in/public/v2/users',
      failOnStatusCode : false,
      body:{
        "name":jsonData.name,
        "gender":jsonData.gender,
        "email":'',
        "status":jsonData.status,
      }
    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).eq(401)
      expect(res.body.message).eq('Authentication failed')
    })
  })

  it('create valid user',()=>{
    cy.request({
      method:'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers:{
        'authorization' : "Bearer " + accessToken
      },
      body:{
        "name":jsonData.name,
        "gender":jsonData.gender,
        "email":email,
        "status":jsonData.status,
      }
    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).eq(201)
      expect(res.body.name).eq(jsonData.name)
      expect(res.body.email).eq(email)
      expect(res.body.gender).eq(jsonData.gender)
      expect(res.body.status).eq(jsonData.status)
    })
  })

  })
