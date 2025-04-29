import { AuthApi } from '../../support/api/authApi';

describe('Auth API - Create Token Tests', () => {
  it('Positive - CreateToken with valid credentials', () => {
    AuthApi.createToken({ username: 'admin', password: 'password123' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string').and.not.be.empty;
    });
  });
  it('Positive - Validate token field exists in valid response', () => {
    AuthApi.createToken({ username: 'admin', password: 'password123' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
    });
  });

  it('Negative - CreateToken with invalid username', () => {
    AuthApi.createToken({ username: 'invalid', password: 'password123' }).then((response) => {
      expect([200, 401]).to.include(response.status);
      expect(response.body).to.not.have.property('token');
    });
  });

  it('Negative - CreateToken with invalid password', () => {
    AuthApi.createToken({ username: 'admin', password: 'wrongpass' }).then((response) => {
      expect([200, 401]).to.include(response.status);
      expect(response.body).to.not.have.property('token');
    });
  });
  it('Negative - CreateToken with empty username & password', () => {
    AuthApi.createToken({ username: '', password: '' }).then((response) => {
      expect(response.status).to.eq(200); // server tetap balas 200
      expect(response.body).to.have.property('reason').and.include('Bad credentials');
      expect(response.body).to.not.have.property('token');
    });
  });

  it('Negative - CreateToken with missing password field', () => {
    AuthApi.createToken({ username: 'admin' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason').and.include('Bad credentials');
      expect(response.body).to.not.have.property('token');
    });
  });

  it('Negative - CreateToken with Content-Type not JSON', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123'
      }),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason').and.include('Bad credentials');
      expect(response.body).to.not.have.property('token');
    });
  });
  

});
