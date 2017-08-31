let expect = require('chai').expect
let should = require('chai').should
let supertest = require('supertest')
let express = require('express')
let sinon = require('sinon')
let App = require('../index')

var mongoose = require('mongoose');
require('sinon-mongoose');


var model=require('../schema');


let modelStub = sinon.stub(model,'find')
let modelStub1 = sinon.stub(model.prototype,'save')
let modelStub2 = sinon.stub(model.prototype,'delete')
let server = supertest.agent('http://localhost/3000')

describe('find/employee', () => {
    it('respond with json', (done) => {

     modelStub.yields(null,[{movieName: "shikhar", rating:"5"}])
        supertest(App)
            .get('/find')
            .expect('Content-Type',/json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].movieName).to.be.equal("shikhar");
                done();
            })
    });
});



describe('insert test', function() {
  before(function() {
    modelStub1.yields(null, {movieName:"shivam"})
  })
  it('checking post', function(done) {
      supertest(App)
          .post('/insert')
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) return done(err);
              expect(res.body.movieName).to.be.equal("shivam");
              done();
          })
  })
})


describe('updatebymoviename',() => {
    beforeEach(()=>{
        modelStub1.withArgs({'movieName':"shivam"},{$set:{'movieName':"shivam-2"}})
        .yields(null,{
            "ok": 1,
            "nModified": 1,
            "n": 1
        });
    })
    it('update/put',(done)=>{
        supertest(App)
        .put('/update/shivam')
        .send({"movieName":"shivam-2"})
        .end((err,res)=>{
            if(err) return done(err);
            else{
                expect(res.body.ok).to.be.equal(1);
                done();
            }
        })
    })
});

describe('delete test',()=>{
    beforeEach(()=>{
        modelStub2.withArgs({'movieName' : "talvar-2"})
        .yields(null,{
            "ok":1,
            "nmodified":1,
            "n":1
        });

    })
    it('Delete',(done)=>{
        supertest(App)
        .delete("/delete/talvar-2")
        .end((err,res)=>{
            if (err) return done (err);
            done();
        })
    })
})





describe('crud operation status checking',()=>{
it('insert with json', (done) => {
     modelStub.yields(null, [{ movieName : "Sultan-2", rating: "4.3"}])
     supertest(App)
         .get('/find')
         .set('Accept', 'application/json')
         .end((err, res) => {
             if (err) return done(err);
           
             expect(res.status).to.be.equal(200);
             done();
         });
 });
    it('insert with json', (done) => {
     modelStub1.yields(null, [{ movieName : "Sultan-2", rating: "4.3"}])
     supertest(App)
         .post('/insert')
         .send({ movieName : "Sultan-2", rating: "4.3"})
         .end((err, res) => {
             if (err) return done(err);
           
             expect(res.status).to.be.equal(200);
             done();
         });
 });
   
     it('insert with json', (done) => {
     modelStub.yields(null, [{_id:"12345", movieName :"Sultan-2", rating: "4.3"}])
     supertest(App)
         .delete('/delete/12345')
         .end((err, res) => {
             if (err) return done(err);
           
             expect(res.status).to.be.equal(200);
             done();
         });
 });



  
 });



describe('DELETE /delete', () => {
    it('should have a status 200', (done) => {
        modelStub.yields(null,[{ _id:"aaaaaa",movieName:"shivam",rating:"4"}])
        supertest(App)
            .delete('/delete/aaaaaa')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200);
                //res.should.have.property('status', 200);;
                done();
            });
    })
});


 