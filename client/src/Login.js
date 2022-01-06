import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Typography, Button, TextField, makeStyles } from '@material-ui/core'
import { login } from './store/utils/thunkCreators'
import bgImg from './images/bg-img.png'
import bubble from './images/bubble.svg'

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
  },
  leftCol: {
    width: '35%',
    height: '100%',
    background: `url(${bgImg})`,
    backgroundSize: 'cover',
    '@media (max-width: 850px)': {
      display: 'none',
    },
  },
  leftColOverlay: {
    backgroundColor: 'rgba(58, 141, 255, 70%)',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100px',
      height: '100px',
    },
    '& h1': {
      color: 'white',
      fontWeight: '400',
      fontSize: '44px',
      margin: '10%',
      textAlign: 'center',
    },
  },
  rightCol: {
    height: '100%',
    width: '65%',
    '@media (max-width: 850px)': {
      width: '100%',
    },
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h1': {
      margin: '6%',
      fontWeight: '500',
      fontSize: '48px',
      width: '60%',
      '@media (max-width: 555px)': {
        fontSize: '28px',
        width: '80%',
      },
    },
  },
  register: {
    width: '90%',
    justifyContent: 'flex-end',
    padding: '35px',
    '& p': {
      color: '#B0B0B0',
      fontSize: '16px',
      height: '50px',
      textAlign: 'center',
      marginTop: '15px',
      marginRight: '30px',
      '@media (max-width: 555px)': {
        fontSize: '12px',
        marginRight: '5px',
      },
    },
    '& button': {
      height: '54px',
      width: '170px',
      color: '#3A8DFF',
      fontSize: '16px',
      boxShadow: '0px 5px 5px lightgray;',
      marginLeft: '20px',
      '@media (max-width: 555px)': {
        height: '40px',
        width: '120px',
        fontSize: '12px',
      },
    },
    '@media (max-width: 555px)': {
      width: '95%',
      justifyContent: 'flex-start',
    },
  },
  formInput: {
    width: '60%',
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      color: '#B0B0B0',
      fontSize: '20px',
    },
    '& input': {
      paddingTop: '30px',
    },
    '@media (max-width: 555px)': {
      width: '80%',
    },
  },
  formBtn: {
    color: 'white',
    background: '#3A8DFF',
    height: '56px',
    width: '160px',
    marginTop: '50px',
  },
}))

const Login = props => {
  const classes = useStyles()
  const history = useHistory()
  const { user, login } = props

  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    await login({ username, password })
  }

  if (user.id) {
    return <Redirect to="/home" />
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftCol}>
        <div className={classes.leftColOverlay}>
          <img src={bubble} alt="bubble icon" />
          <h1>Converse with anyone with any language</h1>
        </div>
      </div>
      <div className={classes.rightCol}>
        <Grid container item className={classes.register}>
          <Typography>Don't have an account?</Typography>
          <Button onClick={() => history.push('/register')}>Create account</Button>
        </Grid>
        <form onSubmit={handleLogin} className={classes.formContainer}>
          <h1>Welcome back!</h1>
          <TextField className={classes.formInput} aria-label="username" label="Username" name="username" type="text" />
          <TextField className={classes.formInput} label="password" aria-label="password" type="password" name="password" />
          <Button className={classes.formBtn} type="submit" variant="contained" size="large">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => {
      dispatch(login(credentials))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
