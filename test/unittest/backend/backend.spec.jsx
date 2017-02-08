import chai, {expect} from 'chai'
import request from 'supertest-as-promised';
import chaiAsPromised from  "chai-as-promised";
import server from '../../../server'
chai.use(chaiAsPromised)

describe('api', () => {
  var app = null

  before(()=>{
    app = server()
  })

  it('should have time api', () => {
    return request(app).get('/time').expect(200).then(res => {
      return expect(res.body.time).to.be.a('number')
    })
  })


  it('should return index.html', () => {
    return request(app)//.get('/').expect(200)
  })

})
