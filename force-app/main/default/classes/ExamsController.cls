public with sharing class ExamsController {
    @AuraEnabled
    public static List<Exam__c> getExams() {
        return [SELECT Id, Name FROM Exam__c];
    }
}