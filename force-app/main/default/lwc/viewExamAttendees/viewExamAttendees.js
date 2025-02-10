import { LightningElement, api } from 'lwc';
import getExamStudents from '@salesforce/apex/ExamAttendeesController.getExamStudents';
import removeStudentFromExam from '@salesforce/apex/ExamAttendeesController.removeStudentFromExam';

export default class ViewExamAttendees extends LightningElement {
    examOptions = [];
    @api recordId;
    examStudents = [];
    columns = [
        { label: 'Student ID', fieldName: 'studentId' },
        { label: 'Student Name', fieldName: 'studentName' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Remove',
                name: 'remove',
                iconName: 'utility:delete',
                variant: 'destructive'
            }
        }
    ];

    get hasNoAttendees() {
        return !this.examStudents || this.examStudents.length === 0;
    }

    connectedCallback() {
        this.loadExamStudents(this.recordId);
    }

    loadExamStudents(examId) {
        getExamStudents({ examId })
            .then(result => {
                this.examStudents = result.map(student => ({
                    id: student.Id,
                    studentName: student.Name,
                    studentId: student.Student_ID__c
                }));
            })
            .catch(error => {
                console.error('Error fetching students for exam', error);
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log("here");
        
        if (actionName === 'remove') {
            this.removeStudentFromExam(row);
        }
    }

    removeStudentFromExam(student) {
        removeStudentFromExam({ studentId: student.id, examId: this.recordId })
            .then(() => {
                this.examStudents = this.examStudents.filter(item => item.id !== student.id);
            })
            .catch(error => {
                console.log(error.message);
                
                console.error('Error removing student from exam', error);
            });
    }
}