/// <reference types="Cypress" />
const faker = require ('@faker-js/faker');
const jsonData = require('../fixtures/createUser.json')


describe('update user',() =>{
    let email = faker.internet.email() 
    let accessToken = '7217be903d009fc2990c040179a7cc7a26ea6b7d97e219307e56813a70761c32'
    let validName = faker.random.alpha({ count: 5 })
    let validGender = 'female'
    let newValidEmail = faker.internet.email('Test', 'Testing')

  //First need to create user so i can update it, need to be sure that id is same, create and update is in one it block
    it('create and update without email',()=>{
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
        //Try to update without email
        cy.request({
          method: 'PUT',
          url:'https://gorest.co.in/public/v2/users/'+userId,
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
    })




    it('create and update without name',()=>{
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
          //Try to updated without name
        cy.request({
          method: 'PUT',
          url:'https://gorest.co.in/public/v2/users/'+userId,
          failOnStatusCode : false,
          headers:{
            'authorization' : "Bearer " + accessToken
          },
          body:{
            "name":'',
            "gender":jsonData.gender,
            "email":email,
            "status":jsonData.status,
          }
        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).eq(422)
          expect(res.body).to.deep.equal([{"field":"name","message":"can't be blank"}])
        })
      })
    })




    it('create user and change name',()=>{
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
        //Update with changed name
        cy.request({
          method: 'PUT',
          url:'https://gorest.co.in/public/v2/users/'+userId,
          headers:{
            'authorization' : "Bearer " + accessToken
          },
          body:{
            "name":validName,
            "gender":jsonData.gender,
            "email":email,
            "status":jsonData.status,
          }
        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).eq(200)
          expect(res.body.name).eq(validName)
          expect(res.body.email).eq(email)
          expect(res.body.gender).eq(jsonData.gender)
          expect(res.body.status).eq(jsonData.status)
        })
      })
    })




    it('create user and change email',()=>{
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
        //Update with changed email
        cy.request({
          method: 'PUT',
          url:'https://gorest.co.in/public/v2/users/'+userId,
          headers:{
            'authorization' : "Bearer " + accessToken
          },
          body:{
            "name":jsonData.name,
            "gender":jsonData.gender,
            "email":newValidEmail,
            "status":jsonData.status,
          }
        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).eq(200)
          expect(res.body.name).eq(jsonData.name)
          expect(res.body.email).eq(newValidEmail)
          expect(res.body.gender).eq(jsonData.gender)
          expect(res.body.status).eq(jsonData.status)
        })
      })
    })



    it('create user and change email and name',()=>{
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
        //Update with changed email and name
        cy.request({
          method: 'PUT',
          url:'https://gorest.co.in/public/v2/users/'+userId,
          headers:{
            'authorization' : "Bearer " + accessToken
          },
          body:{
            "name":validName,
            "gender":jsonData.gender,
            "email":newValidEmail,
            "status":jsonData.status,
          }
        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).eq(200)
          expect(res.body.name).eq(validName)
          expect(res.body.email).eq(newValidEmail)
          expect(res.body.gender).eq(jsonData.gender)
          expect(res.body.status).eq(jsonData.status)
        })
      })
    })
  })


