import { Component,  } from 'react'
import PropTypes from 'prop-types'

export class PButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button>{this.props.name}</button>
        )
    }
}

PButton.propTypes = {
    name: PropTypes.string.isRequired
};

export default PButton