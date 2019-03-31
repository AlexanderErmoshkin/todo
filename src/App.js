import React, { Component } from 'react';
import { connect } from 'react-redux';

import Todo from './containers/Todo/Todo';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="todoapp" style={{marginBottom: 0}}>
                    <Todo/>
                </section>
                {this.props.loading ? <Spinner/> : null}
                <Footer/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.todo.loading
    };
};

export default connect(mapStateToProps)(App);