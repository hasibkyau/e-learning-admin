import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {DATA_BOOLEAN, defaultUploadImage, QUIZTYPE} from "../../../../core/utils/app-data";
import {Subscription} from "rxjs";
import {UiService} from "../../../../services/core/ui.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AllImagesDialogComponent} from "../../gallery/images/all-images-dialog/all-images-dialog.component";
import {Gallery} from "../../../../interfaces/gallery/gallery.interface";
import {Quiz} from "../../../../interfaces/common/quiz.interface";
import {QuizService} from "../../../../services/common/quiz.service";
import {Select} from '../../../../interfaces/core/select';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  questionsDataArray: FormArray

  // Static Data
  dataBoolean: Select[] = DATA_BOOLEAN;
  quizType: Select[] = QUIZTYPE;
  pickedImage = defaultUploadImage;

  // Store Data
  id: string;
  quiz: Quiz;
  isLoading = false;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private uiService: UiService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getQuizById();
      }
    });
  }

  /**
   * INIT FORM & Form Methods
   * initDataForm()
   * removeQuestion()
   * addQuestionOption()
   * getOptionsDataArray()
   * removeQuestionOption()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      image: [null],
      questionCount: [null],
      quizType: [null],
      timeInSec: [null],
      passMark: [null],
      isNegativeMark: [false, Validators.required],
      negativeMark: [null],
      status: ['publish'],
      priority: [null],
      questions: this.fb.array([]),
    });
    this.questionsDataArray = this.dataForm.get('questions') as FormArray;
  }

  addNewQuestion() {
    const f = this.fb.group({
      name: [null, Validators.required],
      briefQuestion: [null],
      image: [null],
      options: this.fb.array([])
    });
    (this.dataForm?.get('questions') as FormArray).push(f);
  }

  removeQuestion(index: number) {
    this.questionsDataArray.removeAt(index);
  }

  addQuestionOption(questionIndex: number) {
    const f = this.fb.group({
      name: [null, Validators.required],
      isCorrect: [false]
    });

    ((this.dataForm?.get('questions') as FormArray).at(questionIndex).get('options') as FormArray).push(f);
  }

  getOptionsDataArray(questionIndex: number): FormArray {
    return ((this.dataForm?.get('questions') as FormArray).at(questionIndex).get('options') as FormArray)
  }


  removeQuestionOption(questionIndex: number, optionIndex: number) {
    (this.questionsDataArray.at(questionIndex).get('options') as FormArray).removeAt(optionIndex);
  }

  private setFormValue() {
    this.dataForm.patchValue({...this.quiz});

    // Nested Form Array
    this.quiz.questions.map((m, i) => {
      const f = this.fb.group({
        name: [m.name, Validators.required],
        image: [m.image],
        briefQuestion: [m.briefQuestion],
        options: this.fb.array([])
      });
      (this.dataForm?.get('questions') as FormArray).push(f);
      m.options.map(m2 => {
        const g = this.fb.group({
          name: [m2.name, Validators.required],
          isCorrect: [m2.isCorrect]
        });
        ((this.dataForm?.get('questions') as FormArray).at(i).get('options') as FormArray).push(g);
      });

    });

    if (this.quiz && this.quiz.image) {
      this.pickedImage = this.quiz.image;
    }

  }


  onSubmit() {
    // Check Required Field
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    const mData = {
      ...this.dataForm.value,
      ...{
        questionCount: this.dataForm.value.questions.length
      }
    }

    if (this.quiz) {
      this.updateQuizById(mData);
    } else {
      this.addQuiz(mData);
    }

  }


  /**
   * HTTP REQ HANDLE
   * addQuiz()
   * getQuizById()
   * updateQuizById()
   */


  private addQuiz(data: any) {
    this.isLoading = true;
    this.subDataOne = this.quizService.addQuiz(data)
      .subscribe({
        next: res => {
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.questionsDataArray.clear();
            this.dataForm.patchValue({status: 'publish', isNegativeMark: false});
            this.isLoading = false;
          } else {
            this.uiService.warn(res.message);
            this.isLoading = false;
          }
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      })
  }


  private getQuizById() {
    this.subDataTwo = this.quizService.getQuizById(this.id)
      .subscribe({
        next: res => {
          if (res.success) {
            this.quiz = res.data;
            this.setFormValue();
          }
        },
        error: err => {
          console.log(err)
        }
      })
  }


  private updateQuizById(data: any) {
    this.isLoading = true;
    this.subDataThree = this.quizService.updateQuizById(this.quiz._id, data)
      .subscribe({
        next: res => {
          if (res.success) {
            this.uiService.success(res.message);
            this.isLoading = false;
          } else {
            this.uiService.warn(res.message);
            this.isLoading = false;
          }
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      })
  }


  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   * openInstructorImageGalleryDialog()
   * openVideoDialog()
   * removeInputFormImage()
   */

  public openGalleryDialog(type: 'banner-image' | 'image') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          if (type === 'image') {
            const image: Gallery = dialogResult.data[0] as Gallery;
            this.dataForm.patchValue({image: image.url});
            this.pickedImage = image.url;
          }
        }
      }
    });
  }


  public openQuizGalleryDialog(index: number) {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'multiple', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.questionsDataArray.at(index).patchValue({image: dialogResult.data[0].url})
        }
      }
    });
  }


  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }

}
