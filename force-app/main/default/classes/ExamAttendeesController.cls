public class ExamAttendeesController {

    @AuraEnabled
    public static List<Student__c> getExamStudents(Id examId) {
        List<Exam_Attendees__c> examAttendees = [
            SELECT Student__r.Name, Student__r.Student_ID__c
            FROM Exam_Attendees__c 
            WHERE Exam__c = :examId
        ];

        List<Student__c> students = new List<Student__c>();
        for (Exam_Attendees__c attendance : examAttendees) {
            students.add(attendance.Student__r);
        }

        return students;
    }

    @AuraEnabled
    public static void removeStudentFromExam(Id studentId, Id examId) {
        Exam_Attendees__c attendanceRecord = [
            SELECT Id FROM Exam_Attendees__c
            WHERE Student__c = :studentId AND Exam__c = :examId
            LIMIT 1
        ];
        
        if (attendanceRecord != null) {
            delete attendanceRecord;
        }
    }
}
