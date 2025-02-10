# Test for candidates - developer

Brief description of each task.

## Level 1

Four custom objects were created (each with additional custom fields):
- Student
- Exam
- Subject
- Lecturer

## Level 2

Created a custom LWC component for registering new students (adding instance of Student object) with required fields, validation is only done on EMŠO field.
The component is displayed on [Home](https://agilcon-6f-dev-ed.develop.lightning.force.com/lightning/page/home) page of Sales app additionally with a list of all students.

## Level 3

EMŠO validation is done through an API call and if unsuccessful, record is not created. API response is displayed in a browser console after saving.

## Level 4

Created new custom LWC component for listing students attending selected exam. The component is added to exam record page layout along with a related list of students and exam details. On the component attendee can be deregistered from exam (hence title "Deregister student from this exam").