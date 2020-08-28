let server = require('../index.js')

chai = require('chai')
chaiHttp = require('chai-http')
server = require('../index.js')

chai.use(chaiHttp)
chai.should()




describe('post /todos/todos-by-username-today',()=>{
    it('Return data',(done)=>{
        chai.request(server)
            .post('/todos/todos-by-username-today')
            .send({username:'nsolomon', friends:['msol']})
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.body.should.be.an('array');
                console.log("DATA")
                console.log(res.body)
                done()
             })
    })
})