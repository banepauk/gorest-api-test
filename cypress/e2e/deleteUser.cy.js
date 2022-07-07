/// <reference types="Cypress" />
const faker = require ('@faker-js/faker');
const jsonData = require('../fixtures/createUser.json')

describe('delete user',()=>{
    let email = faker.internet.email()
    let accessToken = '7217be903d009fc2990c040179a7cc7a26ea6b7d97e219307e56813a70761c32'


    



      it('create and delete',()=>{
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
        }).then((res)=>{
          let userId = res.body.id
          //Delete previous created user
          cy.request({
            method: 'DELETE',
            url:'https://gorest.co.in/public/v2/users/'+userId,
            headers:{
              'authorization' : "Bearer " + accessToken
            },
          }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).eq(204)
            expect(res.body).eq('')
          })
         
        })
      })
      
      })
 



