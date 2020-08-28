let server = require('../index.js')

chai = require('chai')
chaiHttp = require('chai-http')
server = require('../index.js')

chai.use(chaiHttp)
chai.should()



describe("GET /my-page",()=>{

    it('Should redirect to login page when not logged in',(done)=>{
        chai.request(server)
            .get('/my-page')
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.redirects.length.should.be.equal(1);
                done()
             })
    })
    it('Should set session using middleware and log in',(done)=>{
        chai.request(server)
            .get('/my-page')
            .set('username', 'nsolomon')
            .set('password', 'Go@tee123')
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.redirects.length.should.be.equal(0);
                done()
            })
        })
})

describe('POST /todos-by-username', ()=>{
    it('Should return data',(done)=>{
        chai.request(server)
            .post('/my-page/todos-by-username')
            .send({username:'nsolomon'})
            .end((err, res) => {
                res.status.should.be.equal(200)
                res.body.should.be.an('array');
                done()
            })
        })
        it('Todos should be grouped by date',(done)=>{
            chai.request(server)
            .post('/my-page/todos-by-username')
            .send({username:'nsolomon'})
            .end((err, res) => {
                let curDate
                console.log('----------------------------------------------')
                console.log('TODO GROUP BY DATE')
                console.log('----------------------------------------------')
                res.body.forEach(todosGroupedByDate => {
                    curDate = todosGroupedByDate[0].date
                    console.log('DATE:',curDate)
                    todosGroupedByDate.forEach(todo =>{
                        console.log('   todo ',todo.todoId, '    date:', todo.date)
                        todo.date.should.equal(curDate)
                    })
                    console.log('----------------------------------------------')
                });
                done()
            })
        })
})


