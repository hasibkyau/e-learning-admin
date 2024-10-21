import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UiService} from "../../../../services/core/ui.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Select} from "../../../../interfaces/core/select";
import {UtilsService} from "../../../../services/core/utils.service";
import {StorageService} from "../../../../services/core/storage.service";
import {ProductReview} from "../../../../interfaces/common/product-review.interface";
import {ProductReviewService} from "../../../../services/common/product-review.service";


@Component({
  selector: 'app-reply-review',
  templateUrl: './reply-review.component.html',
  styleUrls: ['./reply-review.component.scss']
})
export class ReplyReviewComponent implements OnInit {

  // Form Template Ref
  @ViewChild('templateForm') templateForm: NgForm;

  dataForm?: FormGroup;
  private sub: Subscription;

  isLoading: any;

  // Store Data from param
  id?: string;
  review: ProductReview = null;

  reviewStatus: Select[] = [
    {value: false, viewValue: 'Not Approve'},
    {value: true, viewValue: 'Approve'},
  ];

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private utilsService: UtilsService,
    private storageService: StorageService,
    private reviewService: ProductReviewService,
  ) {
  }

  ngOnInit(): void {

    this.dataForm = this.fb.group({
      status: [null, Validators.required],
      reply: [null],
      isReview: [null],
    });

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getReviewByReviewId();
      }
    });

  }

  /**
   * SET FORM DATA
   */
  private setFormData() {
    this.dataForm.patchValue({status: this.review.status, reply: this.review.reply, isReview: this.review.isReview});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }
    const finalData = {
      ...this.dataForm.value,
      ...{
        _id: this.review._id,
        replyDate: this.utilsService.getDateString(new Date()),
        rating: this.review?.rating,
        product: this.review.product,

      }
    };

    this.editReview(finalData);

  }


  /**
   * HTTP REQ
   */

  private getReviewByReviewId() {
    this.reviewService.getReviewByReviewId(this.id)
      .subscribe(res => {
        this.review = res.data;
        this.setFormData();
      }, error => {
        console.log(error);
      });
  }

  private editReview(data: ProductReview) {

    this.reviewService.editReview(data)
      .subscribe(res => {
        this.uiService.success(res.message);
      }, error => {
        console.log(error);
      });
  }


}
