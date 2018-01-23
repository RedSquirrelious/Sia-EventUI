import React from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import * as formActions from '../../actions/formActions'
import * as eventActions from '../../actions/eventActions'
import AutoCompleteMenu from '../elements/AutoCompleteMenu'
import AddEvent from './AddEvent'

export const AddEventCard = (props) => { 
   const  { incidentId, eventTypes, eventTypeIdSearchField, dispatch } = props
    return (
        <Card>
            <CardHeader
                title={'Add Event'}
                actAsExpander={true}
                showExpandableButton={true}
            />
            
            <CardText expandable={true}>
                <AutoCompleteMenu
                    label={'Select an EventType'}
                    dataConfigText={'name'}
                    dataConfigValue={'id'}
                    dataSource={eventTypes}
                    searchText={eventTypeIdSearchField}
                    onUpdateInput={(menuSelection) => dispatch(formActions.updateInput(eventTypeIdSearchForm.name, eventTypeIdSearchForm.field, menuSelection))}
                    selectMethod={(menuSelection) => {
                        dispatch(eventActions.postEvent(incidentId, menuSelection.id))
                    }}
                    clearMethod={() => dispatch(formActions.clearInput(eventTypeIdSearchForm.name, eventTypeIdSearchForm.field))}
                />
            </CardText>
        </Card>
    )
}

const eventTypeIdSearchForm = {
    name: 'event id selection',
    field: 'input'
}

export const mapStateToProps = (state, ownProps) => {
    const eventTypeIdFormField = state.forms[eventTypeIdSearchForm.name]
        ? state.forms[eventTypeIdSearchForm.name][eventTypeIdSearchForm.field] : ''
    return {
        ...ownProps,
        eventTypes: Object.values(state.eventTypes.records),
        eventTypeIdSearchField: eventTypeIdFormField
    }
}

export default connect(mapStateToProps)(AddEventCard)

