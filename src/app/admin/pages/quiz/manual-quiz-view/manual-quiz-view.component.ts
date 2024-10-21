import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {QuizService} from "../../../../services/common/quiz.service";
import {GalleryComponent} from "../gallery/gallery.component";
import {UiService} from "../../../../services/core/ui.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";


@Component({
  selector: 'app-manual-quiz-view',
  templateUrl: './manual-quiz-view.component.html',
  styleUrls: ['./manual-quiz-view.component.scss']
})
export class ManualQuizViewComponent implements OnInit {
  /// Data Form
  @ViewChild('formElement') formElement: NgForm;

  @ViewChild('galleryPop', { static: false }) galleryPop!: GalleryComponent;
  dataForm?: FormGroup;
  // Store Data
  id?: string;
  quizResult?: any;
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private quizService: QuizService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();
    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getQuizResultById();
      }
    });
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      obtainMark: [null],
    });
  }
  /**
   * HTTP REQ HANDLE
   * getOfflineCourseById()
   * addOfflineCourse()
   * updateOfflineCourseById()
   * removeSingleFile()
   */

  private getQuizResultById() {
    this.spinnerService.show();
    this.subDataOne = this.quizService.getQuizResultById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.quizResult = res.data;
          console.log('this.quizResult',this.quizResult);
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    const nData= {
        obtainMark: this.dataForm.value.obtainMark
    }
    if (this.quizResult) {
      this.updateQuizById(nData)
    }
  }

  private updateQuizById(nData) {
    this.subDataThree = this.quizService
      .updateQuizResultById(this.quizResult._id, nData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.success(res.message);
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * SHOW GALLERY
   */
  onShowPop(index: any) {

    if (index > -1) {
      this.galleryPop.onShowGallery(index);
    }
  }
}
