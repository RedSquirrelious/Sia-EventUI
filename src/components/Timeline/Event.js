import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import BootstrapPlaybook from './Playbook/BootstrapPlaybook'
import Playbook from './Playbook/Playbook'
import { LoadTextFromEvent } from '../../services/playbookService'

export const Event = ({
    text,
    time,
    backgroundColor,
    incidentId,
    ticketId,
    eventTypeId,
    eventId,
    eventActions,
    eventTypeActions
}) => {
    return (
    <div>
        <BootstrapPlaybook
            eventId={eventId}
            eventTypeId={eventTypeId}
            ticketId={ticketId}
            incidentId={incidentId}
            eventTypeActions={eventTypeActions}
        />
        <Card
            className="incident-card"
            style={{ backgroundColor }}
        >
            <CardHeader
                title={ticketId ? `${ticketId}: ${text}` : text}
                subtitle={time ? time.format('LT') : 'Time unknown!'}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable={true}>
                Select the Actions below:
                <Playbook
                    eventId={eventId}
                    eventTypeId={eventTypeId}
                    ticketId={ticketId}
                    incidentId={incidentId}
                    eventActions={eventActions}
                />
            </CardText>
        </Card>
    </div>
)}

Event.propTypes = {
    text: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(moment),
    backgroundColor: PropTypes.string,
    ticketId: PropTypes.string
}

export const mapStateToEventProps = (state, ownProps) => {
    const event = ownProps.event
    const eventType = state.eventTypes.records[event.eventTypeId]
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    return {
        ...ownProps,
        ticket,
        engagement,
        eventId: event.id,
        eventTypeId: event.eventTypeId,
        time: moment(event.occurred ? event.occurred: event.Occurred),
        dismissed: event.dismissed,
        backgroundColor: event.backgroundColor,
        text: LoadTextFromEvent(event, eventType, ticket, engagement)
    }
}

export default connect(mapStateToEventProps)(Event)