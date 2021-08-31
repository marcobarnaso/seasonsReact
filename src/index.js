import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'

class App extends React.Component {
    // constructor(props) {
    //     super(props);

    //     // this is the only time we made direct assignment to the state object
    //     this.state = { lat: null, errorMessage: '' };

    // }

    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        console.log('called DidMount')
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    componentDidUpdate() {
        console.log('My component did update')
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <div className='spinner'><Spinner message="Please accept location request." /></div>
    }

    // React says we have to define Render!!
    render() {
        return (
            <div className="border red">{this.renderContent()}</div>
        );
    };
}

ReactDom.render(
    <App />,
    document.querySelector('#root')
);