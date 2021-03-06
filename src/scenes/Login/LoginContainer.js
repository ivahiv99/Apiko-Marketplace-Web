import { compose, withHandlers, withStateHandlers} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginView from './LoginView';
import { authOperations } from '../../modules/auth';
import Api from '../../api';
import { routes } from '../Router';

function mapStateToProps(state) {
  return {
    isLoading: state.auth.login.isLoading,
  };
}

const mapDispatchToProps = {
  login: authOperations.login,
};


const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      fields: {
        email: '',
        password: '',
      },
    },
    {
      handleFieldChange: (state) => (fieldName, value) => ({
        ...state,
        fields: {
          ...state.fields,
          [fieldName]: value,
        },
      }),
    }),
  withHandlers({
    handleLogin: props => async () => {
      await props.login(props.fields);
      props.history.push(routes.home);
    },
  }),
);

export default enhancer(LoginView);
