import React, { Component } from 'react';

import Todo from './containers/Todo/Todo';
import Footer from './components/Footer/Footer';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="todoapp">
                    <Todo/>
                </section>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default App;