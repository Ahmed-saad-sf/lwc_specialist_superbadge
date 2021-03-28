import { LightningElement, wire, track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = ''; // Pass boat type id to apex method to get boats by type
    
    // Private
    error = undefined;

    @track searchOptions; // Values to display in combo box retrieved from getBoatTypes
    
    // Wire a custom Apex method to get all boat types for combo box
    @wire(getBoatTypes)
    boatTypes({ error, data}) {
        if (data) {
            this.searchOptions = data.map(type => {
                // TODO: complete logic => map label + boat type id to an array of objects?
                // Return an object
                return {
                    label: type.Name, 
                    value: type.Id
                };
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' }); // Unshift adds new elemnts to beginning of array
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that search option has changed
    // passes BoatTypeId in the detail
    handleSearchOptionChange(event) {
        // Create the const searchEvent
        // searchEvent must be the new custom event search

        // Set selectedBoatTypeId value
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent('search', {detail : {boatTypeId: this.selectedBoatTypeId}});
        // Dispatch event
        this.dispatchEvent(searchEvent);
    }
}