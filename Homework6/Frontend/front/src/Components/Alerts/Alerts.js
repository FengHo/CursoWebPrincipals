import React from 'react';
import {Alert} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Alerts = ({type, msg}) => {
    return(
        <Alert variant={type}>
            <Alert.Heading>
                <strong>{msg}</strong>
            </Alert.Heading>
        </Alert>
    )
}

Alerts.propTypes = {
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired
}

export default Alerts;