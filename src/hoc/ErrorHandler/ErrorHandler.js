import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const errorHandler = (WrappendComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    hideErrorMessageHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error} modalClosed={this.hideErrorMessageHandler}>
            {this.state.error ? this.state.error.message : null}
        </Modal>
          <WrappendComponent {...this.props} />
        </Fragment>
      );
    }
  }
}

export default errorHandler;
