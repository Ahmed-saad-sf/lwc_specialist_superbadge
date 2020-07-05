public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static list<Contact> getContacts(){
        throw new AuraHandledException('Forced error');
        // return [
        //     SELECT FirstName, LastName, Email
        //     FROM Contact
        //     WITH SECURITY_ENFORCED
        //     Order By LastName  
        // ];    
    }
}