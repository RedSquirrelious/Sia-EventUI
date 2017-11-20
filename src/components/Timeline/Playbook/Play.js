import React from 'react'
import { connect } from 'react-redux'
import FlatButtonStyled from '../../../components/elements/FlatButtonStyled'
import { fillTemplate } from '../../../services/playbookService'


export const Play = ({incidentId, isUrl, filledTemplate, name, eventActions, dispatch}) => {
    return isUrl ? <a href={filledTemplate}>Link: {name}</a>
                 : <FlatButtonStyled
                        label={'Publish Event: ' + name}
                        onTouchTap={publishEvent(incidentId, eventActions, dispatch)(filledTemplate)}
                    />
}

export const mapStateToPlayProps = (state, ownProps) => {
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = state.events.list.find(event => event.id === ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    const action = ownProps.action
    const filledTemplate = action ? fillTemplate(action.actionTemplate, event, ticket, eventType, engagement) : ''
  
    return {
        ...ownProps,
        isUrl: action.actionTemplate.isUrl,
        name: action.actionTemplate.name,
        filledTemplate
    }
}

const publishEvent = (incidentId, eventActions, dispatch) => (filledTemplate) => () => {
    const parsedTemplate = JSON.parse(filledTemplate)
    dispatch(eventActions.postEvent(incidentId, parsedTemplate.id, parsedTemplate.data))
}

export default connect(mapStateToPlayProps)(Play)

