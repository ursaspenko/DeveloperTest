import { LightningElement } from 'lwc';
import saveStudentData from '@salesforce/apex/FormController.saveStudentData';
import validateEmso from '@salesforce/apex/FormController.validateEmso';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
	
export default class CreateStudent extends LightningElement {
    studentFirstName = "";
    studentSurname = "";
    studentEmso = "";
    studentTypeOfStudyChoice = "fullTime"
    studentPayerChoice = "";

    get studentTypeOfStudyOptions() {
        return [
            { label: "Full-time", value: "fullTime" },
            { label: "Part-time", value: "partTime" },
        ];
    }
    
    get studentPayerOption() {
        return [
            { label: "Payer", value: "payer" },
        ];
    }
    
    handleStudentFirstNameChange(event) {
        this.studentFirstName = event.target.value;
    }

    handleStudentSurnameChange(event) {
        this.studentSurname = event.target.value;
    }

    handleStudentEmsoChange(event) {
        this.studentEmso = event.target.value;
    }

    handleStudentTypeOfStudyChange(event) {
        let choice = event.detail.value
        
        if (choice == "fullTime")
            this.studentPayerChoice = "";

        this.studentTypeOfStudyChoice = choice;
    }

    handleStudentPayerChange(event) {
        this.studentPayerChoice = event.detail.value;
    }

    handleSaveStudent() {
        let studentName = this.studentFirstName.concat(" ", this.studentSurname)
        let isStudentPayer = this.studentPayerChoice ? true : false
        let studentTypeOfStudy = this.studentTypeOfStudyOptions.find(
            option => option.value == this.studentTypeOfStudyChoice
        ).label

        const studentData = {
            studentName: studentName,
            studentEmso: this.studentEmso,
            studentTypeOfStudy: studentTypeOfStudy,
            studentPayer: isStudentPayer
        };

        validateEmso({emso: studentData.studentEmso})
            .then((result) => {
                const success = JSON.parse(result).success
                const message = JSON.parse(result).message

                if (success) {
                    console.log("EMŠO validation successful.");
                    console.log("API response:", result);
                    return saveStudentData({formData: studentData});
                }
                else {
                    console.log("EMŠO validation failed.");
                    console.log("API response:", result);
                    throw new Error(message)
                }
            })
            .then((savedResult) => {
                console.log(savedResult);
                this.showToast("success", "Record successfully created.")
            })
            .catch((error) => {
                const resultError = error.message ? error.message : error.body.message
                this.showToast("error", resultError);
                console.log("Error:", resultError);
            })
    }

    get isPartTimeStudent() {
        return this.studentTypeOfStudyChoice === "partTime";
    }

    showToast(variant, message) {
        const event = new ShowToastEvent({
            message: message,
            variant: variant,
            mode: "dismissable"
        });
        this.dispatchEvent(event);
    }
}