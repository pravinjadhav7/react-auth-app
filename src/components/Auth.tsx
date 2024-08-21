import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../store/actions/authActions';
import { RootState } from '../store/reducers';
import { SignUpDto } from '../dtos/SignUpDto';
import { SignInDto } from '../dtos/SignInDto';

const Auth: React.FC = () => {
  const [justifyActive, setJustifyActive] = useState('signin');
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    iAgree: false,
  });
  const [signInData, setSignInData] = useState<SignInDto>({ email: '', password: '' });
  const [isSignUpValid, setIsSignUpValid] = useState(false);
  const [isSignInValid, setIsSignInValid] = useState(false);
  const authError = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/application');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    validateSignUpForm();
    validateSignInForm();
  }, [signUpData, signInData]);

  const validateSignUpForm = () => {
    const { firstName, email, password, iAgree } = signUpData;
    const isPasswordValid = password.length > 0;

    setIsSignUpValid(firstName.trim() !== '' && email.trim() !== '' && isPasswordValid && iAgree);
  };

  const validateSignInForm = () => {
    const { email, password } = signInData;
    setIsSignInValid(email.trim() !== '' && password.trim() !== '');
  };

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) return;
    setJustifyActive(value);
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = () => {
    dispatch(signIn(signInData) as any);
  };

  const handleSignUp = () => {
    const fullName = `${signUpData.firstName} ${signUpData.lastName}`.trim();
    const payload: SignUpDto = {
      email: signUpData.email,
      name: fullName,
      password: signUpData.password,
    };
    dispatch(signUp(payload) as any);
  };

  return (
    <>
      <section className="bg-primary py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-md-6 col-xl-7">
              <div className="d-flex justify-content-center text-bg-primary">
                <div className="col-12 col-xl-9">
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src="./assets/add-user.png"
                    width="245"
                    height="80"
                    alt="BootstrapBrain Logo"
                  />
                  <hr className="border-primary-subtle mb-4" />
                  {justifyActive === 'signin' ? (
                    <>
                      <h2 className="h1 mb-4">Welcome back! Please login to your account.</h2>
                      <p className="lead mb-5">
                       Lorem ipsum odor amet, consectetuer adipiscing elit.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="h1 mb-4">Welcome! Please register to your account.</h2>
                      <p className="lead mb-5">
                       Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc nulla ullamcorper duis lobortis lacus facilisi non.
                      </p>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-0 rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h2 className="h3">{justifyActive === 'signin' ? 'Login' : 'Registration'}</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          {justifyActive === 'signin' ? 'Enter your credentials to Login' : 'Enter your details to register'}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {justifyActive === 'signin' ? (
                    <form action="#!">
                      <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="name@example.com"
                              required
                              onChange={handleSignInChange}
                            />
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Password"
                              required
                              onChange={handleSignInChange}
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              name="rememberMe"
                              id="rememberMe"
                            />
                            <label className="form-check-label text-secondary" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary btn-lg"
                              type="button"
                              onClick={handleSignIn}
                              disabled={!isSignInValid}
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form action="#!">
                      <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              id="firstName"
                              placeholder="First Name"
                              required
                              onChange={handleSignUpChange}
                            />
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              id="lastName"
                              placeholder="Last Name"
                              required
                              onChange={handleSignUpChange}
                            />
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="name@example.com"
                              required
                              onChange={handleSignUpChange}
                            />
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Password"
                              required
                              onChange={handleSignUpChange}
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              name="iAgree"
                              id="iAgree"
                              onChange={handleSignUpChange}
                              required
                            />
                            <label className="form-check-label text-secondary" htmlFor="iAgree">
                              I agree to the{' '}
                              <a href="#!" className="link-primary text-decoration-none">
                                terms and conditions
                              </a>
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary btn-lg"
                              type="button"
                              onClick={handleSignUp}
                              disabled={!isSignUpValid}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                        {justifyActive === 'signin' ? (
                          <p className="m-0 text-secondary text-center">
                            Don't have an account?{' '}
                            <a
                              href="#!"
                              className="link-primary text-decoration-none"
                              onClick={() => handleJustifyClick('signup')}
                            >
                              Register
                            </a>
                          </p>
                        ) : (
                          <p className="m-0 text-secondary text-center">
                            Already have an account?{' '}
                            <a
                              href="#!"
                              className="link-primary text-decoration-none"
                              onClick={() => handleJustifyClick('signin')}
                            >
                              Login
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {authError && (
                    <div className="alert alert-danger mt-3">
                      <ul>
                        {authError.split(',').map((error, index) => (
                          <li key={index}>{error.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
