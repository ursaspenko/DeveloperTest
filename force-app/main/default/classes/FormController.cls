public with sharing class FormController {

    @AuraEnabled
    public static String saveStudentData(Map<String, Object> formData) {
        String name = (String) formData.get('studentName');
        String emso = (String) formData.get('studentEmso');
        String typeOfStudy = (String) formData.get('studentTypeOfStudy');
        Boolean payer = (Boolean) formData.get('studentPayer');
        
        try {
            Student__c newStudent = new Student__c(
                Name = name,
                Emso__c = emso,
                Type_of_study__c = typeOfStudy, 
                Payer__c = payer
            );
            insert newStudent;
            return 'Record successfully created.';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String validateEmso(String emso) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://app.agilcon.com/job/emso.php?emso=' + emso);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');

        Http http = new Http();
        HttpResponse res = http.send(req);

        return res.getBody();
    }
}